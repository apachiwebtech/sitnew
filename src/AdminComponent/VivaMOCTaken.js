import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';

const VivaMOCTaken = () => {

    const { vivamoctakenid } = useParams();
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const [course, SetCourse] = useState([])
    const [courseid, SetCoursid] = useState('')
    const [batchid, setBatchid] = useState('')
    const [batch, setAnnulBatch] = useState([])
    const [moc, SetMoc] = useState([])
    const [mocid, SetMocid] = useState('')
    const [studentdata, setStudentdata] = useState([])
    const [hide, setHide] = useState(false)
    const [marks, setMarks] = useState('')
    const [updateloading, setupdateLoding] = useState(false)
    const Navigate = useNavigate()
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
        SetMocid(data[0].Viva_Id)
        setMarks(data[0].Marks)


        setValue(prevState => ({
            ...prevState,
            date: data[0].Take_Dt,
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

        if (id) {

            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                setAnnulBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {

            try {
                const res = await axios.get(`${BASE_URL}/getbatch`, data);

                setAnnulBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }





    };

    const getmoc = async (id) => {
        setBatchid(id)




        const data = {
            batch_id: id,
        }


        if (id) {

            try {
                const res = await axios.post(`${BASE_URL}/getbatchwisemoc`, data);

                SetMoc(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_data`, { tablename: "Batch_Moc_Master", columnname: "id,subject" });
                if (res.data[0].id) {

                    SetMoc(res.data);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }



    };

    async function gettakedata(params) {
        axios.post(`${BASE_URL}/geteditvivataken`, { Takeid: params || vivamoctakenid })
            .then((res) => {
                console.log(res)
                setStudentdata(res.data)
            })
    }


    useEffect(() => {
        if (vivamoctakenid !== ":vivamoctakenid") {
            getMocDetail()
            setHide(true)
            getbatch()
            getmoc()
        }

        gettakedata()
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
                    gettakedata(res.data.Take_Id)
                    setHide(true)
                })

        }



    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedStudents = [...studentdata];
        updatedStudents[index][name] = value;
        setStudentdata(updatedStudents);
    };


    const handleSubmitTable = async (e) => {

        setupdateLoding(true)

        try {
            const response = await axios.post(`${BASE_URL}/update_vivataken_child`, studentdata);
            if (response) {
                 setupdateLoding(false)
                alert("Data updated successfully")
                Navigate('/vivamoctaken')
            }
        } catch (error) {
            console.error('Error saving data', error);
            // Handle the error
        }
    };


    const getmarks = (id) => {

        SetMocid(id)

        setMarks('')

        const Marks = moc.filter((item) => (item.id == id)).map((item) => item.marks)

        const MocDate = moc.filter((item) => (item.id == id)).map((item) => item.date)

        setMarks(Marks[0])

        setValue({
            date: MocDate
        })

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
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={batchid} onChange={(e) => getmoc(e.target.value)} name='batchcode'>
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
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={mocid} onChange={(e) => getmarks(e.target.value)} name='vivamocname'>
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
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={marks} placeholder="Max Marks"
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
                        {hide && <div class="col-lg-12 mt-3">
                            <form class="card" >
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        {/* <div>
                    <h4 class="card-title">Allot Roll Number List</h4>
                </div> */}

                                    </div>
                                    <div>




                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Id
                                                    </th>
                                                    <th>
                                                        Student Code
                                                    </th>

                                                    <th>
                                                        Student Name
                                                    </th>
                                                    <th>
                                                        Marks
                                                    </th>
                                                    <th>
                                                        Status
                                                    </th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                {studentdata.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {item.Student_Code}
                                                            </td>
                                                            <td>
                                                                {item.Student_Name}

                                                            </td>
                                                            <td>
                                                                <div class="form-group ">
                                                                    <label for="exampleFormControlSelect1"></label>
                                                                    <input type="number" class="form-control" id="exampleInputUsername1" name='Marks_Given' onChange={(e) => handleInputChange(index, e)} value={item.Marks_Given} />

                                                                </div>
                                                            </td>

                                                            <td>
                                                                <>
                                                                    <select class="form-control form-control-lg" value={item.Status} onChange={(e) => handleInputChange(index, e)} name='Status' id="exampleFromControlSelect1" >

                                                                        <option>Select</option>

                                                                        <option value='Present'>Present</option>
                                                                        <option value='Absent'>Absent</option>



                                                                    </select>
                                                                </>
                                                            </td>




                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                    <button type="button" onClick={handleSubmitTable} style={{ float: "right" }} class="btn btn-primary m-2">{updateloading ?  "processing.." : "Update Sheet"}</button>



                                </div>
                            </form>
                        </div>}
                    </div>
                </div>
            </div >
        </div >

    )
}

export default VivaMOCTaken
