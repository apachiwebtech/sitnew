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
        from_sal: "" || uid.from_sal,
        to_sal: "" || uid.to_sal,
        tax_price: "" || uid.tax_price,
        sep_mnth: "" || uid.sep_mnth,
        sep_tax_price: "" || uid.sep_tax_price,

    })

    useEffect(() => {
        setValue({
            batchcat: uid.from_sal,
            batchtype: uid.to_sal,
            prefix: uid.tax_price,
            description: uid.sep_mnth,
            fcjebgdjcb: uid.sep_tax_price,
        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.from_sal) {
            isValid = false;
            newErrors.from_sal = "Salary From is Required"
        }

        if (!value.to_sal) {
            isValid = false;
            newErrors.to_sal = "Salary To is Required"
        }

        if (!value.tax_price) {
            isValid = false;
            newErrors.tax_price = "Tax Rate is Required"
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
            from_sal: '',
            to_sal: '',
            tax_price: '',
            sep_mnth: '',
            sep_tax_price: '',
        })
        const data = {
            u_id: id,
            uidname: "id",
            tablename: "sit_eptaxmaster"
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
            tablename: "sit_eptaxmaster",
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
                from_sal: value.from_sal,
                to_sal: value.to_sal,
                tax_price: value.tax_price,
                sep_mnth: value.sep_mnth,
                sep_tax_price: value.sep_tax_price,
                uid: uid.id
            }


            axios.post(`${BASE_URL}/add_sit_eptaxmaster`, data)
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

    const months = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' }

    ];





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
        { field: 'from_sal', headerName: 'From', flex: 2 },
        { field: 'to_sal', headerName: 'To', flex: 2 },
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

            <div class="main-panel" style={{ display: loading ? "none" : "block" }}>
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
                                                    value={value.from_sal} placeholder="Salary From*" name='from_sal' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.from_sal}</span>}
                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Salary To <span className='text-danger'>*</span> </label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.to_sal} placeholder="Salary To" name='to_sal' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.to_sal} </span>}
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Tax Rate<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.tax_price} placeholder="Tax Rate*" name='tax_price' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.tax_price} </span>}

                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label htmlfor="exampleFormControlSelect1">Separate Month</label>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.sep_mnth}
                                                    name='sep_mnth' onChange={onhandleChange}>
                                                    <option value="">Select Months</option>
                                                    {months.map((month) => (
                                                        <option key={month.value} value={month.value}>
                                                            {month.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Separated Tax Rate</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.sep_tax_price}
                                                    placeholder="Separated Tax Rate" name='sep_tax_price' onChange={onhandleChange} />
                                            </div>

                                            <h6 class="text-title"><span class="text-danger">Notes: </span> Select Seperarted month only when there is a
                                                change in tax rate for any particular month.</h6>
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