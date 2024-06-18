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

const AssignmentsTaken = () => {

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
        coursename : ""|| uid.coursename,
        batchcode : ""|| uid.batchcode,
        assignmentname : ""|| uid.assignmentname,
        assignmentdate : ""|| uid.assignmentdate,
        returndate : ""|| uid.returndate,

        


    })

    useEffect(() => {
        setValue({
            coursename : uid.coursename,
            batchcode : uid.batchcode,
            assignmentname : uid.assignmentname,
            assignmentdate :uid.assignmentdate,
            returndate: uid.returndate,

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
            tablename : "assignmentstaken"
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
            tablename : "assignmentstaken"
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
            tablename : "assignmentstaken"
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
            

        coursename : value.coursename,
        batchcode : value.batchcode,
        assignmentname : value.assignmentname,
        assignmentdate :value.assignmentdate,
        returndate: value.returndate,
        uid : uid.id
        }


        axios.post(`${BASE_URL}/add_assignmenttaken`, data)
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
        { field: 'coursename', headerName: 'Course Name', flex: 2},
        { field: 'batchcode', headerName: 'Batch Code', flex: 2},
        { field: 'assignmentname', headerName: 'Assignmentname', flex: 2},
        { field: 'assignmentdate', headerName: 'Assignment Date', flex: 2},
        { filde: 'returndate', headerName: 'Return Date', flex: 2},
        
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
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Assignment Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            
                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Course Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.coursename} onChange={onhandleChange} name='coursename'>
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

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Batch Code<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchcode} onChange={onhandleChange} name='batchcode'>
                                                    <option>010021</option>
                                                    <option>010023</option>
                                                    <option>010024</option>
                                                    <option>010025</option>
                                                    <option>010026</option>
                                                    <option>010027</option>
                                                    
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Assignment Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.assignmentname} onChange={onhandleChange} name='assignmentname'>
                                                    <option>H.V.A.C-1</option>
                                                    <option>H.V.A.C-2</option>
                                                    <option>H.V.A.C-3</option>
                                                    <option>H.V.A.C-4</option>
                                                    <option>H.V.A.C-5</option>
                                                    <option>H.V.A.C-6</option>
                                                    <option>H.V.A.C-7</option>
                                                    <option>H.V.A.C-8</option>
                                                    <option>H.V.A.C-9</option>
                                                    <option>H.V.A.C-10</option>
                                                    
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Assignment Date<span className='text-danger'>*</span> </label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.assignmentdate} name='assignmentdate' onChange={onhandleChange} />                                                    <option></option>
                                                   
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Return Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.returndate} name='returndate' onChange={onhandleChange} />
                                                
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
                                            <h4 class="card-title">Assignment Details</h4>
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

export default AssignmentsTaken
