import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { data } from "jquery";

const BatchCancellation = () => {


    const [currentdate, setDate] = useState('');
    const [batchcancel, setData] = useState([])

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

    const [vendordata, setVendorData] = useState([]);
    const [uid, setUid] = useState(null); // Set initial state to null
    const [cid, setCid] = useState(null); // Set initial state to null
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [batchid, setBatchid] = useState('')
    const [courseid, setCourseid] = useState('')
    const [course, setCourse] = useState([])
    const [batch, setBatch] = useState([])
    const [student, setStudent] = useState([])

    const [value, setValue] = useState({

        student: '',
        cancellationammount: '',
        date: '',
    });

    useEffect(() => {
        if (uid) {
            setValue({

                student: uid.student || "",
                cancellationammount: uid.cancellationammount || "",
                date: uid.date || ""
            });
        }
    }, [uid]);

<<<<<<< Updated upstream

      const validateForm = () =>{

        let isValid = true
        const newErrors = {}

        if (!courseid) {
            isValid = false;
            newErrors.selectcourse = "Course is Required";
        }

        if (!batchid) {
            isValid = false;
            newErrors.batchno = "Batchcode  is Required";
        }
        if (!value.student) {
            isValid = false;
            newErrors.student = "Student  is Required";
        }

        if (!value.cancellationammount) {
            isValid = false;
            newErrors.cancellationammount = "Cancellationammount is Required";
        }

        setError(newErrors);
        return isValid;
    };

    async function BatchCancellation() {



        axios.get(`${BASE_URL}/getbatchcancellation`)
=======
    async function BatchLeft() {


        axios.get(`${BASE_URL}/getbatchleft`)
>>>>>>> Stashed changes
            .then((res) => {

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
                const res = await axios.post(`${BASE_URL}/get_new_data`, { tablename: "Student_Master", columnname: "Student_Id,Student_Name" });

                setStudent(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


    }







    useEffect(() => {
        getcourse()
        getStudent()
        getBatch()
        BatchCancellation()
        setError({});
        setUid(null);
    }, []);

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

    const handleUpdate = async (id) => {

        setValue({

            student: "",
            cancellationammount: "",
            date: ""
        });
        setCourseid('')
        setBatchid('')

        try {
            const data = {
                u_id: id,
                uidname: "id",
                tablename: "awt_batchcancellation"
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

        } catch (err) {
            console.error(err);
        }
        // axios.post(`${BASE_URL}/update_data`, data)
        //     .then((res) => {
        //         setUid(res.data[0])
        //         setBatchid(res.data[0].batchno)
        //         setCourseid(res.data[0].course)
        //         setDate(res.data[0].date)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }



    const handleDelete = async (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_batchcancellation",
        };

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {

                BatchCancellation()
            })


        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));



    }
        const handleSubmit = async (e) => {
            e.preventDefault();

            if (validateForm()) {
                const data = {
                    selectcourse: courseid,
                    batchno: batchid,
                    student: value.student,
                    cancellationammount: value.cancellationammount,
                    date: currentdate,
                    uid: uid ? uid.id : null
                };

                try {
                    await axios.post(`${BASE_URL}/add_batchcancellation`, data);
                    BatchCancellation()
                    alert("Data Submitted Successfully");
                    setValue({

                        student: "",
                        cancellationammount: "",
                        date: ""
                    });
                    setCourseid('')
                    setBatchid('')

                } catch (err) {
                    console.error(err);
                }
            }


            axios.post(`${BASE_URL}/add_sit_batchcancellation`, data)
                .then((res) => {
                    console.log(res)
                    alert("Data added successfully")
                    // BatchLeft()
                })
                .catch((err) => {
                    console.log(err)
                })
            // }




<<<<<<< Updated upstream
=======
      
        const data = {
>>>>>>> Stashed changes

        }


<<<<<<< Updated upstream
        const onhandleChange = (e) => {
            setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }

        const columns = [
            { field: 'Student_Name', headerName: 'To', flex: 2 },
            { field: 'batchno', headerName: 'Batch No', flex: 2 },
            { field: 'date', headerName: 'Date', flex: 2 },
            { field: 'cancellationammount', headerName: 'Cancel Amount', flex: 2 },
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

        const rowsWithIds = batchcancel.map((row, index) => ({ index: index + 1, ...row }));

        return (

            <div class="container-fluid page-body-wrapper col-lg-10">
                <InnerHeader />
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Batch Cancellation</h4>
                                        <hr></hr>
                                        <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                            <div class='row'>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleFormControlSelect1">Select Course<span className="text-danger">*</span></label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                        value={courseid} name='selectcourse' onChange={(e) => getBatch(e.target.value)}>
                                                        <option>--Select Course--</option>

                                                        {course.map((item) => {
                                                            return (
                                                                <option value={item.Course_Id}>{item.Course_Name}</option>

                                                            )
                                                        })}
                                                    </select>
                                                    {<span className='text-danger'> {error.course} </span>}
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleFormControlSelect1">Batch No.</label>
                                                    <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                        value={batchid} name='batchno' onChange={(e) => getStudent(e.target.value)}>
                                                        <option>--Select Batch--</option>

                                                        {batch.map((item) => {
                                                            return (
                                                                <option value={item.Batch_code}>{item.Batch_code}</option>

                                                            )
                                                        })}
                                                    </select>
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleFomrControlSelect1">Student</label>
                                                    <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                        value={value.student} name='student' onChange={onhandleChange}>
                                                        <option>Select Student</option>
                                                        {student.map((item) => {
                                                            return (
                                                                <option value={item.Student_Id}>{item.Student_Name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    {<span className='text-danger'> {error.student} </span>}
                                                </div>
                                                <div>
                                                    <select>

                                                        <option>Select Student</option>
                                                        {student.map((item) => {
                                                            return (
                                                                <option value={item.Student_Id}>{item.Student_Name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <lable for="exampleInputUsername1">Cancellation Ammount<span className="text-danger">*</span></lable>
                                                    <input text="text" class="form-control" id="exampleInputUsername1"
                                                        value={value.cancellationammount} placeholder='00.00' name='cancellationammount'
                                                        onChange={onhandleChange} />
                                                    {<span className='text-danger'> {error.cancellationammount} </span>}
                                                </div>


                                                <div className="form-group col-lg-3">
                                                    <label htmlFor="exampleInputUsername1">Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="exampleInputUsername1"
                                                        value={currentdate}
                                                        name="date"
                                                        onChange={(e) => { }}
                                                        disabled
                                                    />
                                                </div>



=======
        axios.post(`${BASE_URL}/add_sit_batchcancellation`, data)
            .then((res) => {
                console.log(res)
                alert("Data added successfully")
                BatchLeft()
            })
            .catch((err) => {
                console.log(err)
            })

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
        { field: 'student', headerName: 'Student Name', flex: 2 },
        { field: 'batchno', headerName: 'Batch Code', flex: 2 },
        { field: 'date', headerName: 'Date', flex: 2 },
        { field: 'cancellationammount', headerName: 'Cancel Amount', flex: 2 },

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


    const rowsWithIds = batchleftdata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Batch Cancellation</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Course<span className="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={value.course} name='course' 
                                                    onChange={(e) => getBatch(e.target.value)}>
                                                    <option>Select Course</option>
                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>

                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
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

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFomrControlSelect1">Student</label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.student} name='student' onChange={onhandleChange}>

                                                    <option>Select Student</option>
                                                    {student.map((item) => {
                                                        return (
                                                            <option value={item.Student_Id}>{item.Student_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Cancellation Ammount<span className="text-danger">*</span></lable>
                                                <input text="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.cancellationammount} placeholder='00.00' name='cancellationammount'
                                                    onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.cancellationammount} </span>}
>>>>>>> Stashed changes
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
                                                <h4 class="card-title">View Batch Cancellation</h4>
                                            </div>

                                        </div>

                                        <div>
                                            <DataGrid
                                                rows={rowsWithIds}
                                                columns={columns}
                                                rowHeight={35}
                                                getRowId={(row) => row.id}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: { pageSize: 10, page: 0 },
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

    export default BatchCancellation
