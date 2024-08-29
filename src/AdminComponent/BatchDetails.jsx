import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import BatchEdit from './BatchEdit';


const BatchDetails = () => {

    const [error, setError] = useState({})
    const [uid, setUid] = useState([])
    const [batchcat, setBatchCat] = useState([])
    const [course, setCourseData] = useState([])

    const { batchid } = useParams()


    const [value, setValue] = useState({
        selectcourse: "" || uid.Course_Id,
        batchcategory: "" || uid.Category,
        description: "" ,
        timings: "" || uid.Timings,
        coursename: "" ,
        batchcode: "" || uid.Batch_code,
        planned: "" || uid.SDate,
        admissiondate: "" || uid.Admission_Date,
        duration: "" || uid.Duration,
        coordinator: "" || uid.Training_Coordinator,
        eligibility : ""  || uid.Min_Qualifiaction,
        targetstudent :"" || uid.Max_Students,
        passingcriteria :"" || uid.Passing_Criteria,
        actualstudent :"",
        comments :"" || uid.Comments,
        briefdescription :"" || uid.Course_description,
        attachment :"" || uid.Attachment,
        document : "" || uid.Documents_Required,
        todate : "" || uid.EDate
    })

    useEffect(() => {
        setValue({
            selectcourse:  uid.Course_Id,
            batchcategory:  uid.Category,
            description: "" ,
            timings:  uid.Timings,
            coursename: "" ,
            batchcode:  uid.Batch_code,
            planned:  uid.SDate,
            admissiondate:  uid.Admission_Date,
            duration:  uid.Duration,
            coordinator:  uid.Training_Coordinator,
            eligibility :  uid.Min_Qualifiaction,
            targetstudent :"" || uid.Max_Students,
            passingcriteria : uid.Passing_Criteria,
            actualstudent :"",
            comments : uid.Comments,
            briefdescription : uid.Course_description,
            attachment : uid.Attachment,
            document :  uid.Documents_Required ,
            todate : uid.EDate,
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

        if (!value.eligibility) {
            isValid = false;
            newErrors.eligibility = "Eligibility is required"
        }
        if (!value.timings) {
            isValid = false;
            newErrors.timings = "Timing is required"
        }

        if (!value.targetstudent) {
            isValid = false;
            newErrors.targetstudent = "Target student is required"
        }
        if (!value.passingcriteria) {
            isValid = false;
            newErrors.passingcriteria = "Passing criteria is required"
        }
        if (!value.comments) {
            isValid = false;
            newErrors.comments = "Passing criteria is required"
        }
        if (!value.briefdescription) {
            isValid = false;
            newErrors.briefdescription = "Description is required"
        }

        setError(newErrors)
        return isValid
    }


    async function getupdatedata() {

        const data = {
            u_id: batchid,
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
        if (batchid !== ':batch_id') {
            getupdatedata()
        }
        getBatchData()
        getCourseData()
    }, [])




    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                selectcourse: value.selectcourse,
                batchcategory: value.batchcategory,
                description: value.description ,
                timings: value.timings,
                coursename: value.coursename,
                batchcode: value.batchcode,
                planned: value.planned,
                admissiondate: value.admissiondate,
                duration: value.duration,
                coordinator: value.coordinator,
                eligibility : value.eligibility,
                targetstudent : value.targetstudent,
                passingcriteria : value.passingcriteria,
                actualstudent : value.actualstudent,
                comments : value.comments,
                briefdescription : value.briefdescription,
                attachment : value.attachment,
                documentrequire : value.document,
                todate :value.todate,
                uid: uid.Batch_Id
            }


            axios.post(`${BASE_URL}/update_batch`, data)
                .then((res) => {
                    console.log(res)
                    alert("Date Submitted successfully")
                    localStorage.removeItem('annulbatch_data')

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
                    <BatchEdit batchid={batchid} />
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Annual Batch</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>

                                        <div class='row'>
                                            <div className='col-lg-6' style={{borderRight :"1px solid lightgrey"}}>
                                                <div className='row'>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Course Name<span className='text-danger'>*</span></label>
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
                                                        <label for="exampleInputUsername1">Batch Code</label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.batchcode} placeholder="Batch Code" name='batchcode' onChange={onhandleChange} disabled />

                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Batch Category</label>
                                                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchcategory} name='batchcategory' onChange={onhandleChange} >
                                                            <option>Select category</option>
                                                            {batchcat.map((item) => {
                                                                return (
                                                                    <option value={item.BatchCategory}>{item.BatchCategory}</option>
                                                                )
                                                            })}

                                                        </select>

                                                    </div>


                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Eligibility<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.eligibility} placeholder="Eligibility" name='eligibility' onChange={onhandleChange} />
                                                        {error.eligibility && <span className='text-danger'>{error.eligibility}</span>}
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Duration From</label>
                                                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.planned} placeholder="Planned Start Date" name='planned' onChange={onhandleChange} />


                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Last Date of Admission</label>
                                                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.admissiondate} placeholder="Last Date of Admission" name='admissiondate' onChange={onhandleChange} />

                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Target Student<span className='text-danger'>*</span></label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.targetstudent} placeholder="Target Student" name='targetstudent' onChange={onhandleChange} />
                                                        {error.targetstudent && <span className='text-danger'>{error.targetstudent}</span>}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Training Coordinator</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.coordinator} placeholder="Training Coordinator" name='coordinator' onChange={onhandleChange} />

                                                    </div>

                                                    <div class="form-group col-lg-12">
                                                        <label for="exampleTextarea1">Documents required<span className='text-danger'>*</span></label>
                                                        <textarea class="form-control" id="exampleTextarea1" name='document' value={value.document} placeholder="Documents" onChange={onhandleChange}></textarea>
                                                        {error.document && <span className='text-danger'>{error.document}</span>}
                                                    </div>





                                                </div>

                                            </div>

                                            {/*
                                            <div class="col-lg-12">
                                                <hr></hr>
                                            </div> */}

                                            <div className='col-lg-6'>
                                                <div className='row'>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Course Name(if changed)</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1"  placeholder="Course Name" name='coursename' onChange={onhandleChange} />


                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Description</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.description} placeholder="Description" name='description' onChange={onhandleChange} disabled />

                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Passing Criteria<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.passingcriteria} placeholder="Passing Criteria" name='passingcriteria' onChange={onhandleChange}  />
                                                        {error.passingcriteria && <span className='text-danger'>{error.passingcriteria}</span>}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">To</label>
                                                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.todate} placeholder="To" name='todate' onChange={onhandleChange} />

                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Duration</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.duration} placeholder="Duration" name='duration' onChange={onhandleChange} />

                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Actual Students</label>
                                                        <input type="number" class="form-control" id="exampleInputUsername1" value={value.actualstudent} placeholder="Actual student" name='actualstudent' onChange={onhandleChange} disabled />

                                                    </div>


                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Timings</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.timings} placeholder="Timings" name='timings' onChange={onhandleChange} />


                                                    </div>

                                                    <div class="form-group col-lg-12">
                                                        <label for="exampleTextarea1">Comments<span className='text-danger'>*</span></label>
                                                        <textarea class="form-control" id="exampleTextarea1" name='comments' value={value.comments} placeholder="Comments" onChange={onhandleChange}></textarea>
                                                        {error.comments && <span className='text-danger'>{error.comments}</span>}
                                                    </div>
                                                </div>

                                            </div>




                                        </div>
                                        <div className='row'>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Brief Description of Course<span className='text-danger'>*</span></label>
                                                <textarea class="form-control" id="exampleTextarea1" name='briefdescription' value={value.briefdescription} placeholder="Brief Description of Course" onChange={onhandleChange}
                                                    rows={`5`}></textarea>
                                                            {error.briefdescription && <span className='text-danger'>{error.briefdescription}</span>}
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">First Assignment attachment</label>
                                                <input type="file" class="form-control" id="" value={value.attachment} placeholder="First Assignment attachment" name='attachment' onChange={onhandleChange} />
                                                {error.attachment && <span className='text-danger'>{error.attachment}</span>}
                                            </div>

                                        </div>







                                        <button type="submit" class="btn btn-primary mr-2">Save</button>
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

export default BatchDetails
