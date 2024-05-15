import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid ,GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Select } from '@mui/material';


const Faculty = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);




    const [value, setValue] = useState({
        facultyname : ""|| uid.facultyname,
        facultycode : ""|| uid.facultycode,
        dob : ""|| uid.dob,
        nationality : ""|| uid.nationality,
        discipline : ""|| uid.discipline,
        status : ""|| uid.status,
        invoicename : ""|| uid.invoicename,
        maritalstatus: ""|| uid.maritalstatus,
        joiningdate : ""|| uid.joiningdate,
        employment: ""|| uid.employment,
        software: ""|| uid.software,
        training: ""|| uid.training,
        address: ""|| uid.address,
        city: ""|| uid.city,       
        pin: ""|| uid.pin,
        state: ""|| uid.state,
        country: ""|| uid.country,
        mobile: ""|| uid.mobile,
        email: ""|| uid.email,
        full_address: ""|| uid.full_address,
        city_name: ""|| uid.city_name,
        pin_code: ""|| uid.pin_code,
        state_name: ""|| uid.state_name,
        country_name: ""|| uid.country_name,
        mobi: ""|| uid.mobi


    })

    useEffect(() => {
        setValue({

           
            facultyname : uid.facultyname,
            facultycode : uid.facultycode,
            dob : uid.dob,
            nationality : uid.nationality,
            discipline : uid.discipline,
            status : uid.status,
            invoicename : uid.invoicename,
            maritalstatus: uid.maritalstatus,
            joiningdate : uid.joiningdate,
            employment: uid.employment,
            software: uid.software,
            training: uid.training,
            address: uid.address,
            city: uid.city,       
            pin: uid.pin,
            state: uid.state,
            country: uid.country,
            mobile: uid.mobile,
            email: uid.email,
            full_address: uid.full_address,
            city_name: uid.city_name,
            pin_code: uid.pin_code,
            state_name: uid.state_name,
            country_name: uid.country_name,
            mobi: uid.mobi,
   

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.facultyname) {
        isValid = false;
        newErrors.name = "Name is require"
       }
        
        setError(newErrors)
        return isValid
    }


    async function getFacultyData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getFacultyData() {
        const data = {
            tablename : "awt_faculty"
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
        getFacultyData()
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
            tablename : "awt_faculty"
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
            tablename : "awt_faculty"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getFacultyData()

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
            facultyname : value.facultyname,
            facultycode : value.facultycode,
            dob : value.dob,
            nationality : value.nationality,
            discipline : value.discipline,
            status : value.status,
            invoicename : value.invoicename,
            maritalstatus: value.maritalstatus,
            joiningdate : value.joiningdate,
            employment: value.employment,
            software: value.software,
            training: value.training,
            address: value.address,
            city: value.city,       
            pin: value.pin,
            state: value.state,
            country: value.country,
            mobile: value.mobile,
            email: value.email,
            full_address: value.full_address,
            city_name: value.city_name,
            pin_code: value.pin_code,
            state_name: value.state_name,
            country_name: value.country_name,
            mobi: value.mobi,
            uid:uid.id
        }


        axios.post(`${BASE_URL}/add_faculty`, data)
            .then((res) => {
               console.log(res)
               getFacultyData()

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
        { field: 'facultyname', headerName: 'Faculty Name', flex: 2 },
        { field: 'discipline', headerName: 'Discipline', flex: 2 },
        { field: 'employment', headerName: 'Employment Type', flex: 2},
        { field: 'training', headerName: 'Training Category', flex: 2},
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
                                    <h4 class="card-title">Faculty Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Faculty Name<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.facultyname} placeholder="Faculty Name*" name='facultyname' onChange={onhandleChange} />
                                                {error.facultyname && <span className='text-danger'>{error.facultyname}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Faculty Code</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.facultycode} placeholder="Faculty Code" name='facultycode' onChange={onhandleChange} />
                                              
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Date Of Brith</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.dob} placeholder="Contact Person" name='dob' onChange={onhandleChange} />
                                               
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Nationality</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.nationality} placeholder="Nationality" name='nationality' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Discipline</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.discipline} name='discipline' onChange={onhandleChange} >
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
                                                <label for="exampleFormControlSelect1">Status </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.status} onChange={onhandleChange} name='status'>
                                                    <option>Select Course</option>
                                                    <option value="1">Instrumentation & Control</option>
                                                    <option value="2">Piping Engineering</option>
                                                    <option value="3">Mechanical Design</option>
                                                    <option value="4">Electrical Engineering,</option>
                                                    <option value="6">Water & Waste Water Engg.</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Invoice Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.invoicename} placeholder="Invoice Name" name='invoicename' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Marital Status</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.maritalstatus} name='maritalstatus' onChange={onhandleChange} >
                                                    <option>Select</option>
                                                    <option>Single</option>
                                                    <option>Married</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Joining Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.joiningdate} placeholder="Joining Date" name='joiningdate' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Employment Type</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.employment} name='employment' onChange={onhandleChange} >
                                                    <option>Select</option>
                                                    <option>Temporary</option>
                                                    <option>Permanent</option>
                                                    <option>Contract</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Software Knowledge</label>
                                                <input type="mobile" class="form-control" id="exampleInputUsername1" value={value.software} placeholder="Software Knowledge" name='software' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Training Category</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.training} name='training' onChange={onhandleChange} >
                                                    <option>Select</option>
                                                    <option>Local</option>
                                                    <option>International</option>
                                                    <option>Project</option>
                                                    <option>MockInterview</option>
                                                    <optio>Guest</optio>
                                                </select>
                                            </div>
                                           <div class="col-lg-12">
                                            <h4 class="card-title">Present Address</h4>
                                            <hr></hr>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Address </label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.address} placeholder="Address" name='address' onChange={onhandleChange}></textarea>
                                                
                                            </div>
                                            
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">City</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.city} placeholder="City" name='city' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Pin</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.pin} placeholder="Pin" name='pin' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">State</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.state} placeholder="State" name='state' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Country</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.country} placeholder="Country" name='country' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Mobile</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.mobile} placeholder="Mobile" name='mobile' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">E-Mail</label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email} placeholder="E-Mail ID" name='email' onChange={onhandleChange} />
                                                
                                            </div>
                                            

                                            <div class="col-lg-12">
                                            <h4 class="card-title">Permanent Address</h4>
                                            <hr></hr>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Address </label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.full_address} placeholder="Address" name='full_address' onChange={onhandleChange}></textarea>
                                                
                                            </div>
                                            
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">City</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.city_name} placeholder="City" name='city_name' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Pin</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.pin_code} placeholder="Pin" name='pin_code' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">State</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.state_name} placeholder="State" name='state_name' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Country</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.country_name} placeholder="Country" name='country_name' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Mobile</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.mobi} placeholder="Mobile" name='mobi' onChange={onhandleChange} />
                                                
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
                                            <h4 class="card-title">Faculty Information</h4>
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

export default Faculty