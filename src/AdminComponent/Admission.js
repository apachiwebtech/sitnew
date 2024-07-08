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
import { Button, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';


const Admission = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [course, setCourse] = useState([])
    const { studentid } = useParams();
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({
        date: '',
        batch: '',
        roll: '',
        studentname: "",
        course: ""
    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.facultyname) {
            isValid = false;
            newErrors.name = "Name is require"
        }

        setError(newErrors)
        return isValid
    }




    const getCourse = async () => {
        const response = await fetch(`${BASE_URL}/getCourses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setCourse(data);
    }

    const getBatch = async () => {
        const response = await fetch(`${BASE_URL}/getBtach`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setBatch(data);
    }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/AdmitDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: studentid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

     

        setValue(prevState => ({
            ...prevState,
            date : data[0].Admission_Dt,
            course : data[0].Course_Id,
            studentname : data[0].Student_Name,
            batch :data[0].Batch_Code

        }))
    }

    useEffect(() => {
        if (studentid !== ":studentid") {
            getStudentDetail()
        }
        // getStudentDetail()
        getCourse()
        getBatch()
        value.title = ""
        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()

        // if(validateForm()){

        const response = await fetch(`${BASE_URL}/updateAdmission`, {
            method: 'POST',
            body: JSON.stringify({
                studentid: studentid,
                date: value.date,
                roll :value.roll,
                course : value.course,
                batch : value.batch,
                studentname : value.studentname,
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        
        
        
        
        
        
        const data = await response.json();
        
        alert("Admission done")

        //   window.location.pathname = '/inquirylisting'


        // }        
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    return (

        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Information For Addmission</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Course Name</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} name='course' onChange={onhandleChange} >
                                                                <option>Select Course</option>
                                                                {course.map((item) => {
                                                                    return (
                                                                        <option key={item.id} value={item.Course_Id}>{item.Course_Name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">BatchNo</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} name='batch' onChange={onhandleChange} >

                                                                <option>Select Batch</option>
                                                                {batch.map((item) => {
                                                                    return (

                                                                        <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                                    )
                                                                })}

                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Admission Date</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} placeholder="Contact Person" name='date' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Roll No.</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.roll} placeholder="Roll No" name='roll' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Student Name</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.studentname} placeholder="Student's Name" name='studentname' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.studentname}</span>}
                                                        </div>






                                                    </div>


                                                </div>
                                            </div>


                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                {/* <button className='col-2'>close</button> */}
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Batch Fees structure</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Lumpsum Amount</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.InquiryDate} placeholder="Lumpsum Amount" name='InquiryDate' onChange={onhandleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Installment Amount</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.InquiryDate} placeholder="Installment Amount" name='InquiryDate' onChange={onhandleChange} />

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Student Fees Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Payment Type</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.gender} name='gender' onChange={onhandleChange} >
                                                                <option>Lumpsum</option>
                                                                <option>Installment</option>

                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Fees Amount</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.InquiryDate} placeholder="Fees Amount" name='InquiryDate' onChange={onhandleChange} />

                                                        </div>
                                                    </div>



                                                </div>
                                            </div>

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

export default Admission