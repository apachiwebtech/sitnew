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

const CashVoucher = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({
        studentname: '',
        studentid: '',
        coursename: '',
        batchcode: '',

    })




    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getaddcashvoucherdata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setInquiryData(data);
    }

    const getDiscipline = async () => {
        const response = await fetch(`${BASE_URL}/getDiscipline`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setDescipline(data);
    }
    const getCourse = async () => {
        const response = await fetch(`${BASE_URL}/getCourses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setCourse(data);
    }
    const getEducation = async () => {
        const response = await fetch(`${BASE_URL}/getEducation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setEducation(data);
    }
    const getBatch = async () => {
        const response = await fetch(`${BASE_URL}/getBtach`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setBatch(data);
    }
    const getBtachCategory = async () => {
        const response = await fetch(`${BASE_URL}/getBtachCategory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setbatchCategory(data);
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
            tablename: "awt_addfeesdetails"
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
            tablename: "awt_addfeesdetails"
        }

        axios.post(`${BASE_URL}/delete_inquiry_data`, data)
            .then((res) => {
                getInquiryData()
            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }


 const handleswitchchange = (value,Inquiry_Id) =>{
    const newval = value == 0 ? 1 : 0

    axios.post(`${BASE_URL}/data_status` , {status : newval, Inquiry_Id : Inquiry_Id, table_name : "awt_addfeesdetails"})
    .then((res)=>{
        console.log(res)
        getInquiryData()
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

    
    { field: 'date', headerName: 'Date', flex: 2 },
    { field: 'srno', headerName: 'Cash Id', flex: 2 },
    { field: 'paidto', headerName: 'Employee', flex: 2 },
    { field: 'prepaired', headerName: 'Prepaired By', flex: 2 },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Action',
        flex: 2,
        renderCell: (params) => {
            return (
                <>
                    <Link to={`addcashvoucher/${params.row.id}`}><EditIcon style={{ cursor: "pointer" }}  /></Link>
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                    <Switch {...label} onChange={() => handleswitchchange(params.row.isActive,params.row.id )} defaultChecked={params.row.isActive == 0 ? false : true} color="secondary" />
                </>
            )
        }
    },
];


    const rowsWithIds = inquiryData.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                 
                    <div className="row">
                     
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">View Cash Voucher</h4>
                                        </div>
                                           <Link to='/addcashvoucher/:addcashvoucher'> <button className='btn btn-success'>Add +</button></Link>
                                       

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
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

export default CashVoucher