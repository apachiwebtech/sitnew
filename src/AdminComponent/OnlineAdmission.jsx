import EditIcon from "@mui/icons-material/Edit";
import { Switch } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';
import { StyledDataGrid } from "./StyledDataGrid";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';


const OnlineAdmissions = () => {

    const [loading, setLoading] = useState(true)
    const [onlineAdmissions, setOnlineAdmissions] = useState([])
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });
    const getOnlineAdmissions = async () => {
        const response = await fetch(`${BASE_URL}/getStudents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json();
        setOnlineAdmissions(data);
        console.log(data);
        setLoading(false)
    }

    useEffect(() => {
        getOnlineAdmissions();
    }, [])


    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value == 0 ? 1 : 0

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "Student_Master" })
            .then((res) => {
                console.log(res)
                getOnlineAdmissions()
                setLoading(false)
            })
    }

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                {/* <GridToolbarExport /> */}
                <GridToolbarFilterButton />
            </GridToolbarContainer>
        );
    }
 const roledata = {
        role: Cookies.get(`role`),
        pageid: 23
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
        flex: 1,
        filterable: false,
    },
    {
        field: 'Student_Name',
        headerName: 'Student Name',
        flex: 2,
        renderCell: (params) => {
            return (
                <>
                    {params.row.Status === 'Closed' ? (
                        <p className='text-danger'>{params.row.Student_Name}</p>
                    ) : params.row.Status === 'Accepted' ? (
                        <p className='text-success'>{params.row.Student_Name}</p>
                    ) : params.row.IsUnread === '1' ? (
                        <p>{params.row.Student_Name}</p>
                    ) : (
                        <p className="fw-bold">{params.row.Student_Name}</p>
                    )}
                </>
            );
        }
    },
    {
        field: 'Email',
        headerName: 'Email',
        flex: 2,
        renderCell: (params) => {
            return (
                <>
                    {params.row.Status === 'Closed' ? (
                        <p className='text-danger'>{params.row.Email}</p>
                    ) : params.row.Status === 'Accepted' ? (
                        <p className='text-success'>{params.row.Email}</p>
                    ) : params.row.IsUnread === '1' ? (
                        <p>{params.row.Email}</p>
                    ) : (
                        <p className="fw-bold">{params.row.Email}</p>
                    )}
                </>
            );
        }
    },
    {
        field: 'Present_Mobile',
        headerName: 'Mobile',
        flex: 2,
        renderCell: (params) => {
            return (
                <>
                    {params.row.Status === 'Closed' ? (
                        <p className='text-danger'>{params.row.Present_Mobile}</p>
                    ) : params.row.Status === 'Accepted' ? (
                        <p className='text-success'>{params.row.Present_Mobile}</p>
                    ) : params.row.IsUnread === '1' ? (
                        <p>{params.row.Present_Mobile}</p>
                    ) : (
                        <p className="fw-bold">{params.row.Present_Mobile}</p>
                    )}
                </>
            );
        }
    },
    {
        field: 'Batch_Code',
        headerName: 'Batch Code',
        flex: 2,
        renderCell: (params) => {
            return (
                <>
                    {params.row.Status === 'Closed' ? (
                        <p className='text-danger'>{params.row.Batch_Code}</p>
                    ) : params.row.Status === 'Accepted' ? (
                        <p className='text-success'>{params.row.Batch_Code}</p>
                    ) : params.row.IsUnread === '1' ? (
                        <p>{params.row.Batch_Code}</p>
                    ) : (
                        <p className="fw-bold">{params.row.Batch_Code}</p>
                    )}
                </>
            );
        }
    },
    {
        field: 'Admission_Dt',
        headerName: 'Admission Date',
        flex: 2,
        renderCell: (params) => {
            const formattedDate = params.row.Admission_Dt
                ? new Date(params.row.Admission_Dt).toISOString().split('T')[0].split('-').reverse().join('-')
                : '';
            return (
                <>
                    {params.row.Status === 'Closed' ? (
                        <p className='text-danger'>{formattedDate}</p>
                    ) : params.row.Status === 'Accepted' ? (
                        <p className='text-success'>{formattedDate}</p>
                    ) : params.row.IsUnread === '1' ? (
                        <p >{formattedDate}</p>
                    ) : (
                        <p className="fw-bold">{formattedDate}</p>
                    )}
                </>
            );
        }
    },
    {
        field: 'Status',
        headerName: 'Status',
        flex: 2,
        renderCell: (params) => {
            return (
                <>
                    {params.row.Status === 'Closed' ? (
                        <p className='text-danger'>{params.row.Status}</p>
                    ) : params.row.Status === 'Accepted' ? (
                        <p className='text-success'>{params.row.Status}</p>
                    ) : params.row.IsUnread === '1' ? (
                        <p>{params.row.Status}</p>
                    ) : (
                        <p className="fw-bold">{params.row.Status}</p>
                    )}
                </>
            );
        }
    },
    ...(roleaccess > 2 ? [{
        field: 'actions',
        type: 'actions',
        headerName: 'Action',
        flex: 1,
        renderCell: (params) => {
            return (
                <>
                    {roleaccess > 2 && (
                        <Link to={`/onlineadmissionform/personalinfo/${params.row.Student_Id}`}>
                            <EditIcon style={{ cursor: "pointer" }} />
                        </Link>
                    )}
                    {roleaccess > 2 && (
                        <Switch
                            {...label}
                            onChange={() => handleswitchchange(params.row.isActive, params.row.id)}
                            defaultChecked={params.row.isActive != 0}
                            color="secondary"
                        />
                    )}
                </>
            );
        }
    }] : [])
];


    const rowsWithIds = onlineAdmissions.map((row, index) => ({ index: index + 1, ...row }));


    return (
        <div className="container-fluid page-body-wrapper ">

            <InnerHeader />
            {loading && <Loader />}

            <div className="main-pannel" style={{ display: loading ? "none" : "block" }}>
                <div className="content-wrapper ">
                    <div className="row">

                        <div className="col-lg-12">
                            {/* <div className="card"> */}
                            <div className="" style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                {/* <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">Online Admission</h4>
                                        </div>
                            

                                    </div> */}

                                <div className="card" style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                    <StyledDataGrid
                                        rows={rowsWithIds}
                                        columns={columns}
                                        // disableColumnFilter
                                        disableColumnSelector
                                        disableDensitySelector
                                        rowHeight={37}
                                        getRowId={(row) => row.Student_Id}
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
                                </div>



                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OnlineAdmissions