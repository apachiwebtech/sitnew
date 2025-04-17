import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import OnlineAdmissionForm from "./OnlineAdmissionForm";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import axios from "axios";
import Admissionform from "./Admissionform";
import InnerHeaderForm from "./InnerHeaderForm";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StudentDocument = () => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [name, SetName] = useState("");
    const [viewimg, setViewImg] = useState('')

    const { admissionid } = useParams();

    const isPdf = viewimg && viewimg.split('.').pop().toLowerCase() === 'pdf';

    const handleOpen = (param) => {

        console.log(param)
        setOpen(true);
        setViewImg(param)
    }


    useEffect(() => {
        localStorage.setItem("Admissionid", admissionid);
    }, []);

    const [onlineAdmissions, setOnlineAdmissions] = useState([]);

    async function getOnlineAdmissions() {
        const data = {
            student_id: localStorage.getItem(`Admissionid`),
        };
        console.log(data)
        // console.log(admissionid)
        axios.post(`${BASE_URL}/getdocuments`, data).then((res) => {
            console.log(res.data);
            setOnlineAdmissions(res.data);
        });
    }

    useEffect(() => {
        getOnlineAdmissions();
    }, []);

    const columns = [
        {
            field: "index",
            headerName: "id",
            type: "number",
            align: "center",
            headerAlign: "center",
            flex: 1,
            filterable: false,
        },
        { field: "doc_name", headerName: "Document Name", flex: 2 },
        { field: "upload_image", headerName: "Image", flex: 2 },
        {
            field: "View", headerName: "View", flex: 2, renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => {
                            console.log(params)
                            handleOpen(params.row.upload_image)
                        }}>View</Button>

                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div>
                                    {isPdf ? (
                                        // Render PDF viewer
                                        <iframe
                                            src={`${IMG_URL}/student_document/${admissionid}/${viewimg}`}
                                            width="100%"
                                            height="500px"
                                            title="PDF Viewer"
                                        />
                                    ) : (
                                        // Render image
                                        <img src={`${IMG_URL}/student_document/${admissionid}/${viewimg}`} alt="Content" />
                                    )}
                                </div>
                            </Box>

                        </Modal>
                    </>
                )
            }
        },
    ];

    const rowsWithIds = onlineAdmissions.map((row, index) => ({
        index: index + 1,
        ...row,
    }));


    const handleUpload3 = async (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handlesubmit = (e) => {
        e.preventDefault();

        const photoUploaded = onlineAdmissions.some(doc => doc.doc_name === "photo");

        if (!photoUploaded && name !== "photo") {
          alert("Please upload photo first.");
          return;
        }
    

        const data = {
            doc_name: name,
            image: image,
            student_id: localStorage.getItem(`Admissionid`),
        };

        const formData = new FormData();
        formData.append("image", image);
        formData.append("doc_name", name);
        formData.append("student_id", data.student_id);

        fetch(`${BASE_URL}/upload_doc`, {
            method: "POST",
            body: formData,
        }).then((res) => {
            alert("File Uploaded");
            getOnlineAdmissions();
        });
    };

    return (
        <div className="container-fluid page-body-wrapper col-lg-12">
            <InnerHeaderForm />

            <div className="main-pannel">
                <div className="content-wrapper ">
                    <Admissionform admissionid={admissionid} />
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div
                                        className="d-flex justify-content-between gap-3"
                                        style={{ width: "100%", padding: "10px 0" }}
                                    >
                                        <div>
                                            <h4 class="card-title">Add Documents</h4>
                                        </div>
                                        {/* <button
                      className="btn btn-success"
                      onClick={handleClickOpen}
                    >
                      Add +
                    </button> */}
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 p-0">
                                            <div>
                                                <h4 className="card-title titleback">Documents List</h4>
                                            </div>
                                            <DataGrid
                                                rows={rowsWithIds}
                                                columns={columns}
                                                disableColumnFilter
                                                disableColumnSelector
                                                disableDensitySelector
                                                rowHeight={37}
                                                getRowId={(row) => row.id}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: { pageSize: 10, page: 0 },
                                                    },
                                                }}
                                                slots={{ toolbar: GridToolbar }}
                                                slotProps={{
                                                    toolbar: {
                                                        showQuickFilter: false,
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-6 " onSubmit={handlesubmit}>
                                            <form>
                                                {" "}
                                                <div>
                                                    <h4 className="card-title titleback">Upload Documents</h4>
                                                </div>
                                                <div className="form-group col-lg-6">
                                                    <label for="exampleInputUsername1">
                                                        Name<span className="text-danger">*</span>
                                                    </label>
                                                    {/* <input
                                                        type="text"
                                                        class="form-control"
                                                        id="exampleInputUsername1"
                                                        placeholder="Name"
                                                        name="remark"
                                                        onChange={(e) => SetName(e.target.value)}
                                                    /> */}

                                                    <select
                                                        className="form-control"
                                                        id="exampleInputUsername1"
                                                        name="remark"
                                                        onChange={(e) => SetName(e.target.value)}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="photo">Photo</option>
                                                        <option value="certificate" disabled={!onlineAdmissions.some(doc => doc.doc_name === "photo")}>Certificate</option>
                                                        <option value="marksheet" disabled={!onlineAdmissions.some(doc => doc.doc_name === "photo")}>Marksheet</option>
                                                        <option value="passport" disabled={!onlineAdmissions.some(doc => doc.doc_name === "photo")}>Passport</option>
                                                        <option value="pancard" disabled={!onlineAdmissions.some(doc => doc.doc_name === "photo")}>PanCard</option>
                                                        <option value="aadhar_card" disabled={!onlineAdmissions.some(doc => doc.doc_name === "photo")}>Aadhar Card</option>
                                                        <option value="driving_licence" disabled={!onlineAdmissions.some(doc => doc.doc_name === "photo")}>Driving Licence</option>
                                                        <option value="voter_id" disabled={!onlineAdmissions.some(doc => doc.doc_name === "photo")}>Voter Id</option>
                                                        <option value="electricity_bill" disabled={!onlineAdmissions.some(doc => doc.doc_name === "photo")}>Electricity Bill</option>
                                                        <option value="rent_agreement" disabled={!onlineAdmissions.some(doc => doc.doc_name === "photo")}>Rent Agreement</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-lg-6">
                                                    <label for="exampleInputUsername1">
                                                        Upload<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        class="form-control"
                                                        id="exampleInputUsername1"
                                                        placeholder=" Remark"
                                                        name="remark"
                                                        onChange={handleUpload3}
                                                    />
                                                </div>
                                                <button className="btn btn-success" style={{ float: "inline-end" }}>
                                                    Save
                                                </button>
                                            </form>
                                        </div>
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

export default StudentDocument;
