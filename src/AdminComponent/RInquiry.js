import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { StyledDataGrid } from "./StyledDataGrid";
//import FormControlLabel from '@mui/material/FormControlLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const RInquiry = () => {
    const [selected, setSelected] = useState([]);
    const [course, SetCourse] = useState([]);
    const [batch, setAnnulBatch] = useState([]);
    const [batchcat, setbatchcat] = useState([]);
    const [vendordata, setStudent] = useState([]);
    const [inquery, setinquery] = useState([]);
    const [status, setstatus] = useState([]);
    const [uid, setUid] = useState([]);
    const [error, setError] = useState([]);
    const [hide, setHide] = useState(false);
    const [inquiryData, setInquiryData] = useState([]);

    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState({
        fromdate: "",
        fromtodate: "",
        selectcourse: "",
        rollnumberallot: "",
        selctbatch: "",
        allinquiries: "",
        all: "",
    });
    const getbatch = async (id) => {
        const data = {
            courseid: id,
        };

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

        setSelected([]);
    };

    // if (value.fromdate)
    //   isValid = false;
    // newErrors.fromdate = "From Date is Required"
    // if (value.fromtodate)
    //   isValid = false;
    // newErrors.fromtodate = "From To Date is Required"

    // if (value.selectcourse)
    //   isValid = false;
    // newErrors.selectcourse = "Course is Required"

    // if (value.selectbatches)
    //   isValid = false;
    // newErrors.selectbatchs = "Batch is Required"

    // setError(newErrors)
    // return isValid

    async function getCourseData() {
        axios
            .get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data);
                SetCourse(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function getBatchData() {
        axios
            .get(`${BASE_URL}/get_batchcategory`)
            .then((res) => {
                console.log(res.data);
                setbatchcat(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getBatchData();
        getCourseData();
        // getbatchdata()
        setUid([]);
    }, []);
    async function getstatus() {
        const data = {
            tablename: "Status_Master",
            columnname: "*",
        };
        axios
            .post(`${BASE_URL}/get_new_data`, data)
            .then((res) => {
                console.log(res.data);
                setstatus(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getstatus();
        setValue({});
    }, [uid]);

    const getstudentlisitng = (id) => {
        setHide(true);
        const data = {
            batch_code: id,
        };

        axios.post(`${BASE_URL}/getbatchwisestudent`, data).then((res) => {
            setStudent(res.data);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!value.fromdate && !value.fromtodate) {
            alert("Please Select dates");
            return;
        }

        // if ((value.fromdate || value.fromtodate) && !(value.fromdate && value.fromtodate)) {
        //   alert("Please select both from date and to date");
        //   return;
        // }

        // if (!value.selctbatch && ! value.selectcourse && !value.rollnumberallot ) {
        //   alert("Please select the following: Batch, Course, Batch Type");
        //   return;
        // }

        let data = {
            fromdate: value.fromdate,
            fromtodate: value.fromtodate,
            selectcourse: value.selectcourse,
            rollnumberallot: value.rollnumberallot,
            allinquiries: value.allinquiries,
            all: value.all,
        };

        if (value.selctbatch) {
            data = {
                ...data,
                selctbatch: value.selctbatch.map((option) => option.value),
            };
        }

        axios.post(`${BASE_URL}/getdatas`, data).then((res) => {
            console.log("/getdates", res.data);
            setinquery(res.data);
        });
    };

    const onhandleChange = (e) => {
        if (e.target) {
            setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

            if (e.target.name === "selectcourse") {
                getbatch(e.target.value);
            }
        } else {
            setSelected(e); // Update the selected batch values
            setValue((prev) => ({ ...prev, selctbatch: e })); // Save the selected batch values to the state
        }
        // console.log(e.target.name , e.target.value);
        
    };

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Inquiry Report");

        const headers = [
            { header: "Student Name", key: "Student_Name", width: 20 },
            { header: "Qualification", key: "Qualification", width: 15 },
            { header: "Inquiry Type", key: "Inquiry_type", width: 15 },
            { header: "Batch Code", key: "Batch_Code", width: 15 },
            { header: "Inquiry Date", key: "inquiry_DT", width: 15 },
            { header: "Email", key: "Email", width: 25 },
            { header: "Present Mobile", key: "Present_Mobile", width: 15 },
            { header: "Course Name", key: "Course_Name", width: 20 },
            { header: "Batch Category", key: "BatchCategory", width: 18 },
            { header: "Discussion 1", key: "Discussion1", width: 25 },
            { header: "Discussion 2", key: "Discussion2", width: 25 },
            { header: "Discussion 3", key: "Discussion3", width: 25 },
            { header: "Status 1", key: "OnlineStatus", width: 20 },
            { header: "Status 2", key: "MasterStatus", width: 15 },
        ];

        worksheet.columns = headers;

        // Add data rows
        inquery.forEach((item, index) => {
            let discussion_arr = JSON.parse(item.discussion_arr);
            let data = {
                ...item,
                Discussion1: discussion_arr[0],
                Discussion2: discussion_arr[1],
                Discussion3: discussion_arr[2],
            };

            worksheet.addRow(data);
        });

        headers.forEach((_, index) => {
            const cell = worksheet.getRow(1).getCell(index + 1);
            cell.font = { bold: true, color: { argb: "FF000000" } };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFFF200" }, // Blue background
            };
        });

        try {
            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), "Inquiry_Report.xlsx");
        } catch (error) {
            console.error("Error exporting Excel file", error);
        }
    };

    // const exportToExcel = () => {
    //     // Create a new workbook
    //     const workbook = XLSX.utils.book_new();

    //     // Convert data to a worksheet
    //     const worksheet = XLSX.utils.json_to_sheet(inquery.map((item)=>({
    //         "Student Name":item.Student_Name,
    //         "Qualification":item.Qualification,
    //         "Inquiry Type": item.Inquiry_type,
    //         "Batch Code": item.Batch_Code,
    //         "Inquiry Date": item.inquiry_DT,
    //         "Email":item.Email,
    //         "Present Mobile": item.Present_Mobile,
    //         "Course Name": item.Course_Name,
    //         "Batch Category": item.BatchCategory,
    //         "Status 1": item.OnlineStatus,
    //         "Status 2": item.MasterStatus
    //     })));

    //     // Append the worksheet to the workbook
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiry Report");

    //     // Export the workbook
    //     XLSX.writeFile(workbook, "Inquiry_Report.xlsx");
    //   };

    const columns = [
        {
            field: "index",
            headerName: "Id",
            type: "number",
            align: "center",
            headerAlign: "center",
            width: 100,
            filterable: false,
        },
        // { field: 'attendee', headerName: 'Student Code', flex: 2 },
        { field: "Student_Name", headerName: "Student Name", width: 200 },
        { field: "Qualification", headerName: "Qualification", width: 100 },
        { field: "Inquiry_type", headerName: "Inquiry Type", width: 100 },
        { field: "Batch_Code", headerName: "Batch Code", width: 100 },
        {
            field: "inquiry_DT",
            headerName: "Inquiry Date",
            width: 130,
            renderCell: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if already in DD-MM-YYYY format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return ""; // Handle invalid dates
          
              // Convert to DD-MM-YYYY format
              return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
          },
          
        { field: "Email", headerName: "Email", width: 150 },
        { field: "Present_Mobile", headerName: "Present Mobile", width: 150 },
        { field: "Course_Name", headerName: "Course Name", width: 200 },
        { field: "BatchCategory", headerName: "Batch Category", width: 150 },
        {
            field: "Discussion1",
            headerName: "Discussion 1",
            valueGetter: (params) => {
                let discussion_arr = JSON.parse(params.row.discussion_arr);
                return discussion_arr[0];
            },
            width: 200,
        },
        {
            field: "Discussion2",
            headerName: "Discussion 2",
            valueGetter: (params) => {
                let discussion_arr = JSON.parse(params.row.discussion_arr);
                return discussion_arr[1];
            },
            width: 200,
        },
        {
            field: "Discussion3",
            headerName: "Discussion 3",
            valueGetter: (params) => {
                let discussion_arr = JSON.parse(params.row.discussion_arr);
                return discussion_arr[2];
            },
            width: 200,
        },
        { field: "OnlineStatus", headerName: "Status 1", width: 130 },
        { field: "MasterStatus", headerName: "Status 2", width: 130 },

        {
            field: "actions",
            // type: "actions",
            headerName: "Action",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => params.row.Student_Id} />
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => params.row.Student_Id} />
                    </>
                );
            },
        },
    ];

    const rowsWithIds = inquery.map((row, index) => ({ index: index + 1, ...row }));

    return (
        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Inquiry Report</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="row">
                                            <div class="form-group col-lg-3" style={{ display: "flex", flexDirection: 'column'}}>
                                                <label for="exampleInputUsername1">
                                                    From Date<span className="text-danger">*</span>
                                                </label>
                                                <DatePicker
        selected={value.fromdate ? new Date(value.fromdate) : null}
        onChange={(date) =>
          onhandleChange({
            target: { name: "fromdate", value: format(date, "yyyy-MM-dd") },
          })
        }
        className="form-control"
        id="exampleInputUsername1"
        dateFormat="dd-MM-yyyy"
        placeholderText="dd-mm-yyyy"
      />
                                                {<span className="text-danger"> {error.fromdate} </span>}
                                            </div>

                                            <div class="form-group col-lg-3" style={{display: 'flex', flexDirection: "column"}}>
                                                <label for="exampleInputUsername">
                                                    From To Date<span className="text-danger">*</span>
                                                </label>
                                                <DatePicker
        selected={value.fromtodate ? new Date(value.fromtodate) : null}
        onChange={(date) =>
          onhandleChange({ target: { name: "fromtodate", value: date } })
        }
        className="form-control"
        id="exampleInputUsername"
        dateFormat="dd-MM-yyyy"
        placeholderText="dd-MM-yyyy"
      />
                                                {<span className="text-danger"> {error.fromtodate} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Select Course</label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    value={value.selectcourse}
                                                    name="selectcourse"
                                                    onChange={onhandleChange}
                                                >
                                                    <option>Select Course</option>

                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.selectcourse} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch Type</label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFromControlSelect1"
                                                    value={value.rollnumberallot}
                                                    name="rollnumberallot"
                                                    onChange={onhandleChange}
                                                >
                                                    <option value="">Select Batch Type</option>
                                                    {batchcat.map((item) => {
                                                        return <option value={item.id}>{item.BatchCategory}</option>;
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.selectcourse} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Select Batch</label>
                                                {/* <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Select Batch code" value={value.selectbatchs} name='selectbatchs' onChange={onhandleChange}  /> */}
                                                {/* <pre>{JSON.stringify(selected)}</pre> */}
                                                <MultiSelect
                                                    options={options}
                                                    value={selected}
                                                    onChange={onhandleChange}
                                                    labelledBy="Select Batch "
                                                    name="selctbatch"
                                                />
                                                {/* {batch.map((item) => {
                                                    return (
                                                        <option value={item.Batch_Id}>{item.Batch_code} </option>
                                                    )
                                                })} */}
                                                {<span className="text-danger"> {error.selectbatchs} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Enquiry Type</label>
                                                <select
                                                    class="form-control"
                                                    id="exampleFormControlSelect1"
                                                    value={value.allinquiries}
                                                    name="allinquiries"
                                                    onChange={onhandleChange}
                                                >
                                                    <option value="">Select Enquiry Type</option>
                                                    {status.map((item) => {
                                                        return <option value={item.Id}>{item.Status}</option>;
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Inquiry From</label>
                                                <select
                                                    class="form-control"
                                                    id="exampleFormControlSelect1"
                                                    value={value.all}
                                                    name="all"
                                                    onChange={onhandleChange}
                                                >
                                                    <option value="">Select Inquiry From</option>
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

                                        <button type="submit" class="btn btn-primary mr-2">
                                            Search
                                        </button>
                                        <button type="button" class="btn btn-primary mr-2" onClick={exportToExcel}>
                                            Export to Excel
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className="d-flex justify-content-between" style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">Inquiry Report Details</h4>
                                        </div>
                                    </div>
                                    {
                                        <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                            <StyledDataGrid
                                                rows={rowsWithIds}
                                                columns={columns}
                                                disableColumnFilter
                                                disableColumnSelector
                                                disableDensitySelector
                                                rowHeight={35}
                                                getRowId={(row) => row.id}
                                                pagination
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={setPaginationModel}
                                            pageSizeOptions= {[50]}
                                            autoHeight={false}
                                            sx={{
                                              height: 500, // Ensure enough height for pagination controls
                                              '& .MuiDataGrid-footerContainer': {
                                                justifyContent: 'flex-end',
                                              },
                                            }}
                                            slotProps={{
                                              toolbar: {
                                                showQuickFilter: true,
                                              },
                                            }}
                                            />
                                        </div>
                                    }
                                    {/* <button type="submit" class="btn btn-primary mr-2">Allot Roll Number</button>

                                    <button type='button' onClick={() => {
                                        window.location.reload()
                                    }} class="btn btn-light">Save</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RInquiry;
