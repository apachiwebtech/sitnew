import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
//import FormControlLabel from '@mui/material/FormControlLabel';

const FinalExamTaken = () => {


    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [course, SetCourse] = React.useState([]);
    const [AnnulBatch, setAnnulBatch] = React.useState([]);
    const [AnnulBatchid, setAnnulBatchid] = React.useState("");
    const [TestName, setTestName] = useState([])
    const [TestNameid, setTestNameid] = useState("")
    const [courseid, setCourseid] = useState("")
    const [loading, setLoading] = useState(true)
    const [batchid, setBatchid] = useState('')
    const { finalexamtakenid } = useParams()
    const [marks, setMarks] = useState('')
    const [updateloading, setupdateLoding] = useState(false)
    const [hide, setHide] = useState(false)
    const [studentdata, setStudentdata] = useState([])
    const [value, setValue] = useState({
        coursename: "",
        batchcode: "",
        examtestname: "",
        date: "",
        Test_No:""
    })


const Navigate = useNavigate()

    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!courseid) {
            isValid = false;
            newErrors.coursename = "Name is require"
        }

        if (!batchid) {
            isValid = false;
            newErrors.batchcode = "Batch Code is Required"
        }

        if (!TestNameid) {
            isValid = false;
            newErrors.examtestname = "Exam is Required"
        }

        if (!value.date) {
            isValid = false;
            newErrors.date = "Date is Required"
        }
        if (!value.Test_No) {
            isValid = false;
            newErrors.Test_No = "Test No is Required"
        }

        setError(newErrors)
        return isValid
    }










    async function getMocDetail(Take_Id) {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id:Take_Id || finalexamtakenid,
                uidname: "Take_Id",
                tablename: "Final_exam_master"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        setUid(data[0])
        setCourseid(data[0].Course_Id)
        setBatchid(data[0].Batch_Id)
        setTestNameid(data[0].Test_Id)
        setMarks(data[0].Marks)
        setValue(prevState => ({
            ...prevState,
            date: data[0].Test_Dt,
            Test_No:data[0].Test_No
        }))
    }



    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {

            const data = {
                course_id: courseid,
                batch_id: batchid,
                testid: TestNameid,
                date: value.date,
                marks: marks,
                Test_No: value.Test_No,
                uid: uid.Take_Id
            }


            axios.post(`${BASE_URL}/add_finalexamtaken`, data)
                .then((res) => {
                    alert("Data Added Successfully")

                    setUid([])
                    // setValue({
                    //     setTestNameid: '',
                    //     setAnnulBatchid: '',
                    //     setCourseid: '',
                    //     Test_No:''
                    // })

                    gettakedata(res.data.TakeId)
                    setHide(true)

                    const Take_Id = res.data?.TakeId; 
                    if (Take_Id) {
                        gettakedata(Take_Id);
                        setHide(true);
                        Navigate(`/finalexamtaken/${Take_Id}`);
                        getMocDetail(Take_Id)
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        }





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

        if (id != undefined) {

            setCourseid(id)

            const data = {
                courseid: id
            }

            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                setAnnulBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            const data = {
                tablename: "Batch_Mst",
                columnname: "Batch_Id,Batch_code"
            }
            axios.post(`${BASE_URL}/get_new_data`, data)
                .then((res) => {

                    setAnnulBatch(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    };



    const getfinalexam = async (id) => {

        if (id != undefined) {
            setBatchid(id)

            const data = {
                batch_id: id
            }

            try {
                const res = await axios.post(`${BASE_URL}/getbatchwisefinalexam`, data);
                setTestName(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_data`, { tablename: "awt_batch_exam", columnname: "id,subject" });
                if (res.data[0].id) {

                    setTestName(res.data);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
            }

        }

    };

    async function gettakedata(params) {
        axios.post(`${BASE_URL}/geteditfinalexam`, { Takeid: params || finalexamtakenid })
            .then((res) => {
                console.log(res)
                setStudentdata(res.data)
            })
    }


    useEffect(() => {
        if (finalexamtakenid !== ":finalexamtakenid") {
            getMocDetail()
            setHide(true)
            gettakedata()
            getbatch()
            getfinalexam()
        }
        getCourseData()
        value.title = ""
        setError({})
        setUid([])
    }, [])


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    }


    const getmarks = (id) => {

        setTestNameid(id)

        setMarks('')

        const Marks = TestName.filter((item) => (item.id == id)).map((item) => item.max_marks)

        const ExamDate = TestName.filter((item) => (item.id == id)).map((item) => item.exam_date)

        setMarks(Marks[0])

        setValue({
            date: ExamDate[0]
        })

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
            const response = await axios.post(`${BASE_URL}/update_fexamtaken_child`, studentdata);
            if(response){
                setupdateLoding(true)
                alert("Data updated successfully")
                Navigate('/finalexamtakenlisting')
            }

        } catch (error) {
            console.error('Error saving data', error);
            // Handle the error
        }
    };


    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />

            <div class="main-panel" >
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Final Exam Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={courseid} onChange={(e) => getbatch(e.target.value)} name='coursename'>
                                                    <option>-Select-</option>

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
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={batchid} onChange={(e) => getfinalexam(e.target.value)} name='batchcode'>
                                                    <option>-Select-</option>
                                                    {AnnulBatch.map((item) => {
                                                        return (

                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batchcode} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Exam Test Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={TestNameid} onChange={(e) => getmarks(e.target.value)} name='examtestname'>
                                                    <option>-Select-</option>

                                                    {TestName.map((item) => {
                                                        return (

                                                            <option value={item.id}>{item.subject}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className="text-danger"> {error.examtestname} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Max Marks</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={marks}
                                                    placeholder="Max Marks" name='maxmarks' onChange={onhandleChange} disabled />
                                            </div>



                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Date<span className="text-danger"></span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.date} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Test No<span className="text-danger">*</span></label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.Test_No} name='Test_No' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.Test_No} </span>}
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

export default FinalExamTaken