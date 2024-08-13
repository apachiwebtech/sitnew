import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const MassWhatsApp = () => {
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [Course, setCourse] = useState([])
    const [role, setrole] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [value, setValue] = useState({
        projectno: '',
        projectname: '',
        invoicedate: '',
        invoiceamount: '',
    })


    async function getcourses() {

      axios.get(`${BASE_URL}/getCourse`)
          .then((res) => {
              console.log(res.data)
              setCourse(res.data)
          })
          .catch((err) => {
              console.log(err)
          })
  }

    useEffect(() => {
        setValue({
            training: uid.training,
            attendee: uid.attendee,
            instructor: uid.instructor,
            description: uid.description,
            feedback: uid.feedback,

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.course) {
        isValid = false;
        newErrors.course = "Course is Required"
       }

       if(!value.batchtype){
        isValid = false;
        newErrors.batchtype = "Batch Type is Required"
       }

       if(!value.department){
        isValid = false;
        newErrors.department = "Department is Required"
       }

       if(!value.nationality){
        isValid = false;
        newErrors.nationality = "Nationality is Required"
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
    async function getRole() {
      axios.get(`${BASE_URL}/role_data`)
          .then((res) => {
            setrole(res.data)
          })
          .catch((err) => {
              console.log(err)
          })
  }

    useEffect(() => {
        getEmployeeData()
        getcourses()
        getRole()
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

        // if(validateForm()){
        const data = {

            training: value.training,
            attendee: value.attendee,
            instructor: value.instructor,
            description: value.description,
            feedback: value.feedback,
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
        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">
                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-lg-12'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div className='card-title'>Mass WhatsApp</div>
                                                    <hr></hr>
                                                    <form class="form-sample py-3" onSubmit={handleSubmit}>
                                                        <div class="row">
                                                            <div class="form-group col-lg-6">
                                                                <FormControl>Student Type
                                                                    <RadioGroup
                                                                       defaultValue="student"
                                                                        row aria-labelledby='demo-row-radio-button-group-lable'
                                                                        name='row-radio-button-group'>
                                                                        <FormControlLabel value="student" control={<Radio />} label="Student"  />
                                                                        <FormControlLabel value="inquiry" control={<Radio />} label="Inquiry" />
                                                                        <FormControlLabel value="college" control={<Radio />} label="College" />
                                                                        <FormControlLabel value="consultancy" control={<Radio />} label="Consultancy" />
                                                                    </RadioGroup>

                                                                </FormControl>
                                                            </div>

                                                            <div class="form-group col-lg-6">
                                                                <FormControl>Batch
                                                                    <RadioGroup row aria-labelledby='demo-row-radion-button-group-lable'
                                                                    name='row-radio-button-group'>
                                                                        <FormControlLabel value="selectall" control={<Radio />} label="Select All"  />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <label for="exapmleFormControlSelect1">Course<span className="text-danger">*</span></label>
                                                                <select class="form-control" id="exampleFormControlSelect1"
                                                                    value={value.course} name='course' onChange={onhandleChange}>
                                                                    <option>--Select Course--</option>
                                                                    {Course.map((item) => {
                                                                          return (

                                                                     <option value={item.Course_Id}>{item.Course_Name}</option>
                                                                          )
                                                                      })}
                                                                </select>
                                                                {<span className="text-danger"> {error.course} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <lable for="exampleFormControlSelect1">Batch Type<span className="text-danger">*</span></lable>
                                                                <select class="form-control" id="exampleFormControlSelect1" value={value.batchtype}
                                                                    name='batchtype' onChange={onhandleChange}>
                                                                    <option>--Select Batch Type--</option>
                                                                    <option>All</option>
                                                                    <option>Corporate</option>
                                                                    <option>Non-Corporate</option>
                                                                </select>
                                                                {<span className="text-danger"> {error.batchtype} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <lable for="exampleInputUsername1">From Date</lable>
                                                                <input type="date" class="form-control" id="exampleInputUsername1"
                                                                    value={value.fromdate} name='fromdate' onChange={onhandleChange} />
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <lable for="exapmleInputUsername1">To Date</lable>
                                                                <input type="date" class="form-control" id="exampleInputUsername1"
                                                                    value={value.todate} name="todate" onchange={onhandleChange} />
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <lable for="exampleFormControlSelect1">Department<span className="text-danger">*</span></lable>
                                                                <select class="form-control" id="exampleFormCpntrolSelect1" value={value.department}
                                                                    name='department' onChange={onhandleChange}>
                                                                    <option>--Select Department--</option>
                                                                    {role.map((item) => {
                                                                        return (

                                                                            <option value={item.id}>{item.title}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                                {<span className="text-danger"> {error.department} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <lable for="exampleFormControlSelect1">Nationality<span className="text-danger">*</span></lable>
                                                                <select class="form-control" id="exampleFormControlSelect1" value={value.nationality}
                                                                name='nationality' on onChange={onhandleChange}>
                                                                    <option>--Select Nationality--</option>
                                                                    <option>All</option>
                                                                    <option>Indian</option>
                                                                    <option>Non-Indian</option>
                                                                </select>
                                                                {<span className="text-danger"> {error.nationality} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-12">
                                                                <FormControl>
                                                                    <RadioGroup row aria-labelledby='demo-row-radio-button-group-lable'
                                                                    name="row-radio-button-group">
                                                                        <FormControlLabel value="sendstudent" control={<Radio />} label="Send Student"  />
                                                                        <FormControlLabel value="sendparents" control={<Radio />} label="Send Parents"  />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>

                                                            <div class="form-group col-lg-6">
                                                                <lable for="exampleTextarea1">Message</lable>
                                                                <textarea type="text" class="form-control form-control-lg" id="exampleTextarea1" value={value.message}
                                                                placeholder='Message' name="message" onchange={onhandleChange}  />
                                                            </div>

                                                            <div class="form-group col-lg-6">
                                                                <lable for="exampleTextarea1">Log</lable>
                                                                <textarea type="text" class="form-control form-control-lg" id="exapmleTextarea1" value={value.log}
                                                                placeholder='Log' name='log' onchange={onhandleChange} />
                                                            </div>
                                                        </div>

                                                        <div className='row p-2 gap-2'>
                                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Export To Excel</button>
                                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Send</button>
                                                            <button className='mr-2'>Close</button>
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

export default MassWhatsApp
