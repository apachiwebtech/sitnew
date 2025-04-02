import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
//import FormControlLabel from '@mui/material/FormControlLabel';
import { MultiSelect } from "react-multi-select-component";

const IndustryOptions = [
    { label: "Oil and Gas", value: "Oil and Gas" },
    { label: "Water", value: "Water" },
    { label: "Chemical", value: "Chemical" },
    { label: "Food/Sugar", value: "Food/Sugar" },
    { label: "Pharma", value: "Pharma" },
    { label: "Construction and Infrastucture", value: "Construction and Infrastucture" },
    { label: "Engineering", value: "Engineering" },
    { label: "Other", value: "Other" },
];

const courseName = {
    Course_Id1: "CourseName1",
    Course_Id2: "CourseName2",
    Course_Id3: "CourseName3",
    Course_Id4: "CourseName4",
    Course_Id5: "CourseName5",
    Course_Id6: "CourseName6",
};

const AddConsultancyMaster = () => {
    const [brand, setBrand] = useState([]);
    const [vendordata, setVendorData] = useState([]);
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [errors, setErrors] = useState({});
    const [options, setOptions] = useState(IndustryOptions);
    const [selected, setSelected] = useState([]);
    const { addconsultancymasterid } = useParams();
    const [category, setCat] = useState("");
    const [annualbatch, setAnnulBatch] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const { consultancymasterid } = useParams();

    const [courses, setCourses] = useState({
        Course_Id1: null,
        CourseName1: "",
        Course_Id2: null,
        CourseName2: "",
        Course_Id3: null,
        CourseName3: "",
        Course_Id4: null,
        CourseName4: "",
        Course_Id5: null,
        CourseName5: "",
        Course_Id6: null,
        CourseName6: "",
    });

    const [value, setValue] = useState({
        Comp_Name: "",
        Contact_Person: "",
        Designation: "",
        Address: "",
        City: "",
        State: "",
        Pin: "",
        Country: "",
        Tel: "",
        Fax: "",
        EMail: "",
        Remark: "",
        Date_Added: "",
        Purpose: "",
        IsActive: 1,
        IsDelete: 0,
        Company_Status: "",
        Website: "",
        Mobile: "",
        Mention_Date: "",
        Industry: "",
        CreatedBy: null,
    });

    useEffect(() => {
        getCourseData();
    }, []);

    useEffect(() => {
        const constultancyId = parseInt(consultancymasterid);
        if (!isNaN(constultancyId)) {
            setIsEdit(true);
            const getConsultancyById = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/consultancy/${constultancyId}`);
                    if (response.data) {
                        const {
                            Course_Id1,
                            CourseName1,
                            Course_Id2,
                            CourseName2,
                            Course_Id3,
                            CourseName3,
                            Course_Id4,
                            CourseName4,
                            Course_Id5,
                            CourseName5,
                            Course_Id6,
                            CourseName6,
                            Industry,
                            ...rest
                        } = response.data;
                        setCourses({
                            Course_Id1,
                            CourseName1,
                            Course_Id2,
                            CourseName2,
                            Course_Id3,
                            CourseName3,
                            Course_Id4,
                            CourseName4,
                            Course_Id5,
                            CourseName5,
                            Course_Id6,
                            CourseName6,
                        });
                        setValue({ ...rest });
                        const selInd = Industry ? Industry.split(",").map((ind) => ({ label: ind, value: ind })) : [];
                        setSelected(selInd);
                    }
                } catch (err) {
                    console.log("Error fetching consultancy with Id", constultancyId);
                    console.log(err);
                    alert("Error fetching consultancy details");
                    navigate("/consultancymaster");
                }
            };
            getConsultancyById();
        }
    }, [consultancymasterid]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!value.Comp_Name) {
            newErrors.Comp_Name = "consultancy name is required";
            isValid = false;
        }

        if (!value.Address) {
            newErrors.Address = "address is required";
            isValid = false;
        }

        if (!value.Pin) {
            newErrors.Pin = "pincode is required";
        }

        setErrors(newErrors);
        setTimeout(() => {
            setErrors("");
        }, 5000);
        return isValid;
    };

    async function getCourseData() {
        axios
            .get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data);
                setCourseData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const industriesString = selectedIndustriesString();

                const finalData = { ...value, ...courses, Industry: industriesString };

                let response;
                if (!isEdit) {
                    response = await axios.post(`${BASE_URL}/addConsultancy`, finalData);
                } else {
                    response = await axios.put(`${BASE_URL}/updateConsultancy/${consultancymasterid}`, finalData);
                }

                alert(response.data.message);
                navigate("/consultancymaster"); // Redirect after adding data
            } catch (error) {
                alert("Error adding/updating data");
                console.log("Error adding/updating data:", error);
            }
        }
    };

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCourseSelect = (e) => {
        if (e.target.value) {
            setCourses((prev) => ({
                ...prev,
                [e.target.name]: parseInt(e.target.value),
                [courseName[e.target.name]]: e.target.options[e.target.selectedIndex].textContent,
            }));
        } else {
            setCourses((prev) => ({
                ...prev,
                [e.target.name]: null,
                [courseName[e.target.name]]: "",
            }));
        }
    };

    const selectedIndustriesString = () => {
        return selected.map((ind) => ind.value).join(",");
    };

    return (
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="d-flex">
                            <div className="px-2 mx-2">
                                <Link to={`/consultancymaster/${consultancymasterid}`}>
                                    <h4>Consultancy Details</h4>
                                </Link>
                            </div>
                            <div className="px-2 mx-2">
                                <Link to={`/consstudentdetails?Const_Id=${consultancymasterid}`}>
                                    <h4>Student Details</h4>
                                </Link>
                            </div>
                            {isEdit && (
                                <>
                                    <div className="px-2 mx-2">
                                        <Link to={`/consultancybranches?Const_Id=${consultancymasterid}`}>
                                            <h4>Branches</h4>
                                        </Link>
                                    </div>
                                    <div className="px-2 mx-2">
                                        <Link to={`/consultancyfollowup?Const_Id=${consultancymasterid}`}>
                                            <h4>Follow Up</h4>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add Consultancy Master</h4>

                                    <hr></hr>
                                    <form className="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6" style={{ borderRight: "1px solid lightgrey" }}>
                                                <div className="row">
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">
                                                            Consultancy<span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.Comp_Name}
                                                            placeholder="Consultancy "
                                                            name="Comp_Name"
                                                            onChange={onhandleChange}
                                                        />
                                                        {errors.Comp_Name && (
                                                            <span className="text-danger"> {errors.Comp_Name} </span>
                                                        )}
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Designation </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputUsername"
                                                            value={value.Designation}
                                                            placeholder="Designation "
                                                            name="Designation"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.City}
                                                            placeholder="City"
                                                            name="City"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">State</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputUsername"
                                                            value={value.State}
                                                            placeholder="State"
                                                            name="State"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Phone</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.Tel}
                                                            placeholder="Phone"
                                                            name="Tel"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Fax</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.Fax}
                                                            placeholder="Fax"
                                                            name="Fax"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exqmpleInputUsername1">Mobile Nu.</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.Mobile}
                                                            placeholder="Mobile Nu."
                                                            name="Mobile"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.Mention_Date}
                                                            name="Mention_Date"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleFormControlSelect1">Industry</label>
                                                        <MultiSelect
                                                            options={options}
                                                            value={selected}
                                                            id="exampleFormControlSelect1"
                                                            onChange={setSelected}
                                                            labelledBy="All Select"
                                                            name="selected"
                                                        ></MultiSelect>
                                                    </div>

                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleTextarea1">Comment </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="exampleTextarea1"
                                                            value={value.Remark}
                                                            placeholder="Comment"
                                                            name="Remark"
                                                            onChange={onhandleChange}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="row">
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Contact Person </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.Contact_Person}
                                                            placeholder="Contact Person"
                                                            name="Contact_Person"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleTextarea1">
                                                            Address <span className="text-danger">*</span>{" "}
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="exampleTextarea1"
                                                            value={value.Address}
                                                            placeholder="Address "
                                                            name="Address"
                                                            onChange={onhandleChange}
                                                        ></textarea>
                                                        {errors.Address && (
                                                            <span className="text-danger"> {errors.Address} </span>
                                                        )}
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exqmpleInputUsername1">
                                                            Pin Code <span className="text-danger">*</span>{" "}
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.Pin}
                                                            placeholder="Pin Code"
                                                            name="Pin"
                                                            onChange={onhandleChange}
                                                        />
                                                        {errors.Pin && (
                                                            <span className="text-danger"> {errors.Pin} </span>
                                                        )}
                                                    </div>

                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Country</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.Country}
                                                            placeholder="Country"
                                                            name="Country"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">E-mail</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.EMail}
                                                            placeholder="E-mail"
                                                            name="EMail"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleFormControlSelect1">Purpose</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={value.Purpose}
                                                            name="Purpose"
                                                            onChange={onhandleChange}
                                                        >
                                                            <option value="">--Select Purpose--</option>
                                                            <option>Meeting</option>
                                                            <option>Placements</option>
                                                            <option>Training</option>
                                                            <option>Project</option>
                                                            <option>Others</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Website</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.Website}
                                                            placeholder="Website"
                                                            name="Website"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleFromControlSelect1">Status</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={value.Company_Status}
                                                            name="Company_Status"
                                                            onChange={onhandleChange}
                                                        >
                                                            <option value="">--Select--</option>
                                                            <option>Active</option>
                                                            <option>Deactive</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleFromControlSlect1">Course 1</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={
                                                                courses.Course_Id1 !== null ? courses.Course_Id1 : ""
                                                            }
                                                            name="Course_Id1"
                                                            onChange={handleCourseSelect}
                                                        >
                                                            <option value="">--Select Course 1--</option>
                                                            {courseData.map((item) => {
                                                                return (
                                                                    <option key={item.Course_Id} value={item.Course_Id}>
                                                                        {item.Course_Name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleFromControlSlect1">Course 2</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={
                                                                courses.Course_Id2 !== null ? courses.Course_Id2 : ""
                                                            }
                                                            name="Course_Id2"
                                                            onChange={handleCourseSelect}
                                                        >
                                                            <option value="">--Select Course 2--</option>
                                                            {courseData.map((item) => {
                                                                return (
                                                                    <option key={item.Course_Id} value={item.Course_Id}>
                                                                        {item.Course_Name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleFromControlSlect1">Course 3</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={
                                                                courses.Course_Id3 !== null ? courses.Course_Id3 : ""
                                                            }
                                                            name="Course_Id3"
                                                            onChange={handleCourseSelect}
                                                        >
                                                            <option value="">--Select Course 3--</option>
                                                            {courseData.map((item) => {
                                                                return (
                                                                    <option key={item.Course_Id} value={item.Course_Id}>
                                                                        {item.Course_Name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleFromControlSlect1">Course 4</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={
                                                                courses.Course_Id4 !== null ? courses.Course_Id4 : ""
                                                            }
                                                            name="Course_Id4"
                                                            onChange={handleCourseSelect}
                                                        >
                                                            <option value="">--Select Course 4--</option>
                                                            {courseData.map((item) => {
                                                                return (
                                                                    <option key={item.Course_Id} value={item.Course_Id}>
                                                                        {item.Course_Name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleFromControlSlect1">Course 5</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={
                                                                courses.Course_Id5 !== null ? courses.Course_Id5 : ""
                                                            }
                                                            name="Course_Id5"
                                                            onChange={handleCourseSelect}
                                                        >
                                                            <option value="">--Select Course 5--</option>
                                                            {courseData.map((item) => {
                                                                return (
                                                                    <option key={item.Course_Id} value={item.Course_Id}>
                                                                        {item.Course_Name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-lg-6">
                                                        <label for="exampleFromControlSlect1">Course 6</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={
                                                                courses.Course_Id6 !== null ? courses.Course_Id6 : ""
                                                            }
                                                            name="Course_Id6"
                                                            onChange={handleCourseSelect}
                                                        >
                                                            <option value="">--Select Course 6--</option>
                                                            {courseData.map((item) => {
                                                                return (
                                                                    <option key={item.Course_Id} value={item.Course_Id}>
                                                                        {item.Course_Name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row p-2 gap-2">
                                            <button className="mr-2 btn btn-primary" type="submit">
                                                Submit
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-light"
                                                onClick={() => navigate("/consultancymasterlisting")}
                                            >
                                                Cancel
                                            </button>
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

export default AddConsultancyMaster;
