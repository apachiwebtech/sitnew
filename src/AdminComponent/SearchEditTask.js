import { InsertChartRounded } from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';

const SearchEditTask = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [specification, setSpecification] = useState("")
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    console.log(specification)

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };



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

        // if(validateForm()){
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
        // { field: 'startdate', headerName: 'Task Name', flex: 2 },
        // { field: 'enddate', headerName: 'Description', flex: 2 },
        // { field: 'nominalcompletiontime', headerName: 'Nominal Completion Time', flex: 2 },
        // { field: 'repetitive', headerName: 'Repetitive', flex: 2 },
        // { field: 'createdby', headerName: 'Created By', flex: 2 },
        // { field: 'createddate', headerName: 'Created Date', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                        {/* <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} /> */}
                    </>
                )
            }
        },
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <h4 class="card-title">Search Criteria</h4>
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Between Task Dates</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1"
                                                value={value.betweentask} name='betweentask' onChange={InsertChartRounded} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">And</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1" 
                                                value={value.and} name='and' onChange={onhandleChange}   />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">	Task Name Like</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.taskname}
                                                 placeholder="Task Name Link" name='taskname' onChange={onhandleChange}  />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Between Target Dates</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1"
                                                 value={value.betweentarget} name='betweentarget' onChange={onhandleChange}  />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">And</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                value={value.and1} name="and" onChange={onhandleChange}  />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleFormControlSelect1">	Assigned To</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.assigned}
                                                placeholder="Assigned" name='assigned' onChange={onhandleChange}>
                                                    <option>--Select Assigned--</option>
                                                    <option>Admin</option>
                                                    <option>Ajay Hari Patil</option>
                                                    <option>Akash Jose </option>
                                                    <option>Aditya Arvind Patil</option>
                                                    <option>Abhishek Rakesh Gupta</option>
                                                </select>
                                            </div>
                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Search</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light mr-2" >Reset</button>


                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default SearchEditTask
