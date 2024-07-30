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
import BatchEdit from "./BatchEdit";
import DeleteIcon from "@mui/icons-material/Delete";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const UnitTest = () => {

  const [open, setOpen] = React.useState(false);
  const { batchid } = useParams();
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [cid, setCid] = useState("")
  const [uid, setUid] = useState([])


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValue(
      {
        assingmentname: "",
        subject: "",
        marks: "",
        date: ""
      }
    )
    setUid([])
  };

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);

  async function getUnitTest() {

    axios.get(`${BASE_URL}/Unit_test`)

      .then((res) => {
        setOnlineAdmissions(res.data)
      })

  }

  useEffect(() => {
    getUnitTest();
  }, []);

  const [value, setValue] = useState({
    subject: "" || uid.subject,
    testdate: "" || uid.utdate,
    duration: "" || uid.duration,
    marks: "" || uid.marks
  })

  useEffect(()=>{
   setValue({
    subject: uid.subject,
    testdate: uid.utdate,
    duration: uid.duration,
    marks: uid.marks
   })
  },[uid])

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  
  const handleClick = (id) => {
    setCid(id)
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

  const getupdatedata = (id) => {

    setOpen(true)

    const data = {
      u_id: id,
      uidname: "id",
      tablename: "awt_unittesttaken"
    }
    axios.post(`${BASE_URL}/new_update_data`, data)
      .then((res) => {
        setUid(res.data[0])

  
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const handleDelete = (id) => {
    const data = {

      cat_id: id,
      tablename: "awt_unittesttaken",

    }

    axios.post(`${BASE_URL}/delete_data`, data)
      .then((res) => {
        getUnitTest()
      })
      .catch((err) => {
        console.log(err)
      })

    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
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
    { field: "subject", headerName: "Subject", flex: 2 },
    { field: "utdate", headerName: "TestDate", flex: 2 },
    { field: "duration", headerName: "Duration", flex: 2 },
    { field: "marks", headerName: "Marks", flex: 2 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <EditIcon style={{ cursor: "pointer" }} onClick={() => getupdatedata(params.row.id)} />
            <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
          </>
        )
      }
    },
  ];

  const rowsWithIds = onlineAdmissions.map((row, index) => ({
    index: index + 1,
    ...row,
  }));

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      subject: value.subject,
      testdate: value.testdate,
      duration: value.duration,
      marks: value.marks,
      uid :uid.id,
      batch_id : batchid
    }

    axios.post(`${BASE_URL}/add_Unittest`, data)
      .then((res) => {
        console.log(res)
        setOpen(false)
        getUnitTest()
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
                      <h4 class="card-title">Add Unit Test</h4>
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
                         {confirmationVisibleMap[cid] && (
                      <div className='confirm-delete'>
                        <p>Are you sure you want to delete?</p>
                        <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>OK</button>
                        <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Cancel</button>
                      </div>
                    )}
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
                      Subject
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                       value={value.subject}
                      placeholder="Enter.."
                      name="subject"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      TestDate
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.testdate}
                      placeholder="Enter.."
                      name="testdate"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Duration
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.duration}
                      placeholder="Enter.."
                      name="duration"
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
                      value={value.marks}
                      name="marks"
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

export default UnitTest;
