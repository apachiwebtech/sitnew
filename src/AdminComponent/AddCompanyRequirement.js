import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { MultiSelect } from 'react-multi-select-component';

const AddCompanyRequirement = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const [options, setOptions] = useState([]);
    const { companyrequirmentid } = useParams();
    const [category, setCat] = useState('')
    const [selected, setSelected] = useState([]);


    const [date, setDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = currentDate.getDay();
        day = day < 10 ? '0' + day : day;
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    }, []);


    const [value, setValue] = useState({

        companyname: "" || uid.companyname,
        profile: "" || uid.profile,
        location: "" || uid.location,
        eligibilty: "" || uid.eligibilty,
        date: "" || uid.date,
        responsibilities: "" || uid.responsibilities,
        course: "" || uid.course,
        selected: "" || uid.select,




    })

    useEffect(() => {
        setValue({
            companyname: uid.companyname,
            profile: uid.profile,
            location: uid.location,
            eligibilty: uid.eligibilty,
            date: uid.date,
            responsibilities: uid.responsibilities,
            course: uid.course,
            selected: uid.selected,
        })
    }, [uid])

    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.companyname) {
            isValid = false;
            newErrors.companyname = "Company Name is Required"
        }
        if (!value.profile) {
            isValid = false;
            newErrors.profile = "Profile is Required"
        }
        if (!value.location) {
            isValid = false;
            newErrors.location = "Location is Required"
        }
        if (!value.eligibilty) {
            isValid = false;
            newErrors.eligibilty = "Eligibilty is Required"
        }
        if (!value.date) {
            isValid = false;
            newErrors.date = "Date is Required"
        }
        if (!value.posteddate) {
            isValid = false;
            newErrors.posteddate = "PostedDate is Required"
        }
        if (!value.responsibilities) {
            isValid = false;
            newErrors.responsibilities = "Responsibilities is Required"
        }
        if (!value.course) {
            isValid = false;
            newErrors.course = "Course is Required"
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


    async function getAddCompanyRequirementDetail() {
        const response = await fetch(`${BASE_URL}/addcompanyrequirementDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: companyrequirmentid,
            }),
            headers: {
                'Contect-Type': 'application/json',
            }
        })

        const data = await response.json();
        console.log(data, "DATA A GAYA!");
    }

    useEffect(() => {

        if (companyrequirmentid !== ":companyrequirmentid") {
            getAddCompanyRequirementDetail()
        }
        value.title = ""
        setError({})
        setUid([])
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        if (validateForm()) {
            if (companyrequirmentid == ":companyrequirmentid") {
                response = await fetch(`${BASE_URL}/add_projectmaster`, {
                    method: 'POST',
                    body: JSON.stringify({
                        projectno: value.projectno,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                response = await fetch(`${BASE_URL}/updateInquiry`, {
                    method: 'POST',
                    body: JSON.stringify({
                        companyname: value.companyname,
                        profile: value.profile,
                        location: value.location,
                        eligibilty: value.eligibilty,
                        date: value.date,
                        responsibilities: value.responsibilities,
                        course: value.course,
                        selected: value.selected,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }





            const data = await response.json();

            alert(data.message)
            //   window.location.pathname = '/inquirylisting'


        }
    }




    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));


    const handleradiochange = (e) => {
        console.log(e.target.value)

        setCat(e.target.value)
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
                                    <h4 class="card-title">Company Requirement Details</h4>

                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Company Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.companyname} onChange={onhandleChange} name='companyname'>
                                                    <option>---Select Company Name---</option>
                                                </select>
                                                {<span className='text-danger'> {error.companyname} </span>}
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Profile <span className="text-danger">*</span> </lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.profile} placeholder='Profile' name='profile' onChange={onhandleChange} />

                                                {<span className='text-danger'> {error.profile} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Location<span className="text-danger" >*</span> </lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.location}
                                                    placeholder='Location' name='location' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.location} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Eligibilty <span className="text-danger">*</span> </lable>
                                                <input type="text" class="form-control" id="exampleInputUsername" value={value.eligibilty}
                                                    placeholder='Eligibilty' name='eligibilty' onChange={onhandleChange} />

                                                {<span className='text-danger'> {error.eligibilty} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable htmlfor="exampleInputUsername1">Posted Date <span className="text-danger">*</span></lable>
                                                <input type="date" class="form-control"
                                                    id="exampleInputUsername1"
                                                    value={date}
                                                    name='date'
                                                    onChange={(e) => { }} />

                                                {<span className='text-danger'> {error.posteddate} </span>}
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleTextarea1">Responsibilities <span className="text-danger">*</span> </lable>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.responsibilities}
                                                    placeholder='Responsibilities' name='responsibilities' onChange={onhandleChange}></textarea>

                                                {<span className='text-danger'> {error.responsibilities} </span>}
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleFormControlSelect1">Course<span className="text-danger">*</span></lable>
                                                <select class="form-control form-control-lg" id="exampleFromControlSelect1"
                                                    value={value.course}
                                                    name='course' onChange={onhandleChange}>
                                                    <option>--Select Course--</option>
                                                </select>
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>


                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Batch</lable>
                                                <MultiSelect option={options} value={selected} onChange={setSelected}
                                                    labelledBy='Select All' name="selected" ></MultiSelect>
                                            </div>

                                            <div class="from-group col-lg-12">
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        onChange={(e) => handleradiochange(e)}
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"  >
                                                        <FormControlLabel value="0118" control={<Radio />} label="Is Pass Student" />

                                                    </RadioGroup>
                                                </FormControl>
                                            </div>



                                        </div>

                                        <div className='row p-2 gap-2'>
                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Submit</button>
                                            <button className='mr-2'>Cancel</button>
                                            <button className='mr-2 btn btn-primary'>Send Notification</button>

                                        </div>

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

export default AddCompanyRequirement
