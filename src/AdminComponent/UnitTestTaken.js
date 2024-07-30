import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';

const UnitTestTaken = () => {

    const { unittesttakenid } = useParams();
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
        utname: '',
        marks: '',
        utdate: '',



    })



    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.coursename) {
            isValid = false;
            newErrors.coursename = "Course Name is Required"
        }

        if (!value.batchcode) {
            isValid = false;
            newErrors.batchcode = "Batch Code is Required"
        }

        if (!value.utname) {
            isValid = false;
            newErrors.utname = "Unit Test is Required"
        }

        if (!value.utdate) {
            isValid = false;
            newErrors.utdate = "Unit Date is Required"
        }


        setError(newErrors)
        return isValid
    }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: unittesttakenid,
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
            utname: data[0].utname,
            marks: data[0].marks,
            utdate: data[0].utdate,
            
        }))
    }
    useEffect(() => {
        if (':unittesttakenid' !== ":unittesttakenid") {
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
            if (unittesttakenid == ":unittesttakenid") {
                response = await fetch(`${BASE_URL}/add_unittesttaken`, {
                    method: 'POST',
                    body: JSON.stringify({
                        coursename: value.coursename,
                        batchcode: value.batchcode,
                        utname: value.utname,
                        marks: value.marks,
                        utdate: value.utdate,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                response = await fetch(`${BASE_URL}/updateunittesttaken'`, {
                    method: 'POST',
                    body: JSON.stringify({

                        coursename: value.coursename,
                        batchcode: value.batchcode,
                        utname: value.utname,
                        marks: value.marks,
                        utdate: value.utdate,



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
                                    <h4 class="card-title">Add Unit Test Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course Name<span className='text-danger'>*</span> </label>
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
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchcode} onChange={onhandleChange} name='batchcode'>
                                                    <option>Select Batch Code</option>
                                                    <option>010021</option>
                                                    <option>010022</option>
                                                    <option>010023</option>
                                                    <option>010024</option>
                                                    <option>010025</option>
                                                    <option>010026</option>
                                                    <option>010027</option>
                                                    <option>010028</option>
                                                    <option>010029</option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Unit Test Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.utname} onChange={onhandleChange} name='utname'>
                                                    <option>Select Unit test Name</option>
                                                    <option>Piping-1</option>
                                                    <option>Piping-2</option>
                                                    <option>Piping-3</option>
                                                    <option>Piping-4</option>
                                                    <option>Piping-5</option>
                                                    <option>Piping-6</option>
                                                    <option>Piping-7</option>
                                                    <option>Piping-8</option>
                                                    <option>Piping-9</option>
                                                    <option>Piping-10</option>

                                                </select>
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername">Max Marks</lable>
                                                <input type="text" class="form-control" id="exampleInputusername" value={value.marks} placeholder="Max Marks" name='marks' onChange={onhandleChange} disabled />
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Unit Test Date<span className='text-danger'>*</span> </label>
                                                <input type="date" class="form-control" id="exampleFormControlSelect1" value={value.utdate} name='utdate' onChange={onhandleChange} />
                                                <option></option>


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

export default UnitTestTaken
