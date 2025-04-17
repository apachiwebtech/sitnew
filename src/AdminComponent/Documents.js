import React, { useEffect, useState } from "react";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import OnlineAdmissionForm from "./OnlineAdmissionForm";
import InnerHeader from "./InnerHeader";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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

const Documents = () => {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState(null);
  const [name, SetName] = useState('')
  const [viewimg, setViewImg] = useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const isPdf = viewimg && viewimg.split('.').pop().toLowerCase() === 'pdf';


  const [open2, setOpen2] = React.useState(false);
  const handleOpen = (param) => {

    console.log(param)
    setOpen2(true);
    setViewImg(param)
  }


  const handleClose2 = () => setOpen2(false);

  const { admissionid } = useParams();

  useEffect(() => {
    localStorage.setItem("Admissionid", admissionid);
  }, [])

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);

  async function getOnlineAdmissions() {

    const data = {
      student_id: localStorage.getItem(`Admissionid`)
    }
    axios.post(`${BASE_URL}/getdocuments`, data)
      .then((res) => {
        console.log(res)
        setOnlineAdmissions(res.data)
      })
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

              handleOpen(params.row.upload_image)
            }}>View</Button>

            <Modal
              open={open2}
              onClose={handleClose2}
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
    e.preventDefault()


    const photoUploaded = onlineAdmissions.some(doc => doc.doc_name === "photo");

    if (!photoUploaded && name !== "photo") {
      alert("Please upload photo first.");
      return;
    }


    const data = {
      doc_name: name,
      image: image,
      student_id: localStorage.getItem(`Admissionid`)
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('doc_name', name);
    formData.append('student_id', data.student_id);

    fetch(`${BASE_URL}/upload_doc`, {
      method: 'POST',
      body: formData
    })

      .then((res) => {

        alert("File Uploaded")
        getOnlineAdmissions()

      })

  }


  return (
    <div className="container-fluid page-body-wrapper col-lg-12">
      <InnerHeader />
      <div className="main-pannel">
        <div className="content-wrapper ">
          <OnlineAdmissionForm admissionid={admissionid} />
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
                      <form>                      <div>
                        <h4 className="card-title titleback">
                          Upload Document
                        </h4>
                      </div>
                        <div className="form-group col-lg-6">
                          <label for="exampleInputUsername1">
                            Name<span className="text-danger">*</span>
                          </label>
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
                        <button className="btn btn-success" style={{ float: "inline-end" }}>Save</button>
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

export default Documents;
