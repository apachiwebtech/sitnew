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
import { MultiSelect } from 'react-multi-select-component';
import CollegeForm from './CollegeForm';



const College = () => {

    const [brand, setBrand] = useState([])
    const [descipline, setDescipline] = useState([])
    const [open, setOpen] = useState(false)
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const { collegeid } = useParams()
    const [selected, setSelected] = useState([]);
    const [desciplinevalue, setDesciplinevalue] = useState()




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
        refstudentname: "" || uid.refstudentname,
        refmobile: "" || uid.refmobile,
        course: "" || uid.course,
        refemail: "" || uid.refemail,
        batch: "" || uid.batch,
        status: "" || uid.status,
        date: "" || uid.date,


    })

    useEffect(() => {
        setValue({

            college_name: uid.college_name,
            university: uid.university,
            contact_person: uid.contact_person,
            designation: uid.designation,
            address: uid.address,
            city: uid.city,
            pin: uid.pin,
            state: uid.state,
            country: uid.country,
            phone: uid.phone,
            email: uid.email,
            mobile: uid.mobile,
            website: uid.website,
            purpose: uid.purpose,
            remark: uid.remark,
            refstudentname: uid.refstudentname,
            refmobile: uid.refmobile,
            course: uid.course,
            refemail: uid.refemail,
            batch: uid.batch,
            status: uid.status,
            date: uid.date,


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






    async function fetdescipline() {

        axios.get(`${BASE_URL}/getDiscipline`)
            .then((res) => {
                setDescipline(
                    res.data.map(item => ({ label: item.Deciplin, value: item.Id }))
                );
            })
            .catch((err) => {
                console.log(err)
            })

    }


    const handleselect = (value) => {

        setSelected(value)

        setDesciplinevalue(value.map((item) => item.value).join(','))

        console.log(value.map((item) => item.value))

    }

    useEffect(() => {

        fetdescipline()
        value.title = ""
        setError({})
        setUid([])

    }, [])



    const handleUpdate = () => {
        const data = {
            u_id: collegeid,
            tablename: "awt_college"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                const ids = res.data[0].descipline
                const idArray = ids.split(',').map(Number)

                const formattedArray = idArray.map((id, index) => ({ label: 'select' + (index + 1), value: id }));

                setSelected(formattedArray)

            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (collegeid != ':collegeid')

            handleUpdate()

    }, [collegeid])



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

                refstudentname: value.refstudentname,
                refmobile: value.refmobile,
                course: value.course,
                refemail: value.refemail,
                batch: value.batch,
                status: value.status,
                date: value.date,
                desciplinevalue: desciplinevalue,
                uid: uid.id

            }


            axios.post(`${BASE_URL}/add_college`, data)
                .then((res) => {
                    console.log(res)
                    alert("Data added successfully")
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


            <div class="main-panel" >
                <div class="content-wrapper">
                    <div className='my-2 text-right'>
                        <button className='btn btn-success' onClick={() => setOpen(true)}>Add +</button>
                    </div>

                    {collegeid !== ':collegeid' && <CollegeForm collegeid={collegeid} />}

                    <div class="row">
                        <div class="col-lg-12 grid-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div classNamae='container-fluid'>
                                        <form onSubmit={handleSubmit} className='row d-flex justify-container-between'>
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
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.refstudentname}
                                                                    name='refstudentname' placeholder='Student Name' onChange={onhandleChange} />
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Mobile</label>
                                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.refmobile} placeholder="Mobile" name='refmobile' onChange={onhandleChange} />

                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleInputUsername1">Course</lable>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.course}
                                                                    placeholder='Course' name='course' onChange={onhandleChange} />
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleInputUsername1">Email Id</lable>
                                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.refemail}
                                                                    placeholder="Email" name='refemail' onChange={onhandleChange} />
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
                                                        <div className='row justify-content-center'>
                                                            <div className='p-3' style={{ width: "100%" }}>
                                                                <div className='card-title titleback'>Disciplines</div>

                                                                <div class="form-group col-lg-6 p-0">
                                                                    <lable for="exampleFormControlSelect1"></lable>
                                                                    <MultiSelect options={descipline} value={selected}
                                                                        onChange={(value) => handleselect(value)}
                                                                        labelledBy='Select All' name="selected">
                                                                    </MultiSelect>

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

                        </div>
                    </div>
                </div >

            </div >
        </div>

    )
}
export default College