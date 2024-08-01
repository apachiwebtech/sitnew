import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import axios from 'axios';
//import FormControlLabel from '@mui/material/FormControlLabel';

const UnitTestTaken = () => {

    const { unittesttakenid } = useParams();

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [checked, setChecked] = React.useState([true, false]);
    const [course, SetCourse] = useState([])
    const [courseid, SetCoursid] = useState('')
    const [batch, setAnnulBatch] = useState([])
    const [batchid, setBatchid] = useState('')
    const [unit, SetUnit] = useState([])
    const [unitid, SetUnitid] = useState('')



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

        if (!courseid) {
            isValid = false;
            newErrors.coursename = "Course Name is Required"
        }

        if (!batchid) {
            isValid = false;
            newErrors.batchcode = "Batch Code is Required"
        }

        if (!unitid) {
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


    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                SetCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getbatch = async (id) => {

        SetCoursid(id)

        const data = {
            courseid: id
        }

        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data);

        } catch (err) {
            console.error("Error fetching data:", err);
        }

    };

    const gettest = async (id) => {

        setBatchid(id)

        const data = {
            batch_id: id,
            AnnulBatch: id
        }

        try {
            const res = await axios.post(`${BASE_URL}/getbatchwiseunittest`, data);

            // if (res.data[0].id) {

            // }
            SetUnit(res.data);
            
        } catch (err) {
            console.error("Error fetching data:", err);
        }


    };


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: unittesttakenid,
                uidname: "Take_Id",
                tablename: "Test_taken_master"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        
        SetCoursid(data[0].Course_Id)
        setBatchid(data[0].Batch_Id)
        SetUnitid(data[0].Test_Id)

        setUid(data[0])

        setValue(prevState => ({
            ...prevState,

            utdate: data[0].Test_Dt,

        }))
    }


    useEffect(() => {
        if (unittesttakenid !== ":unittesttakenid") {
            getStudentDetail()
        }

        getCourseData()

        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()


        if (validateForm()) {

            const data = {
                coursename: courseid,
                batchcode: batchid,
                utname: unitid,
                utdate: value.utdate,
                uid: uid.Take_Id
            }


            axios.post(`${BASE_URL}/add_unittesttaken`, data)

                .then((res) => {
                    console.log(res)
                    alert("Data added successfully")
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
                                    <h4 class="card-title">Add Unit Test Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={courseid} onChange={(e) => getbatch(e.target.value)} name='coursename'>
                                                    <option >Select Course</option>

                                                    {course.map((item) => {
                                                        return (

                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={unitid} onChange={(e) => gettest(e.target.value)} name='batchcode'>

                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Unit Test Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={unitid} onChange={(e) => SetUnitid(e.target.value)} name='utname'>
                                                    <option>select test</option>
                                                    {unit.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.utname}</option>
                                                        )
                                                    })}

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
