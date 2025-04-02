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

const MLWFMaster = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

    const [value, setValue] = useState({
        formdate: "" || uid.formdate,
        todate: "" || uid.todate,
        grossupto: "" || uid.grossupto,
        chargeswill: "" || uid.chargeswill,
        otherwise: "" || uid.otherwise,

    })

    useEffect(() => {
        setValue({
            formdate: uid.formdate,
            todate: uid.todate,
            grossupto: uid.grossupto,
            chargeswill: uid.chargeswill,
            otherwise: uid.otherwise,

        })
    }, [uid])


    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}


    //     if (!value.formdate) {
    //         isValid = false;
    //         newErrors.formdate = "Date is Required"
    //     }
    //     if (!value.todate) {
    //         isValid = false;
    //         newErrors.todate = "Date is Required"
    //     }
    //     if (!value.service) {
    //         isValid = false;
    //         newErrors.service = "Service is Required"
    //     }
    //     if (!value.empcontri) {
    //         isValid = false;
    //         newErrors.empcontri = "Emp Contri is Required"
    //     }
    //     if (!value.salaryda) {
    //         isValid = false;
    //         newErrors.salaryda = "Salary is Required"
    //     }
    //     if (!value.minbasic) {
    //         isValid = false;
    //         newErrors.minbasic = "Min. Basic is Required"
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
            tablename: "sit_mlwfmaster"
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
            tablename: "sit_mlwfmaster"
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
            tablename: "sit_mlwfmaster"
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
        // if (validateForm()) {
            const data = {

                formdate: value.formdate,
                todate: value.todate,
                grossupto: value.grossupto,
                chargeswill: value.chargeswill,
                otherwise: value.otherwise,
                uid: uid.id
            }

            console.log(data);

            axios.post(`${BASE_URL}/add_sit_mlwfmaster`, data)
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
        {
            field: "formdate",
            headerName: "From Date",
            flex: 2,
            renderCell: (params) =>
              params.value
                ? /^\d{2}-\d{2}-\d{4}$/.test(params.value) // Check if already in DD-MM-YYYY format
                  ? params.value
                  : new Date(params.value).toLocaleDateString("en-GB") // Convert valid dates
                : "",
          },
          
          {
            field: "todate",
            headerName: "To Date",
            flex: 2,
            renderCell: (params) =>
              params.value
                ? /^\d{2}-\d{2}-\d{4}$/.test(params.value) // Check if already in DD-MM-YYYY format
                  ? params.value
                  : new Date(params.value).toLocaleDateString("en-GB") // Convert valid dates
                : "",
          },
          
        { field: 'grossupto', headerName: 'Gross', flex: 2 },
        { field: 'chargeswill', headerName: 'Min Charge', flex: 2 },
        { field: 'otherwise', headerName: 'Max Charge', flex: 2 },
        

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
                                    <h4 class="card-title">MLWF Master</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3" style={{display: "flex", flexDirection: "column"}}>
                                                <label for="exampleInputUsername1">From Date</label>
                                                <DatePicker
        selected={value.formdate ? new Date(value.formdate) : null}
        onChange={(date) => onhandleChange({ target: { name: "formdate", value: date.toISOString().split("T")[0] } })}
        className="form-control"
        id="formdate"
        placeholderText="Select Form Date"
        dateFormat="dd-MM-yyyy"
        minDate={new Date()} // Prevents past dates
      />
                                                
                                            </div>

                                            <div class="form-group col-lg-3" style={{display: "flex", flexDirection: "column"}}>
                                                <label for="exampleInputUsername1">To Date</label>
                                                <DatePicker
        selected={value.todate ? new Date(value.todate) : null}
        onChange={(date) => onhandleChange({ target: { name: "todate", value: date.toISOString().split("T")[0] } })}
        className="form-control"
        id="todate"
        placeholderText="Select To Date"
        dateFormat="dd-MM-yyyy"
        minDate={new Date()} // Prevents past dates
      />
                                                
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Total Gross Upto</lable>
                                                <input type='text' class="form-control" id="exampleInputUsername1" 
                                                value={value.grossupto} name='grossupto' placeholder='0' 
                                                onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Charges will be Rs.</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.chargeswill} placeholder='0' name='chargeswill' 
                                                onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1"> Otherwise Rs.</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.otherwise} placeholder='0' name='otherwise' 
                                                onChange={onhandleChange} />
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
                                            <h4 class="card-title">MLWF Master Details</h4>
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

export default MLWFMaster
