import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';

const ConsultancyFollowUp = () => {

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
        firstname: '',
        gender: '',
        dob: '',
        mobile: '',
        whatsapp: '',
        email: '',
    })




    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getadmissionactivity`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setInquiryData(data);
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
            tablename: "awt_faculty"
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
            tablename: "Student_Inquiry"
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


    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value == 0 ? 1 : 0

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "Student_Inquiry" })
            .then((res) => {
                console.log(res)
                getInquiryData()
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
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
        { field: 'contactperson', headerName: 'Contact Person', flex: 2 },
        { field: 'designation', headerName: 'Designation', flex: 2 },
        { field: 'mobile', headerName: 'Mobile', flex: 2 },
        { field: 'email', headerName: 'Email', flex: 2 },
        { field: 'purpose', headerName: 'Purpose', flex: 2 },
        { field: 'course', headerName: 'Course', flex: 2 },
        { field: 'directline', headerName: 'Direct Line', flex: 2 },
        { field: 'remarks', headerName: 'Remarks', flex: 2},
        { field: 'addedby', headerName: 'Added By', flex: 2},
        // { field: 'isActive', headerName: 'Options', flex: 2},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 2,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/consultancymaster/${params.row.id}`}><EditIcon style={{ cursor: "pointer" }} /></Link>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                        <Switch {...label} onChange={() => handleswitchchange(params.row.isActive, params.row.id)} defaultChecked={params.row.isActive == 0 ? false : true} color="secondary" />
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
                        <div class="d-flex">

                            <div className='px-2 mx-2'><Link to="/consultancymaster/:consultancymasterid"><h4>Consultancy Details</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/consstudentdetails"><h4>Student Details</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/consultancybranches"><h4>Branches</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/consultancyfollowup"><h4>Follow Up</h4></Link></div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">View Consultancy Info</h4>
                                        </div>
                                        <Link to=''> <button className='btn btn-success'>Add +</button></Link>



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

                                        {confirmationVisibleMap[cid] && (
                                            <div className='confirm-delete'>
                                                <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>Export</button>
                                                <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Print</button>
                                            </div>
                                        )}
                                    </div>

                                    <div className='row p-2 gap-2'>
                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Submit</button>
                                            <button class="btn btn-light">Cancel</button>

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

export default ConsultancyFollowUp