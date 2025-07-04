import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";
import { StyledDataGrid } from "./StyledDataGrid";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            {/* <GridToolbarExport /> */}
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}

const InquiryCorporate = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });


    async function getlisting() {
        axios.post(`${BASE_URL}/getcorporateinquiry`)
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
    }




    const [value, setValue] = useState({
        firstname: '',
        gender: '',
        dob: '',
        mobile: '',
        whatsapp: '',
        email: '',
        nationality: '',
        discussion: '',
        country: '',
        InquiryDate: '',
        modeEnquiry: '',
        advert: '',
        programmeEnquired: '',
        selectedProgramme: '',
        category: '',
        batch: '',
        qualification: '',
        descipline: '',
        percentage: '',
    })


    useEffect(() => {

        getlisting()
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
            tablename: "Corporate_Inquiry"
        }

        axios.post(`${BASE_URL}/delete_corporate_data`, data)
            .then((res) => {
                getlisting()
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

        axios.post(`${BASE_URL}/data_status`, { status: newval, Id: Inquiry_Id, table_name: "Corporate_Inquiry" })
            .then((res) => {
                console.log(res)
                setLoading(false)

            })
    }


    const roledata = {
        role: Cookies.get(`role`),
        pageid: 26
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])



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
        { field: 'FullName', headerName: 'Inquirer', flex: 1.5 },
        { field: 'Course_Id', headerName: 'Course', flex: 1.5 },
        { field: 'Email', headerName: 'Email', flex: 1.5 },

        ...(roleaccess > 2 ? [{
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess >= 2 && (<Link to={`/inquirycorporate/${params.row.Id}`} ><EditIcon style={{ cursor: "pointer" }} /></Link>)}
                        {roleaccess > 3 && (<DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Id)} />)}
                        {roleaccess >= 2 && (<Switch {...label} onChange={() => handleswitchchange(params.row.isActive, params.row.id)} defaultChecked={params.row.isActive == 0 ? false : true} color="secondary" />)}
                    </>
                )
            }
        },] : [])
    ];



    const rowsWithIds = data.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            {loading && <Loader />}
            <div className="main-panel" style={{ display: loading ? "none" : "block" }} >

                <div className="content-wrapper">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ borderBottom: "2px solid #dce4ec", width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">List Of Corporate Inquiry</h4>
                                        </div>
                                        {/* <Link to='/inquiry/:inquiryid'> <button className='btn btn-success'>Add +</button></Link> */}
                                        {roleaccess > 1 && <Link to="/inquirycorporate/:inquiryid">
                                            {" "}
                                            <button className="btn btn-success">Add +</button>
                                        </Link>}


                                    </div>

                                    <div style={{ borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden" }}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row) => row.Id}
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

export default InquiryCorporate