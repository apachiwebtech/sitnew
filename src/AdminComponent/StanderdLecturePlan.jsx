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
import { duration, styled } from "@mui/material/styles";
import axios from "axios";
import BatchEdit from "./BatchEdit";
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

const StandardLecturePlan = () => {

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
        lecture_no: "",
        subject_topic: "",
        starttime: "",
        endtime: "",
        assignment: "",
        assignment_date: "",
        faculty_name: "",
        class_room: "",
        documents: "",
        unit_test: "",
        subject: "",
        duration: "",
        date: "",
        marks: "",
        publish: ""
      }
    )
    setUid([])
  };

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);

  async function getstandardlecture() {

    axios.get(`${BASE_URL}/batch_standardlecture`)

      .then((res) => {
        setOnlineAdmissions(res.data)
      })

  }

  useEffect(() => {
    getstandardlecture();
  }, []);

  const [value, setValue] = useState({
    lecture_no: "" || uid.lecture_no,
    subject_topic: "" || uid.subject_topic,
    starttime: "" || uid.starttime,
    endtime: "" || uid.endtime,
    assignment: "" || uid.assignment,
    assignment_date: "" || uid.assignment_date,
    faculty_name: "" || uid.faculty_name,
    class_room: "" || uid.class_room,
    documents: "" || uid.documents,
    unit_test: "" || uid.unit_test,
    subject: "" || uid.subject,
    date: "" || uid.date,
    marks: "" || uid.marks,
    publish: "" || uid.publish,
    duration: "" || uid.duration
  })

  useEffect(() => {
    setValue({
      lecture_no: uid.lecture_no,
      duration: uid.duration,
      subject_topic: uid.subject_topic,
      starttime: uid.starttime,
      endtime: uid.endtime,
      assignment: uid.assignment,
      assignment_date: uid.assignment_date,
      faculty_name: uid.faculty_name,
      class_room: uid.class_room,
      documents: uid.documents,
      unit_test: uid.unit_test,
      subject: uid.subject,
      date: uid.date,
      marks: uid.marks,
    })
  }, [uid])

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
      tablename: "Batch_SLecture_Master"
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
      tablename: "Batch_SLecture_Master",

    }

    axios.post(`${BASE_URL}/delete_data`, data)
      .then((res) => {
        getstandardlecture()
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
    { field: "lecture_no", headerName: "Lecture No", flex: 2 },
    { field: "subject", headerName: "Subject", flex: 2 },
    { field: "subject_topic", headerName: "Subject Topics", flex: 2 },
    { field: "date", headerName: "Date", flex: 2 },
    { field: "starttime", headerName: "Start Time", flex: 2 },
    { field: "endtime", headerName: "End Time", flex: 2 },
    { field: "assignment", headerName: "Assignment", flex: 2 },
    { field: "assignment_date", headerName: "Assignment Date", flex: 2 },
    { field: "faculty_name", headerName: "Faculty Name", flex: 2 },
    { field: "class_room", headerName: "Class Room", flex: 2 },
    { field: "documents", headerName: "Documents", flex: 2 },
    { field: "unit_test", headerName: "Unit Test", flex: 2 },
    { field: "publish", headerName: "Publish", flex: 2 },
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
      lecture_no: value.lecture_no,
      subject_topic: value.subject_topic,
      starttime: value.starttime,
      endtime: value.endtime,
      assignment: value.assignment,
      assignment_date: value.assignment_date,
      faculty_name: value.faculty_name,
      class_room: value.class_room,
      documents: value.documents,
      unit_test: value.unit_test,
      subject: value.subject,
      date: value.date,
      marks: value.marks,
      duration: value.duration,
      publish: value.publish,
      uid: uid.id,
    }

    axios.post(`${BASE_URL}/add_batchstandardlecture`, data)
      .then((res) => {

        setOpen(false)
        getstandardlecture()
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
                      Lecture No
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.lecture_no}
                      placeholder="Enter.."
                      name="lecture_no"
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
                      value={value.subject}
                      placeholder="Enter.."
                      name="subject"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Subject Topics
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.subject_topic}
                      placeholder="Enter.."
                      name="subject_topic"
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
                      value={value.date}
                      name="date"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter.."
                      value={value.starttime}
                      name="starttime"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      End Time
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter.."
                      value={value.endtime}
                      name="endtime"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Assignment
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter.."
                      value={value.assignment}
                      name="assignment"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Assignment Date
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter.."
                      value={value.assignment_date}
                      name="assignment_date"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Faculty Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter.."
                      value={value.faculty_name}
                      name="faculty_name"
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
                      placeholder="Enter.."
                      value={value.duration}
                      name="duration"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Class Room
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter.."
                      value={value.class_room}
                      name="class_room"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Documents
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter.."
                      value={value.documents}
                      name="documents"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Unit Test
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      placeholder="Enter.."
                      value={value.unit_test}
                      name="unit_test"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group col-lg-4">
                    <label for="exampleInputUsername1">Publish</label>
                    <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.publish} name='publish' onChange={handleChange} >
                      <option>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  <div className="form-group col-lg-4 ">
                    <label for="exampleInputUsername1">
                      Marks
                    </label>
                    <input
                      type="text"
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

export default StandardLecturePlan;
