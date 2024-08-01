import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LibraryBooks } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const VisitSite = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [course,SetCourse] = useState([])
    const [Courseid,setCourseid] = useState([])
    const [AnnulBatch,setAnnulBatch] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    // const children = (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    //       <FormControlLabel
    //         label="Child 1"
    //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label="Child 2"
    //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );

    const [value, setValue] = useState({
        course: "" || uid.course,
        batch: "" || uid.batch,
        region: "" || uid.region,
        location: "" || uid.location,
        student: "" || uid.student,
        date: "" || uid.date,
        time: "" || uid.time,
        confirmdate: "" || uid.confirmdate,





    })

    useEffect(() => {
        setValue({
            course: uid.course,
            batch: uid.batch,
            region: uid.region,
            location: uid.location,
            student: uid.student,
            date: uid.date,
            time: uid.time,
            confirmdate: uid.confirmdate,


        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.course) {
            isValid = false;
            newErrors.course = "course is require"
        }
        if (!value.batch) {
            isValid = false;
            newErrors.batch = "batch is require"
        }
        if (!value.region) {
            isValid = false;
            newErrors.region = "region is require"
        }
        if (!value.location) {
            isValid = false;
            newErrors.location = "location is require"
        }
        if (!value.student) {
            isValid = false;
            newErrors.student = "student is require"
        }
        if (!value.date) {
            isValid = false;
            newErrors.date = "date is require"
        }
        if (!value.time) {
            isValid = false;
            newErrors.time = "time is require"
        }
        if (!value.confirmdate) {
            isValid = false;
            newErrors.confirmdate = "confirmdate is require"
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
            tablename: "Site_visit_master"
        }
        axios.post(`${BASE_URL}/get_vistsite`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getEmployeeData()
        getCourseData()

        value.title = ""
        setError({})
        setUid([])
    }, [])

    const handleClick = (Visit_Id) => {
        setCid(Visit_Id)
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [Visit_Id]: true,
        }));
    };

    const handleCancel = (Visit_Id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [Visit_Id]: false,
        }));
    };

    const handleUpdate = (Visit_Id) => {
        const data = {
            u_id: Visit_Id,
            tablename: "awt_visitsite"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (Visit_Id) => {
        const data = {
            cat_id: Visit_Id,
            tablename: "awt_visitsite"
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
            [Visit_Id]: false,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {

                course: value.course,
                batch: value.batch,
                region: value.region,
                location: value.location,
                student: value.student,
                date: value.date,
                time: value.time,
                confirmdate: value.confirmdate,
                uid: uid.Visit_Id
            }


            axios.post(`${BASE_URL}/add_visitsite`, data)
                .then((res) => {
                    console.log(res)
                    getEmployeeData()

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


    const getbatch = async (Visit_Id) => {

        if (Visit_Id != undefined) {
            setCourseid(Visit_Id)

            const data = {
                courseid: Visit_Id
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

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        if ([e.target.name]=='course') {
            getbatch(e.target.value)
        }
    }






    const columns = [
        {
            field: 'index',
            headerName: 'Visit_Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,


        },
        { field: 'Course_Name', headerName: 'course', flex: 2 },
        { field: 'Batch_Code', headerName: 'batch', flex: 2 },
        { field: 'Region', headerName: 'region', flex: 2 },
        { field: 'Location', headerName: 'location', flex: 2 },
        { field: 'Total_Student', headerName: 'student', flex: 2 },
        { field: 'Visit_Date', headerName: 'date', flex: 2 },
        { field: 'Visit_Time', headerName: 'time', flex: 2 },
        { field: 'ConfirmDAte', headerName: 'confirm Date', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.Visit_Id)} />
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Visit_Id)} />
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
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Site Visit Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>Select</option>
                                                    {course.map((item) => {
                                                        return (

                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                                {error.course && <span className='text-danger'>{error.course}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                <option>Select</option>
                                                    {AnnulBatch.map((item) => {
                                                        return (

                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                                {error.batch && <span className='text-danger'>{error.batch}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Region<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.region} onChange={onhandleChange} name='region'>
                                                    <option>Select</option>
                                                    <option value="Westen">Westen</option>
                                                    <option value="Center">Center</option>

                                                </select>
                                                {error.region && <span className='text-danger'>{error.region}</span>}
                                            </div>



                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Location</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.location} name='location' onChange={onhandleChange} />
                                                {error.location && <span className='text-danger'>{error.location}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Students/Bus</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.student} name='student' onChange={onhandleChange} />
                                                {error.student && <span className='text-danger'>{error.student}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                                {error.date && <span className='text-danger'>{error.date}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Time<span className='text-danger'>*</span> </label>
                                              <input type="time" class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.time} onChange={onhandleChange} name='time'/>
                                                {error.time && <span className='text-danger'>{error.time}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Confirm Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.confirmdate} name='confirmdate' onChange={onhandleChange} />
                                                {error.confirmdate && <span className='text-danger'>{error.confirmdate}</span>}
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
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">View Site visit</h4>
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
                                            getRowId={(row) => row.Visit_Id}
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

export default VisitSite
