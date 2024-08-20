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
import { OndemandVideo, Padding } from '@mui/icons-material';




const AddCashVoucher = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const { projectmasterid } = useParams();
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({
        projectno: '',
        projectname: '',
        description: '',
        dworkorderob: '',
        wodate: '',
    })

    // const style = {
    //     border: '1px solid',
    //     Padding: '10px',
    //     margin: '10px'
    // }


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
                id: projectmasterid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        console.log(data, "DATA A GAYA!");


    }
    useEffect(() => {
        if (':addcashvoucherid' !== ":addcashvoucherid") {
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
        if (projectmasterid == ":addcashvoucherid") {
            response = await fetch(`${BASE_URL}/add_projectmaster`, {
                method: 'POST',
                body: JSON.stringify({
                    projectno: value.projectno,
                    projectname: value.firstname,
                    description: value.gender,
                    dworkorderob: value.dob,
                    wodate: value.mobile,
                    woamount: value.woamount,
                    quotation: value.quotation,
                    qtndate: value.qtndate,
                    qtnamount: value.qtnamount,
                    invoice: value.invoice,
                    invoicedate: value.invoicedate,
                    invoiceamount: value.invoiceamount,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updateInquiry`, {
                method: 'POST',
                body: JSON.stringify({

                    projectno: value.projectno,
                    projectname: value.firstname,
                    description: value.gender,
                    dworkorderob: value.dob,
                    wodate: value.mobile,
                    woamount: value.woamount,
                    quotation: value.quotation,
                    qtndate: value.qtndate,
                    qtnamount: value.qtnamount,
                    invoice: value.invoice,
                    invoicedate: value.invoicedate,
                    invoiceamount: value.invoiceamount,
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
        <div class="container-fluid page-body-wrapper">

            <InnerHeader />

            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Cash Voucher Details</h4>
                                    <hr></hr>
                                    <form class="form-sample py-3" onSubmit={handleSubmit}>
                                        <div class="row">

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleFromControlSelect1">Company</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.comapny} name='company' onChange={onhandleChange} >
                                                    <option>SUVIDYA</option>
                                                    <option>ACCENT</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Sr. No.</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.srno} name="srno" onChange={onhandleChange} disabled />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Date</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Paid To</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.paidto} name='paidto' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">	Opening Balance</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername" value={value.opening} name='opening' onChange={onhandleChange} disabled />
                                            </div>


                                            <table>
                                                <thead>
                                                    <th>Details</th>
                                                </thead>
                                                <hr></hr>
                                                <tbody>
                                                    <tr className='card-title'>
                                                        <td>Bill No</td>
                                                        <td>Date</td>
                                                        <td>Account Head</td>
                                                        <td>Ammount</td>
                                                        <td>Desciption</td>
                                                        <td>Project</td>
                                                        <td>Training Programme</td>
                                                        <td>Batch Code</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill}
                                                                placeholder='BollNo.' name='bill' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date}
                                                                name='date' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead}
                                                                name='accounthead' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount}
                                                                placeholder='Ammount' name='ammount' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description}
                                                                placeholder='Description' name='description' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project} name='project'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramme} name='protrainingprogrammeject'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode} name='batchcode'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill1}
                                                                placeholder='BollNo.' name='bill1' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date1}
                                                                name='date1' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead1}
                                                                name='accounthead1' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount1}
                                                                placeholder='Ammount' name='ammount1' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description1}
                                                                placeholder='Description' name='description1' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project1} name='project1'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramme1} name='protrainingprogrammeject1'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode1} name='batchcode1'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill2}
                                                                placeholder='BollNo.' name='bill2' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date2}
                                                                name='date2' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead2}
                                                                name='accounthead2' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount2}
                                                                placeholder='Ammount' name='ammount2' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description2}
                                                                placeholder='Description' name='description2' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project2} name='project2'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                                <option>1004</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramme2} name='protrainingprogrammeject2'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode2} name='batchcode2'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill3}
                                                                placeholder='BollNo.' name='bill3' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date3}
                                                                name='date3' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead3}
                                                                name='accounthead3' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount3}
                                                                placeholder='Ammount' name='ammount3' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description3}
                                                                placeholder='Description' name='description3' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project3} name='project3'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramme3} name='protrainingprogrammeject3'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode3} name='batchcode3'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill4}
                                                                placeholder='BollNo.' name='bill4' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date4}
                                                                name='date4' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead4}
                                                                name='accounthead4' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount4}
                                                                placeholder='Ammount' name='ammount4' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description4}
                                                                placeholder='Description' name='description4' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project4} name='project4'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramme4} name='protrainingprogrammeject4'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode4} name='batchcode4'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill5}
                                                                placeholder='BollNo.' name='bill5' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date5}
                                                                name='date5' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead5}
                                                                name='accounthead5' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount5}
                                                                placeholder='Ammount' name='ammount5' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description5}
                                                                placeholder='Description' name='description5' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project5} name='project5'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                                <option>1004</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramme5} name='protrainingprogrammeject5'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode5} name='batchcode5'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill6}
                                                                placeholder='BollNo.' name='bill6' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date6}
                                                                name='date6' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead6}
                                                                name='accounthead6' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount6}
                                                                placeholder='Ammount' name='ammount6' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description6}
                                                                placeholder='Description' name='description6' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project6} name='project6'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramme6} name='protrainingprogrammeject6'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode6} name='batchcode6'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill7}
                                                                placeholder='BollNo.' name='bill7' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date7}
                                                                name='date7' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead7}
                                                                name='accounthead7' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount7}
                                                                placeholder='Ammount' name='ammount7' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description7}
                                                                placeholder='Description' name='description7' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project7} name='project7'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramme7} name='protrainingprogrammeject7'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode7} name='batchcode7'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill8}
                                                                placeholder='BollNo.' name='bill8' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date8}
                                                                name='date8' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead8}
                                                                name='accounthead8' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount8}
                                                                placeholder='Ammount' name='ammount8' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description8}
                                                                placeholder='Description' name='description8' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project8} name='project8'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramme8} name='protrainingprogrammeject8'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode8} name='batchcode8'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bill9}
                                                                placeholder='BollNo.' name='bill9' on onChange={onhandleChange} />

                                                        </td>

                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date9}
                                                                name='date9' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.accounthead9}
                                                                name='accounthead9' onChange={onhandleChange}>
                                                                <option></option>
                                                                <option>AC - Repair &amp; Maintainance</option>
                                                                <option>Accent Techno Solutions</option>
                                                                <option>Advance Expenses</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammount9}
                                                                placeholder='Ammount' name='ammount9' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleInputUsername1"></lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.description9}
                                                                placeholder='Description' name='description9' onChange={onhandleChange} />
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.project9} name='project9'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option>1002</option>
                                                                <option>1003</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.trainingprogramm9} name='protrainingprogrammeject9'
                                                                onChange={onhandleChange} >
                                                                <option></option>
                                                                <option> Training in Process Plant System Modelling Using E3D</option>
                                                                <option>Advance Pipe Stress Analysis </option>
                                                                <option>Air Conditioning System Design (HVAC)</option>
                                                                <option>Autocad - Piping</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <lable for="exampleFormControlSelect1"></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.batchcode9} name='batchcode9'
                                                                onChange={onhandleChange} >
                                                                <option></option>

                                                            </select>
                                                        </td>



                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="form-group col-lg-4">
                                                <lable for="exampleFormControlSelect1">Paid By</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.paidby}
                                                    name='paidny' onChange={onhandleChange} >
                                                    <option>--Select Paid By--</option>
                                                    <option>Cash</option>
                                                    <option>Cheque</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Prepaired By</lable>
                                                <input type="text" class="form-control" id="exapmleInputUsername1" value={value.prepaired}
                                                    placeholder='Prepaired By' name='prepaired' onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Approved By</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername" value={value.approved}
                                                    placeholder='Approved By' name='approved' onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <lable for-="exampleInputUsername1">Total</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.total}
                                                    placeholder="0" name='total' onChange={onhandleChange} disabled />
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Checked By</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.cheched}
                                                placeholder="Checked By" name='cheched' onChange={onhandleChange} />
                                            </div>
                                        </div>

                                        <div className=' row p-2 gap-2'>
                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save Change</button>
                                            <button className='mr-2 btn btn-primary'>Close</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCashVoucher