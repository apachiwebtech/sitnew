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

const StudentBatch = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const  [category , setCat] = useState('')
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
        // category: "" || uid.category




    })

    useEffect(() => {
        setValue({
            training: uid.training,
            attendee: uid.attendee,
            // category: uid.category

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
            tablename: "awt_studentbatch"
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
            tablename: "awt_studentbatch"
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

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_studentbatch"
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

        // if(validateForm()){
        const data = {

            course: value.course,
            batch: value.batch,
            // category: value.category,
            uid: uid.id,
            
        }


        axios.post(`${BASE_URL}/add_studentbatch`, data)
            .then((res) => {
                console.log(res)
                getEmployeeData()

            })
            .catch((err) => {
                console.log(err)
            })
        // }





    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
        { field: 'course', headerName: 'Course', flex: 2 },
        { field: 'batch', headerName: 'Batch', flex: 2 },
        // { field: 'category', headerName: 'Category', flex: 2 },

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


    const handleradiochange = (e) => {
        console.log(e.target.value)

        setCat(e.target.value)
    }
    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Student Batch Wise</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="from-group col-lg-12">
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        onChange={(e) =>handleradiochange(e)}
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"  >
                                                        <FormControlLabel value="0102" control={<Radio />} label="Student Name" />
                                                        <FormControlLabel value="0103" control={<Radio />} label="Assignment" />
                                                        <FormControlLabel value="0104" control={<Radio />} label="Lecture Plan" />
                                                        <FormControlLabel value="0105" control={<Radio />} label="Study Material" />
                                                        <FormControlLabel value="0106" control={<Radio />} label="Standard Lecture Plan" />
                                                        <FormControlLabel value="0107" control={<Radio />} label="Session Plan" />
                                                        <FormControlLabel value="0108" control={<Radio />} label="Time Sheet" />
                                                        <FormControlLabel value="0109" control={<Radio />} label="Lecture Taken" />
                                                        <FormControlLabel value="0110" control={<Radio />} label="Acomodation" />
                                                        <FormControlLabel value="0111" control={<Radio />} label="Viva/MOC" />
                                                        <FormControlLabel value="0112" control={<Radio />} label="Blank Attendance" />
                                                        <FormControlLabel value="0113" control={<Radio />} label="Assignment Receipt" />
                                                        <FormControlLabel value="0114" control={<Radio />} label="Test Taken" />
                                                        <FormControlLabel value="0115" control={<Radio />} label="Analysis" />
                                                        <FormControlLabel value="0116" control={<Radio />} label="ID Card" />
                                                        <FormControlLabel value="0117" control={<Radio />} label="New Lecture Mail" />
                                                        <FormControlLabel value="0118" control={<Radio />} label="Student Label" />

                                                    </RadioGroup>
                                                </FormControl>

                                                {/* <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                    <RadioGroup
                                                      onChange={handleradiochange}
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                    </RadioGroup>
                                                </FormControl> */}

                                            </div>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Select Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>Select</option>
                                                    <option>Piping Design & Drafting</option>
                                                    <option>MEP Engineering (Mechanical, Electrical & Plumbing)</option>
                                                    <option>Engineering Design & Drafting</option>
                                                    <option>Electrical & Instrumentation Design and Drafting</option>
                                                    <option>Training in Process Plant System Modelling Using E3D</option>
                                                </select>
                                            </div>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Select Batch<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option></option>
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
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Student Batch Wise Report</h4>
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



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default StudentBatch
