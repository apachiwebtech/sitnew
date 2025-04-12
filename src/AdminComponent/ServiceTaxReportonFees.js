import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { StyledDataGrid } from "./StyledDataGrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ServiceTaxReportonfees = () => {

    const [course, SetCourse] = useState([])
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [value, setValue] = useState({
        course: '',
        selectbatch: '',
        amounttype: '',
    })
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });


    useEffect(() => {
        setValue({
            course: uid.course,
            selectbatch: uid.selectbatch,
            amounttype: uid.amounttype,

        })
    }, [uid])

    //==============Validation

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.fromdate) {
            isValid = false;
            newErrors.fromdate = "Date is Required"

        }

        if (!value.todate) {
            isValid = false;
            newErrors.todate = "Date is Required"
        }

        if (!value.facultyselect) {
            isValid = false;
            newErrors.facultyselect = "Data is Required"
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
            tablename: "awt_employeerecord"
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
            tablename: "awt_employeerecord"
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
            tablename: "awt_employeerecord"
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

                course: value.course,
                selectbatch: value.selectbatch,
                amounttype: value.amounttype,
                uid: uid.id
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
        // {
        //     field: 'index',
        //     headerName: 'Id',
        //     type: 'number',
        //     align: 'center',
        //     headerAlign: 'center',
        //     flex: 1,
        //     filterable: false,

        // },
        // { field: 'attendee', headerName: 'Attendee', flex: 2 },
        // { field: 'instructor', headerName: 'Instructor', flex: 2 },
        // { field: 'description', headerName: 'Description', flex: 2 },
        // { field: 'feedback', headerName: 'FeedBack', flex: 2 },

        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Action',
        //     flex: 1,
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
        //                 <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
        //             </>
        //         )
        //     }
        // },
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));


    return (
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div class="d-flex">

                                <div className='px-2 mx-2'><Link to="/servicetaxreportonfees"><h4>Month & Year Wise</h4></Link></div>
                                <div className='px-2 mx-2'><Link to="/chequenumber"><h4>Cheque Number</h4></Link></div>
                            </div>
                            <div className="card">
                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>

                                        <div className='col-lg-12'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <form class="form-sample py-3" onSubmit={handleSubmit}>
                                                        <div class="row">

                                                            <div className="form-group col-lg-3" style={{display:"flex", flexDirection:"column"}}>
                                                                <lable for="exampleInputUsername1">From Date<span className="text-danger">*</span></lable>
                                                                <DatePicker
        selected={value.fromdate ? new Date(value.fromdate) : null}
        onChange={(date) =>
          onhandleChange({ target: { name: "fromdate", value: date } })
        }
        className="form-control"
        id="exampleInputUsername1"
        dateFormat="dd-MM-yyyy"
        placeholderText="Select From Date"
      />
                                                                {<span className='text-danger'> {error.fromdate} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-3" style={{ display:"flex", flexDirection:'column'}}>
                                                                <lable for="exampleInputUsername1">To Date<span className="text-danger">*</span></lable>
                                                                <DatePicker
        selected={value.todate ? new Date(value.todate) : null}
        onChange={(date) =>
          onhandleChange({ target: { name: "todate", value: date } })
        }
        className="form-control"
        id="exampleInputUsername1"
        dateFormat="dd-MM-yyyy"
        placeholderText="Select To Date"
      />

                                                                {<span className='text-danger'> {error.todate} </span>}
                                                            </div>

                                                        </div>

                                                        <div className='row p-2 gap-2'>
                                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Go</button>
                                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Tax Report</button>
                                                        </div>


                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div className='d-flex justify-content-between' style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                                        <div>
                                                            <h4 class="card-title">Details</h4>
                                                        </div>

                                                    </div>

                                                    {<div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>

                                                        <StyledDataGrid
                                                            rows={rowsWithIds}
                                                            columns={columns}
                                                            disableColumnFilter
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
                                                            slotProps={{
                                                              toolbar: {
                                                                showQuickFilter: true,
                                                              },
                                                            }}
                                                        />

                                                    </div>}

                                                    <div class="card-title text-center">
                                                        <h4>Total Record:</h4>
                                                        <div class="d-flex justify-content-center">

                                                            <div class="form-group">
                                                                <label for="exampleInputUsername1">Total Received Amount  </label>
                                                                <input style={{ width: "300px" }} type="text" class="form-control" id="exampleInputUsername1"
                                                                    value={value.receivedamount} placeholder="Total Received Amount"
                                                                    name='receivedamount' onChange={onhandleChange} disabled />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="justify-content-center">
                                                        <button type="submit" class="btn btn-primary mr-2">Print</button>

                                                        <button type='button' onClick={() => {
                                                            window.location.reload()
                                                        }} class="btn btn-light">Close</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ServiceTaxReportonfees