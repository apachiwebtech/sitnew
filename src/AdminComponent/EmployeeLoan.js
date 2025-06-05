import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";
//import FormControlLabel from '@mui/material/FormControlLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';

const EmployeeLoan = () => {
    
    const [faculty, setFacilty] = useState([])
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });

    const [value, setValue] = useState({
        employee: "" || uid.employee,
        loandate: "" || uid.loandate,
        loanamt: "" || uid.loanamt,
        monthly: "" || uid.monthly,
        totalmonths: "" || uid.totalmonths,
        comments: "" || uid.comments,
    })


    useEffect(() => {
        setValue({
            employee: uid.employee,
            loandate: uid.loandate,
            loanamt: uid.loanamt,
            monthly: uid.monthly,
            totalmonths: uid.totalmonths,
            comments: uid.comments,

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
            tablename: "sit_employeeloan"
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
            tablename: "sit_employeeloan"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])
              
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "sit_employeeloan"
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

            employee: value.employee,
            loandate: value.loandate,
            loanamt: value.loanamt,
            monthly: value.monthly,
            totalmonths: value.totalmonths,
            comments: value.comments,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_employeeloan`, data)
            .then((res) => {
                //console.log(res)
                alert("Data Added")
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


const roledata = {
        role: Cookies.get(`role`),
        pageid: 87,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);


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
        { field: 'employee', headerName: 'Employee', flex: 2 },
        {
            field: "loandate",
            headerName: "Loan Date",
            flex: 2,
            renderCell: (params) =>
              params.value
                ? /^\d{2}-\d{2}-\d{4}$/.test(params.value)
                  ? params.value
                  : new Date(params.value).toLocaleDateString("en-GB")
                : "",
          },
          
        { field: 'loanamt', headerName: 'Loan Amt.', flex: 2 },
        { field: 'monthly', headerName: '	Total Months', flex: 2 },
        { field: 'totalmonths', headerName: 'Monthly Installment', flex: 2 },
        { field: 'comments', headerName: 'Comments', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                         {roleaccess > 2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />}
                         {roleaccess > 3 &&<DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />}
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
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Employee Loan</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Employee</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" 
                                                value={value.employee} name='employee' onChange={onhandleChange}>
                                                    <option>Select Employee</option>
                                                    {faculty.map ((item) => {
                                                        return (
                                                            <option value={item.Faculty_Id}> {item.Faculty_Name} </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3" style={{ display: "flex", flexDirection: "column"}}>
                                                <lable for="exampleInputUsername1">Loan Date</lable>
                                                <DatePicker
        selected={value.loandate}
        onChange={(date) => onhandleChange({ target: { name: "loandate", value: date } })}
        className="form-control"
        id="loandate"
        placeholderText="Select Loan Date"
        dateFormat="yyyy-MM-dd"
        minDate={new Date()} // Prevents past dates
      />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Loan Amt.</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.loanamt} placeholder='Loan Amt.' name='loanamt' 
                                                onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Monthly Installment</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.monthly} placeholder='Monthly Installment' name='monthly' 
                                                onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Total Months</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.totalmonths} placeholder='Total Months' name='totalmonths' 
                                                onChange={onhandleChange} />
                                            </div>

                                            <div className='form-group col-lg-9'>
                                                <lable for="exampleTextarea1">Comments</lable>
                                                <textarea className='form-control' id='exampleTeaxtarea1' 
                                                value={value.comments} placeholder='Comments' name='comments' 
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
                                    <div className='d-flex justify-content-between' style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">View Employee Loan Details</h4>
                                        </div>

                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
                                            pagination
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={setPaginationModel}
                                            pageSizeOptions= {[50]}
                                            autoHeight={false}
                                            sx={{
                                              height: 500, // Ensure enough height for pagination controls
                                              '& .MuiDataGrid-footerContainer': {
                                                justifyContent: 'flex-end',
                                              },
                                            }}
                                            slots={{
                                                toolbar: GridToolbar
                                            }}
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

export default EmployeeLoan
