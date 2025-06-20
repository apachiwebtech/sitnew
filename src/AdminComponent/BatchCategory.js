import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';
import { StyledDataGrid } from "./StyledDataGrid";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';

const BatchCategory = () => {

    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading, setloading] = useState(true)
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });

 

    const [value, setValue] = useState({
        batchcat: "" || uid.BatchCategory,
        batchtype: "" || uid.Batch_Type,
        prefix: "" || uid.Prefix,
        description: "" || uid.Description,

    })

    useEffect(() => {
        setValue({
            batchcat:'' || uid.BatchCategory,
            batchtype: "" || uid.Batch_Type,
            prefix: "" || uid.Prefix,
            description: "" || uid.Description,
        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.batchcat) {
            isValid = false;
            newErrors.batchcat = "Name is require"
        }

        setError(newErrors)
        return isValid
    }




    async function getBatchData() {

        axios.get(`${BASE_URL}/get_batchcategory`)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
                setloading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getBatchData()
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
            batchcat: "",
            batchtype: "" ,
            prefix: "" ,
            description: "",
        })
        const data = {
            u_id: id,
            uidname: "id",
            tablename: "MST_BatchCategory"
        }
        axios.post(`${BASE_URL}/new_update_data`, data)
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
            delete_id: id,
            tablename: "MST_BatchCategory"
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getBatchData()

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
                batch: value.batchcat,
                batchtype: value.batchtype,
                prefix: value.prefix,
                description: value.description,
                uid : uid.id
            }


            axios.post(`${BASE_URL}/batch_category`, data)
                .then((res) => {
                    console.log(res)
                    getBatchData()
                    alert("Data Submitted Successfully")
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
        pageid: 15
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
        { field: 'BatchCategory', headerName: 'Batch Category', flex: 2 },
        ...(roleaccess > 2 ? [{
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess >= 2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />}
                        {roleaccess > 3 &&<DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />}
                    </>
                )
            }
        },] : [])
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));


    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />

            {loading && <Loader />}

            <div class="main-panel" style={{display : loading ? "none" : "block"}}>
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Batch Information</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Batch Category<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.batchcat} placeholder="Batch Category*" name='batchcat' onChange={onhandleChange} />
                                                {error.batchcat && <span className='text-danger'>{error.batchcat}</span>}
                                            </div>
                                            
                                            <div class="form-group col-lg-12">
                                                <label for="exampleFormControlSelect1">Batch Type </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchtype} onChange={onhandleChange} name='batchtype'>
                                                    <option>Select Type</option>
                                                    <option value="Inhouse">Inhouse</option>
                                                    <option value="Corporate">Corporate</option>
                                                    <option value="Transfer">Transfer</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Prefix</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.prefix} placeholder="Course Code*" name='prefix' onChange={onhandleChange} />
                                             
                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Description</label>
                                                <textarea class="form-control" id="exampleTextarea1" name='description' value={value.description} placeholder="Description*" onChange={onhandleChange}></textarea>
                                     
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
                        <div class="col-lg-7">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'
                                    style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">View Batch Category</h4>
                                            
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



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default BatchCategory