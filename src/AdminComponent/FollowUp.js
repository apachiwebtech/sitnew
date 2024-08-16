import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add"
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Loader from './Loader';
import AddCollegeInfo from './AddCollegeInfo';
import CollegeForm from './CollegeForm';


const FollowUp = () => {


    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const { collegeid } = useParams()




    const [value, setValue] = useState({
        college_name: "" || uid.college_name,
        university: "" || uid.university,
        contact_person: "" || uid.contact_person,
        designation: "" || uid.designation,
        address: "" || uid.address,
        city: "" || uid.city,
        pin: "" || uid.pin,
        state: "" || uid.state,
        country: "" || uid.country,
        telephone: "" || uid.telephone,
        mobile: "" || uid.mobile,
        email: "" || uid.email,
        website: "" || uid.website,
        remark: "" || uid.remark,
        purpose: "" || uid.purpose,
        course: "" || uid.course


    })

    useEffect(() => {
        setValue({

            college_name: uid.college_name,
            university: uid.university,
            contact_person: uid.contact_person,
            designation: uid.designation,
            address: uid.address,
            city: uid.city,
            pin: uid.pin,
            country: uid.country,
            state: uid.state,
            telephone: uid.telephone,
            mobile: uid.mobile,
            email: uid.email,
            website: uid.website,
            remark: uid.remark,
            purpose: uid.purpose,
            course: uid.course


        })
    }, [uid])







    async function getCollegeData() {
        const data = {
            tablename: "awt_college"
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
        getCollegeData()
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

    const handleUpdate = () => {
        const data = {

            u_id: collegeid,
            tablename: "awt_college"

        }
    }

    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    useEffect(() => {
        if (collegeid != ':collegeid')
            handleUpdate()

    }, [collegeid])



    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_college"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getCollegeData()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
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
        { field: 'contact_person', headerName: 'ContactPerson', flex: 2 },
        { field: 'designation', headerName: 'Designation', flex: 2 },
        { field: 'mobile', headerName: 'Mobail', flex: 2 },
        { field: 'email', headerName: 'Email', flex: 2 },
        { field: 'remark', headerName: 'Remark', flex: 2 },
        { filed: 'purpose', headerName: 'Purpose', flex: 2 },
        { field: 'derectline', headerName: 'DerectLine', flex: 2 },
        { field: 'nextdate', headerName: 'Next Date', flex: 2 },
        { filed: 'note', headerName: 'Note', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/collegeinfo/${params.row.id}`}><AddIcon style={{ cursor: "pointer " }} /></Link>
                        <Link to={`/addcollegemaster/${params.row.id}`}><EditIcon style={{ cursor: "pointer" }} /></Link>
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
            <div className='my-2 text-right'>
                <button className='btn btn-success' onClick={() => setOpen(true)}>Add +</button>
            </div>
            <div class="main-panel" style={{ display: loading ? "none" : "block" }}>
                <div class="content-wrapper">

                    <CollegeForm collegeid={{ collegeid }} />
                    <div class="row">


                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        {/* <div>
                                            <h4 class="card-title">Student Details</h4>
                                        </div> */}

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
                                        <AddCollegeInfo open={open} setOpen={setOpen} />
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

export default FollowUp