import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";

const AddFacultySalaryListing = () => {
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { "aria-label": "Color switch demo" } };
    const [inquiryData, setInquiryData] = useState([]);
    const [facultySalaryData, setFacultySalaryData] = useState([]);

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
        { field: "Faculty_Name", headerName: "Faculty Name", width: 200 },
        { field: "Faculty_Code", headerName: "Faculty Code", width: 100 },
        { field: "Payment_Dt", headerName: "Date", width: 100 },
        { field: "Sal_Month", headerName: "Month", width: 100 },
        { field: "Sal_Year", headerName: "Year", width: 100 },
        { field: "Total_Hours", headerName: "Total Hours", width: 100 },
        { field: "Tot_Inc", headerName: "Total Inc.", width: 130 },
        { field: "Total_Ded", headerName: "Total Ded.", width: 130 },
        { field: "Net_Payment", headerName: "Net Payment", width: 130 },
        { field: "Payment_Type", headerName: "Payment Type", width: 130 },
        { field: "Cheque_No", headerName: "Cheque No", width: 130 },
        {
            field: "actions",
            headerName: "Action",
            flex: 2,
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
        <div className="container-fluid page-body-wrapper col-lg-10">
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

                                    <div>
                                        <DataGrid
                                            rows={facultySalaryData}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row) => row.Salary_Id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: {
                                                        pageSize: 10,
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
