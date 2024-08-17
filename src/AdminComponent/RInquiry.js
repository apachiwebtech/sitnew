import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { error } from "jquery";
import { MultiSelect } from "react-multi-select-component";
//import FormControlLabel from '@mui/material/FormControlLabel';

const RInquiry = () => {
  const [selected, setSelected] = useState([]);
  const [course, SetCourse] = useState([])
  const [batch, setAnnulBatch] = useState([])
  const [batchcat, setbatchcat] = useState([])
  const [vendordata, setStudent] = useState([])
  const [inquery, setinquery] = useState([])
  const [status, setstatus] = useState([])
  const [uid, setUid] = useState([])
  const [error, setError] = useState([])
  const [hide, setHide] = useState(false)
  const [inquiryData, setInquiryData] = useState([]);

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState({
    fromdate: "",
    fromtodate: "",
    selectcourse: "",
    rollnumberallot: "",
    selctbatch: "",
    allinquiries: "",
    all: ""
  })
  const getbatch = async (id) => {

    const data = {
      courseid: id
    }
    try {
      const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
      setAnnulBatch(res.data);
      const formattedOptions = res.data.map((course) => ({
        label: String(course.Batch_code),
        value: course.Batch_Id,

      }));
      setOptions(formattedOptions);

    } catch (err) {
      console.error("Error fetching data:", err);
    }

    setSelected([])
  };





  async function getCourseData() {

    axios.get(`${BASE_URL}/getCourse`)
      .then((res) => {
        console.log(res.data)
        SetCourse(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function getBatchData() {

    axios.get(`${BASE_URL}/get_batchcategory`)
      .then((res) => {
        console.log(res.data)
        setbatchcat(res.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getBatchData()
    getCourseData()
    // getbatchdata()
    setUid([])
  }, [])
  async function getstatus() {
    const data = {
      tablename: "Status_Master",
      columnname: "*"
    }
    axios.post(`${BASE_URL}/get_new_data`, data)
      .then((res) => {
        console.log(res.data)
        setstatus(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    getstatus()
    setValue({

    })
  }, [uid])


  const getstudentlisitng = (id) => {
    setHide(true)
    const data = {
      batch_code: id
    }

    axios.post(`${BASE_URL}/getbatchwisestudent`, data)
      .then((res) => {
        setStudent(res.data)
      })
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.all && !value.allinquiries && !value.selctbatch && !value.rollnumberallot && !value.selectcourse && !value.fromdate && !value.fromtodate) {
      alert("Please fill required fields");
      return;
    }

    if ((value.fromdate || value.fromtodate) && !(value.fromdate && value.fromtodate)) {
      alert("Please select both from date and to date");
      return;
    }

    if (!value.selctbatch && ! value.selectcourse && !value.rollnumberallot ) {
      alert("Please select the following: Batch, Course, Batch Type");
      return;
    }

    let data = {
      fromdate: value.fromdate,
      fromtodate: value.fromtodate,
      selectcourse: value.selectcourse,
      rollnumberallot: value.rollnumberallot,
      allinquiries: value.allinquiries,
      all: value.all
    };


    if (value.selctbatch) {
      data = {
        ...data,
        selctbatch: value.selctbatch.map(option => option.value)
      };
    }

    axios.post(`${BASE_URL}/getdatas`, data)
      .then((res) => {
        console.log(res);
        setinquery(res.data);
      });
  };


  const onhandleChange = (e) => {
    if (e.target) {
      setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

      if (e.target.name === "selectcourse") {
        getbatch(e.target.value);
      }
    } else {
      setSelected(e); // Update the selected batch values
      setValue((prev) => ({ ...prev, selctbatch: e })); // Save the selected batch values to the state
    }
  }






  const columns = [
    {
      field: 'index',
      headerName: 'Id',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      filterable: false,

    },
    // { field: 'attendee', headerName: 'Student Code', flex: 2 },
    { field: 'Student_Name', headerName: 'Student Name', flex: 2 },
    { field: 'Deciplin', headerName: 'Deciplin', flex: 2 },
    { field: 'Course_Name', headerName: 'Course Name', flex: 2 },
    { field: 'Status', headerName: 'Status', flex: 2 },
    { field: 'inquiry_DT', headerName: 'inquiry Date', flex: 2 },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <EditIcon style={{ cursor: "pointer" }} onClick={() => (params.row.Student_Id)} />
            <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => (params.row.Student_Id)} />
          </>
        )
      }
    },
  ];


  const rowsWithIds = inquery.map((row, index) => ({ index: index + 1, ...row }));

  return (

    <div class="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Inquiry Report</h4>
                  <hr></hr>
                  <form class="forms-sample py-3" onSubmit={handleSubmit} >
                    <div class='row'>

                      <div class="form-group col-lg-3">
                        <label for="exampleInputUsername1">From Date<span className="text-danger">*</span></label>
                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.fromdate}
                          name="fromdate" onChange={onhandleChange} />
                        {<span className='text-danger'> {error.fromdate} </span>}
                      </div>

                      <div class="form-group col-lg-3">
                        <label for="exampleInputUsername">From To Date<span className="text-danger">*</span></label>
                        <input type="date" class="form-control" id="exampleInputUsername" value={value.fromtodate}
                          name="fromtodate" onChange={onhandleChange} />
                        {<span className='text-danger'> {error.fromtodate} </span>}
                      </div>

                      <div class="form-group col-lg-3">
                        <label for="exampleFormControlSelect1">Select Course<span className="text-danger">*</span></label>
                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selectcourse} name='selectcourse' onChange={onhandleChange} >
                          <option>Select Course</option>

                          {course.map((item) => {
                            return (
                              <option value={item.Course_Id}>{item.Course_Name}</option>
                            )
                          })}

                        </select>
                        {<span className='text-danger'> {error.selectcourse} </span>}

                      </div>

                      <div class="form-group col-lg-3">
                        <label for="exampleFormControlSelect1">Batch Type<span className="text-danger">*</span></label>
                        <select class="form-control form-control-lg" id="exampleFromControlSelect1" value={value.rollnumberallot} name='rollnumberallot' onChange={onhandleChange} >
                          <option value="">Select Batch Type</option>
                          {batchcat.map((item) => {
                            return (
                              <option value={item.id}>{item.BatchCategory}</option>
                            )
                          })}
                        </select>
                        {<span className='text-danger'> {error.selectcourse} </span>}
                      </div>

                      <div class="form-group col-lg-3">
                        <lable for="exampleInputUsername1">Select Batch<span className="text-danger">*</span></lable>
                        {/* <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Select Batch code" value={value.selectbatchs} name='selectbatchs' onChange={onhandleChange}  /> */}
                        {/* <pre>{JSON.stringify(selected)}</pre> */}
                        <MultiSelect
                          options={options}
                          value={selected}
                          onChange={onhandleChange}
                          labelledBy="Select Batch "
                          name="selctbatch"
                        />
                        {/* {batch.map((item) => {
                                                    return (
                                                        <option value={item.Batch_Id}>{item.Batch_code} </option>
                                                    )
                                                })} */}
                        {<span className='text-danger'> {error.selectbatchs} </span>}


                      </div>

                      <div class="form-group col-lg-3">
                        <lable for="exampleFormControlSelect1">Enquiry Type</lable>
                        <select class="form-control" id="exampleFormControlSelect1" value={value.allinquiries}
                          name='allinquiries' onChange={onhandleChange} >
                          <option value="">Select Enquiry Type</option>
                          {status.map((item) => {
                            return (
                              <option value={item.Id}>{item.Status}</option>
                            )
                          })}

                        </select>
                      </div>

                      <div class="form-group col-lg-3">
                        <lable for="exampleFormControlSelect1">Inquiry From</lable>
                        <select class="form-control" id="exampleFormControlSelect1" value={value.all} name='all'
                          onChange={onhandleChange}>
                          <option value="">Select Inquiry From</option>
                          <option value="Website">Website</option>
                          <option value="Exhibition">Exhibition</option>
                          <option value="Reference">Reference</option>
                          <option value="TV interview">TV interview</option>
                          <option value="Advertisement">Advertisement</option>
                          <option value="Shiksha">Shiksha</option>
                          <option value="India Mart">India Mart</option>
                          <option value="Emagister">Emagister</option>
                          <option value="News Paper">News Paper</option>
                          <option value="Ex.student">Ex.student</option>
                          <option value="Google">Google</option>
                          <option value="Seminar">Seminar</option>
                          <option value="Facebook">Facebook</option>

                        </select>
                      </div>

                    </div>



                    <button type="submit" class="btn btn-primary mr-2">Search</button>
                  </form>


                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div className='d-flex justify-content-between'>
                    <div>
                      <h4 class="card-title">Inquiry Report Details</h4>
                    </div>

                  </div>
                  {<div>

                    <DataGrid
                      rows={rowsWithIds}
                      columns={columns}
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      rowHeight={35}
                      getRowId={(row) => row.id}
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 10, page: 0 },
                        },
                      }}


                    />

                  </div>}
                  {/* <button type="submit" class="btn btn-primary mr-2">Allot Roll Number</button>

                                    <button type='button' onClick={() => {
                                        window.location.reload()
                                    }} class="btn btn-light">Save</button> */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >

  )
}

export default RInquiry
