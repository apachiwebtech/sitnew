import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';

const AddEmployeeAttendance = () => {
    const [selected, setSelected] = useState([]);
    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [batchcat, setbatchcat] = useState([])
    const [vendordata, setStudent] = useState([])
    const [inquery, setinquery] = useState([])
    const [status, setstatus] = useState([])
    const [uid, setUid] = useState([])
    const [error, setError] = useState([])
    const [hide, setHide] = useState(false)
    const [options, setOptions] = useState([]);
    const [selectedYear, setSelectedYear] = useState ('');
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2000; year <= currentYear; year++) {
        years.push(year);
    }

    const [selectedMonth, setSelectedMonth] = useState ('');
    const month = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [value, setValue] = useState({
        fromdate: "",
        fromtodate: "",
        selectcourse: "",
        rollnumberallot: "",
        selctbatch: "",
        allinquiries: "",
        all: ""
    })
    const getbatch = async (id) => {

        const data = {
            courseid: id
        }
        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data);
            const formattedOptions = res.data.map((course) => ({
                label: String(course.Batch_code),
                value: course.Batch_Id,

            }));
            setOptions(formattedOptions);

        } catch (err) {
            console.error("Error fetching data:", err);
        }

        setSelected([])
    };





    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                SetCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getBatchData() {

        axios.get(`${BASE_URL}/get_batchcategory`)
            .then((res) => {
                console.log(res.data)
                setbatchcat(res.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getBatchData()
        getCourseData()
        // getbatchdata()
        setUid([])
    }, [])
    async function getstatus() {
        const data = {
            tablename: "Status_Master",
            columnname: "*"
        }
        axios.post(`${BASE_URL}/get_new_data`, data)
            .then((res) => {
                console.log(res.data)
                setstatus(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        getstatus()
        setValue({

        })
    }, [uid])


    const getstudentlisitng = (id) => {
        setHide(true)
        const data = {
            batch_code: id
        }

        axios.post(`${BASE_URL}/getbatchwisestudent`, data)
            .then((res) => {
                setStudent(res.data)
            })
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!value.all && !value.allinquiries && !value.selctbatch && !value.rollnumberallot && !value.selectcourse && !value.fromdate && !value.fromtodate) {
            alert("Please fill required fields");
            return;
        }

        if ((value.fromdate || value.fromtodate) && !(value.fromdate && value.fromtodate)) {
            alert("Please select both from date and to date");
            return;
        }

        if (!value.selctbatch && !value.selectcourse && !value.rollnumberallot) {
            alert("Please select the following: Batch, Course, Batch Type");
            return;
        }

        let data = {
            fromdate: value.fromdate,
            fromtodate: value.fromtodate,
            selectcourse: value.selectcourse,
            rollnumberallot: value.rollnumberallot,
            allinquiries: value.allinquiries,
            all: value.all
        };


        if (value.selctbatch) {
            data = {
                ...data,
                selctbatch: value.selctbatch.map(option => option.value)
            };
        }

        axios.post(`${BASE_URL}/getdatas`, data)
            .then((res) => {
                console.log(res);
                setinquery(res.data);
            });
    };


    const onhandleChange = (e) => {
        
        
        
        const { name, value } = e.target;
        if (e.target) {
            setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

            if (e.target.name === "selectcourse") {
                getbatch(e.target.value);
            } else if (name === "yearInput") {
                setSelectedYear(value);
            } else if (name === "monthInput"){
                setSelectedMonth(value);
            }

        } else {
            setSelected(e); // Update the selected batch values
            setValue((prev) => ({ ...prev, selctbatch: e })); // Save the selected batch values to the state
        }
    }




    const rowsWithIds = inquery.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Employee Attendance</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit} >
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <label htmlFor=""yearInput>Year</label>
                                                <select className="form-control" id="yearInput" value={selectedYear}
                                                name='yearinput' onChange={onhandleChange}>
                                                    <option value="">--Select Year--</option>
                                                    {years.map(year => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                            <label htmlFor="monthInput">Months</label>
                                            <select className="form-control" id="yearInput" value={selectedMonth} 
                                            name='monthinput' onChange={onhandleChange}>
                                                <option value="">--Select Months--</option>
                                                {month.map(month => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">From Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.fromdate}
                                                    name="fromdate" onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername">From To Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername" value={value.fromtodate}
                                                    name="fromtodate" onChange={onhandleChange} />  
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Select Company</label>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.selectcompany}
                                                name="selectcompany" onChange={onhandleChange} disabled>
                                                    <option>SIT</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Employee</label>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.employee}
                                                name="employee" onChange={onhandleChange} disabled>
                                                    <option>Rutuj Vasant Mestry</option>
                                                </select>
                                            </div>

                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Go</button>

                                    </form>

                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Overtime (Hrs.)</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.overtime}
                                                    name='overtime' onChange={onhandleChange} />
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Absents</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.absent}
                                                    name='absent' onChange={onhandleChange} />
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Weekly Off</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.weeklyoff}
                                                    name='weeklyoff' onChange={onhandleChange} />
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Holidays</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.holidays}
                                                    name='holidays' onChange={onhandleChange} />
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Lates</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.lates}
                                                    name='lates' onChange={onhandleChange} />
                                                </div>

                                            </div>

                                            <button type="submit" class="btn btn-primary mr-2">Modify</button>
                                            <button type="submit" class="btn btn-primary mr-2">Import Machine Log </button>
                                            <button type="submit" class="btn btn-primary mr-2">Import From Excel</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light" >Close</button>
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

export default AddEmployeeAttendance
