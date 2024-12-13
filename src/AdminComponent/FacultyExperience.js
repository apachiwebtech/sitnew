import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
//import FormControlLabel from '@mui/material/FormControlLabel';

const FacultyExperience = () => {

    const { facultyid } = useParams();
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);



    const [value, setValue] = useState({
        idproof: '',
        addressproof: '',
        facultycv: '',

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
            idproof: data[0].idproof,
            addressproof: data[0].addressproof,
            facultycv: data[0].facultycv,
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
                    idproof: value.idproof,
                    addressproof: value.addressproof,
                    facultycv: value.facultycv,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updatefaculty`, {
                method: 'POST',
                body: JSON.stringify({

                    idproof: value.idproof,
                    addressproof: value.addressproof,
                    facultycv: value.facultycv,





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

                            <div className='px-2 mx-2'><Link to="/faculty/:facultyid"><h4>Personal Information</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/academicqualification"><h4>Academic Qualification</h4></Link></div>
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
                                                <h4 class="card-title titleback">Edit Faculty</h4>
                                            </div>
                                            <div className='row'>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1" >ID Proof</label>
                                                    <input type="file" class="form-control" id="exampleInputUsername1"
                                                        value={value.idproof}
                                                        name='idproof' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1"> Address Proof</label>
                                                    <input type="file" class="form-control" id="exampleInputUsername1"
                                                        value={value.addressproof}
                                                        name='addressproof' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">CV</label>
                                                    <input type="file" class="form-control" id="exampleInputUsername1"
                                                        value={value.facultycv}
                                                        name='facultycv' onChange={onhandleChange} />

                                                </div>

                                                <button
                                                    type="button"
                                                    onClick="window.location.reload()"
                                                    class="btn btn-light mt-5"
                                                >
                                                    Download Docs.
                                                </button>

                                            </div>
                                            <button type="submit" class="btn btn-primary mr-2">Save</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Close</button>
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

export default FacultyExperience
