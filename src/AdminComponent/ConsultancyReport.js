import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
//import FormControlLabel from '@mui/material/FormControlLabel';

const ConsultancyReport = () => {

    const [coursedata, setCourseData] = useState([])
    const [city, setCity] = useState([])
    const [consultant, setConsulatant] = useState([])





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
        { field: 'Date_Added', headerName: 'Created Date', width: 150 },
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

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">From Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.fromdate} name='fromdate' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">To Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.todate} name='todate' onChange={onhandleChange} />
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
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Details</h4>
                                        </div>

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Const_Id}
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
