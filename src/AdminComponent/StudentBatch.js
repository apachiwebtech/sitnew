import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import BlankAttendance from "./Document/Blank_Attendance";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import StudentRecordDoc from "./Document/StudentRecordDoc";
import LecturePlanDoc from "./Document/LecturePlanDoc";
import AssignmentReceiptDoc from "./Document/AssignmentReceiptDoc";
import LectureTakenDoc from "./Document/LectureTakenDoc";
import SessionPlanDoc from "./Document/SessionPlanDoc";
import StandardLecturePlanDoc from "./Document/StandardLecturePlanDoc";
import StudentLabelDoc from "./Document/StudentLabelDoc";
import StudyMaterialDoc from "./Document/StudyMaterialDoc";
import TestTakenDoc from "./Document/TestTakenDoc";
import TimeSheetDoc from "./Document/TimeSheetDoc";
import ID_CardDoc from "./Document/ID_CardDoc";
import AssignmentDoc from "./Document/AssignmentDoc";
import Forcardlist from "./Document/Forcardlist";

const StudentBatch = () => {
    const [uid, setUid] = useState([]);
    const [error, setError] = useState({});
    const [category, setCat] = useState("");
    const [course, setCourse] = useState([]);
    const [batch, setBatch] = useState([]);

    const [value, setValue] = useState({
        course: "" || uid.course,
        batch: "" || uid.batch,
        // category: "" || uid.category
    });

    useEffect(() => {
        setValue({
            training: uid.training,
            attendee: uid.attendee,
            // category: uid.category
        });
    }, [uid]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!value.course) {
            isValid = false;
            newErrors.course = "Course is Required";
        }
        if (!value.batch) {
            isValid = false;
            newErrors.batch = "Batch is Required";
        }
        setError(newErrors);
        return isValid;
    };

    async function getCourseData() {
        axios
            .get(`${BASE_URL}/getCourse`)
            .then((res) => {
                setCourse(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getCourseData();
        value.title = "";
        setError({});
        setUid([]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                course: value.course,
                batch: value.batch,
                // category: value.category,
                uid: uid.id,
            };
            console.log("onSubmit");
            console.log(category);

            generatePdf();

            // axios
            //     .post(`${BASE_URL}/add_studentbatch`, data)
            //     .then((res) => {
            //         console.log(res);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }
    };

    const generatePdf = () => {
        switch (category) {
            case "0102":
                studentNamePdf();
                break;
            case "0104":
                lecturePlanPdf();
                break;
            case "0105":
                studyMaterialPdf();
                break;
            case "0106":
                standardLecturePlanPdf();
                break;
            case "0107":
                sessionPlanPdf();
                break;
            case "0108":
                timeSheetPdf();
                break;
            case "0109":
                lectureTakenPdf();
                break;
            case "Blank_Attend":
                blankAttendancePdf();
                break;
            case "0113":
                assignmentReceiptPdf();
                break;
            case "0114":
                testTakenPdf();
                break;
            case "0118":
                studentLabelPdf();
                break;
            case "0116":
                Studentidcard();
                break;
            case "0103":
                assignmentpdf();
                break;
            case "0111":
                viva_mocpdf();
                break;   
            case "0117":
                newlecturemailpdf();
                break;    
                
        }
    };

    const studentNamePdf = async () => {
        const res = await axios.post(`${BASE_URL}/getStudentAllInformation`, {batch_code: value.batch});
        const blob = await pdf(<StudentRecordDoc studentAllInfo = {res.data}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const lecturePlanPdf = async () => {
        const blob = await pdf(<LecturePlanDoc />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const studyMaterialPdf = async () => {
        const res = await axios.post(`${BASE_URL}/getidStudent`, { batch_code: value.batch });
        const blob = await pdf(<StudyMaterialDoc studymaterial = {res.data}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const standardLecturePlanPdf = async () => {
        const blob = await pdf(<StandardLecturePlanDoc />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const sessionPlanPdf = async () => {
        const blob = await pdf(<SessionPlanDoc />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const timeSheetPdf = async () => {
        const res = await axios.post(`${BASE_URL}/getidStudent`, { batch_code: value.batch });
        const blob = await pdf(<TimeSheetDoc timedata = {res.data}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const lectureTakenPdf = async () => {
        const blob = await pdf(<LectureTakenDoc />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const blankAttendancePdf = async () => {
        const res = await axios.post(`${BASE_URL}/getattendStudent`, { batch_code: value.batch });

        const data = [{ batchid: value.batch, students: res.data }];

        const blob = await pdf(<BlankAttendance data={data} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const assignmentReceiptPdf = async () => {
        const res = await axios.post(`${BASE_URL}/getassignmentreceipt`, { batch_code: value.batch});
        const blob = await pdf(<AssignmentReceiptDoc assignment={res.data.data}/>).toBlob();

        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const assignmentpdf = async () => {
        const blob = await pdf(<AssignmentDoc/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const newlecturemailpdf = async () => {
        const blob = await pdf().toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const testTakenPdf = async () => {
        const res = await axios.post(`${BASE_URL}/testtakenpdf`, {batch_code: value.batch});
        const blob = await pdf(<TestTakenDoc student_marks = {res.data}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const viva_mocpdf = async () => {
       
        const blob = await pdf(<viva_moc/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const studentLabelPdf = async () => {
        const res = await axios.post(`${BASE_URL}/getidStudent`, {batch_code: value.batch});
        const blob = await pdf(<StudentLabelDoc studentLabel = {res.data}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };
    // example
    const Studentidcard = async () => {

        const res = await axios.post(`${BASE_URL}/getidStudent`, { batch_code: value.batch });        
        const blob = await pdf(<ID_CardDoc student={res.data} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleradiochange = (e) => {
        setCat(e.target.value);
    };

    async function downloadPDF(id) {
        axios.post(`${BASE_URL}/getattendStudent`, { batch_code: value.batch }).then((res) => {
            Blob([{ batchid: value.batch, students: res.data }]);
        });
    }

    const Blob = async (data) => {
        const blob = await pdf(<BlankAttendance data={data} />).toBlob();
        const url = URL.createObjectURL(blob);

        window.open(url);
        URL.revokeObjectURL(url);
    };


    // for testing
    

    const handlegetbatch = async (courseid) => {
        setValue({
            course: courseid,
        });

        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, { courseid: courseid });
            
            
            setBatch(res.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    // when you select specific radio button than only the component will be shown
    
        const [selectedValue, setSelectedValue] = useState("");
      
        // const handleRadioChange = (event) => {
        //   setSelectedValue(event.target.value);  
        // };

    return (
        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Student Batch Wise</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="row">
                                            <div class="from-group col-lg-12">
                                                <FormControl>
                                                <RadioGroup
  row
  value={selectedValue}
  onChange={(e) => {
    setSelectedValue(e.target.value);
    handleradiochange(e);
  }}
  aria-labelledby="demo-row-radio-buttons-group-label"
  name="row-radio-buttons-group"
>

                                                        <FormControlLabel
                                                            value="0102"
                                                            control={<Radio />}
                                                            label="Student Name"
                                                        />
                                                        <FormControlLabel
                                                            value="0103"
                                                            control={<Radio />}
                                                            label="Assignment"
                                                        />
                                                        <FormControlLabel
                                                            value="0104"
                                                            control={<Radio />}
                                                            label="Lecture Plan"
                                                        />
                                                        <FormControlLabel
                                                            value="0105"
                                                            control={<Radio />}
                                                            label="Study Material"
                                                        />
                                                        <FormControlLabel
                                                            value="0106"
                                                            control={<Radio />}
                                                            label="Standard Lecture Plan"
                                                        />
                                                        <FormControlLabel
                                                            value="0107"
                                                            control={<Radio />}
                                                            label="Session Plan"
                                                        />
                                                        <FormControlLabel
                                                            value="0108"
                                                            control={<Radio />}
                                                            label="Time Sheet"
                                                        />
                                                        <FormControlLabel
                                                            value="0109"
                                                            control={<Radio />}
                                                            label="Lecture Taken"
                                                        />
                                                        <FormControlLabel
                                                            value="0110"
                                                            control={<Radio />}
                                                            label="Acomodation"
                                                        />
                                                        <FormControlLabel
                                                            value="0111"
                                                            control={<Radio />}
                                                            label="Viva/MOC"
                                                        />
                                                        <FormControlLabel
                                                            value="Blank_Attend"
                                                            control={<Radio />}
                                                            label="Blank Attendance"
                                                        />
                                                        <FormControlLabel
                                                            value="0113"
                                                            control={<Radio />}
                                                            label="Assignment Receipt"
                                                        />
                                                       
                                                        <FormControlLabel
                                                            value="0114"
                                                            control={<Radio />}
                                                            label="Test Taken"
                                                        />
                                                        <FormControlLabel
                                                            value="0115"
                                                            control={<Radio />}
                                                            label="Analysis"
                                                        />
                                                        <FormControlLabel
                                                            value="0116"
                                                            control={<Radio />}
                                                            label="ID Card"
                                                        />
                                                        <FormControlLabel
                                                            value="0117"
                                                            control={<Radio />}
                                                            label="New Lecture Mail"
                                                        />
                                                        <FormControlLabel
                                                            value="0118"
                                                            control={<Radio />}
                                                            label="Student Label"
                                                        />
                                                        {/* for testing  */}
                                                        
                                                    </RadioGroup>
                                                </FormControl>

                                                {/* <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                    <RadioGroup
                                                      onChange={handleradiochange}
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                    </RadioGroup>
                                                </FormControl> */}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">
                                                    Select Course<span className="text-danger">*</span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    onChange={(e) => handlegetbatch(e.target.value)}
                                                    name="course"
                                                >
                                                    <option>Select Course</option>
                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.course} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">
                                                    Select Batch<span className="text-danger">*</span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    onChange={onhandleChange}
                                                    name="batch"
                                                >
                                                    <option>Select Batch</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batch} </span>}
                                            </div>
                                            {/* select button is added */}
                                            {selectedValue === "0114" && (
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">
                                                    Select Test<span className="text-danger">*</span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    onChange={onhandleChange}
                                                    name="batch"
                                                >
                                                    <option>Select Test</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batch} </span>}
                                            </div>
                                            )}
                                            {selectedValue === "0103" && (
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">
                                                    Select Assignment<span className="text-danger">*</span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    onChange={onhandleChange}
                                                    name="batch"
                                                >
                                                    <option>Select Assignment</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batch} </span>}
                                            </div>
                                            )}
                                            {selectedValue === "0109" && (
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">
                                                    Select Date<span className="text-danger">*</span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    onChange={onhandleChange}
                                                    name="batch"
                                                >
                                                    <option>Select Date</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batch} </span>}
                                            </div>
                                            )}

                                            {selectedValue === "0111" && (
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">
                                                    Select Viva<span className="text-danger">*</span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    onChange={onhandleChange}
                                                    name="batch"
                                                >
                                                    <option>Select Viva</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batch} </span>}
                                            </div>
                                            )}
                                            {selectedValue === "0117" && (
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">
                                                    Select Data<span className="text-danger">*</span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    onChange={onhandleChange}
                                                    name="batch"
                                                >
                                                    <option>Select Data</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batch} </span>}
                                            </div>
                                            )}
                                            
                                        </div>
                                                

                                        <button
                                            type="submit"
                                            class="btn btn-primary mr-2"
                                            // onClick={() => downloadPDF(1)}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                            class="btn btn-light"
                                        >
                                            Cancel
                                        </button>
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

export default StudentBatch;
