import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { useParams } from "react-router-dom";
//import FormControlLabel from '@mui/material/FormControlLabel';

const VivaMOCTaken = () => {

    const { vivamoctakenid } = useParams();
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
      setChecked([event.target.checked, event.target.checked]);
    };
  
    const handleChange2 = (event) => {
      setChecked([event.target.checked, checked[1]]);
    };
  
    const handleChange3 = (event) => {
      setChecked([checked[0], event.target.checked]);
    };


    const [value, setValue] = useState({
        coursename: '',
        batchcode: '',
        vivamocname: '',
        maxmarks: '',
        date: '',

    })



    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.coursename){
        isValid = false;
        newErrors.coursename = "Course Name is Required"
       }

       if(!value.batchcode){
        isValid = false;
        newErrors.batchcode = "Batch Code is Required"
       }

       if(!value.vivamocname){
        isValid = false;
        newErrors.vivamocname = "Viva MOC is Required"
       }

       if(!value.date){
        isValid = false;
        newErrors.date = "Date is Required"
       }


        setError(newErrors)
        return isValid
    }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: vivamoctakenid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        setValue(prevState => ({
            ...prevState,
            coursename: data[0].coursename,
            batchcode: data[0].batchcode,
            vivamocname: data[0].vivamocname,
            maxmarks: data[0].maxmarks,
            date: data[0].date,
        }))
    }
    useEffect(() => {
        if (':vivamoctakenid' !== ":vivamoctakenid") {
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
            if (vivamoctakenid == ":vivamoctakenid") {
                response = await fetch(`${BASE_URL}/add_vivamoctaken`, {
                    method: 'POST',
                    body: JSON.stringify({
                        coursename: value.coursename,
                        batchcode: value.batchcode,
                        vivamocname: value.vivamocname,
                        maxmarks: value.maxmarks,
                        date: value.date,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                response = await fetch(`${BASE_URL}/updatevivamoctaken'`, {
                    method: 'POST',
                    body: JSON.stringify({

                        coursename: value.coursename,
                        batchcode: value.batchcode,
                        vivamocname: value.vivamocname,
                        maxmarks: value.maxmarks,
                        date: value.date,



                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }



        }
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
                                    <h4 class="card-title">Add Viva Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course Name <span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.coursename} onChange={onhandleChange} name='coursename'>
                                                    <option>Select</option>
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
                                                {<span className="text-danger"> {error.coursename} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchcode} onChange={onhandleChange} name='batchcode'>
                                                    <option>-Select Batch Code-</option>
                                                    <option>124354</option>
                                                    <option>547895</option>
                                                    <option>965847</option>
                                                    <option>965847</option>
                                                    <option>965847</option>
                                                    <option>965847</option>
                                                    <option>965847</option>
                                                    <option>965847</option>
                                                    <option>965847</option>
                                                </select>
                                                {<span className="text-danger"> {error.batchcode} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Viva/Moc Name:<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.vivamocname} onChange={onhandleChange} name='vivamocname'>
                                                    <option>--Select--</option>
                                                    <option>Discipline</option>
                                                    <option>Discipline</option>
                                                    <option>Discipline</option>
                                                    <option>Discipline</option>
                                                    <option>MOC</option>
                                                    <option>MOC</option>
                                                    <option>MOC</option>
                                                    <option>Piping</option>
                                                    <option>Piping</option>
                                                    <option>Piping</option>
                                                    <option>Piping</option>
                                                </select>
                                                {<span className="text-danger"> {error.vivamocname} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Max Marks</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.maxmarks} placeholder="Max Marks" 
                                                name='maxmarks' onChange={onhandleChange} disabled />
                                            </div>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Date<span className="text-danger">*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.date} </span>}
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

export default VivaMOCTaken
