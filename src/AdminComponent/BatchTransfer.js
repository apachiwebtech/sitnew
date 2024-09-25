import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';


const BatchTransfer = () => {
    const [batch_code, SetStudentid] = useState('')
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const [course, SetCourse] = useState([])
    const [courseid, SetCoursid] = useState('')
    const [assignid, SetAssignid] = useState('')
    const [assign, Setassign] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [batchid, setBatchid] = useState('')
    const [marks, setMarks] = useState('')
    const { batchtransferid } = useParams();
    const [hide, setHide] = useState(false)
    const [studentdata, setStudentdata] = useState([])
    const [value, setValue] = useState({

        Course_Id: '',
        Old_Batch_Id: '',
        Student_Id: '',
        New_Batch_Id: '',
        Transfer_Amt: '',
        Pay_Type: '',
    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.Course_Id) {
            isValid = false;
            newErrors.Course_Id = "Course Id is Required"
        }

        if (!value.Old_Batch_Id) {
            isValid = false;
            newErrors.Old_Batch_Id = "Batch Id is Required"
        }

        if (!value.Student_Id) {
            isValid = false;
            newErrors.Student_Id = "Student Id is Required"
        }

        if (!value.New_Batch_Id) {
            isValid = false;
            newErrors.New_Batch_Id = "New Batch is Required"
        }

        if (!value.Transfer_Amt) {
            isValid = false;
            newErrors.Transfer_Amt = "Transfer Amt is Required"
        }
        if (!value.Pay_Type) {
            isValid = false;
            newErrors.Pay_Type = "Pay Type is Required"
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

    const getStudents = async (id) => {
        SetStudentid(id)

        const data = {
            studentid: id,
            
        };

        try {
            if (id) {
                const res = await axios.post(`${BASE_URL}/getbatchwisestudent`, data);
                setAnnulBatch(res.data);

            } else {

                const res = await axios.post(`${BASE_URL}/get_data`,
                    {
                        tablename: "getbatchwisestudent",
                        columnname: "id_batchwisestudent"
                    });
                batch_code(res.data);
            }
        } catch (err) {
            console.error("Error fetaching data:", err);
        }
    };


    const getassign = async (id) => {
        setBatchid(id)

        const data = {
            batch_id: id,
            AnnulBatch: id
        }

        if (id) {
            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                Setassign(res.data);

            } catch (err) {
                console.error("error fetching data:", err);
            }
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_data`,
                    {
                        tablename: "getcoursewisebatch",
                        columnname: "id,coursewisebatch"
                    });
                Setassign(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

    }


    async function getUpdate() {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: batchtransferid,
                uidname: "Given_Id",
                tablename: "batch_transfer"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        SetCoursid(data[0].Course_Id)
        setBatchid(data[0].Batch_Id)
        SetStudentid(data[0].Student_Name)
        setMarks(data[0].Marks)

        setUid(data[0])

        setValue(prevState => ({
            ...prevState,

            Course_Id: data[0].Course_Id,
            Old_Batch_Id: data[0].Old_Batch_Id,
            Student_Name: data[0].Student_Name,
            New_Batch_Id: data[0].New_Batch_Id,
            Transfer_Amt: data[0].Transfer_Amt,
            Pay_Type: data[0].Pay_Type,
            uid: uid ? uid.id : null

        }))
    }

    async function gettakedata(params) {
        axios.post(`${BASE_URL}/getbatchtransferid`, { GivenId: batchtransferid })
            .then((res) => {
                console.log(res)
                setStudentdata(res.data)
            })
    }


    useEffect(() => {
        if (batchtransferid !== ":batchtransferid") {
            getUpdate()
            setHide(true)
            getbatch()
            getassign()
           // getStudents()
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
                Course_Id: value.Course_Id,
                Old_Batch_Id: value.Old_Batch_Id,
                Student_Name: value.Student_Name,
                New_Batch_Id: value.New_Batch_Id,
                Transfer_Amt: value.Transfer_Amt,
                Pay_Type: value.Pay_Type,
                uid: uid ? uid.id : null
            }


            axios.get(`${BASE_URL}/add_batch_transfer`, data)

                .then((res) => {
                    console.log(res)
                    alert("Data added successfully")
                })

        }
    }

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedStudents = [...studentdata];
        updatedStudents[index][name] = value;
        setStudentdata(updatedStudents);
    };




    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleSubmitTable = async (e) => {



        try {
            const response = await axios.post(`${BASE_URL}/update_batchtranfer`, studentdata);

            alert("Data updated successfully")
        } catch (error) {
            console.error('Error saving data', error);
            // Handle the error
        }
    };



    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add details for Transfer Batch</h4>
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
                                                {<span className='text-danger'> {error.coursename} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Old Batch No.<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" name='Batch_code'
                                                    value={value.Batch_code} onChange={(e) => {
                                                        getassign(e.target.value)

                                                    }}>
                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className='text-danger'> {error.Batch_code} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFomrControlSelect1">Student<span className="text-danger">*</span></label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.Student_Id} name='Student_Id' onChange={(e) => {
                                                        getStudents(e.target.value)
                                                    }}>
                                                    <option>--Student Name--</option>
                                                    {studentdata.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.student_Id}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.Student_Id} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">New Batch No.<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" name='Batch_code'
                                                    value={value.Batch_code} onChange={(e) => {
                                                        getassign(e.target.value)

                                                    }}>
                                                    <option>--Select Batch--</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className='text-danger'> {error.Batch_code} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Transfer Ammount<span className="text-danger">*</span></lable>
                                                <input text="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.Transfer_Amt} placeholder='00.00' name='Transfer_Amt' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.Transfer_Amt} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFomrControlSelect1">Payment Type<span className="text-danger">*</span></label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.Pay_Type} name='Pay_Type' onChange={onhandleChange}>
                                                    <option>Lumpsum</option>
                                                    <option>Installment</option>
                                                </select>
                                                {<span className='text-danger'> {error.Pay_Type} </span>}
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

export default BatchTransfer
