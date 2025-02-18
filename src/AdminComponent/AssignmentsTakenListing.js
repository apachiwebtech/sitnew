import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import Loader from "./Loader";

const AssignmentsTakenListing = () => {
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { "aria-label": "Color switch demo" } };
    const [loading, setLoading] = useState(true);
    const [assignmentstakendata, setassignmentstakendata] = useState([]);

    const [value, setValue] = useState({
        coursename: " ",
        batchcode: " ",
        assignmentname: " ",
        maxmarks: " ",
        assignmentdate: " ",
        returndate: " ",
    });

    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getassignmentstakendata`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setLoading(false);

        setassignmentstakendata(data);
    };

    useEffect(() => {
        getInquiryData();
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

    const handleDelete = (id) => {
        const data = {
            delete_id: id,
            tablename: "Assignment_taken",
            column_name: "Given_Id",
        };

        axios
            .post(`${BASE_URL}/new_delete_data`, data)
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

    // const handleswitchchange = (value, Inquiry_Id) => {
    //     const newval = value == 0 ? 1 : 0

    //     axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "assignmentstaken" })
    //         .then((res) => {
    //             console.log(res)
    //             getInquiryData()
    //         })
    // }

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
        { field: "Course_Name", headerName: "Course Name", flex: 2 },
        { field: "Batch_code", headerName: "Batch Code", flex: 2 },
        { field: "assignmentname", headerName: "Assignment Name", flex: 2 },
        { field: "Assign_Dt", headerName: "Assignment Date", flex: 2 },
        {
            field: "actions",
            type: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/assignmentstaken/${params.row.Given_Id}`}>
                            <EditIcon style={{ cursor: "pointer" }} />
                        </Link>
                        <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleClick(params.row.Given_Id)}
                        />
                    </>
                );
            },
        },
    ];

    const rowsWithIds = assignmentstakendata.map((row, index) => ({ index: index + 1, ...row }));

    return (
        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            {loading && <Loader />}
            <div className="main-panel" style={{ display: loading ? "none" : "block" }}>
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div
                                        className="d-flex justify-content-between gap-3"
                                        style={{ width: "100%", padding: "10px 0" }}
                                    >
                                        <div>
                                            <h4 class="card-title">Add Assignmentstaken Details</h4>
                                        </div>
                                        <Link to="/assignmentstaken/:assignmentstakenid">
                                            {" "}
                                            <button className="btn btn-success">Add +</button>
                                        </Link>
                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Given_Id}
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

export default AssignmentsTakenListing;
