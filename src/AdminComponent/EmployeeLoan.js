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

const EmployeeLoan = () => {


    const [date, setDate] = useState('');

    // useEffect(() => {
    //     const currentDate = new Date();
    //     const year = currentDate.getFullYear();
    //     let month = currentDate.getMonth() + 1;
    //     month = month < 10 ? '0' + month : month;
    //     let day = currentDate.getDate();
    //     day = day < 10 ? '0' + day : day;
    //     const formattedDate = `${year}-${month}-${day}`;
    //     setDate(formattedDate);
    // }, []);


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
        selectcourse: "" || uid.selectcourse,
        date: "" || uid.date,
        loanamt: "" || uid.loanamt,
        monthly: "" || uid.monthly,
        totalmonths: "" || uid.totalmonths,
        comments: "" || uid.comments,
    })


    useEffect(() => {
        setValue({
            selectcourse: uid.selectcourse,
            date: uid.date,
            loanamt: uid.loanamt,
            monthly: uid.monthly,
            totalmonths: uid.totalmonths,
            comments: uid.comments,

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
            tablename: "awt_employeeloan"
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
            tablename: "awt_employeeloan"
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
            tablename: "awt_employeeloan"
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



            selectcourse: value.selectcourse,
            date: value.date,
            loanamt: value.loanamt,
            monthly: value.monthly,
            totalmonths: value.totalmonths,
            comments: value.comments,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_employeeloan`, data)
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
        { field: 'selectcourse', headerName: 'Select Course', flex: 2 },
        { field: 'date', headerName: 'Date', flex: 2 },
        { field: 'loanamt', headerName: 'Loan Amt.', flex: 2 },
        { field: 'monthly', headerName: 'Monthly', flex: 2 },
        { field: 'totalmonths', headerName: 'Total Months', flex: 2 },
        { field: 'comments', headerName: 'Comments', flex: 2 },

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
                                    <h4 class="card-title">Add EmployeeLoan</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Employee</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selectcourse} name='selectcourse' onChange={onhandleChange}>
                                                    <option>Select Employee</option>
                                                    <option> Faizan   Ali Usman Sumbania </option>
                                                    <option> Khalil  Ahmed Khwaja Shaikh </option>
                                                    <option> Vivek Vijay Meghade</option>
                                                    <option> Ziyauddin   Salahuddin Mohammad </option>
                                                    <option>Aakash Vaijnath Shirsat</option>
                                                    <option>Abhijit  Shashikumar Mehra</option>
                                                    <option>Abhijit Prabhakar Tapare</option>
                                                    <option>Abhishek Rakesh Gupta</option>
                                                    <option>Aditya Arvind Patil</option>
                                                    <option>Aditya Ramchandra Auti</option>
                                                    <option>admin</option>
                                                    <option>Ajay Hari Patil</option>
                                                    <option>Ajit Mahendra Mauraya</option>
                                                    <option>Akanksha Anil Tambe</option>
                                                    <option>Akash   Jose</option>
                                                    <option>Akshay  Pravin Pednekar</option>
                                                    <option>Akshay  Subhash Surve</option>
                                                    <option>Akshay Kishor Patil</option>
                                                    <option>Akshay Kishor Patil</option>
                                                    <option>Akshay Pravin Pednekar</option>
                                                    <option>Akshay Shridhar Rahate</option>
                                                    <option>Amir  Khan</option>
                                                    <option>Amit Shantaram Salvi</option>
                                                    <option>Amit Vithoba Kolambkar</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Loan Date</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Loan Amt.</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.loanamt} placeholder='Loan Amt.' name='loanamt' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Monthly Installment</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.monthly} placeholder='Monthly Installment' name='monthly' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Total Months</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.totalmonths} placeholder='Total Months' name='totalmonths' onChange={onhandleChange} />
                                            </div>

                                            <div className='form-group col-lg-6'>
                                                <lable for="exampleTextarea1">Comments</lable>
                                                <textarea className='form-control' id='exampleTeaxtarea1' value={value.comments} placeholder='Comments' name='comments' onChange={onhandleChange}></textarea>
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
                                            <h4 class="card-title">View Batch Left Details</h4>
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

export default EmployeeLoan
