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
import Loader from './Loader';


const College = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [loading, setLoading] = useState(true)

    const handleChange1 = (event) => {
      setChecked([event.target.checked, event.target.checked]);
    };
  
    const handleChange2 = (event) => {
      setChecked([event.target.checked, checked[1]]);
    };
  
    const handleChange3 = (event) => {
      setChecked([checked[0], event.target.checked]);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          <FormControlLabel
            label="Child 1"
            control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
          />
          <FormControlLabel
            label="Child 2"
            control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
          />
        </Box>
      );

    const [value, setValue] = useState({
        college_name : "" || uid.college_name,
        university : "" || uid.university,
        contact_person : "" || uid.contact_person,
        designation : ""|| uid.designation,
        address : ""|| uid.address,
        city : ""|| uid.city,
        pin : ""|| uid.pin,
        state : ""|| uid.state,
        country: ""|| uid.country,
        telephone: ""|| uid.telephone,
        mobile: ""|| uid.mobile,
        email: ""|| uid.email,
        website: ""|| uid.website,
        remark: ""|| uid.remark,
        purpose: ""|| uid.purpose,
        course: ""|| uid.course


    })

    useEffect(() => {
        setValue({

            college_name : uid.college_name,
           university : uid.university,
           contact_person : uid.contact_person,
           designation : uid.designation,
           address : uid.address,
           city : uid.city,
           pin : uid.pin,
           country: uid.country,
           state : uid.state,
           telephone: uid.telephone,
           mobile: uid.mobile,
           email: uid.email,
           website: uid.website,
           remark: uid.remark,
           purpose: uid.purpose,
           course: uid.course
   

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


    async function getCollegeData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getCollegeData() {
        const data = {
            tablename : "awt_college"
        }
        axios.post(`${BASE_URL}/get_data`,data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCollegeData()
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
            tablename : "awt_college"
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
            tablename : "awt_college"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getCollegeData()

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
            college_name : value.college_name,
            university : value.university,
            contact_person : value.contact_person,
            designation : value.designation,
            address : value.address,
            city : value.city,
            pin : value.pin,
            country: value.country,
            state : value.state,
            telephone: value.telephone,
            mobile: value.mobile,
            email: value.email,
            website: value.website,
            remark: value.remark,
            purpose: value.purpose,
            course: value.course,
            uid:uid.id
        }


        axios.post(`${BASE_URL}/add_college`, data)
            .then((res) => {
               console.log(res)
               getCollegeData()

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
        { field: 'college_name', headerName: 'College_Name', flex: 2 },
        { field: 'university', headerName: 'University', flex: 2 },
        { field: 'contact_person', headerName: 'Contact_Person', flex: 2},
        { field: 'designation', headerName: 'Designation', flex: 2},
        { field: 'address', headerName: 'Address', flex: 2},
        { field: 'city', headerName: 'City', flex: 2},
        
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

            {loading && <Loader />}
            <div class="main-panel" style={{display : loading ? "none" : "block"}}>
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">College Information</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">College Name<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.college_name} placeholder="College Name*" name='college_name' onChange={onhandleChange} />
                                                {error.college_name && <span className='text-danger'>{error.college_name}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">University<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.university} placeholder="University*" name='university' onChange={onhandleChange} />
                                                {error.university && <span className='text-danger'>{error.university}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Contact Person</label>
                                                <input type="contact_person" class="form-control" id="exampleInputUsername1" value={value.contact_person} placeholder="Contact Person" name='contact_person' onChange={onhandleChange} />
                                               
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Designation</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.designation} placeholder="Designation" name='designation' onChange={onhandleChange} />
                                                
                                            </div>
                                            
                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Address </label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.address} placeholder="Address*" name='address' onChange={onhandleChange}></textarea>
                                                {error.address && <div className="text-danger">{error.address}</div>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">City</label>
                                                <input type="city" class="form-control" id="exampleInputUsername1" value={value.city} placeholder="City" name='city' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Pin</label>
                                                <input type="pin" class="form-control" id="exampleInputUsername1" value={value.pin} placeholder="Pin" name='pin' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">State</label>
                                                <input type="state" class="form-control" id="exampleInputUsername1" value={value.state} placeholder="State" name='state' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Country</label>
                                                <input type="country" class="form-control" id="exampleInputUsername1" value={value.country} placeholder="Country" name='country' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Telephone</label>
                                                <input type="telephone" class="form-control" id="exampleInputUsername1" value={value.telephone} placeholder="Telephone" name='telephone' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Mobile</label>
                                                <input type="mobile" class="form-control" id="exampleInputUsername1" value={value.mobile} placeholder="Mobile" name='mobile' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">E-Mail</label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email} placeholder="E-Mail" name='email' onChange={onhandleChange} />
                                                
                                            </div>
                                           
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Website</label>
                                                <input type="website" class="form-control" id="exampleInputUsername1" value={value.website} placeholder="Website" name='website' onChange={onhandleChange} />
                                                
                                            </div>
                                            
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Remark</label>
                                                <input type="remark" class="form-control" id="exampleInputUsername1" value={value.remark} placeholder="Remark" name='remark' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Purpose</label>
                                                <input type="purpose" class="form-control" id="exampleInputUsername1" value={value.purpose} placeholder="Purpose" name='purpose' onChange={onhandleChange} />
                                                
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Course </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>Select Course</option>
                                                    <option value="1">Instrumentation & Control</option>
                                                    <option value="2">Piping Engineering</option>
                                                    <option value="3">Mechanical Design</option>
                                                    <option value="4">Electrical Engineering,</option>
                                                    <option value="6">Water & Waste Water Engg.</option>
                                                </select>
                                            </div>

                                            

                                                {/* <div>
                                            <FormControlLabel
                                                label="Parent"
                                                control={
                                                <Checkbox
                                                    checked={checked[0] && checked[1]}
                                                    indeterminate={checked[0] !== checked[1]}
                                                    onChange={handleChange1}
                                                />
                                                }
                                            />
                                            {children}
                                            </div> */}

                                            

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
                                            <h4 class="card-title">View College Information</h4>
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

export default College