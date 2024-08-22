import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';

const AddFacultyMaster = () => {
    const { facultyid } = useParams();
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);



    const [value, setValue] = useState({
        course: '',
        batch: '',
        returndate: '',
        printdate: '',
        prepared: '',
        checked: '',
        approved: '',
        startdate: '',
        enddate: '',

    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.facultyname) {
            isValid = false;
            newErrors.facultyname = "Faculty Name is Required"
        }

        if (!value.maritalstatus) {
            isValid = false;
            newErrors.maritalstatus = "Marital Status is Required"
        }

        if (!value.address) {
            isValid = false;
            newErrors.address = "Address is Required"
        }


        setError(newErrors)
        return isValid
    }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: facultyid,
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
            returndate: data[0].returndate,
            printdate: data[0].printdate,
            prepared: data[0].prepared,
            checked: data[0].checked,
            approved: data[0].approved,
            startdate: data[0].startdate,
            enddate: data[0].enddate,
        }))
    }
    useEffect(() => {
        if (':facultyid' !== ":facultyid") {
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
            if (facultyid == ":facultyid") {
                response = await fetch(`${BASE_URL}/add_faculty`, {
                    method: 'POST',
                    body: JSON.stringify({
                        course: value.course,
                        batch: value.batch,
                        returndate: value.returndate,
                        printdate: value.printdate,
                        prepared: value.prepared,
                        checked: value.checked,
                        approved: value.approved,
                        startdate: value.startdate,
                        enddate: value.enddate,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                response = await fetch(`${BASE_URL}/updatefaculty`, {
                    method: 'POST',
                    body: JSON.stringify({

                        course: value.course,
                        batch: value.batch,
                        returndate: value.returndate,
                        printdate: value.printdate,
                        prepared: value.prepared,
                        checked: value.checked,
                        approved: value.approved,
                        startdate: value.startdate,
                        enddate: value.enddate,




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
                        <div class="d-flex">

                            <div className='px-2 mx-2'><Link to="/faculty/:facultyid"><h4>Personal Information</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/facademicqualification"><h4>Academic Qualification</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/addfacultymaster"><h4>Current Experience/Other Details</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/facultyexperience"><h4>Total Experience and Documents</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/facultydiscussion"><h4>Discussion</h4></Link></div>
                        </div>
                        <div class="col-lg-12 grid-margin">

                            <div class="card">
                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>

                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 class="card-title titleback">Work Experience</h4>
                                                    </div>
                                                    <div class="row">

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Experience</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.experience}
                                                                placeholder="00.00 (Year)" name='experience' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Present Company</label>
                                                            <input type="number" class="form-control" id="exampleInputUsername1" value={value.presentcompany}
                                                                placeholder="Company" name='presentcompany' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Specialization</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.specialization}
                                                                placeholder="Specialization" name='specialization' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-8">
                                                            <label for="exampleTextarea1">Address</label>
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.address}
                                                                placeholder="Address" name='address' onChange={onhandleChange}></textarea>


                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Phone</label>
                                                            <input type="number" class="form-control" id="exampleInputUsername1" value={value.phone}
                                                                placeholder="Contact No." name='mobile' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Service Offered</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.serviceoffered}
                                                                placeholder="Service Offered" name='serviceoffered' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Interview Date</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.interviewdate}
                                                                placeholder='DD/MM/YYYY' name='interviewdate' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Reference by</label>
                                                            <input type="text" class="form-control" id="exampleUsername1" value={value.reference}
                                                                placeholder="Reference By" name='reference' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Design Experience (Year)</label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.designexperience}
                                                                name='designexperience' onChange={onhandleChange} >
                                                                <option>--Select--</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Design Experience (Months)</label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.designexperience1}
                                                                name='designexperience1' onChange={onhandleChange} >
                                                                <option>--Select--</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Working Status</label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.workingstatus}
                                                                name='workingstatus' onChange={onhandleChange} >
                                                                <option>--Select--</option>
                                                            </select>
                                                        </div>


                                                    </div>
                                                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                                    <button type='button' onClick={() => {
                                                        window.location.reload()
                                                    }} class="btn btn-light">Cancel</button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 class="card-title titleback">SIT Use Only</h4>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-lg-8">
                                                            <label for="exampleTextarea1">Comments </label>
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.comments} placeholder="Comments"
                                                                name='comments' onChange={onhandleChange}></textarea>

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <FormControl>Qualified
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="row-radio-buttons-group"  >
                                                                    <FormControlLabel value="0116" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="0117" control={<Radio />} label="No" />

                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Interviewer</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.interviewer}
                                                                placeholder="Interviewer" name='interviewer' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleFormControlSelect1">Interview Status</label>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.interviewerstatus}
                                                                placeholder="Interview Status" name='interviewerstatus' onChange={onhandleChange}>
                                                                <option>--Interviewer Status--</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Salary Offered</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.salaryoffered}
                                                                placeholder="00.00" name='salaryoffered' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <FormControl>Salary Type
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="row-radio-buttons-group"  >
                                                                    <FormControlLabel value="0116" control={<Radio />} label="Hourly" />
                                                                    <FormControlLabel value="0117" control={<Radio />} label="Monthly" />

                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">TDS</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.facultytds}
                                                                placeholder="TDS" name='facultytds' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">PAN NO.</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.panno}
                                                                placeholder="PAN NO." name='panno' onChange={onhandleChange} />

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

export default AddFacultyMaster
