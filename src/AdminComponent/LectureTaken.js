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


const LectureTaken = () => {

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


        if (!value.course) {
            isValid = false;
            newErrors.course = "Name is Require"
        }

        if (!value.batch) {
            isValid = false;
            newErrors.batch = "Batch is Require"
        }

        if (!value.lecturedate) {
            isValid = false;
            newErrors.lecturedate = "Lecture Date is Require"
        }

        if (!value.faculty) {
            isValid = false;
            newErrors.faculty = "Faculty is Require"
        }

        if (!value.assignmentdate) {
            isValid = false;
            newErrors.assignmentdate = "AssignmentDate is Require"
        }

        if (!value.material) {
            isValid = false;
            newErrors.material = "Matrerial is Require"
        }

        if (!value.assignmentgiven) {
            isValid = false;
            newErrors.assignmentgiven = "AssignmentGiven is Require"
        }

        if (!value.assignment) {
            isValid = false;
            newErrors.assignment = "Assignment is Require"
        }

        if (!value.testgiven) {
            isValid = false;
            newErrors.testgiven = "TestGiven is Require"
        }

        if (!value.test) {
            isValid = false;
            newErrors.test = "Test is Require"
        }

        if (!value.topicdescuss) {
            isValid = false;
            newErrors.topicdescuss = "TopicDescuss is Require"
        }

        if (!value.nextplanning) {
            isValid = false;
            newErrors.nextplanning = "NextPlanning is Require"
        }

        setError(newErrors)
        return isValid
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



        setValue(prevState => ({
            ...prevState,
            course: data[0].course,
            batch: data[0].batch,
            lecture: data[0].lecture,
            classroom: data[0].classroom,
            lecturedate: data[0].lecturedate,
            time: data[0].time,
            to: data[0].to,
            faculty: data[0].faculty,
            facultytime: data[0].facultytime,
            timeto: data[0].timeto,
            assignmentadate: data[0].assignmentadate,
            enddate: data[0].enddate,
            materialissued: data[0].materialissued,
            material: data[0].material,
            assignmentgive: data[0].assignmentgive,
            assignment: data[0].assignment,
            testgiven: data[0].testgiven,
            test: data[0].test,
            topicdescuss: data[0].topicdiscuss,
            nextplanning: data[0].nextplanning,
        }))
    }
    useEffect(() => {
        if (lecturetakenid !== ":lecturetakenid") {
            getStudentDetail()
        }

        value.title = ""
        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        if (validateForm()) {
            if (lecturetakenid == ":lecturetakenid") {
                response = await fetch(`${BASE_URL}/add_lecturetaken`, {
                    method: 'POST',
                    body: JSON.stringify({
                        course: value.course,
                        batch: value.batch,
                        lecture: value.lecture,
                        classroom: value.classroom,
                        lecturedate: value.lecturedate,
                        time: value.time,
                        to: value.to,
                        faculty: value.faculty,
                        facultytime: value.facultytime,
                        timeto: value.timeto,
                        assignmentadate: value.assignmentadate,
                        enddate: value.enddate,
                        materialissued: value.materialissued,
                        material: value.material,
                        assignmentgive: value.assignmentgive,
                        assignment: value.assignment,
                        testgiven: value.testgiven,
                        test: value.test,
                        topicdescuss: value.topicdiscuss,
                        nextplanning: value.nextplanning,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                response = await fetch(`${BASE_URL}/updatelecturetaken`, {
                    method: 'POST',
                    body: JSON.stringify({

                        course: value.course,
                        batch: value.batch,
                        lecture: value.lecture,
                        classroom: value.classroom,
                        lecturedate: value.lecturedate,
                        time: value.time,
                        to: value.to,
                        faculty: value.faculty,
                        facultytime: value.facultytime,
                        timeto: value.timeto,
                        assignmentadate: value.assignmentadate,
                        enddate: value.enddate,
                        materialissued: value.materialissued,
                        material: value.material,
                        assignmentgive: value.assignmentgive,
                        assignment: value.assignment,
                        testgiven: value.testgiven,
                        test: value.test,
                        topicdescuss: value.topicdiscuss,
                        nextplanning: value.nextplanning,


                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }





            const data = await response.json();

            alert(data.message)
            //   window.location.pathname = '/inquirylisting'


        }
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
                                        <div className='col-md-12 col-lg-12'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Lecture Taken</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleFormControlSelect1">Course<span className="text-danger">*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} name='course' onChange={onhandleChange} >

                                                                <option selected="selected" value="Select Course">Select Course</option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                                <option>Basics AutoCAD – 2D</option>
                                                                <option>Civil/Structural Design &amp; Drafting </option>
                                                                <option>Electrical &amp; Instrumentation Design and Drafting </option>
                                                                <option>Electrical System Design</option>
                                                                <option>Engineering Design &amp; Drafting </option>
                                                                <option>Fire Alarm and Protection System </option>
                                                                <option>Fundamentals of Offshore</option>
                                                                <option>Health, Safety &amp; Environment in Construction</option>
                                                                <option>HVAC Design and Drafting</option>
                                                                <option>Masonry/Carpentry</option>
                                                                <option>Mechanical Design of Process Equipment</option>
                                                                <option>MEP Engineering (Mechanical, Electrical &amp; Plumbing)</option>
                                                                <option>Offshore Engineering</option>
                                                                <option>Others</option>
                                                                <option>Pipeline Engineering</option>
                                                                <option>Piping Design &amp; Drafting </option>
                                                                <option>Piping Engineering </option>
                                                                <option>Piping Materials</option>
                                                                <option>Plant Design Management System (PDMS)</option>
                                                                <option>PLANT LAYOUT DESIGN</option>
                                                                <option>Priventive </option>
                                                                <option>Process Engineering</option>
                                                                <option>Process Equipment Fabrication Engineering</option>
                                                                <option>Process Instrumentation &amp; Control</option>
                                                                <option>PV Elite </option>
                                                                <option>Rotating Equipment</option>
                                                                <option>Smart Plant P&amp;ID</option>
                                                                <option>Solar PV Power System with renewable Energy  </option>
                                                                <option>Structural Engineering </option>
                                                                <option>The Art of Developing a Balanced Personality</option>
                                                                <option>Water &amp; Waste Water Engg.</option>
                                                            </select>
                                                            {<span className='text-danger'>{error.course}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Batch<span className="text-danger">*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} name='batch' onChange={onhandleChange} >
                                                                <option></option>
                                                            </select>
                                                            {<span className="text-danger">{error.batch}</span>}
                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleexampleFormControlSelect1InputUsername1">Lecture</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.lecture} name='lecture' onChange={onhandleChange} >
                                                                <option></option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Class Room<span className="text-danger">*</span></label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.classroom} name='classroom' onChange={onhandleChange} >
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                            </select>
                                                            {<span className="text-danger"> {error.classroom} </span>}
                                                        </div>
                                                        <div className='form-group col-2'>
                                                            <label for="exampleInputUsername1">Lecture Date<span className="text-danger">*</span></label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.lecturedate} placeholder="Date" name='lecturedate' onChange={onhandleChange} />
                                                            {<span className="text-danger"> {error.lecturedate} </span>}
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <label for="exampleFormControlSelect1">From - Time</label>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.time}
                                                                name='time' onChange={onhandleChange}>
                                                                <option>--Select Time--</option>
                                                                <option>5:00 AM</option>
                                                                <option>5:15 AM</option>
                                                                <option>5:30 AM</option>
                                                                <option>5:45 AM</option>
                                                            </select>

                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <label for="exampleFormControlSelect1">To</label>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.to}
                                                                name='to' onChange={onhandleChange}>
                                                                <option>--Select Time--</option>
                                                                <option>5:00 AM</option>
                                                                <option>5:15 AM</option>
                                                                <option>5:30 AM</option>
                                                                <option>5:45 AM</option>
                                                            </select>

                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleFormControlSelect1">Faculty<span className="text-danger">*</span></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.faculty}
                                                                name='faculty' onChange={onhandleChange}>
                                                                <option>--Select Faculty--</option>
                                                                <option>Aadhar Classes</option>
                                                                <option>Abhay Gaikar</option>
                                                                <option>Abrar</option>
                                                                <option>Aditi Surana</option>
                                                            </select>
                                                            {<span className="text-danger"> {error.faculty} </span>}
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Faculty - Time</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.facultytime}
                                                                name='facultytime' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Time - To</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.timeto}
                                                                name='timeto' onChange={onhandleChange} />
                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Assignment/Test Start Date<span className='text-danger'>*</span></label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.assignmentdate} placeholder="Assignment*" name='assignmentadate' onChange={onhandleChange} />
                                                            {<span className='text-danger'>{error.assignmentdate}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">End Date<span className='text-danger'>*</span></label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.enddate} placeholder="End Date*" name='enddate' onChange={onhandleChange} />
                                                            {error.enddate && <span className='text-danger'>{error.enddate}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Material Issued</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.materialissued} name='materialissued' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Material<span className="text-danger">*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.material} name='material' onChange={onhandleChange} >
                                                                <option>Documents</option>
                                                                <option>LCD</option>
                                                                <option>None</option>
                                                                <option>Course Material</option>
                                                                <option>Xerox</option>
                                                            </select>
                                                            {<span className="text-danger"> {error.material} </span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Assignment Given<span className="text-danger">*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.assignmentgiven} name='assignmentgiven' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                            {<span className="text-danger"> {error.assignmentgiven} </span>}
                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Assignment<span className='text-danger'>*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.assignment} name='assignment' onChange={onhandleChange} >
                                                                <option></option>
                                                            </select>
                                                            {<span className='text-danger'> {error.assignment} </span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Test Given<span className='text-danger'>*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.testgiven} name='testgiven' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                            {<span className='text-danger'> {error.testgiven} </span>}
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Test<span className='text-danger'>*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.test} name='test' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                            {<span className='text-danger'> {error.test} </span>}
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Topic Descuss<span className='text-danger'>*</span></label>
                                                            <textarea class="form-control" id="exampleTextarea1" name='topicdescuss' value={value.topicdescuss} placeholder="Topic Descuss*" onChange={onhandleChange}></textarea>
                                                            {<span className='text-danger'> {error.topicdescuss} </span>}
                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Next Planning<span className='text-danger'>*</span></label>
                                                            <textarea class="form-control" id="exampleTextarea1" name='nextplanning' value={value.nextplanning} placeholder="Next Panning*" onChange={onhandleChange}></textarea>
                                                            {<span className='text-danger'> {error.nextplanning} </span>}
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>


                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                {/* <button className='col-2'>close</button> */}
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

export default LectureTaken