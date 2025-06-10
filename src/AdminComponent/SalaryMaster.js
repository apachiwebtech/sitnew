import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";
//import FormControlLabel from '@mui/material/FormControlLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';


const SalaryMaster = () => {

    const [brand, setBrand] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});



    const [value, setValue] = useState({
        formdate: "" || uid.formdate,
        todate: "" || uid.todate,
        service: "" || uid.service,
        empcontri: "" || uid.empcontri,
        salaryda: "" || uid.salaryda,
        minbasic: "" || uid.minbasic,
        created_date: "" || uid.created_date,




    })

    useEffect(() => {
        setValue({
            formdate: uid.formdate,
            todate: uid.todate,
            service: uid.service,
            empcontri: uid.empcontri,
            salaryda: uid.salaryda,
            minbasic: uid.minbasic,
            created_date: uid.created_date,

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.formdate) {
            isValid = false;
            newErrors.formdate = "Date is Required"
        }
        if (!value.todate) {
            isValid = false;
            newErrors.todate = "Date is Required"
        }
        if (!value.service) {
            isValid = false;
            newErrors.service = "Service is Required"
        }
        if (!value.empcontri) {
            isValid = false;
            newErrors.empcontri = "Emp Contri is Required"
        }
        if (!value.salaryda) {
            isValid = false;
            newErrors.salaryda = "Salary is Required"
        }
        if (!value.minbasic) {
            isValid = false;
            newErrors.minbasic = "Min. Basic is Required"
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
            tablename: "awt_salarymaster"
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
            tablename: "awt_salarymaster"
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
            tablename: "awt_salarymaster"
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

                formdate: value.formdate,
                todate: value.todate,
                service: value.service,
                empcontri: value.empcontri,
                salaryda: value.salaryda,
                minbasic: value.minbasic,
                created_date: value.created_date,
                uid: uid.id
            }


            axios.post(`${BASE_URL}/add_awt_salarymaster`, data)
                .then((res) => {
                    console.log(res)
                    alert(res.data);
                    getEmployeeData();
                    setValue({
                        formdate: '', todate: '', service: '', empcontri: '', salaryda: '',
                        minbasic: '', created_date: ''
                    })

                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const roledata = {
        role: Cookies.get(`role`),
        pageid: 84,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);

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
            field: "formdate",
            headerName: "Form Date",
            flex: 2,
            renderCell: (params) => {
                if (!params.value) return ""; // Handle empty values

                // Check if already in DD-MM-YYYY format
                const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
                if (ddmmyyyyRegex.test(params.value)) {
                    return params.value; // Return as-is if already formatted
                }

                const date = new Date(params.value);
                if (isNaN(date.getTime())) return params.value; // Return original value if not a valid date

                // Convert valid date to DD-MM-YYYY format
                return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
        },

        {
            field: "todate",
            headerName: "To Date",
            flex: 2,
            renderCell: (params) => {
                if (!params.value) return ""; // Handle empty values

                // Check if already in DD-MM-YYYY format
                const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
                if (ddmmyyyyRegex.test(params.value)) {
                    return params.value; // Return as-is if already formatted
                }

                const date = new Date(params.value);
                if (isNaN(date.getTime())) return params.value; // Return original value if it's not a valid date

                // Convert valid date to DD-MM-YYYY format
                return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
        },

        { field: 'service', headerName: 'Service', flex: 2 },
        { field: 'empcontri', headerName: 'Empcontri', flex: 2 },
        { field: 'salaryda', headerName: 'DA', flex: 2 },
        { field: 'minbasic', headerName: 'Min. Basic', flex: 2 },
        {
            field: "created_date",
            headerName: "Date",
            flex: 2,
            renderCell: (params) => {
                if (!params.value) return ""; // Handle empty values

                // Check if already in DD-MM-YYYY format
                const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
                if (ddmmyyyyRegex.test(params.value)) {
                    return params.value; // Return as-is if already formatted
                }

                const date = new Date(params.value);
                if (isNaN(date.getTime())) return params.value; // Return original value if not a valid date

                // Convert valid date to DD-MM-YYYY format
                return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
        },



        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess > 2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />}
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />}
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
                                    <h4 class="card-title">Add Salary Structure</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3" style={{ display: "flex", flexDirection: "column" }}>
                                                <label for="exampleInputUsername1">Form Date<span className="text-danger">*</span></label>
                                                <DatePicker
                                                    selected={value.formdate}
                                                    onChange={(date) => onhandleChange({ target: { name: "formdate", value: date } })}
                                                    className="form-control"
                                                    id="formdate"
                                                    placeholderText="Select Form Date"
                                                    dateFormat="yyyy-MM-dd"
                                                    // minDate={new Date()} // Prevents past dates
                                                />
                                                {<span className='text-danger'> {error.formdate} </span>}
                                            </div>

                                            <div class="form-group col-lg-3" style={{ display: "flex", flexDirection: "column" }}>
                                                <label for="exampleInputUsername1">To Date<span className="text-danger">*</span></label>
                                                <DatePicker
                                                    selected={value.todate}
                                                    onChange={(date) => onhandleChange({ target: { name: "todate", value: date } })}
                                                    className="form-control"
                                                    id="todate"
                                                    placeholderText="Select To Date"
                                                    dateFormat="yyyy-MM-dd"
                                                    // minDate={new Date()} // Prevents past dates
                                                />
                                                {<span className='text-danger'> {error.todate} </span>}

                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername">Service Charge(%)<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.service} placeholder='00.00' name='service' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.service} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername">Emp Contri(%)<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.empcontri} placeholder='00.00' name='empcontri' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.empcontri} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername">DA <span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.salaryda} placeholder='00.00' name='salaryda' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.salaryda} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername"> Min. Basic<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.minbasic} placeholder='00.00' name='minbasic' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.minbasic} </span>}
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
                                    <div className='d-flex justify-content-between' style={{ borderBottom: "2px solid #dce4ec", width: "100%" }}>
                                        <div>
                                            <h4 class="card-title">View Salary Structure Details</h4>
                                        </div>

                                    </div>

                                    <div style={{ borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden" }}>
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
                                            pageSizeOptions={[50]}
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

export default SalaryMaster
