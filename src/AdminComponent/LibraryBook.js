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


const LibraryBook = () => {

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
        bookname : "" || uid.bookname,
        booknumber : "" || uid.booknumber,
        publication : "" || uid.publication,
        page : ""|| uid.page,
        status : ""|| uid.status,
        comment : ""|| uid.comment,
        coursename : ""|| uid.coursename,
        author : ""|| uid.author,
        purchasedate: ""|| uid.purchasedate,
        price: ""|| uid.price,
        rackno: ""|| uid.rackno


    })

    useEffect(() => {
        setValue({

        bookname : uid.bookname,
        booknumber : uid.booknumber,
        publication : uid.publication,
        page : uid.page,
        status :uid.status,
        comment : uid.comment,
        coursename : uid.coursename,
        author : uid.author,
        purchasedate: uid.purchasedate,
        price: uid.price,
        rackno: uid.rackno
   

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


    async function getLibraryData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getLibraryData() {
        const data = {
            tablename : "awt_librarybook"
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
        getLibraryData()
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
            tablename : "awt_librarybook"
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
            tablename : "awt_librarybook"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getLibraryData()

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
            
        bookname : value.bookname,
        booknumber : value.booknumber,
        publication : value.publication,
        page : value.page,
        status :value.status,
        comment : value.comment,
        coursename : value.coursename,
        author : value.author,
        purchasedate: value.purchasedate,
        price: value.price,
        rackno: value.rackno,
        uid : uid.id
        }


        axios.post(`${BASE_URL}/add_librarybook`, data)
            .then((res) => {
               console.log(res)
               getLibraryData()

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
        { field: 'bookname', headerName: 'Book Name', flex: 2 },
        { field: 'booknumber', headerName: 'Book Number', flex: 2 },
        { field: 'coursename', headerName: 'Course Name', flex: 2},
        { field: 'purchasedate', headerName: 'Purchase Date', flex: 2},
        { field: 'rackno', headerName: 'Rach No.', flex: 2},
        
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
                                    <h4 class="card-title">Add Library Book Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Book Name<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.bookname} placeholder="Book Name*" name='bookname' onChange={onhandleChange} />
                                                {error.bookname && <span className='text-danger'>{error.bookname}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Book Number<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.booknumber} placeholder="Book Number*" name='booknumber' onChange={onhandleChange} />
                                                {error.booknumber && <span className='text-danger'>{error.booknumber}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Publication</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.publication} placeholder="Publication" name='publication' onChange={onhandleChange} />
                                               
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Page</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.page} placeholder="Page" name='page' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Status </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.status} onChange={onhandleChange} name='status'>
                                                    <option></option>
                                                    <option value="1">Current</option>
                                                    <option value="2">Non-Current</option>
                                                   
                                                </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Course Name </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.coursename} onChange={onhandleChange} name='coursename'>
                                                    <option></option>
                                                    <option value="1">Training in Process Plant System Modelling Using E3D</option>
                                                    <option value="2">Advance Pipe Stress Analysis</option>
                                                    <option value="3">Air Conditioning System Design (HVAC)</option>
                                                    <option value="4">Autocad - Piping</option>
                                                    <option value="5">Civil/Structural Design & Drafting</option>
                                                    <option value="6">Electrical & Instrumentation Design and Drafting</option>
                                                    <option value="7">Electrical System Design</option>
                                                    <option value="8">Health, Safety & Environment in Construction</option>
                                                    <option value="9">Mechanical Design of Process Equipment</option>
                                                    <option value="10">Others</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Author</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.author} placeholder="Author" name='author' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Purchase Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.purchasedate} placeholder="Purchase Date" name='purchasedate' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Price</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.price} placeholder="Price" name='price' onChange={onhandleChange} />
                                                
                                            </div>
                                           
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Rack No.</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.rackno} placeholder="Rack No." name='rackno' onChange={onhandleChange} />
                                                <option value=""></option>
                                            </div>

                                            
                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Comment </label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.comment} placeholder="Comment*" name='comment' onChange={onhandleChange}></textarea>
                                               
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
                                            <h4 class="card-title">View Library Book Details</h4>
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

export default LibraryBook