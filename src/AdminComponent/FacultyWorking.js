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
import { LibraryBooks } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Faculty from './Faculty';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const FacultyWorking = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
      setChecked([event.target.checked, event.target.checked]);
    };
  
    const handleChange2 = (event) => {
      setChecked([event.target.checked, checked[1]]);
    };
  
    const handleChange3 = (event) => {
      setChecked([checked[0], event.target.checked]);
    };

    // const children = (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    //       <FormControlLabel
    //         label="Child 1"
    //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label="Child 2"
    //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );

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
                                    <h4 class="card-title">View Faculty Working Hours Info</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                                
                                            </div>


                                            
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>Select</option>
                                                    <option>Administration</option>
                                                    <option>Business Development</option>
                                                    <option>Training &amp; Development</option>
                                                    <option>Account</option>
                                                    <option>Placement</option>
                                                    <option>Purchase</option>
                                                    <option>Leadership / DD</option>
                                                    <option>Quality Assurance</option>
                                                    <option>Human Resources</option>
                                                    <option>Corporate Training</option>
                                                    <option>Test User</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option></option>
                                                    
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Faculty</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.faculty} onChange={onhandleChange} name='faculti'>
                                                    <option></option>
                                                    
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Faculty Time</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.facultytime} onChange={onhandleChange} name='facultytime'>
                                                    <option>Select</option>
                                                    <option>5:00AM</option>
                                                    <option>5:15AM</option>
                                                    <option>5:30AM</option>
                                                    <option>5:45AM</option>
                                                    <option>6:00AM</option>
                                                    <option>6:15AM</option>
                                                    <option>6:30AM</option>
                                                    <option>6:45AM</option>
                                                    <option>7:00AM</option>
                                                    <option>7:15AM</option>
                                                    <option>7:30AM</option>
                                                    <option>7:45AM</option>
                                                    <option>8:00AM</option>
                                                    <option>8:15AM</option>
                                                    <option>8:30AM</option>
                                                    <option>8:45AM</option>
                                                    <option>9:00AM</option>
                                                    <option>9:15AM</option>
                                                    <option>9:30AM</option>
                                                    <option>9:45AM</option>
                                                    <option>10:00AM</option>
                                                    <option>10:15AM</option>
                                                    <option>10:30AM</option>
                                                    <option>10:45AM</option>
                                                    <option>11:00AM</option>
                                                    <option>11:15AM</option>
                                                    <option>11:30AM</option>
                                                    <option>11:45AM</option>
                                                    <option>12:00PM</option>
                                                    <option>12:15PM</option>
                                                    <option>12:30PM</option>
                                                    <option>12:45PM</option>
                                                    <option>1:00PM</option>
                                                    <option>1:15PM</option>
                                                    <option>1:30PM</option>
                                                    <option>1:45PM</option>
                                                    <option>2:00PM</option>
                                                    <option>2:15PM</option>
                                                    <option>2:30PM</option>
                                                    <option>3:00PM</option>
                                                    <option>3:15PM</option>
                                                    <option>3:30PM</option>
                                                    <option>3:45PM</option>
                                                    <option>4:00PM</option>
                                                    <option>4:15PM</option>
                                                    <option>4:30PM</option>
                                                    <option>4:45PM</option>
                                                    <option>5:00PM</option>
                                                    <option>5:15PM</option>
                                                    <option>5:30PM</option>
                                                    <option>5:45PM</option>
                                                    <option>6:00PM</option>
                                                    <option>6:15PM</option>
                                                    <option>6:30PM</option>
                                                    <option>6:45PM</option>
                                                    <option>7:00PM</option>
                                                    <option>7:15PM</option>
                                                    <option>7:30PM</option>
                                                    <option>7:45PM</option>
                                                    <option>8:00PM</option>
                                                    <option>8:15PM</option>
                                                    <option>8:30PM</option>
                                                    <option>8:45PM</option>
                                                    <option>9:00PM</option>
                                                    <option>9:15PM</option>
                                                    <option>9:30PM</option>
                                                    <option>9:45PM</option>
                                                    <option>10:00PM</option>
                                                    <option>10:15PM</option>
                                                    <option>10:30PM</option>
                                                    <option>10:45PM</option>
                                                    <option>11:00PM</option>
                                                    <option>11:15PM</option>
                                                    <option>11:30PM</option>
                                                    <option>11:45PM</option>
                                                    <option>12:00PM</option>
                                                    <option>00:00AM</option>
                                                    <option>12:00AM</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">To</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.to} onChange={onhandleChange} name='to'>
                                                    <option>Select</option>
                                                    <option>5:00AM</option>
                                                    <option>5:15AM</option>
                                                    <option>5:30AM</option>
                                                    <option>5:45AM</option>
                                                    <option>6:00AM</option>
                                                    <option>6:15AM</option>
                                                    <option>6:30AM</option>
                                                    <option>6:45AM</option>
                                                    <option>7:00AM</option>
                                                    <option>7:15AM</option>
                                                    <option>7:30AM</option>
                                                    <option>7:45AM</option>
                                                    <option>8:00AM</option>
                                                    <option>8:15AM</option>
                                                    <option>8:30AM</option>
                                                    <option>8:45AM</option>
                                                    <option>9:00AM</option>
                                                    <option>9:15AM</option>
                                                    <option>9:30AM</option>
                                                    <option>9:45AM</option>
                                                    <option>10:00AM</option>
                                                    <option>10:15AM</option>
                                                    <option>10:30AM</option>
                                                    <option>10:45AM</option>
                                                    <option>11:00AM</option>
                                                    <option>11:15AM</option>
                                                    <option>11:30AM</option>
                                                    <option>11:45AM</option>
                                                    <option>12:00PM</option>
                                                    <option>12:15PM</option>
                                                    <option>12:30PM</option>
                                                    <option>12:45PM</option>
                                                    <option>1:00PM</option>
                                                    <option>1:15PM</option>
                                                    <option>1:30PM</option>
                                                    <option>1:45PM</option>
                                                    <option>2:00PM</option>
                                                    <option>2:15PM</option>
                                                    <option>2:30PM</option>
                                                    <option>3:00PM</option>
                                                    <option>3:15PM</option>
                                                    <option>3:30PM</option>
                                                    <option>3:45PM</option>
                                                    <option>4:00PM</option>
                                                    <option>4:15PM</option>
                                                    <option>4:30PM</option>
                                                    <option>4:45PM</option>
                                                    <option>5:00PM</option>
                                                    <option>5:15PM</option>
                                                    <option>5:30PM</option>
                                                    <option>5:45PM</option>
                                                    <option>6:00PM</option>
                                                    <option>6:15PM</option>
                                                    <option>6:30PM</option>
                                                    <option>6:45PM</option>
                                                    <option>7:00PM</option>
                                                    <option>7:15PM</option>
                                                    <option>7:30PM</option>
                                                    <option>7:45PM</option>
                                                    <option>8:00PM</option>
                                                    <option>8:15PM</option>
                                                    <option>8:30PM</option>
                                                    <option>8:45PM</option>
                                                    <option>9:00PM</option>
                                                    <option>9:15PM</option>
                                                    <option>9:30PM</option>
                                                    <option>9:45PM</option>
                                                    <option>10:00PM</option>
                                                    <option>10:15PM</option>
                                                    <option>10:30PM</option>
                                                    <option>10:45PM</option>
                                                    <option>11:00PM</option>
                                                    <option>11:15PM</option>
                                                    <option>11:30PM</option>
                                                    <option>11:45PM</option>
                                                    <option>12:00PM</option>
                                                    <option>00:00AM</option>
                                                    <option>12:00AM</option>
                                                </select>
                                            </div>
                                            
                                            

                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Work</label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.work} placeholder="Work" name='work' onChange={onhandleChange}></textarea>
                                               
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
                                            <h4 class="card-title">View Faculty Working Hours</h4>
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

                                    
                                      {/* <div>
                                      <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Excel</button>
                                      </div> */}



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default FacultyWorking
