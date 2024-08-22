import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const AnnualBatch = () => {

    const [error, setError] = useState({})
    const [uid, setUid] = useState([])
    const [batchcat, setBatchCat] = useState([])
    const [course, setCourseData] = useState([])

    const { batch_id } = useParams()


    const [value, setValue] = useState({
        selectcourse: "" || uid.Course_Id,
        batchcategory: "" || uid.Category,
        description: "" || uid.Course_description,
        trainingdate: "" || uid.EDate,
        actualdate: "" || uid.ActualDate,
        timings: "" || uid.Timings,
        basicinr: "" || uid.INR_Basic,
        servicetaxI: "" || uid.INR_ServiceTax,
        coursename: "" || uid.CourseName,
        batchcode: "" || uid.Batch_code,
        planned: "" || uid.SDate,
        admissiondate: "" || uid.Admission_Date,
        duration: "" || uid.Duration,
        coordinator: "" || uid.Training_Coordinator,
        taxrate: '' || uid.TaxRate,
        totalinr: "" || uid.INR_Total,
        servicetax: "" || uid.Dollar_ServiceTax,
        publish: "" || uid.Corporate,
        totaldoller : "" , 
        basicdoller : "" , 

    })

    useEffect(() => {
        setValue({
            selectcourse: "" || uid.Course_Id,
            batchcategory: "" || uid.Category,
            description: "" || uid.Course_description,
            trainingdate: "" || uid.EDate,
            actualdate: "" || uid.ActualDate,
            timings: "" || uid.Timings,
            basicinr: "" || uid.INR_Basic,
            servicetaxI: "" || uid.INR_ServiceTax,
            coursename: "" || uid.CourseName,
            batchcode: "" || uid.Batch_code,
            planned: "" || uid.SDate,
            admissiondate: "" || uid.Admission_Date,
            duration: "" || uid.Duration,
            coordinator: "" || uid.Training_Coordinator,
            taxrate: "" || uid.TaxRate,
            totalinr: "" || uid.INR_Total,
            servicetax: "" || uid.Dollar_ServiceTax,
            publish: "" || uid.Corporate,

            uid: uid.id


        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.selectcourse) {
            isValid = false;
            newErrors.selectcourse = "Course is required"
        }
        if (!value.batchcategory) {
            isValid = false;
            newErrors.batchcategory = "Category is required"
        }
        if (!value.trainingdate) {
            isValid = false;
            newErrors.trainingdate = "Date is required"
        }
        if (!value.timings) {
            isValid = false;
            newErrors.timings = "Timing is required"
        }
        //    if (!value.coursename) {
        //     isValid = false;
        //     newErrors.coursename = "Coursename is required"
        //    }
        if (!value.planned) {
            isValid = false;
            newErrors.planned = "Date is required"
        }
        if (!value.duration) {
            isValid = false;
            newErrors.duration = "Duration is required"
        }
        //    if (!value.taxrate) {
        //     isValid = false;
        //     newErrors.taxrate = "Taxrate is required"
        //    }

        setError(newErrors)
        return isValid
    }







    async function getupdatedata() {

        const data = {
            u_id: batch_id,
            uidname: "Batch_Id",
            tablename: "Batch_Mst"
        }
        axios.post(`${BASE_URL}/new_update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getBatchData() {

        axios.get(`${BASE_URL}/get_batchcategory`)
            .then((res) => {
                console.log(res.data)
                setBatchCat(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                setCourseData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        if (batch_id !== ':batch_id') {
            getupdatedata()
        }
        
        getBatchData()
        getCourseData()
    }, [batch_id])


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                selectcourse: value.selectcourse,
                batchcategory: value.batchcategory,
                description: value.description,
                trainingdate: value.trainingdate,
                actualdate: value.actualdate,
                timings: value.timings,
                basicinr: value.basicinr,
                servicetaxI: value.servicetaxI,
                coursename: value.coursename,
                batchcode: value.batchcode,
                planned: value.planned,
                admissiondate: value.admissiondate,
                duration: value.duration,
                coordinator: value.coordinator,
                taxrate: value.taxrate,
                totalinr: value.totalinr,
                servicetax: value.servicetax,
                publish: value.publish,
                uid: uid.Batch_Id
            }


            axios.post(`${BASE_URL}/update_batchdetails`, data)
                .then((res) => {
                    console.log(res)
                    alert("Date Submitted successfully")
                    navigate(`/annualbatchlisting`)
                       localStorage.removeItem('annual_data')

                })
                .catch((err) => {
                    console.log(err)
                    alert("Something is wrong")
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
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Annual Batch</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div className='col-lg-6' style={{ borderRight: "1px solid lightgrey" }}>
                                                <div className='row'>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Select Course</label>
                                                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selectcourse} name='selectcourse' onChange={onhandleChange} >
                                                            <option>Select</option>
                                                            {course.map((item) => {
                                                                return (

                                                                    <option value={item.Course_Id}>{item.Course_Name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        {error.selectcourse && <span className='text-danger'>{error.selectcourse}</span>}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Batch Category<span className='text-danger'>*</span></label>
                                                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchcategory} name='batchcategory' onChange={onhandleChange} >
                                                            <option>Select category</option>
                                                            {batchcat.map((item) => {
                                                                return (
                                                                    <option value={item.BatchCategory}>{item.BatchCategory}</option>
                                                                )
                                                            })}

                                                        </select>
                                                        {error.batchcategory && <span className='text-danger'>{error.batchcategory}</span>}
                                                    </div>


                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Description</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.description} placeholder="Description" name='description' onChange={onhandleChange} disabled />

                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Training completion Date<span className='text-danger'>*</span></label>
                                                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.trainingdate} placeholder="End Date" name='trainingdate' onChange={onhandleChange} />
                                                        {error.trainingdate && <span className='text-danger'>{error.trainingdate}</span>}

                                                    </div>


                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Actual Date</label>
                                                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.actualdate} placeholder="Actual Date" name='actualdate' onChange={onhandleChange} />

                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Timings<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.timings} placeholder="Timings" name='timings' onChange={onhandleChange} />
                                                        {error.timings && <span className='text-danger'>{error.timings}</span>}

                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Basic(INR)</label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.basicinr} placeholder="Timings" name='basicinr' onChange={onhandleChange} />

                                                    </div>
                                                    {/* <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Service Tax(INR)</label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.servicetaxI} placeholder="Timings" name='servicetaxI' onChange={onhandleChange} disabled />

                                                    </div> */}
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Basic($)</label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.basicdoller} placeholder="" name='basicdoller' onChange={onhandleChange} disabled />

                                                    </div>
                                                    {/* <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Total($)</label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.totaldoller} placeholder="" name='totaldoller' onChange={onhandleChange} disabled />

                                                    </div> */}
                                                </div>
                                            </div>


                                            <div className='col-lg-6'>

                                                <div className='row'>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Course Name (if changed)<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.coursename} placeholder="Course Name" name='coursename' onChange={onhandleChange} />

                                                        {error.coursename && <span className='text-danger'>{error.coursename}</span>}
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Batch Code</label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.batchcode} placeholder="Batch Code" name='batchcode' onChange={onhandleChange} disabled />

                                                    </div>


                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Planned Start Date<span className='text-danger'>*</span></label>
                                                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.planned} placeholder="Planned Start Date" name='planned' onChange={onhandleChange} />
                                                        {error.planned && <span className='text-danger'>{error.planned}</span>}

                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Last Date of Admission</label>
                                                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.admissiondate} placeholder="Last Date of Admission" name='admissiondate' onChange={onhandleChange} />

                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Duration<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.duration} placeholder="Duration" name='duration' onChange={onhandleChange} />
                                                        {error.duration && <span className='text-danger'>{error.duration}</span>}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Training Coordinator</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.coordinator} placeholder="Training Coordinator" name='coordinator' onChange={onhandleChange} />

                                                    </div>
                                                    {/* <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Tax Rate<span className='text-danger'>*</span></label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.taxrate} placeholder="Tax Rate" name='taxrate' onChange={onhandleChange} />
                                                        {error.taxrate && <span className='text-danger'>{error.taxrate}</span>}
                                                    </div> */}
                                                    {/* <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Total(INR)</label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.totalinr} placeholder="Total(INR)" name='totalinr' onChange={onhandleChange} disabled />

                                                    </div> */}
                                                    {/* <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Service Tax($)</label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.servicetax} placeholder="Total(INR)" name='servicetax' onChange={onhandleChange} disabled />

                                                    </div> */}
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Publish</label>
                                                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.publish} name='publish' onChange={onhandleChange} >
                                                            {error.selectcourse && <span className='text-danger'>{error.selectcourse}</span>}
                                                            <option>Select</option>
                                                            <option>Yes</option>
                                                            <option>No</option>

                                                        </select>
                                                    </div>

                                                </div>
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

export default AnnualBatch