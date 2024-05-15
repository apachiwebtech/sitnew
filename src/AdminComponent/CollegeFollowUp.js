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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const CollogeFollowUp = () => {

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
        training : ""|| uid.training,
        attendee : ""|| uid.attendee,
        instructor : ""|| uid.instructor,
        description : ""|| uid.description,
        feedback : ""|| uid.feedback,

        


    })

    useEffect(() => {
        setValue({
            training : uid.training,
            attendee : uid.attendee,
            instructor : uid.instructor,
            description :uid.description,
            feedback: uid.feedback,

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
            tablename : "awt_employeerecord"
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
            u_id : id,
            tablename : "awt_employeerecord"
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
            tablename : "awt_employeerecord"
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
            
        training : value.training,
        attendee : value.attendee,
        instructor : value.instructor,
        description :value.description,
        feedback: value.feedback,
        uid : uid.id
        }


        axios.post(`${BASE_URL}/add_employeerecord`, data)
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
        { field: 'attendee', headerName: 'Attendee', flex: 2},
        { field: 'instructor', headerName: 'Instructor', flex: 2},
        { field: 'description', headerName: 'Description', flex: 2},
        { field: 'feedback', headerName: 'FeedBack', flex: 2},
        
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
                                    <h4 class="card-title">College Follow Up Report</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} placeholder="From Year" name='date' onChange={onhandleChange} />
                                                
                                            </div>
                                          

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Select College<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.college} onChange={onhandleChange} name='college'>

                                                    <option>Select College</option>
                                                    <option> Dilkap College of Diploma </option>
                                                    <option> DR.S.&amp;S.S.GANDHY GOVERNMENT ENGINEERING COLLEGE,SURAT</option>
                                                    <option> St. Johns College of Engineering &amp; Technology</option>
                                                    <option> Thiagarajar College of Engineering</option>
                                                    <option>A C PATIL COLLEGE OF ENGG</option>
                                                    <option>A C Patil, Kharghar</option>
                                                    <option>a d patel institute of technology</option>
                                                    <option>A G high school dapoli</option>
                                                    <option>A M G O I WATHAR KOLHAPUR</option>
                                                    <option>A P Shah Institute Of Technology</option>
                                                    <option>A. D. Patel institute of technology</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Select City<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.city} onChange={onhandleChange} name='city'>

                                                <option>Select City</option>
                                                <option> Bharuch, Gujarat</option>
                                                <option> Indore</option>
                                                <option>adhya Pradesh</option>
                                                <option>Ahmedabad</option>
                                                <option>Ahmednagar</option>
                                                <option>Alappuzha</option>
                                                <option>Alathukombai</option>
                                                <option>Ambarnath</option>
                                                <option>Ambernath</option>
                                                <option>Amravati</option>
                                                <option>Aurangabad</option>
                                                <option>Badlapur</option>
                                                <option>BANGALORE</option>
                                                <option>Bharuch</option>
                                                <option>Bhatkal</option>
                                                <option>Bhavnagar</option>
                                                <option>Bhopal</option>
                                                <option>Bidar</option>
                                                <option>Bikaner</option>
                                                <option>Chandigarh</option>
                                                <option>Chennai</option>
                                                <option>CHINCHOLI, NASHIK</option>
                                                <option>Coimbature</option>
                                                <option>Davangere</option>
                                                <option>Dhule</option>
                                                <option>Ernakulam</option>
                                                <option>Gandhinagar</option>
                                                <option>Gujarat</option>
                                                <option>GULBARGA</option>
                                                <option>Gwalior</option>
                                                <option>Hyderabad</option>
                                                <option>Indore</option>
                                                <option>Jalgaon</option>
                                                <option>KANNUR</option>
                                                <option>Kanyakumari</option>
                                                <option>Karjat</option>
                                                <option>Khalapur</option>
                                                <option>Kolhapur</option>
                                                <option>Kota</option>
                                                <option>Kottayam</option>
                                                <option>Latur</option>
                                                <option>Madurai</option>
                                                <option>Mangalore</option>
                                                <option>Mangaluru</option>
                                                <option>Meerut</option>
                                                <option>Mumbai</option>
                                                <option>Mysore </option>
                                                <option>Nagpur</option>
                                                <option>Nanded</option>
                                                <option>Nashik</option>
                                                <option>Nashik -</option>
                                                <option>Nasik</option>
                                                <option>Navi Mumbai</option>
                                                <option>Navi Mumbai.</option>
                                                <option>Navimumbai</option>
                                                <option >Neral</option>
                                                <option>Nerul</option>
                                                <option>New Delhi</option>
                                                <option>New Panvel</option>
                                                <option>North Gujarat, INDIA</option>
                                                <option>Oman</option>
                                                <option>Palghar</option>
                                                <option>Palghar (E</option>
                                                <option>Palghar East </option>
                                                <option>Pandharpur </option>
                                                <option>Pune </option>
                                                <option>Raigad</option>
                                                <option>Rajkot</option>
                                                <option>Rajwada, P.O.Box. No.130,</option>
                                                <option>Ratnagiri</option>
                                                <option>Sangli</option>
                                                <option>satara</option>
                                                <option >Shirpur</option>
                                                <option>Sikandarabad</option>
                                                <option>Sindhudurg</option>
                                                <option>Solapur</option>
                                                <option>Surat</option>
                                                <option>Tal- Khalapur</option>
                                                <option>Thane</option>
                                                <option>Thanjavur</option>
                                                <option>Tiruchirappalli</option>
                                                <option>Valsad</option>
                                                <option>Wardha</option>
                                                <option>Yavatmal</option>
                                                <option>Yemmiganur </option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Select Purpose <span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.purpose} onChange={onhandleChange} name='purpose'>

                                                <option value="">Select Purpose</option>
                                                <option>Adertisement</option>
                                                <option>Advertisement</option>
                                                <option>Meeting</option>
                                                <option value="Other">Other</option>
                                                <option value="Others">Others</option>
                                                <option value="Placement">Placement</option>
                                                <option value="Proposal">Proposal</option>
                                                <option value="Seminar">Seminar</option>
                                                <option value="Sponsership- stall">Sponsership- stall</option>
                                                <option value="Training">Training</option>
                                                </select>
                                            </div>
                                           
                                            

                                        </div>
                                        <button type="submit" class="btn btn-primary mr-2">Go</button>
                                            



                                        
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Annual Batch Plan Details</h4>
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

                                    <button type="submit" class="btn btn-primary mr-2">Excel</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Back</button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default CollogeFollowUp
