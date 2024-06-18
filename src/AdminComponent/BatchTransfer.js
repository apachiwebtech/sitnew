import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LibraryBooks } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BatchTransfer = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [specification, setSpecification] = useState("")
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    console.log(specification)

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
        coursename: "" || uid.coursename,
        oldbatchno: "" || uid.oldbatchno,
        student: "" || uid.student,
        newbatch: "" || uid.newbatch,
        transferammount: "" || uid.transferammount,
        paymenttype: "" || uid.paymenttype





    })

    useEffect(() => {
        setValue({
            coursename: uid.coursename,
            oldbatchno: uid.oldbatchno,
            student: uid.student,
            newbatch: uid.newbatch,
            transferammount: uid.transferammount,
            paymenttype: uid.paymenttype,

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
            tablename: "awt_batchtransfer"
        }
        axios.post(`${BASE_URL}/get_data`, data)
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
            u_id: id,
            tablename: "awt_batchtransfer"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_batchtransfer"
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



            coursename: value.coursename,
            oldbatchno: value.oldbatchno,
            student: value.student,
            newbatch: value.newbatch,
            transferammount: value.transferammount,
            paymenttype: value.paymenttype,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_batchtransfer`, data)
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
        { field: 'coursename', headerName: 'Course Name', flex: 2 },
        { field: 'oldbatchno', headerName: 'Old Batch No.', flex: 2 },
        { field: 'student', headerName: 'Student', flex: 2 },
        { field: 'newbatch', headerName: 'New Batch', flex: 2 },
        { field: 'transferammount', headerName: 'Transfer Ammounts', flex: 2 },
        { field: 'paymenttype', headerName: 'Payment Type', flex: 2 },

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
                                    <h4 class="card-title">Transfer Batch</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleFormControlSelect1">Course Name</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.coursename} name='coursename' onChange={onhandleChange}>
                                                    <option>Select Course</option>
                                                    <option> Training in Process Plant System Modelling Using E3D</option>
                                                    <option>Advance Pipe Stress Analysis </option>
                                                    <option>Air Conditioning System Design (HVAC)</option>
                                                    <option>Autocad - Piping</option>
                                                    <option>Basics AutoCAD – 2D</option>
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

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Old Batch No.</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.oldbatchno} name='oldbatchno' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Student</label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1" value={value.student} name='student' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">New Batch Number</label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1" value={value.newbatch} name='newbatch' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Transfer Ammount</lable>
                                                <input text="text" class="form-control" id="exampleInputUsername1" value={value.transferammount} placeholder='00.00' name='transferammount' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Payment Type</label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1" value={value.paymenttype} name='paymenttype' onChange={onhandleChange}>
                                                    <option>Lumpsum</option>
                                                    <option>Installment</option>
                                                </select>
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
                                            <h4 class="card-title">View Batch Transfer</h4>
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

export default BatchTransfer
