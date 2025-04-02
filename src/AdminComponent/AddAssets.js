import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddAssets = () => {

    const [vendor, SetVendor] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [assetscat ,setAssetscat] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [location , setLocation] = useState([])



    const [value, setValue] = useState({
        startdate: "" || uid.startdate,
        vendorname: "" || uid.venderid,
        assets: "" || uid.assetsid,
        quantity: "" || uid.quantity,
        price: "" || uid.price,
        location: "" || uid.locationid
    })

    useEffect(() => {
        setValue({
            startdate: uid.startdate,
            vendorname: uid.venderid,
            assets: uid.assetsid,
            quantity: uid.quantity,
            price: uid.price,
            location: uid.locationid,

        })
    }, [uid])

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.startdate) {
            isValid = false;
            newErrors.startdate = "Date id Required"
        }
        if (!value.vendorname) {
            isValid = false;
            newErrors.vendorname = "Name is Required"
        }
        if (!value.assets) {
            isValid = false;
            newErrors.assets = "Assets is Required"
        }


        setError(newErrors)
        return isValid
    }


    async function getVendor() {

        axios.get(`${BASE_URL}/vendor_details`)
            .then((res) => {
                SetVendor(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getassets() {
        
        axios.get(`${BASE_URL}/getassetcat`)
        .then((res) =>{
            console.log(res.data)
            setAssetscat(res.data)
        })
    }
    async function getLocation() {
        
        axios.get(`${BASE_URL}/get_location`)
        .then((res) =>{
   
            setLocation(res.data)
        })
    }


    async function getEmployeeData() {
    
        axios.get(`${BASE_URL}/get_assets`)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getassets()
        getVendor()
        getLocation()
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
            tablename: "awt_assets"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])


            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_assets"
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
        if (validateForm()) {

            const data = {

                startdate: value.startdate,
                vendorname: value.vendorname,
                assets: value.assets,
                quantity: value.quantity,
                price: value.price,
                location: value.location,
                uid: uid.id
            }


            axios.post(`${BASE_URL}/add_assets`, data)
                .then((res) => {
                    console.log(res)
                    getEmployeeData()

                    setValue({
                        startdate:'',
                        vendorname: '',
                        assets: '',
                        quantity: '',
                        price: '',
                        location: '',
                    })
                    setUid([])

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
            flex: 1,
            filterable: false,

        },
        { field: 'startdate', headerName: 'Start Date', flex: 2 },
        { field: 'vendorname', headerName: 'Vendor Name', flex: 2 },
        { field: 'title', headerName: 'Assets', flex: 2 },
        { field: 'quantity', headerName: 'Quantity', flex: 2 },
        { field: 'price', headerName: 'Price', flex: 2 },
        { field: 'LocationMaster', headerName: 'Location', flex: 2 },

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
                                    <h4 class="card-title">Add Asset</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-2" style={{display:'flex', flexDirection: "column"}}>
                                                <label for="exampleInputUsername1">Date<span className="text-danger">*</span></label>
                                                <DatePicker
      selected={value.startdate}
      onChange={onhandleChange}
      className="form-control"
      dateFormat="dd-MM-yyyy"
      placeholderText="Select Start Date"
    />
                                                {<span className='text-danger'> {error.startdate} </span>}

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Vendor Name<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.vendorname} name='vendorname' onChange={onhandleChange}>
                                                    <option>Select Vendor</option>
                                                    {vendor.map((item) =>{
                                                        return(
                                                            <option value={item.id}>{item.vendorname}</option>
                                                        )
                                                    })}
                                            
                                                </select>
                                                {<span className='text-danger'> {error.vendorname} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Assets Category<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.assets} name='assets' onChange={onhandleChange}>
                                                    <option>Select Category</option>
                                                    {assetscat.map((item) =>{
                                                        return (
                                                            <option value={item.id}>{item.title}</option>
                                                    
                                                        )
                                                    })}
                                               
                                                </select>
                                                {<span className='text-danger'> {error.assets} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Quantity</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.quantity} placeholder='Quantity' name='quantity'
                                                    onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Price</label>
                                                <input text="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.price} placeholder='Price' name='price' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Location</label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.location} name='location' onChange={onhandleChange}>
                                                    <option>Select Location</option>
                                                {location.map((item) =>{
                                                    return (
                                                        <option value={item.id}>{item.LocationMaster}</option>
                                                    )
                                                })}
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
                                    <div className='d-flex justify-content-between' style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">View Asset Master</h4>
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
                                            // slots={{ toolbar: GridToolbar }}
                                            // slotProps={{
                                            //     toolbar: {
                                            //         showQuickFilter: true,
                                            //     },
                                            // }}
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

export default AddAssets
