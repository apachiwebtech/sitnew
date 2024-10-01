import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';


const ProjectMaster = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading, setLoading] = useState(true)


    const [value, setValue] = useState({
        projectno: "" || uid.projectno,
        projectname: "" || uid.projectname,
        description: "" || uid.description,
        quotation: "" || uid.quotation,
        qtndate: "" || uid.qtndate,
        qtnamount: "" || uid.qtnamount,
        wodetails: "" || uid.wodetails,
        wodate: "" || uid.wodate,
        woamount: "" || uid.woamount,
        invoiceno: "" || uid.invoiceno,
        invoicedate: "" || uid.invoicedate,
        invoiamount: "" || uid.invoiamount,

    })

    useEffect(() => {
        setValue({

            projectno: uid.projectno,
            projectname: uid.projectname,
            description: uid.description,
            quotation: uid.quotation,
            qtndate: uid.qtndate,
            qtnamount: uid.qtnamount,
            wodetails: uid.wodetails,
            wodate: uid.wodate,
            woamount: uid.woamount,
            invoiceno: uid.invoiceno,
            invoicedate: uid.invoicedate,
            invoiamount: uid.invoiamount


        })
    }, [uid])

    async function getLibraryData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    async function getLibraryData() {
        const data = {
            tablename: "sit_projectmaster"
        }
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
                setLoading(false)

            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getLibraryData()
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
            tablename: "sit_projectmaster"
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
            tablename: "sit_projectmaster"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getLibraryData()

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

      
            const data = {

                projectno: value.projectno,
                projectname: value.projectname,
                description: value.description,
                quotation: value.quotation,
                qtndate: value.qtndate,
                qtnamount: value.qtnamount,
                wodetails: value.wodetails,
                wodate: value.wodate,
                woamount: value.woamount,
                invoiceno: value.invoiceno,
                invoicedate: value.invoicedate,
                invoiamount: value.invoiamount,
                uid: uid.id
            }


            axios.post(`${BASE_URL}/add_sit_projectmaster`, data)
                .then((res) => {
                    console.log(res)
                    getLibraryData()

                })
                .catch((err) => {
                    console.log(err)
                })
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
        { field: 'projectno', headerName: 'Project No.', flex: 2 },
        { field: 'projectname', headerName: 'Project Name', flex: 2 },
        { field: 'description', headerName: 'Project Description', flex: 2 },
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

                        <div className="col-lg-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 class="card-title">Add Project</h4>
                                    <hr></hr>
                                    <div className='container-fluid'>
                                        <div className='row d-flex justify-content-between'>
                                            <div className='col-md-6 col-lg-6'>
                                                <div className='row justify-content-center' >
                                                    <div className='p-3' style={{ width: "100%" }}>
                                                        <div>
                                                            <h4 className="card-title titleback">Project Details</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-lg-4 ">
                                                                <label for="exampleInputUsername1">Project No:<span className='text-danger'>*</span></label>
                                                                <input type="text" class="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={value.projectno}
                                                                    placeholder="Project No."
                                                                    name='projectno'
                                                                    onChange={onhandleChange} />
                                                                {<span className='text-danger'>{error.projectno}</span>}
                                                            </div>

                                                            <div className="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Project Name</label>
                                                                <input type="text" class="form-control" id="exampleInputUsername1"
                                                                    placeholder="Project Name"
                                                                    value={value.projectname}
                                                                    name='projectname'
                                                                    onChange={onhandleChange} />
                                                            </div>
                                                            <div className="form-group col-lg-4">
                                                                <label for="exampleTextarea1">Description </label>
                                                                <textarea className="form-control" id="exampleTextarea1"
                                                                    value={value.description}
                                                                    placeholder="Description Project"
                                                                    name='description'
                                                                    onChange={onhandleChange}></textarea>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='row justify-content-center' >
                                                    <div className='p-3' style={{ width: "100%" }}>
                                                        <div>
                                                            <h4 className="card-title titleback">Quotation Details</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div class="form-group col-lg-4 ">
                                                                <label for="exampleInputUsername1">Quotation No</label>
                                                                <input type="text" className="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={value.quotation}
                                                                    placeholder="Contact Person"
                                                                    name='quotation'
                                                                    onChange={onhandleChange} />

                                                            </div>

                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Qtn Date</label>
                                                                <input type="date" className="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={value.qtndate}
                                                                    name='qtndate'
                                                                    onChange={onhandleChange} />
                                                            </div>

                                                            <div class="form-group col-lg-4">
                                                                <labael for="exampleInputUsername1">Qtn Amount</labael>
                                                                <input type="text" className="form-control"
                                                                    id="exampleInputUsename1"
                                                                    value={value.qtnamount}
                                                                    placeholder="Qtn Amount"
                                                                    name='qtnamount' />
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                                <div className='row p-2 gap-2'>
                                                    <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                    {/* <button className='col-2'>close</button> */}
                                                </div>
                                            </div>
                                            <div className='col-md-6 col-lg-6'>
                                                <div className='row justify-content-center' >
                                                    <div className='p-3' style={{ width: "100%" }}>
                                                        <div>
                                                            <h4 className="card-title titleback">WorkOrder Details</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">WorkOrder Details</label>
                                                                <input type="text" className="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={value.wodetails}
                                                                    placeholder="WO Details"
                                                                    name='wodetails'
                                                                    onChange={onhandleChange} />

                                                            </div>

                                                            <div className="form-group col-lg-4">
                                                                <label for="exampleInputUsename1">WO Date</label>
                                                                <input type="date" className="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={value.wodate}
                                                                    name="wodate"
                                                                    onChange={onhandleChange} />
                                                            </div>

                                                            <div className="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">WO Amount</label>
                                                                <input type="text" className="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={value.woamount}
                                                                    placeholder="Wo Amount"
                                                                    name="woamount"
                                                                    onChange={onhandleChange} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='row justify-content-center' >
                                                    <div className='p-3' style={{ width: "100%" }}>
                                                        <div>
                                                            <h4 className="card-title titleback">Invoice Details</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Invoice No</label>
                                                                <input type="text" className="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={value.invoiceno}
                                                                    placeholder="Invoice No"
                                                                    name='invoiceno'
                                                                    onChange={onhandleChange} />
                                                            </div>

                                                            <div className="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Invoice Date</label>
                                                                <input type="date" className="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={value.invoicedate}
                                                                    name="invoicedate"
                                                                    onChange={onhandleChange} />
                                                            </div>

                                                            <div class="form-group col-lg-4">
                                                                <label for="exampleInputUsername1">Invoice Amount</label>
                                                                <input type="text" className="form-control"
                                                                    id="exampleInputUsername1"
                                                                    value={value.invoiamount}
                                                                    placeholder="Invoice Amount"
                                                                    name='invoiamount'
                                                                    onChange={onhandleChange} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">View Library Book Details</h4>
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



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default ProjectMaster