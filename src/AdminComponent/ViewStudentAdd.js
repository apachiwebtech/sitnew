import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const ViewStudentAdd = () => {

    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})

    const [value, setValue] = useState({
        coursename : "" || uid.coursename,
        batchcode : "" || uid.batchcode,

    })

    useEffect(() => {
        setValue({

            coursename : uid.coursename,
           batchcode : uid.batchcode,
   
        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.coursename) {
        isValid = false;
        newErrors.coursename = "CourseName is require"
       }
        if (!value.batchcode) {
            isValid = false;
            newErrors.batchcode = "BatchCode is require"
        }
        setError(newErrors)
        return isValid
    }

    const getbatch = async (id) => {

        const data = {
            courseid: id
        }

        try {
            const res = await 
            axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data);

        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };



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

    useEffect(() => {
        getCourseData()

        setUid([])
    }, [])



    async function getStudentCVData() {
        const data = {
            tablename : "viewstudent"
        }
        axios.post(`${BASE_URL}/get_data`,data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        // getStudentCVData()
        value.title = ""
        setError({})
        setUid([])
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault()

    if(validateForm()){
        const data = {
            coursename : value.coursename,
            batchcode : value.batchcode,
            uid:uid.id
        }


        axios.post(`${BASE_URL}/add_viewstudent`, data)
            .then((res) => {
               console.log(res)
               getStudentCVData()

            })
            .catch((err) => {
                console.log(err)
            })
    }
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
                                    <h4 class="card-title">Latested CVUpdated</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            
                                        <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                value={value.course} name='course' onChange={(e) => getbatch(e.target.value)}>
                                                    <option>Select Course</option>

                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className='text-danger'> {error.selectcourse} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch</label>
                                                <select class="form-control form-control-lg" id="exampleFromControlSelect1" 
                                                value={value.batch} name='batch' onChange={onhandleChange}>

                                                    <option>Select Batch</option>

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
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Student View</h4>
                                        </div>

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

export default ViewStudentAdd