import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';


const EmployeeProfessionTaxMaster = () => {

    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading, setloading] = useState(true)

 

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

        if (!value.salaryfrom) {
            isValid = false;
            newErrors.salaryfrom = "Salary From is Required"
        }

        if (!value.salaryto) {
        isValid = false;
        newErrors.salaryto = "Salary To is Required"
        }

        if(!value.taxrate){
        isValid = false;
        newErrors.taxrate = "Tax Rate is Required"
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
            tablename: "MST_BatchCategory",
            column_name: 'id'
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
        { field: 'salaryfrom', headerName: 'From', flex: 2 },
        { field: 'salaryto', headerName: 'To', flex: 2 },
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

            {loading && <Loader />}

            <div class="main-panel" style={{display : loading ? "none" : "block"}}>
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Employee Profession Tax Master</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Salary From<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.salaryfrom} placeholder="Salary From*" name='salaryfeom' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.salaryfrom}</span>}
                                            </div>
                                            
                                            <div class="form-group col-lg-12">
                                            <label for="exampleInputUsername1">Salary To <span className='text-danger'>*</span> </label>
                                            <input type="text" class="form-control" id="exampleInputUsername1"
                                            value={value.salaryto} placeholder="Salary To" name='salaryto' onChange={onhandleChange} />
                                            {<span className='text-danger'> {error.salaryto} </span>}
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Tax Rate<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.taxrate} placeholder="Tax Rate*" name='taxrate' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.taxrate} </span>}
                                             
                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleFormControlSelect1">
                                                    <input type="Checkbox" id="exampleCheckbox" name="exampleCheck" onClick="toggelSelect(_" />Separate Month
                                                </label>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.separatemonth}
                                                placeholder="separatemonth" name='separatemonth' onChange={onhandleChange} disabled>
                                                    <option>Select Months</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Separated Tax Rate</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.separatedtax}
                                                placeholder="Separated Tax Rate" name='separatedtax' onChange={onhandleChange} disabled />
                                            </div>
                                            
                                            <h4 class="text-title"><span class="text-danger">Notes: </span> Select Seperarted month only when there is a 
                                            change in tax rate for any particular month.</h4>
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
                                            <h4 class="card-title">Employee Profession Tax Master</h4>
                                            
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

export default EmployeeProfessionTaxMaster