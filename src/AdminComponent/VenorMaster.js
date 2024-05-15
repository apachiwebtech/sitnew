import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid ,GridToolbar } from '@mui/x-data-grid';


const VendorMaster = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

    const [value, setValue] = useState({
        vendorname : "" || uid.vendorname,
        email : "" || uid.email,
        telephone : "" || uid.telephone,
        type : "" || uid.type,
        address : "" || uid.address,
        country : "" || uid.concatry,
        state : "" || uid.state,
        city : "" || uid.city,
        pin : "" || uid.pin,
        contactperson : "" || uid.contactperson,
        mobile : "" || uid.mobile,
        fax : "" || uid.fax,
        comments : "" || uid.comments

    })

    useEffect(() => {
        setValue({
           vendorname : uid.vendorname,
           email : uid.email,
           telephone : uid.telephone,
           type : uid.type,
           address : uid.address,
           country : uid.country,
           state : uid.state,
           city : uid.city,
           pin : uid.pin,
           contactperson : uid.contactperson,
           mobile : uid.mobile,
           fax : uid.fax,
           comments : uid.comments
        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.vendorname) {
        isValid = false;
        newErrors.name = "Name is require"
       }
        if (!value.email) {
            isValid = false;
            newErrors.email = "Email is require"
        }
        if (!value.type) {
            isValid = false;
            newErrors.type = "Type is require"
        }
        if (!value.address) {
            isValid = false;
            newErrors.address = "Address is require"
        }

        setError(newErrors)
        return isValid
    }


    async function getVendorData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getVendorData() {
        const data = {
            tablename : "awt_vendor_master"
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
        getVendorData()
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
            tablename : "awt_vendor_master"
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
            tablename : "awt_vendor_master"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getVendorData()

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
            vendorname : value.vendorname,
            email : value.email,
            telephone : value.telephone,
            type : value.type,
            address : value.address,
            country : value.country,
            state : value.state,
            city : value.city,
            pin : value.pin,
            contactperson : value.contactperson,
            mobile : value.mobile,
            fax : value.fax,
            comments : value.comments,
            uid:uid.id
        }


        axios.post(`${BASE_URL}/add_vendor`, data)
            .then((res) => {
               console.log(res)
               getVendorData()

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
            headerName: '#',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,
        },
        { field: 'vendorname', headerName: 'Vendor Name', flex: 2 },
        { field: 'email', headerName: 'E-Mail', flex: 2 },
        { field: 'city', headerName: 'City', flex: 2},
        { field: 'mobile', headerName: 'Contact', flex: 2},
        { field: 'pin', headerName: 'Pin', flex: 2},
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
                                    <h4 class="card-title">Add Vendor</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Vendor Name <span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.vendorname} placeholder="Vindor Name*" name='vendorname' onChange={onhandleChange} />
                                                {error.name && <span className='text-danger'>{error.name}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">E- Mail <span className='text-danger'>*</span></label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email} placeholder="Email Id" name='email' onChange={onhandleChange} />
                                                {error.email && <span className='text-danger'>{error.email}</span>}

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Telephone</label>
                                                <input type="telephone" class="form-control" id="exampleInputUsername1" value={value.telephone} placeholder="Telephone" name='telephone' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Type <span className='text-danger'>*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.type} onChange={onhandleChange} name='type'>
                                                    <option value="1">Award & Medals</option>
                                                    <option value="2">Book Stors</option>
                                                    <option value="3">CCTV Camera</option>
                                                    <option value="4">Designer</option>
                                                    <option value="6">EPBX</option>
                                                </select>
                                                {error.type && <div className="text-danger">{error.type}</div>}
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Address <span className='text-danger'>*</span></label>
                                                <textarea class="form-control" id="exampleTextarea1" name='address' value={value.address} placeholder="Address*" onChange={onhandleChange}></textarea>
                                                {error.address && <div className="text-danger">{error.address}</div>}
                                            </div>

                                        </div>
                                        <div class="row">

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Country</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.country} placeholder="Enter Country" name='country' onChange={onhandleChange} />
                                                
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">State</label>
                                                <input type="state" class="form-control" id="exampleInputUsername1" value={value.state} placeholder="State" name='state' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">City</label>
                                                <input type="city" class="form-control" id="exampleInputUsername1" value={value.city} placeholder="City" name='city' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Pin</label>
                                                <input type="pin" class="form-control" id="exampleInputUsername1" value={value.pin} placeholder="Enter Pin" name='pin' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Contact Person</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.contactperson} placeholder="Contact Person" name='text' onChange={onhandleChange} />
                                               
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Mobile</label>
                                                <input type="mobile" class="form-control" id="exampleInputUsername1" value={value.mobile} placeholder="Number" name='mobile' onChange={onhandleChange} />
                                               
                                            </div>

                                        </div>
                                        <div class="row">
                                            
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Fax</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.fax} placeholder="Fax" name='fax' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Comments</label>
                                                <textarea class="form-control" id="exampleTextarea1" name='comments' value={value.comments} placeholder="Comments" onChange={onhandleChange}></textarea>
                                                
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
                                            <h4 class="card-title">Vendor</h4>
                                            <p class="card-description">
                                                List Of Vendor
                                            </p>
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

export default VendorMaster