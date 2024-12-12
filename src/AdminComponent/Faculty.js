import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
//import FormControlLabel from '@mui/material/FormControlLabel';

const Faculty = () => {
    const { facultyid } = useParams();
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})


    const [value, setValue] = useState({
        Faculty_Name: '',
        Faculty_Code: '',
        DOB: '',
        Nationality: '',
        discipline: '',
        status: '',
        invoicename: '',
        Married: '',
        joiningdate: '',
        Faculty_Type: '',
        software: '',
        training: '',
        Present_Address: '',
        Permanent_City: '',
        Present_Pin: '',
        Present_State: '',
        Present_Country: '',
        Mobile: '',
        EMail: '',
        Permanent_Address: '',
        Permanent_City: '',
        Permanent_Pin: '',
        Permanent_State: '',
        Permanent_Country: '',
        Permanent_Tel: '',

    })


    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}


    //     if (!value.facultyname) {
    //         isValid = false;
    //         newErrors.facultyname = "Faculty Name is Required"
    //     }

    //     if (!value.maritalstatus) {
    //         isValid = false;
    //         newErrors.maritalstatus = "Marital Status is Required"
    //     }

    //     if (!value.address) {
    //         isValid = false;
    //         newErrors.address = "Address is Required"
    //     }


    //     setError(newErrors)
    //     return isValid
    // }


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
            Faculty_Name: data[0].Faculty_Name,
            Faculty_Code: data[0].Faculty_Code,
            DOB: data[0].DOB,
            Nationality: data[0].Nationality,
            discipline: data[0].discipline,
            status: data[0].status,
            invoicename: data[0].invoicename,
            Married: data[0].Married,
            joiningdate: data[0].joiningdate,
            Faculty_Type: data[0].Faculty_Type,
            software: data[0].software,
            training: data[0].training,
            Present_Address: data[0].Present_Address,
            Present_City: data[0].Present_City,
            Present_Pin: data[0].Permanent_Pin,
            Present_State: data[0].Permanent_State,
            Present_Country: data[0].Present_Country,
            Mobile: data[0].Mobile,
            EMail: data[0].EMail,
            Permanent_Address: data[0].Permanent_Address,
            Permanent_City: data[0].Permanent_City,
            Permanent_Pin: data[0].Permanent_Pin,
            Permanent_State: data[0].Permanent_State,
            Permanent_Country: data[0].Permanent_Country,
            Permanent_Tel: data[0].Permanent_Tel,
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
        // if (validateForm()) {
        if (facultyid == ":facultyid") {
            response = await fetch(`${BASE_URL}/add_faculty_master`, {
                method: 'POST',
                body: JSON.stringify({
                    Faculty_Name: value.Faculty_Name,
                    Faculty_Code: value.Faculty_Code,
                    DOB: value.DOB,
                    Nationality: value.Nationality,
                    discipline: value.discipline,
                    status: value.status,
                    invoicename: value.invoicename,
                    Married: value.Married,
                    joiningdate: value.joiningdate,
                    Faculty_Type: value.Faculty_Type,
                    software: value.software,
                    training: value.training,
                    Present_Address: value.Present_Address,
                    Permanent_City: value.Present_City,
                    Present_Pin: value.Present_Pin,
                    Present_State: value.Present_State,
                    Present_Country: value.Present_Country,
                    Mobile: value.Mobile,
                    EMail: value.EMail,
                    Permanent_Address: value.Permanent_Address,
                    Permanent_City: value.Permanent_City,
                    Permanent_Pin: value.Permanent_Pin,
                    Permanent_State: value.Permanent_State,
                    Permanent_Country: value.Permanent_Country,
                    Permanent_Tel: value.Permanent_Tel,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updatefaculty_master`, {
                method: 'POST',
                body: JSON.stringify({

                    Faculty_Name: value.Faculty_Name,
                    Faculty_Code: value.Faculty_Code,
                    DOB: value.DOB,
                    Nationality: value.Nationality,
                    discipline: value.discipline,
                    status: value.status,
                    invoicename: value.invoicename,
                    Married: value.Married,
                    joiningdate: value.joiningdate,
                    Faculty_Type: value.Faculty_Type,
                    software: value.software,
                    training: value.training,
                    Present_Address: value.Present_Address,
                    Permanent_City: value.Present_City,
                    Present_Pin: value.Present_Pin,
                    Present_State: value.Present_State,
                    Present_Country: value.Present_Country,
                    Mobile: value.Mobile,
                    EMail: value.EMail,
                    Permanent_Address: value.Permanent_Address,
                    Permanent_City: value.Permanent_City,
                    Permanent_Pin: value.Permanent_Pin,
                    Permanent_State: value.Permanent_State,
                    Permanent_Country: value.Permanent_Country,
                    Permanent_Tel: value.Permanent_Tel,




                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }



        // }
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

                            {
                                facultyid == ":facultyid" ? (<>  
                                     <div className='px-2 mx-2'><Link to="/faculty/:facultyid"><h4>Personal Information</h4></Link></div>

                                    <div className='px-2 mx-2'><Link to="/addfacultymaster"><h4>Current Experience/Other Details</h4></Link></div> </>) :
                                    <>
                                        <div className='px-2 mx-2'><Link to="/faculty/:facultyid"><h4>Personal Information</h4></Link></div>
                                        <div className='px-2 mx-2'><Link to="/academicqualification"><h4>Academic Qualification</h4></Link></div>
                                        <div className='px-2 mx-2'><Link to="/addfacultymaster"><h4>Current Experience/Other Details</h4></Link></div>
                                        <div className='px-2 mx-2'><Link to="/facultyexperience"><h4>Total Experience and Documents</h4></Link></div>
                                        <div className='px-2 mx-2'><Link to="/facultydiscussion"><h4>Discussion</h4></Link></div> </>
                            }
                        </div>
                        <div class="col-lg-12 grid-margin">

                            <form onSubmit={handleSubmit} class="card">
                                <div className='container-fluid'>
                                    <div className='row justify-content-center'>
                                        <div className='p-3' style={{ width: "100%" }}>

                                            <div>
                                                <h4 class="card-title titleback">Faculty Details</h4>
                                            </div>

                                            <div className='row'>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Faculty Name<span className="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1"
                                                        value={value.Faculty_Name} placeholder="Faculty Name*" name='Faculty_Name'
                                                        onChange={onhandleChange} />
                                                    {<span className='text-danger'>{error.Faculty_Name}</span>}
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Faculty Code</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1"
                                                        value={value.Faculty_Code} placeholder="Faculty Code" name='Faculty_Code'
                                                        onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Date Of Brith</label>
                                                    <input type="date" class="form-control" id="exampleInputUsername1"
                                                        value={value.DOB} name='DOB' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Nationality</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1"
                                                        value={value.Nationality} placeholder="Nationality" name='Nationality'
                                                        onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Discipline</label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                        value={value.discipline} name='discipline' onChange={onhandleChange} >
                                                        <option>Select</option>
                                                    </select>
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleFormControlSelect1">Status </label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                        value={value.status} onChange={onhandleChange} name='status'>
                                                        <option>Select Course</option>
                                                        <option value="1">Active</option>
                                                        <option value="2">Non-Active</option>
                                                    </select>
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Invoice Name</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1"
                                                        value={value.invoicename} placeholder="Invoice Name" name='invoicename' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Marital Status<span className='text-danger'>*</span></label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                        value={value.Married} name='Married' onChange={onhandleChange} >
                                                        <option>Select</option>
                                                        <option>Single</option>
                                                        <option>Married</option>
                                                    </select>
                                                    {<span className='text-danger'> {error.maritalstatus} </span>}
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Joining Date</label>
                                                    <input type="date" class="form-control" id="exampleInputUsername1"
                                                        value={value.joiningdate} placeholder="Joining Date" name='joiningdate'
                                                        onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Employment Type</label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                        value={value.Faculty_Type} name='Faculty_Type' onChange={onhandleChange} >
                                                        <option>Select</option>
                                                        <option>Temporary</option>
                                                        <option>Permanent</option>
                                                        <option>Contract</option>
                                                    </select>
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Software Knowledge</label>
                                                    <input type="mobile" class="form-control" id="exampleInputUsername1"
                                                        value={value.software} placeholder="Software Knowledge" name='software'
                                                        onChange={onhandleChange} />

                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Training Category</label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                        value={value.training} name='training' onChange={onhandleChange} >
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
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.Present_Address}
                                                                placeholder="Address" name='Present_Address' onChange={onhandleChange}></textarea>

                                                            {<span className='text-danger'> {error.Present_Address} </span>}

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">City</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1"
                                                                value={value.Present_City} placeholder="City" name='Present_City' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Pin</label>
                                                            <input type="number" class="form-control" id="exampleInputUsername1"
                                                                value={value.Present_Pin} placeholder="Pin" name='Present_Pin' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">State</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1"
                                                                value={value.Present_State} placeholder="State" name='Present_State'
                                                                onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Country</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1"
                                                                value={value.Present_Country} placeholder="Country" name='Present_Country'
                                                                onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input type="number" class="form-control" id="exampleInputUsername1"
                                                                value={value.Mobile} placeholder="Mobile" name='Mobile' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">E-Mail</label>
                                                            <input type="email" class="form-control" id="exampleInputUsername1"
                                                                value={value.EMail} placeholder="E-Mail ID" name='EMail' onChange={onhandleChange} />

                                                        </div>
                                                    </div>
                                                    <button type="submit" class="btn btn-primary mr-2" >Submit</button>

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
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.Permanent_Address}
                                                                placeholder="Address" name='Permanent_Address' onChange={onhandleChange}></textarea>

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">City</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Permanent_City}
                                                                placeholder="City" name='Permanent_City' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Pin</label>
                                                            <input type="number" class="form-control" id="exampleInputUsername1" value={value.Permanent_Pin}
                                                                placeholder="Pin" name='Permanent_Pin' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">State</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Permanent_State}
                                                                placeholder="State" name='Permanent_State' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Country</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Permanent_Country}
                                                                placeholder="Country" name='Permanent_Country' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Phone</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Permanent_Tel}
                                                                placeholder="Phone" name='Permanent_Tel' onChange={onhandleChange} />

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default Faculty
