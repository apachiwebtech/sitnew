import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import OnlineAdmissionForm from "./OnlineAdmissionForm";
import img from "../assets/pass.jpg";
import Admissionform from "./Admissionform";
import InnerHeaderForm from "./InnerHeaderForm";

const StudentPersonalInfo = () => {
    const [course, setCourse] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [batch, setBatch] = useState([]);
    const [status, setStatus] = useState([]);
    const [photo, setPhoto] = useState("");
    const location = useLocation();
    const [personalInfo, setPersonalInfo] = useState({
        studentName: "",
        Student_Id: "",
        Email: "",
        Batch_Code: "",
        gender: "",
        nationality: "",
        dob: "",
        password: "",
        reference: "",
        presentaddress: "",
        presentPincode: "",
        presentCity: "",
        state: "",
        presentCountry: "",
        mobile: "",
        whatsapp: "",
        course: "",
        category: "",
        Referby: "",
        admission_dt: "",
        prestatus: "",
        changestatus: "",
        prestatusdate: "",
        date: "",
        permanentAdress: "",
        permanentPincode: "",
        permanentCity: "",
        permanentState: "",
        permanentCountry: "",
        familymobile: "",
        perWatsapp: "",
        sdate: "",
        edate: "",
        Student_Code: "",
        permanentemail : ""
    });
    const { admissionid } = useParams();

    const getCourse = async () => {
        const response = await fetch(`${BASE_URL}/getCourses`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setCourse(data);
    };
    const getBtachCategory = async () => {
        const response = await fetch(`${BASE_URL}/getBtachCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setbatchCategory(data);
    };

    async function getStatus() {
        axios.get(`${BASE_URL}/getstatus`).then((res) => {
            setStatus(res.data);
        });
    }
    async function getdocument() {
        const data = {
            student_id: localStorage.getItem(`Admissionid`),
        };

        axios.post(`${BASE_URL}/getdocuments`, data).then((res) => {
            if (res.data && res.data[0]) {
                setPhoto(res.data[0].upload_image);
            }
        });
    }

    useEffect(() => {
        getdocument();
        getStatus();
        getCourse();
        getBtachCategory();
        localStorage.setItem("Admissionid", admissionid);
    }, [admissionid]);

    const getPersonalData = async () => {
        const response = await fetch(`${BASE_URL}/getPersonal`, {
            method: "POST",
            body: JSON.stringify({
                admissionid: localStorage.getItem(`Admissionid`),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        setBatch(data.batchdata);

        
        setPersonalInfo((prevState) => ({
            ...prevState,
            Batch_Code: data.data[0].Batch_Code,
            studentName: data.data[0].Student_Name,
            Student_Id: data.data[0].Student_Id,
            permanentemail: data.data[0].Email,
            gender: data.data[0].Sex,
            nationality: data.data[0].Nationality,
            dob: data.data[0].DOB,
            reference: data.data[0].Refered_By,
            presentaddress: data.data[0].Present_Address,
            presentPincode: data.data[0].Present_Pin,
            presentCity: data.data[0].Present_City,
            state: data.data[0].Present_State,
            presentCountry: data.data[0].Present_Country,
            mobile: data.data[0].Present_Mobile,
            whatsapp: "",
            course: data.data[0].Course_Id,
            category: data.data[0].Batch_Category_id,
            Referby: data.data[0].Refered_By,
            admission_dt: data.data[0].Admission_Dt,
            prestatus: data.data[0].Status,
            changestatus: data.data[0].Status_id,
            date: data.data[0].Status_date,
            prestatusdate: data.data[0].StateChangeDt,
            permanentAdress: data.data[0].Permanent_Address,
            permanentPincode: data.data[0].Permanent_Pin,
            permanentCity: data.data[0].Permanent_City,
            permanentState: data.data[0].Permanent_State,
            permanentCountry: data.data[0].Permanent_Country,
            familymobile: data.data[0].Father_Mobile,
            perWatsapp: "",
            sdate: data.data[0].SDate,
            edate: data.data[0].Edate,
            online_stud_id: data.data[0].online_stud_id,
            Inquiry_Type: data.data[0].Inquiry_Type,
            Student_Code: data.data[0].Student_Code,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if(validateForm()){

        const response = await fetch(`${BASE_URL}/updateStudent`, {
            method: "POST",
            body: JSON.stringify({
                Student_Id: localStorage.getItem(`Admissionid`),
                studentName: personalInfo.studentName,
                permanentemail: personalInfo.permanentemail,
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
                familymobile: personalInfo.familymobile,
                perWatsapp: personalInfo.perWatsapp,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        alert("Updated Successfully");

        // }
    };
    useEffect(() => {
        getPersonalData();
    }, []);

    const navigate = useNavigate();

    const handleadmission = (id) => {
        let confirm = window.confirm("Are you sure want to proceed ");

        if (confirm) {
            navigate(`/admission/${id}`);
        }
    };
    const dobToPassword = (dob) => {
        const splitArr = dob.split("-");
        return `${splitArr[2]}${splitArr[1]}${splitArr[0].slice(-2)}`;
    };

    return (
        <div className="container-fluid page-body-wrapper">
            <InnerHeaderForm />

            <div className="main-panel">
                <div className="content-wrapper">
                    <Admissionform admissionid={admissionid} />

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">
                                <div className="container-fluid">
                                    <form onSubmit={handleSubmit} className="row d-flex justify-content-between">
                                        <div className="col-md-5 col-lg-5">
                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Student Details : </h4>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">
                                                                B.M. ID<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.Student_Id}
                                                                placeholder="Id*"
                                                                name="Student_Id"
                                                                onChange={handleChange}
                                                                disabled
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-8">
                                                            <label for="exampleInputUsername1">
                                                                Name<span className="text-danger">*</span> <b>ID:</b> <span>{personalInfo.Student_Code}</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.studentName}
                                                                placeholder="Name*"
                                                                name="studentName"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Gender</label>
                                                            <select
                                                                className="form-control form-control-lg"
                                                                id="exampleFormControlSelect1"
                                                                value={personalInfo.gender}
                                                                name="gender"
                                                                onChange={handleChange}
                                                            >
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">
                                                                Nationality<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.nationality}
                                                                placeholder="nationality*"
                                                                name="nationality"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Date Of Birth</label>
                                                            <input
                                                                type="date"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.dob}
                                                                placeholder="Contact Person"
                                                                name="dob"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">
                                                                Password<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={
                                                                    personalInfo.dob
                                                                        ? dobToPassword(personalInfo.dob)
                                                                        : ""
                                                                }
                                                                placeholder="Name*"
                                                                name="password"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">
                                                                Email
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.permanentemail}
                                                                placeholder="Name*"
                                                                name="permanentemail"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Batch Details</label>
                                                            <div className = 'border p-2 w-100'>
                                                                {batch.map((item) => {
                                                                    return (
                                                                        <div key={item.id}>
                                                                            <p>
                                                                                {item.Batch_code}
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>

                                                        <div className="form-group col-lg-12 ">
                                                            <label for="exampleInputUsername1">
                                                                How they come to know about SIT
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.Inquiry_Type}
                                                                placeholder="Name*"
                                                                name="reference"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h4 className="card-title titleback">Present Address : </h4>
                                                    </div>

                                                    <div className="row">
                                                        <div className="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Address </label>
                                                            <textarea
                                                                className="form-control"
                                                                id="exampleTextarea1"
                                                                value={personalInfo.presentaddress}
                                                                placeholder="presentAdress"
                                                                name="presentaddress"
                                                                onChange={handleChange}
                                                            ></textarea>
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">
                                                                Pincode<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.presentPincode}
                                                                placeholder="Name*"
                                                                name="presentPincode"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">
                                                                City<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.presentCity}
                                                                placeholder="Name*"
                                                                name="presentCity"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">
                                                                State<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.state}
                                                                placeholder="Name*"
                                                                name="state"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">
                                                                Country<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.presentCountry}
                                                                placeholder="Name*"
                                                                name="presentCountry"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-3">
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.mobile}
                                                                placeholder="Number"
                                                                name="mobile"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        {/* <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Whatsapp Number</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.whatsapp} placeholder="Number" name='whatsapp' onChange={handleChange} />
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row p-2 gap-2">
                                                <button type="submit" className="mr-2 btn btn-primary">
                                                    Save
                                                </button>
                                                <Link to="/onlineadmission" className="mr-2 btn btn-secondary">
                                                    close
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-4">
                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">
                                                            Training Programme & Batch Detail
                                                        </h4>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">
                                                                Training Programme
                                                            </label>
                                                            <select
                                                                className="form-control form-control-lg"
                                                                id="exampleFormControlSelect1"
                                                                value={personalInfo.course}
                                                                name="course"
                                                                defaultValue={personalInfo.course}
                                                                onChange={handleChange}
                                                            >
                                                                {course.map((item) => {
                                                                    return (
                                                                        <option key={item.id} value={item.Course_Id}>
                                                                            {item.Course_Name}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Category</label>
                                                            <select
                                                                className="form-control form-control-lg"
                                                                id="exampleFormControlSelect1"
                                                                value={personalInfo.category}
                                                                name="category"
                                                                defaultValue={personalInfo.category}
                                                                onChange={handleChange}
                                                            >
                                                                {batchCategoty?.map((item) => {
                                                                    return (
                                                                        <option value={item.id}>
                                                                            {item.BatchCategory}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-5 ">
                                                            <label for="exampleInputUsername1">Refer</label>
                                                            <select
                                                                className="form-control form-control-lg"
                                                                id="exampleFormControlSelect1"
                                                                value={personalInfo.Referby}
                                                                name="Referby"
                                                                onChange={handleChange}
                                                            >
                                                                <option value="advertise">Advertisement</option>
                                                                <option value="facebook">facebook</option>
                                                                <option value="google">Google</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">
                                                            Online Admission Details
                                                        </h4>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Online Admission Date </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.admission_dt}
                                                                placeholder="Contact Person"
                                                                name="admission_dt"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Status </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.prestatus}
                                                                placeholder="Contact Person"
                                                                name="prestatus"
                                                                disabled
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Date</label>

                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.prestatusdate}
                                                                placeholder="Contact Person"
                                                                name="prestatusdate"
                                                                disabled
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Status</label>
                                                            <select
                                                                className="form-control form-control-lg"
                                                                id="exampleFormControlSelect1"
                                                                value={personalInfo.changestatus}
                                                                onChange={handleChange}
                                                                defaultValue={personalInfo.changestatus}
                                                                name="changestatus"
                                                            >
                                                                {status.map((item) => {
                                                                    return (
                                                                        <option value={item.Id}>{item.Status}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Status Date</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.date}
                                                                placeholder="Contact Person"
                                                                name="date"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="pt-3">
                                                        <h4 className="card-title titleback">Permanent Address : </h4>
                                                    </div>

                                                    <div className="row">
                                                        <div className="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Address </label>
                                                            <textarea
                                                                className="form-control"
                                                                id="exampleTextarea1"
                                                                value={personalInfo.permanentAdress}
                                                                placeholder="permanentAdress"
                                                                name="permanentAdress"
                                                                onChange={handleChange}
                                                            ></textarea>
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">
                                                                Pincode<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.permanentPincode}
                                                                placeholder="Name*"
                                                                name="permanentPincode"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">
                                                                City<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.permanentCity}
                                                                placeholder="Name*"
                                                                name="permanentCity"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">
                                                                State<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.permanentState}
                                                                placeholder="Name*"
                                                                name="permanentState"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">
                                                                Countryd<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.permanentCountry}
                                                                placeholder="Name*"
                                                                name="permanentCountry"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="form-group col-3">
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={personalInfo.familymobile}
                                                                placeholder="Number"
                                                                name="familymobile"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        {/* <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Whatsapp Number</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.perWatsapp} placeholder="Number" name='perWatsapp' onChange={handleChange} />
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3">
                                            <div className="p-3">
                                                <div>
                                                    <h4 className="card-title titleback">Student Info</h4>
                                                </div>

                                                <div className="student-img text-center">
                                                    <img
                                                        style={{ width: "150px" }}
                                                        src={`${IMG_URL}/student_document/${admissionid}/${photo}`}
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="p-2">
                                                    <h4>Balance Fees : 00</h4>
                                                    <hr />
                                                    <h4>Assignment Avg : 00</h4>
                                                    <hr />
                                                    <h4>Unit Test Avg : 00</h4>
                                                    <hr />
                                                    <h4>Final Exam Marks : 00</h4>
                                                    <hr />
                                                    <h4>Attendance(%) : 00</h4>
                                                    <hr />
                                                    <h4>Final Total : 00</h4>
                                                    <hr />

                                                    <h4>Batch Details :</h4>
                                                    <div>
                                                        <p>
                                                            <b>Batch Start:</b>
                                                            &nbsp;{personalInfo.sdate}
                                                        </p>
                                                        <p>
                                                            <b>Batch End:</b>
                                                            &nbsp;{personalInfo.edate}
                                                        </p>
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
            </div>
        </div>
    );
};

export default StudentPersonalInfo;
