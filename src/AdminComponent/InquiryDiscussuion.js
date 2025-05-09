import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import decryptedUserId from "../Utils/UserID";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import InquiryForm from "./InquiryForm";

function AddRole() {
    const [discuss, setdiscuss] = useState([]);
    const [error, setError] = useState({});
    const [uid, setUid] = useState([]);
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [cid, setCid] = useState("");

    const { inquiryid } = useParams();

    const student_id = localStorage.getItem("Student_id");

    const navigate = useNavigate()

    const [value, setValue] = useState({
        date: "" || uid.date,
        discussion: "" || uid.discussion,
        nextdate: "" || uid.nextdate,
    });

    useEffect(() => {
        setValue({
            date: "" || uid.date,
            discussion: "" || uid.discussion,
            nextdate: "" || uid.nextdate,
        });
    }, [uid]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!value.date) {
            isValid = false;
            newErrors.date = "date is require";
        }
        if (!value.discussion) {
            isValid = false;
            newErrors.discussion = "title is require";
        }

        setError(newErrors);
        return isValid;
    };

    async function getinquiryDiscuss(inquiry_id) {
        const data = {
            inquiryid: inquiryid || inquiry_id,
        };
        axios
            .post(`${BASE_URL}/inquirydiscuss_data`, data)
            .then((res) => {
                setdiscuss(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getinquiryDiscuss();
    }, []);

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                date: value.date,
                nextdate: value.nextdate,
                discussion: value.discussion,
                user_id: decryptedUserId(),
                u_id: uid.id,
                inquiryid: inquiryid,
            };

            axios
                .post(`${BASE_URL}/add_inquirydiscuss`, data)
                .then((res) => {

                    if(inquiryid == ':inquiryid'){
                        alert(res.data.message);
                        navigate(`/onlineinquiry/inquiryform/${res.data.inquiry_id}`)
                    }else{
                        alert(res.data);
                        setUid([]);
                        setValue({
                            date: "",
                            discussion: "",
                            nextdate: "",
                        });
                        getinquiryDiscuss();
                    }
               
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
        axios
            .post(`${BASE_URL}/inquirydiscuss_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = (id) => {
        const data = {
            inquirydiscuss_id: id,
        };

        axios
            .post(`${BASE_URL}/inquirydiscuss_delete`, data)
            .then((res) => {
                getinquiryDiscuss();
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
        localStorage.setItem("Inquiryid", inquiryid);
    }, [inquiryid]);
    const columns = [
        {
            field: "index",
            headerName: "ID",
            type: "number",
            align: "center",
            headerAlign: "center",
            flex: 1,
            filterable: false,
        },
        { field: "discussion", headerName: "Discussion", flex: 5 },
        { field: "date", headerName: "Date", flex: 2 },
        { field: "nextdate", headerName: "NextDate", flex: 2 },
        {
            field: "actions",
            type: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess >= 2 && (
                            <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                        )}
                        {roleaccess > 3 && (
                            <DeleteIcon
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => handleClick(params.row.id)}
                            />
                        )}
                    </>
                );
            },
        },
    ];

    const rowsWithIds = discuss.map((row, index) => ({ index: index + 1, ...row }));

    const roledata = {
        role: Cookies.get(`role`),
        pageid: 4,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);

    return (
        <div class="container-fluid page-body-wrapper">
            <InnerHeader />

            {roleaccess > 1 ? (
                <div class="main-panel">
                    <div class="content-wrapper">
                        <InquiryForm inquiryid={inquiryid} />

                        <div class="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Add Discussion</h4>

                                        <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div class="form-group col-lg-6">
                                                    <label for="exampleTextarea1">
                                                        Discussion<span className="text-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        class="form-control"
                                                        id="exampleTextarea1"
                                                        rows="2"
                                                        value={value.discussion}
                                                        name="discussion"
                                                        onChange={onhandleChange}
                                                    ></textarea>
                                                    {error.discussion && (
                                                        <span className="text-danger">{error.discussion}</span>
                                                    )}
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">
                                                        Date<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        class="form-control"
                                                        id="exampleInputUsername1"
                                                        value={value.date}
                                                        name="date"
                                                        onChange={onhandleChange}
                                                    />
                                                    {error.date && <span className="text-danger">{error.date}</span>}
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Next Date</label>
                                                    <input
                                                        type="date"
                                                        class="form-control"
                                                        id="exampleInputUsername1"
                                                        value={value.nextdate}
                                                        name="nextdate"
                                                        onChange={onhandleChange}
                                                    />
                                                    {error.nextdate && (
                                                        <span className="text-danger">{error.nextdate}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {roleaccess > 2 && (
                                                <>
                                                    {" "}
                                                    <button type="submit" class="btn btn-primary mr-2 float-right">
                                                        Submit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            window.location.reload();
                                                        }}
                                                        class="btn btn-light float-right"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h4 class="card-title">Roles </h4>
                                                <p class="card-description">List Of Role</p>
                                            </div>
                                        </div>
                                        <div>
                                            <DataGrid rows={rowsWithIds} columns={columns} getRowId={(row) => row.id} />

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
            ) : (
                <h1>No Access</h1>
            )}
        </div>
    );
}

export default AddRole;
