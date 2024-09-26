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


const ProjectMaster = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const { inquiryid } = useParams();
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({
    
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


  

    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: inquiryid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

  

        setValue(prevState => ({
            ...prevState,
 
        }))
    }
    useEffect(() => {
        if (inquiryid !== ":inquiryid") {
            getStudentDetail()
        }

        value.title = ""
        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        // if(validateForm()){
        if (inquiryid == ":inquiryid") {
            response = await fetch(`${BASE_URL}/postInquiry`, {
                method: 'POST',
                body: JSON.stringify({
                    firstname: value.firstname,
                    gender: value.gender,
                    dob: value.dob,
                    mobile: value.mobile,
                    whatsapp: value.whatsapp,
                    email: value.email,
                    nationality: value.nationality,
                    discussion: value.discussion,
                    country: value.country,
                    InquiryDate: value.InquiryDate,
                    modeEnquiry: value.modeEnquiry,
                    advert: value.advert,
                    programmeEnquired: value.programmeEnquired,
                    selectedProgramme: value.selectedProgramme,
                    category: value.category,
                    batch: value.batch,
                    qualification: value.qualification,
                    descipline: value.descipline,
                    percentage: value.percentage,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updateInquiry`, {
                method: 'POST',
                body: JSON.stringify({
                    Enquiry_Id: inquiryid,
                    firstname: value.firstname,
                    gender: value.gender,
                    dob: value.dob,
                    mobile: value.mobile,
                    whatsapp: value.whatsapp,
                    email: value.email,
                    nationality: value.nationality,
                    discussion: value.discussion,
                    country: value.country,
                    InquiryDate: value.InquiryDate,
                    modeEnquiry: value.modeEnquiry,
                    advert: value.advert,
                    programmeEnquired: value.programmeEnquired,
                    selectedProgramme: value.selectedProgramme,
                    category: value.category,
                    batch: value.batch,
                    qualification: value.qualification,
                    descipline: value.descipline,
                    percentage: value.percentage,
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
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Edit Inquiry</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-8 ">
                                                            <label for="exampleInputUsername1">Name<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.firstname} placeholder="Name*" name='firstname' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Gender</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.gender} name='gender' onChange={onhandleChange} >
                                                                <option>Male</option>
                                                                <option>Female</option>
                                                                <option>Other</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Date Of Brith</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.dob} placeholder="Contact Person" name='dob' onChange={onhandleChange} />

                                                        </div>
                                                        <div className='form-group col-4'>
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={value.mobile} placeholder="Number" name='mobile' onChange={onhandleChange} />
                                                        </div>
                                                        <div className='form-group col-4'>
                                                            <label for="exampleInputUsername1">Whatsapp Number</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={value.whatsapp} placeholder="Number" name='whatsapp' onChange={onhandleChange} />
                                                        </div>
                                                    </div>


                                                    <div className='row'>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Email<span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.email} placeholder="Name*" name='email' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>
                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Nationality<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.nationality} placeholder="Nationality*" name='nationality' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.country} placeholder="Name*" name='country' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>
                                                    </div>

                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleTextarea1">Discussion </label>
                                                        <textarea className="form-control" id="exampleTextarea1" value={value.discussion} placeholder="Discussion" name='discussion' onChange={onhandleChange}></textarea>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Status Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.dob} placeholder="Contact Person" name='dob' onChange={onhandleChange} disabled />

                                                        </div>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Set Status</label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.gender} name='gender' onChange={onhandleChange} disabled>
                                                                <option>Male</option>
                                                                <option>Female</option>
                                                                <option>Other</option>
                                                            </select>
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
                                                        <h4 className="card-title titleback">Inquiry Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Inquiry Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.InquiryDate} placeholder="Contact Person" name='InquiryDate' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Mode Of Inquiry</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.modeEnquiry} name='modeEnquiry' onChange={onhandleChange} >
                                                                <option>Mail</option>
                                                                <option>Person</option>
                                                                <option>Phone</option>
                                                                <option>OnlineMail</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-5 ">
                                                            <label for="exampleInputUsername1">How they come to know about SIT	    </label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.advert} name='advert' onChange={onhandleChange} >
                                                                <option>Advertisement</option>
                                                                <option>facebook</option>
                                                                <option>Google</option>
                                                            </select>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Training Programme & batch details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Programme inquired	</label>
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.programmeEnquired} placeholder="Discussion" name='programmeEnquired' onChange={onhandleChange}></textarea>

                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className="form-group col-lg-5">
                                                            <label for="exampleInputUsername1">Selected Training Programme	</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selectedProgramme} name='selectedProgramme' onChange={onhandleChange} >
                                                                {Course.map((item) => {
                                                                    return <option>{item.Course_Name}</option>
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Category</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.category} name='category' onChange={onhandleChange} >
                                                                {batchCategoty?.map((item) => {
                                                                    return <option>{item.BatchCategory}</option>
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-3">
                                                            <label for="exampleInputUsername1">Batch</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} name='batch' onChange={onhandleChange} >
                                                                <option>Male</option>
                                                                <option>Female</option>
                                                                <option>Other</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Education Qualification & Work</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Qualification</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.qualification} name='qualification' onChange={onhandleChange} >
                                                                {
                                                                    Education.map((item) => {
                                                                        return (
                                                                            <option>{item.Education}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Descipline</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.descipline} name='descipline' onChange={onhandleChange} >
                                                                {
                                                                    Discipline.map((item) => {
                                                                        return (
                                                                            <option>{item.Deciplin}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Percentage<span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.percentage} placeholder="Percentage" name='percentage' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
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

export default ProjectMaster