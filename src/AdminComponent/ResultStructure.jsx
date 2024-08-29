


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

const ResultStructure = () => {

  const [uid, setUid] = useState([]);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState([]);
  const [result, setResult] = useState([]);
  const { batchid } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [value, setValue] = useState({
    last_mark_limit: "" || result.late_limit,
    absent_wt: "" || result.absent_wt,
    full_atten_wt: "" || result.full_atten_wt,
    exam_wt: "" || result.exam_wt,
    assignment_wt: "" || result.assignment_wt,
    unit_test: "" || result.unit_test,



    start_from: "" || uid.start_from,
    end_from: "" || uid.end_from,
    grade: "" || uid.grade,
  })

  useEffect(() => {
    setValue({
      last_mark_limit:  result.late_limit,
      absent_wt:  result.absent_wt,
      full_atten_wt: result.full_atten_wt,
      exam_wt:  result.exam_wt,
      assignment_wt:  result.assignment_wt,
      unit_test:  result.unit_test,
    })
  }, [result])




  async function getOnlineAdmissions() {

    const data = {
      batch_id: batchid
    }
    axios.post(`${BASE_URL}/batch_result_Structure`, data)
      .then((res) => {
        if(res.data[0]){
          
          setResult(res.data[0])
        }
      })
  }

  async function getGrade() {

    const data = {
      batchid: batchid
    }
    axios.post(`${BASE_URL}/get_grade`, data)
      .then((res) => {

        setGrade(res.data)
      })
  }

  useEffect(() => {
    getOnlineAdmissions();
    getGrade();
  }, [batchid]);



  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }







  const handleGradeSubmit = (e) => {

    e.preventDefault()
    const data = {
      grade: value.grade,
      end_from: value.end_from,
      start_from: value.start_from,
      batchid: batchid,
      id: value.id
    }
    axios.post(`${BASE_URL}/add_grade`, data)
      .then((res) => {
        alert("Data Added successfully")
        getGrade()
        setValue({
          grade: '',
          end_from: '',
          start_from: '',
          id: '',
        })
      })
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      last_mark_limit: value.last_mark_limit,
      absent_wt: value.absent_wt,
      full_atten_wt: value.full_atten_wt,
      exam_wt: value.exam_wt,
      assignment_wt: value.assignment_wt,
      unit_test: value.unit_test,
      batchid: batchid,
      uid:result.id
    }

    axios.post(`${BASE_URL}/add_batch_result`, data)
      .then((res) => {
        alert("Data Added successfully")
        setOpen(false)
        getGrade()
      })

  }
  const getupdatedata = (id) => {

    setOpen(true)

    const data = {
      u_id: id,
      uidname: "id",
      tablename: "grades"
    }
    axios.post(`${BASE_URL}/new_update_data`, data)
      .then((res) => {
        setUid(res.data[0])

        setValue({
          grade: res.data[0].grade,
          end_from: res.data[0].end_from,
          start_from: res.data[0].start_from,
          id: res.data[0].id,
        })

      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDelete = (id) => {
    const data = {

      cat_id: id,
      tablename: "grades",

    }

    axios.post(`${BASE_URL}/delete_data`, data)
      .then((res) => {
        getGrade()
      })
      .catch((err) => {
        console.log(err)
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
                <div className="card_body">
                  <form onSubmit={handleSubmit} className="p-3 ">
                    <div className="row justify-content-center" >
                      <div className="p-3" style={{ width: "100%" }}>
                        <div className="row">

                          <div className="form-group col-lg-4 ">
                            <label for="exampleInputUsername1">Unit Test Wt.(%)</label>
                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.unit_test} placeholder="Unit Test Wt.(%)	" name="unit_test" onChange={handleChange} />
                          </div>

                          <div className="form-group col-lg-4 ">
                            <label for="exampleInputUsername1">Assignments Wt.(%)</label>
                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.assignment_wt} placeholder="Assignments Wt.(%)" name="assignment_wt" onChange={handleChange} />
                          </div>

                          <div className="form-group col-lg-4 ">
                            <label for="exampleInputUsername1">Exam Wt.(%)</label>
                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.exam_wt} placeholder="Exam Wt.(%)" name="exam_wt" onChange={handleChange} />
                          </div>

                          <div className="form-group col-lg-4 ">
                            <label for="exampleInputUsername1">Full Atten. Wt.(%)</label>
                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.full_atten_wt} placeholder="Full Atten. Wt.(%)" name="full_atten_wt" onChange={handleChange} />
                          </div>

                          <div className="form-group col-lg-4 ">
                            <label for="exampleInputUsername1">Absent Wt.(%)</label>
                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.absent_wt} placeholder="Absent Wt.(%)" name="absent_wt" onChange={handleChange} />
                          </div>

                          <div className="form-group col-lg-4 ">
                            <label for="exampleInputUsername1">Late mark limit (min)</label>
                            <input type="text" class="form-control " id="exampleInputUsername1" value={value.last_mark_limit} placeholder="0" name="last_mark_limit" onChange={handleChange} />
                          </div>



                          <div className="form-group col-lg-12 ">
                            <button className="btn btn-success mr-1" onClick={handleClickOpen} type="button">Add Grade</button>
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
          <div >
            <b className="d-flex justify-content-between"><p className="w-25 text-center ">Start From</p><p className="w-25 text-center ">End To</p><p className="w-25 text-center ">Grade</p><p className="w-25 text-center ">Action</p></b>
            {grade.map((item) => {
              return (
                <b className="d-flex justify-content-between"><p className="w-25 text-center ">{item.start_from}</p><p className="w-25 text-center ">{item.end_from}</p><p className="w-25 text-center ">{item.grade}</p><p className="w-25 text-center "><span style={{ cursor: "pointer" }} onClick={() => getupdatedata(item.id)} >Edit</span> / <span style={{ cursor: "pointer" }} onClick={() => handleDelete(item.id)} >Delete</span></p></b>
              )
            })}
          </div>
          <hr />
          <div>

            <form onSubmit={handleGradeSubmit}>
              <div className="row">
                <div className="form-group col-lg-3 ">
                  <label for="exampleInputUsername1">Start From</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" value={value.start_from}  name="start_from" onChange={handleChange} />
                </div>
                <div className="form-group col-lg-3 ">
                  <label for="exampleInputUsername1">End From</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" value={value.end_from} name="end_from" onChange={handleChange} />
                </div>
                <div className="form-group col-lg-3 ">
                  <label for="exampleInputUsername1">Grade</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" value={value.grade} name="grade" onChange={handleChange} />
                </div>
                <div className="form-group col-lg-3 d-flex align-items-end ">
                  <button className="btn btn-success" type="submit">Save</button>
                </div>
              </div>
            </form>
          </div>

        </DialogContent>
        <DialogActions>

        </DialogActions>
      </BootstrapDialog>

    </div>
  );
};

export default ResultStructure;
