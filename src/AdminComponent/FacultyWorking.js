import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';

const FacultyWorking = () => {

    const [brand, setBrand] = useState([])
    const [Course, SetCourse] = useState([])
    const [Courseid, SetCourseid] = useState("")
    const [Batch, SetBatch] = useState([])
    const [Batchid, SetBatchid] = useState([])
    const [faculty,setfaculty] = useState([])
    const [working , setWorking] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);


    // const children = (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    //       <FormControlLabel
    //         label="Child 1"
    //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label="Child 2"
    //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );

    const [value, setValue] = useState({
        date: "" || uid.date,
        course: "" || uid.course,
        batch: "" || uid.batch,
        faculty: "" || uid.faculty,
        facultytime: "" || uid.facultytime,
        to: "" || uid .to,
        work: "" || uid.work


    })

    useEffect(() => {
        setValue({
            date: uid.date,
            course: uid.course,
            batch: uid.batch,
            faculty: uid.faculty,
            facultytime: uid.facultytime,
            to: uid.to,
            work: uid.work


        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.date) {
        isValid = false;
        newErrors.date = "Date is require"
       }
        if (!value.course) {
            isValid = false;
            newErrors.course = "course is require"
        }
        if (!value.batch) {
            isValid = false;
            newErrors.batch = "batch is require"
        }
        if (!value.faculty) {
            isValid = false;
            newErrors.faculty = "faculty is require"
        }
        if (!value.facultytime) {
            isValid = false;
            newErrors.facultytime = "faculty time from is require"
        }
        if (!value.to) {
            isValid = false;
            newErrors.to = "faculty Time to is require"
        }
        if (!value.work) {
            isValid = false;
            newErrors.work = "work is require"
        }
        setError(newErrors)
        return isValid
    }


    async function getWorkingData() {

        axios.get(`${BASE_URL}/get_workingtime`)
            .then((res) => {
                console.log(res.data)
                setWorking(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



  

    useEffect(() => {
        getWorkingData()
        getfaulty()
        getCourseData()
        getbatch()
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
            tablename: "awt_facultyworking"
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
            tablename: "awt_facultyworking"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getWorkingData()

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

            date: value.date,
            course: value.course,
            batch: value.batch,
            faculty: value.faculty,
            facultytime: value.facultytime,
            to: value.to,
            work: value.work,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_facultyworking`, data)
            .then((res) => {
                console.log(res)
                getWorkingData()

            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

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
    const getbatch = async (id) => {

        if (id != undefined) {
            SetCourseid(id)

            const data = {
                courseid: id
            }

            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                SetBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            const data = {
                tablename: "Batch_Mst",
                columnname: "Batch_Id,Batch_code"
            }
            axios.post(`${BASE_URL}/get_new_data`, data)
                .then((res) => {
                   
                    SetBatch(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    };


    async function getfaulty() {
        const data = {
            tablename: "faculty_master"
        }
        axios.get(`${BASE_URL}/getfaculty`, data)
            .then((res) => {
                console.log(res.data)
                setfaculty(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        if ([e.target.name] == 'course') {
            getbatch([e.target.value]);
        }
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
        { field: 'date', headerName: 'Date', flex: 2 },
        { field: 'Course_Name', headerName: 'Course', flex: 2 },
        { field: 'Batch_code', headerName: 'Batch', flex: 2 },
        { field: 'faculty', headerName: 'Faculty', flex: 2 },
        { field: 'facultytime', headerName: 'Facultytime', flex: 2 },
        { field: 'to', headerName: 'To', flex: 2 },
        { field: 'work', headerName: 'Work', flex: 2 },


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


    const rowsWithIds = working.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">View Faculty Working Hours Info</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                                {error.date && <span className='text-danger'>{error.date}</span>}
                                            </div>



                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>Select</option>
                                                    {Course.map((item) => {
                                                        return (

                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                                {error.course && <span className='text-danger'>{error.course}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option>Select</option>
                                                    {Batch.map((item)=>{
                                                        return(
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}


                                                </select>
                                                {error.batch && <span className='text-danger'>{error.batch}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Faculty</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.faculty} onChange={onhandleChange} name='faculty'>
                                                   <option value="select">Select</option>
                                                   {faculty.map((item) => {
                                                        return (

                                                            <option value={item.Faculty_Id}>{item.Faculty_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                                {error.faculty && <span className='text-danger'>{error.faculty}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Faculty Time From</label>
                                                <input type="time" class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.facultytime} onChange={onhandleChange} name='facultytime' />
                                                {error.facultytime && <span className='text-danger'>{error.facultytime}</span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Faculty Time To</label>
                                              <input type="time" class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.to} onChange={onhandleChange} name='to' />
                                              {error.to && <span className='text-danger'>{error.to}</span>}
                                            </div>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Work</label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.work} placeholder="Work" name='work' onChange={onhandleChange}></textarea>
                                                {error.work && <span className='text-danger'>{error.work}</span>}
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
                                            <h4 class="card-title">View Faculty Working Hours</h4>
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

export default FacultyWorking
