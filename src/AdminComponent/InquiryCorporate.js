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


const InquiryCorporate = () => {

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

        <div class="container-fluid page-body-wrapper col-lg-10">
            <div class="main-panel">
            <InnerHeader />
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Corporate Inquiry Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Inquirer<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.firstname} placeholder="First Name*" name='firstname' onChange={onhandleChange} />
                                                {error.facultyname && <span className='text-danger'>{error.name}</span>}
                                            </div>
                                           
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1"></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.middlename} placeholder="Middle Name" name='middlename' onChange={onhandleChange} />
                                               
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1"></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.lastname} placeholder="Last Name" name='name' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Number</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.number} placeholder="Number" name='number' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">E-Mail</label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email} placeholder="E-Mail" name='email' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Business</label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.business} placeholder="Business" name='business' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Company Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.companyname} placeholder='Company Name' name='comapnyname ' onChange={onhandleChange} />
                                                
                                            </div>

                                            

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Designation</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.designation} placeholder='Designation' name='designation ' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Discussion</label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.discussion} placeholder="Add Remark" name='discussion' onChange={onhandleChange}></textarea>
                                                
                                            </div>


                                           <div class="col-lg-12">
                                            <h4 class="card-title">Training Programme & Batch Details</h4>
                                            <hr></hr>
                                            </div>
                                            
                                           
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Course</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} name='course' onChange={onhandleChange} >
                                                    <option>Select</option>
                                                    <option> Training in Process Plant System Modelling Using E3D</option>
                                                    <option>Advance Pipe Stress Analysis </option>
                                                    <option>Air Conditioning System Design (HVAC)</option>
                                                    <option>Autocad - Piping</option>
                                                    <option>Civil/Structural Design &amp; Drafting </option>
                                                    <option>Electrical &amp; Instrumentation Design and Drafting </option>
                                                    <option>Electrical System Design</option>
                                                    <option>Engineering Design &amp; Drafting </option>
                                                    <option>Fire Alarm and Protection System </option>
                                                    <option>Fundamentals of Offshore</option>
                                                    <option>Health, Safety &amp; Environment in Construction</option>
                                                    <option>HVAC Design and Drafting</option>
                                                    <option>Masonry/Carpentry</option>
                                                    <option>Mechanical Design of Process Equipment</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='Date' onChange={onhandleChange} />
                                                
                                            </div>


                                            
                                            <div class="col-lg-12">
                                            <h4 class="card-title">Address Details</h4>
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
                                            <div class="form-group col-lg-4">
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

export default InquiryCorporate