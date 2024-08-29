import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';


const BatchRecord = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading, setLoading] = useState(true)

    const [selectedYear, setselectedYear] = useState('');

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2000; year <= currentYear; year++){
        years.push(year);
    }



    const [value, setValue] = useState({
        course : ""|| uid.course,
        year : ""|| uid.year,
        yearto : ""|| uid.yearto,

        


    })

    useEffect(() => {
        setValue({
            course : uid.course,
            year : uid.year,
            yearto : uid.yearto,

        })
    }, [uid])

    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.course) {
        isValid = false;
        newErrors.course = "Course is Required"
       }
        if (!value.year) {
            isValid = false;
            newErrors.year = "Year is Required"
        }
        if(!value.yearto) {
            isValid = false;
            newErrors.yearto = "Year is Reuired"
        }
        setError(newErrors)
        return isValid
    }


    async function getEmployeeData() {

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

    if(validateForm()){
        const data = {
            
        course : value.course,
        year : value.year,
        yearto : value.yearto,
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
            {/* {loading && <Loader />} */}
            <div class="main-panel" style={{display : loading ? "none" : "block"}} >
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Batch Report</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                          

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Select Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" 
                                                value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>All</option>
                                                </select>
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>


                                            <div class="form-group col-lg-4">
                                                <label htmlfor="yearInput">Select Year From<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" 
                                                id="yearInput" 
                                                value={selectedYear} onChange={onhandleChange} name='yearinput'>
                                                    <option value="year">--Select Year</option>
                                                    {years.map(year => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                                {<span className='text-danger'> {error.year} </span>}
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Select Year To<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.yearto}
                                                 placeholder="From Year" name='yearto' onChange={onhandleChange} />
                                                 {<span className='text-danger'> {error.yearto} </span>}
                                            </div>
                                            

                                        </div>

                                         <button type="submit" class="btn btn-primary mr-2">Excel</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary">Print</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Back</button>
                                            



                                        
                                    </form>

                                </div>
                            </div>
                        </div>
                        {/* <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Batch Record Details</h4>
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
                        </div> */}
                    </div>
                </div>
            </div >
        </div >

    )
}

export default BatchRecord
