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
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CorporateInquiryForm = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);


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
    useEffect(() => {
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

    const handleClick = (id) => {
        setCid(id)
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };

    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleUpdate = (id) => {
        const data = {
            u_id: id,
            tablename: "awt_faculty"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_faculty"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // if(validateForm()){
        console.log(value);

        const response = await fetch(`${BASE_URL}/postInquiry`, {
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

        const data = await response.json();

        console.log(data);

        // }        
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }






    const columns = [
        {
            field: 'index',
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,
        },
        { field: 'FName', headerName: 'Student Name', flex: 2 },
        { field: 'course', headerName: 'Course Name', flex: 2 },
        { field: 'inquiry_DT', headerName: 'Inquiry Date', flex: 2 },
        { field: 'discussion', headerName: 'discuss', flex: 2 },
        { field: 'present_mobile', headerName: 'mobile', flex: 2 },
        { field: 'Email', headerName: 'Email', flex: 2 },
        { field: 'Discipline', headerName: 'discipline', flex: 2 },
        { field: 'Inquiry_type', headerName: 'inquiry type', flex: 2 },
        // { field: 'isActive', headerName: 'Options', flex: 2},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                    </>
                )
            }
        },
    ];


    const rowsWithIds = inquiryData.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                 
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-12'>
                                            <div className='row justify-content-center' >
                                                <div className='p-2' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title">Inquiry Information</h4>
                                                    </div>
                                                   <div className='d-flex'>
                                                   <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">FName<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.firstname} placeholder="FName*" name='firstname' onChange={onhandleChange} />
                                                        {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                    </div>

                                                    <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">MName<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.firstname} placeholder="MName*" name='firstname' onChange={onhandleChange} />
                                                        {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                    </div>

                                                    <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">LName<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.firstname} placeholder="LName*" name='firstname' onChange={onhandleChange} />
                                                        {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                    </div>
                                                   </div>

                                                   <div className="form-group col-lg-12 p-0">
                                                        <div className='row'>
                                                            <div className='col-4'>
                                                                <label for="exampleInputUsername1">Mobile</label>
                                                                <input type="number" className="form-control" id="exampleInputUsername1" value={value.mobile} placeholder="Number" name='mobile' onChange={onhandleChange} />
                                                            </div>
                                                            <div className='col-4'>
                                                                <label for="exampleInputUsername1"> Phone</label>
                                                                <input type="number" className="form-control" id="exampleInputUsername1" value={value.whatsapp} placeholder="Number" name='whatsapp' onChange={onhandleChange} />
                                                            </div>

                                                        <div className="form-group col-lg-4">
                                                        <label for="exampleInputUsername1">Email<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputUsername1" value={value.email} placeholder="Name*" name='email' onChange={onhandleChange} />
                                                        {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>
                                                    </div>
                                                   
                                                    </div>

                                                    <div className="form-group col-lg-12 p-0">
                                                        <div className='row'>
                                                            <div className='col-4'>
                                                                <label for="exampleInputUsername1">Business</label>
                                                                <input type="number" className="form-control" id="exampleInputUsername1" value={value.mobile} placeholder="Business" name='Business' onChange={onhandleChange} />
                                                            </div>
                                                            <div className='col-4'>
                                                                <label for="exampleInputUsername1">Company Name </label>
                                                                <input type="number" className="form-control" id="exampleInputUsername1" value={value.whatsapp} placeholder="Company Name " name='whatsapp' onChange={onhandleChange} />
                                                            </div>

                                                        <div className="form-group col-lg-4">
                                                        <label for="exampleInputUsername1">Designation <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputUsername1" value={value.email} placeholder="Designation *" name='email' onChange={onhandleChange} />
                                                        {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>
                                                    </div>
                                                   
                                                    </div>

                                                    {/* male female  */}
                                                    {/* <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleInputUsername1">Gender</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.gender} name='gender' onChange={onhandleChange} >
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div> */}
                                                    <div className="form-group col-lg-12 p-0" style={{ display: 'flex', flexDirection: "column"}}>
                                                        <label for="exampleInputUsername1">Date Of Brith</label>
                                                        <DatePicker
        selected={value.dob ? new Date(value.dob) : null}
        onChange={(date) => onhandleChange({ target: { name: "dob", value: date } })}
        className="form-control"
        id="exampleInputUsername1"
        dateFormat="dd-MM-yyyy"
        placeholderText="Select DOB"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100} // Shows past 100 years
      />

                                                    </div>
                                                 
                                                   
                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleTextarea1">Discussion </label>
                                                        <textarea className="form-control" id="exampleTextarea1" value={value.discussion} placeholder="Discussion" name='discussion' onChange={onhandleChange}></textarea>

                                                    </div>
                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.country} placeholder="Name*" name='country' onChange={onhandleChange} />
                                                        {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-2' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title">Status Details</h4>
                                                    </div>
                                                    <div class="form-group col-lg-12 p-0" style={{display: "flex", flexDirection:'column'}}>
                                                        <label for="exampleInputUsername1">Date</label>
                                                        <DatePicker
  selected={value.dob ? new Date(value.dob) : null}
  className="form-control"
  id="exampleInputUsername1"
  dateFormat="dd-MM-yyyy"
  placeholderText="Select DOB"
  readOnly // Prevents editing but keeps it visible
/>

                                                    </div>
                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleInputUsername1">Set Status</label>
                                                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.gender} name='gender' onChange={onhandleChange} disabled>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                {/* <button className='col-2'>close</button> */}
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-12'>
                                            <div className='row justify-content-center ' >
                                                <div className='p-2 ' style={{ width: "100%" }}>
                                                    <div style={{ width: "100%" }} >
                                                        <h4 className="card-title">Inquiry Details</h4>
                                                    </div>
                                                  <div className='d-flex'>
                                                  <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">Inquiry Date</label>
                                                        <input type="date" className="form-control" id="exampleInputUsername1" value={value.InquiryDate} placeholder="Contact Person" name='InquiryDate' onChange={onhandleChange} />

                                                    </div>
                                                    <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">Mode Of Inquiry</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.modeEnquiry} name='modeEnquiry' onChange={onhandleChange} >
                                                            <option>Mail</option>
                                                            <option>Person</option>
                                                            <option>Phone</option>
                                                            <option>OnlineMail</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-4 ">
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
                                                <div className='p-2' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title">Training Programme & batch details</h4>
                                                    </div>
                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleTextarea1">Programme inquired	</label>
                                                        <textarea class="form-control" id="exampleTextarea1" value={value.programmeEnquired} placeholder="Discussion" name='programmeEnquired' onChange={onhandleChange}></textarea>

                                                    </div>
                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleInputUsername1">Selected Training Programme	</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selectedProgramme} name='selectedProgramme' onChange={onhandleChange} >
                                                            {Course.map((item) => {
                                                                return <option>{item.Course_Name}</option>
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleInputUsername1">Category</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.category} name='category' onChange={onhandleChange} >
                                                            {batchCategoty?.map((item) => {
                                                                return <option>{item.BatchCategory}</option>
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleInputUsername1">Batch</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} name='batch' onChange={onhandleChange} >
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-2' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title">Education Qualification & Work</h4>
                                                    </div>
                                                    <div className="form-group col-lg-12 p-0">
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
                                                    <div className="form-group col-lg-12 p-0">
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

                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleInputUsername1">Percentage<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputUsername1" value={value.percentage} placeholder="Name*" name='percentage' onChange={onhandleChange} />
                                                        {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">View Inquiry</h4>
                                        </div>
                                        <div className='d-flex justify-content-between' style={{ width: "50%" }}>
                                            <FormControl fullWidth className='mr-1'>
                                                <InputLabel id="demo-simple-select-label">Select Search Type</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={age}
                                                    label="Select Search Types"
                                                // onChange={handleChange}
                                                >
                                                    <MenuItem value={'FName'}>Name Wise</MenuItem>
                                                    <MenuItem value={'course'}>Course Wise</MenuItem>
                                                    <MenuItem value={'Email'}>Email Wise</MenuItem>
                                                    <MenuItem value={'present_mobile'}>Mobile Wise</MenuItem>
                                                    <MenuItem value={'isActive'}>Status Wise</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <input type='text' placeholder='search' style={{ width: "100%" }}></input>
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

export default CorporateInquiryForm