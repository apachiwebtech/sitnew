import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { StyledDataGrid } from './StyledDataGrid';
//import FormControlLabel from '@mui/material/FormControlLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ConsultancyReport = () => {

    const [coursedata, setCourseData] = useState([])
    const [city, setCity] = useState([])
    const [consultant, setConsulatant] = useState([])
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });




    const [value, setValue] = useState({
        course: "",
        city: '',
        purpose: "",
        fromdate: "",
        todate: ""
    })



    async function getCourseData() {
        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {

                setCourseData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    async function getCity() {
        axios.get(`${BASE_URL}/getConsultantCity`)
            .then((res) => {

                setCity(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }





    useEffect(() => {
        getCity()
        getCourseData()
    }, [])



    const handlesubmit = (e) =>{
      e.preventDefault()

      const data = {
        course: value.course,
        city: value.city,
        purpose: value.purpose,
        fromdate: value.fromdate,
        todate: value.todate
      }

      axios.post(`${BASE_URL}/searchconsultantreport` , data)
      .then((res) =>{
        setConsulatant(res.data)
      })
    }


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
        {
            field: "Date_Added",
            headerName: "Created Date",
            width: 150,
            renderCell: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if already in DD-MM-YYYY format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return params.value; // Return original value if not a valid date
          
              // Convert valid date to DD-MM-YYYY format
              return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
          },
          
        { field: 'Comp_Name', headerName: 'Company Name', width: 250  },
        { field: 'Contact_Person', headerName: 'Contact Person Name', width: 200  },
        { field: 'Address', headerName: 'Address', width: 500  },
        { field: 'Country', headerName: 'Country', width: 200 },
        { field: 'Tel', headerName: 'Contact_No', width: 200  },
        { field: 'EMail', headerName: 'Email', width: 200  },
        { field: 'CourseName1', headerName: 'Courses', width: 250  },

    ];


    const rowsWithIds = consultant.map((row, index) => ({ index: index + 1, ...row }));



    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }




    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Consultancy Report</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handlesubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Course</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>

                                                    <option>Select Course</option>
                                                    {coursedata.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}

                                                </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">City </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.city} onChange={onhandleChange} name='city'>
                                                    <option>Select City</option>
                                                    {city.map((item) => {
                                                        return (
                                                            <option value={item.City}>{item.City}</option>
                                                        )
                                                    })}


                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Purpose </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.purpose} onChange={onhandleChange} name='purpose'>
                                                    <option value="">Select Purpose</option>
                                                    <option value="Meeting">Meeting</option>
                                                    <option value="Others">Others</option>
                                                    <option value="Placement">Placement</option>
                                                    <option value="Placement Received">Placement Received</option>
                                                    <option value="Placements">Placements</option>
                                                    <option value="Project">Project</option>
                                                    <option value="Proposal">Proposal</option>
                                                    <option value="Seminar">Seminar</option>
                                                    <option value="Training">Training</option>
                                                    <option value="Training Received">Training Received</option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2" style={{ display: "flex", flexDirection: "column"}}>
                                                <label for="exampleInputUsername1">From Date</label>
                                                <DatePicker
        selected={value.fromdate ? new Date(value.fromdate) : null}
        onChange={(date) => onhandleChange({ target: { name: "fromdate", value: date } })}
        className="form-control"
        id="fromdate"
        dateFormat="dd-MM-yyyy"
        placeholderText="Select From Date"
      />

                                            </div>

                                            <div class="form-group col-lg-2" style={{ display: "flex", flexDirection: "column"}}>
                                                <label for="exampleInputUsername1">To Date</label>
                                                <DatePicker
        selected={value.todate ? new Date(value.todate) : null}
        onChange={(date) => onhandleChange({ target: { name: "todate", value: date } })}
        className="form-control"
        id="todate"
        dateFormat="dd-MM-yyyy"
        placeholderText="Select To Date"
      />
                                            </div>

                                        </div>

                                        <div>
                                        <button type="submit" class="btn btn-primary mr-2">Go</button>
                                        <button type="button" onClick={() => window.location.reload()} class="btn btn-primary mr-2">Clear</button>

                                        </div>


                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">Details</h4>
                                        </div>

                                    </div>

                                    <div  style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Const_Id}
                                            pagination
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={setPaginationModel}
                                            pageSizeOptions= {[50]}
                                            autoHeight={false}
                                            sx={{
                                              height: 500, // Ensure enough height for pagination controls
                                              '& .MuiDataGrid-footerContainer': {
                                                justifyContent: 'flex-end',
                                              },
                                            }}
                                            slotProps={{
                                              toolbar: {
                                                showQuickFilter: true,
                                              },
                                            }}
                                        />

                                    </div>

                                    <button type="submit" class="btn btn-primary mr-2">Print</button>
                                    <button type='button' onClick={() => {
                                        window.location.reload()
                                    }} class="btn btn-primary mr-2">Close</button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default ConsultancyReport
