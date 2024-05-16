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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Documents = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);
  const getOnlineAdmissions = async () => {
    const response = await fetch(`${BASE_URL}/getStudents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setOnlineAdmissions(data);
    console.log(data);
  };

  useEffect(() => {
    getOnlineAdmissions();
  }, []);
  const handleUpdate = () => {
    console.log("hehehe");
  };
  const columns = [
    { field: "Discussion Date", headerName: "Discussion Date", flex: 2 },
    { field: "Remark", headerName: "Remark", flex: 4 },
    { field: "Department", headerName: "Department", flex: 2 },
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
                        getRowId={(row) => row.Present_Mobile}
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
                    </div>
                    <div className="col-lg-6 ">
                      <div>
                        <h4 className="card-title titleback">
                          Upload Documents
                        </h4>
                      </div>
                      <div className="form-group col-lg-6">
                        <label for="exampleInputUsername1">
                          Upload<span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          class="form-control"
                          id="exampleInputUsername1"
                          value=""
                          placeholder=" Remark"
                          name="remark"
                          onChange=""
                        />
                      </div>
                      <button className="btn btn-success" style={{float:"inline-end"}}>Save</button>
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
                <div className="form-group col-lg-6 ">
                  <label for="exampleInputUsername1">
                    Discussion Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="exampleInputUsername1"
                    value=""
                    placeholder="Discussion Date"
                    name="date"
                    onChange=""
                  />
                </div>
                <div className="form-group col-lg-6 ">
                  <label for="exampleInputUsername1">Department</label>
                  <select
                    className="form-control form-control-lg"
                    id="exampleFormControlSelect1"
                    value=""
                    name="qualification"
                    onChange=""
                  >
                    <option>Account</option>
                    <option>Library</option>
                    <option>Administrator</option>
                  </select>
                </div>

                <div className="form-group col-lg-12">
                  <label for="exampleInputUsername1">
                    Remark<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    value=""
                    placeholder=" Remark"
                    name="remark"
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

export default Documents;
