import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const FacultyPayment = () => {

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

        if(!value.fromdate){
            isValid = false;
        newErrors.fromdate = "Date is Required"

        }

        if(!value.todate){
            isValid = false;
            newErrors.todate = "Date is Required"
        }

        if(!value.facultyselect){
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

        if(validateForm()){
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
        {
            field: 'index',
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,

        },
        { field: 'attendee', headerName: 'Attendee', flex: 2 },
        { field: 'instructor', headerName: 'Instructor', flex: 2 },
        { field: 'description', headerName: 'Description', flex: 2 },
        { field: 'feedback', headerName: 'FeedBack', flex: 2 },

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
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div class="d-flex">

                                <div className='px-2 mx-2'><Link to="/feesreport"><h4>Cheque/PDC and Receipts</h4></Link></div>
                                <div className='px-2 mx-2'><Link to="/feesdetails"><h4>Fees Details</h4></Link></div>
                                <div className='px-2 mx-2'><Link to="/facultypayment"><h4>Faculty Payment Detail Report</h4></Link></div>
                            </div>
                            <div className="card">
                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>

                                        <div className='col-lg-12'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <form class="form-sample py-3" onSubmit={handleSubmit}>
                                                        <div class="row">

                                                           <div className="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">From Date<span className="text-danger">*</span></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.fromdate}
                                                            name='fromdate' onChange={onhandleChange} />

                                                            {<span className='text-danger'> {error.fromdate} </span>}
                                                           </div>

                                                           <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">To Date<span className="text-danger">*</span></lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.todate}
                                                            name='todate' onChange={onhandleChange} />

                                                            {<span className='text-danger'> {error.todate} </span>}
                                                           </div>

                                                           <div class="form-group col-lg-3">
                                                            <lable for="exampleFormControlSelect1">Select Faculty<span className="text-danger">*</span></lable>
                                                            <select class="form-control" id="exampleFromControlSelect1" value={value.facultyselect}
                                                            name='facultyselect' onChange={onhandleChange} >
                                                                <option>All</option>

                                                            {<span className='text-danger'> {error.facultyselect} </span>}
                                                            </select>
                                                           </div>

                                                            


                                                        </div>

                                                        <div className='row p-2 gap-2'>
                                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Show</button>
                                                        </div>


                                                    </form>
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

export default FacultyPayment