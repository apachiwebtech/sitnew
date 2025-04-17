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

const Assets = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [specification, setSpecification] = useState("")
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
        startdate: "" || uid.startdate,
        vindorname: "" || uid.vindorname,
        assets: "" || uid.assets,
        quantity: "" || uid.quantity,
        price: "" || uid.price,
        location: "" || uid.location

    })

    useEffect(() => {
        setValue({
            startdate: uid.startdate,
            vindorname: uid.vindorname,
            assets: uid.assets,
            quantity: uid.quantity,
            price: uid.price,
            location: uid.location,

        })
    }, [uid])

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.startdate) {
            isValid = false;
            newErrors.startdate = "Date id Required"
        }
        if (!value.vindorname) {
            isValid = false;
            newErrors.vindorname = "Name is Required"
        }
        if (!value.assets) {
            isValid = false;
            newErrors.assets = "Assets is Required"
        }


        setError(newErrors)
        return isValid
    }


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
            tablename: "awt_assets"
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
            tablename: "awt_assets"
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
                vindorname: value.vindorname,
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
        {
            field: "startdate",
            headerName: "Start Date",
            flex: 2,
            renderCell: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if already in DD-MM-YYYY format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return ""; // Handle invalid dates
          
              // Convert to DD-MM-YYYY format
              return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
          },
          
        { field: 'vindorname', headerName: 'Vindor Name', flex: 2 },
        { field: 'assets', headerName: 'Assets', flex: 2 },
        { field: 'quantity', headerName: 'Quantity', flex: 2 },
        { field: 'price', headerName: 'Price', flex: 2 },
        { field: 'location', headerName: 'Location', flex: 2 },

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

                                            <div class="form-group col-lg-2" style={{display: 'flex', flexDirection:"column"}}>
                                                <label for="exampleInputUsername1">Date<span className="text-danger">*</span></label>
                                                <DatePicker
        selected={value.startdate ? new Date(value.startdate) : null}
        onChange={(date) => onhandleChange({ target: { name: "startdate", value: date.toISOString().split("T")[0] } })}
        className="form-control"
        id="exampleInputUsername1"
        dateFormat="dd-MM-yyyy"
        placeholderText="Select Start Date"
      />
                                                {<span className='text-danger'> {error.startdate} </span>}

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleFormControlSelect1">Vindor Name<span className="text-danger">*</span></lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.vindorname} name='vindorname' onChange={onhandleChange}>
                                                    <option>Select Vendor</option>
                                                    <option>Anupam Stationery Mart</option>
                                                    <option>Modern General Stores</option>
                                                </select>
                                                {<span className='text-danger'> {error.vindorname} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Assets Category<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.assets} name='assets' onChange={onhandleChange}>
                                                    <option>Select Category</option>
                                                    <option>AIR CONDITIONERS</option>
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
                                                <lable for="exampleInputUsername1">Price</lable>
                                                <input text="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.price} placeholder='Price' name='price' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Location</label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.location} name='location' onChange={onhandleChange}>
                                                    <option>Select Location</option>
                                                    <option>TR-001</option>
                                                    <option>TR-002</option>
                                                    <option>TR-003</option>
                                                    <option>TR-004</option>
                                                    <option>OFFICE</option>
                                                    <option>OTHER</option>
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

export default Assets
