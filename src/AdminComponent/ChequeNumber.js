import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const ChequeNumber = () => {

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

        if (!value.chequenumber) {
            isValid = false;
            newErrors.chequenumber = "ChequeNumber is Required"
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
        <div className="container-fluid page-body-wrapper col-lg-10">
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

                                                            <div class="form-group col-lg-3">
                                                                <label for="exampleInputUsername1">Cheque Number<span className="text-danger">*</span></label>
                                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                                    value={value.chequenumber} placeholder="Cheque Number"
                                                                    name='chequenumber' onChange={onhandleChange} />

                                                                {<span className='text-danger'>{error.chequenumber}</span>}
                                                            </div>

                                                        </div>

                                                        <div className='row p-2 gap-2'>
                                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Go</button>
                                                        </div>


                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div className='d-flex justify-content-between'>
                                                        <div>
                                                            <h4 class="card-title">Details</h4>
                                                        </div>

                                                    </div>

                                                    {<div>

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

export default ChequeNumber