import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";
import { error } from 'jquery';
// import { Toast } from 'bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { StyledDataGrid } from './StyledDataGrid';
//import FormControlLabel from '@mui/material/FormControlLabel';

const RollNumberAllot = () => {

    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [student, setStudent] = useState([])
    const [uid, setUid] = useState([])
    const [hide, setHide] = useState(false)
    const [loading, setLoading] = useState(true)
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });
    const [done, setDone] = useState('')

    const getbatch = async (id) => {

        const data = {
            courseid: id
        }

        try {
            const res = await
                axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data);

        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };



    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                SetCourse(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCourseData()

        setUid([])
    }, [])


    const [value, setValue] = useState({


    })

    useEffect(() => {
        setValue({

        })
    }, [uid])

    const handleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        if (e.target.name == 'rollnumberallot') {
            getstudentlisitng(e.target.value)
        }
    }


    function setrollno() {

        const confirm = window.confirm("Are you sure?")

        if (confirm) {
            const data = {
                batch_Id: value.rollnumberallot,
            }
            axios.post(`${BASE_URL}/allocatedrollno`, data)
                .then((res) => {
                    getstudentlisitng(value.rollnumberallot);
                    toast.success('Roll No Changes', {
                        position: "bottom-center"
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }


    const getstudentlisitng = (id) => {
        setHide(true)
        const data = {
            batch_Id: id
        }

        axios.post(`${BASE_URL}/getbatchstudent`, data)
            .then((res) => {
                setStudent(res.data)

                if(res.data && res.data.length > 0){
                    
                    setDone(res.data[0].IsDone)
                }
            })
    }


    const columns = [
        {
            field: 'index',
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 0.5,
            filterable: false,

        },
        { field: 'Student_Code', headerName: 'Student Code', flex: 2 },
        { field: 'Student_Name', headerName: 'Student Name', flex: 2 },
        {
            field: 'Admission_Date', 
            headerName: 'Admission Date', 
            flex: 2, 
            valueGetter: (params) => {
              if (!params.value) return ''; // Handle null/undefined values
          
              // Regex to check if the date is already in dd-mm-yyyy format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return ''; // Handle invalid dates
          
              // Convert to dd-mm-yyyy format
              return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
            }
          },
          
        {
            field: 'Phase', headerName: 'Phase', flex: 2, renderCell: (param) => {
                return (
                    <div class="form-group ">
                        <label for="exampleFormControlSelect1"></label>
                        <select class="form-control form-control-lg" id="exampleFromControlSelect1" >

                            <option>Select Phase</option>

                            <option value='part1'>Part 1</option>
                            <option value='part2'>Part 2</option>


                        </select>
                    </div>
                )
            }
        },


    ];


    const rowsWithIds = student.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <Toaster />
            {loading && <Loader />}


            <div class="main-panel" style={{ display: loading ? "none" : "block" }}>
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">View Roll No. Allocated Batches</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" >
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Select Course<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.selectcourse} name='selectcourse' onChange={(e) => getbatch(e.target.value)}>
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
                                                <label for="exampleFormControlSelect1">Select Batch Code</label>
                                                <select class="form-control form-control-lg" id="exampleFromControlSelect1"
                                                    value={value.rollnumberallot} name='rollnumberallot' onChange={handleChange}>

                                                    <option>Select Batch</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                        </div>



                                    </form>

                                </div>
                            </div>
                        </div>

                        {hide &&
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div className='d-flex justify-content-between'
                                        style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                            <div>
                                                <h4 class="card-title">Allot Roll Number List</h4>
                                            </div>

                                        </div>
                                        <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>

                                            <StyledDataGrid
                                                rows={rowsWithIds}
                                                columns={columns}
                                                disableColumnFilter
                                                disableColumnSelector
                                                disableDensitySelector
                                                rowHeight={35}
                                                getRowId={(row) => row.Student_Id}
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
                                        <button type="submit" class="btn btn-primary mr-2" onClick={setrollno} disabled={done ? true : false}>Allot Roll Number</button>

                                        {/* <button type='button' onClick={() => {
                                      window.location.reload()
                                  }} class="btn btn-light">Save</button> */}

                                        <p className='text-danger'>*Once roll number is alloted you cant reallot.</p>

                                    </div>
                                </div>
                            </div>
                        }



                    </div>
                </div>
            </div >
        </div >

    )
}

export default RollNumberAllot
