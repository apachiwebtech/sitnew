import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';

const MaterialConsumption = () => {





    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [faculty, setFacilty] = useState([])


    const [value, setValue] = useState({
        isussed: "" || uid.isussed,
        startdate: "" || uid.startdate,
        course: "" || uid.course,
        qtyinstock: "" || uid.qtyinstock,
        batchno: "" || uid.batchno,
        student: "" || uid.student,
        selectitem: "" || uid.selectitem,
        qtyissue: "" || uid.qtyissue,
        price: "" || uid.price,
        ammounts: "" || uid.ammounts,
        purpose: "" || uid.purpose,

    })

    useEffect(() => {
        setValue({

            isussed: uid.isussed,
            startdate: uid.startdate,
            course: uid.course,
            qtyinstock: uid.qtyinstock,
            batchno: uid.student,
            student: uid.student,
            selectitem: uid.selectitem,
            qtyissue: uid.qtyissue,
            price: uid.price,
            ammounts: uid.ammounts,
            purpose: uid.purpose,

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.isussed) {
            isValid = false;
            newErrors.isussed = "Isussed is Required"
        }
        if (!value.startdate) {
            isValid = false;
            newErrors.startdate = "Date is Required"
        }
        if (!value.course) {
            isValid = false;
            newErrors.course = "Course is Required"
        }
        if (!value.qtyinstock) {
            isValid = false;
            newErrors.qtyinstock = "Stock is Required"
        }
        if (!value.batchno) {
            isValid = false;
            newErrors.batchno = "Batch is Required"
        }
        if (!value.student) {
            isValid = false;
            newErrors.student = "Student is Required"
        }
        if (!value.selectitem) {
            isValid = false;
            newErrors.selectitem = "Item is Required"
        }
        if (!value.qtyissue) {
            isValid = false;
            newErrors.qtyissue = "Qty Issue is Required"
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
            tablename: "awt_materialconsumption"
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

    async function getfaculty() {

        axios.get(`${BASE_URL}/getfaculty`)
            .then((res) => {

                setFacilty(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getEmployeeData()
        value.title = ""
        setError({})
        getfaculty()
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
            tablename: "awt_materialconsumption"
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
            tablename: "awt_materialconsumption"
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



                isussed: value.isussed,
                startdate: value.startdate,
                course: value.course,
                qtyinstock: value.qtyinstock,
                batchno: value.batchno,
                student: value.student,
                selectitem: value.selectitem,
                qtyissue: value.qtyissue,
                price: value.price,
                ammounts: value.ammounts,
                purpose: value.purpose,
                uid: uid.id
            }


            axios.post(`${BASE_URL}/add_materialconsumption`, data)
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
        { field: 'isussed', headerName: 'Isussed', flex: 2 },
        { field: 'startdate', headerName: 'Start Date', flex: 2 },
        { field: 'course', headerName: 'Course', flex: 2 },
        { field: 'qtyinstock', headerName: 'QTY Instock', flex: 2 },
        { field: 'batchno', headerName: 'Batch No.', flex: 2 },
        { field: 'student', headerName: 'Student', flex: 2 },
        { field: 'selectitem', headerName: 'Select Item', flex: 2 },
        { field: 'qtyissue', headerName: 'QTY Issue', flex: 2 },
        { field: 'price', headerName: 'Price', flex: 2 },
        { field: 'ammounts', headerName: 'Ammounts', flex: 2 },
        { field: 'purpose', headerName: 'Purpose', flex: 2 },

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
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Material Consumption</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Isussed By</label>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.faculty}
                                                    name='faculty' onChange={onhandleChange}>
                                                    <option>--Select Faculty--</option>
                                                    {faculty.map((item) => {
                                                        return (
                                                            <option value={item.Faculty_Id}>{item.Faculty_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.faculty} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Start Date<span className="text-danger">*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1"
                                                    value={value.startdate} name='startdate' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.startdate} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleFormControlSelect1">Select Course<span className="text-danger">*</span></lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.course} name='course' onChange={onhandleChange}>
                                                    <option>Select Course</option>
                                                </select>
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Qty In Stock<span className="text-danger">*</span></lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.qtyinstock} placeholder='Qty In Stock' name='qtyinstock'
                                                    onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.qtyinstock} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Select Batch<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.batchno} name='batchno' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                                {<span className='text-danger'> {error.batchno} </span>}
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Select Student<span className="text-danger">*</span></label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.student} name='student' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                                {<span className='text-danger'> {error.student} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Select Item<span className="text-danger">*</span></label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.selectitem} name='selectitem' onChange={onhandleChange}>
                                                    <option>Select Material Type</option>
                                                </select>
                                                {<span className='text-danger'> {error.selectitem} </span>}
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Qty Issue<span className="text-danger">*</span></lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.qtyissue} placeholder='Quantity' name='qtyissue' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.qtyissue} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exmpaleInputUsername">Price</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.price} placeholder='Price' name='price' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsernamae">Total Ammounts</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammounts} placeholder='Total Ammount' name='ammounts' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Purpose</label>
                                                <textarea class="form-control" id="exampleTextarea1" name='purpose' value={value.purpose} placeholder="Purpose" onChange={onhandleChange}></textarea>

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
                                            <h4 class="card-title">View Material Consumption</h4>
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

export default MaterialConsumption
