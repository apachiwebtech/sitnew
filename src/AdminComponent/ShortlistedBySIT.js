import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { StyledDataGrid } from "./StyledDataGrid";
//import FormControlLabel from '@mui/material/FormControlLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';

const ShortlistedBySIT = () => {
    const [brand, setBrand] = useState([]);
    const [vendordata, setVendorData] = useState([]);
    const [specification, setSpecification] = useState("");
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [error, setError] = useState({});
    const [companyReqData, setCompanyReqData] = useState([]);
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

    const [value, setValue] = useState({
        startdate: "" || uid.startdate,
        enddate: "" || uid.enddate,
        specification: "" || uid.specification,
    });

    useEffect(() => {
        setValue({
            startdate: uid.startdate,
            enddate: uid.enddate,
            specification: uid.specification,
        });
    }, [uid]);

    async function getEmployeeData() {
        axios
            .post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                setBrand(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function getEmployeeData() {
        const data = {
            tablename: "awt_noticeboard",
        };
        axios
            .post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                setVendorData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getCompanyReq();
    }, []);

    const getCompanyReq = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getCompanyRequirement`
            );
            setCompanyReqData(response.data);
        } catch (err) {
            console.log("/getCompanyRequirement error", err);
        }
    };

    useEffect(() => {
        getEmployeeData();
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
            tablename: "awt_noticeboard",
        };
        axios
            .post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_noticeboard",
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

        const data = {
            startdate: value.startdate,
            enddate: value.enddate,
            specification: specification,
            uid: uid.id,
        };

        axios
            .post(`${BASE_URL}/add_noticeboard`, data)
            .then((res) => {
                getEmployeeData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const columns = [
        { field: "CompanyName", headerName: "Company Name", flex: 2 },
        {
            field: "PostedDate",
            headerName: "Posted Date",
            flex: 2,
            renderCell: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if already in DD-MM-YYYY format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return params.value; // Return original value if not a valid date
          
              // Convert valid date to DD-MM-YYYY format
              return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
          },
          
        { field: "Course_Name", headerName: "Course", flex: 2 },
        { field: "Profile", headerName: "Profile", flex: 2 },
        { field: "Location", headerName: "Location", flex: 2 },

        {
            field: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => handleUpdate(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div style={ { border: "1px solid #dce4ec", height: "510px", overflow: "scroll"}}>
                                        <StyledDataGrid
                                            rows={companyReqData}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.CompReqId}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: {
                                                        pageSize: 50,
                                                        page: 0,
                                                    },
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
                                                <p>
                                                    Are you sure you want to
                                                    delete?
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(cid)
                                                    }
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    OK
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleCancel(cid)
                                                    }
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* <div>
                                      <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Excel</button>
                                      </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortlistedBySIT;
