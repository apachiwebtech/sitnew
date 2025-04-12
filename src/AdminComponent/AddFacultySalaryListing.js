import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { StyledDataGrid } from "./StyledDataGrid";

const AddFacultySalaryListing = () => {
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { "aria-label": "Color switch demo" } };
    const [inquiryData, setInquiryData] = useState([]);
    const [facultySalaryData, setFacultySalaryData] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });

    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getaddfacultysalarydata`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        setInquiryData(data);
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

    const handleUpdate = (id) => {
        const data = {
            u_id: id,
            tablename: "awt_addfeesdetails",
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
            tablename: "awt_addfeesdetails",
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

    useEffect(() => {
        getFacultySalary();
    }, []);

    const getFacultySalary = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getFacultySalary`);
            setFacultySalaryData(response.data);
        } catch (err) {
            console.log("getFacultySalary error", err);
        }
    };

    const columns = [
        { field: "Faculty_Name", headerName: "Faculty Name", flex: 1 },
        { field: "Faculty_Code", headerName: "Faculty Code", flex: 1 },
        {
            field: "Payment_Dt",
            headerName: "Date",
            flex: 1,
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
          
        { field: "Sal_Month", headerName: "Month", flex: 1 },
        { field: "Sal_Year", headerName: "Year", flex: 1 },
        { field: "Total_Hours", headerName: "Total Hours", flex: 1 },
        { field: "Tot_Inc", headerName: "Total Inc.", flex: 1 },
        { field: "Total_Ded", headerName: "Total Ded.", flex: 1},
        { field: "Net_Payment", headerName: "Net Payment", flex: 1 },
        { field: "Payment_Type", headerName: "Payment Type", flex: 1 },
        { field: "Cheque_No", headerName: "Cheque No", flex: 1 },
        {
            field: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/addfacultysalry/${params.row.Salary_Id}`}>
                            <EditIcon style={{ cursor: "pointer" }} />
                        </Link>
                        <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleClick(params.row.id)}
                        />
                        <Switch
                            {...label}
                            onChange={() => console.log("1")}
                            defaultChecked={params.row.isActive == 0 ? false : true}
                            color="secondary"
                        />
                    </>
                );
            },
        },
    ];

    const rowsWithIds = inquiryData.map((row, index) => ({
        index: index + 1,
        ...row,
    }));

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
                                        style={{
                                            width: "100%",
                                            padding: "10px 0",
                                            borderBottom: "2px solid #dce4ec",
                                        }}
                                    >
                                        <div>
                                            <h4 class="card-title">View Faculty Salary</h4>
                                        </div>
                                        <Link to="/addfacultysalary/:addfacultysalaryid">
                                            {" "}
                                            <button className="btn btn-success">Add +</button>
                                        </Link>
                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                            rows={facultySalaryData}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row) => row.Salary_Id}
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

export default AddFacultySalaryListing;
