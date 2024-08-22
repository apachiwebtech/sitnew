import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';

const ConsultancyReport = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
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
        training: "" || uid.training,
        attendee: "" || uid.attendee,
        instructor: "" || uid.instructor,
        description: "" || uid.description,
        feedback: "" || uid.feedback,




    })

    useEffect(() => {
        setValue({
            training: uid.training,
            attendee: uid.attendee,
            instructor: uid.instructor,
            description: uid.description,
            feedback: uid.feedback,

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
            tablename: "awt_employeerecord"
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
            tablename: "awt_employeerecord"
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
            tablename: "awt_employeerecord"
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

            training: value.training,
            attendee: value.attendee,
            instructor: value.instructor,
            description: value.description,
            feedback: value.feedback,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_employeerecord`, data)
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






    // const columns = [
    //     {
    //         field: 'index',
    //         headerName: 'Id',
    //         type: 'number',
    //         align: 'center',
    //         headerAlign: 'center',
    //         flex: 1,
    //         filterable: false,

    //     },
    //     { field: 'attendee', headerName: 'Attendee', flex: 2},
    //     { field: 'instructor', headerName: 'Instructor', flex: 2},
    //     { field: 'description', headerName: 'Description', flex: 2},
    //     { field: 'feedback', headerName: 'FeedBack', flex: 2},

    //     {
    //         field: 'actions',
    //         type: 'actions',
    //         headerName: 'Action',
    //         flex: 1,
    //         renderCell: (params) => {
    //             return (
    //                 <>
    //                     <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
    //                     <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
    //                 </>
    //             )
    //         }
    //     },
    // ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Consultancy Report</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    
                                                        <option>Select Course</option>
                                                        <option> Training in Process Plant System Modelling Using E3D</option>
                                                        <option>Advance Pipe Stress Analysis </option>

                                                    </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">City<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.city} onChange={onhandleChange} name='city'>
                                                    <option>Select City</option>
                                                    <option>Thane(W)</option>
                                                    <option>,Andhra Pradesh,</option>
                                                    <option >380 015</option>
                                                    
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Purpose <span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.purpose} onChange={onhandleChange} name='purpose'>
                                                    <option></option>
                                                    <option>Meeting</option>
                                                    <option>Others</option>
                                                    <option>Placement</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">From Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.fromdate} name='fromdate' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">To Date</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.todate} name='todate' onChange={onhandleChange} />
                                            </div>

                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Go</button>

                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Details</h4>
                                        </div>

                                    </div>

                                    {/* <div>
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
                                    </div> */}

                                    <button type="submit" class="btn btn-primary mr-2">Print</button>
                                    <button type='button' onClick={() => {
                                        window.location.reload()
                                    }} class="btn btn-primary mr-2">Close</button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default ConsultancyReport
