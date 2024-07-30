import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
//import FormControlLabel from '@mui/material/FormControlLabel';

const RollNumberAllot = () => {

    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [vendordata, setStudent] = useState([])
    const [uid, setUid] = useState([])
    const [hide, setHide] = useState(false)


    const getbatch = async (id) => {

        const data = {
            courseid: id
        }

        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
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





    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
        { field: 'attendee', headerName: 'Student Code', flex: 2 },
        { field: 'instructor', headerName: 'Student Name', flex: 2 },
        { field: 'description', headerName: 'Admission Date', flex: 2 },
        { field: 'feedback', headerName: 'Phase', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => (params.row.id)} />
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => (params.row.id)} />
                    </>
                )
            }
        },
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
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
                                                <label for="exampleFormControlSelect1">Select Course</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selectcourse} name='selectcourse' onChange={(e) => getbatch(e.target.value)}>
                                                    <option>Select Course</option>

                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}

                                                </select>

                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1"></label>
                                                <select class="form-control form-control-lg" id="exampleFromControlSelect1" value={value.rollnumberallot} name='rollnumberallot' onChange={(e) => getstudentlisitng(e.target.value)}>

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
                                            getRowId={(row) => row.Batch_Id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}


                                        />

                                    </div>}
                                    <button type="submit" class="btn btn-primary mr-2">Allot Roll Number</button>

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
