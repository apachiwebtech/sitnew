import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
import Faculty from './Faculty';
import ConsultancyMaster from './ConsultancyMaster';
//import FormControlLabel from '@mui/material/FormControlLabel';

const ConsultancyBranches = () => {

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

                            <div class="d-flex">

                                <div className='px-2 mx-2'><Link to="/consultancymaster/:consultancymasterid"><h4>Consultancy Details</h4></Link></div>
                                <div className='px-2 mx-2'><Link to="/consstudentdetails"><h4>Student Details</h4></Link></div>
                                <div className='px-2 mx-2'><Link to="/consultancybranches"><h4>Branches</h4></Link></div>
                                <div className='px-2 mx-2'><Link to="/"><h4>Follow Up</h4></Link></div>
                            </div>
                        </div>
                        <div class="col-lg-12 grid-margin">

                            <div class="card">
                                <div className='container-fluid'>
                                    <div className='row justify-content-center'>
                                        <div className='p-3' style={{ width: "100%" }}>
                                            <div>
                                                <h4 class="card-title titleback">View Consultancy Info</h4>
                                            </div>
                                            <div className='row'>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1" >Contact Person</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.contactperson}
                                                    placeholder='Contact Person'    name='contactperson' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1"> Designation </label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.designation}
                                                    placeholder='Designation'    name='designation' onChange={onhandleChange} />

                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleFormControlSelect1">Department</label>
                                                    <select class="form-control" id="exampleFormControlSelect1" value={value.department}
                                                        name='department' onChange={onhandleChange}>
                                                        <option>--Select Department--</option>
                                                    </select>
                                                </div>

                                                <button type="submit" class="btn btn-sm btn-primary mr-5 mt-5">Add More</button>

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

export default ConsultancyBranches
