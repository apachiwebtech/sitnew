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

const Discussion = () => {
  const [open, setOpen] = React.useState(false);
  const [discussion , setDiscussion] = useState({
    date : "",
    remark : "",
    department : "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);

  useEffect(()=>{
    getDisscussionData()
  },[])

  async function getDisscussionData() {
    let id = localStorage.getItem(`Admissionid`)
    
    axios.post(`${BASE_URL}/getdiscussion`, {student_id : id }).then((res) => {
      console.log(res.data,">>>>>>")
      setOnlineAdmissions(res.data)
      // setDiscussion      // setOnlineAdmissions((prevState)=>{

      // })
    })
    .catch((err)=> {
      console.log(err)
    })
  }
 
  const handleChange = (e) => {
    
    setDiscussion((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      student_id : localStorage.getItem(`Admissionid`),
      date : discussion.date,
      remark : discussion.remark,
      department : discussion.department,
    }
      axios.post(`${BASE_URL}/` , data ).then((res)=> {
        setOpen(false);
      }).catch((err)=> {
        console.log(err)
      })
    
    //add discussion api
  }

  const columns = [
   
    { field: "Disscussion_date", headerName: "Discussion Date", flex: 2 },
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

                    placeholder="Discussion Date"
                    name="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-lg-6 ">
                  <label for="exampleInputUsername1">Department</label>
                  <select
                    className="form-control form-control-lg"
                    id="exampleFormControlSelect1"
                    name="department"
                    onChange={handleChange}
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
                    placeholder=" Remark"
                    name="remark"
                    onChange={handleChange}
                  />
                </div>
                

               
              </div>
            </div>
          </div>
          <div>
            <button type="submit">save</button>
          </div>

          <div className="row p-2 gap-2">
            {/* <button className='mr-2 btn btn-primary'>Save</button> */}
            {/* <button className='col-2'>close</button> */}
          </div>
      </form>
        </DialogContent>
     
      </BootstrapDialog>
    </div>
  );
};

export default Discussion;
