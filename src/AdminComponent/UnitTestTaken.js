import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const [studentdata, setStudentdata] = useState([])
    const [hide, setHide] = useState(false)
    const [marks, setMarks] = useState('')
    const [updateloading, setupdateLoding] = useState(false)
    
    const [value, setValue] = useState({
        coursename: '',
        batchcode: '',
        utname: '',
        marks: '',
        utdate: '',
        unitno:''
    })

    const Navigate = useNavigate()

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
        if (!value.unitno) {
            isValid = false;
            newErrors.unitno = "Unit No is Required"
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

    const gettest = async (id) => {

        setBatchid(id)

        const data = {
            batch_id: id,
            AnnulBatch: id
        }


        if(id){
            try {
                const res = await axios.post(`${BASE_URL}/getbatchwiseunittest`, data);
    
         
                SetUnit(res.data);
                
            } catch (err) {
                console.error("Error fetching data:", err);
            }
    
        }else{
            try {
                const res = await axios.post(`${BASE_URL}/get_data`, { tablename: "awt_unittesttaken", columnname: "id,subject" });
                if (res.data[0].id) {
    
                    SetUnit(res.data);
                }
    
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

 

   


    };


    async function getStudentDetail(Take_Id) {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: Take_Id || unittesttakenid,
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
        setMarks(data[0].Marks)
        setUid(data[0])

        setValue(prevState => ({
            ...prevState,

            utdate: data[0].Test_Dt,
            unitno : data[0].Test_No
        }))
    }

    async function gettakedata(params) {
        axios.post(`${BASE_URL}/geteditunittesttaken`, { Takeid: params || unittesttakenid })
            .then((res) => {
                console.log(res)
                setStudentdata(res.data)
            })
    }



    useEffect(() => {
        if (unittesttakenid !== ":unittesttakenid") {
            getStudentDetail()
            setHide(true)
            gettest()
            getbatch()
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
                batch_id: batchid, 
                utname: unitid,
                utdate: value.utdate,
                uid: uid.Take_Id,
                marks:marks,
                unit_no:value.unitno,
            }


            try {
                const res = await axios.post(`${BASE_URL}/add_unittesttaken`, data);
                console.log(res);
                alert("Data added successfully");
    
                const Take_Id = res.data?.Take_Id 
                if (Take_Id) {
                    gettakedata(Take_Id);
                    setHide(true);
                    Navigate(`/unittesttaken/${Take_Id}`);
                    getStudentDetail(Take_Id)
                }
            } catch (error) {
                console.error("Error submitting data:", error);
                alert("Something went wrong while submitting the data.");
            }



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
            const response = await axios.post(`${BASE_URL}/update_unittest_child`, studentdata);

            if(response){
                setupdateLoding(false)
                alert("Data updated successfully")
                Navigate('/unittesttaken')
            }

        } catch (error) {
            console.error('Error saving data', error);
            alert("Error while saving")
            // Handle the error
        }
    };


    const getmarks = (id) => {
        SetUnitid(id)

        setMarks('')

        const Marks = unit.filter((item) => (item.id == id)).map((item) => item.marks)
        
        const UnittestDate = unit.filter((item) => (item.id == id)).map((item) => item.utdate)

        setMarks(Marks[0])

        setValue({
            utdate: UnittestDate
        })




    }

    return (

        <div class="container-fluid page-body-wrapper ">
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
                                                {<span className="text-danger">{error.coursename}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={batchid} onChange={(e) => gettest(e.target.value)} name='batchcode'>

                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className="text-danger">{error.batchcode}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Unit Test Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={unitid} onChange={(e) => getmarks(e.target.value)} name='utname'>
                                                    <option>select test</option>
                                                    {unit.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.subject}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className="text-danger">{error.utname}</span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername">Max Marks</lable>
                                                <input type="text" class="form-control" id="exampleInputusername" value={marks} placeholder="Max Marks" name='marks' onChange={onhandleChange} disabled />
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Unit Test Date<span className='text-danger'>*</span> </label>
                                                <input type="date" class="form-control" id="exampleFormControlSelect1" value={value.utdate} name='utdate' onChange={onhandleChange} />
                                                <option></option>
                                                {<span className="text-danger">{error.utdate}</span>}

                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Unit No<span className='text-danger'>*</span> </label>
                                                <input type="number" class="form-control" id="exampleFormControlSelect1" value={value.unitno} name='unitno' onChange={onhandleChange} />
                                                <option></option>
                                                {<span className="text-danger">{error.unitno}</span>}

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

export default UnitTestTaken
