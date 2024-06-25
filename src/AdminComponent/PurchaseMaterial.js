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

const PurchaseMaterial = () => {


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
        subject: "" || uid.subject,
        internal: "" || uid.internal,
        identified: "" || uid.identified,




    })

    useEffect(() => {
        setValue({
            subject: uid.subject,
            internal: uid.internal,
            identified: uid.identified,

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
            tablename: "awt_employeetrainingplan"
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
            tablename: "awt_employeetrainingplan"
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
            tablename: "awt_employeetrainingplan"
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

            subject: value.subject,
            internal: value.internal,
            identified: value.identified,
        }


        axios.post(`${BASE_URL}/awt_employeetrainingplan`, data)
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
        { field: 'subject', headerName: 'Subject', flex: 2 },
        { field: 'internal', headerName: 'Internal/External', flex: 2 },
        { field: 'identified', headerName: 'Identified', flex: 2 },

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
                        <div class="col-lg-12 grid-margin stretch-card col-lg-10">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Employee Training Plan</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-2">
                                                <lable class="exampleFormControlSelect1">Company</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.company} name='company' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <lable class="exampleFormControlSelect1">Item</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.item} name='item' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>

                                            <div className="form-group col-lg-2">
                                                <label htmlFor="exampleInputUsername1">Purchase Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    value={date}
                                                    name="date"
                                                    onChange={(e) => { }}
                                                    disabled
                                                />
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label class="exampleFormControlSelect1">Who Purchase</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.puechase} name='puechase' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label class="exampleFormControlSelect1">Vendor Name</label>
                                                <select class="form-control form-control-lg" id="exampleFormCorntrolSelect1" value={value.vendor} name='vendor' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Voucher No</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.voucherno} placeholder="Voucher No" name='voucherno' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable class="exampleFormControlSelect1">Purpose</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.purpose} name='purpose' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Required Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.required} placeholder="Required Date" name='required' onChange={onhandleChange} />

                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Price</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.price} placeholder="price" name='price' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Quantity</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.quantity} placeholder="Quantity" name='quantity' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Total Amt</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.totalamt} placeholder="Total Amt" name='totalamt' onChange={onhandleChange} />

                                            </div>



                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>

                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Back</button>





                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Employee Training Plan</h4>
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

                                    {/* <button type="submit" class="btn btn-primary mr-2">Excel</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Back</button> */}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default PurchaseMaterial
