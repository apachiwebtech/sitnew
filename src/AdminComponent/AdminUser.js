import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import Cookies from 'js-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CryptoJS from 'crypto-js';
import decryptedUserId from '../Utils/UserID';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';
import { StyledDataGrid } from './StyledDataGrid';
const AdminUser = () => {

    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loader, setLoader] = useState(false)
    const [cid, setCid] = useState("")
    const [role, setRoleData] = useState([])
    const [admindata, setData] = useState([])
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });


    async function getAdminuserData() {
        axios.get(`${BASE_URL}/adminuser_data`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAdminuserData()
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
            adminuser_id: id
        }


        axios.post(`${BASE_URL}/adminuser_delete`, data)
            .then((res) => {
                getAdminuserData()

            })

            .catch((err) => {
                console.log(err)
            })
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }


    async function getRole() {
        axios.get(`${BASE_URL}/role_data`)
            .then((res) => {
                setRoleData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getRole()
    }, [])



    const rows = admindata.map((item, index) => {
        return (
            {
                index: index + 1,
                id: item.id,
                username: item.firstname,
                email: item.email
            })

    });

const roledata = {
        role: Cookies.get(`role`),
        pageid: 40
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);



    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])

    const columns = [
        {
            field: 'index',
            headerName: 'ID',
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            flex: 0.5,

        },
        { field: 'username', headerName: 'Name', flex: 1 },
        {
            field: 'email',
            headerName: 'Email',
            flex: 2.5
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        <div>
                            {roleaccess >= 2 && <Link to={`/adminuser/${params.row.id}`}> <EditIcon sx={{ cursor: "pointer" }}  /></Link>}


                            {roleaccess > 3 && <DeleteIcon sx={{ cursor: "pointer" }} style={{ color: "red" }} onClick={() => handleClick(params.row.id)} />}

                        </div>


                    </>
                )
            }
        },
    ];


    

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            {loader && <Loader />}

            {roleaccess > 1 ? <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">


                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">Admin User </h4>
                                            <p class="card-description">
                                                List Of Admin User
                                            </p>
                                        </div>
                                        <div>
                                            <Link to="/adminuser/:userid"><button className='btn btn-success'>Add User +</button></Link>
                                        </div>

                                    </div>

                                    <div class="table-responsive pt-3" style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                            rows={rows}
                                            columns={columns}
                                            disableColumnSelector
                                            disableDensitySelector
                                            pagination
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={setPaginationModel}
                                            pageSizeOptions= {[50]}
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
            </div> : <h1>No Access</h1>}

        </div>

    )
}

export default AdminUser