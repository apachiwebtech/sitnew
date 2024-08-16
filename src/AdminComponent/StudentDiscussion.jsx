import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import decryptedUserId from "../Utils/UserID";
import Admissionform from "./Admissionform";
import { BASE_URL } from "./BaseUrl";
import InnerHeaderForm from "./InnerHeaderForm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StudentDiscussion = () => {

  const [open, setOpen] = React.useState(false);
  const [uid, setUid] = useState([])
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [cid, setCid] = useState("")

  const [error, setError] = useState({})

  const [discussion, setDiscussion] = useState({
    date: "",
    remark: "",
    department: "",
  });

  useEffect(() => {
    setDiscussion({
      date: "" || uid.date,
      remark: "" || uid.discussion,
      department: "" || uid.department,
    })
  }, [uid])

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!discussion.date) {
      isValid = false;
      newErrors.date = "date is require"
    }
    if (!discussion.remark) {
      isValid = false;
      newErrors.discussion = "discussion is require"
    }
    if (!discussion.department) {
      isValid = false;
      newErrors.department = "department is require"
    }

    setError(newErrors)
    return isValid
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);

  useEffect(() => {
    getDisscussionData()
  }, [])

  async function getDisscussionData() {


    axios.post(`${BASE_URL}/getadmissiondiscussion`, { admissionid: admissionid }).then((res) => {

      setOnlineAdmissions(res.data)

    })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = (e) => {

    setDiscussion((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const data = {
        admissionid: localStorage.getItem('Admissionid'),
        date: discussion.date,
        discussion: discussion.remark,
        department: discussion.department,
        u_id: uid.id,
        user_id: decryptedUserId(),
      }
      axios.post(`${BASE_URL}/add_oadmissiondiscussion`, data).then((res) => {
        setOpen(false);
        getDisscussionData()
      }).catch((err) => {
        console.log(err)
      })
    }


    //add discussion api
  }

  const { admissionid } = useParams();

  useEffect(() => {
    localStorage.setItem("Admissionid", admissionid);
  }, [admissionid])

  const handleDelete = (id) => {
    const data = {
      discuss_id: id
    }

    axios.post(`${BASE_URL}/oadmissiondiscuss_delete`, data)
      .then((res) => {
        getDisscussionData()

      })
      .catch((err) => {
        console.log(err)
      })

    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
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

  const handleUpdate = (id) => {
    setOpen(true)
    axios.post(`${BASE_URL}/oadmissiondiscussion_update`, { u_id: id })
      .then((res) => {
        setUid(res.data[0])
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const columns = [

    { field: "date", headerName: "Discussion Date", flex: 2 },
    { field: "discussion", headerName: "Remark", flex: 4 },
    { field: "department", headerName: "Department", flex: 2 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
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
                    {
                      confirmationVisibleMap[cid] && (
                        <div className='confirm-delete'>
                          <p>Are you sure you want to delete?</p>
                          <button
                            onClick={() => handleDelete(cid)}
                            className='btn btn-sm btn-primary'>OK</button>
                          <button
                            onClick={() => handleCancel(cid)}
                            className='btn btn-sm btn-danger'>Cancel</button>
                        </div>
                      )
                    }
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
                      value={discussion.date}
                      placeholder="Discussion Date"
                      name="date"
                      onChange={handleChange}
                    />
                    {error.date && <span className='text-danger'>{error.date}</span>}
                  </div>
                  <div className="form-group col-lg-6 ">
                    <label for="exampleInputUsername1">Department</label>
                    <select
                      className="form-control form-control-lg"
                      id="exampleFormControlSelect1"
                      name="department"
                      onChange={handleChange}
                      value={discussion.department}
                      defaultValue={discussion.department}
                    >
                      <option value="0">Select</option>
                      <option value="Administration">Administration</option>
                      <option value="Businessdevelopment">Business Development</option>
                      <option value="TrainingDevelopment">Training Development</option>
                      <option value="Account">Account</option>
                      <option value="Placement">Placement</option>
                      <option value="Purchase">Purchase</option>
                      <option value="Leadership">Leadership / DD</option>
                      <option value="QualityAssurance">Quality Assurance</option>
                      <option value="HumanResources">Human Resources</option>
                      <option value="CorporateTraining">Corporate Training</option>
                      <option value="TestUser">Test User</option>
                    </select>
                    {error.department && <span className='text-danger'>{error.department}</span>}
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
                      value={discussion.remark}
                      defaultValue={discussion.remark}
                    />
                    {error.discussion && <span className='text-danger'>{error.discussion}</span>}
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

export default StudentDiscussion;