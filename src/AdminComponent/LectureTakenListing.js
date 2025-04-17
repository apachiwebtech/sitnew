import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import Loader from "./Loader";
import { StyledDataGrid } from "./StyledDataGrid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import { Button, Switch } from "@mui/material";
import _debounce from "lodash.debounce";

const LectureTakenListing = () => {
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const label = { inputProps: { "aria-label": "Color switch demo" } };
    const [lecturetakendata, setlecturetakendata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0); // Current page
    const [pageSize, setPageSize] = useState(10); // Number of records per page
    const [lastStudentId, setLastStudentId] = useState(null);
    const [searchwise, setSearchWise] = useState("");
    const [searchdata, setSearchData] = useState("");
    const [students, setStudents] = useState([]);
    const [data, setData] = useState([]);
    const [searchtext, setText] = useState("");
    const [expand, setPageExpand] = useState(false);
    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [totalstudent, setTotalStudent] = useState("");
    const [isSearchResult, setIsSearchResult] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });

    const getLectureTakenData = async () => {
        setLoading(true); // Set loading to true before the request

        const data = {
            page: page,
            pageSize: pageSize,
        };

        try {
            const response = await fetch(`${BASE_URL}/getlecturetakendata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // Serialize the data to JSON
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const newdata = await response.json();
            setlecturetakendata(newdata.data);
            setLastStudentId(newdata.lastTakeId);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Ensure loading is set to false after the request
        }
    };

    //Search Section

    async function getstudents() {
        axios.post(`${BASE_URL}/getAdmittedStudent`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }
    async function getBatchcode() {
        axios.post(`${BASE_URL}/getSearchLectureBatch`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }

    async function getEmail() {
        axios.post(`${BASE_URL}/getSearchEmail`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }

    const onsearchformSumbit = (e) => {
        e.preventDefault();

        const data = {
            searchwise: searchwise,
            search: searchdata,
        };

        axios.post(`${BASE_URL}/getlectureserchresult`, data).then((res) => {
            setIsSearchResult(true);
            setlecturetakendata(res.data);
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
    };

    const handleInputChange = _debounce((newValue) => {
        console.log(newValue);
        setText(newValue);

        if (searchwise == "BatchWise") {
            getBatchcode();
        }
        if (searchwise == "NameWise") {
            getstudents();
        }
        if (searchwise == "EmailWise") {
            getEmail();
        }
    }, 500);

    useEffect(() => {
        // getLectureTakenData()
        setError({});
        setUid([]);
    }, []);

    useEffect(() => {
        getLectureTakenData(page, pageSize);
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
        const confirm = window.confirm("Are you sure?");

        const data = {
            delete_id: id,
            tablename: "lecture_taken_master",
            column_name: "Take_Id",
        };

        axios
            .post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getLectureTakenData();
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
            .post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "awt_lecturetaken" })
            .then((res) => {
                console.log(res);
                getLectureTakenData();
                setLoading(false);
            });
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
        { field: "Topic", headerName: "Lecture", flex: 2 },
        {
            field: "Take_Dt",
            headerName: "Date",
            flex: 2,
            valueGetter: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Regex to check if the date is already in DD-MM-YYYY format
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
          
        { field: "Batch_Id", headerName: "Batch Code", flex: 2 },
        { field: "Topic", headerName: "Topic", flex: 2 },
        { field: "Faculty_Id", headerName: "Faculty Name", flex: 2 },
        {
            field: "actions",
            type: "actions",
            headerName: "Action",
            flex: 2,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/lecturetaken/${params.row.Take_Id}`}>
                            <EditIcon style={{ cursor: "pointer" }} />
                        </Link>
                        <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleClick(params.row.Take_Id)}
                        />
                        {/* <Switch {...label} onChange={() => handleswitchchange(params.row.isActive, params.row.id)} defaultChecked={params.row.isActive == 0 ? false : true} color="secondary" /> */}
                    </>
                );
            },
        },
    ];

    const rowsWithIds = lecturetakendata.map((row, index) => ({ index: index + 1, ...row }));

    return (
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />

            {loading && <Loader />}

            <div className="main-panel" style={{ display: loading ? "nonr" : "Block" }}>
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row " style={{ width: "100%", padding: "10px 0" }}>
                                        <div className="col-lg-7 " >
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
                                                <div className="form-group col-lg-2" >
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
                                        </div>

                                        <div className="col-lg-5">
                                            <p className="float-right">
                                                <b>Total Student :</b>
                                                {totalstudent}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="d-flex justify-content-between gap-3"
                                        style={{ width: "100%", padding: "10px 0" }}
                                    >
                                        <div>
                                            <h4 class="card-title">Add Lecture Details</h4>
                                        </div>
                                        <Link to="/lecturetaken/:lecturetakenid">
                                            {" "}
                                            <button className="btn btn-success">Add +</button>
                                        </Link>
                                    </div>

                                    <div >
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // pageSize={pageSize}
                                            // page={page}
                                            // pagination={isSearchResult}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row, index) => row.Take_Id}
                                            // autoHeight
                                            pagination
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={setPaginationModel}
                                            pageSizeOptions= {[50]}
                                            hideFooter
                                            autoHeight={false}
                                            sx={{
                                              height: 500, // Ensure enough height for pagination controls
                                              '& .MuiDataGrid-footerContainer': {
                                                justifyContent: 'flex-end',
                                                borderBottom: "1px solid #dce4ec"
                                              },
                                              "& .MuiDataGrid-cell": {
                                            //   borderRight: "1px solid #ccc",
                                              borderLeft: "1px solid #dce4ec"
                                               // Add border to cells
                                            },
                                            "& .MuiDataGrid-columnHeaders": {
                                                // borderRight: "1px solid #ccc",
                                                borderTop: "1px solid #dce4ec",
                                                borderLeft: "1px solid #dce4ec",
                                                borderRight: "1px solid #dce4ec"
                                                 // Add border below header
                                                },
                                            }}
                                            slots={{
                                                toolbar: GridToolbar
                                            }}
                                            // slotProps={{
                                            //   toolbar: {
                                            //     showQuickFilter: true,
                                            //   },
                                            // }}
                                            // slots={{ toolbar: GridToolbar }}
                                            // slotProps={{
                                            //     toolbar: {
                                            //         showQuickFilter: true,
                                            //     },
                                            // }}
                                        />
                                        {!isSearchResult && (
                                            <div className="float-right py-2">
                                                <button
                                                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                                    disabled={page === 0} // Disable the "Previous" button on the first page
                                                >
                                                    Previous
                                                </button>

                                                <span>Page {page + 1}</span>

                                                <button style={{marginRight:"50px"}}
                                                    onClick={() => setPage((prev) => prev + 1)}
                                                    disabled={!lastStudentId} // Disable the "Next" button if there is no lastStudentId (i.e., no data)
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        )}

                                        {confirmationVisibleMap[cid] && (
                                            <div className="confirm-delete" >
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

export default LectureTakenListing;
