import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { useNavigate } from 'react-router-dom';


const CVShortListed = () => {
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [CVShortlistedList, setCVShortlistedList] = useState([])
    const navigate = useNavigate()
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
        batchcode: "" || uid.batchcode,
        coursename: "" || uid.coursename,
        company: "" || uid.company,
        date: "" || uid.date,


    })

    const getCVShortlistedData = async()=>{
        try{
            const response = await axios.get(`${BASE_URL}/cvshortlisted`)
            setCVShortlistedList(response.data)
        }catch(err){
            console.log('Error fetching cv shortlisted data', err)
        }
    }
    useEffect(()=>{
        getCVShortlistedData()
    },[])

    useEffect(() => {
        setValue({

            batchcode: uid.batchcode,
            coursename: uid.coursename,
            company: uid.company,
            date: uid.date,


        })
    }, [uid])
   

        const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.batchcode) {
            isValid = false;
            newErrors.batchcode = "Batch Code is Required"
        }
        if (!value.coursename) {
            isValid = false;
            newErrors.coursename = "Coures Name is Required"
        }
        if (!value.company){
            isValid = false;
            newErrors.company = "Companyn is Required"
        }
        // if (!value.date) {
        //     isValid = false;
        //     newErrors.date = "Date is Required"
        // }
        setError(newErrors)
        return isValid
    }


    async function getCollegeData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    async function getCollegeData() {
        const data = {
            tablename: "awt_college"
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

    // useEffect(() => {
    //     getCollegeData()
    //     value.title = ""
    //     setError({})
    //     setUid([])
    // }, [])

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
            tablename: "awt_college"
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
            tablename: "awt_college"
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

        if (validateForm()) {
            const data = {
                batchcode: value.batchcode,
                coursename: value.coursename,
                company: value.company,
                date: value.date,
            }


            axios.post(`${BASE_URL}/add_college`, data)
                .then((res) => {
                    console.log(res)
                    getCollegeData()

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
        { field: 'Batch_code', headerName: 'Batch Code', flex:2 },
        { field: 'Course_Name', headerName: 'Course Name', flex:3 },
        { field: 'CompanyName', headerName: 'Company Name', flex:3 },
        { field: 'TDate', headerName: 'Date', flex: 2 },

        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => {
                            navigate(`/cvshortlisted/${params.row.id}`)
                        }} />
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
                                    <h4 class="card-title">CV Shortlisted </h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-3">
                                                <label htmlfor="exampleInputUsername1">Date<span className="text-danger">*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1"
                                                    value={date} name='date'
                                                    onChange={(e) => { }} />

                                                {/* {<span className='text-danger'> {error.date} </span>} */}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Company Name <span className="text-danger">*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.company} onChange={onhandleChange} name='company'>
                                                    <option>--Company Name--</option>

                                                </select>
                                                {<span className='text-danger'> {error.company} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course Name<span className="text-danger">*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.coursename} onChange={onhandleChange} name='coursename'>
                                                    <option>--Course Name--</option>
                                                </select>
                                                {<span className='text-danger'> {error.coursename} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch Code <span className="text-danger">*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchcode} onChange={onhandleChange} name='batchcode'>
                                                    <option>--Batch Code--</option>
                                                </select>
                                                {<span className='text-danger'> {error.batchcode} </span>}
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
                                            <h4 class="card-title">View CV Shortlisted Details</h4>
                                        </div>

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={CVShortlistedList}
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

export default CVShortListed