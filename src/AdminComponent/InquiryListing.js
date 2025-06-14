import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { Button } from "@mui/material";
import Loader from "./Loader";
import { styled } from "@mui/material/styles";
import { SidebarContext } from "../context/SideBarContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { StyledDataGrid } from "./StyledDataGrid";
import { param } from "jquery";
import _debounce from "lodash.debounce";
import { formatDate } from "../Utils/dateFormat";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import Cookies from "js-cookie";





const InquiryListing = () => {
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const { isSidebarOpen } = useContext(SidebarContext);
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [searchwise, setSearchWise] = useState("");
    const label = { inputProps: { "aria-label": "Color switch demo" } };
    const [loading, setLoading] = useState(true);
    const [inquiryData, setInquiryData] = useState([]);
    const [expand, setPageExpand] = useState(false);
    const [searchdata, setSearchData] = useState("");
    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [data, setData] = useState([]);
    const [searchtext, setText] = useState("");
    const [lastStudentId, setLastStudentId] = useState(null);
    const [page, setPage] = useState(0);
    const [totalstudent, setTotalStudent] = useState("");
    const [pageSize, setPageSize] = useState(50);
    const [value, setValue] = useState({
        from_date: "",
        to_date: "",
    });
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });

    const getInquiryData = async () => {
        setLoading(true);
        const payload = {
            page: page,
            pageSize: pageSize,
        };

        axios.post(`${BASE_URL}/getadmissionactivity`, payload).then((res) => {
            setInquiryData(res.data.data);
            setLastStudentId(res.data.lastStudentId);
            setTotalStudent(res.data.totalCount);
            setLoading(false);
        });
    };

    useEffect(() => {
        if (localStorage.getItem("searchwise") && localStorage.getItem("searchdata")) {
            setSearchWise(localStorage.getItem("searchwise"));
            setSearchData(localStorage.getItem("searchdata"));
            fetchSearchInquiry();
        } else {

            // getInquiryData();
            getInquiryData(page, pageSize);
        }
    }, [page, pageSize]);


    const fetchSearchInquiry = () => {
        const data = {
            searchwise: searchwise || localStorage.getItem("searchwise"),
            search: searchdata || localStorage.getItem("searchdata") || "",
        };

        axios.post(`${BASE_URL}/getserchInquiry`, data).then((res) => {
            setInquiryData(res.data);
            setLoading(false);

            if(searchwise && searchdata){
                localStorage.setItem("searchwise", searchwise);
                localStorage.setItem("searchdata", searchdata);
            }

        });
    };

    const onsearchformSumbit = (e) => {
        e.preventDefault();
        fetchSearchInquiry();
    };



    const handlesearchselect = (value) => {
        setSearchWise(value);

        if (value == "BatchWise") {
            getBatchcode();
        }
        if (value == "EmailWise") {
            getEmail();
        }
        if (value == "MobileWise") {
            getMobile();
        }
        if (value == "CourseWise") {
            getCourse();
        }
    };


    const handleSearchChange = (newValue) => {
        setSelectedStudent(newValue); // Update state

        console.log(newValue, "Value")

        if (searchwise == "NameWise") {
            setSearchData(newValue?.Inquiry_Id);
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

    async function getstudents(searchtext) {
        axios.post(`${BASE_URL}/getInquiryStudents`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }
    async function getBatchcode(searchtext) {
        axios.post(`${BASE_URL}/getSearchBatch`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }

    async function getEmail(searchtext) {
        axios.post(`${BASE_URL}/getSearchInquiryEmail`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }
    async function getMobile(searchtext) {
        axios.post(`${BASE_URL}/getSearchInquiryMobile`, { param: searchtext }).then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }
    async function getCourse(searchtext) {
        axios.post(`${BASE_URL}/getSearchInquiryCourse`, { param: searchtext }).then((res) => {
            setData(res.data);
        });
    }

    useEffect(() => {
        if (localStorage.getItem("searchwise") && localStorage.getItem("searchdata")) {
            fetchSearchInquiry();
            setSearchWise(localStorage.getItem("searchwise"));
            setSearchData(localStorage.getItem("searchdata"));
        } else {

            getInquiryData();
        }
        setError({});
        setUid([]);
    }, []);


    const handleInputChange = _debounce((newValue) => {
        setText(newValue);


        console.log(newValue, "%$^&*(*")

        if (searchwise == "BatchWise") {
            getBatchcode(newValue);
            setSearchData(newValue)
        }
        if (searchwise == "NameWise") {
            getstudents(newValue);
            setSearchData(newValue)
        }
        if (searchwise == "EmailWise") {
            getEmail(newValue);
            setSearchData(newValue)
        }
        if (searchwise == "MobileWise") {
            getMobile(newValue);
            setSearchData(newValue)
        }
        if (searchwise == "CourseWise") {
            getCourse(newValue);
            setSearchData(newValue)
        }
    }, 500);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.from_date || value.to_date) {
        } else {
            alert("Nothing Is Select");
            return;
        }
        if (value.from_date) {
            if (value.to_date) {
            } else {
                alert("Please select to date");
                return;
            }
        } else {
            if (value.to_date) {
                alert("Please select from date");
                return;
            }
        }
        setLoading(true);
        const data = {
            from_date: value.from_date,
            to_date: value.to_date,
        };

        axios
            .post(`${BASE_URL}/getfilterinqury`, data)
            .then((res) => {
                console.log(res);
                setInquiryData(res.data);
                setLoading(false);
                setUid([]);
                setValue({
                    from_date: "",
                    to_date: "",
                });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

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
                alert("Status changed...");
                getInquiryData();
            });
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                {/* <GridToolbarExport /> */}
                <GridToolbarFilterButton />
            </GridToolbarContainer>
        );
    }
 const roledata = {
        role: Cookies.get(`role`),
        pageid: 22,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);
    const columns = [
        {
            field: "Student_Name",
            headerName: "Student Name",
            width: 180,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? (
                            <p className="text-danger font-12">{params.row.Student_Name}</p>
                        ) : (
                            <p className="font-12">{params.row.Student_Name}</p>
                        )}
                    </>
                );
            },
        },
        {
            field: "Course_Name",
            headerName: "Course Name",
            width: 280,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? (
                            <p className="text-danger font-12">{params.row.Course_Name}</p>
                        ) : (
                            <p className="font-12">{params.row.Course_Name}</p>
                        )}
                    </>
                );
            },
        },
        {
            field: "inquiry_DT",
            headerName: "Inquiry Date",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? (
                            <p className="text-danger font-12">{formatDate(params.row.inquiry_DT)}</p>
                        ) : (
                            <p className="font-12">{formatDate(params.row.inquiry_DT)}</p>
                        )}
                    </>
                );
            },
        },
        {
            field: "Discussion",
            headerName: "Discussion",
            width: 390,
            renderCell: (params) => {
                const isUnread = params.row.IsUnread === 0;

                return (
                    <div
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: "1.4",
                            maxHeight: "2.8em",
                        }}
                    >
                        <p
                            className={`font-12 ${isUnread ? "text-danger" : ""}`}
                            style={{
                                margin: 0,
                                whiteSpace: "normal",
                            }}
                        >
                            {params.row.Discussion}
                        </p>
                    </div>
                );
            },
        },


        {
            field: "present_mobile",
            headerName: "Mobile",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? (
                            <p className="text-danger font-12">{params.row.present_mobile}</p>
                        ) : (
                            <p className="font-12">{params.row.present_mobile}</p>
                        )}
                    </>
                );
            },
        },
        {
            field: "Email",
            headerName: "Email",
            width: 250,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? (
                            <p className="text-danger font-12">{params.row.Email}</p>
                        ) : (
                            <p className="font-12">{params.row.Email}</p>
                        )}
                    </>
                );
            },
        },
        {
            field: "Deciplin",
            headerName: "Discipline",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? (
                            <p className="text-danger font-12">{params.row.Deciplin}</p>
                        ) : (
                            <p className="font-12">{params.row.Deciplin}</p>
                        )}
                    </>
                );
            },
        },
        {
            field: "Inquiry_type",
            headerName: "Inquiry type",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? (
                            <p className="text-danger font-12">{params.row.Inquiry_type}</p>
                        ) : (
                            <p className="font-12">{params.row.Inquiry_type}</p>
                        )}
                    </>
                );
            },
        },
        {
            field: "Status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? (
                            <p className="text-danger font-12">{params.row.Status}</p>
                        ) : (
                            <p className="font-12">{params.row.Status}</p>
                        )}
                    </>
                );
            },
        },
        ...(roleaccess > 2 ? [{
            field: "actions",
            type: "actions",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess > 2 && <Link to={`/inquiry/${params.row.id}`}>
                            <EditIcon style={{ cursor: "pointer" }} />
                        </Link>}

                        {roleaccess > 3 && <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleClick(params.row.id)}
                        />}
                        {roleaccess > 2 && <Switch
                            {...label}
                            onChange={() => handleswitchchange(params.row.isActive, params.row.id)}
                            defaultChecked={params.row.isActive == 0 ? false : true}
                            color="secondary"
                        />}

                    </>
                );
            },
        },] : [])
    ];
    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const rowsWithIds = inquiryData.map((row, index) => ({ index: index + 1, ...row }));

    // const paginationModel = (param) => {
    //     console.log(param);
    // };


   

    const cleardata = () => {
        localStorage.removeItem("searchwise");
        localStorage.removeItem("searchdata");
        window.location.reload();
    }

    return (
        <div className={`container-fluid page-body-wrapper `}>
            <InnerHeader />
            {loading && <Loader />}

            {roleaccess > 1 && <div className="main-panel" style={{ display: loading ? "none" : "block" }}>
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="">
                                {/* <div className="card-body"> */}

                                <div className="card">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <div className="px-3 m-2">
                                                {/* <form class="forms-sample row py-1 " onSubmit={handleSubmit}>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">From Date <span className='text-danger'>*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="from_date" name='from_date' onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">To Date <span className='text-danger'>*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="to_date" name='to_date' onChange={onhandleChange} />
                                            </div>
                                            <div className='d-flex align-items-center mt-3 col-lg-3' >
                                                <button type="submit" class="btn btn-sm btn-primary mr-2">Submit</button>
                                                <button type='reset' onClick={() => getInquiryData()} class="btn btn-sm btn-primary mr-2">Clear</button>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="m-2 float-right">
                                                    <Link to='/onlineinquiry/inquiryform/:inquiryid'> <button className='btn btn-success'>Add +</button></Link>
                                                </div>
                                            </div>
                                          </form> */}
                                                <form className="row align-items-center" onSubmit={onsearchformSumbit}>
                                                    {/* <h4 class="card-title">Student Information</h4> */}

                                                    <div class="col-lg-3">
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

                                                    <div class=" col-lg-5">
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
                                                                                        : localStorage.getItem("searchdata") // Provide a default fallback
                                                            }
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

                                                    <div class=" col-lg-2">
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
                                                    <div className=" col-lg-2">
                                                        <Button
                                                            type="submit"
                                                            onClick={cleardata}
                                                            variant="contained"
                                                        >
                                                            Clear
                                                        </Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="col-lg-5">
                                            <div className="m-2 float-right">
                                                <span className="mx-4">Total Inquiry : {totalstudent}</span>
                                                {roleaccess > 1 && <Link to="/onlineinquiry/inquiryform/:inquiryid">
                                                    {" "}
                                                    <button className="btn btn-success">Add +</button>
                                                </Link>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card" style={{ height: "600px", overflow: "hidden", border: "nono" }}>
                                    <StyledDataGrid
                                        rows={rowsWithIds}
                                        columns={columns}
                                        disableColumnSelector
                                        disableDensitySelector
                                        rowHeight={40}
                                        pageSizeOptions={[5]}
                                        paginationMode="server"
                                        onPaginationModelChange={paginationModel}
                                        getRowId={(row) => row.id}
                                        hideFooter
                                        sx={{
                                            "& .MuiDataGrid-cell": {
                                                borderRight: "1px solid #ccc", // Add border to cells
                                            },
                                            "& .MuiDataGrid-columnHeaders": {
                                                //   borderBottom: "2px solid #000", // Add border below header
                                            },
                                        }}
                                    //   slots={{
                                    //     toolbar: GridToolbar
                                    // }}
                                    // pagination
                                    //     paginationModel={paginationModel}
                                    //     onPaginationModelChange={setPaginationModel}
                                    //     pageSizeOptions= {[50]}
                                    //     autoHeight={false}
                                    //     sx={{
                                    //       height: 500, // Ensure enough height for pagination controls
                                    //       '& .MuiDataGrid-footerContainer': {
                                    //         justifyContent: 'flex-end',
                                    //       },
                                    //     }}
                                    //     slotProps={{
                                    //       toolbar: {
                                    //         showQuickFilter: true,
                                    //       },
                                    //     }}
                                    />
                                    <div className="float-right py-2 mt-2  " style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
                                        <button style={{ marginRight: "0px" }}
                                            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                            disabled={page === 0} // Disable the "Previous" button on the first page
                                        >
                                            Previous
                                        </button>

                                        <span style={{ marginRight: "0px" }}>Page {page + 1}</span>

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
                                            <button onClick={() => handleCancel(cid)} className="btn btn-sm btn-danger">
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    );
};

export default InquiryListing;
