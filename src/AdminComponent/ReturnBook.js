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
import { StyledDataGrid } from './StyledDataGrid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const ReturnBook = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [isDisabled, setIsDisabled] = useState(true); // Define isDisabled
    const [date, setDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = currentDate.getDate();
        day = day < 10 ? '0' + day : day;
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    }, []);



    
    const [value, setValue] = useState({
        student : "" || uid.student,
        book : "" || uid.book,
        bookcode : "" || uid.bookcode,
        returndate : ""|| uid.status,
        fine : ""|| uid.fine,
        


    })

    useEffect(() => {
        setValue({
            student : uid.student,
            book : uid.book,
            bookcode : uid.bookcode,
            returndate :uid.returndate,
            fine :uid.fine,
   

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.student) {
        isValid = false;
        newErrors.student = "Student is Required"
       }
        if (!value.book) {
            isValid = false;
            newErrors.book = "Book is Required"
        }
        setError(newErrors)
        return isValid
    }


    async function getReturnData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getReturnData() {
        const data = {
            tablename : "awt_returnbook"
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
        getReturnData()
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
            tablename : "awt_returnbook"
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
            tablename : "awt_returnbook"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getReturnData()

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

    if(validateForm()){
        const data = {
            
        student : value.student,
        book : value.book,
        returndate :value.returndate,
        fine :value.fine,
        uid : uid.id
        }


        axios.post(`${BASE_URL}/add_returnbook`, data)
            .then((res) => {
               console.log(res)
               getReturnData()

            })
            .catch((err) => {
                console.log(err)
            })
    }

   
        


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
            flex: 0.5,
            filterable: false,
        },
        { field: 'student', headerName: 'Student Name', flex: 2},
        { field: 'book', headerName: 'Book', flex: 2},
        { field: 'bookcode', headerName: 'Book Code', flex: 2},
        {
            field: "returndate",
            headerName: "Return Date",
            flex: 1.5,
            renderCell: (params) =>
              params.value
                ? /^\d{2}-\d{2}-\d{4}$/.test(params.value)
                  ? params.value
                  : new Date(params.value).toLocaleDateString("en-GB").replace(/\//g, "-")
                : ""
          },
          
        { field: 'fine', headerName: 'Fine', flex: 1.5},
        
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

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Return Book</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                        <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Student <span className="text-danger">*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" 
                                                value={value.student} onChange={onhandleChange} name='student'>
                                                    <option>Select Student</option>
                                                </select>
                                                {<span className='text-danger'> {error.student} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Book<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.book} placeholder="Book" name='book' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.book}</span>}
                                            </div>
                                            
                                            <div class="form-group col-lg-3" style={{display: "flex", flexDirection: 'column'}}>
                                                <lable htmlfor="exampleInputUsername1">Return Date </lable>
                                                <DatePicker
        selected={date ? new Date(date) : null}
        onChange={(selectedDate) => setDate(selectedDate)}
        className="form-control"
        id="exampleInputUsername1"
        dateFormat="dd-MM-yyyy"
        placeholderText="Select a date"
        disabled={isDisabled} // Disables the date picker
      />

                                            </div>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Fine</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1"
                                                 value={value.fine} placeholder='00.00' 
                                                 name='fine' onChange={onhandleChange} disabled />
                                               
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
                                    <div className='d-flex justify-content-between'style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">Return Book</h4>
                                        </div>

                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "scroll"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 50, page: 0 },
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

export default ReturnBook