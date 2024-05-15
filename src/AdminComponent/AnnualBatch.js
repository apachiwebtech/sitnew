import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid ,GridToolbar} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Select } from '@mui/material';


const AnnualBatch = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);




    const [value, setValue] = useState({
            selectcourse : ""|| uid.selectcourse,
            category : ""|| uid.category,
            description : ""|| uid.description,
            training : ""|| uid.training,
            actualdate : ""|| uid.actualdate,
            timings : ""|| uid.timings,
            coursename : ""|| uid.coursename,
            batchcode: ""|| uid.batchcode,
            planned :""|| uid.planned,
            admission: ""|| uid.admission,
            duration:""|| uid.duration,
            coordinator: ""|| uid.coordinator

    })

    useEffect(() => {
        setValue({

            selectcourse : uid.selectcourse,
            category : uid.category,
            description : uid.description,
            training : uid.training,
            actualdate : uid.actualdate,
            timings : uid.timings,
            coursename : uid.coursename,
            batchcode: uid.batchcode,
            planned : uid.planned,
            admission: uid.admission,
            duration: uid.duration,
            coordinator: uid.coordinator,
            uid:uid.id
   

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.selectcourse) {
        isValid = false;
        newErrors.name = "Name is require"
       }
        
        setError(newErrors)
        return isValid
    }


    async function getAnnualData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getAnnualData() {
        const data = {
            tablename : "awt_annual"
        }
        axios.post(`${BASE_URL}/get_data`,data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAnnualData()
        value.title = ""
        setError({})
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

    const handleUpdate = (id) => {
        const data = {
            u_id : id,
            tablename : "awt_annual"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data , "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename : "awt_annual"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
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

    // if(validateForm()){
        const data = {
            selectcourse : value.selectcourse,
            category : value.category,
            description : value.description,
            training : value.timings,
            actualdate : value.actualdate,
            timings : value.timings,
            coursename : value.coursename,
            batchcode: value.batchcode,
            planned : value.planned,
            admission: value.admission,
            duration: value.duration,
            coordinator: value.coordinator,
            uid:uid.id
        }


        axios.post(`${BASE_URL}/add_annual`, data)
            .then((res) => {
               console.log(res)
               getAnnualData()

            })
            .catch((err) => {
                console.log(err)
            })
    // }

   
        


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
        { field: 'selectcourse', headerName: 'Course Name', flex: 2 },
        { field: 'batchcode', headerName: 'Batch No.', flex: 2 },
        { field: 'category', headerName: 'Category', flex: 2},
        { field: 'description', headerName: 'Timings', flex: 2},
        { field: 'planned', headerName: 'Planned Start Date', flex: 2},
        { field: 'actualdate', headerName: 'Actual Start Date', flex: 2},
        { field: 'admission', headerName: 'Last Date of Admission', flex: 2},
        { field: 'training', headerName: 'Training Completion Date', flex: 2},
        { field: 'duration', headerName: 'Duration', flex: 2},
        { field: 'coordinator', headerName: 'Training Coordinator', flex: 2},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                    </>
                )
            }
        },
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Annual Batch</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Select Course<span className='text-danger'>*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selectcourse} name='selectcourse' onChange={onhandleChange} >
                                                    {error.selectcourse && <span className='text-danger'>{error.selectcourse}</span>}
                                                    <option>Select</option>
                                                    <option>Training in Process Plant System Modelling Using E3D</option>
                                                    <option>Advance Pipe Stress Analysis</option>
                                                    <option>Air Conditioning System Design (HVAC)</option>
                                                    <option>Autocad - Piping</option>
                                                    <option>Civil/Structural Design & Drafting</option>
                                                    <option>Electrical & Instrumentation Design and Drafting</option>
                                                    <option>Electrical System Design</option>
                                                </select>
                                            </div>

                                            
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Batch Code</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.batchcode} placeholder="Batch Code" name='batchcode' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Category</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.category} name='category' onChange={onhandleChange} >
                                                    {error.category && <span className='text-danger'>{error.category}</span>}
                                                    <option>Select</option>
                                                    <option>Full Times</option>
                                                    <option>Part Times</option>
                                                    <option>Corporate Training</option>
                                                    <option>Weekend Batches</option>
                                                    <option>Transfer</option>
                                                    <option>ONLINE</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Description</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.description} placeholder="Description" name='description' onChange={onhandleChange} />
                                               
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Training completion Date</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.training} placeholder="End Date" name='training' onChange={onhandleChange} />
                                                
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Actual Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.actualdate} placeholder="Actual Date" name='actualdate' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Timings</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.timings} placeholder="Timings" name='timings' onChange={onhandleChange} />
                                                
                                            </div>

                                           
                                            <div class="col-lg-12">
                                                <hr></hr>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Course Name (if changed)</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.coursename} placeholder="Course Name" name='coursename' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Planned Start Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.planned} placeholder="Planned Start Date" name='planned' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Last Date of Admission</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.admission} placeholder="Last Date of Admission" name='admission' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Duration</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.duration} placeholder="Duration" name='duration' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Training Coordinator</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.coordinator} placeholder="Training Coordinator" name='coordinator' onChange={onhandleChange} />
                                                
                                            </div>

                                            

                                        </div>
                                            

                                          
                          
                                        


                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Annual Batch</h4>
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
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default AnnualBatch