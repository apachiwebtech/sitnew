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
import { LibraryBooks } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const GenerateResult = () => {
    const { generateresultid } = useParams();
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


       if (!value.course){
        isValid = false;
        newErrors.course = "Course is Required"
       }

       if(!value.batch){
        isValid = false;
        newErrors.batch = "Batch is Required"
       }

       if(!value.returndate){
        isValid = false;
        newErrors.returndate = "Return Date is Required"
       }

       if(!value.printdate){
        isValid = false;
        newErrors.printdate = "Print Date is Required"
       }

       if(!value.approved){
        isValid = false;
        newErrors.approved = "Approved is Required"
       }

        setError(newErrors)
        return isValid
    }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: generateresultid,
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
        if (':generateresultid' !== ":generateresultid") {
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
            if (generateresultid == ":generateresultid") {
                response = await fetch(`${BASE_URL}/add_generateresult`, {
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

                response = await fetch(`${BASE_URL}/updategenerateresult'`, {
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
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Generate Final Result</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
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
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option>Select</option>
                                                    <option>00001</option>
                                                    <option>01002</option>
                                                    <option>01003</option>
                                                    <option>01004</option>
                                                    <option>01005</option>
                                                    <option>01006</option>
                                                    <option>01007</option>
                                                    <option>01008</option>
                                                    <option>01009</option>
                                                </select>
                                                {<span className='text-danger'> {error.batch} </span>}
                                            </div>



                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Result Date<span className='text-danger'>*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.returndate} name='returndate' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.returndate} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Print Date<span className='text-danger'>*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.printdate} name='printdate' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.printdate} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Prepared By </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.prepared} onChange={onhandleChange} name='prepared'>
                                                    <option>Select</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Checked By </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.checked} onChange={onhandleChange} name='checked'>
                                                    <option>Select</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                </select>
                                                
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Approved By<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.approved} onChange={onhandleChange} name='approved'>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                </select>
                                                {<span className='text-danger'> {error.approved} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Period (Start Date)</lable>
                                                <input type='date' class="form-control" id="exampleInputUsername1" value={value.startdate} 
                                                name='startdate' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">End Date</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.enddate}
                                                name='enddate' onChange={onhandleChange} />
                                                
                                            </div>
                                            

                                        </div>


                                        <button type="submit" class="btn btn-primary mr-2">Generate</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>



                                    </form>

                                    <button type="submit" class="btn btn-primary mr-2">Save</button>
                                    <button type="submit" class="btn btn-primary mr-2">Without Absent Rule</button>
                                    <button type="submit" class="btn btn-primary mr-2">Without Absent Rule with Full Attendance</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print Report Card</button>
                                    <button type="submit" class="btn btn-primary mr-2">MarkSheet</button>
                                    <button type="submit" class="btn btn-primary mr-2">Certificate Print</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print Sheet</button>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default GenerateResult
