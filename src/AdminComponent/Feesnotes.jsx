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


const Feesnotes = () => {

    const [feesnote, setFeesNotedata] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

 

    const [value, setValue] = useState({
        feesnote: "" || uid.FeesNote,

    })

    useEffect(() => {
        setValue({
            feesnote: uid.FeesNotek,
        })

    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.feesnote) {
            isValid = false;
            newErrors.feesnote = "Name is require"
        }

        setError(newErrors)
        return isValid
    }




    async function getFeesNote() {

        axios.get(`${BASE_URL}/get_feesnotes`)
            .then((res) => {
                console.log(res.data)
                setFeesNotedata(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getFeesNote()
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
            feesnote :"",
        })
        const data = {
            u_id: id,
            uidname: "Id",
            tablename: "Fees_notes"
        }
        axios.post(`${BASE_URL}/new_update_data`, data)
            .then((res) => {
                setUid(res.data[0])
                setValue({
                    feesnote :res.data[0].Perticular,
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
            tablename: "Fees_notes",
            column_name: 'Id'
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getFeesNote()

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
                FeesNote:  value.feesnote,
                u_id : uid.Id
            }


            axios.post(`${BASE_URL}/add_feesnotes`, data)
                .then((res) => {
                    console.log(res)
                    getFeesNote()
                    alert("Data Submitted Successfully")
                    setUid([])
                    setValue({
                        feesnote :""
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
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 0.5,
            filterable: false,
        },
        { field: 'Perticular', headerName: 'Fees Note', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 0.5,
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


    const rowsWithIds = feesnote.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Fees Note</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Fees Note<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.feesnote} placeholder="Fees Note" name='feesnote' onChange={onhandleChange} />
                                                {error.feesnote && <span className='text-danger'>{error.feesnote}</span>}
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
                                            <h4 class="card-title">List of Fees Note</h4>
                                            
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

export default Feesnotes