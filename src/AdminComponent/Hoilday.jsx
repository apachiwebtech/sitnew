import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid ,GridToolbar} from '@mui/x-data-grid';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { StyledDataGrid } from './StyledDataGrid';
import { formatDate } from "../Utils/dateFormat";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';


const Holiday = () => {

    const [hoilday, setHoildaydata] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });
 

    const [value, setValue] = useState({
        hoilday: "" || uid.Hoilday,
        date: "" || uid.Date_of_Holiday,

    })

    useEffect(() => {
        setValue({
            hoilday: uid.Hoilday,
            date: uid.Date_of_Holiday,
        })

    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}
        
        if (!value.hoilday) {
            isValid = false;
            newErrors.hoilday = "Name is require"
        }
        if (!value.date) {
            isValid = false;
            newErrors.date = "date is require"
        }

        
        setError(newErrors)
        return isValid
    }




    async function getHoilday() {

        axios.get(`${BASE_URL}/get_hoilday`)
            .then((res) => {
                console.log(res.data)
                setHoildaydata(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getHoilday()
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
        setValue({
            hoilday :"",
        })
        const data = {
            u_id: id,
            uidname: "Id",
            tablename: "Holiday_master"
        }
        axios.post(`${BASE_URL}/new_update_data`, data)
            .then((res) => {
                setUid(res.data[0])
                setValue({
                    hoilday :res.data[0].Perticular,
                    date :res.data[0].Perticular,
                })
                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            delete_id: id,
            tablename: "Holiday_master",
            column_name: 'Id'
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getHoilday()

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

        if (validateForm()) {
            const data = {
                Hoilday:  value.hoilday,
                date:  value.date,
                u_id : uid.Id
            }


            axios.post(`${BASE_URL}/add_hoilday`, data)
                .then((res) => {
                    console.log(res)
                    getHoilday()
                    alert("Data Submitted Successfully")
                    setUid([])
                    setValue({
                        hoilday :""
                     })
                })
                .catch((err) => {
                    console.log(err)
                })
        }





    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



const roledata = {
        role: Cookies.get(`role`),
        pageid: 5
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])



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
        { field: 'Holiday', headerName: 'Hoilday', flex: 1 },
        {
            field: 'Date_of_Holiday',
            headerName: 'Date',
            flex: 1,
            renderCell: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if already in DD-MM-YYYY format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return params.value; // Return original value if not a valid date
          
              // Convert valid date to DD-MM-YYYY format
              return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
          },
          
          ...(roleaccess > 2 ? [ {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess >=2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.Id)} />} 
                        {roleaccess > 3 &&  <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Id)} />}
                    </>
                )
            }
        },] : [])
    ];


    const rowsWithIds = hoilday.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row" >
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card"style={{marginTop: '30px'}}>
                                <div class="card-body">
                                    <h4 class="card-title">Hoilday</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Hoilday<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.hoilday} placeholder="Fees Note" name='hoilday' onChange={onhandleChange} />
                                                {error.hoilday && <span className='text-danger'>{error.hoilday}</span>}
                                            </div>
                                            <div class="form-group col-lg-12" style={{ display: 'flex', flexDirection: "column"}}>
                                                <label for="exampleInputUsername2">Date<span className='text-danger'>*</span></label>
                                                <DatePicker
        selected={value.date ? new Date(value.date) : null}
        onChange={(date) => onhandleChange({ target: { name: "date", value: date } })}
        className="form-control"
        id="exampleInputUsername2"
        dateFormat="dd-MM-yyyy"
        placeholderText="dd-MM-yyyy"
      />
                                                {error.date && <span className='text-danger'>{error.date}</span>}
                                            </div>
                                        </div>


                                        {roleaccess > 2 && <button type="submit" class="btn btn-primary mr-2">Submit</button>}
                                        {roleaccess > 2 &&<button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>}
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'
                                    style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">List of Hoilday</h4>
                                            
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
                                            getRowId={(row) => row.Id}
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



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default Holiday