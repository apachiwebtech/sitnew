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

        course: '',
        batch: '',
        lecture: '',
        lecturedate: '',
        faculty: '',
        assignment: '',
        material: '',
        materialissued: '',
        topicdiscuss: '',
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
            course: data[0].Course_Name,
            batch: data[0].Batch,
            lecture: data[0].Lecture,
            lecturedata: data[0].Lecture_Data,
            faculty: data[0].Faculty,
            assignment: data[0].Email,
            material: data[0].Nationality,
            materialissued: data[0].discussion,
            topicdiscuss: data[0].topicdiscuss
        }))
    }
    useEffect(() => {
        if (lecturetakenid !== ":lecturetakenid") {
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
            response = await fetch(`${BASE_URL}/add_lecturetaken`, {
                method: 'POST',
                body: JSON.stringify({
                    course: value.course,
                    batch: value.batch,
                    lecture: value.lecture,
                    lecturedata: value.lecturedate,
                    faculty: value.faculty,
                    assignment: value.assignment,
                    material: value.material,
                    materialissued: value.materialissued,
                    topicdiscuss: value.topicdiscuss,
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
                    lecturedata: value.lecturedate,
                    faculti: value.faculty,
                    assignment: value.whatsapp,
                    material: value.email,
                    materialissued: value.nationality,
                    topicdiscuss: value.discussion,

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
                                                            <label for="exampleInputUsername1">Course</label>
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
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Batch</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} name='batch' onChange={onhandleChange} >
                                                                <option></option>
                                                            </select>
                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Lecture</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.lecture} name='lecture' onChange={onhandleChange} >
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Class Room</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.classroom} name='class' onChange={onhandleChange} >
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                            </select>
                                                        </div>
                                                        <div className='form-group col-2'>
                                                            <label for="exampleInputUsername1">Lecture Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.lecturedate} placeholder="Date" name='lecturedate' onChange={onhandleChange} />
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Assignment/Test Start Date<span className='text-danger'>*</span></label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.assignmentdate} placeholder="Assignment*" name='assignmentadate' onChange={onhandleChange} />
                                                            {error.assignmentdate && <span className='text-danger'>{error.assignmentdate}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">End Date<span className='text-danger'>*</span></label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.enddate} placeholder="End Date*" name='enddate' onChange={onhandleChange} />
                                                            {error.enddate && <span className='text-danger'>{error.enddate}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Material Issued</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.materialissued} name='materialissued' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Material</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.material} name='material' onChange={onhandleChange} >
                                                                <option>Documents</option>
                                                                <option>LCD</option>
                                                                <option>None</option>
                                                                <option>Course Material</option>
                                                                <option>Xerox</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Assignment Given</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.assignmentgive} name='assignmentgiven' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Assignment</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.assignment} name='assignment' onChange={onhandleChange} >
                                                                <option></option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Test Given</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.testgiven} name='testgiven' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Test</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.test} name='test' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-6">
                                                            <label for="exampleTextarea1">Topic Descuss</label>
                                                            <textarea class="form-control" id="exampleTextarea1" name='topicdescuss' value={value.topicdescuss} placeholder="Topic Descuss*" onChange={onhandleChange}></textarea>
                                                            {error.topicdescuss && <div className="text-danger">{error.topicdescuss}</div>}
                                                        </div>
                                                        <div class="form-group col-lg-6">
                                                            <label for="exampleTextarea1">Next Planning</label>
                                                            <textarea class="form-control" id="exampleTextarea1" name='nextplanning' value={value.nextplanning} placeholder="Next Panning*" onChange={onhandleChange}></textarea>
                                                            {error.nextplanning && <div className="text-danger">{error.nextplanning}</div>}
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