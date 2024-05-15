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
import { LibraryBooks } from '@mui/icons-material';


const LectureTaken = () => {

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

    // const suggestion = (
    //     <Box sx={{flexDirection: 'column', }}>
    //       <FormControlLabel
    //         label="Suggestion Required"
    //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label="Brief answer required"
    //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );

        const [selectedOption, setSelectedOption] = useState('');
      
        //Function to handle radio button change
        const handleOptionChange = (event) => {
          setSelectedOption(event.target.value);
        };




    const [value, setValue] = useState({
        questionfor : ""|| uid.questionfor,
        category : ""|| uid.category,
        question : ""|| uid.question,
        selection : ""|| uid.selection,
        order : ""|| uid.order


    })

    useEffect(() => {
        setValue({

        questionfor : uid.questionfor,
        category : uid.category,
        question : uid.question,
        selection : uid.selection,
        order :uid.order
   

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


    async function getFeedData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getFeedData() {
        const data = {
            tablename : "awt_feedback"
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
        getFeedData()
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
            tablename : "awt_feedback"
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
            tablename : "awt_feedback"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getFeedData()

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
            
        questionfor : value.questionfor,
        category : value.category,
        question : value.question,
        selection : value.selection,
        order :value.order,
        uid : uid.id
        }


        axios.post(`${BASE_URL}/add_feedback`, data)
            .then((res) => {
               console.log(res)
               getFeedData()

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
        { field: 'questionfor', headerName: 'Question For', flex: 2 },
        { field: 'question', headerName: 'Question', flex: 2 },
        { field: 'order', headerName: 'Question Order', flex: 2},
        
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
                                    <h4 class="card-title">Add Lecture Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Course</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>Select Course</option>
                                                    <option>Training in Process Plant System Modelling Using E3D</option>
                                                    <option>Advance Pipe Stress Analysis</option>
                                                    <option>Air Conditioning System Design (HVAC)</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Batch</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Lecture</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.lecture} onChange={onhandleChange} name='lecture'>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Class Room No.</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.classroom} onChange={onhandleChange} name='classroom'>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Lecture Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.lecturedate} name='lecturedate' onChange={onhandleChange} />
                                               
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Faculty</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.faculty} onChange={onhandleChange} name='faculty'>
                                                    <option>Select</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aadhar Classes</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>Abhay Gaikar</option>
                                                    <option>Abhijit A Kulkarni.</option>
                                                    <option>Abhijit Tapare</option>
                                                    <option>Abhilash Srinivasan</option>
                                                    <option>Abhishek Pednekar</option>
                                                    <option>Abhishek Rakesh Gupta</option>
                                                    <option>Abhishek Vyas</option>
                                                    <option>ABIDHUSAIN RIZVI</option>
                                                    <option>Abrar</option>
                                                    <option>Aditi Surana.</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Assignment/Test Start Date:	</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.assignment} name='assignment' onChange={onhandleChange} />
                                               
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Material</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.material} onChange={onhandleChange} name='material'>
                                                    <option>Select</option>
                                                    <option>Document</option>
                                                    <option>LCD</option>
                                                    <option>None</option>
                                                    <option>Xerox</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Material Issued</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.materialissued} onChange={onhandleChange} name='issued'>
                                                    <option>Select</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Topic Discuss</label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.topicdiscuss} placeholder="Topik Discuss*" name='topicdiscuss' onChange={onhandleChange}></textarea>
                                                
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
                                            <h4 class="card-title">Feedback Details</h4>
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

export default LectureTaken