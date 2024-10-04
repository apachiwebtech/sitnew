import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { data } from "jquery";
//import FormControlLabel from '@mui/material/FormControlLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';

const MaterialConsumption = () => {

    const [item, setItem] = useState([])
    const [faculty, setFacilty] = useState([])
    const [currentdate, setDate] = useState('');
    const [course, setCourse] = useState([])
    const [batch, setBatch] = useState([])
    const [student, setStudent] = useState([])
    const [brand, setBrand] = useState([])
    const [materialconsumptiondata, setData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [batchid, setBatchid] = useState('')
    const [courseid, setCourseid] = useState('')


    const [value, setValue] = useState({

        faculty: "" || uid.faculty,
        startdate: "" || uid.startdate,
        course: "" || uid.course,
        qtyinstock: "" || uid.qtyinstock,
        batchno: "" || uid.batchno,
        student: "" || uid.student,
        selectitem: "" || uid.selectitem,
        qtyissue: "" || uid.qtyinstock,
        price: "" || uid.price,
        ammounts: "" || uid.ammounts,
        purpose: "" || uid.purpose,

    })

    useEffect(() => {
        setValue({

            faculty: uid.faculty,
            startdate: uid.startdate,
            course: uid.course,
            qtyinstock: uid.qtyinstock,
            batchno: uid.batchno,
            student: uid.student,
            selectitem: uid.selectitem,
            qtyissue: uid.qtyinstock,
            price: uid.price,
            ammounts: uid.ammounts,
            purpose: uid.purpose,

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


    async function MaterialConsumption() {


        axios.get(`${BASE_URL}/getmaterialconsumption`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const getcourse = () => {

        const data = {
            tablename: "Course_Mst",
            columnname: "Course_Id,Course_Name"
        }

        axios.post(`${BASE_URL}/get_new_data`, data)
            .then((res) => {
                console.log(res.data)
                setCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getBatch = async (id) => {
        setCourseid(id)
        const data = {
            courseid: id
        }


        if (id) {
            axios.post(`${BASE_URL}/getcoursewisebatch`, data)
                .then((res) => {
                    console.log(res.data)
                    setBatch(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            try {
                const res = await axios.get(`${BASE_URL}/getbatch`, data);

                setBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


    }

    const getStudent = async (code) => {
        setBatchid(code)
        const data = {
            batch_code: code
        }
        if (code) {
            axios.post(`${BASE_URL}/getbatchwisestudent`, data)
                .then((res) => {

                    setStudent(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_new_data`, 
                    { tablename: "Student_Master", columnname: "Student_Id,Student_Name" });

                setStudent(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


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

    async function getitem() {
        
        axios.get(`${BASE_URL}/getitem`)
        .then((res) => {
            setItem(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getBatch()
        getStudent()
        getcourse()
        MaterialConsumption()
        getfaculty()
        getitem()
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
            tablename: "material_consumption"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])
                setBatchid(res.data[0].batchno)
                setCourseid(res.data[0].course)
                setDate(res.data[0].date)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "material_consumption"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                MaterialConsumption()

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

            faculty: value.faculty,
            startdate: value.startdate,
            course: value.course,
            qtyinstock: value.qtyinstock,
            batchno: value.batchno,
            student: value.student,
            selectitem: value.selectitem,
            qtyissue: value.qtyinstock,
            price: value.price,
            ammounts: value.ammounts,
            purpose: value.purpose,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_material_consumption`, data)
            .then((res) => {
                console.log(res)
                alert("Data added successfully")
                MaterialConsumption()
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
        { field: 'startdate', headerName: 'Issue Date', flex: 2 },
        { field: 'batchno', headerName: 'Batch Code', flex: 2 },
        { field: 'course', headerName: 'Course', flex: 2 },
        { field: 'student', headerName: 'Student Name', flex: 2 },
        { field: 'faculty', headerName: 'Isussed By', flex: 2 },
        { field: 'selectitem', headerName: 'Item', flex: 2 },
        { field: 'qtyissue', headerName: 'Qty Issue', flex: 2 },

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


    const rowsWithIds = materialconsumptiondata.map((row, index) => ({ index: index + 1, ...row }));

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
                                                <lable for="exampleFormControlSelect1">Course<span className="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={value.course} name='course' onChange={(e) => getBatch(e.target.value)}>
                                                    <option>Select Course</option>
                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>

                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Qty In Stock<span className="text-danger">*</span></lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.qtyinstock} name='qtyinstock'
                                                    onChange={onhandleChange} disabled />
                                                {<span className='text-danger'> {error.qtyinstock} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Batch No.</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.batchno} name='batchno' onChange={(e) => getStudent(e.target.value)}>
                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>

                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Student</label>
                                                <select className='form-control form-control-lg'
                                                    id="exampleFormControlSelect1" value={value.student}
                                                    name='student' onChange={onhandleChange}>

                                                    <option>Select Student</option>
                                                    {student.map((item) => {
                                                        return (
                                                            <option value={item.Student_Id}>{item.Student_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Select Item<span className="text-danger">*</span></label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.selectitem} name='selectitem' onChange={onhandleChange}>
                                                    <option>Select Material Type</option>

                                                    {item.map((item) => {
                                                        return(
                                                            <option value={item.Item_Id}>{item.Item_Name}</option>
                                                        )
                                                    })}
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
                                                <input type="text" class="form-control"
                                                    id="exampleInputUsername1"
                                                    value={value.ammounts}
                                                    placeholder='Total Ammount'
                                                    name='ammounts' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Purpose</label>
                                                <textarea class="form-control" id="exampleTextarea1"
                                                    name='purpose' value={value.purpose}
                                                    placeholder="Purpose"
                                                    onChange={onhandleChange}></textarea>

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
                                            <h4 class="card-title">View Material Cosumption</h4>
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
