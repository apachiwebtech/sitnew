import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const Admission = () => {

    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const [course, setCourse] = useState([])
    const { studentid } = useParams();
    const [student_id , setStudentId] = useState('')
    const [batch, setBatch] = useState([]);
    const [admitid , setAdmitId] = useState('')
    const [value, setValue] = useState({
        date: '',
        batch: '',
        roll: '',
        studentname: "",
        course: "",
        lumpsumamt :"",
        installamt :"",
        ptype :"",
        feesamt :""
    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.course) {
            isValid = false;
            newErrors.course = "Course is require"
        }
        if (!value.batch) {
            isValid = false;
            newErrors.batch = "Batch is require"
        }
        if (!value.date) {
            isValid = false;
            newErrors.date = "Date is require"
        }
        if (!value.studentname) {
            isValid = false;
            newErrors.studentname = "Studentname is require"
        }

        setError(newErrors)
        return isValid
    }




    const getCourse = async () => {
        const response = await fetch(`${BASE_URL}/getCourses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setCourse(data);
    }

    const getBatch = async () => {
        const response = await fetch(`${BASE_URL}/getBtach`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setBatch(data);
    }

    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/AdmitDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: studentid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

         setAdmitId(data[0].Admission_Id)
         setStudentId(data[0].Student_Id)
        if(data[0]){
            setValue(prevState => ({
                ...prevState,
                date : data[0].Admission_Date,
                course : data[0].Course_Id,
                studentname : data[0].Student_Name,
                batch :data[0].Batch_Id,
                lumpsumamt :data[0].Amount,
                installamt :data[0].Amount,
                ptype :data[0].Payment_Type,
                feesamt :data[0].Amount,
                roll : data[0].Student_Code
            }))
        }
    
    }

    useEffect(() => {
        if (studentid !== ":studentid") {
            getStudentDetail()
        }
        getCourse()
        getBatch()
        value.title = ""
        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()

        if(validateForm()){

        const response = await fetch(`${BASE_URL}/updateAdmission`, {
            method: 'POST',
            body: JSON.stringify({
                Admitid: studentid,
                date: value.date,
                roll :value.roll,
                course : value.course,
                batch : value.batch,
                studentid : student_id,
                ptype :value.ptype,
                Amount :value.Amount,
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        
        
        
        
        
        
        const data = await response.json();
        
        alert("Admission done")

        //   window.location.pathname = '/inquirylisting'


        }        
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Information For Addmission</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Course Name<span className='text-danger'>*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} name='course' onChange={onhandleChange} >
                                                                <option>Select Course</option>
                                                                {course.map((item) => {
                                                                    return (
                                                                        <option key={item.id} value={item.Course_Id}>{item.Course_Name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            {error.course && <span className='text-danger'>{error.course}</span>}
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">BatchNo<span className='text-danger'>*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} name='batch' onChange={onhandleChange} >

                                                                <option>Select Batch</option>
                                                                {batch.map((item) => {
                                                                    return (

                                                                        <option value={item.Batch_code}>{item.Batch_code}</option>
                                                                    )
                                                                })}

                                                            </select>
                                                            {error.batch && <span className='text-danger'>{error.batch}</span>}
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Admission Date<span className='text-danger'>*</span></label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.date}  name='date' onChange={onhandleChange} />
                                                            {error.date && <span className='text-danger'>{error.date}</span>}
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Roll No.</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.roll} placeholder="Roll No" name='roll' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Student Name<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.studentname} placeholder="Student's Name" name='studentname' onChange={onhandleChange} />
                                                            {error.studentname && <span className='text-danger'>{error.studentname}</span>}
                                                        </div>



                                                    </div>


                                                </div>
                                            </div>


                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                {/* <button className='col-2'>close</button> */}
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Batch Fees structure</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Lumpsum Amount</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.lumpsumamt} placeholder="Lumpsum Amount" name='lumpsumamt' onChange={onhandleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Installment Amount</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.installamt} placeholder="Installment Amount" name='installamt' onChange={onhandleChange} />

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Student Fees Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Payment Type</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.ptype} name='ptype' onChange={onhandleChange} >
                                                                <option>Select--</option>
                                                                <option value="Lumpsum">Lumpsum</option>
                                                                <option value="Installment">Installment</option>

                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Fees Amount</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.feesamt} placeholder="Fees Amount" name='feesamt' onChange={onhandleChange} />

                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >

    )
}

export default Admission