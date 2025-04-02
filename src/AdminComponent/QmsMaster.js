import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";
//import FormControlLabel from '@mui/material/FormControlLabel';

const QmsMaster = () => {

    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});


    const [value, setValue] = useState({
        QMS_name: "" || uid.QMS_name,
        QMS_Desc: "" || uid.QMS_Desc,

    })

    useEffect(() => {
        setValue({
            QMS_name: uid.QMS_name,
            QMS_Desc: uid.QMS_Desc,

        })
    }, [uid])


    console.log(uid.id,"RRRRR")


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



    async function getqms_master() {
        const data = {
            tablename: "qms_master",
            // columnname: "*"
        }
        axios.post(`${BASE_URL}/getqms_master`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getqms_master()
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

    const handleUpdate = async (id) => {
        try {
            const data = {
                u_id: id,
                uidname: "Id",
                tablename: "qms_master"
            }
            axios.post(`${BASE_URL}/new_update_data`, data)
            .then ((res) => {
                setUid(res.data[0])
         
            })
            .catch((err) => {
                console.log(err)
            })
            
        } catch (err) {
            console.error(err);
        }
    };
    const handleDelete = async (id) => {
        const data = {
            delete_id: id,
            tablename: "qms_master",
            column_name:"Id"
        };
        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {

                getqms_master();

                setConfirmationVisibleMap((prevMap) => ({
                    ...prevMap,
                    [id]: false,
                }));
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // if(validateForm()){
        const data = {

            QMS_name: value.QMS_name,
            QMS_Desc: value.QMS_Desc,
            uid: uid.Id
        }


        axios.post(`${BASE_URL}/add_qms_master`, data)
            .then((res) => {
                alert("Data Added")
                getqms_master()
                setUid([])
                setValue({
                    QMS_name: "",
                    QMS_Desc: "",
                })
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
        { field: 'QMS_name', headerName: 'Qms Name', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.Id)} />
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Id)} />
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
                        <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    {/* <h4 class="card-title">View Roll No. Allocated Batches</h4> */}
                                    <h4 class="card-title">View Qms Master</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleSelectUsername1">Qms Name</label>
                                                <input type="text" class="form-control" 
                                                id="exampleSelectUsername1" value={value.QMS_name}
                                                 placeholder='Qms Name' name='QMS_name' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Description</label>
                                                <textarea class="form-control" rows={5} 
                                                id="exampleTextarea1" value={value.QMS_Desc}
                                                 placeholder='Description' name='QMS_Desc' onChange={onhandleChange} ></textarea>
                                            </div>


                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>

                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Back</button>




                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between' style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            {/* <h4 class="card-title">Allot Roll Number List</h4> */}
                                            <h4 class="card-title">View Qms Master</h4>
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
                                            getRowId={(row) => row.Id}
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

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default QmsMaster
