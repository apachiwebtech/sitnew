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

    const { inquiryid } = useParams();
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({
        firstname: '',
        gender: '',
        dob: '',
        mobile: '',
        whatsapp: '',
        email: '',
        nationality: '',
        discussion: '',
        country: '',
        InquiryDate: '',
        modeEnquiry: '',
        advert: '',
        programmeEnquired: '',
        selectedProgramme: '',
        category: '',
        batch: '',
        qualification: '',
        descipline: '',
        percentage: '',
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
                id: inquiryid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        console.log(data, "DATA A GAYA!");

        setValue(prevState => ({
            ...prevState,
            firstname: data[0].Student_Name,
            gender: data[0].Sex,
            dob: data[0].DOB,
            mobile: data[0].present_mobile,
            whatsapp: '',
            email: data[0].Email,
            nationality: data[0].Nationality,
            discussion: data[0].discussion,
            country: '',
            InquiryDate: data[0].Inquiry_Dt,
            modeEnquiry: data[0].Inquiry_Type,
            advert: '',
            programmeEnquired: '',
            selectedProgramme: data[0].Course_Id,
            category: '',
            batch: '',
            qualification: data[0].Qualification,
            descipline: data[0].Discipline,
            percentage: data[0].Percentage,
        }))
    }
    useEffect(() => {
        if(inquiryid !== ":studentid"){
            // getStudentDetail()
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
        if (inquiryid == ":studentid") {
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
                                                        <h4 className="card-title titleback">Information For Addmission</h4>
                                                    </div>
                                                    <div className='row'>
                                                    <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Course Name</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.gender} name='gender' onChange={onhandleChange} >
                                                                <option>Autocad</option>
                                                                <option>BE</option>
                                                                <option>Civil</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">BatchNo</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.gender} name='gender' onChange={onhandleChange} >
                                                                <option>35001</option>
                                                                <option>35002</option>
                                                               
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Admission Date</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.dob} placeholder="Contact Person" name='dob' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Roll No.</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.dob} placeholder="Contact Person" name='dob' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Student's Name<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.firstname} placeholder="Student's Name" name='firstname' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
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