import { FormControl, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ToWords } from "to-words";
import Receipt from "./Receipt";
import { pdf } from "@react-pdf/renderer";

const AddFeesDetails = () => {
    const [page, setPage] = useState(1);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const studentRef = useRef(null);
    const [error, setError] = useState({});
    const { addfeesdetailsid } = useParams();
    const [courseList, setCourseList] = useState([]);
    const [batchList, setBatchList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [feesNotesList, setFeesNotesList] = useState([]);
    const [feesDetailsList, setFeesDetailsList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [FeesDetailsById, setFeesDetailsById] = useState({});

    const [formState, setFormState] = useState({
        Student_Name: "",
        Student_Id: "",
        Batch_code: "",
        Batch_Id: "",
        Course_Id: "",
        Present_Mobile: "",
        Email: "",
        TypeR: "C",
        Payment_Type: "",
        Bank_Id: "",
        Perticular_Id: "",
        Notes: "",
        Cheque_No: "",
        Cheque_Date: "",
        Cheque_Branch: "",
        Cheque_Bank: "",
        Amount: "",
        RDate: new Date().toISOString().split("T")[0],
        Due_Date: "",
    });

    const debit = feesDetailsList.reduce((acc, item) => {
        const value = item.TypeR === "D" ? item.Amount : 0;

        return value + acc;
    }, 0);

    const credit = feesDetailsList.reduce((acc, item) => {
        const value = item.TypeR === "C" ? item.Amount : 0;

        return value + acc;
    }, 0);

    const balance = debit - credit;

    // const validateForm = () => {
    //     let isValid = true;
    //     const newErrors = {};

    //     if (!value.batchcode) {
    //         isValid = false;
    //         newErrors.batchcode = "BatchCode is Required";
    //     }
    //     if (!value.type) {
    //         isValid = false;
    //         newErrors.type = "Type is Required";
    //     }
    //     if (!value.bank) {
    //         isValid = false;
    //         newErrors.bank = "Bank is Required";
    //     }
    //     if (!value.chequeddno) {
    //         isValid = false;
    //         newErrors.chequeddno = "Cheque/D.D.No is Required";
    //     }
    //     if (!value.date) {
    //         isValid = false;
    //         newErrors.date = "Receipt Date is Required";
    //     }

    //     setError(newErrors);
    //     return isValid;
    // };

    async function getCourse() {
        const data = {
            tablename: "Course_Mst",
            columnname: "Course_Id,Course_Name",
        };

        axios.post(`${BASE_URL}/get_new_data`, data).then((res) => {
            setCourseList(res.data);
        });
    }

    useEffect(() => {
        const Fees_Id = parseInt(addfeesdetailsid);

        if (!isNaN(Fees_Id)) {
            setIsEdit(true);
            getFeesDetailsById(Fees_Id);
        }
    }, []);

    const getFeesDetailsById = async (Fees_Id) => {
        try {
            const response = await axios.post(`${BASE_URL}/getFeesDetailsById`, {
                Fees_Id,
            });
            setFormState(response.data)
            console.log(response.data);
        } catch (err) {
            console.log("getFeesDetailsById err", err);
        }
    };

    useEffect(() => {
        getCourse();
        getBatch();
        getBankList();
        getFeesNotes();
    }, []);

    useEffect(() => {
        if (formState.Student_Id) {
            getStudentDetails(formState.Student_Id);
        }
    }, [formState.Student_Id]);

    useEffect(() => {
        console.log(formState.Batch_code);
        const batch = batchList.find((item) => item.Batch_code === formState.Batch_code);

        setFormState((prev) => ({ ...prev, Batch_Id: batch ? batch.Batch_Id : null }));
    }, [formState.Batch_code]);

    useEffect(() => {
        const Student_Id = formState.Student_Id;
        if (Student_Id) {
            getStudentFeesDetails(Student_Id);
        }
    }, [formState.Student_Id]);

    async function getBatch() {
        const data = {
            tablename: "Batch_Mst",
            columnname: "Batch_Id,Batch_code",
        };

        axios.post(`${BASE_URL}/get_new_data`, data).then((res) => {
            // console.log(res.data);
            setBatchList(res.data);
        });
    }

    const getFeesNotes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get_feesnotes`);
            // console.log(response.data);
            setFeesNotesList(response.data);
        } catch (err) {
            console.log("getFeesNotes err", err);
        }
    };

    const getBankList = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get_bank`);

            setBankList(response.data);
        } catch (err) {
            console.log("getBankList err", err);
        }
    };

    const getStudentDetails = async (id) => {
        try {
            const response = await axios.post(`${BASE_URL}/getstudent_details`, {
                Student_Id: id,
            });
            const data = response.data[0];
            console.log(data);
            setFormState((prev) => ({
                ...prev,
                Student_Name: data.Student_Name,
                Student_Id: data.Student_Id,
                Course_Id: data.Course_Id,
                Batch_code: data.Batch_code || "",
                Present_Mobile: data.Present_Mobile || "",
                Email: data.Email || "",
            }));
        } catch (err) {
            console.log("getStudentDetails err", err);
        }
    };

    const getStudentFeesDetails = async (Id) => {
        try {
            const response = await axios.post(`${BASE_URL}/getFeesDetailsByStudent`, {
                Student_Id: Id,
            });
            setFeesDetailsList(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addStudentFees = async () => {
        try {
            let data = formState;
            let Amount = parseInt(data.Amount) || 0;
            let Amt_Word = "";
            if (Amount) {
                const toWords = new ToWords();
                Amt_Word = toWords.convert(Amount, { currency: true }).toUpperCase();
            }
            let FeesMonth = parseInt(data.RDate.split("-")[1]);
            let FeesYear = parseInt(data.RDate.split("-")[0]);

            const response = await axios.post(`${BASE_URL}/addFeesDetails`, {
                ...data,
                Amount,
                Amt_Word,
                FeesMonth,
                FeesYear,
            });

            alert("Fees Details Added Successfully");
            getStudentFeesDetails(data.Student_Id);
        } catch (err) {
            console.log("/addFeesDetails err", err);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (studentRef.current && !studentRef.current.contains(e.target)) {
                setDropDownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const Student_Name = formState.Student_Name;
        let timeoutId;
        let ignore = false;
        setStudentList([]);
        setPage(1);
        if (Student_Name) {
            timeoutId = setTimeout(async () => {
                try {
                    setLoadingStudents(true);
                    const response = await axios.post(`${BASE_URL}/getStudentsByName`, {
                        Student_Name: `%${Student_Name}%`,
                    });

                    if (!ignore) {
                        setStudentList(response.data);
                    }
                } catch (err) {
                    console.log("fetchStudentsList err", err);
                } finally {
                    setLoadingStudents(false);
                }
            }, 500);
        }

        return () => {
            ignore = true;
            clearTimeout(timeoutId);
        };
    }, [formState.Student_Name]);

    useEffect(() => {
        let Student_Name = formState.Student_Name;
        setStudentList([]);
        let ignore = false;
        let timeoutId;
        if (Student_Name) {
            timeoutId = setTimeout(async () => {
                try {
                    setLoadingStudents(true);
                    const response = await axios.post(`${BASE_URL}/getStudentsByName`, {
                        Student_Name: `%${Student_Name}%`,
                        page,
                    });

                    if (!ignore) {
                        setStudentList(response.data);
                    }
                } catch (err) {
                    console.log("fetchStudentsList err", err);
                } finally {
                    setLoadingStudents(false);
                }
            }, 300);
        }

        return () => {
            clearTimeout(timeoutId);
            ignore = true;
        };
    }, [page]);

    const handleChange = (e) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const [pdfdata, setpdfData] = useState([]);

    async function getDetails(params) {
        const param = {
            Fees_Id: addfeesdetailsid,
        };
      

        axios.post(`${BASE_URL}/getFeesdetailspdf`,param).then((res) => {
            setpdfData(res.data[0]);
            console.log(res.data[0]);
            
        });
    }

    useEffect(() => {
        getDetails();
    }, []);

    const printReceipt = async (data) => {
        const blob = await pdf(<Receipt data={pdfdata} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12">
                                            <div className="row justify-content-center">
                                                <div className="p-4" style={{ width: "100%" }}>
                                                    <div>
                                                        <h3 className="card-title">Add Fees Details</h3>
                                                    </div>
                                                    <hr></hr>
                                                    <div className="row">
                                                        <div
                                                            className="col-lg-6"
                                                            style={{ borderRight: "1px solid lightgrey" }}
                                                        >
                                                            <div className="row">
                                                                <div
                                                                    className="form-group col-lg-6"
                                                                    style={{ position: "relative" }}
                                                                    ref={studentRef}
                                                                >
                                                                    <label htmlFor="exampleInputUsername1">
                                                                        Student Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="exampleInputUsername1"
                                                                        name="Student_Name"
                                                                        placeholder="Search"
                                                                        value={formState.Student_Name}
                                                                        onChange={handleChange}
                                                                        
                                                                        onFocus={() => setDropDownOpen(true)}
                                                                        autoComplete="none"
                                                                    />
                                                                    {dropDownOpen && (
                                                                        <div
                                                                            className=" d-flex flex-column"
                                                                            style={{
                                                                                width: "90%",
                                                                                position: "absolute",
                                                                                height: "200px",
                                                                                top: "100%",
                                                                                zIndex: "99",
                                                                                backgroundColor: "white",
                                                                                boxShadow:
                                                                                    "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                                                border: "1px",
                                                                                borderRadius: "1.5px",
                                                                                padding: "10px 0",
                                                                            }}
                                                                        >
                                                                            <ul
                                                                                style={{
                                                                                    flexGrow: "1",
                                                                                    overflowY: "auto",
                                                                                }}
                                                                            >
                                                                                {loadingStudents ? (
                                                                                    <span
                                                                                        className=" spinner-border"
                                                                                        style={{
                                                                                            display: "block",
                                                                                            margin: "auto",
                                                                                        }}
                                                                                    />
                                                                                ) : studentList.length > 0 ? (
                                                                                    studentList.map((option, index) => (
                                                                                        <li
                                                                                            key={option.Student_Id}
                                                                                            className="student-option-fees"
                                                                                            value={option.Student_Id}
                                                                                            onClick={(e) => {
                                                                                                setFormState(
                                                                                                    (prev) => ({
                                                                                                        ...prev,
                                                                                                        Student_Name:
                                                                                                            e.target
                                                                                                                .textContent,
                                                                                                        Student_Id:
                                                                                                            e.target
                                                                                                                .value,
                                                                                                    })
                                                                                                );
                                                                                                setDropDownOpen(false);
                                                                                            }}
                                                                                        >
                                                                                            {option.Student_Name} - {option.Batch_code}
                                                                                        </li>
                                                                                    ))
                                                                                ) : (
                                                                                    <li>No options found</li>
                                                                                )}
                                                                            </ul>
                                                                            <div
                                                                                className="d-flex"
                                                                                style={{ alignSelf: "center" }}
                                                                            >
                                                                                <button
                                                                                    onClick={() =>
                                                                                        setPage((prev) => prev - 1)
                                                                                    }
                                                                                    disabled={page === 1}
                                                                                >
                                                                                    <ArrowBackIosIcon />
                                                                                </button>
                                                                                {page}
                                                                                <button
                                                                                    onClick={() =>
                                                                                        setPage((prev) => prev + 1)
                                                                                    }
                                                                                >
                                                                                    <ArrowForwardIosIcon />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="form-group col-lg-6 ">
                                                                    <label for="exampleInputUsername1">
                                                                        Student Id
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="exampleInputUsername"
                                                                        value={formState.Student_Id}
                                                                        placeholder="Student Id"
                                                                        name="Student_Id"
                                                                        disabled
                                                                    />
                                                                </div>
                                                                <div className="form-group col-lg-6 ">
                                                                    <label for="exampleInputUsername1">
                                                                        Course Name
                                                                    </label>
                                                                    <select
                                                                        className="form-control form-control-lg"
                                                                        id="exampleFormControlSelect1"
                                                                        value={formState.Course_Id}
                                                                        name="Course_Id"
                                                                        disabled
                                                                    >
                                                                        <option value={""}>
                                                                            ----Select Course Name----
                                                                        </option>
                                                                        {courseList.map((item) => {
                                                                            return (
                                                                                <option
                                                                                    key={item.Course_Id}
                                                                                    value={item.Course_Id}
                                                                                >
                                                                                    {item.Course_Name}
                                                                                </option>
                                                                            );
                                                                        })}
                                                                    </select>
                                                                </div>
                                                                <div class="form-group col-lg-6">
                                                                    <label class="exapmleInputUsername1">
                                                                        Batch Code<span className="text-danger">*</span>
                                                                    </label>
                                                                    <select
                                                                        className="form-control form-control-lg"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.Batch_code}
                                                                        name="Batch_code"
                                                                        onChange={handleChange}
                                                                        disabled
                                                                    >
                                                                        <option value={""}>
                                                                            ---Select Batch Code---
                                                                        </option>
                                                                        {batchList.map((item) => {
                                                                            return (
                                                                                <option value={item.Batch_code}>
                                                                                    {item.Batch_code}
                                                                                </option>
                                                                            );
                                                                        })}
                                                                    </select>
                                                                    {
                                                                        <span className="text-danger">
                                                                            {" "}
                                                                            {error.batchcode}{" "}
                                                                        </span>
                                                                    }
                                                                </div>
                                                                <div className="form-group col-lg-6">
                                                                    <label for="exampleInputUsername1">
                                                                        Contact No.
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.Present_Mobile}
                                                                        placeholder="Contact No."
                                                                        name="Present_Mobile"
                                                                        disabled
                                                                    />
                                                                </div>
                                                                <div class="form-group col-lg-6">
                                                                    <label for="exampleInputUsername1">
                                                                        Email Address
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        class="form-control"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.Email}
                                                                        placeholder="Email Address"
                                                                        name="Email"
                                                                        disabled
                                                                    />
                                                                </div>
                                                                <div class="form-group col-lg-6">
                                                                    <label class="exampleInputUsername1">
                                                                        Type<span className="text-danger">*</span>
                                                                    </label>
                                                                    <select
                                                                        className="form-control form-control-lg"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.TypeR}
                                                                        name="TypeR"
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value={"C"}>Credit</option>
                                                                        <option value={"D"}>Debit</option>
                                                                    </select>
                                                                    {
                                                                        <span className="text-danger">
                                                                            {" "}
                                                                            {error.type}{" "}
                                                                        </span>
                                                                    }
                                                                </div>
                                                                <div className="form-group col-lg-6 ">
                                                                    <label for="exampleInputUsername1">
                                                                        Generate Receipt
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="exampleInputUsername1"
                                                                        // value={value.generatereceipt}
                                                                        name="generatereceipt"
                                                                        // onChange={onhandleChange}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="row">
                                                                <div className="form-group col-lg-6 ">
                                                                    <label for="exampleInputUsername1">
                                                                        Payment Type
                                                                    </label>
                                                                    <select
                                                                        className="form-control form-control-lg"
                                                                        id="exampleFormControlSelect1"
                                                                        value={formState.Payment_Type}
                                                                        name="Payment_Type"
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value={""}>
                                                                            ---Select Payment Type---
                                                                        </option>
                                                                        <option value={"Cash"}>Cash</option>
                                                                        <option value={"Cash - SIT"}>Cash - SIT</option>
                                                                        <option value={"Cash Direct Deposit"}>
                                                                            Cash Direct Deposit
                                                                        </option>
                                                                        <option value={"NEFT"}>NEFT</option>
                                                                        <option value={"Cheque/DD"}>Cheque/DD</option>
                                                                        <option value={"P.D.C"}>P.D.C</option>
                                                                        <option value={"Wire Trf"}>Wire Trf</option>
                                                                        <option value={"Card Payment"}>
                                                                            Card Payment
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-group col-lg-6 ">
                                                                    <label for="exampleInputUsername1">
                                                                        Bank<span className="text-danger">*</span>
                                                                    </label>
                                                                    <select
                                                                        className="form-control form-control-lg"
                                                                        id="exampleFormControlSelect1"
                                                                        value={formState.Bank_Id}
                                                                        name="Bank_Id"
                                                                        onChange={(e) => {
                                                                            handleChange(e);
                                                                            setFormState((prev) => ({
                                                                                ...prev,
                                                                                Cheque_Bank:
                                                                                    e.target.options[
                                                                                        e.target.selectedIndex
                                                                                    ].textContent,
                                                                            }));
                                                                        }}
                                                                    >
                                                                        <option value={""}>Select Bank Name</option>
                                                                        {bankList.map((item) => (
                                                                            <option key={item.Id} value={item.Id}>
                                                                                {item.Bank_Name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {
                                                                        <span className="text-danger">
                                                                            {" "}
                                                                            {error.bank}{" "}
                                                                        </span>
                                                                    }
                                                                </div>
                                                                <div class="form-group col-lg-6">
                                                                    <label for="exampleInputUsername1">
                                                                        Cheque/D.D.No.
                                                                        <span className="text-danger">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.Cheque_No}
                                                                        placeholder="Cheque/D.D.No."
                                                                        name="Cheque_No"
                                                                        onChange={handleChange}
                                                                    />
                                                                    {
                                                                        <span className="text-danger">
                                                                            {" "}
                                                                            {error.chequeddno}{" "}
                                                                        </span>
                                                                    }
                                                                </div>
                                                                <div class="form-group col-lg-6">
                                                                    <label for="exampleInputUsername1">
                                                                        Cheque Date
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        class="form-control"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.Cheque_Date}
                                                                        name="Cheque_Date"
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div class="form-group col-lg-6">
                                                                    <label for="exampleInputUsername1">Branch</label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.Cheque_Branch}
                                                                        placeholder="Branch"
                                                                        name="Cheque_Branch"
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div class="form-group col-lg-6">
                                                                    <label for="exampleInputUsername1">
                                                                        Amount:(Rs.)
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.Amount}
                                                                        placeholder="Amount:(Rs.)"
                                                                        name="Amount"
                                                                        min={0}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-lg-6 ">
                                                                    <label for="exampleInputUsername1">
                                                                        Particular
                                                                    </label>
                                                                    <select
                                                                        className="form-control form-control-lg"
                                                                        id="exampleFormControlSelect1"
                                                                        value={formState.Perticular_Id}
                                                                        name="Perticular_Id"
                                                                        onChange={(e) => {
                                                                            handleChange(e);
                                                                            setFormState((prev) => ({
                                                                                ...prev,
                                                                                Notes: e.target.options[
                                                                                    e.target.selectedIndex
                                                                                ].textContent,
                                                                            }));
                                                                        }}
                                                                    >
                                                                        <option value={""}>
                                                                            Select Particular Type
                                                                        </option>
                                                                        {feesNotesList.map((item) => (
                                                                            <option key={item.Id} value={item.Id}>
                                                                                {item.Perticular}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="form-group col-lg-6">
                                                                    <label htmlFor="exampleInputUsername1">
                                                                        Receipt Date
                                                                        <span className="text-danger">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        className="form-control"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.RDate}
                                                                        name="RDate"
                                                                        disabled
                                                                    />
                                                                    {<span className="text-danger">{error.date}</span>}
                                                                </div>
                                                                <div class="form-group col-lg-6">
                                                                    <label for="exampleInputUsername1">Due Date</label>
                                                                    <input
                                                                        type="date"
                                                                        class="form-control"
                                                                        id="exampleInputUsername1"
                                                                        value={formState.Due_Date}
                                                                        name="Due_Date"
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="form-group col-lg-6">
                                                            <FormControl>
                                                                <label>Tax Type</label>
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="row-radio-buttons-group"
                                                                >
                                                                    <FormControlLabel
                                                                        value="0116"
                                                                        control={<Radio />}
                                                                        label="CGST"
                                                                    />
                                                                    <FormControlLabel
                                                                        value="0117"
                                                                        control={<Radio />}
                                                                        label="SGST"
                                                                    />
                                                                    <FormControlLabel
                                                                        value="0118"
                                                                        control={<Radio />}
                                                                        label="IGST"
                                                                    />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                    <div>
                                                        <h2 className="card-title">Student Account Details</h2>
                                                    </div>
                                                    <div className="table-responsive">
                                                        <table class="table table-bordered table-gen">
                                                            <thead>
                                                                <tr>
                                                                    <th>Date</th>
                                                                    <th>Particular</th>
                                                                    <th>Paymenet Type</th>
                                                                    <th>Reciept No</th>
                                                                    <th>Debit</th>
                                                                    <th>Credit</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {feesDetailsList.map((item) => (
                                                                    <tr>
                                                                        <td>{item.Date_Added}</td>
                                                                        <td>{item.Notes}</td>
                                                                        <td>
                                                                            {item.TypeR === "C" && item.Payment_Type}
                                                                        </td>
                                                                        <td>{item.TypeR === "C" && item.Fees_Code}</td>
                                                                        <td>{item.TypeR === "D" && item.Amount}</td>
                                                                        <td>{item.TypeR === "C" && item.Amount}</td>
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
                    </div>

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">
                                <div className="container-fluid">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-12 col-lg-12">
                                            <div className="row justify-content-center">
                                                <div className="p-4" style={{ width: "100%" }}>
                                                    <div>
                                                        <h3 className="card-title">Balance Details</h3>
                                                    </div>
                                                    <hr></hr>
                                                    <form class="forms-sample py-3">
                                                        <div className="row">
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">
                                                                    Debit<span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={debit}
                                                                    name="debit"
                                                                    // onChange={onhandleChange}
                                                                    disabled
                                                                />
                                                                {<span className="text-danger"> {error.debit} </span>}
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">
                                                                    Credit<span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={credit}
                                                                    name="credit"
                                                                    // onChange={onhandleChange}
                                                                    disabled
                                                                />
                                                                {<span className="text-danger"> {error.credit} </span>}
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">
                                                                    Balance<span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={balance}
                                                                    name="balance"
                                                                    // onChange={onhandleChange}
                                                                    disabled
                                                                />
                                                                {<span className="text-danger"> {error.balance} </span>}
                                                            </div>
                                                        </div>

                                                        <button type="submit" class="btn btn-primary mr-2">
                                                            Generate Invoice
                                                        </button>
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mr-2"
                                                            onClick={addStudentFees}
                                                        >
                                                            Save
                                                        </button>
                                                        <button typr="submit" class="btn btn-primary mr-2">
                                                            Print Tax Receipt
                                                        </button>
                                                        <button type="button"  onClick={printReceipt} class="btn btn-primary mr-2">
                                                            Print Receipt
                                                        </button>
                                                        <button type="submit" class="btn btn-primary mr-2">
                                                            Invoice
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                window.location.reload();
                                                            }}
                                                            class="btn btn-light"
                                                        >
                                                            Close
                                                        </button>
                                                    </form>
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
    );
};

export default AddFeesDetails;
