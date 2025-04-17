import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import AddCashVoucher from "./AddCashVoucher";
import { StyledDataGrid } from "./StyledDataGrid";
import PrintIcon from '@mui/icons-material/Print';
import { Voucher } from "./Document/Voucher";
import { pdf } from "@react-pdf/renderer";
import { data } from "jquery";

const CashVoucher = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [voucherdata, setVoucherData] = useState([])

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });


    async function getCashVoucher(params) {

        axios.get(`${BASE_URL}/getCashVoucher`)
            .then((res) => {
                setVoucherData(res.data)
            })
    }


    useEffect(() => {
        getCashVoucher()
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
            tablename: "awt_cashvoucher"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                alert("Deleted")
                getCashVoucher()
            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }


    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value == 0 ? 1 : 0

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "awt_addfeesdetails" })
            .then((res) => {
                console.log(res)

            })
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


        {
            field: "date",
            headerName: "Date",
            flex: 2,
            renderCell: (params) => {
                if (!params.value) return ""; // Handle empty values

                // Check if already in DD-MM-YYYY format
                const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
                if (ddmmyyyyRegex.test(params.value)) {
                    return params.value; // Return as-is if already formatted
                }

                const date = new Date(params.value);
                if (isNaN(date.getTime())) return ""; // Handle invalid dates

                // Convert to DD-MM-YYYY format
                return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
        },

        { field: 'voucherno', headerName: 'Cash Id', flex: 2 },
        { field: 'paidto', headerName: 'Employee', flex: 2 },
        { field: 'prepaired_by', headerName: 'Prepaired By', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 2,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/cashvoucher/${params.row.id}`}><EditIcon style={{ cursor: "pointer" }} /></Link>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                        {/* <Switch {...label} onChange={() => handleswitchchange(params.row.isActive, params.row.id)} defaultChecked={params.row.isActive == 0 ? false : true} color="secondary" /> */}
                        <PrintIcon style={{ color: "blue", cursor: "pointer" }} onClick={() => printReceipt(params.row)} />
                    </>
                )
            }
        },
    ];


    const rowsWithIds = voucherdata.map((row, index) => ({ index: index + 1, ...row }));



    const printReceipt = async (data) => {

        const payload = {
            u_id: data.id,
            tablename: "awt_cashvoucherchild",
            uidname: "voucherid"
        }

        axios.post(`${BASE_URL}/new_update_data`, payload)
            .then((res) => {
                if(data && res.data.length > 0){
                    printpdf(data , res.data)
                }
                else{
                    alert("Please add Data")
                }
            })

    };

    const printpdf = async (data , pdfdata)  =>{
   
        const blob = await pdf(<Voucher data={data} pdfdata={pdfdata} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    }



    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0", borderBottom: "2px solid #dce4ec", }}>
                                        <div >
                                            <h4 class="card-title">View Cash Voucher</h4>
                                        </div>
                                        <Link to='/cashvoucher/:voucherid'> <button className='btn btn-success'>Add +</button></Link>


                                    </div>

                                    <div style={{ borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden" }}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row) => row.id}
                                            pagination
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={setPaginationModel}
                                            pageSizeOptions={[50]}
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
                                    </div>
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
            </div >
        </div >

    )
}

export default CashVoucher