import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const TaskAdd  = () => {
    
    const [date, setDate] = useState ('');

    useEffect(() => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1 ;
        month = month < 10 ? '0' + month : month;
        let day = currentDate.getDate();
        day = day < 10 ? '0' + day : day;
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);

    }, []);

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
        date: '',
        taskname: '',
        assignedto: '',
        standard: '',
        target: '',
        remind: '',
        checklist: '',
        autoreport: '',
      
       
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
        if (':aadtasktemplateid' !== ":aadtasktemplateid") {
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
        if (projectmasterid == ":projectmasterid") {
            response = await fetch(`${BASE_URL}/add_projectmaster`, {
                method: 'POST',
                body: JSON.stringify({
                    date: value.date,
                    taskname: value.taskname,
                    assignedto: value.assignedto,
                    standard: value.standard,
                    target: value.target,
                    remind: value.remind,
                    checklist: value.checklist,
                    autoreport: value.autoreport,
                    
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updateInquiry`, {
                method: 'POST',
                body: JSON.stringify({

                    date: value.date,
                    taskname: value.taskname,
                    assignedto: value.assignedto,
                    standard: value.standard,
                    target: value.target,
                    remind: value.remind,
                    checklist: value.checklist,
                    autoreport: value.autoreport,
                    
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

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                    <h4 class="card-title">Task Registration</h4>
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">


                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Basic Information</h4>
                                                    </div>
                                                    <div className='row'>

                                                    <div class="form-group col-lg-4" style={{ display: "flex", flexDirection: "column"}}>
                                                        <lable htmlfor="exampleInputUsername1">Date</lable>
                                                        <DatePicker
        selected={value.date ? new Date(value.date) : null}
        className="form-control"
        id="date"
        dateFormat="dd-MM-yyyy"
        disabled // This keeps the input disabled
        placeholderText='dd-MM-yyyy'
      />
                                                    </div>

                                                    <div class="form-group col-lg-4">
                                                        <lable for="exampleFormControlSelect1">Task Name</lable>
                                                        <select class="form-control" id="exampleFormControlSelect1" value={value.taskname}
                                                         name='taskname' onChange={onhandleChange}>
                                                            <option>--Select Task Name--</option>
                                                            <option>Free Task</option>
                                                            <option>Test</option>
                                                         </select>
                                                    </div>

                                                    <div class="form-group col-lg-4">
                                                        <lable for="exampleFormControlSelect1">Assigned To</lable>
                                                        <select class="form-control" id="exampleFormControlSelect1" value={value.assignedto}
                                                        name="assignedto" onChange={onhandleChange}>
                                                            <option>--Select Assigned--</option>
                                                            <option>Admin</option>
                                                            <option>Ajay Hari Patil</option>
                                                            <option>Akash Jose</option>
                                                            <option>Akshay Kishor Patil</option>
                                                            <option>Aditya Arvind Patil</option>
                                                        </select>
                                                    </div>

                                                    <div class="form-group col-lg-12">
                                                        <lable for="exampleTextarea1">Standard Description of Task</lable>
                                                        <textarea class="form-control form-control-lg" id="exampleTextarea1" value={value.standard} 
                                                        placeholder="Standard Description of Task" name='standard' onChange={onhandleChange} ></textarea>
                                                    </div>

                                                    </div>

                                                </div>
                                            </div>



                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                <button className='col-2'> <Link to="/taskadd">Back</Link> </button>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Other Information</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-4">
                                                            <FormControl>Mark as Urgent
                                                                <RadioGroup
                                                                    row aria-labelledby='demo-row-radio-button-group-lable'
                                                                    name='row-radio-button-group'>
                                                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                                                </RadioGroup>

                                                            </FormControl>
                                                        </div>

                                                        <div class="form-group col-lg-4" style={{ display: "flex", flexDirection: "column"}}>
                                                        <lable for="exampleInputUsername1">Target Date</lable>
                                                        <DatePicker
        selected={value.target ? new Date(value.target) : null}
        className="form-control"
        id="target"
        dateFormat="dd-MM-yyyy"
        disabled // Disables the input field
        placeholderText='dd-MM-yyyy'
      />
                                                    </div>

                                                    <div class="form-group col-lg-4" style={{ display: "flex", flexDirection: "column"}}>
                                                        <lable for="exampleInputUsername1">Remind On</lable>
                                                        <DatePicker
        selected={value.remind ? new Date(value.remind) : null}
        className="form-control"
        id="remind"
        dateFormat="dd-MM-yyyy"
        disabled // Disables the input field
        placeholderText='dd-MM-yyyy'
      />
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <lable for="exampleFormControlSelect1">Checklist</lable>
                                                        <select class="form-control" id="exampleFormControlSelect1" value={value.checklist}
                                                        name='checklist' onChange={onhandleChange}>
                                                            <option>--Select Checklist--</option>
                                                            <option>N.A.</option>
                                                            <option>New Test</option>
                                                            <option>Test 2</option>
                                                        </select>
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <lable for="exampleInputUsername1">Auto Report To</lable>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.autoreport}
                                                        placeholder='Auto Report To' name='autoreport' onChange={onhandleChange} disabled />
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

export default TaskAdd