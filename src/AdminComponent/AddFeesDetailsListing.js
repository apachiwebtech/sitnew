import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";

const AddFeesDetailsListing = () => {
    const [cid, setCid] = useState("");
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { "aria-label": "Color switch demo" } };
    const [feesdetail, setFeesDetails] = useState([]);
    const [feesDetailsList, setFeesDetailsList] = useState([]);
    const [value, setValue] = useState({
        studentname: "",
        studentid: "",
        coursename: "",
        batchcode: "",
    });

    const getFeesDetails = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getFeesDetails`);

            setFeesDetailsList(response.data);
        } catch (err) {
            console.log("getFeesDetails err", err);
        }
    };

    useEffect(() => {
        getFeesDetails();
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
            cat_id: id,
            tablename: "awt_addfeesdetails",
        };

        axios
            .post(`${BASE_URL}/delete_inquiry_data`, data)
            .then((res) => {
                // getdetails();
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

    const columns = [
        { field: "Fees_Code", headerName: "Receipt No", width: 100 },
        { field: "RDate", headerName: "Receipt Date", width: 100 },
        { field: "Course_Name", headerName: "Course Name", width: 200 },
        { field: "Batch_code", headerName: "Batch Code", width: 100 },
        { field: "Student_Name", headerName: "Student Name", width: 200 },
        { field: "Date_Added", headerName: "Date", width: 100 },
        { field: "Payment_Type", headerName: "Payment Type", width: 100 },
        { field: "Amount", headerName: "Amount", width: 130 },
        { field: "Notes", headerName: "Particular", width: 200 },
        {
            field: "actions",
            headerName: "Action",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/addfeesdetails/${params.row.Fees_Id}`}>
                            <EditIcon style={{ cursor: "pointer" }} />
                        </Link>
                        <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleClick(params.row.id)}
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
                                        style={{ width: "100%", padding: "10px 0" }}
                                    >
                                        <div>
                                            <h4 class="card-title">List Of Admission</h4>
                                        </div>
                                        <Link to="/addfeesdetails/:addfeesdetailsid">
                                            {" "}
                                            <button className="btn btn-success">Add +</button>
                                        </Link>
                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={feesDetailsList}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row) => row.Fees_Id}
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

export default AddFeesDetailsListing;
