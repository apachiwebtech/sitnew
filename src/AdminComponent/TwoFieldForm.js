import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { StyledDataGrid } from './StyledDataGrid';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';


const TwoFieldForm = () => {

    const {tablename,fieldname,text1,text2,type} = useParams()
    const [brand, setBrand] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

    const [value, setValue] = useState({
        field1: "" || uid[text1] ,
        field2: "" || uid[text2],

    })

    useEffect(() => {
        setValue({
            field1: "" || uid[text1],
            field2: "" || uid[text2],
            
        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.field1) {
            isValid = false;
            newErrors.field1 = `${text1} is required`
        }
        if (!value.field2) {
            isValid = false;
            newErrors.field2 = `${text2} is required`
        }


        setError(newErrors)
        return isValid
    }

    const handleUpdate = (id) => {
        const data = {
            tablename : tablename,
            u_id : id
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])
  
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getColorData() {
        const data = {
            tablename : tablename
        }
        axios.post(`${BASE_URL}/get_data`,data)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getColorData()
        value.field1 = ""
        value.field2 = ""
        setError({})
        setUid([])
    }, [tablename])

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


    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename : tablename
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getColorData()

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

            const data ={
            tablename : tablename,
            user_id : decryptedUserId(),
            uid : uid.id,
            field1 :value.field1,
            field2 :value.field2,
            field1_name : text1,
            field2_name : text2,

            }


            axios.post(`${BASE_URL}/add_data_two`, data)
                .then((res) => {
                    alert(res.data)
                    getColorData()
                    setUid([])
                    setValue({
                        field1 :"",
                        field2 :""
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
        pageid: 9
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])
    
    const columns = [
        {
            field: 'index',
            headerName: '#',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 0.5,
            filterable: false,
        },
        { field: `${text1}`, headerName: `${text1}`, flex: 1 },
        { field: `${text2}`, headerName: `${text2}`, flex: 1 },
        ...(roleaccess > 2 ? [{
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                       {roleaccess > 0 && <EditIcon style={{cursor : "pointer"}} onClick={() => handleUpdate(params.row.id)} />}
                       {roleaccess > 0 &&<DeleteIcon style={{ color: "red" ,cursor : "pointer"}} onClick={() => handleClick(params.row.id)} /> }
                    </>
                )
            }
        },] : [])
    ];


    const rowsWithIds = brand.map((row, index) => ({ index: index + 1, ...row }));


    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add {fieldname}</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">{text1} <span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.field1} placeholder={`Enter ${text1} Name `} name='field1' onChange={onhandleChange} />
                                            {error.field1 && <span className='text-danger'>{error.field1}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">{text2} <span className='text-danger'>*</span></label>
                                            <input type={type} class="form-control" id="exampleInputUsername1" value={value.field2} placeholder={`Enter ${text2}  `} name='field2' onChange={onhandleChange} />
                                            {error.field2 && <span className='text-danger'>{error.field2}</span>}
                                        </div>
                                   
                                

                                        {roleaccess > 0 &&<button type="submit" class="btn btn-primary mr-2">Submit</button>}
                                        {roleaccess > 0 &&<button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">{fieldname}</h4>
                                            <p class="card-description">
                                                List Of {fieldname}
                                            </p>
                                        </div>

                                    </div>
                                    
                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                    <StyledDataGrid
                                            rows= {rowsWithIds}
                                            columns={columns}
                                            getRowId={(row) => row.id}
                                            disableColumnSelector
                                            disableDensitySelector
                                            pagination
                                            initialState={{
                                              pagination: {
                                                paginationModel: { pageSize: 51, page: 0 }, // Set your desired page size here
                                              },
                                            }}
                                            slots={{
                                                toolbar: GridToolbar
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
            </div>
        </div>

    )
}

export default TwoFieldForm