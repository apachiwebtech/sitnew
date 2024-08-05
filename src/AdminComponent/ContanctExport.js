import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';

const ContactExport = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [specification, setSpecification] = useState("")
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [hide, setHide] = useState([])
    const [vindordata, setStudent] = useState([])

    console.log(specification)

    const [value, setValue] = useState({
        startdate: "" || uid.startdate,
        enddate: "" || uid.enddate,
        specification: "" || uid.specification,


    })

    useEffect(() => {
        setValue({
            startdate: uid.startdate,
            enddate: uid.enddate,
            specification: uid.specification,

        })
    }, [uid])

    const getbatch = async (id) => {
        const data = {
            courseid: id
        }

        try{
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data)

        }catch (err) {
            console.error("Error fetching data:", err);
        }

    };

    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                SetCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const getstudentlisitng = (id) => {
        setHide(true)
        const data = {
            batch_code: id
        }

        axios.post(`${BASE_URL}/getbatchwisestudent`, data)
            .then((res) => {
                setStudent(res.data)
            })
    }


    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.selectcourse){
            isValid = false;
            newErrors.selectcourse = "Course is Required"
        }

        if (!value.selectbatch){
            isValid = false;
            newErrors.selectbatch = "Batch is Required"
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
            tablename: "awt_noticeboard"
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
        getCourseData()
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
            tablename: "awt_noticeboard"
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
            tablename: "awt_noticeboard"
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



            startdate: value.startdate,
            enddate: value.enddate,
            specification: specification,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_noticeboard`, data)
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
        // { field: 'companyname', headerName: 'Company Name', flex: 2 },
        // { field: 'posteddate', headerName: 'Posted Date', flex: 2 },
        // { field: 'course', headerName: 'Course', flex: 2 },
        // { field: 'profile', headerName: 'Profile', flex: 2 },
        // { field: 'location', headerName: 'Location', flex: 2 },


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
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Student Contact Details</h4>

                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-12">
                                                <lable for="exampleFormControlSelect1">Select Course <span className="text-danger">*</span></lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selectcourse} name='selectcourse' onChange={(e) => getbatch(e.target.value)}>
                                                    <option>--Select Course--</option>

                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_name}</option>

                                                        )
                                                    })}


                                                </select>
                                                {<span className="text-danger">{error.selectcourse}</span>}
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <lable for="exampleFormControlSelect1">Select Batch<span className="text-danger">*</span></lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selectbatch} name='selectbatch' onChange={(e) => getstudentlisitng(e.target.value) }>
                                                    <option>--Select Batch--</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}> {item.Batch_code} </option>
                                                        )
                                                    })}


                                                </select>
                                                {<span className="text-danger"> {error.selectbatch} </span>}
                                            </div>


                                        </div>

                                        <div className='row p-2 gap-2'>
                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Go</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-12 col-lg-12'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h3>Details</h3>
                                                    </div><hr></hr>
                                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                                        
                                                        <button type="submit" class="btn btn-primary mr-2">Excel    </button>
                                                        

                                                       
                                                    </form>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="#">
                      

                    </div>
                </div>
            </div >
        </div >

    )
}

export default ContactExport
