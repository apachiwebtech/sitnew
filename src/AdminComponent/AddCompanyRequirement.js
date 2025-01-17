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
import { Checkbox } from '@mui/material';

const AddCompanyRequirement = () => {

    const [batch, setBatch] = useState([]);
    const [company, StudentCompany] = useState([]);
    const [selected, setSelected] = useState([]);
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const { companyrequirmentid } = useParams();
    const [category, setCat] = useState('')
    const [coursedata, setCourseData] = useState([])
    const [desciplinevalue, setDesciplinevalue] = useState()
    const [ispass, setIspass] = useState('');




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

    const handleselect = (value) => {

        setSelected(value)

        setDesciplinevalue(value.map((item) => item.value).join(','))

        console.log(value.map((item) => item.value))

    }


    const fetchbatch = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getbatch`);
            setBatch(res.data.map(item => ({ label: item.Batch_code, value: item.Batch_Id })));
        } catch (err) {
            console.error(err);
        }
    };
    const getcompany = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getCompanies`);
            StudentCompany(res.data)
        } catch (err) {
            console.error(err);
        }
    };

    async function getCourseData() {
        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                setCourseData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCourseData()
        getcompany()
        fetchbatch();
    }, []);


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

            response = await fetch(`${BASE_URL}/add_companyrequirement`, {

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
                    uid: uid.id
                }),

                headers: {
                    'Content-Type': 'application/json'
                }

            })






            const data = await response.json();

            alert(data.message)
            //   window.location.pathname = '/inquirylisting'


        }
    }




    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }




    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
    
        // Update `isPass` based on whether the checkbox is checked or not
        if (isChecked) {
            setIspass("1");
        } else {
            setIspass("2");
        }
    
        // Update `cat` with the value of the checkbox
        setCat(isChecked ? "1" : "2");
    };
    

    console.log(ispass)

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


                                            <div class="form-group col-lg-6">
                                                <label for="exampleFormControlSelect1">Company Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.companyname} onChange={onhandleChange} name='companyname'>
                                                    <option>---Select Company Name---</option>
                                                    {company.map((item) => {
                                                        return (
                                                            <option value={item.Company_Id}>{item.CompanyName}</option>

                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.companyname} </span>}
                                            </div>


                                            <div class="form-group col-lg-6">
                                                <label for="exampleInputUsername1">Profile <span className="text-danger">*</span> </label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.profile} placeholder='Profile' name='profile' onChange={onhandleChange} />

                                                {<span className='text-danger'> {error.profile} </span>}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleInputUsername1">Location<span className="text-danger" >*</span> </label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.location}
                                                    placeholder='Location' name='location' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.location} </span>}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleInputUsername1">Eligibilty <span className="text-danger">*</span> </label>
                                                <input type="text" class="form-control" id="exampleInputUsername" value={value.eligibilty}
                                                    placeholder='Eligibilty' name='eligibilty' onChange={onhandleChange} />

                                                {<span className='text-danger'> {error.eligibilty} </span>}
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Responsibilities <span className="text-danger">*</span> </label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.responsibilities}
                                                    placeholder='Responsibilities' name='responsibilities' onChange={onhandleChange}></textarea>

                                                {<span className='text-danger'> {error.responsibilities} </span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label htmlfor="exampleInputUsername1">Posted Date <span className="text-danger">*</span></label>
                                                <input type="date" class="form-control"
                                                    id="exampleInputUsername1"
                                                    value={value.date}
                                                    name='date'
                                                    onChange={onhandleChange} />

                                                {<span className='text-danger'> {error.date} </span>}
                                            </div>



                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Course<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFromControlSelect1"
                                                    value={value.course}
                                                    name='course' onChange={onhandleChange}>
                                                    <option>--Select Course--</option>
                                                    {coursedata.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch</label>
                                                <MultiSelect
                                                    options={batch}
                                                    value={selected}
                                                    onChange={(value) => handleselect(value)}
                                                    labelledBy="Select All"
                                                    name="selected"
                                                />
                                            </div>

                                            <div class="from-group col-lg-12">
                                                <FormControl>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                onChange={(e) => handleCheckboxChange(e)}
                                                                name="isPassStudent"
                                                            />
                                                        }
                                                        label="Is Pass Student"
                                                    />
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
