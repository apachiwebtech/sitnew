import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Link, useParams } from 'react-router-dom';
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
import { OndemandVideo } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MassSMS = () => {
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
        invoicedate: '',
        invoiceamount: '',
    })


    useEffect(() => {
        setValue({
            training: uid.training,
            attendee: uid.attendee,
            instructor: uid.instructor,
            description: uid.description,
            feedback: uid.feedback,

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.course) {
        isValid = false;
        newErrors.course = "Course is Required"
       }
        if (!value.batchtype) {
            isValid = false;
            newErrors.batchtype = "Batch Type is Required"
        }

        if (!value.department){
            isValid = false;
            newErrors.department = "Department is Required"
        }

        if (!value.nationality){
            isValid = false;
            newErrors.nationality = "Nationality is Required"
        }
        setError(newErrors)
        return isValid
    }


    async function getEmployeeData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    async function getEmployeeData() {
        const data = {
            tablename: "awt_employeerecord"
        }
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getEmployeeData()
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
            tablename: "awt_employeerecord"
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
            tablename: "awt_employeerecord"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getEmployeeData()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(validateForm()){
        const data = {

            training: value.training,
            attendee: value.attendee,
            instructor: value.instructor,
            description: value.description,
            feedback: value.feedback,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_employeerecord`, data)
            .then((res) => {
                console.log(res)
                getEmployeeData()

            })
            .catch((err) => {
                console.log(err)
            })
        }





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
        { field: 'attendee', headerName: 'Attendee', flex: 2 },
        { field: 'instructor', headerName: 'Instructor', flex: 2 },
        { field: 'description', headerName: 'Description', flex: 2 },
        { field: 'feedback', headerName: 'FeedBack', flex: 2 },

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


    //const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));


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
                                        <div className='col-lg-12'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div className='card-title'>Mass SMS</div>
                                                    <hr></hr>
                                                    <form class="form-sample py-3" onSubmit={handleSubmit}>
                                                        <div class="row">
                                                            <div class="form-group col-lg-3">
                                                                <FormControl>Student Type
                                                                    <RadioGroup

                                                                        row aria-labelledby='demo-row-radio-button-group-lable'
                                                                        name='row-radio-button-group'>
                                                                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                                                                        <FormControlLabel value="inquiry" control={<Radio />} label="Inquiry" />
                                                                    </RadioGroup>

                                                                </FormControl>
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <FormControl>Batch
                                                                    <RadioGroup row aria-labelledby='demo-row-radion-button-group-lable'
                                                                    name='row-radio-button-group'>
                                                                        <FormControlLabel value="selectall" control={<Radio />} label="Select All"  />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <label for="exapmleFormControlSelect1">Course<span className="text-danger">*</span></label>
                                                                <select class="form-control" id="exampleFormControlSelect1"
                                                                    value={value.course} name='course' onChange={onhandleChange}>
                                                                    <option>--Select Course--</option>
                                                                </select>
                                                                {<span className='text-danger'> {error.course} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <lable for="exampleFormControlSelect1">Batch Type<span className="text-danger">*</span></lable>
                                                                <select class="form-control" id="exampleFormControlSelect1" value={value.batchtype}
                                                                    name='batchtype' onChange={onhandleChange}>
                                                                    <option>--Select Batch Type--</option>
                                                                </select>
                                                                {<span className='text-danger'> {error.batchtype} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-3" style={{ display: "flex", flexDirection:"column"}}>
                                                                <lable for="exampleInputUsername1">From Date</lable>
                                                                <DatePicker
        selected={value.fromdate ? new Date(value.fromdate) : null}
        onChange={(date) => onhandleChange({ target: { name: "fromdate", value: date.toISOString().split("T")[0] } })}
        className="form-control"
        id="fromdate"
        placeholderText="Select From Date"
        dateFormat="dd-MM-yyyy"
        minDate={new Date()} // Prevents selecting past dates
      />
                                                            </div>

                                                            <div class="form-group col-lg-3"style={{ display: "flex", flexDirection:"column"}}>
                                                                <lable for="exapmleInputUsername1">To Date</lable>
                                                                <DatePicker
        selected={value.todate ? new Date(value.todate) : null}
        onChange={(date) =>
          onhandleChange({ target: { name: "todate", value: date.toISOString().split("T")[0] } })
        }
        className="form-control"
        id="todate"
        placeholderText="Select To Date"
        dateFormat="dd-MM-yyyy"
        minDate={value.fromdate ? new Date(value.fromdate) : new Date()} // Prevents selecting before fromdate
      />
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <lable for="exampleFormControlSelect1">Department<span className="text-danger">*</span></lable>
                                                                <select class="form-control" id="exampleFormCpntrolSelect1" value={value.department}
                                                                    name='department' onChange={onhandleChange}>
                                                                    <option>--Select Department--</option>

                                                                </select>
                                                                {<span className='text-danger'> {error.department} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <lable for="exampleFormControlSelect1">Nationality<span className="text-danger">*</span></lable>
                                                                <select class="form-control" id="exampleFormControlSelect1" value={value.nationality}
                                                                name='nationality' on onChange={onhandleChange}>
                                                                    <option>--Select Nationality--</option>
                                                                </select>
                                                                {<span className='text-danger'> {error.nationality} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-12">
                                                                <FormControl  >
                                                                    <RadioGroup row aria-labelledby='demo-row-radio-button-group-lable'
                                                                    name="row-radio-button-group">
                                                                        <FormControlLabel value="sendstudent" control={<Radio />} label="Send Student"  />
                                                                        <FormControlLabel value="sendparents" control={<Radio />} label="Send Parents"  />
                                                                        <FormControlLabel value="sendnotification" control={<Radio />} label="Send Notification"  />
                                                                        <div className='d-flex align-items-center'>
                                                                        <button className='btn btn-sm  btn-primary'>GO</button>
                                                                        </div>
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>

                                                            <div class="form-group col-lg-6">
                                                                <lable for="exampleTextarea1">Message</lable>
                                                                {/* <input type="text" class="" id="exampleTextarea1" value={value.message} placeholder='Message' name="message"   /> */}
                                                                  <textarea className="form-control form-control-lg" rows={5} id="exampleTextarea1" onchange={onhandleChange} value={value.message} placeholder="Message" name='Message' onChange={onhandleChange}></textarea>
                                                            </div>

                                                            <div class="form-group col-lg-6">
                                                                <lable for="exampleTextarea1">Log</lable>
                                                                <textarea className="form-control form-control-lg" rows={5} id="exampleTextarea1" onchange={onhandleChange} value={value.log} placeholder="Log" name='Log' onChange={onhandleChange}></textarea>
                                                                {/* <input type="text" class="form-control form-control-lg" id="exapmleTextarea1" value={value.log} placeholder='Log' name='log' onchange={onhandleChange} /> */}
                                                            </div>
                                                        </div>

                                                        <div className='row p-2 gap-2'>
                                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Export To Excel</button>
                                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Send</button>
                                                            <button className='mr-2'>Close</button>
                                                        </div>


                                                    </form>
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

    )
}

export default MassSMS
