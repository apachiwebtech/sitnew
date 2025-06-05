import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { StyledDataGrid } from "./StyledDataGrid";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import Cookies from "js-cookie";

const FeedbackAnalysis = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });



    const [value, setValue] = useState({
        training : ""|| uid.training,
        attendee : ""|| uid.attendee,
        instructor : ""|| uid.instructor,
        description : ""|| uid.description,
        feedback : ""|| uid.feedback,

        


    })

    useEffect(() => {
        setValue({
            training : uid.training,
            attendee : uid.attendee,
            instructor : uid.instructor,
            description :uid.description,
            feedback: uid.feedback,

        })
    }, [uid])


    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}


    //    if (!value.college) {
    //     isValid = false;
    //     newErrors.name = "Name is require"
    //    }
    //     if (!value.email) {
    //         isValid = false;
    //         newErrors.email = "Email is require"
    //     }
    //     setError(newErrors)
    //     return isValid
    // }


    async function getEmployeeData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getEmployeeData() {
        const data = {
            tablename : "awt_employeerecord"
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
        getEmployeeData()
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
            tablename : "awt_employeerecord"
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
            tablename : "awt_employeerecord"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getEmployeeData()

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
            
        training : value.training,
        attendee : value.attendee,
        instructor : value.instructor,
        description :value.description,
        feedback: value.feedback,
        uid : uid.id
        }


        axios.post(`${BASE_URL}/add_employeerecord`, data)
            .then((res) => {
               console.log(res)
               getEmployeeData()

            })
            .catch((err) => {
                console.log(err)
            })
    // }

   
        


    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

 
    const roledata = {
            role: Cookies.get(`role`),
            pageid: 61,
        };
    
        const dispatch = useDispatch();
        const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);
    
        useEffect(() => {
            dispatch(getRoleData(roledata));
        }, []);



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
        { field: 'attendee', headerName: 'Attendee', flex: 2},
        { field: 'instructor', headerName: 'Instructor', flex: 2},
        { field: 'description', headerName: 'Description', flex: 2},
        { field: 'feedback', headerName: 'FeedBack', flex: 2},
        
        ...(roleaccess > 2 ? [{
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess > 2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />}
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />}
                    </>
                )
            }
        },] : [])
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Student Search Feedback Analysis Report Lecture Wise</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.department} onChange={onhandleChange} name='department'>
                                                    <option>Select Course</option>
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
                                                    <option>MEP Engineering (Mechanical, Electrical &amp; Plumbing)</option>
                                                    <option>Offshore Engineering</option>
                                                    <option>Others</option>
                                                    <option>Pipeline Engineering</option>
                                                    <option>Piping Design &amp; Drafting </option>
                                                    <option>Piping Engineering </option>
                                                    <option>Piping Materials</option>
                                                    <option>Plant Design Management System (PDMS)</option>
                                                    <option>PLANT LAYOUT DESIGN</option>
                                                    <option>Priventive </option>
                                                    <option>Process Engineering</option>
                                                    <option>Process Equipment Fabrication Engineering</option>
                                                    <option>Process Instrumentation &amp; Control</option>
                                                    <option>PV Elite </option>
                                                    <option>Rotating Equipment</option>
                                                    <option>Smart Plant P&amp;ID</option>
                                                    <option>Solar PV Power System with renewable Energy  </option>
                                                    <option>Structural Engineering </option>
                                                    <option>The Art of Developing a Balanced Personality</option>
                                                    <option>Water &amp; Waste Water Engg.</option>
                                                </select>
                                            </div>

                                            
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batck<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option></option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Lecture<span className='text-danger'>*</span></label>
                                                <select class="form-control form-control-lg" id="examplaFromControlSelect1" value={value.Lecture} onChange={onhandleChange} name='Lecture'>
                                                    <option></option>
                                                </select>                                                
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">FeedBack<span className='text-danger'>*</span></label>
                                                <select class="form-control form-control-lg" id="examplaFromControlSelect1" value={value.feedback} onChange={onhandleChange} name='feedback'>
                                                    <option></option>
                                                </select>                                                
                                            </div>

                                        </div>

                                        <div class="from-group col-lg-12">
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group" >
                                                        <FormControlLabel value="alllectures" control={<Radio />} label="All Lectures" />
                                                        <FormControlLabel value="studentwise" control={<Radio />} label="Student Wise" />
                                                        <FormControlLabel value="facultywise" control={<Radio />} label="Faculty Wise" />
                                                        
                                                      
                                                    </RadioGroup>
                                                </FormControl>
                                                
                                            </div>


                                        
                                        <button type="submit" class="btn btn-primary mr-2">Show Final Result</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2  ">Show Lecture Wise</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between' style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title"></h4>
                                        </div>

                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
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
            </div >
        </div >

    )
}

export default FeedbackAnalysis
