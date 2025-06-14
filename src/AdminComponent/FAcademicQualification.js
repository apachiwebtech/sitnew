import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
import Faculty from "./Faculty";
//import FormControlLabel from '@mui/material/FormControlLabel';

const FAcademicQualification = () => {

    const { facultyid } = useParams();
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})

    const [value, setValue] = useState({
        course: '',
        batch: '',
        student: '',
        date: '',
        feedback: '',
        srno: '',

    })


    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}


    //     if (!value.facultyname) {
    //         isValid = false;
    //         newErrors.facultyname = "Faculty Name is Required"
    //     }

    //     if (!value.maritalstatus) {
    //         isValid = false;
    //         newErrors.maritalstatus = "Marital Status is Required"
    //     }

    //     if (!value.address) {
    //         isValid = false;
    //         newErrors.address = "Address is Required"
    //     }


    //     setError(newErrors)
    //     return isValid
    // }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: facultyid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        setValue(prevState => ({
            ...prevState,
            course: data[0].course,
            batch: data[0].batch,
            student: data[0].student,
            date: data[0].date,
            feedback: data[0].feedback,
            srno: data[0].srno,
        }))
    }
    useEffect(() => {
        if (':facultyid' !== ":facultyid") {
            getStudentDetail()
        }

        value.title = ""
        setError({})
        setUid([])
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        // if (validateForm()) {
        if (facultyid == ":facultyid") {
            response = await fetch(`${BASE_URL}/add_faculty_master`, {
                method: 'POST',
                body: JSON.stringify({
                    Faculty_Name: value.Faculty_Name,
                    Faculty_Code: value.Faculty_Code,
                    DOB: value.DOB,
                    Nationality: value.Nationality,
                    discipline: value.discipline,
                    status: value.status,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updatefaculty`, {
                method: 'POST',
                body: JSON.stringify({

                    course: value.course,
                    batch: value.batch,
                    student: value.student,
                    date: value.date,
                    feedback: value.feedback,
                    srno: value.srno,





                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }



        // }
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    //const rowsWithIds = feedback1data.map((row, index) => ({ index: index + 1, ...row }));


    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="d-flex">

                            <div className='px-2 mx-2'><Link to={`/faculty/${facultyid}`}><h4>Personal Information</h4></Link></div>
                           
                            <div className='px-2 mx-2'><Link to={`/addfacultymaster/${facultyid}`}><h4>Current Experience/Other Details</h4></Link></div>
                             <div className='px-2 mx-2'><Link to="/academicqualification"><h4>Academic Qualification</h4></Link></div>

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
                                            //rows={rowsWithIds}
                                            //columns={columns}
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
                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                value={value.course} onChange={onhandleChange} name='course'>
                                                <option>Select</option>
                                            </select>
                                        </div>

                                        <div class="form-group col-lg-2">
                                            <label for="exampleFormControlSelect1">Select Batch<span className='text-danger'>*</span> </label>
                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                value={value.batch} onChange={onhandleChange} name='batch'>
                                                <option></option>

                                            </select>
                                        </div>

                                        <div class="form-group col-lg-2">
                                            <label for="exampleFormControlSelect1">Student Name<span className='text-danger'>*</span> </label>
                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                value={value.student} onChange={onhandleChange} name='student'>
                                                <option></option>

                                            </select>
                                        </div>



                                        <div class="form-group col-lg-2">
                                            <label for="exampleInputUsername1">Date</label>
                                            <input type="date" class="form-control" id="exampleInputUsername1"
                                                value={value.date} name='date' onChange={onhandleChange} />

                                        </div>

                                        <div class="form-group col-lg-2">
                                            <label for="exampleFormControlSelect1">Feedback<span className='text-danger'>*</span> </label>
                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                value={value.feedback} onChange={onhandleChange} name='feedback'>
                                                <option></option>

                                            </select>
                                        </div>

                                        <div class="form-group col-lg-2">
                                            <label for="exampleInputUsername1">Sr No</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1"
                                                value={value.srno} name='srno' onChange={onhandleChange} />

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
