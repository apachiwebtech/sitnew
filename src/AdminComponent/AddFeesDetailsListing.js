import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import { Button } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { StyledDataGrid } from "./StyledDataGrid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import _debounce from "lodash.debounce";
import Select from "@mui/material/Select";

const AddFeesDetailsListing = () => {
    const [cid, setCid] = useState("");
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [loading, setLoading] = useState(true);
    const label = { inputProps: { "aria-label": "Color switch demo" } };
    const [feesdetail, setFeesDetails] = useState([]);
    const [searchwise, setSearchWise] = useState("");
    const [lastStudentId, setLastStudentId] = useState(null);
    const [searchtext, setText] = useState("");
    const [page, setPage] = useState(0); // Current page
    const [pageSize, setPageSize] = useState(10); // Number of records per page
    const [feesDetailsList, setFeesDetailsList] = useState([]);
    const [searchdata, setSearchData] = useState("");
    const [data, setData] = useState([]);
    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [expand, setPageExpand] = useState(false);
    const [paginationModel, setPaginationModel] = useState({

        pageSize: 50,
        page: 0,
    });
    const [value, setValue] = useState({
        studentname: "",
        studentid: "",
        coursename: "",
        batchcode: "",
    });

    // const getFeesDetails = async () => {


    //     try {
    //         setLoading(true);
    //         const data = {
    //             page: page,
    //             pageSize: pageSize,
    //         };
    //         const response = await axios.get(`${BASE_URL}/getFeesDetails`, data);

    //         setFeesDetailsList(response.data);
    //         console.log(response.data);
    //         setLastStudentId(response.data.lastStudentId);
    //         setFeesDetails(response.data.totalCount);
    //         setLoading(false);

    //     } catch (err) {
    //         console.log("getFeesDetails err", err);
    //     }
    // };

    async function getFeesDetails(params) {
        setLoading(true);
        const data = {
            page: page,
            pageSize: pageSize,
        };
        axios.get(`${BASE_URL}/getFeesDetails`, { params: data })
            .then((response) => {
                if (response.data) {
                    console.log(response.data.data);
                    setFeesDetailsList(response.data.data); // Set fetched student data
                    setLastStudentId(response.data.lastStudentId);
                    setFeesDetails(response.data.totalCount);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching fees details:", error);
                setLoading(false);
            });
    }



    useEffect(() => {
        getFeesDetails();
    }, []);

    useEffect(() => {
        getFeesDetails(page, pageSize);
    }, [page, pageSize]);


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

    const handleDelete = (id) => {
        const data = {
            delete_id: id,
            tablename: "S_Fees_Mst",
            column_name: "Fees_Id",
        };

        axios
            .post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getFeesDetails()
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    async function getstudents(searchtext) {
        axios.post(`${BASE_URL}/getAdmittedStudent`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }
    async function getBatchcode(searchtext) {
        axios.post(`${BASE_URL}/getSearchBatch`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }

    async function getEmail(searchtext) {
        axios.post(`${BASE_URL}/getSearchEmail`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }

    async function getCourse(searchtext) {
        axios.post(`${BASE_URL}/getSearchInquiryCourse`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }
    async function getMobile(searchtext) {
        axios.post(`${BASE_URL}/getSearchMobile`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }

    const onsearchformSumbit = (e) => {
        e.preventDefault();

        const data = {
            searchwise: searchwise,
            search: searchdata,
        };

        axios.post(`${BASE_URL}/getsearchqueryresult`, data).
            then((res) => {
                setFeesDetailsList(res.data.data);
                console.log(res.data)
                setFeesDetails(res.data.totalCount);
            });
    };

    const handlesearchselect = (value) => {
        setSearchWise(value);


        if (value == "BatchWise") {
            getBatchcode();
        }
        if (value == "EmailWise") {
            getEmail();
        }
    };

    const handleSearchChange = (newValue) => {
        setSelectedStudent(newValue); // Update state

        if (searchwise == "NameWise") {
            setSearchData(newValue?.Student_Id);
        }
        if (searchwise == "BatchWise") {
            setSearchData(newValue?.Batch_code);
        }
        if (searchwise == "EmailWise") {
            setSearchData(newValue?.Email);
        }
        if (searchwise == "MobileWise") {
            setSearchData(newValue?.Present_Mobile);
        }
        if (searchwise == "CourseWise") {
            setSearchData(newValue?.Course_Id);
        }
    };
    const handleInputChange = _debounce((newValue) => {
        console.log(newValue);
        setText(newValue);

        if (searchwise == "BatchWise") {
            getBatchcode(newValue);
        }
        if (searchwise == "NameWise") {
            getstudents(newValue);
        }
        if (searchwise == "EmailWise") {
            getEmail(newValue);
        }
        if (searchwise == "MobileWise") {
            getMobile(newValue);
        }
        if (searchwise == "CourseWise") {
            getCourse(newValue);
        }
    }, 500);

    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value == 0 ? 1 : 0;

        axios
            .post(`${BASE_URL}/data_status`, {
                status: newval,
                Inquiry_Id: Inquiry_Id,
                table_name: "awt_addfeesdetails",
            })
            .then((res) => {
                console.log(res);
            });
    };
    const getFeesDetailsById = async (Fees_Id) => {
        try {
            const response = await axios.post(`${BASE_URL}/getFeesDetailsById`, {
                Fees_Id,
            });

            console.log(response.data);
        } catch (err) {
            console.log("getFeesDetailsById err", err);
        }
    };


    const columns = [
        { field: "Fees_Code", headerName: "Receipt No", width: 100 },
        {
            field: "RDate",
            headerName: "Receipt Date",
            width: 100,
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
        { field: "Student_Name", headerName: "Student Name", width: 250 },
        { field: "Course_Name", headerName: "Course Name", width: 400 },
        { field: "Batch_code", headerName: "Batch Code", width: 100 },

        // {
        //     field: "Date_Added",
        //     headerName: "Date",
        //     width: 100,
        //     renderCell: (params) => {
        //       if (!params.value) return ""; // Handle empty values

        //       // Check if already in DD-MM-YYYY format
        //       const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
        //       if (ddmmyyyyRegex.test(params.value)) {
        //         return params.value; // Return as-is if already formatted
        //       }

        //       const date = new Date(params.value);
        //       if (isNaN(date.getTime())) return ""; // Handle invalid dates

        //       // Convert to DD-MM-YYYY format
        //       return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
        //     },
        //   },

        // { field: "Payment_Type", headerName: "Payment Type", width: 100 },
        { field: "Amount", headerName: "Amount", width: 130 },
        // { field: "Notes", headerName: "Particular", width: 350 },
        {
            field: "actions",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/addfeesdetails/${params.row.Fees_Id}`}>
                            <EditIcon style={{ cursor: "pointer" }}
                                onClick={() => getFeesDetailsById(params.Fees_Id)} />
                        </Link>
                        <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleClick(params.row.Fees_Id)}
                        />
                        <Switch
                            {...label}
                            onChange={() => handleswitchchange(params.row.isActive, params.row.id)}
                            defaultChecked={params.row.isActive == 0 ? false : true}
                            color="secondary"
                        />
                    </>
                );
            },
        },
    ];

    // const rowsWithIds = feesdetail.map((row, index) => ({ index: index + 1, ...row }));

    return (
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div
                                        className="d-flex justify-content-between gap-3"
                                        style={{ borderBottom: "2px solid #dce4ec", width: "100%", padding: "10px 0", }}
                                    >
                                        <form className="row align-items-center" onSubmit={onsearchformSumbit}>
                                            {/* <h4 class="card-title">Student Information</h4> */}

                                            <div class="form-group col-lg-3">
                                                <FormControl fullWidth size="small">
                                                    <InputLabel id="demo-simple-select-label">
                                                        Select Search
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={searchwise}
                                                        label="Select Search"
                                                        onChange={(e) => handlesearchselect(e.target.value)}
                                                    >
                                                        <MenuItem value={`Select`}>Select</MenuItem>
                                                        <MenuItem value={`NameWise`}>Name Wise</MenuItem>
                                                        <MenuItem value={`BatchWise`}>Batch Wise</MenuItem>
                                                        <MenuItem value={`CourseWise`}>Course Wise</MenuItem>
                                                        <MenuItem value={`EmailWise`}>Email Wise</MenuItem>
                                                        <MenuItem value={`MobileWise`}>Mobile Wise</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div class="form-group col-lg-5">
                                                <Autocomplete
                                                    size="small"
                                                    disablePortal
                                                    options={data} // Pass the array of student objects
                                                    getOptionLabel={
                                                        (option) =>
                                                            searchwise === "NameWise"
                                                                ? option.Student_Name
                                                                : searchwise === "BatchWise"
                                                                    ? option.Batch_code
                                                                    : searchwise === "EmailWise"
                                                                        ? option.Email
                                                                        : searchwise === "MobileWise"
                                                                            ? option.Present_Mobile
                                                                            : searchwise === "CourseWise"
                                                                                ? option.Course_Name
                                                                                : "" // Provide a default fallback
                                                    } // Dynamically display the label based on `searchdata`
                                                    value={selectedStudent} // Use a state to manage the selected value
                                                    onChange={(e, newValue) => handleSearchChange(newValue)} // `newValue` is the selected object
                                                    onInputChange={(e, newInputValue) =>
                                                        handleInputChange(newInputValue)
                                                    } // Capture typed input
                                                    renderOption={(props, option) => (
                                                        <li {...props} key={option.Student_Id}>
                                                            {searchwise === "NameWise"
                                                                ? option.Student_Name
                                                                : searchwise === "BatchWise"
                                                                    ? option.Batch_code
                                                                    : searchwise === "EmailWise"
                                                                        ? option.Email
                                                                        : searchwise === "MobileWise"
                                                                            ? option.Present_Mobile
                                                                            : searchwise === "CourseWise"
                                                                                ? option.Course_Name
                                                                                : ""}{" "}
                                                            {/* Dynamically render the option */}
                                                        </li>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Enter.." />
                                                    )} // Render the input field
                                                />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <Button
                                                    type="submit"
                                                    onClick={() => {
                                                        setPageExpand();
                                                    }}
                                                    variant="contained"
                                                >
                                                    Search
                                                </Button>
                                            </div>
                                            <div className="form-group col-lg-2">
                                                <Button
                                                    type="submit"
                                                    onClick={() => {
                                                        window.location.reload();
                                                    }}
                                                    variant="contained"
                                                >
                                                    Clear
                                                </Button>
                                            </div>
                                        </form>
                                        <Link to="/addfeesdetails/:addfeesdetailsid">
                                            {" "}
                                            <button className="btn btn-success">Add +</button>
                                        </Link>
                                    </div>

                                    <div>
                                        <StyledDataGrid
                                            rows={feesDetailsList}
                                            columns={columns}
                                            pageSize={pageSize}
                                            page={page}
                                            rowHeight={37}
                                            pagination={false}
                                            disableColumnSelector
                                            disableDensitySelector
                                            getRowId={(row) => row.Fees_Id}
                                            hideFooter
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 100, page: 0 },
                                                },
                                            }}
                                            slots={{
                                                toolbar: GridToolbar
                                            }}

                                        />

                                        <div className="float-right py-2 mt-3">
                                            <button
                                                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                                disabled={page === 0} // Disable the "Previous" button on the first page
                                            >
                                                Previous
                                            </button>

                                            <span>Page {page + 1}</span>

                                            <button style={{ marginRight: "50px" }}
                                                onClick={() => setPage((prev) => prev + 1)}
                                                disabled={!lastStudentId} // Disable the "Next" button if there is no lastStudentId (i.e., no data)
                                            >
                                                Next
                                            </button>
                                        </div>

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

export default AddFeesDetailsListing;
