import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { useSearchParams } from "react-router-dom";

const ConsStudentDetails = () => {
    const [searchParams] = useSearchParams();
    const Const_Id = searchParams.get("Const_Id");
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { "aria-label": "Color switch demo" } };
    const [studentsList, setStudentsList] = useState([]);
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({
        firstname: "",
        gender: "",
        dob: "",
        mobile: "",
        whatsapp: "",
        email: "",
    });

    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getadmissionactivity`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        setInquiryData(data);
    };

    useEffect(() => {
        value.title = "";
        setError({});
        setUid([]);
    }, []);

    useEffect(() => {
        getConstStudentDetails();
    }, []);

    const getConstStudentDetails = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/getConsStudentDetails`, {
                Const_Id,
            });
            setStudentsList(response.data);
        } catch (err) {
            console.log("Error fetching consultancy Students details", err);
        }
    };

    const handleUpdate = (id) => {
        const data = {
            u_id: id,
            tablename: "awt_faculty",
        };
        axios
            .post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0]);

                console.log(res.data, "update");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "Student_Inquiry",
        };

        axios
            .post(`${BASE_URL}/delete_inquiry_data`, data)
            .then((res) => {
                getInquiryData();
            })
            .catch((err) => {
                console.log(err);
            });

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value == 0 ? 1 : 0;

        axios
            .post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "Student_Inquiry" })
            .then((res) => {
                console.log(res);
                getInquiryData();
            });
    };

    const rowsWithIds = inquiryData.map((row, index) => ({ index: index + 1, ...row }));

    return (
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div class="d-flex">
                            <div className="px-2 mx-2">
                                <Link to={`/consultancymaster/${Const_Id}`}>
                                    <h4>Consultancy Details</h4>
                                </Link>
                            </div>
                            <div className="px-2 mx-2">
                                <Link to={`/consstudentdetails?Const_Id=${Const_Id}`}>
                                    <h4>Student Details</h4>
                                </Link>
                            </div>
                            <div className="px-2 mx-2">
                                <Link to={`/consultancybranches?Const_Id=${Const_Id}`}>
                                    <h4>Branches</h4>
                                </Link>
                            </div>
                            <div className="px-2 mx-2">
                                <Link to={`/consultancyfollowup?Const_Id=${Const_Id}`}>
                                    <h4>Follow Up</h4>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div
                                        className="d-flex justify-content-between gap-3"
                                        style={{ width: "100%", padding: "10px 0" }}
                                    >
                                        <div>
                                            <h4 class="card-title"></h4>
                                        </div>
                                        <Link to="/consultancymaster/:consultancymasterid">
                                            {" "}
                                            <button className="btn btn-success">Add +</button>
                                        </Link>
                                    </div>

                                    <div className="table-responsive">
                                        <table class="table table-bordered table-gen">
                                            <thead>
                                                <tr>
                                                    <th>Student Name</th>
                                                    <th>Course Name</th>
                                                    <th>Batch Code</th>
                                                    <th>Year of Passing</th>
                                                    <th>Mobile</th>
                                                    <th>Email</th>
                                                    <th>Discipline</th>
                                                    <th>Placed Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentsList.map((student) => (
                                                    <tr key={student.Student_Id}>
                                                        <td>{student.Student_Name}</td>
                                                        <td>{student.Course_Name}</td>
                                                        <td>{student.Batch_Code}</td>
                                                        <td>{student.Year}</td>
                                                        <td>{student.Present_Mobile}</td>
                                                        <td>{student.Email}</td>
                                                        <td>{student.Discipline}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsStudentDetails;
