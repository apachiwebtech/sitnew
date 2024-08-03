import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import OnlineAdmissionForm from "./OnlineAdmissionForm";
import InnerHeader from "./InnerHeader";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Admissionform from "./Admissionform";
import InnerHeaderForm from "./InnerHeaderForm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StudentCompanyInfo = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);
  async function getOnlineAdmissions() {

    const data = {
      student_id: localStorage.getItem(`Admissionid`)
    }
    axios.post(`${BASE_URL}/getcompanyinfo`, data)
      .then((res) => {
        console.log(res)
        setOnlineAdmissions(res.data)
      })
  }

  useEffect(() => {
    getOnlineAdmissions();
  }, []);

  const [value, setValue] = useState({
    Company: "",
    BussinessNature: "",
    Designation: "",
    Duration: ""
  })

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const{admissionid}  = useParams();

  useEffect(()=>{
      localStorage.setItem("Admissionid", admissionid);
  },[admissionid])


  const handleUpdate = () => {
    console.log("hehehe");
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
    { field: "Company", headerName: "Company", flex: 2 },
    { field: "BussinessNature", headerName: "Business Nature", flex: 2 },
    { field: "Designation", headerName: "Designation", flex: 2 },
    { field: "Duration", headerName: "Duration", flex: 2 },
  ];

  const rowsWithIds = onlineAdmissions.map((row, index) => ({
    index: index + 1,
    ...row,
  }));

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      Company: value.Company,
      BussinessNature: value.BussinessNature,
      Designation: value.Designation,
      Duration: value.Duration,
      student_id :localStorage.getItem(`Admissionid`)
    }

    axios.post(`${BASE_URL}/add_companyinfo`, data)
      .then((res) => {
        console.log(res)
        setOpen(false)
        getOnlineAdmissions()
      })

  }

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
                      <h4 class="card-title">Add Company Information</h4>
                    </div>
                    <button
                      className="btn btn-success"
                      onClick={handleClickOpen}
                    >
                      Add +
                    </button>
                  </div>

                  <div>
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
                          paginationModel: { pageSize: 5, page: 0 },
                        },
                      }}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                        },
                      }}
                    />
                  </div>
   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Company Information
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center" >
              <div className="p-3" style={{ width: "100%" }}>
                <div className="row">
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Company<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"

                      placeholder="Company"
                      name="Company"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Business Nature<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"

                      placeholder=" Business Nature"
                      name="BussinessNature"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Designation<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"

                      placeholder="Designation"
                      name="Designation"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Duration<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"

                      placeholder="Duration"
                      name="Duration"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-12 ">
                    <button className="btn btn-success" type="submit">Save</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row p-2 gap-2">
              {/* <button className='mr-2 btn btn-primary'>Save</button> */}
              {/* <button className='col-2'>close</button> */}
            </div>
          </form>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </BootstrapDialog>

    </div>
  );
};

export default StudentCompanyInfo;
