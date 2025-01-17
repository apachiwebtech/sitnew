import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';

const StudentPlacementReport = () => {

    const [coursedata, setCourseData] = useState([])
    const [courseid, setCourseId] = useState([])
    const [batchid, setbatchId] = useState([])
    const [batch, setBatch] = useState([])
    const [student, setStudent] = useState([])
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})




    const [value, setValue] = useState({
        college_name: "" || uid.college_name,
        university: "" || uid.university,
        contact_person: "" || uid.contact_person,
        designation: "" || uid.designation,



    })




    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!batchid) {
            isValid = false;
            newErrors.batchid = "This is required"
        }

        setError(newErrors)
        return isValid
    }


    async function getCourseData() {
        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                setCourseData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }



    async function getbatch(courseid) {
        setCourseId(courseid)
        const data = {
            courseid: courseid
        }
        axios.post(`${BASE_URL}/getcoursewisebatch`, data)
            .then((res) => {
                setBatch(res.data)
            })
            .catch((err) => {
                console.log(err)
            })


    }

    async function getbatchwisestudent(batchid) {
        setbatchId(batchid)

        if (validateForm()) {
            const data = {
                Batch_Id: batchid
            }
            axios.post(`${BASE_URL}/getcvStudent`, data)
                .then((res) => {
                    setStudent(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }



    }

    useEffect(() => {
        getCourseData()
    }, [])








    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Placement Report</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" >
                                        <div class='row'>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={courseid} onChange={(e) => getbatch(e.target.value)}name='course'>
                                                    <option>Select Course</option>
                                                    {coursedata.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleFormControlSelect1">Batch</lable>
                                                <select class="form-control form-control-lg" id="exampleFromControlSelect1" value={batchid} name='batch' onChange={(e) => getbatchwisestudent(e.target.value)} >
                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Go</button>

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

                                    {/* <div>
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
                                    </div> */}

                                    <button type="submit" class="btn btn-primary mr-2">Excel</button>
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

export default StudentPlacementReport
