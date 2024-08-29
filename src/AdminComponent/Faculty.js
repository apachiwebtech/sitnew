import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
//import FormControlLabel from '@mui/material/FormControlLabel';

const Faculty = () => {
    const { facultyid } = useParams();
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})


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
                                    <div className='row justify-content-center'>
                                        <div className='p-3' style={{ width: "100%" }}>
                                            <div>
                                                <h4 class="card-title titleback">Faculty Details</h4>
                                            </div>
                                            <div className='row'>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Faculty Name<span className="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.facultyname} placeholder="Faculty Name*" name='facultyname' onChange={onhandleChange} />
                                                    {<span className='text-danger'>{error.facultyname}</span>}
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Faculty Code</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.facultycode} placeholder="Faculty Code" name='facultycode' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Date Of Brith</label>
                                                    <input type="date" class="form-control" id="exampleInputUsername1" value={value.dob} placeholder="Contact Person" name='dob' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Nationality</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.nationality} placeholder="Nationality" name='nationality' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Discipline</label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.discipline} name='discipline' onChange={onhandleChange} >
                                                        <option>Select</option>
                                                        <option>Training in Process Plant System Modelling Using E3D</option>
                                                        <option>Advance Pipe Stress Analysis</option>
                                                        <option>Air Conditioning System Design (HVAC)</option>
                                                        <option>Autocad - Piping</option>
                                                        <option>Civil/Structural Design & Drafting</option>
                                                        <option>Electrical & Instrumentation Design and Drafting</option>
                                                        <option>Electrical System Design</option>
                                                    </select>
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleFormControlSelect1">Status </label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.status} onChange={onhandleChange} name='status'>
                                                        <option>Select Course</option>
                                                        <option value="1">Active</option>
                                                        <option value="2">Non-Active</option>
                                                    </select>
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Invoice Name</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.invoicename} placeholder="Invoice Name" name='invoicename' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Marital Status<span className='text-danger'>*</span></label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.maritalstatus} name='maritalstatus' onChange={onhandleChange} >
                                                        <option>Select</option>
                                                        <option>Single</option>
                                                        <option>Married</option>
                                                    </select>
                                                    {<span className='text-danger'> {error.maritalstatus} </span>}
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Joining Date</label>
                                                    <input type="date" class="form-control" id="exampleInputUsername1" value={value.joiningdate} placeholder="Joining Date" name='joiningdate' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Employment Type</label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.employment} name='employment' onChange={onhandleChange} >
                                                        <option>Select</option>
                                                        <option>Temporary</option>
                                                        <option>Permanent</option>
                                                        <option>Contract</option>
                                                    </select>
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Software Knowledge</label>
                                                    <input type="mobile" class="form-control" id="exampleInputUsername1" value={value.software} placeholder="Software Knowledge" name='software' onChange={onhandleChange} />

                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Training Category</label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.training} name='training' onChange={onhandleChange} >
                                                        <option>Select</option>
                                                        <option>Local</option>
                                                        <option>International</option>
                                                        <option>Project</option>
                                                        <option>MockInterview</option>
                                                        <optio>Guest</optio>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>

                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 class="card-title titleback">Present Address</h4>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Address<span className="text-danger">*</span> </label>
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.address}
                                                                placeholder="Address" name='address' onChange={onhandleChange}></textarea>

                                                            {<span className='text-danger'> {error.address} </span>}

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">City</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.city} placeholder="City" name='city' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Pin</label>
                                                            <input type="number" class="form-control" id="exampleInputUsername1" value={value.pin} placeholder="Pin" name='pin' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">State</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.state} placeholder="State" name='state' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Country</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.country} placeholder="Country" name='country' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input type="number" class="form-control" id="exampleInputUsername1" value={value.mobile} placeholder="Mobile" name='mobile' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">E-Mail</label>
                                                            <input type="email" class="form-control" id="exampleInputUsername1" value={value.email} placeholder="E-Mail ID" name='email' onChange={onhandleChange} />

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
                                                        <h4 class="card-title titleback">Permanent Address</h4>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-lg-8">
                                                            <label for="exampleTextarea1">Address </label>
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.full_address}
                                                                placeholder="Address" name='full_address' onChange={onhandleChange}></textarea>

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">City</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.city_name}
                                                                placeholder="City" name='city_name' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Pin</label>
                                                            <input type="number" class="form-control" id="exampleInputUsername1" value={value.pin_code}
                                                                placeholder="Pin" name='pin_code' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">State</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.state_name}
                                                                placeholder="State" name='state_name' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Country</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.country_name}
                                                                placeholder="Country" name='country_name' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Phone</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.phone}
                                                                placeholder="Phone" name='phone' onChange={onhandleChange} />

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

export default Faculty
