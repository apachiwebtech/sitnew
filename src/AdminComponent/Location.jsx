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


const Location = () => {

    const [location, setLocationdata] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

 

    const [value, setValue] = useState({
        location: "" || uid.Location,

    })

    useEffect(() => {
        setValue({
            location: uid.Locationk,
        })

    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.location) {
            isValid = false;
            newErrors.location = "Name is require"
        }

        setError(newErrors)
        return isValid
    }




    async function getLocation() {

        axios.get(`${BASE_URL}/get_location`)
            .then((res) => {
                console.log(res.data)
                setLocationdata(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getLocation()
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
            location :"",
        })
        const data = {
            u_id: id,
            uidname: "id",
            tablename: "Location_master"
        }
        axios.post(`${BASE_URL}/new_update_data`, data)
            .then((res) => {
                setUid(res.data[0])
                setValue({
                    location :res.data[0].LocationMaster,
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
            tablename: "Location_master",
            column_name: 'id'
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getLocation()

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
                Location:  value.location,
                u_id : uid.id
            }


            axios.post(`${BASE_URL}/add_location`, data)
                .then((res) => {
                    console.log(res)
                    getLocation()
                    alert("Data Submitted Successfully")
                    setUid([])
                    setValue({
                        location :""
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






    const columns = [
        {
            field: 'index',
            headerName: 'id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,
        },
        { field: 'LocationMaster', headerName: 'Location', flex: 2 },
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


    const rowsWithIds = location.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">location</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">location<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.location} placeholder="location" name='location' onChange={onhandleChange} />
                                                {error.location && <span className='text-danger'>{error.location}</span>}
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
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">List of location</h4>
                                            
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
                                                    paginationModel: { pageSize: 10, page: 160 },
                                                },
                                            }}
                                            // slots={{ toolbar: GridToolbar }}
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

export default Location