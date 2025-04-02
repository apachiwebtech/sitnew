import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { data } from "jquery";
import { StyledDataGrid } from "./StyledDataGrid";

const BatchTransfer = () => {

    const [assign, Setassign] = useState([])
    const [currentdate, setDate] = useState('');
    const [course, setCourse] = useState([])
    const [batch, setBatch] = useState([])
    const [transfer, setTransBatch] = useState([])
    const [student, setStudent] = useState([])
    const [batchleftdata, setData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [batchid, setBatchid] = useState('')
    const [courseid, setCourseid] = useState('')

    const [value, setValue] = useState({

        coursename: "" || uid.coursename,
        oldbatchno: "" || uid.oldbatchno,
        student: "" || uid.student,
        newbatch: "" || uid.trans_batchcode,
        transferammount: "" || uid.transferammount,
        paymenttype: "" || uid.paymenttype

    })

    useEffect(() => {
        setValue({

            coursename: uid.coursename,
            oldbatchno: uid.oldbatchno,
            student: uid.student,
            newbatch: uid.trans_batchcode,
            transferammount: uid.transferammount,
            paymenttype: uid.paymenttype,
        })
    }, [uid])

    async function BatchTransfer() {


        axios.get(`${BASE_URL}/getbatch_transfer`)
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



    const getassign = async (id) => {
        setBatchid(id)

        const data = {
            batch_id: id,
            AnnulBatch: id
        }

        if (id) {
            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                Setassign(res.data);

            } catch (err) {
                console.error("error fetching data:", err);
            }
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_new_data`,
                    {
                        tablename: "Batch_Mst",
                        columnname: "Batch_Id , Batch_code"
                    });
                Setassign(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

    }

    const gettransferbatch = () =>{

        axios.get(`${BASE_URL}/gettranferbatch`)
        .then((res) =>{
            console.log(res)
            setTransBatch(res.data)
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
                    {
                        tablename: "Student_Master",
                        columnname: "Student_Id,Student_Name"
                    });

                setStudent(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


    }





    useEffect(() => {
        gettransferbatch()
        getBatch()
        getStudent()
        getcourse()
        BatchTransfer()
        getassign()
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
            tablename: "awt_batchtransfer"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])
                setBatchid(res.data[0].oldbatch_code)
                setCourseid(res.data[0].coursename)
         
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_batchtransfer"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                BatchTransfer()

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

        const data = {
            coursename: courseid,
            oldbatchno: batchid,
            student: value.student,
            newbatch: value.newbatch,
            transferammount: value.transferammount,
            paymenttype: value.paymenttype,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_awt_batchtransfer`, data)
            .then((res) => {
                console.log(res)
                setValue({
                    newbatch:"",
                    student:"",
                    transferammount:"",
                    paymenttype:"",

                    
                })
                setBatchid('')
                setCourseid('')
                setUid([])
                alert("Data added successfully")
                BatchTransfer()
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
            flex: 0.5,
            filterable: false,

        },
        { field: 'Student_Name', headerName: 'Student Name', flex: 1.5 },
        { field: 'oldbatch_code', headerName: 'Old Batch Code', flex: 1.5 },
        { field: 'trans_batchcode', headerName: 'Tranfer Batch', flex: 1.5 },
        {
            field: "created_date",
            headerName: "Date",
            flex: 1.5,
            renderCell: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if already in DD-MM-YYYY format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return ""; // Handle invalid dates
          
              // Convert to DD-MM-YYYY format
              return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
          },
          
        { field: 'transferammount', headerName: 'Transfer Amount', flex: 1.5 },

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

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add details for Transfer Batch</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Course<span className="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={courseid} name='coursename' onChange={(e) => getBatch(e.target.value)}>
                                                    <option>Select Course</option>
                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>

                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.coursename} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch No.</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={batchid} name='oldbatchno' onChange={(e) => getStudent(e.target.value)}>
                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>

                                                        )
                                                    })}
                                                </select>
                                                {<span className="text-danger">{error.oldbatchno} </span>}
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
                                                {<span className="text-danger"> {error.student} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">New Batch No.<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" name='newbatch'
                                                    value={value.newbatch} onChange={onhandleChange}>
                                                    <option>Select Batch</option>
                                                    {transfer.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className='text-danger'> {error.newbatch} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Transfer Amount<span className="text-danger">*</span></lable>
                                                <input text="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.transferammount} placeholder='00.00' name='transferammount'
                                                    onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.transferammount} </span>}
                                            </div>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFomrControlSelect1">Payment Type<span className="text-danger">*</span></label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.paymenttype} name='paymenttype' onChange={onhandleChange}>

                                                    <option value="">Select</option>
                                                    <option value={`Lumpsum`}>Lumpsum</option>
                                                    <option value={`Installment`}>Installment</option>
                                                </select>
                                                {<span className='text-danger'> {error.paymenttype} </span>}
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
                                    <div className='d-flex justify-content-between'style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">View Batch Transfer</h4>
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

export default BatchTransfer
