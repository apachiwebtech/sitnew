import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LibraryBooks } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const GenerateResult = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

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
        course: "" || uid.course,
        batch: "" || uid.batch,
        returndate: "" || uid.returndate,
        printdate: "" || uid.printdate,
        prepared: "" || uid.prepared,
        checked: uid.checked,
        approved: uid.approved,




    })

    useEffect(() => {
        setValue({
            course: uid.course,
            batch: uid.batch,
            returndate: uid.returndate,
            printdate: uid.printdate,
            prepared: uid.prepared,
            checked: uid.checked,
            approved: uid.approved,

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
            tablename: "awt_generateresult"
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
            tablename: "awt_generateresult"
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
            tablename: "awt_generateresult"
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

            course: value.course,
            batch: value.batch,
            returndate: value.returndate,
            printdate: value.printdate,
            prepared: value.prepared,
            checked: value.checked,
            approved: value.approved,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_generateresult`, data)
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


        { field: 'course', headerName: 'Course', flex: 2 },
        { field: 'batch', headerName: 'Batch', flex: 2 },
        { field: 'returndate', headerName: 'Return Date', flex: 2 },
        { field: 'printdate', headerName: 'Print Date', flex: 2 },
        { field: 'prepared', headerName: 'Prepared', flex: 2 },
        { field: 'checked', headerName: 'Checked', flex: 2 },
        { field: 'approved', headerName: 'Approved', flex: 2 },


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
                                    <h4 class="card-title">Generate Final Result</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>Select</option>
                                                    <option>Administration</option>
                                                    <option>Business Development</option>
                                                    <option>Training &amp; Development</option>
                                                    <option>Account</option>
                                                    <option>Placement</option>
                                                    <option>Purchase</option>
                                                    <option>Leadership / DD</option>
                                                    <option>Quality Assurance</option>
                                                    <option>Human Resources</option>
                                                    <option>Corporate Training</option>
                                                    <option>Test User</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option>00001</option>
                                                    <option>01002</option>
                                                    <option>01003</option>
                                                    <option>01004</option>
                                                    <option>01005</option>
                                                    <option>01006</option>
                                                    <option>01007</option>
                                                    <option>01008</option>
                                                    <option>01009</option>


                                                </select>
                                            </div>



                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Result Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.returndate} name='returndate' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Print Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.printdate} name='printdate' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Prepared By<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.prepared} onChange={onhandleChange} name='prepared'>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Checked By<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.checked} onChange={onhandleChange} name='checked'>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>


                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Approved By<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.approved} onChange={onhandleChange} name='approved'>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>


                                                </select>
                                            </div>





                                        </div>


                                        <button type="submit" class="btn btn-primary mr-2">Generate</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>



                                    </form>

                                    <button type="submit" class="btn btn-primary mr-2">Save</button>
                                    <button type="submit" class="btn btn-primary mr-2">Without Absent Rule</button>
                                    <button type="submit" class="btn btn-primary mr-2">Without Absent Rule with Full Attendance</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print Report Card</button>
                                    <button type="submit" class="btn btn-primary mr-2">MarkSheet</button>
                                    <button type="submit" class="btn btn-primary mr-2">Certificate Print</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print Sheet</button>



                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">View  Final Result</h4>
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

export default GenerateResult
