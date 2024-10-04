import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";
import { error } from 'jquery';
// import { Toast } from 'bootstrap';
import toast, { Toaster } from 'react-hot-toast';
//import FormControlLabel from '@mui/material/FormControlLabel';

const RollNumberAllot = () => {

    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [vendordata, setStudent] = useState([])
    const [uid, setUid] = useState([])
    const [hide, setHide] = useState(false)
    const [loading, setLoading] = useState(true)


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


    function setrollno(){
      const data = {
        batch_code: value.rollnumberallot,
    }
      axios.post(`${BASE_URL}/allocatedrollno`,data)
      .then((res)=>{
        getstudentlisitng(value.rollnumberallot);
        toast.success('Roll No Changes', {
          position: "bottom-center"
        })
      })
      .catch((err)=>{
        console.log(err)
        })
    }


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
        { field: 'Student_Code', headerName: 'Student Code', flex: 2 },
        { field: 'Student_Name', headerName: 'Student Name', flex: 2 },
        { field: 'Admission_Date', headerName: 'Admission Date', flex: 2 },
        { field: 'Phase', headerName: 'Phase', flex: 2 ,renderCell: (param) =>{
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
        }},


    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <Toaster />
            {loading && <Loader />}


            <div class="main-panel" style={{display : loading ? "none" : "block"}}>
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
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

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
                                            <h4 class="card-title">Allot Roll Number List</h4>
                                        </div>

                                    </div>
                                    {hide && <div>

                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Student_Id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}


                                        />

                                    </div>}
                                    <button type="submit" class="btn btn-primary mr-2" onClick={setrollno}  >Allot Roll Number</button>

                                    <button type='button' onClick={() => {
                                        window.location.reload()
                                    }} class="btn btn-light">Save</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default RollNumberAllot
