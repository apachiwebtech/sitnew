import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';

const PurchaseMaterial = () => {


    const [date, setDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = currentDate.getDate();
        day = day < 10 ? '0' + day : day;
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    }, []);


    const [brand, setBrand] = useState([])
    const [purchasematerialdata, setPurchaseMaterialData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const [value, setValue] = useState({

        company: "" || uid.company,
        item: "" || uid.item,
        date: "" || uid.date,
        purchase: "" || uid.purchase,
        vendor: "" || uid.vendor,
        voucherno: "" || uid.voucherno,
        purpose: "" || uid.purchase,
        requireddate: "" || uid.requireddate,
        price: "" || uid.price,
        quantity: "" || uid.quantity,
        totalamt: "" || uid.totalamt,

    })

    useEffect(() => {
        setValue({
            company: uid.company,
            item: uid.item,
            date: uid.date,
            purchase: uid.purchase,
            vendor: uid.vendor,
            voucherno: uid.voucherno,
            purpose: uid.purchase,
            requireddate: uid.requireddate,
            price: uid.price,
            quantity: uid.quantity,
            totalamt: uid.totalamt,

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.item) {
        isValid = false;
        newErrors.item = "Item is Required"
       }
        if (!value.date) {
            isValid = false;
            newErrors.date = "Date is Required"
        }
        if (!value.requireddate) {
            isValid = false;
            newErrors.requireddate = "Date is Required"
        }
        if(!value.price) {
            isValid = false;
            newErrors.price = "Price is Required"
        }
        if(!value.quantity) {
            isValid = false;
            newErrors.quantity = "Quantity is Required"
        }
        setError(newErrors)
        return isValid
    }


    async function getPurchaseMaterial() {

        axios.post(`${BASE_URL}/purchasematerial_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }





    useEffect(() => {
   
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
        const data = {
            u_id: id,
            tablename: "awt_employeetrainingplan"
        }
        axios.post(`${BASE_URL}/update_data`, data)
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
            cat_id: id,
            tablename: "awt_employeetrainingplan"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
          

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

                company: value.company,
                item: value.item,
                date: value.date,
                purchase: value.purchase,
                vendor: value.vendor,
                voucherno: value.voucherno,
                purpose: value.purchase,
                requireddate: value.requireddate,
                price: value.price,
                quantity: value.quantity,
                totalamt: value.totalamt,
            }


            axios.post(`${BASE_URL}/awt_employeetrainingplan`, data)
                .then((res) => {
                    console.log(res)
              

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
        { field: 'subject', headerName: 'Company', flex: 2 },
        { field: 'internal', headerName: 'Item', flex: 2 },
        { field: 'identified', headerName: 'Identified', flex: 2 },
        { field: 'date', headerName: 'Purchase Date', flex: 2},
        { field: 'vendor', headerName: 'Vender', flex: 2},
        { field: 'purchase', headerName: 'Who Purchased', flex: 2},
        { field: 'voucharno', headerName: 'Vouchar No.'},
        { field: 'price', headerName: 'Price', flex: 2},
        { field: 'quantity', headerName: 'Quantity', flex: 2},
        { field: 'totalamt', headerName: 'Total Amt', flex: 2},


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


    const rowsWithIds = purchasematerialdata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Employee Training Plan</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-2">
                                                <lable class="exampleFormControlSelect1">Company</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.company} name='company' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <lable class="exampleFormControlSelect1">Item<span className="text-danger">*</span></lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.item} name='item' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                                {<span className='text-danger'> {error.item} </span>}
                                            </div>

                                            <div className="form-group col-lg-2">
                                                <label htmlFor="exampleInputUsername1">Purchase Date <span className="text-danger">*</span></label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    value={date}
                                                    name="date"
                                                    onChange={(e) => { }}
                                                    disabled
                                                />
                                                {<span className='text-danger'> {error.date} </span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label class="exampleFormControlSelect1">Who Purchase</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.purchase} name='purchase' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label class="exampleFormControlSelect1">Vendor Name</label>
                                                <select class="form-control form-control-lg" id="exampleFormCorntrolSelect1"
                                                    value={value.vendor} name='vendor' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Voucher No</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.voucherno} placeholder="Voucher No" name='voucherno' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable class="exampleFormControlSelect1">Purpose</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.purpose} name='purpose' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Required Date<span className="text-danger">*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1"
                                                    value={value.requireddate} placeholder="Required Date" name='requireddate' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.requireddate} </span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Price<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.price} placeholder="price" name='price' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.price} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Quantity<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.quantity} placeholder="Quantity" name='quantity' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.quantity} </span>}
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Total Amt</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.totalamt} placeholder="Total Amt" name='totalamt' onChange={onhandleChange} />

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
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Employee Training Plan</h4>
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

                                    {/* <button type="submit" class="btn btn-primary mr-2">Excel</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Back</button> */}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default PurchaseMaterial
