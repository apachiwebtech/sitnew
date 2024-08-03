import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import OnlineAdmissionForm from './OnlineAdmissionForm';
import img from '../assets/pass.jpg';
import Admissionform from './Admissionform';
import InnerHeaderForm from './InnerHeaderForm';



const StudentPersonalInfo = () => {
    const [course, setCourse] = useState([])
    const [batchCategoty, setbatchCategory] = useState([]);
    const [status, setStatus] = useState([])
    const location = useLocation();
    const [personalInfo, setPersonalInfo] = useState({
        studentName: '',
        Batch_Code: '',
        gender: '',
        nationality: '',
        dob: '',
        password: '',
        reference: '',
        presentaddress: '',
        presentPincode: '',
        presentCity: '',
        state: '',
        presentCountry: '',
        mobile: '',
        whatsapp: '',
        course: '',
        category: '',
        Referby: '',
        admission_dt: '',
        prestatus: '',
        changestatus: '',
        prestatusdate: '',
        date: '',
        permanentAdress: '',
        permanentPincode: '',
        permanentCity: '',
        permanentState: '',
        permanentCountry: '',
        permanentmobile: '',
        perWatsapp: '',
        sdate: '',
        edate: ''

    })
    const { admissionid } = useParams();

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
    const getBtachCategory = async () => {
        const response = await fetch(`${BASE_URL}/getBtachCategory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setbatchCategory(data);
    }

    async function getStatus() {
        axios.get(`${BASE_URL}/getstatus`)
            .then((res) => {
                setStatus(res.data)
            })
    }

    useEffect(() => {
        getStatus()
        getCourse()
        getBtachCategory()
        localStorage.setItem("Admissionid", admissionid);
    }, [admissionid])

    const getPersonalData = async () => {
        const response = await fetch(`${BASE_URL}/getPersonal`, {
            method: 'POST',
            body: JSON.stringify({
                admissionid: localStorage.getItem(`Admissionid`),
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        console.log(data[0].Permanent_Country)
        setPersonalInfo(prevState => ({
            ...prevState,
            Batch_Code: data[0].Batch_Code,
            studentName: data[0].Student_Name,
            gender: data[0].Sex,
            nationality: data[0].Nationality,
            dob: data[0].DOB,
            // password: data[0].,
            reference: data[0].Refered_By,
            presentaddress: data[0].Present_Address,
            presentPincode: data[0].Present_Pin,
            presentCity: data[0].Present_City,
            state: data[0].Present_State,
            presentCountry: data[0].Present_Country,
            mobile: data[0].Present_Mobile,
            whatsapp: '',
            course: data[0].Course_Id,
            category: data[0].Batch_Category_id,
            Referby: data[0].Refered_By,
            admission_dt: data[0].Admission_Dt,
            prestatus: data[0].Status_id,
            changestatus: data[0].OnlineState,
            date: data[0].Status_date,
            prestatusdate: data[0].StateChangeDt,
            permanentAdress: data[0].Permanent_Address,
            permanentPincode: data[0].Permanent_Pin,
            permanentCity: data[0].Permanent_City,
            permanentState: data[0].Permanent_State,
            permanentCountry: data[0].Permanent_Country,
            permanentmobile: data[0].Permanent_Tel,
            perWatsapp: '',
            sdate: data[0].SDate,
            edate: data[0].Edate
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prevState => ({
            ...prevState,
            [name]: value,
        }
        ))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        // if(validateForm()){

        const response = await fetch(`${BASE_URL}/updateStudent`, {
            method: 'POST',
            body: JSON.stringify({
                Student_Id: localStorage.getItem(`Admissionid`),
                studentName: personalInfo.studentName,
                Batch_Code: personalInfo.Batch_Code,
                gender: personalInfo.gender,
                nationality: personalInfo.nationality,
                dob: personalInfo.dob,
                password: personalInfo.password,
                reference: personalInfo.reference,
                presentaddress: personalInfo.presentaddress,
                presentPincode: personalInfo.presentPincode,
                presentCity: personalInfo.presentCity,
                state: personalInfo.state,
                presentCountry: personalInfo.presentCountry,
                mobile: personalInfo.mobile,
                whatsapp: personalInfo.whatsapp,
                course: personalInfo.course,
                category: personalInfo.category,
                Referby: personalInfo.Referby,
                admission_dt: personalInfo.admission_dt,
                prestatus: personalInfo.prestatus,
                changestatus: personalInfo.changestatus,
                date: personalInfo.date,
                prestatusdate: personalInfo.prestatusdate,
                permanentAdress: personalInfo.permanentAdress,
                permanentPincode: personalInfo.permanentPincode,
                permanentCity: personalInfo.permanentCity,
                permanentState: personalInfo.permanentState,
                permanentCountry: personalInfo.permanentCountry,
                permanentmobile: personalInfo.permanentmobile,
                perWatsapp: personalInfo.perWatsapp,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        alert("Updated Successfully")

        // }        
    }
    useEffect(() => {
        getPersonalData();
    }, [])

    const navigate = useNavigate()

    const handleadmission = (id) => {
        let confirm = window.confirm("Are you sure want to proceed ")

        if (confirm) {
            navigate(`/admission/${id}`)
        }


    }

    return (


        <div className="container-fluid page-body-wrapper">
            <InnerHeaderForm />


            <div className="main-panel">

                <div className="content-wrapper">

                    <Admissionform admissionid={admissionid} />

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <form onSubmit={handleSubmit} className='row d-flex justify-content-between'>
                                        <div className='col-md-5 col-lg-5'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Student Details :  </h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">B.M. ID<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.Batch_Code} placeholder="Name*" name='Batch_Code' onChange={handleChange} />
                                                        </div>

                                                        <div className="form-group col-lg-8">
                                                            <label for="exampleInputUsername1">Name<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.studentName} placeholder="Name*" name='studentName' onChange={handleChange} />
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Gender</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.gender} name='gender' onChange={handleChange} >
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Nationality<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.nationality} placeholder="nationality*" name='nationality' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Date Of Birth</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={personalInfo.dob} placeholder="Contact Person" name='dob' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Password<span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={personalInfo.password} placeholder="Name*" name='password' onChange={handleChange} />
                                                        </div>

                                                        <div className="form-group col-lg-12 ">
                                                            <label for="exampleInputUsername1">How they come to know about SIT</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={personalInfo.reference} placeholder="Name*" name='reference' onChange={handleChange} />
                                                        </div>

                                                    </div>

                                                    <div>
                                                        <h4 className="card-title titleback">Present Address :  </h4>
                                                    </div>

                                                    <div className='row'>

                                                        <div className="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Address </label>
                                                            <textarea className="form-control" id="exampleTextarea1" value={personalInfo.presentaddress} placeholder="presentAdress" name='presentaddress' onChange={handleChange}></textarea>

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Pincode<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.presentPincode} placeholder="Name*" name='presentPincode' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">City<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.presentCity} placeholder="Name*" name='presentCity' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">State<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.state} placeholder="Name*" name='state' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.presentCountry} placeholder="Name*" name='presentCountry' onChange={handleChange} />

                                                        </div>

                                                        <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.mobile} placeholder="Number" name='mobile' onChange={handleChange} />
                                                        </div>

                                                        {/* <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Whatsapp Number</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.whatsapp} placeholder="Number" name='whatsapp' onChange={handleChange} />
                                                        </div> */}
                                                    </div>



                                                </div>
                                            </div>


                                            <div className='row p-2 gap-2'>
                                                <button type="submit" className='mr-2 btn btn-primary'>Save</button>
                                                <Link to="/onlineadmission" className='mr-2 btn btn-secondary'>close</Link>
                                            </div>

                                        </div>
                                        <div className='col-md-4 col-lg-4'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Training Programme & Batch Detail</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">
                                                                Training Programme</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.course} name='course' defaultValue={personalInfo.course} onChange={handleChange} >
                                                                {course.map((item) => {
                                                                    return (
                                                                        <option key={item.id} value={item.Course_Id}>{item.Course_Name}</option>
                                                                    )
                                                                })}

                                                            </select>

                                                        </div>
                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Category</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.category} name='category' defaultValue={personalInfo.category} onChange={handleChange} >
                                                                {batchCategoty?.map((item) => {
                                                                    return <option value={item.id}>{item.BatchCategory}</option>
                                                                })}
                                                            </select>
                                                        </div>


                                                        <div className="form-group col-lg-5 ">
                                                            <label for="exampleInputUsername1">Refer</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.Referby} name='Referby' onChange={handleChange} >
                                                                <option value="advertise">Advertisement</option>
                                                                <option value="facebook">facebook</option>
                                                                <option value="google">Google</option>
                                                            </select>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Online Admission Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Online Admission Date	</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={personalInfo.admission_dt} placeholder="Contact Person" name='admission_dt' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Status	</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={personalInfo.prestatus} placeholder="Contact Person" name='prestatus' disabled onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Date</label>

                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={personalInfo.prestatusdate} placeholder="Contact Person" name='prestatusdate' disabled onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    <div className='row'>

                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Set Status</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.changestatus} onChange={handleChange} defaultValue={personalInfo.changestatus} name='changestatus' >

                                                                {status.map((item) => {
                                                                    return (
                                                                        <option value={item.Id} >{item.Status}</option>
                                                                    )
                                                                })}

                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={personalInfo.date} placeholder="Contact Person" name='date' onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    <div className='pt-3'>
                                                        <h4 className="card-title titleback">Permanent Address   :  </h4>
                                                    </div>

                                                    <div className='row'>

                                                        <div className="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Address </label>
                                                            <textarea className="form-control" id="exampleTextarea1" value={personalInfo.permanentAdress} placeholder="permanentAdress" name='permanentAdress' onChange={handleChange}></textarea>

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Pincode<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentPincode} placeholder="Name*" name='permanentPincode' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">City<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentCity} placeholder="Name*" name='permanentCity' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">State<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentState} placeholder="Name*" name='permanentState' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Countryd<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentCountry} placeholder="Name*" name='permanentCountry' onChange={handleChange} />

                                                        </div>

                                                        <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.permanentmobile} placeholder="Number" name='permanentmobile' onChange={handleChange} />
                                                        </div>
                                                        {/* <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Whatsapp Number</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.perWatsapp} placeholder="Number" name='perWatsapp' onChange={handleChange} />
                                                        </div> */}
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-md-3 col-lg-3'>
                                            <div className='p-3'>
                                                <div>
                                                    <h4 className="card-title titleback">Student Info</h4>
                                                </div>

                                                <div className='student-img text-center'>
                                                    <img style={{ width: "150px" }} src={img} alt='' />
                                                </div>

                                                <div className='p-2'>
                                                    <h4>Balance Fees : 00</h4>
                                                    <hr />
                                                    <h4>Assignment Avg : 00</h4>
                                                    <hr />
                                                    <h4>Unit Test Avg : 00</h4>
                                                    <hr />
                                                    <h4>Final Exam Marks : 30.6</h4>
                                                    <hr />
                                                    <h4>Attendance(%) : 30.6</h4>
                                                    <hr />
                                                    <h4>Final Total : 30.6</h4>
                                                    <hr />

                                                    <h4>Batch Details :</h4>
                                                    <div>
                                                        <p><b>Batch Start:</b>{personalInfo.sdate}</p>
                                                        <p><b>Batch End:</b>{personalInfo.edate}</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

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

export default StudentPersonalInfo