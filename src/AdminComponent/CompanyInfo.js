import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CompanyInfo = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);
  async function getOnlineAdmissions(){

    const data = {
      student_id : localStorage.getItem(`Admissionid`)
    }
    axios.post(`${BASE_URL}/getcompanyinfo` , data)
    .then((res)=>{
      console.log(res)
      setOnlineAdmissions(res.data)
    })
   }

  useEffect(() => {
    getOnlineAdmissions();
  }, []);


  const handleUpdate = () => {
    console.log("hehehe");
  };
  const columns = [
    {
      field: "Student_id",
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

  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      <div className="main-pannel">
        <div className="content-wrapper ">
          <OnlineAdmissionForm />
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
                  <div className="row py-3 ">
                    <div className="col-lg-12">
                      <div>
                        <h4 className="card-title titleback">
                          Work Experience
                        </h4>
                      </div>
                      <div className="row">
                        <div className="form-group col-lg-3 ">
                          <label for="exampleInputUsername1">Occupation</label>
                          <select
                            className="form-control form-control-lg"
                            id="exampleFormControlSelect1"
                            value=""
                            name="qualification"
                            onChange=""
                          >
                            <option>Student</option>
                            <option>Employee</option>
                            <option>Self-Employee</option>
                          </select>
                        </div>
                        <div className="form-group col-lg-3 ">
                          <label for="exampleInputUsername1">
                            Organization<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"
                            value=""
                            placeholder=""
                            name="tain"
                            onChange=""
                          />
                        </div>

                        <div className="form-group col-lg-3 ">
                          <label for="exampleInputUsername1">
                            Description<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"
                            value=""
                            placeholder=""
                            name="tain"
                            onChange=""
                          />
                        </div>
                        <div className="form-group col-lg-3 ">
                          <label for="exampleInputUsername1">
                            Designation<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"
                            value=""
                            placeholder=""
                            name="designation"
                            onChange=""
                          />
                        </div>
                      </div>
                      <button className="btn btn-success ">Save</button>

                    </div>

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
          <div className="row justify-content-center">
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
                    value=""
                    placeholder="Company"
                    name="Company"
                    onChange=""
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
                    value=""
                    placeholder=" Business Nature"
                    name="passyear"
                    onChange=""
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
                    value=""
                    placeholder="Designation"
                    name="garde"
                    onChange=""
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
                    value=""
                    placeholder="Duration"
                    name="duration"
                    onChange=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row p-2 gap-2">
            {/* <button className='mr-2 btn btn-primary'>Save</button> */}
            {/* <button className='col-2'>close</button> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            + Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default CompanyInfo;
