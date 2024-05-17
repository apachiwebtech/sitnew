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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AcademicQualification = () => {
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
  const{admissionid}  = useParams();

  useEffect(()=>{
      localStorage.setItem("Admissionid", admissionid);
  },[admissionid])

  useEffect(() => {
    getOnlineAdmissions();
  }, []);
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
    { field: "Qualification", headerName: "Qualification", flex: 2 },
    { field: "Discipline", headerName: "Discipline", flex: 2 },
    { field: "College/Institute", headerName: "College/Institute", flex: 2 },
    { field: "University", headerName: "University", flex: 2 },
    { field: "Passing Year", headerName: "Passing Year", flex: 2 },
    { field: "Grade/Percentage", headerName: "Grade/Percentage", flex: 2 },
    { field: "Status", headerName: "Status", flex: 2 },
    { field: "Total no. of KTs", headerName: "Total no. of KTs", flex: 2 },
    { field: "Remark", headerName: "Remark", flex: 2 },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return <></>;
      },
    },
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
                      <h4 class="card-title">Add Qualification</h4>
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
                      getRowId={(row) => row.Present_Mobile}
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
                  <div className="row py-3">
                    <div className="col-lg-6">
                      <div>
                        <h4 className="card-title titleback">
                          Other training, if any :{" "}
                        </h4>
                      </div>
                      <div className="form-group col-lg-12 p-0">
                        
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
                      <button
                      className="btn btn-success"
                     
                    >
                      Save
                    </button>
                    </div>
                    <div className="col-lg-6">
                    <div>
                        <h4 className="card-title titleback">
                        Passport Details
                        </h4>
                      </div>
<div className="row">
<div className="form-group col-lg-4 ">
                  <label for="exampleInputUsername1">
                    Passport No.<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    value=""
                    placeholder="University"
                    name="university"
                    onChange=""
                  />
                </div>
                <div className="form-group col-lg-4 ">
                  <label for="exampleInputUsername1">
                    Issue Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="exampleInputUsername1"
                    value=""
                    placeholder="University"
                    name="university"
                    onChange=""
                  />
                </div>
                <div className="form-group col-lg-4 ">
                  <label for="exampleInputUsername1">
                  Expiry Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="exampleInputUsername1"
                    value=""
                    placeholder="University"
                    name="university"
                    onChange=""
                  />
                </div>
                

</div>
                 

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
          Add Qualification
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
                  <label for="exampleInputUsername1">Qualifiaction</label>
                  <select
                    className="form-control form-control-lg"
                    id="exampleFormControlSelect1"
                    value=""
                    name="qualification"
                    onChange=""
                  >
                    <option>B.Tech</option>
                    <option>B.A</option>
                    <option>BCom</option>
                  </select>
                </div>
                <div className="form-group col-lg-4 ">
                  <label for="exampleInputUsername1">Discipline</label>
                  <select
                    className="form-control form-control-lg"
                    id="exampleFormControlSelect1"
                    value=""
                    name="discipline"
                    onChange=""
                  >
                    <option>Commerce</option>
                    <option>Electrical</option>
                    <option>Chemical</option>
                  </select>
                </div>
                <div className="form-group col-lg-4 ">
                  <label for="exampleInputUsername1">College</label>
                  <select
                    className="form-control form-control-lg"
                    id="exampleFormControlSelect1"
                    value=""
                    name="college"
                    onChange=""
                  >
                    <option>College of Commerce</option>
                    <option>College of Electrical</option>
                    <option>College of Chemical</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-4 ">
                  <label for="exampleInputUsername1">
                    University<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    value=""
                    placeholder="University"
                    name="university"
                    onChange=""
                  />
                </div>

                <div className="form-group col-lg-4">
                  <label for="exampleInputUsername1">
                    Passing Year<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    value=""
                    placeholder="Passing Year"
                    name="passyear"
                    onChange=""
                  />
                </div>

                <div className="form-group col-lg-4 ">
                  <label for="exampleInputUsername1">
                    Grade/Percentage<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    value=""
                    placeholder="Grade/Percentage"
                    name="garde"
                    onChange=""
                  />
                </div>
                <div className="form-group col-lg-4 ">
                  <label for="exampleInputUsername1">Status</label>
                  <select
                    className="form-control form-control-lg"
                    id="exampleFormControlSelect1"
                    value=""
                    name="college"
                    onChange=""
                  >
                    <option>Select</option>
                    <option>Appeared</option>
                    <option>Pass</option>
                    <option>KT</option>
                  </select>
                </div>

                <div className="form-group col-lg-4 ">
                  <label for="exampleInputUsername1">
                    Total no. of KTs<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputUsername1"
                    value=""
                    placeholder="Total no. of KTs"
                    name="kt"
                    onChange=""
                  />
                </div>

                <div className="form-group col-lg-12 ">
                  <label for="exampleInputUsername1">Remark</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputUsername1"
                    value="Google"
                    placeholder="Name*"
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

export default AcademicQualification;
