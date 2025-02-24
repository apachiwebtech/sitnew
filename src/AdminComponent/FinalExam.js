import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
// import Box from '@mui/material/Box';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
// import MyDocument1 from './MyDocument1';
import { pdf } from "@react-pdf/renderer";
import MyDocument3 from "./MyDocument3";
import TestDocument from "./TestDocument";
const FinalExam = () => {
    const [brand, setBrand] = useState([]);
    const [vendordata, setVendorData] = useState([]);
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [data, setData] = useState([]);
    const [course, SetCourse] = useState([]);
    const [error, setError] = useState({});
    const [student, setstudent] = useState([]);
    const [Courseid, setCourseid] = useState([]);
    // const [selectoption, setselectoption] = useState([])
    const [AnnulBatch, setAnnulBatch] = useState([]);
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    // const children = (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    //       <FormControlLabel
    //         label="Child 1"
    //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label="Child 2"
    //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );

    const [value, setValue] = useState({
        batch: "" || uid.batch,
        course: "" || uid.course,
        row_radio_buttons_group: "" || uid.row_radio_buttons_group,
    });

    useEffect(() => {
        setValue({
            batch: uid.batch,
            course: uid.course,
            row_radio_buttons_group: uid.row_radio_buttons_group,
        });
    }, [uid]);

    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}

    //    if (!value.college) {
    //     isValid = false;
    //     newErrors.name = "Name is require"
    //    }
    //     if (!value.email) {
    //         isValid = false;
    //         newErrors.email = "Email is require"
    //     }
    //     setError(newErrors)
    //     return isValid
    // }

    async function getEmployeeData() {
        axios
            .post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data);
                setBrand(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function getEmployeeData() {
        const data = {
            tablename: "awt_employeerecord",
        };
        axios
            .post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data);
                setVendorData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getEmployeeData();
        getCourseData();
        value.title = "";
        setError({});
        setUid([]);
    }, []);

    const handleClick = (id) => {
        setCid(id);
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };

    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleUpdate = (id) => {
        const data = {
            u_id: id,
            tablename: "awt_employeerecord",
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

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_employeerecord",
        };

        axios
            .post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getEmployeeData();
            })
            .catch((err) => {
                console.log(err);
            });

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if(validateForm()){
        const data = {};

        axios
            .post(`${BASE_URL}/add_employeerecord`, data)
            .then((res) => {
                console.log(res);
                getEmployeeData();
            })
            .catch((err) => {
                console.log(err);
            });
        // }
    };

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

    const getstudent = async (Id) => {
        const data = {
            batch_code: Id,
        };
        try {
            const res = await axios.post(`${BASE_URL}/getbatchwisestudent`, data);
            setstudent(res.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const getbatch = async (Visit_Id) => {
        if (Visit_Id != undefined) {
            setCourseid(Visit_Id);

            const data = {
                courseid: Visit_Id,
            };

            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                setAnnulBatch(res.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            const data = {
                tablename: "Batch_Mst",
                columnname: "Batch_Id,Batch_code",
            };
            axios
                .post(`${BASE_URL}/get_new_data`, data)
                .then((res) => {
                    setAnnulBatch(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if ([e.target.name] == "course") {
            getbatch(e.target.value);
        }
        if ([e.target.name] == "batch") {
            getstudent(e.target.value);
        }
    };

    const columns = [
        {
            field: "index",
            headerName: "Id",
            type: "number",
            align: "center",
            headerAlign: "center",
            flex: 1,
            filterable: false,
        },
        { field: "attendee", headerName: "Attendee", flex: 2 },
        { field: "instructor", headerName: "Instructor", flex: 2 },
        { field: "description", headerName: "Description", flex: 2 },
        { field: "feedback", headerName: "FeedBack", flex: 2 },

        {
            field: "actions",
            type: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                        <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleClick(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    async function downloadPDF(id) {
        axios
            .post(`${BASE_URL}/getfinalreport`, { Batch_Id: id })
            .then((res) => {
                setData(res.data);

                Blob(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const Blob = async (data) => {
        try {
            // Generate PDF
            //   const blob = await pdf(<MyDocument3 data={data} />).toBlob();
            const blob = await pdf(<TestDocument data={data} />).toBlob();

            const url = URL.createObjectURL(blob);

            // Display PDF in a new tab
            window.open(url);

            // Optionally, if you still want to offer a download link:
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = 'admission.pdf';
            // a.click();

            // Clean up the object URL
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error generating PDF:", err);
        }

        // const blob = await pdf(<MyDocument3 data={data} />).toBlob();
        // const url = URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'admission.pdf';
        // a.click();
        // // URL.revokeObjectURL(url);
    };

    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (
        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Final Exam</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="row">
                                            <div class="from-group col-lg-12">
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        onChange={onhandleChange}
                                                        defaultValue={`1`}
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row_radio_buttons_group"
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            control={<Radio />}
                                                            label="Batchwise"
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            control={<Radio />}
                                                            label="Studentwise"
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">
                                                    Select Course<span className="text-danger">*</span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    value={value.course}
                                                    onChange={onhandleChange}
                                                    name="course"
                                                >
                                                    <option>Select</option>
                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        );
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">
                                                    Select Batch<span className="text-danger">*</span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    value={value.batch}
                                                    onChange={onhandleChange}
                                                    name="batch"
                                                >
                                                    <option>Select</option>
                                                    {AnnulBatch.map((item) => {
                                                        return <option value={item.Batch_Id}>{item.Batch_code}</option>;
                                                    })}
                                                </select>
                                            </div>
                                            {value.row_radio_buttons_group === "2" && (
                                                <div class="form-group col-lg-4">
                                                    <label for="exampleFormControlSelect1">
                                                        Select Student<span className="text-danger">*</span>{" "}
                                                    </label>
                                                    <select
                                                        class="form-control form-control-lg"
                                                        id="exampleFormControlSelect1"
                                                        value={value.student}
                                                        onChange={onhandleChange}
                                                        name="studee"
                                                    >
                                                        <option>Select</option>

                                                        {student &&
                                                            student.map((item) => {
                                                                return (
                                                                    <option value={item.Student_Id}>
                                                                        {item.Student_Name}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                            )}
                                        </div>

                                        <button type="submit" className="btn btn-primary mr-2 ">
                                            Excel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary mr-2"
                                            onClick={() => downloadPDF(value.batch)}
                                        >
                                            Show
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                            class="btn btn-primary mr-2  "
                                        >
                                            Back
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h4 class="card-title">Final Exam</h4>
                                        </div>
                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                            slots={{ toolbar: GridToolbar }}
                                            slotProps={{
                                                toolbar: {
                                                    showQuickFilter: true,
                                                },
                                            }}
                                        />

                                        {confirmationVisibleMap[cid] && (
                                            <div className="confirm-delete">
                                                <p>Are you sure you want to delete?</p>
                                                <button
                                                    onClick={() => handleDelete(cid)}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    OK
                                                </button>
                                                <button
                                                    onClick={() => handleCancel(cid)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
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

export default FinalExam;
