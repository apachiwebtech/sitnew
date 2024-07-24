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


const AssignmentsTaken = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const { lecturetakenid } = useParams();
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({

        course: ' ',
        batch: ' ',
        lecture: ' ',
        classroom: ' ',
        lecturedate: ' ',
        time: ' ',
        to: ' ',
        faculty: ' ',
        facultytime: ' ',
        timeto: ' ',
        assignmentadate: ' ',
        enddate: ' ',
        materialissued: ' ',
        material: ' ',
        assignmentgive: ' ',
        assignment: ' ',
        testgiven: ' ',
        test: ' ',
        topicdescuss: ' ',
        nextplanning: ' ',
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


    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getadmissionactivity`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setInquiryData(data);
    }

    const getDiscipline = async () => {
        const response = await fetch(`${BASE_URL}/getDiscipline`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setDescipline(data);
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
    const getEducation = async () => {
        const response = await fetch(`${BASE_URL}/getEducation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setEducation(data);
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
    const getBtachCategory = async () => {
        const response = await fetch(`${BASE_URL}/getBtachCategory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setbatchCategory(data);
    }

    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: lecturetakenid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        console.log(data, "DATA A GAYA!");

        setValue(prevState => ({
            ...prevState,
            coursename: data[0].coursename,
            batchcode: data[0].batchcode,
            assignmentname: data[0].assignmentname,
            maxmarks: data[0].assignmentadate,
            returndate: data[0].returndate,
        }))
    }
    useEffect(() => {
        if (':assignmentstakenid' !== ":assignmentstakenid") {
            getStudentDetail()
        }
        getInquiryData()
        getDiscipline();
        getEducation();
        getCourse();
        getBatch();
        getBtachCategory();
        value.title = ""
        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        // if(validateForm()){
        if (lecturetakenid == ":lecturetakenid") {
            response = await fetch(`${BASE_URL}/add_assignmenttaken`, {
                method: 'POST',
                body: JSON.stringify({
                    coursename: value.coursename,
                    batchcode: value.batchcode,
                    assignmentname: value.assignmentname,
                    maxmarks: value.maxmarks,
                    assignmentdate: value.assignmentadate,
                    returndate: value.returndate,

                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updatelecturetaken`, {
                method: 'POST',
                body: JSON.stringify({

                    coursename: value.coursename,
                    batchcode: value.batchcode,
                    assignmentname: value.assignmentname,
                    maxmarks: value.maxmarks,
                    assignmentdate: value.assignmentadate,
                    returndate: value.returndate,



                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }





        const data = await response.json();

        alert(data.message)
        //   window.location.pathname = '/inquirylisting'


        // }        
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
                                    <h4 class="card-title">Add Assignment Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.coursename} onChange={onhandleChange} name='coursename'>
                                                    <option>--Select--</option>
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

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchcode} onChange={onhandleChange} name='batchcode'>
                                                    <option>--Batch Code--</option>
                                                    <option>010021</option>
                                                    <option>010023</option>
                                                    <option>010024</option>
                                                    <option>010025</option>
                                                    <option>010026</option>
                                                    <option>010027</option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Assignment Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.assignmentname} onChange={onhandleChange} name='assignmentname'>
                                                    <option>--Assignment Name--</option>
                                                    <option>H.V.A.C-1</option>
                                                    <option>H.V.A.C-2</option>
                                                    <option>H.V.A.C-3</option>
                                                    <option>H.V.A.C-4</option>
                                                    <option>H.V.A.C-5</option>
                                                    <option>H.V.A.C-6</option>
                                                    <option>H.V.A.C-7</option>
                                                    <option>H.V.A.C-8</option>
                                                    <option>H.V.A.C-9</option>
                                                    <option>H.V.A.C-10</option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">	Max Marks</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.maxmarks}
                                                    placeholder="Max Marks" name='maxmarks' onChange={onhandleChange} disabled />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Assignment Date<span className='text-danger'>*</span> </label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.assignmentdate} name='assignmentdate' onChange={onhandleChange} />                                                    <option></option>


                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Return Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.returndate} name='returndate' onChange={onhandleChange} />

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
                </div>
            </div >
        </div >

    )
}

export default AssignmentsTaken
