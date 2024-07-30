


import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import axios from "axios";
import BatchEdit from "./BatchEdit";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SiteVise = () => {

  const [open, setOpen] = React.useState(false);
  const{batchid}  = useParams();

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
    { field: "Company", headerName: "Assignment Name", flex: 2 },
    { field: "BussinessNature", headerName: "Subject", flex: 2 },
    { field: "Designation", headerName: "Marks", flex: 2 },
    { field: "Duration", headerName: "Date", flex: 2 },
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
    <div className="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      <div className="main-pannel">
        <div className="content-wrapper ">
             <BatchEdit batchid={batchid} />
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
                    Assignment Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"

                      placeholder="Enter.."
                      name="Company"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Subject
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"

                      placeholder="Enter.."
                      name="BussinessNature"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                     Marks
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="exampleInputUsername1"

                      placeholder="Enter.."
                      name="Designation"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Date
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter.."
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

export default SiteVise;
