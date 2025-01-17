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


const CVUpdated = () => {

    const [coursedata, setCourseData] = useState([])
    const [courseid, setCourseId] = useState([])
    const [batchid, setbatchId] = useState([])
    const [batch, setBatch] = useState([])
    const [student, setStudent] = useState([])
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})




    const [value, setValue] = useState({
        college_name: "" || uid.college_name,
        university: "" || uid.university,
        contact_person: "" || uid.contact_person,
        designation: "" || uid.designation,



    })




    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!batchid) {
            isValid = false;
            newErrors.batchid = "This is required"
        }

        setError(newErrors)
        return isValid
    }


    async function getCourseData() {
        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                setCourseData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }



    async function getbatch(courseid) {
        setCourseId(courseid)
        const data = {
            courseid: courseid
        }
        axios.post(`${BASE_URL}/getcoursewisebatch`, data)
            .then((res) => {
                setBatch(res.data)
            })
            .catch((err) => {
                console.log(err)
            })


    }

    async function getbatchwisestudent(batchid) {
        setbatchId(batchid)

        if (validateForm()) {
            const data = {
                Batch_Id: batchid
            }
            axios.post(`${BASE_URL}/getcvStudent`, data)
                .then((res) => {
                    setStudent(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }



    }

    useEffect(() => {
        getCourseData()
    }, [])








    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Latested CVUpdated</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3">
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} placeholder="Purpose" name='date' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course Name<span className='text-danger'>*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={courseid} onChange={(e) => getbatch(e.target.value)} name='coursename'>

                                                    <option> Select Course</option>
                                                    {coursedata.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}


                                                </select>
                                                {error.batchid && <span className='text-danger'>{error.batchid}</span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchcode} onChange={(e) => getbatchwisestudent(e.target.value)} name='batchcode'>
                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                            </div>






                                        </div>



                                    </form>

                                </div>
                            </div>
                        </div>


                       {student.length > 0 ?    <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <table className='text-center'>
                                            <thead>
                                                <th>Select</th>
                                                <th>Student Name </th>
                                                <th>Student Id </th>
                                            </thead>
                                            <tbody>
                                                {student.map((item) => {
                                                    return (
                                                        <tr >
                                                            <td>
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />

                                                                </div>
                                                            </td>
                                                            <td>{item.Student_Name}</td>
                                                            <td>{item.Student_Id}</td>
                                                        </tr>
                                                    )
                                                })}


                                            </tbody>
                                        </table>
                                    </div>

                                    <div className='text-right my-4'>
                                        <button type="submit" class="btn btn-primary mr-2">Save</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Report</button>
                                    </div>




                                </div>
                            </div>
                        </div>:null} 
                    
                    </div>
                </div>
            </div >
        </div >

    )
}

export default CVUpdated