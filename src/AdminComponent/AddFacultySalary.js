import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import axios from "axios";

const AddFacultySalary = () => {
    const [error, setError] = useState({});
    const [uid, setUid] = useState([])
    const [hide, setHide] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [facultyList, setFacultyList] = useState([]);
    const { addfacultysalaryid } = useParams();
    const [lectureList, setLectureList] = useState([]);
    const [salaryList, setSalaryList] = useState([]);
    const initialState = {
        Salary_Id: "",
        Faculty_Id: "",
        Sal_Month: "",
        Sal_Year: "",
        Faculty_Type: "",
        Salary_struct: "",
        Rate: "",
        Total_Hours: "",
        Salary: "",
        Bonus: "",
        Award: "",
        Other_Inc: "",
        Tot_Inc: "",
        Tot_Amount: "",
        TDS_Per: "",
        TDS: "",
        Advance: "",
        Other_Ded: "",
        Total_Ded: "",
        Net_Payment: "",
        Payment_Type: "",
        Cheque_No: "",
        Payment_Dt: "",
        Date_Added: "",
        Remark: "",
        IsActive: 1,
        IsDelete: 0,
        NEFT_No: "",
    };
    const [formState, setFormState] = useState({ ...initialState });

    useEffect(() => {
        getFacultyList();
    }, []);

    useEffect(() => {
        setFormState((prev) => ({
            ...prev,
            Faculty_Type: "",
            Salary_struct: "",
            Rate: "",
            TDS_Per: "",
        }));
        if (formState.Faculty_Id) {
            getFacultyDetails(formState.Faculty_Id);
            getFacultySalary(formState.Faculty_Id);
        }
    }, [formState.Faculty_Id]);

    useEffect(() => {
        const year = formState.Sal_Year;
        const month = formState.Sal_Month;
        const id = formState.Faculty_Id;

        setLectureList([]);

        setFormState((prev) => ({
            ...initialState,
            Sal_Year: prev.Sal_Year,
            Sal_Month: prev.Sal_Month,
            Faculty_Id: prev.Faculty_Id,
            Faculty_Type: prev.Faculty_Type,
            Salary_struct: prev.Salary_struct,
            Rate: prev.Rate,
            TDS_Per: prev.TDS_Per,
        }));

        if (year && month && id) {
            getFacultySalaryByMYI(month, year, id);
            getLectureDetails(month, year, id);
        }
    }, [formState.Sal_Year, formState.Sal_Month, formState.Faculty_Id]);

    const getFacultySalaryByMYI = async (month, year, id) => {
        try {
            const response = await axios.post(`${BASE_URL}/getFacultySalaryByMYI`, {
                Sal_Month: month,
                Sal_Year: year,
                Faculty_Id: id,
            });

            if (response.data.length) {
                console.log(response.data);
                setFormState({ ...response.data[0] });
            }
        } catch (err) {
            console.log("/getFacultySalaryByMYI error", err);
        }
    };

    const getFacultySalary = async (id) => {
        try {
            const response = await axios.post(`${BASE_URL}/getFacultySalaryById`, {
                Faculty_Id: id,
            });
            setSalaryList(response.data);
        } catch (err) {
            console.log("/getFacultySalary error", err);
        }
    };

    const getFacultyList = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getfaculty`);
            setFacultyList(response.data);
        } catch (err) {
            console.log("getFacultyList error", err);
        }
    };

    const getFacultyDetails = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/getFaculty/${id}`);

            const faculty = response.data;
            setFormState((prev) => ({
                ...prev,
                Faculty_Type: faculty.Faculty_Type,
                Salary_struct: faculty.Sal_Struct,
                Rate: faculty.Salary,
                TDS_Per: faculty.TDS ? faculty.TDS : "",
            }));
        } catch (err) {
            console.log("getFacultyDetails error", err);
        }
    };

    const navigate = useNavigate()

    async function getfacultysalarypopulate(Salary_Id) {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: Salary_Id || addfacultysalaryid,
                uidname: "Salary_Id",
                tablename: "Faculty_Salary"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (data && data.length > 0) {
            const salaryData = data[0];
            setUid(salaryData);

            // 💡 Set the formState with fetched data
            setFormState((prev) => ({
                ...prev,
                ...salaryData,
                Salary_Id: salaryData.Salary_Id || "",
                Sal_Month: salaryData.Sal_Month || "",
                Sal_Year: salaryData.Sal_Year || "",
                Faculty_Id: salaryData.Faculty_Id || "",
                Faculty_Type: salaryData.Faculty_Type || "",
                Salary_struct: salaryData.Salary_struct || "",
                Rate: salaryData.Rate || "",
                TDS_Per: salaryData.TDS_Per || "",
                Total_Hours: salaryData.Total_Hours || "",
                Salary: salaryData.Salary || "",
                Bonus: salaryData.Bonus || "",
                Award: salaryData.Award || "",
                Other_Inc: salaryData.Other_Inc || "",
                Tot_Inc: salaryData.Tot_Inc || "",
                Tot_Amount: salaryData.Tot_Amount || "",
                TDS: salaryData.TDS || "",
                Advance: salaryData.Advance || "",
                Other_Ded: salaryData.Other_Ded || "",
                Total_Ded: salaryData.Total_Ded || "",
                Net_Payment: salaryData.Net_Payment || "",
                Payment_Type: salaryData.Payment_Type || "",
                Cheque_No: salaryData.Cheque_No || "",
                Payment_Dt: salaryData.Payment_Dt ? salaryData.Payment_Dt.slice(0, 10) : "",
                Date_Added: salaryData.Date_Added || "",
                Remark: salaryData.Remark || "",
                IsActive: salaryData.IsActive ?? 1,
                IsDelete: salaryData.IsDelete ?? 0,
                NEFT_No: salaryData.NEFT_No || "",
            }));

            setIsEdit(true); // mark as edit mode
        }
    }

    useEffect(() => {
        if (addfacultysalaryid && addfacultysalaryid !== ":addfacultysalaryid") {
            getfacultysalarypopulate();
            setHide(true);
        }
    }, [addfacultysalaryid]);


    const getLectureDetails = async (month, year, id) => {
        try {
            const LectureDate = `${year}-${(months.indexOf(month) + 1).toString().padStart(2, "0")}%`;
            const response = await axios.post(`${BASE_URL}/getLectureByMYI`, { LectureDate, Faculty_Id: id });

            setLectureList(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formState.Sal_Month) {
            isValid = false;
            newErrors.Sal_Month = "Month is Required";
        }

        if (!formState.Sal_Year) {
            isValid = false;
            newErrors.Sal_Year = "Year is Required";
        }

        if (!formState.Faculty_Id) {
            isValid = false;
            newErrors.Faculty_Id = "Faculty is required";
        }

        setError(newErrors);

        setTimeout(() => {
            setError({});
        }, 5000);
        return isValid;
    };

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const years = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2025 - i);

    const handleChange = (e) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = setToNum(formState);

            try {
                const res = await axios.post(`${BASE_URL}/addFacultySalary`, data);
                const msg = res.data?.message;
                const addfacultysalaryid = res.data?.Salary_Id;

                if (msg === "Faculty Salary Added") {
                    alert("Data Added Successfully");
                } else if (msg === "Faculty Salary Updated") {
                    alert("Data Updated Successfully");
                    navigate(`/addfacultysalry`);
                }

                setFormState({
                    Salary_Id: "",
                    Faculty_Id: "",
                    Sal_Month: "",
                    Sal_Year: "",
                    Faculty_Type: "",
                    Salary_struct: "",
                    Rate: "",
                    Total_Hours: "",
                    Salary: "",
                    Bonus: "",
                    Award: "",
                    Other_Inc: "",
                    Tot_Inc: "",
                    Tot_Amount: "",
                    TDS_Per: "",
                    TDS: "",
                    Advance: "",
                    Other_Ded: "",
                    Total_Ded: "",
                    Net_Payment: "",
                    Payment_Type: "",
                    Cheque_No: "",
                    Payment_Dt: "",
                    Date_Added: "",
                    Remark: "",
                    IsActive: 1,
                    IsDelete: 0,
                    NEFT_No: "",
                });

                // if (addfacultysalaryid) {
                //     setHide(true);
                //     navigate(`/addfacultysalry/${addfacultysalaryid}`);
                //     getfacultysalarypopulate(addfacultysalaryid);
                // }
            } catch (err) {
                console.log("AXIOS ERROR:", err);
            }
        }
    };


    const numInputs = [
        "Total_Hours",
        "Award",
        "Other_Inc",
        "Bonus",
        "Advance",
        "TDS_Per",
        "Other_Ded",
        "TDS",
        "Tot_Inc",
        "Total_Ded",
        "Net_Payment",
        "Salary",
    ];
    const setToNum = (data) => {
        const temp = numInputs.reduce((acc, current) => {
            return { ...acc, [current]: getFloat(data[current]) };
        }, {});

        return { ...data, ...temp };
    };

    const getFloat = (num) => {
        let num1 = parseFloat(num) || 0;
        return parseFloat(num1.toFixed(2));
    };

    return (
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">
                <div className="content-wrapper">
                    <h4 class="card-title">Add Faculty Salary</h4>
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">
                                <div className="container-fluid">
                                    <form onSubmit={handleSubmit} className="row d-flex justify-content-between">
                                        <div className="col-md-6 col-lg-6">
                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Faculty Details</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-lg-4 ">
                                                            <lable for="exampleFormControlSelect1">
                                                                Month
                                                                <span className="text-danger">*</span>
                                                            </lable>
                                                            <select
                                                                class="form-control form-control-lg"
                                                                id="exampleFormControlSelect1"
                                                                name="Sal_Month"
                                                                value={formState.Sal_Month}
                                                                onChange={handleChange}
                                                            >
                                                                <option value={""}>--Select Month--</option>

                                                                {months.map((month, i) => (
                                                                    <option value={month} key={i}>
                                                                        {month}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {error.Sal_Month && (
                                                                <span className="text-danger">{error.Sal_Month}</span>
                                                            )}
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleFormControlSelect1">
                                                                Year
                                                                <span className="text-danger">*</span>
                                                            </lable>
                                                            <select
                                                                class="form-control form-control-lg"
                                                                id="exampleFormControlSelect"
                                                                name="Sal_Year"
                                                                value={formState.Sal_Year}
                                                                onChange={handleChange}
                                                            >
                                                                <option value={""}>--Select Year--</option>
                                                                {years.map((year, i) => (
                                                                    <option value={year} key={i}>
                                                                        {year}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {error.Sal_Year && (
                                                                <span className="text-danger">{error.Sal_Year}</span>
                                                            )}
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleFormControlSelect1">
                                                                Faculty Name
                                                                <span className="text-danger">*</span>
                                                            </lable>
                                                            <select
                                                                class="form-control Form-control-lg"
                                                                id="exampleFormControlSelect1"
                                                                name="Faculty_Id"
                                                                value={formState.Faculty_Id}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">--Faculty Name--</option>
                                                                {facultyList.map((row) => (
                                                                    <option key={row.Faculty_Id} value={row.Faculty_Id}>
                                                                        {row.Faculty_Name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {error.Faculty_Id && (
                                                                <span className="text-danger">{error.Faculty_Id}</span>
                                                            )}
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Employee Type</lable>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                name="employeetype"
                                                                value={formState.Faculty_Type}
                                                                disabled
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Salary Structure</lable>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                name="salarystructure"
                                                                value={formState.Salary_struct}
                                                                disabled
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Charges</lable>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                name="charges"
                                                                value={formState.Rate}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Lecture Details</h4>
                                                    </div>

                                                    <div className="table-responsive" style={{ maxHeight: "300px" }}>
                                                        <table className="table table-bordered table-gen">
                                                            <thead>
                                                                <tr>
                                                                    <th>S.No.</th>
                                                                    <th>Date</th>
                                                                    <th>Topic</th>
                                                                    <th>Batch</th>
                                                                    <th>Start Time</th>
                                                                    <th>End Time</th>
                                                                    <th>Total Hrs.</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {lectureList.map((row, i) => (
                                                                    <tr key={i}>
                                                                        <td>{i}</td>
                                                                        <td>{row.Take_Dt}</td>
                                                                        <td>{row.Lecture_Name}</td>
                                                                        <td>{row.Batch_code}</td>
                                                                        <td>{row.Faculty_Start}</td>
                                                                        <td>{row.Faculty_End}</td>
                                                                        <td>{row.Duration}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Income Details</h4>
                                                    </div>
                                                    <div className="table-responsive" style={{ maxHeight: "300px" }}>
                                                        <table className="table table-bordered table-gen">
                                                            <thead>
                                                                <tr>
                                                                    <th>Tl. Income</th>
                                                                    <th>Month</th>
                                                                    <th>Year</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {salaryList.map((row, i) => (
                                                                    <tr key={i}>
                                                                        <td>{row.Tot_Inc}</td>
                                                                        <td>{row.Sal_Month}</td>
                                                                        <td>{row.Sal_Year}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Income</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div class="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Total Hours</label>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Totle Hours"
                                                                name="Total_Hours"
                                                                value={formState.Total_Hours}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">
                                                                Best performance Awards
                                                            </label>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Best Performance Awards"
                                                                name="Award"
                                                                value={formState.Award}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleTextarea1">Other If Any</lable>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Other If Any"
                                                                name="Other_Inc"
                                                                value={formState.Other_Inc}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Bonus</lable>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Bonus"
                                                                name="Bonus"
                                                                value={formState.Bonus}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Total Amount</lable>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Total Amount"
                                                                name="Salary"
                                                                value={formState.Salary}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Deduction</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">TDS%</lable>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="TDS%"
                                                                name="TDS_Per"
                                                                value={formState.TDS_Per}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Advance If Any</lable>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Advance"
                                                                name="Advance"
                                                                value={formState.Advance}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername">Other If Any</lable>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Other If Any"
                                                                name="Other_Ded"
                                                                value={formState.Other_Ded}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">TDS Amount</lable>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="TDS Amount"
                                                                name="TDS"
                                                                value={formState.TDS}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Net Payment</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Total Income</label>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Total Income"
                                                                name="Tot_Inc"
                                                                value={formState.Tot_Inc}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Total Deduction</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Totle Deducation"
                                                                name="Total_Ded"
                                                                value={formState.Total_Ded}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>

                                                        <div className="form-group col-lg-4">
                                                            <lable for="exampleTextarea1">Net Payment</lable>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Net Payment"
                                                                name="Net_Payment"
                                                                value={formState.Net_Payment}
                                                                onChange={handleChange}
                                                                step="any"
                                                                min={0}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="p-3" style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Payment Details</h4>
                                                    </div>

                                                    <div className="row">
                                                        <div class="form-group col-lg-6">
                                                            <lable for="exampleFormControlSelect1">Payment Type</lable>
                                                            <select
                                                                class="form-control form-control-lg"
                                                                id="exampleFormControlSelect1"
                                                                name="Payment_Type"
                                                                value={formState.Payment_Type}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">--Payment Type--</option>
                                                                <option>Cash</option>
                                                                <option>Cheque</option>
                                                                <option>NEFT</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Payment Date</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                placeholder="Payment Date"
                                                                name="Payment_Dt"
                                                                value={formState.Payment_Dt}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-12">
                                                            <lable for="exampleTextarea1">Remark</lable>
                                                            <textarea
                                                                class="form-control"
                                                                id="exampleTeaxtarea1"
                                                                placeholder="Remark"
                                                                name="Remark"
                                                                value={formState.Remark}
                                                                onChange={handleChange}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row p-2 gap-2">
                                                <button type="submit" className="mr-2 btn btn-primary">
                                                    Submit
                                                </button>
                                                <button type="button" className="col-2">
                                                    Close
                                                </button>
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

export default AddFacultySalary;
