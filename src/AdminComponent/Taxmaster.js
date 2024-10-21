import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid } from '@mui/x-data-grid';


const Taxmaster = () => {


    const [brand, setBrand] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

    const [value, setValue] = useState({
        Tax: "" || uid.Tax ,
        Tax_date: ""  || uid.Tax_date,

    })

    useEffect(() => {
        setValue({
            Tax: uid.Tax ,
            Tax_date: uid.Tax_date ,
            
        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.Tax) {
            isValid = false;
            newErrors.tax = `Tax is required`
        }
        if (!value.Tax_date) {
            isValid = false;
            newErrors.taxdate = `Tax Date is required`
        }


        setError(newErrors)
        return isValid
    }

    const handleUpdate = (id) => {
        const data = {
            tablename : "awt_tax",
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
            tablename : "awt_tax"
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
        value.Tax = ""
        value.Tax_date = ""
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


    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename : "awt_tax"
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
            user_id : decryptedUserId(),
            uid : uid.id,
            Tax :value.Tax,
            Tax_date :value.Tax_date,

            }


            axios.post(`${BASE_URL}/add_taxdata`, data)
                .then((res) => {
                    alert(res.data)
                    getColorData()
                    setUid([])
                    setValue({
                        Tax :"",
                        Tax_date :""
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
            headerName: '#',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,
        },
        { field: `Tax`, headerName: `Tax_date`, flex: 2 },
        { field: `Tax_date`, headerName: `Tax_date`, flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                       <EditIcon style={{cursor : "pointer"}} onClick={() => handleUpdate(params.row.id)} />
                       <DeleteIcon style={{ color: "red" ,cursor : "pointer"}} onClick={() => handleClick(params.row.id)} /> 
                    </>
                )
            }
        },
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
                                    <h4 class="card-title">Add Tax</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Tax <span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Tax} placeholder={`Enter Tax Name `} name='Tax' onChange={onhandleChange} />
                                            {error.tax && <span className='text-danger'>{error.tax}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Tax date <span className='text-danger'>*</span></label>
                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.Tax_date} placeholder={`Enter Date `} name='Tax_date' onChange={onhandleChange} />
                                            {error.taxdate && <span className='text-danger'>{error.taxdate}</span>}
                                        </div>
                                   
                                

                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Tax</h4>
                                            <p class="card-description">
                                                List Of Tax
                                            </p>
                                        </div>

                                    </div>
                                    
                                    <div>
                                    <DataGrid
                                            rows= {rowsWithIds}
                                            columns={columns}
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                  paginationModel: { pageSize: 10, page: 0 },
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
            </div>
        </div>

    )
}

export default Taxmaster