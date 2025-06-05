import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import InnerHeader from './InnerHeader';
import { Link } from 'react-router-dom';
import { param } from 'jquery';
import Loader from './Loader';
import { StyledDataGrid } from './StyledDataGrid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';

const CACHE_KEY = 'annual_data'; // Key for localStorage caching
const CACHE_EXPIRY_MS = 1000 * 60 * 15; // Cache expiry time (15 minutes)

const AnnualBatchListing = () => {

  const [annulbatch, setAnnulBatch] = useState([])
  const [cid, setCid] = useState("")
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [uid, setUid] = useState([])
  const [course, setcourse] = useState([])
  const [loading, setLoading] = useState(true)

  const [value, setValue] = useState({
    selectcourse: "",
    from_date: "",
    to_date: ""
  })
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  async function getAnnualData() {

    axios.get(`${BASE_URL}/getannualbatch`)
      .then((res) => {
        console.log(res.data)

        setAnnulBatch(res.data)
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: res.data,
          timestamp: Date.now()
        }));
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  async function getCourseData() {

    axios.get(`${BASE_URL}/getCourse`)
      .then((res) => {
        console.log(res.data)
        setcourse(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    // Calculate the current financial year's start and end dates
    const today = new Date();
    const year = today.getFullYear();
    const isBeforeApril = today.getMonth() < 3; // Months are zero-based
    const startYear = isBeforeApril ? year - 1 : year;
    const endYear = isBeforeApril ? year : year + 1;

    // Format the dates as YYYY-MM-DD
    const fromDate = `${startYear}-04-01`;
    const toDate = `${endYear}-03-31`;

    setValue({
      from_date: fromDate,
      to_date: toDate,
    });
  }, []);
  useEffect(() => {
    // const cachedData = localStorage.getItem(CACHE_KEY);
    // if (cachedData) {
    //   const { data, timestamp } = JSON.parse(cachedData);
    //   // Check if cache is expired
    //   if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
    //     setAnnulBatch(data);
    //     setLoading(false)
    //   } else {
    //     getAnnualData(); // Fetch new data if cache is expired
    //   }
    // } else {
    //   getAnnualData(); // Fetch data if not cached
    // }
    getAnnualData(); // Fetch data if not cached
    getCourseData()

    setUid([])
  }, [])

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



  const handleDelete = (id) => {
    const data = {
      delete_id: id,
      tablename: "Batch_Mst",
      column_name: 'Batch_Id'
    }

    axios.post(`${BASE_URL}/new_delete_data`, data)
      .then((res) => {
        getAnnualData()
      })
      .catch((err) => {
        console.log(err)
      })

    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.from_date || value.to_date || value.selectcourse) {

    } else {
      alert('Nothing Is Select')
      return
    }
    if (value.from_date) {
      if (value.to_date) {

      } else {
        alert("Please select to date")
        return

      }
    } else {
      if (value.to_date) {
        alert("Please select from date")
        return
      }
    }
    setLoading(true)
    const data = {
      selectcourse: value.selectcourse,
      from_date: value.from_date,
      to_date: value.to_date
    }

    axios.post(`${BASE_URL}/getfilterbatch`, data)
      .then((res) => {
        console.log(res)
        setAnnulBatch(res.data)
        setLoading(false)
        setUid([])
        setValue({
          selectcourse: '',
          from_date: '',
          to_date: ''
        })
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })

  }
  // const roledata = {
  //         role: Cookies.get(`role`),
  //         pageid: 14
  //     }

  //     const dispatch = useDispatch()
  //     const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


  //     useEffect(() => {
  //         dispatch(getRoleData(roledata))
  //     }, [])

  const roledata = {
    role: Cookies.get(`role`),
    pageid: 14
  }

  const dispatch = useDispatch()
  const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


  useEffect(() => {
    dispatch(getRoleData(roledata))
  }, [])

  const columns = [
    {
      field: 'index',
      headerName: 'Id',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      filterable: false,
    },
    { field: 'Course_Name', headerName: 'Course Name', width: 260 },
    { field: 'Batch_code', headerName: 'Batch No.', width: 90 },
    { field: 'Category', headerName: 'Category', width: 140 },
    { field: 'Timings', headerName: 'Timings', width: 250 },

    { field: 'SDate', headerName: 'Planned Start Date', width: 140, valueGetter: (params) => params.value ? new Date(params.value).toISOString().split('T')[0].split('-').reverse().join('-') : '' },
    {
      field: 'StartDate',
      headerName: 'Actual Start Date',
      width: 140,
      renderCell: (param) => (
        <p>{param.row.SDate ? new Date(param.row.SDate).toISOString().split('T')[0].split('-').reverse().join('-') : ''}</p>
      )
    },


    { field: 'EDate', headerName: 'Last Date of Admission', width: 150, valueGetter: (params) => params.value ? new Date(params.value).toISOString().split('T')[0].split('-').reverse().join('-') : '' },
    {
      field: 'EndDate',
      headerName: 'Training Completion Date',
      width: 170,
      renderCell: (param) => (
        <p>{param.row.EDate ? new Date(param.row.EDate).toISOString().split('T')[0].split('-').reverse().join('-') : ''}</p>
      )
    },


    { field: 'Duration', headerName: 'Duration', width: 90 },
    { field: 'Training_Coordinator', headerName: 'Training Coordinator', width: 150 },
    ...(roleaccess > 2 ? [{
      field: 'actions',
      type: 'actions',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {roleaccess >= 2 && (<Link to={`/annualbatch/${params.row.Batch_Id}`}><EditIcon style={{ cursor: "pointer" }} /></Link>)}
            {roleaccess > 3 && (<DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Batch_Id)} />)}
          </>
        )
      }
    }] : [])
  ];


  const rowsWithIds = annulbatch.map((row, index) => ({ index: index + 1, ...row }));
  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }




  return (
    <div className="container-fluid page-body-wrapper ">
      <InnerHeader />

      {loading && <Loader />}
      <div className="main-panel" style={{ display: loading ? "none" : "block" }}>

        <div className="content-wrapper" >

          <div className="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                    <div>
                      <h4 class="card-title">Annual Batch</h4>

                    </div>
                    {roleaccess > 1 && (<Link to='/annualbatch/:batch_id'> <button className='btn btn-success'>Add +</button></Link>)}

                  </div>
                  <div className="card" style={{ borderBottom: "2px solid #dce4ec", width: "100%" }}>
                    <div className="card-body">
                      <form className="forms-sample row py-3 d-flex align-items-center flex-wrap" onSubmit={handleSubmit} style={{ gap: "15px" }}>

                        {/* Course Dropdown */}
                        <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
                          <label htmlFor="exampleFormControlSelect1">Course <span className="text-danger">*</span></label>
                          <select className="form-control form-control-lg" id="exampleFormControlSelect1" name="selectcourse" onChange={onhandleChange}>
                            <option value="">Select</option>
                            {course.map((item) => (
                              <option key={item.Course_Id} value={item.Course_Id}>{item.Course_Name}</option>
                            ))}
                          </select>
                        </div>

                        {/* From Date Picker */}
                        <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
                          <label htmlFor="from_date">From Date <span className="text-danger">*</span></label>
                          <DatePicker
                            selected={value.from_date}
                            onChange={(date) => onhandleChange({ target: { name: "from_date", value: date } })}
                            className="form-control"
                            id="from_date"
                            placeholderText="Select From Date"
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>

                        {/* To Date Picker */}
                        <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
                          <label htmlFor="to_date">To Date <span className="text-danger">*</span></label>
                          <DatePicker
                            selected={value.to_date}
                            onChange={(date) => onhandleChange({ target: { name: "to_date", value: date } })}
                            className="form-control"
                            id="to_date"
                            placeholderText="Select To Date"
                            dateFormat="dd-MM-yyyy"
                            minDate={value.from_date}
                          />
                        </div>

                        {/* Buttons */}
                        <div className="d-flex align-items-center" style={{ display: "flex", flexDirection: "row", marginTop: "12px" }}>
                          <button type="submit" className="btn btn-sm btn-primary mr-2">Submit</button>
                          <button type="reset" onClick={() => getAnnualData()} className="btn btn-sm btn-primary mr-2">Clear</button>
                        </div>

                      </form>
                    </div>
                  </div>


                  <div style={{ borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden" }}>
                    <StyledDataGrid
                      rows={rowsWithIds}
                      columns={columns}
                      // disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      rowHeight={35}
                      getRowId={(row) => row.Batch_Id}
                      pagination
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      pageSizeOptions={[50]}
                      autoHeight={false}
                      sx={{
                        height: 500, // Ensure enough height for pagination controls
                        '& .MuiDataGrid-footerContainer': {
                          justifyContent: 'flex-end',
                        },
                      }}
                      slots={{
                        toolbar: GridToolbar
                      }}
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
    </div>
  )
}

export default AnnualBatchListing;
