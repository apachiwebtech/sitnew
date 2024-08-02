import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';

const VivaMOCTaken = () => {

    const { vivamoctakenid } = useParams();
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const [course, SetCourse] = useState([])
    const [courseid, SetCoursid] = useState('')
    const [batch, setAnnulBatch] = useState([])
    const [batchid, setBatchid] = useState('')
    const [moc, SetMoc] = useState([])
    const [mocid, SetMocid] = useState('')



    const [value, setValue] = useState({
        coursename: '',
        batchcode: '',
        vivamocname: '',
        maxmarks: '',
        date: '',

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

        if (!mocid) {
            isValid = false;
            newErrors.vivamocname = "Viva MOC is Required"
        }

        if (!value.date) {
            isValid = false;
            newErrors.date = "Date is Required"
        }


        setError(newErrors)
        return isValid
    }


    async function getMocDetail() {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: vivamoctakenid,
                uidname: "Take_Id",
                tablename: "viva_taken"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        setUid(data[0])
        SetCoursid(data[0].Course_Id)
        setBatchid(data[0].Batch_Id)

        
        
        setValue(prevState => ({
            ...prevState,
            coursename: data[0].coursename,
            batchcode: data[0].batchcode,
            vivamocname: data[0].vivamocname,
            maxmarks: data[0].maxmarks,
            date: data[0].date,
        }))
    }



    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
  
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

    const getmoc = async (id) => {
        setBatchid(id)

        const data = {
            batch_id: id,
        }

        try {
            const res = await axios.post(`${BASE_URL}/getbatchwisemoc`, data);

            SetMoc(res.data);
            
        } catch (err) {
            console.error("Error fetching data:", err);
        }


    };


    useEffect(() => {
        if (vivamoctakenid !== ":vivamoctakenid") {
            getMocDetail()
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
                vivamocname: mocid,
                date: value.date,
                uid: uid.Take_Id
            }


            axios.post(`${BASE_URL}/add_vivamoctaken`, data)

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
                                    <h4 class="card-title">Add Viva Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course Name <span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={courseid} onChange={(e) => getbatch(e.target.value)} name='coursename'>
                                                    <option>Select</option>
                                                    {course.map((item) => {
                                                        return (

                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.coursename} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={batchid} onChange={(e) => getmoc(e.target.value)}  name='batchcode'>
                                                    <option>-Select Batch Code-</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batchcode} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Viva/Moc Name:<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={mocid} onChange={(e) => SetMocid(e.target.value)} name='vivamocname'>
                                                    <option>--Select--</option>
                                                    {moc.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.subject}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.vivamocname} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Max Marks</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.maxmarks} placeholder="Max Marks"
                                                    name='maxmarks' onChange={onhandleChange} disabled />
                                            </div>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Date<span className="text-danger">*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.date} </span>}
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

export default VivaMOCTaken
