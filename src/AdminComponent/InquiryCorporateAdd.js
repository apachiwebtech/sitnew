import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const InquiryCorporateAdd = () => {

    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const { lecturetakenid } = useParams();
    const [course, SetCourse] = useState([])
    const [courseid, SetCoursid] = useState('')
    const [batchid, setBatchid] = useState('')
    const [lecture, SetLecture] = useState([])
    const [Email, setFacilty] = useState([])
    const { inquiryid } = useParams();
    const [batch, setAnnulBatch] = useState([])
    const [assign, Setassign] = useState([])
    const [unit, SetUnit] = useState([])
    const [unitid, SetUnitid] = useState(0)
    const [assignid, Setassignid] = useState(0)
    const [lectureid, setLectureid] = useState('')
    const [loading, setLoading] = useState(true)
    const [studentdata, setStudentdata] = useState([])
    const [hide, setHide] = useState(false)
    const [lecturedata, setLecturedata] = useState([])
    const [time, setTime] = useState([])
    const [updateloading, setupdateLoding] = useState()
    const [value, setValue] = useState(
        {
            Course_Id: '',
            Fname: '',
            MName: '',
            Lname: '',
            Mobile: '',
            Idate: '',
            Phone: '',
            Email: '',
            business: '',
            CompanyName: '',
            Designation: '',
            Remark: '',
            Address: '',
            State: '',
            City: '',
            Pin: '',
            Place: '',
            Country: '',
        })





    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // First Name
        if (!value.Fname) {
            isValid = false;
            newErrors.Fname = "First Name is required";
        }

        // Last Name
        if (!value.Lname) {
            isValid = false;
            newErrors.Lname = "Last Name is required";
        }

        // Middle Name
        if (!value.MName) {
            isValid = false;
            newErrors.MName = "Middle Name is required";
        }

        // Mobile - 10 digit number only
        if (!value.Mobile) {
            isValid = false;
            newErrors.Mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(value.Mobile)) {
            isValid = false;
            newErrors.Mobile = "Mobile number must be 10 digits only";
        }

        // Email
        if (!value.Email) {
            isValid = false;
            newErrors.Email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.Email)) {
            isValid = false;
            newErrors.Email = "Invalid email format";
        }

        // Course_Id
        if (!value.Course_Id) {
            isValid = false;
            newErrors.Course_Id = "Course is required";
        }

        // Idate (assumed to be a date field)
        if (!value.Idate) {
            isValid = false;
            newErrors.Idate = "Date is required";
        }

        // Set all errors in state
        setError(newErrors);
        return isValid;
    };


    async function getcorporateinquiry() {

        axios.post(`${BASE_URL}/getcorporateinquiry`)
            .then((res) => {
                console.log(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    async function getStudentDetail(Id) {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: Id || inquiryid,
                uidname: "Id",
                tablename: "Corporate_Inquiry"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        SetCoursid(data[0].Course_Id)
        setUid(data[0])

        setValue(prevState => ({
            ...prevState,
            Fname: data[0].Fname || '',
            MName: data[0].MName || '',   // Fix here
            Lname: data[0].Lname || '',
            Mobile: data[0].Mobile || '',
            Phone: data[0].Phone || '',
            Email: data[0].Email || '',
            CompanyName: data[0].CompanyName || '',
            Designation: data[0].Designation || '',
            Country: data[0].Country || '',
            Address: data[0].Address || '',
            Pin: data[0].Pin || '',
            City: data[0].City || '',
            State: data[0].State || '',
            Place: data[0].Place || '',
            Remark: data[0].Remark || '',
            Course_Id: data[0].Course_Id || '',
            Idate: data[0].Idate || '',
            business: data[0].business || ''
        }));
    }
    useEffect(() => {
        if (inquiryid !== ":inquiryid") {
            getStudentDetail()
            setHide(true)
        }


        setUid([])
    }, [])



    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                SetCourse(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    useEffect(() => {
        getCourseData()
        setUid([])
    }, [])
    const Navigate = useNavigate()

    async function geteditdata(params) {
        axios.post(`${BASE_URL}/geteditcorporate`, { Id: params || inquiryid })
            .then((res) => {
                console.log(res)
                setStudentdata(res.data)


            })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                Course_Id: value.Course_Id,
                Fname: value.Fname,
                MName: value.MName,
                Lname: value.Lname,
                Mobile: value.Mobile,
                Idate: value.Idate,
                Phone: value.Phone,
                Email: value.Email,
                business: value.business,
                CompanyName: value.CompanyName,
                Designation: value.Designation,
                Remark: value.Remark,
                Address: value.Address,
                State: value.State,
                City: value.City,
                Pin: value.Pin,
                Place: value.Place,
                Country: value.Country,
                u_id: inquiryid !== ":inquiryid" ? inquiryid : undefined  // ✅ Use route param for update
            };

            axios.post(`${BASE_URL}/add_corporateinquiry`, data)
                .then((res) => {
                    console.log(res.data);

                    if (res.data === "Data Inserted") {
                        alert("Data Added Successfully");
                    } else if (res.data === "Data Updated") {
                        alert("Data Updated Successfully");
                        Navigate(`/inquirycorporate`);
                    }

                    const Id = res.data?.Id;
                    if (Id) {
                        setHide(true);
                        geteditdata(Id);
                        Navigate(`/inquirycorporate/${Id}`);
                        getStudentDetail(Id);
                    }

                    setValue({
                        Course_Id: '',
                        Fname: '',
                        MName: '',
                        Lname: '',
                        Mobile: '',
                        Idate: '',
                        Phone: '',
                        Email: '',
                        business: '',
                        CompanyName: '',
                        Designation: '',
                        Remark: '',
                        Address: '',
                        State: '',
                        City: '',
                        Pin: '',
                        Place: '',
                        Country: '',
                    });

                })
                .catch((err) => {
                    if (err.response && err.response.status === 409) {
                        alert(err.response.data.message || "Duplicate Inquiry!");
                    } else {
                        alert("Something went wrong!");
                    }
                    console.log(err);
                });
        }
    };





    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            {loading && <Loader />}

            <div className="main-panel" style={{ dispale: loading ? "none" : "block" }}>

                <div className="content-wrapper">

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-12 col-lg-12'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div>
                                                                <h4 className="card-title titleback">Inquiry Information</h4>

                                                            </div>
                                                            <div className='row'>

                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="Fname">FirstName<span className="text-danger">*</span> </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="Fname"
                                                                        name="Fname"
                                                                        value={value.Fname}
                                                                        onChange={onhandleChange}
                                                                        placeholder="Enter Fname"
                                                                    />
                                                                    {error.Fname && <span className="text-danger">{error.Fname}</span>}
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="MName">MiddleName <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="MName"
                                                                        name="MName"
                                                                        value={value.MName}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter MName'
                                                                    />
                                                                    {<span className="text-danger">{error.MName}</span>}
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="Lname">LastName <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="Lname"
                                                                        name="Lname"
                                                                        value={value.Lname}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter Lname'
                                                                    />
                                                                    {error.Lname && <span className="text-danger">{error.Lname}</span>}
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="Mobile">Mobile <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="tel"
                                                                        className="form-control form-control-lg"
                                                                        id="Mobile"
                                                                        name="Mobile"
                                                                        value={value.Mobile}
                                                                        onChange={(e) => {
                                                                            const onlyNums = e.target.value.replace(/\D/g, ''); // remove non-digits
                                                                            if (onlyNums.length <= 10) {
                                                                                onhandleChange({
                                                                                    target: {
                                                                                        name: 'Mobile',
                                                                                        value: onlyNums
                                                                                    }
                                                                                });
                                                                            }
                                                                        }}
                                                                        maxLength={10}
                                                                        inputMode="numeric"
                                                                        placeholder='Enter Mobile Number'
                                                                    />
                                                                    {error.Mobile && (
                                                                        <span className="text-danger">{error.Mobile}</span>
                                                                    )}
                                                                </div>

                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="Phone">Phone</label>
                                                                    <input
                                                                        type="tel"
                                                                        className="form-control form-control-lg"
                                                                        id="Phone"
                                                                        name="Phone"
                                                                        value={value.Phone}
                                                                        onChange={(e) => {
                                                                            const onlyNums = e.target.value.replace(/\D/g, ''); // remove non-digits
                                                                            if (onlyNums.length <= 10) {
                                                                                onhandleChange({
                                                                                    target: {
                                                                                        name: 'Phone',
                                                                                        value: onlyNums
                                                                                    }
                                                                                });
                                                                            }
                                                                        }}
                                                                        maxLength={10}
                                                                        inputMode="numeric"
                                                                        placeholder='Enter Phone Number'
                                                                    />
                                                                    <span className="text-danger">{error.Phone}</span>
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="Email">Email ID <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="Email"
                                                                        className="form-control form-control-lg"
                                                                        id="Email"
                                                                        name="Email"
                                                                        value={value.Email}
                                                                        onChange={onhandleChange}
                                                                        placeholder="Enter Email ID"
                                                                    />
                                                                    {error.Email && (
                                                                        <span className="text-danger">{error.Email}</span>
                                                                    )}
                                                                </div>

                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="business">Business </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="business"
                                                                        name="business"
                                                                        value={value.business}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter business'
                                                                    />
                                                                    {<span className="text-danger">{error.business}</span>}
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="CompanyName">Company Name </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="CompanyName"
                                                                        name="CompanyName"
                                                                        value={value.CompanyName}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter CompanyName'
                                                                    />
                                                                    {<span className="text-danger">{error.CompanyName}</span>}
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="Designation">Designation </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="Designation"
                                                                        name="Designation"
                                                                        value={value.Designation}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter Designation'
                                                                    />
                                                                    {<span className="text-danger">{error.Designation}</span>}
                                                                </div>
                                                                <div class="form-group col-lg-8">
                                                                    <label for="exampleTextarea1">Discussion</label>
                                                                    <textarea class="form-control" id="exampleTextarea1" name='Remark' value={value.Remark} placeholder="Topic Descuss*" onChange={onhandleChange}></textarea>
                                                                    {<span className='text-danger'> {error.Remark} </span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            {/* Training Programme Section */}
                                                            <div>
                                                                <h4 className="card-title titleback">Training Programme & Batch Details</h4>
                                                            </div>
                                                            <div className='row'>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="exampleFormControlSelect1">
                                                                        Course Name <span className="text-danger">*</span>
                                                                    </label>
                                                                    <select
                                                                        className="form-control form-control-lg"
                                                                        id="exampleFormControlSelect1"
                                                                        name="Course_Id"
                                                                        value={value.Course_Id}
                                                                        onChange={onhandleChange}
                                                                    >
                                                                        <option value="">--Select Course--</option>
                                                                        {course.map((course) => (
                                                                            <option key={course.Course_Id} value={course.Course_Id}>
                                                                                {course.Course_Name}
                                                                            </option>
                                                                        ))}
                                                                    </select>


                                                                    {error.Course_Id && (
                                                                        <span className="text-danger">{error.Course_Id}</span>
                                                                    )}
                                                                </div>

                                                                <div className='form-group col-4'>
                                                                    <label htmlFor="exampleInputUsername1">Date of Inquiry<span className="text-danger">*</span></label>
                                                                    <input type="date" className="form-control" id="exampleInputUsername1" value={value.Idate} placeholder="Date" name='Idate' onChange={onhandleChange} />
                                                                    <span className="text-danger"> {error.Idate} </span>
                                                                </div>
                                                            </div>

                                                            {/* Address Section */}
                                                            <div className='mt-4'>
                                                                <h4 className="card-title titleback">Address Details</h4>
                                                            </div>
                                                            <div className='row'>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="State">State</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="State"
                                                                        name="State"
                                                                        value={value.State}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter State'
                                                                    />
                                                                    {<span className="text-danger">{error.State}</span>}
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="Pin">Pin</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="Pin"
                                                                        name="Pin"
                                                                        value={value.Pin}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter Pin'
                                                                    />
                                                                    {<span className="text-danger">{error.Pin}</span>}
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="City">City</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="City"
                                                                        name="City"
                                                                        value={value.City}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter City'
                                                                    />
                                                                    {<span className="text-danger">{error.City}</span>}
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="Place">Place </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="Place"
                                                                        name="Place"
                                                                        value={value.Place}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter Place'
                                                                    />
                                                                    {<span className="text-danger">{error.Place}</span>}
                                                                </div>
                                                                <div className="form-group col-lg-4">
                                                                    <label htmlFor="Country">Country</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        id="Country"
                                                                        name="Country"
                                                                        value={value.Country}
                                                                        onChange={onhandleChange}
                                                                        placeholder='Enter Country'
                                                                    />
                                                                    {<span className="text-danger">{error.Country}</span>}
                                                                </div>
                                                                <div class="form-group col-lg-8">
                                                                    <label for="Address">Address</label>
                                                                    <textarea class="form-control" id="Address" name='Address' value={value.Address} placeholder="Enter Address" onChange={onhandleChange}></textarea>
                                                                    {<span className='text-danger'> {error.Address} </span>}
                                                                </div>

                                                                {/* Add more Address fields as needed */}
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>


                                            <div className='row p-2 justify-content-end'>
                                                <button className='mr-2 btn btn-primary' style={{ float: "right" }} onClick={handleSubmit} >Save</button>
                                                {/* <button className='col-2'>close</button> */}
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

export default InquiryCorporateAdd


