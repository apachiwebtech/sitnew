import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import BatchEdit from "./BatchEdit";
import InnerHeader from "./InnerHeader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Convocation = () => {

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
        faculty_name :"",
        guest_name:"",
        guest_mobile :"",
        email:"",
        guest_designation :"",

      }
    )
    setUid([])
  };

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);

  async function getUnitTest() {

    axios.get(`${BASE_URL}/batch_convocation`)

      .then((res) => {
        setOnlineAdmissions(res.data)
      })

  }

  useEffect(() => {
    getUnitTest();
  }, []);

  const memoizedAdmissions = useMemo(() => onlineAdmissions, [onlineAdmissions]);

  const [value, setValue] = useState({
        faculty_name :"" || uid.faculty_name,
        guest_name:"" || uid.guest_name,
        guest_mobile :"" || uid.guest_mobile,
        email:"" || uid.email,
        guest_designation :"" || uid.guest_designation,
        
  })

  useEffect(()=>{
   setValue({
    faculty_name :uid.faculty_name,
    guest_name:uid.guest_name,
    guest_mobile :uid.guest_mobile,
    email:uid.email,
    guest_designation :uid.guest_designation,
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
      tablename: "Batch_Convocation"
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
      tablename: "Batch_Convocation",

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
    { field: "faculty_name", headerName: "Faculty ", flex: 2 },
    { field: "guest_name", headerName: "Guest Name ", flex: 2 },
    { field: "guest_mobile", headerName: "Guest Mobile ", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "guest_designation", headerName: "Guest Designation", flex: 2 },
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

  console.log(memoizedAdmissions)

  const rowsWithIds = memoizedAdmissions.map((row, index) => ({
    index: index + 1,
    ...row,
  }));

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      faculty_name :value.faculty_name,
      guest_name:value.guest_name,
      guest_mobile :value.guest_mobile,
      email:value.email,
      guest_designation :value.guest_designation,
      uid :uid.id,
      batch_id : batchid
    }

    axios.post(`${BASE_URL}/add_batchconvocation`, data)
      .then((res) => {
        console.log(res)
        setOpen(false)
        getUnitTest()
        setUid([])
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
                      <h4 class="card-title">Convocation</h4>
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
                     Faculty Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.faculty_name}     
                      placeholder="Enter.."
                      name="faculty_name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.guest_name}
                      placeholder="Enter.."
                      name="guest_name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Guest Mobile
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.guest_mobile}
                      placeholder="Enter.."
                      name="guest_mobile"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Email 
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.email}
                      placeholder="Enter.."
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Guest Designation 
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.guest_designation}
                      placeholder="Enter.."
                      name="guest_designation"
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

export default Convocation;
