import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
//import FormControlLabel from '@mui/material/FormControlLabel';

const FAcademicQualification = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const [value, setValue] = useState({
        course: "" || uid.course,
        batch: "" || uid.batch,
        student: "" || uid.student,
        date: "" || uid.date,
        feedback: "" || uid.feedback,
        srno: "" || uid.srno,





    })

    useEffect(() => {
        setValue({
            course: uid.course,
            batch: uid.batch,
            student: uid.student,
            date: uid.date,
            feedback: uid.feedback,
            srno: uid.srno,


        })
    }, [uid])




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
            tablename: "feedback1"
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
            tablename: "feedback1"
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
            tablename: "feedback1"
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
            student: value.student,
            date: value.date,
            feedback: value.feedback,
            srno: value.srno,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_feedback1`, data)
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
        { field: 'student', headerName: 'Student', flex: 2 },
        { field: 'date', headerName: 'Date', flex: 2 },
        { field: 'feedback', headerName: 'Feedback', flex: 2 },
        { field: 'srno', headerName: 'Sr. No.', flex: 2 },

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
                        <div class="d-flex">

                            <div className='px-2 mx-2'><Link to="/faculty/:facultyid"><h4>Personal Information</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/facademicqualification"><h4>Academic Qualification</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/addfacultymaster"><h4>Current Experience/Other Details</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/facultyexperience"><h4>Total Experience and Documents</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/facultydiscussion"><h4>Discussion</h4></Link></div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Edit Faculty</h4>
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

                                        
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Edit Faculty</h4>
                                <hr></hr>
                                <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                    <div class='row'>


                                        <div class="form-group col-lg-2">
                                            <label for="exampleFormControlSelect1">Select Course<span className='text-danger'>*</span> </label>
                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                <option>Select</option>
                                                <option>Administration</option>
                                                <option>Business Development</option>
                                                <option>Training &amp; Development</option>
                                                <option>Account</option>
                                                <option>Placement</option>
                                                <option>Purchase</option>
                                                <option>Leadership / DD</option>
                                                <option>Quality Assurance</option>
                                                <option>Human Resources</option>
                                                <option>Corporate Training</option>
                                                <option>Test User</option>
                                            </select>
                                        </div>

                                        <div class="form-group col-lg-2">
                                            <label for="exampleFormControlSelect1">Select Batch<span className='text-danger'>*</span> </label>
                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                <option></option>

                                            </select>
                                        </div>

                                        <div class="form-group col-lg-2">
                                            <label for="exampleFormControlSelect1">Student Name<span className='text-danger'>*</span> </label>
                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.student} onChange={onhandleChange} name='student'>
                                                <option></option>

                                            </select>
                                        </div>



                                        <div class="form-group col-lg-2">
                                            <label for="exampleInputUsername1">Date</label>
                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />

                                        </div>

                                        <div class="form-group col-lg-2">
                                            <label for="exampleFormControlSelect1">Feedback<span className='text-danger'>*</span> </label>
                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.feedback} onChange={onhandleChange} name='feedback'>
                                                <option></option>

                                            </select>
                                        </div>

                                        <div class="form-group col-lg-2">
                                            <label for="exampleInputUsername1">Sr No</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.srno} name='srno' onChange={onhandleChange} />

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
                </div>
            </div >
        </div >

    )
}

export default FAcademicQualification
