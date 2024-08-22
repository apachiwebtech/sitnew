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
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [options, setOptions] = useState ([]);
    const {companyrequirmentid} = useParams ();
    const  [category , setCat] = useState('')
    const [selected, setSelected] = useState ([]);


    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    // const children = (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    //       <FormControlLabel
    //         label="Child 1"
    //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label="Child 2"
    //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );

    const [value, setValue] = useState({
        training: "" || uid.training,
        attendee: "" || uid.attendee,
        instructor: "" || uid.instructor,
        description: "" || uid.description,
        feedback: "" || uid.feedback,




    })

    useEffect(() => {
        setValue({
            training: uid.training,
            attendee: uid.attendee,
            instructor: uid.instructor,
            description: uid.description,
            feedback: uid.feedback,

        })
    }, [uid])


    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}


    //    if (!value.college) {
    //     isValid = false;
    //     newErrors.name = "Name is require"
    //    }
    //     if (!value.email) {
    //         isValid = false;
    //         newErrors.email = "Email is require"
    //     }
    //     setError(newErrors)
    //     return isValid
    // }


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


    async function getAddCompanyRequirementDetail(){
        const response = await fetch(`${BASE_URL}/addcompanyrequirementDetail` , {
            method: 'POST',
            body: JSON.stringify ({
                id: companyrequirmentid,
            }),
            headers : {
                'Contect-Type': 'application/json',
            }
        })

        const data = await response.json();
        console.log(data, "DATA A GAYA!");
    }

    useEffect(() => {

        if (companyrequirmentid !== ":companyrequirmentid"){
            getAddCompanyRequirementDetail()
        }
        value.title = ""
        setError({})
        setUid([])
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        // if(validateForm()){
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

                    projectno: value.projectno,
                    projectname: value.firstname,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }





        const data = await response.json();

        alert(data.message)
        //   window.location.pathname = '/inquirylisting'


        // }        
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
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.companyname} onChange={onhandleChange} name='companyname'>
                                                    <option>---Select Company Name---</option>
                                                    <option> Allied System &amp; Integrators Private Limited</option>
                                                    <option> Amocon Refrigeration &amp; Engineering Co.</option>
                                                    <option> Anand Systems Engineering Pvt. Ltd.</option>


                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Profile </lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.profile} placeholder='Profile' name='profile' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Location </lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.location} placeholder='Location' name='location' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Eligibilty </lable>
                                                <input type="text" class="form-control" id="exampleInputUsername" value={value.eligibilty} placeholder='Eligibilty' name='eligibilty' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Posted Date</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.posteddate} name='posteddate' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleTextarea1">Responsibilities</lable>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.responsibilities} placeholder='Responsibilities' name='responsibilities' onChange={onhandleChange}></textarea>
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleFormControlSelect1">Course</lable>
                                                <select class="form-control form-control-lg" id="exampleFromControlSelect1" value={value.course} name='course' onChange={onhandleChange}>
                                                    <option>--Select Course--</option>
                                                    <option> Training in Process Plant System Modelling Using E3D</option>
                                                    <option>Advance Pipe Stress Analysis </option>
                                                    <option>Air Conditioning System Design (HVAC)</option>
                                                </select>
                                            </div>

                                            <div class="from-group col-lg-12">
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        onChange={(e) =>handleradiochange(e)}
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"  >
                                                        <FormControlLabel value="0118" control={<Radio />} label="Is Pass Student" />

                                                    </RadioGroup>
                                                </FormControl>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Batch</lable>
                                                <MultiSelect option={options} value={selected} onChange={setSelected}
                                                labelledBy='Select All' name="selected" ></MultiSelect>
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
