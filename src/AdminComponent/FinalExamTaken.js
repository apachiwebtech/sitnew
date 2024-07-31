import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';

const FinalExamTaken = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [course, SetCourse] = React.useState([]);
    const [AnnulBatch, setAnnulBatch] = React.useState([]);
    const [AnnulBatchid, setAnnulBatchid] = React.useState("");
    const [TestName, setTestName] = useState([])
    const [TestNameid, setTestNameid] = useState("")
    const [courseid, setCourseid] = useState("")


    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    const [value, setValue] = useState({
        coursename: "" || uid.coursename,
        batchcode: "" || uid.batchcode,
        examtestname: "" || uid.examtestname,
        data: "" || uid.date,
    })

    useEffect(() => {
        setValue({
            coursename: uid.coursename,
            batchcode: uid.batchcode,
            examtestname: uid.examtestname,
            data: uid.date,

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.coursename) {
            isValid = false;
            newErrors.coursename = "Name is require"
        }

        if (!value.batchcode) {
            isValid = false;
            newErrors.batchcode = "Batch Code is Required"
        }

        if (!value.examtestname) {
            isValid = false;
            newErrors.examtestname = "Exam is Required"
        }

        if (!value.date) {
            isValid = false;
            newErrors.date = "Date is Required"
        }

        setError(newErrors)
        return isValid
    }


    async function getEmployeeData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    async function getEmployeeData() {
        const data = {
            tablename: "awt_finalexamtaken"
        }
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCourseData()
        getUnitTest()
        getbatch()
        getEmployeeData()
        value.title = ""
        setError({})
        setUid([])
    }, [])

    const handleClick = (id) => {
        setCid(id)
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };

    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleUpdate = (id) => {
        const data = {
            u_id: id,
            tablename: "awt_finalexamtaken"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])
                setCourseid(res.data[0].coursename)
                setAnnulBatchid(res.data[0].batchcode)
                setTestNameid(res.data[0].examtestname)

                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_finalexamtaken"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getEmployeeData()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                coursename: value.coursename,
                batchcode: value.batchcode,
                examtestname: value.examtestname,
                date: value.date,
                uid: uid.id
            }


            axios.post(`${BASE_URL}/add_finalexamtaken`, data)
                .then((res) => {
                    console.log(res)
                    getEmployeeData()
                    setUid([])
                    setValue({
                        setTestNameid : '',
                        setAnnulBatchid : '',
                        setCourseid : '',
                    })

                })
                .catch((err) => {
                    console.log(err)
                })
        }





    }






    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                SetCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const getbatch = async (id) => {

        if (id != undefined) {
            setCourseid(id)

            const data = {
                courseid: id
            }

            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                setAnnulBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            const data = {
                tablename: "Batch_Mst"
            }
            axios.post(`${BASE_URL}/get_batch`, data)
                .then((res) => {
                    console.log(res.data)
                    setAnnulBatch(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    };
    const getUnitTest = async (id) => {

        if (id != undefined) {
            setAnnulBatchid(id)

            const data = {
                AnnulBatch: id
            }

            try {
                const res = await axios.post(`${BASE_URL}/getbatchwiseunittest`, data);
                setTestName(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            const data = {
                tablename: "awt_unittesttaken"
            }
            axios.post(`${BASE_URL}/get_data`, data)
                .then((res) => {
                    console.log(res.data)
                    setTestName(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })

        }

    };


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if ([e.target.name] == 'coursename') {
            getbatch([e.target.value]);
        }
        if ([e.target.name] == 'batchcode') {
            getUnitTest([e.target.value]);
        }
    }



    const columns = [
        {
            field: 'index',
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,

        },
        { field: 'coursename', headerName: 'Course Name', flex: 2 },
        { field: 'batchcode', headerName: 'Batch Code', flex: 2 },
        { field: 'date', headerName: 'Exam Date', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                    </>
                )
            }
        },
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Final Exam Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-6">
                                                <label for="exampleFormControlSelect1">Course Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={courseid} onChange={onhandleChange} name='coursename'>
                                                    <option>-Select-</option>

                                                    {course.map((item) => {
                                                        return (

                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className="text-danger"> {error.coursename} </span>}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={AnnulBatchid} onChange={onhandleChange} name='batchcode'>
                                                    <option>-Select-</option>
                                                    {AnnulBatch.map((item) => {
                                                        return (

                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batchcode} </span>}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleFormControlSelect1">Exam Test Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={TestNameid} onChange={onhandleChange} name='examtestname'>
                                                    <option>-Select-</option>

                                                    {TestName.map((item) => {
                                                        return (

                                                            <option value={item.id}>{item.utname}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className="text-danger"> {error.examtestname} </span>}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <lable for="exampleInputUsername1">Max Marks</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.maxmarks}
                                                    placeholder="Max Marks" name='maxmarks' onChange={onhandleChange} disabled />
                                            </div>



                                            <div class="form-group col-lg-6">
                                                <label for="exampleInputUsername1">Date<span className="text-danger"></span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.date} </span>}
                                            </div>



                                        </div>


                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>

                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Final Exam Taken</h4>
                                        </div>

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                            slots={{ toolbar: GridToolbar }}
                                            slotProps={{
                                                toolbar: {
                                                    showQuickFilter: true,
                                                },
                                            }}
                                        />

                                        {confirmationVisibleMap[cid] && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                    </div>


                                    {/* <div>
                                      <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Excel</button>
                                      </div> */}



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default FinalExamTaken
