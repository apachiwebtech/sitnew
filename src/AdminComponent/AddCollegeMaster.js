import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';
import { Link, useParams } from 'react-router-dom';
import AddCollegeInfo from './AddCollegeInfo';
import CollegeForm from './CollegeForm';
import { MultiSelect } from 'react-multi-select-component';


const AddCollegeMaster = () => {

    const [brand, setBrand] = useState([])
    const [open, setOpen] = useState(false)
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [loading, setLoading] = useState(true)
    //const [value, setValue] = useState({})
    const { collegeid } = useParams()
    const [selected, setSelected] = ([]);
    const [options, setOptions] = ([]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Child 1"
                control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
            />
            <FormControlLabel
                label="Child 2"
                control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
            />
        </Box>
    );


  





    const [value, setValue] = useState({
        college_name: "" || uid.college_name,
        university: "" || uid.university,
        contact_person: "" || uid.contact_person,
        designation: "" || uid.designation,
        address: "" || uid.address,
        city: "" || uid.city,
        pin: "" || uid.pin,
        state: "" || uid.state,
        country: "" || uid.country,
        phone: "" || uid.phone,
        email: "" || uid.email,
        mobile: "" || uid.mobile,
        website: "" || uid.website,
        purpose: "" || uid.purpose,
        remark: "" || uid.remark,
        studentname: "" || uid.studentname,
        mobile1: "" || uid.mobile1,
        course: "" || uid.course,
        email1: "" || uid.email1,
        batch: "" || uid.batch,
        status: "" || uid.status,
        date: "" || uid.date,


    })

    useEffect(() => {
        setValue({

            college_name: uid.college_name || "",
            university: uid.university || '',
            contact_person: uid.contact_person || '',
            designation: uid.designation || '',
            address: uid.address || "",
            city: uid.city || '',
            pin: uid.pin || '',
            state: uid.state || '',
            country: uid.country || '',
            phone: uid.phone || '',
            email: uid.email || '',
            mobile: uid.mobile || '',
            website: uid.website || '',
            purpose: uid.purpose || '',
            remark: uid.remark || '',
            studentname: uid.studentname || '',
            mobile1: uid.mobile1 || '',
            course: uid.course || '',
            email1: uid.email1 || '',
            batch: uid.batch || '',
            status: uid.status || '',
            date: uid.date || '',


        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.college_name) {
            isValid = false;
            newErrors.college_name = "Name is required"
        }
        if (!value.university) {
            isValid = false;
            newErrors.university = "University is required"
        }
        setError(newErrors)
        return isValid
    }





    async function getCollegeData() {
        const data = {
            tablename: "awt_college"
        }
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        // getCollegeData()
        value.title = ""
        setError({})
        setUid([])
    }, [])

    const handleClick = (id) => {
        setCid(id)
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };

    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleUpdate = () => {
        const data = {
            u_id: collegeid,
            tablename: "awt_college"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                // setUid(res.data[0])

                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }





    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                college_name: value.college_name,
                university: value.university,
                contact_person: value.contact_person,
                designation: value.designation,
                address: value.address,
                city: value.city,
                pin: value.pin,
                state: value.state,
                country: value.country,
                phone: value.phone,
                email: value.email,
                mobile: value.mobile,
                website: value.website,
                purpose: value.purpose,
                remark: value.remark,
                studentname: value.studentname,
                mobile1: value.mobile1,
                course: value.course,
                email1: value.email1,
                batch: value.batch,
                status: value.status,
                date: value.date,
            }


            axios.post(`${BASE_URL}/add_college`, data)
                .then((res) => {
                    console.log(res)
                    // getCollegeData()

                })
                .catch((err) => {
                    console.log(err)
                })
        }





    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }








    return (

        <div class="container-fluid page-body-wrapper " >
            <InnerHeader />

            {loading && <Loader />}
            <div className='my-2 text-right'>
                <button className='btn btn-success' onClick={() => setOpen(true)}>Add +</button>
            </div>
            <div class="main-panel" style={{ display: loading ? "none" : "block" }} >
                <div class="content-wrapper">

                    <CollegeForm collegeid={collegeid} />

                    <div class="row">
                        <div class="col-lg-12 grid-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div classNamae='container-fluid'>
                                        <div className='row d-flex justify-container-between'>
                                            <div className='col-md-6 col-lg-6'>
                                                <div className='row justify-content-center'>
                                                    <div className='p-3' style={{ width: "100%" }}>
                                                        <div className='card-title titleback'>College Details</div>
                                                        <div class='row'>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">College Name<span className='text-danger'>*</span></label>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.college_name} placeholder="College Name*" name='college_name' onChange={onhandleChange} />
                                                                {error.college_name && <span className='text-danger'>{error.college_name}</span>}
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">University<span className='text-danger'>*</span></label>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.university} placeholder="University*" name='university' onChange={onhandleChange} />
                                                                {error.university && <span className='text-danger'>{error.university}</span>}
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Contact Person</label>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.contact_person} placeholder="Contact Person" name='contact_person' onChange={onhandleChange} />

                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Designation</label>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.designation} placeholder="Designation" name='designation' onChange={onhandleChange} />

                                                            </div>

                                                            <div class="form-group col-lg-8">
                                                                <label for="exampleTextarea1">Address </label>
                                                                <textarea class="form-control" id="exampleTextarea1" value={value.address} placeholder="Address*" name='address' onChange={onhandleChange}></textarea>
                                                                {error.address && <div className="text-danger">{error.address}</div>}
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
                                                                <label for="exampleInputUsername1">Phone</label>
                                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.phone} placeholder="Phone" name='phone' onChange={onhandleChange} />

                                                            </div>
                                                            
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">E-Mail</label>
                                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email} placeholder="E-Mail" name='email' onChange={onhandleChange} />

                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Mobile</label>
                                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.mobile} placeholder="Mobile" name='mobile' onChange={onhandleChange} />

                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Website</label>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.website} placeholder="Website" name='website' onChange={onhandleChange} />

                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Purpose</label>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.purpose} placeholder="Purpose" name='purpose' onChange={onhandleChange} />

                                                            </div>
                                                            <div class="form-group col-lg-8">
                                                                <label for="exampleTextarea1">Remark </label>
                                                                <textarea class="form-control" id="exampleTextarea1" value={value.remark} placeholder="Remark" name='remark' onChange={onhandleChange}></textarea>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                                <button type='button' onClick={() => {
                                                    window.location.reload()
                                                }} class="btn btn-light">Cancel</button>

                                                <AddCollegeInfo open={open} setOpen={setOpen} />
                                            </div>

                                            <div className='col-md-6 col-lg-6'>
                                                <div className='row justify-content-center'>
                                                    <div className='p-3' style={{ width: "100%" }}>
                                                        <div className='card-title titleback'>Referred By</div>
                                                        <div className='row'>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleInputUsername1">Student Name</lable>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.studentname}
                                                                    name='studentname' placeholder='Student Name' onChange={onhandleChange} />
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Mobile</label>
                                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.mobile1} placeholder="Mobile" name='mobile1' onChange={onhandleChange} />

                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleInputUsername1">Course</lable>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.course}
                                                                    placeholder='Course' name='course' onChange={onhandleChange} />
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleInputUsername1">Email Id</lable>
                                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email1}
                                                                    placeholder="Email" name='email1' onChange={onhandleChange} />
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleInputUsername1">Batch</lable>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.batch}
                                                                    placeholder="Batch" name='batch' onChange={onhandleChange} />
                                                            </div>
                                                        </div>
                                                        <div className='row justify-content-center'>
                                                            <div className='p-3' style={{ width: "100%" }}>
                                                                <div className='card-title titleback'>
                                                                    Status
                                                                </div>
                                                                <div className='row'>
                                                                    <div class="form-group col-lg-4">
                                                                        <lable for="exampleFormControlSelect1">Status</lable>
                                                                        <select class="form-control" id="exampleFormControlSelect1" value={value.status}
                                                                            name='status' onChange={onhandleChange}>
                                                                            <option>--All--</option>
                                                                        </select>
                                                                    </div>
                                                                    <div class="form-group col-lg-4">
                                                                        <lable for="exampleInputUsername1">Date</lable>
                                                                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.date}
                                                                            name='date' onChange={onhandleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    
                                                </div>

                                                <div className='row justify-content-center'>
                                                        <div className='p-3' style={{ width: "100%" }}>
                                                            <div className='card-title titleback'>
                                                                Disciplines
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleFormControlSelect1"></lable>
                                                                <MultiSelect options={options} value={selected}
                                                                onChange={setSelected}
                                                                labelledBy='Select All' name='selected'></MultiSelect>
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
        </div>

    )
}
export default AddCollegeMaster