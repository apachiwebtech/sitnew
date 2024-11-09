import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import InquiryForm from './InquiryForm';


const Inquiry = () => {

    const [brand, setBrand] = useState([])
    const [descipline, getDescipline] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [status, setStatus] = useState([])
    const { inquiryid } = useParams();
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({
        firstname: '',
        gender: '',
        dob: '',
        mobile: '',
        whatsapp: '',
        email: '',
        nationality: '',
        discussion: '',
        country: '',
        InquiryDate: '',
        modeEnquiry: '',
        advert: '',
        programmeEnquired: '',
        selectedProgramme: '',
        category: '',
        batch: '',
        qualification: '',
        descipline: '',
        percentage: '',
        statusdate: '',
        status: ''
    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.facultyname) {
            isValid = false;
            newErrors.name = "Name is require"
        }

        setError(newErrors)
        return isValid
    }


    // const getInquiryData = async () => {
    //     const response = await fetch(`${BASE_URL}/getadmissionactivity`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const data = await response.json();

    //     setInquiryData(data);
    // }

    const getDiscipline = async () => {
        const response = await fetch(`${BASE_URL}/getDiscipline`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setDescipline(data);
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
    const getEducation = async () => {
        const response = await fetch(`${BASE_URL}/getEducation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setEducation(data);
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

    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: inquiryid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        localStorage.setItem("Student_id" , data[0].Student_Id)


        setValue(prevState => ({
            ...prevState,
            firstname: data[0].Student_Name,
            gender: data[0].Sex,
            dob: data[0].DOB,
            mobile: data[0].Present_Mobile,
            whatsapp: data[0].Present_Mobile,
            email: data[0].Email,
            nationality: data[0].Nationality,
            discussion: data[0].Discussion,
            country: data[0].Present_Country,
            InquiryDate: data[0].inquiry_DT,
            modeEnquiry: data[0].Inquiry_type,
            advert: data[0].Refered_By,
            programmeEnquired: data[0].Inquiry,
            selectedProgramme: data[0].Course_Id,
            category: data[0].Batch_Category_id,
            batch: data[0].Batch_Code,
            qualification: data[0].Qualification,
            descipline: data[0].Discipline,
            percentage: data[0].Percentage,
            statusdate: data[0].StateChangeDt,
            status: data[0].OnlineState
        }))
    }
    useEffect(() => {
        if (inquiryid !== ":inquiryid") {
            getStudentDetail()
        }
        // getInquiryData()
        getDiscipline();
        getEducation();
        getCourse();
        getBatch();
        getBtachCategory();
        value.title = ""
        setError({})
        setUid([])
    }, [])


    async function getStatus() {
        axios.get(`${BASE_URL}/getstatus`)
            .then((res) => {
                setStatus(res.data)
            })
    }


    useEffect(() => {
        getStatus()
    }, [])


const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        // if(validateForm()){
        if (inquiryid == ":inquiryid") {
            response = await fetch(`${BASE_URL}/postInquiry`, {
                method: 'POST',
                body: JSON.stringify({
                    firstname: value.firstname,
                    gender: value.gender,
                    dob: value.dob,
                    mobile: value.mobile,
                    whatsapp: value.whatsapp,
                    email: value.email,
                    nationality: value.nationality,
                    discussion: value.discussion,
                    country: value.country,
                    InquiryDate: value.InquiryDate,
                    modeEnquiry: value.modeEnquiry,
                    advert: value.advert,
                    programmeEnquired: value.programmeEnquired,
                    selectedProgramme: value.selectedProgramme,
                    category: value.category,
                    batch: value.batch,
                    qualification: value.qualification,
                    descipline: value.descipline,
                    percentage: value.percentage,
                    statusdate: value.statusdate,
                    status: value.status
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updateInquiry`, {
                method: 'POST',
                body: JSON.stringify({
                    Enquiry_Id: inquiryid,
                    firstname: value.firstname,
                    gender: value.gender,
                    dob: value.dob,
                    mobile: value.mobile,
                    whatsapp: value.whatsapp,
                    email: value.email,
                    nationality: value.nationality,
                    discussion: value.discussion,
                    country: value.country,
                    InquiryDate: value.InquiryDate,
                    modeEnquiry: value.modeEnquiry,
                    advert: value.advert,
                    programmeEnquired: value.programmeEnquired,
                    selectedProgramme: value.selectedProgramme,
                    category: value.category,
                    batch: value.batch,
                    qualification: value.qualification,
                    descipline: value.descipline,
                    percentage: value.percentage,
                    statusdate: value.statusdate,
                    status: value.status
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }





        const data = await response.json();

        alert(data.message)
        //   window.location.pathname = '/inquirylisting'

        navigate('/inquirylisting')


        // }        
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    return (

        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">

                    <InquiryForm inquiryid={inquiryid} />

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Edit Inquiry</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-8 ">
                                                            <label for="exampleInputUsername1">Name<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.firstname} placeholder="Name*" name='firstname' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Gender</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.gender} name='gender' onChange={onhandleChange} defaultValue={value.gender}>
                                                                <option>Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Date Of Brith</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.dob} placeholder="Contact Person" name='dob' onChange={onhandleChange} />

                                                        </div>
                                                        <div className='form-group col-4'>
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={value.mobile} placeholder="Number" name='mobile' onChange={onhandleChange} />
                                                        </div>
                                                        <div className='form-group col-4'>
                                                            <label for="exampleInputUsername1">Whatsapp Number</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={value.whatsapp} placeholder="Number" name='whatsapp' onChange={onhandleChange} />
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Email<span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.email} placeholder="Name*" name='email' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>
                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Nationality<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.nationality} placeholder="Nationality*" name='nationality' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.country} placeholder="Name*" name='country' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                                        </div>
                                                    </div>

                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleTextarea1">Discussion </label>
                                                        <textarea className="form-control" id="exampleTextarea1" value={value.discussion} placeholder="Discussion" name='discussion' onChange={onhandleChange}></textarea>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Status Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.statusdate} placeholder="Contact Person" name='statusdate' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Set Status</label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.status} defaultValue={value.status} name='status' onChange={onhandleChange} >
                                                                <option>Select Status</option>
                                                                {status.map((item) => {
                                                                    return (
                                                                        <option value={item.Id} >{item.Status}</option>
                                                                    )
                                                                })}

                                                            </select>
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
                                                        <h4 className="card-title titleback">Inquiry Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Inquiry Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.InquiryDate} placeholder="Contact Person" name='InquiryDate' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-3">
                                                            <label for="exampleInputUsername1">Mode Of Inquiry</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.modeEnquiry} name='modeEnquiry' defaultValue={value.modeEnquiry} onChange={onhandleChange} >
                                                                <option>Select Inquiry</option>
                                                                <option value="mail" >Mail</option>
                                                                <option value="person" >Person</option>
                                                                <option value="phone" >Phone</option>
                                                                <option value="omail" >OnlineMail</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-5 ">
                                                            <label for="exampleInputUsername1">How they come to know about SIT	    </label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.advert} defaultValue={value.advert} name='advert' onChange={onhandleChange} >
                                                                <option value="">Select</option>
                                                                <option value="Website">Website</option>
                                                                <option value="Exhibition">Exhibition</option>
                                                                <option value="Reference">Reference</option>
                                                                <option value="TV interview">TV interview</option>
                                                                <option value="Advertisement">Advertisement</option>
                                                                <option value="Shiksha">Shiksha</option>
                                                                <option value="India Mart">India Mart</option>
                                                                <option value="Emagister">Emagister</option>
                                                                <option value="News Paper">News Paper</option>
                                                                <option value="Ex.student">Ex.student</option>
                                                                <option value="Google">Google</option>
                                                                <option value="Seminar">Seminar</option>
                                                                <option value="Facebook">Facebook</option>

                                                            </select>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Training Programme & batch details</h4>
                                                    </div>
                                                    {/* <div className='row'>
                                                        <div className="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Programme inquired	</label>
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.programmeEnquired} placeholder="Discussion" name='programmeEnquired' onChange={onhandleChange}></textarea>

                                                        </div>
                                                    </div> */}

                                                    <div className='row'>
                                                        <div className="form-group col-lg-5">
                                                            <label htmlFor="exampleInputUsername1">Selected Training Programme</label>
                                                            <select
                                                                className="form-control form-control-lg"
                                                                id="exampleFormControlSelect1"
                                                                value={value.selectedProgramme}
                                                                name='selectedProgramme'
                                                                onChange={onhandleChange}
                                                                defaultValue={value.selectedProgramme}
                                                            >
                                                                <option>Select Course</option>
                                                                {Course.map((item) => (

                                                                    <option key={item.id} value={item.Course_Id}>
                                                                        {item.Course_Name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Category</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.category} defaultValue={value.category} name='category' onChange={onhandleChange} >
                                                                <option>Select Category</option>

                                                                {batchCategoty?.map((item) => {
                                                                    return <option value={item.id}>{item.BatchCategory}</option>
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-3">
                                                            <label for="exampleInputUsername1">Batch</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} defaultValue={value.batch} name='batch' onChange={onhandleChange} >
                                                                <option>Select Batch</option>
                                                                {batch.map((item) => {
                                                                    return (

                                                                        <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                                    )
                                                                })}

                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Education Qualification & Work</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Qualification</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.qualification}
                                                                defaultValue={value.qualification} name='qualification' onChange={onhandleChange} >
                                                                    <option>Select Qualification</option>
                                                                {
                                                                    Education.map((item) => {
                                                                        return (
                                                                            <option value={item.Education}>{item.Education}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Descipline</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.descipline}
                                                                defaultValue={value.descipline} name='descipline' onChange={onhandleChange} >
                                                                    <option>Select Descipline</option>
                                                                {
                                                                    Discipline.map((item) => {
                                                                        return (
                                                                            <option value={item.Id}>{item.Deciplin}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Percentage<span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.percentage} placeholder="Percentage" name='percentage' onChange={onhandleChange} />
                                                            {error.facultyname && <span className='text-danger'>{error.name}</span>}
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

export default Inquiry