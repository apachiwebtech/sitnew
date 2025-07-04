import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";
//import FormControlLabel from '@mui/material/FormControlLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';


const BatchMoving = () => {

    const [date, setDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = currentDate.getDate();
        day = day < 10 ? '0' + day : day;
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    }, []);


    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [specification, setSpecification] = useState("")
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [course, setCourse] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [courseid, setCourseid] = useState('')
    const [batch, setBatch] = useState([])
    const [batchid, setBatchid] = useState('')
    const [student, setStudent] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });


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

        student: "" || uid.student_id,
        newbatch: "" || uid.newbatch_code,


    })

    useEffect(() => {
        setValue({

            student: uid.student_id,
            newbatch: uid.newbatch_code,

        })
    }, [uid])


    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}


    //    if (!value.college) {
    //     isValid = false;
    //     newErrors.name = "Name is require"
    //    }
    //     if (!value.email) {
    //         isValid = false;
    //         newErrors.email = "Email is require"
    //     }
    //     setError(newErrors)
    //     return isValid
    // }




    async function getMovingData() {

        axios.get(`${BASE_URL}/getbatchmoving`)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getcourse = () => {

        const data = {
            tablename: "Course_Mst",
            columnname: "Course_Id,Course_Name"
        }

        axios.post(`${BASE_URL}/get_new_data`, data)
            .then((res) => {
                console.log(res.data)
                setCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getBatch = async (id) => {
        setCourseid(id)
        const data = {
            courseid: id
        }


        if (id) {
            axios.post(`${BASE_URL}/getcoursewisebatch`, data)
                .then((res) => {
                    console.log(res.data)
                    setBatch(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            try {
                const res = await axios.get(`${BASE_URL}/getbatch`, data);

                setBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


    }


    const getStudent = async (code) => {
        setBatchid(code)
        const data = {
            batch_code: code
        }
        if (code) {
            axios.post(`${BASE_URL}/getbatchwisestudent`, data)
                .then((res) => {

                    setStudent(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_new_data`,
                    { tablename: "Student_Master", columnname: "Student_Id,Student_Name" });

                setStudent(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


    }


    useEffect(() => {
        getcourse()
        getMovingData()
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
            tablename: "awt_batchmoving"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])
                setCourseid(res.data[0].course)
                setBatchid(res.data[0].batch_code)
                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_batchmoving"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getMovingData()

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
        e.preventDefault();

        const data = {
            selectcourse: courseid,
            batchno: batchid,
            student: value.student,
            newbatch: value.newbatch,
            uid: uid.id || undefined // Send undefined if uid.id doesn't exist
        };

        axios.post(`${BASE_URL}/add_batchmoving`, data)
            .then((res) => {
                // Check the response message to show appropriate alert
                if (res.data === "Data Inserted") {
                    alert("Student Move  successfully!");
                } else if (res.data === "Data Updated") {
                    alert("Batch movement record updated successfully!");
                } else if (res.data === "No data updated") {
                    alert("No changes were made to the record.");
                } else {
                    alert("Operation completed: " + res.data);
                }

                getMovingData();

                // Reset form fields
                setValue({
                    student: "",
                    newbatch: "",
                });
                setUid({}); // Changed from array to object if that's what you're using
                setCourseid("");
                setBatchid("");
            })
            .catch((err) => {
                console.error("Error:", err);
                if (err.response) {
                    // Show more detailed error message from backend if available
                    alert(`Error: ${err.response.data.error || 'Something went wrong'}`);
                } else {
                    alert("Network error or server is not responding");
                }
            });
    };


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    const roledata = {
        role: Cookies.get(`role`),
        pageid: 86,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);


    const columns = [
        {
            field: 'index',
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 0.5,
            filterable: false,

        },
        { field: 'Course_Name', headerName: 'Select Course', flex: 1.5 },
        { field: 'batch_code', headerName: 'Batch No.', flex: 1.5 },
        { field: 'Student_Name', headerName: 'Student', flex: 1.5 },
        { field: 'newbatch_code', headerName: 'New Batch', flex: 1.5 },

        // {
        //     field: 'actions',
        //     type: 'actions',
        //     // headerName: 'Action',
        //     flex: 1,
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 {/* {roleaccess > 2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />}
        //                 {roleaccess > 3 && <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />} */}
        //             </>
        //         )
        //     }
        // },
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Move Batch</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className="text-danger">*</span></label>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={courseid} name='course' onChange={(e) => getBatch(e.target.value)}>
                                                    <option>Select Course</option>
                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>

                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Old Batch No.</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={batchid} name='batchno' onChange={(e) => getStudent(e.target.value)}>
                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>

                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Student</label>
                                                <select className='form-control form-control-lg'
                                                    id="exampleFormControlSelect1" value={value.student}
                                                    name='student' onChange={onhandleChange}>
                                                    <option>Select Student</option>
                                                    {student.map((item) => {
                                                        return (
                                                            <option value={item.Student_Id}>{item.Student_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">New Batch No</lable>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1" value={value.newbatch} name='newbatch' onChange={onhandleChange}>

                                                    <option value={``}>Select New Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>

                                                        )
                                                    })}
                                                </select>
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
                                    <div className='d-flex justify-content-between' style={{ borderBottom: "2px solid #dce4ec", width: "100%" }}>
                                        <div>
                                            <h4 class="card-title">View Moving Batch Details</h4>
                                        </div>

                                    </div>

                                    <div style={{ borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden" }}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
                                            pagination
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={setPaginationModel}
                                            pageSizeOptions={[50]}
                                            autoHeight={false}
                                            sx={{
                                                height: 500, // Ensure enough height for pagination controls
                                                '& .MuiDataGrid-footerContainer': {
                                                    justifyContent: 'flex-end',
                                                },
                                            }}
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

export default BatchMoving
