import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';


const AssignmentsTaken = () => {

    const [brand, setBrand] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [course, SetCourse] = useState([])
    const [courseid, SetCoursid] = useState('')
    const [assignid, SetAssignid] = useState('')
    const [assign, Setassign] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [batchid, setBatchid] = useState('')
    const [marks, setMarks] = useState('')
    const { assignmentstakenid } = useParams();
    const [hide, setHide] = useState(false)
    const [studentdata, setStudentdata] = useState([])
    const [value, setValue] = useState({

        coursename: '',
        batchcode: '',
        assignmentname: '',
        maxmarks: '',
        assignmentdate: '',
        returndate: '',
        assignno:""
    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!courseid) {
            isValid = false;
            newErrors.coursename = "CourseName is Required"
        }

        if (!batchid) {
            isValid = false;
            newErrors.batchcode = "Batch Code is Required"
        }

        if (!assignid) {
            isValid = false;
            newErrors.assignmentname = "Assignment is Required"
        }

        if (!value.assignmentdate) {
            isValid = false;
            newErrors.assignmentdate = "AssignmentaDate is Required"
        }

        if (!value.returndate) {
            isValid = false;
            newErrors.returndate = "ReturnDate is Required"
        }
        if (!value.assignno) {
            isValid = false;
            newErrors.assignno = "Assignno is Required"
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


        if(id){
            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                setAnnulBatch(res.data);
    
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }else{
            try {
                const res = await axios.get(`${BASE_URL}/getbatch`, data);

                setAnnulBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

   

    };

    const getassign = async (id) => {

        setBatchid(id)

        const data = {
            batch_id: id,
            AnnulBatch: id
        }


        if(id){
            try {
                const res = await axios.post(`${BASE_URL}/getbatchwiseassignment`, data);
                Setassign(res.data);
    
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }else{
            try {
                const res = await axios.post(`${BASE_URL}/get_data`, { tablename: "assignmentstaken", columnname: "id,assignmentname" });
                Setassign(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

     

    }

    const getmarks = (id) => {
        SetAssignid(id)

        setMarks('')

        const Marks = assign.filter((item) => (item.id == id)).map((item) => item.marks)
        
        const AssignmentDate = assign.filter((item) => (item.id == id)).map((item) => item.assignmentdate)

        setMarks(Marks[0])

        setValue({
            assignmentdate: AssignmentDate
        })




    }


    async function getUpdate() {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: assignmentstakenid,
                uidname: "Given_Id",
                tablename: "Assignment_taken"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        SetCoursid(data[0].Course_Id)
        setBatchid(data[0].Batch_Id)
        SetAssignid(data[0].Assignment_Id)
        setMarks(data[0].Marks)

        setUid(data[0])

        setValue(prevState => ({
            ...prevState,
            coursename: data[0].Course_Id,
            assignmentdate: data[0].Assign_Dt,
            returndate: data[0].Return_Dt,
            maxmarks:data[0].Marks,
            assignno:data[0].Assign_No,
        }))
    }

    async function gettakedata(params) {
        axios.post(`${BASE_URL}/geteditassignmenttaken`, { GivenId: assignmentstakenid })
            .then((res) => {
                console.log(res)
                setStudentdata(res.data)
            })
    }


    useEffect(() => {
        if (assignmentstakenid !== ":assignmentstakenid") {
            getUpdate()
            setHide(true)
            getbatch()
            getassign()
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
                marks: marks,
                assignmentname: assignid,
                assignmentdate: value.assignmentdate,
                returndate: value.returndate,
                assignno: value.assignno,
                uid: uid.Given_Id
            }


            axios.post(`${BASE_URL}/add_assignmentstaken`, data)

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
            const response = await axios.post(`${BASE_URL}/update_assignment_child`, studentdata);

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
                                    <h4 class="card-title">Add Assignment Details</h4>
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
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={batchid} onChange={(e) => {
                                                    getassign(e.target.value)

                                                }} name='batchcode'>
                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className='text-danger'> {error.batchcode} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Assignment Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" 
                                                value={assignid} onChange={(e) => getmarks(e.target.value)} name='assignmentname'>
                                                    <option>Select Batch</option>
                                                    {assign.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.assignmentname}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className='text-danger'> {error.assignmentname} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">	Max Marks</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={marks}
                                                    placeholder="Max Marks" name='maxmarks' disabled />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Assignment Date<span className='text-danger'>*</span> </label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.assignmentdate} name='assignmentdate' onChange={onhandleChange} />
                                                <option></option>
                                                {<span className='text-danger'> {error.assignmentdate} </span>}


                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Return Date<span className='text-danger'>*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.returndate} name='returndate' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.returndate} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Assingment Number<span className='text-danger'>*</span></label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.assignno} name='assignno' onChange={onhandleChange}  disabled={value.assignno} />
                                                {<span className='text-danger'> {error.assignno} </span>  }
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
                                        <button type="button" onClick={handleSubmitTable} style={{ float: "right" }} class="btn btn-primary m-2">Update Sheet</button>



                                    </div>
                                </form>
                            </div>}
                       


                    </div>
                </div>
            </div >
        </div >

    )
}

export default AssignmentsTaken
