import React, { useEffect, useState } from 'react'
import { BASE_URL } from './BaseUrl'
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import InnerHeader from './InnerHeader';
import axios from 'axios';
import { Switch } from '@mui/material';
import Loader from './Loader';

const OnlineAdmissions = () => {

    const [loading, setLoading] = useState(true)
    const [onlineAdmissions, setOnlineAdmissions] = useState([])
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
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

    const handleUpdate = () => {
        console.log('hehehe')
    }

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
        { field: 'Student_Name', headerName: 'Student Name', flex: 2 },
        { field: 'Email', headerName: 'Email', flex: 2 },
        { field: 'Present_Mobile', headerName: 'Mobile', flex: 2 },
        { field: 'Batch_Code', headerName: 'Batch Code', flex: 2 },
        { field: 'Admission_Dt', headerName: 'Admission Date', flex: 2 },
        { field: 'Status', headerName: 'Status', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/onlineadmissionform/personalinfo/${params.row.Student_Id}`}><EditIcon style={{ cursor: "pointer" }} /></Link>
                        <Switch {...label} onChange={() => handleswitchchange(params.row.isActive, params.row.id)} defaultChecked={params.row.isActive == 0 ? false : true} color="secondary" />
                    </>
                )
            }
        },
    ];

    const rowsWithIds = onlineAdmissions.map((row, index) => ({ index: index + 1, ...row }));


    return (
        <div className="container-fluid page-body-wrapper col-lg-10">
            
            <InnerHeader />
            {loading && <Loader />}

            <div className="main-pannel" style={{display : loading ? "none" : "block"}}>
                <div className="content-wrapper ">
                    <div className="row">

                        <div className="col-lg-12">
                            {/* <div className="card"> */}
                            <div className="">
                                {/* <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">Online Admission</h4>
                                        </div>
                            

                                    </div> */}

                                <div className="card">
                                    <DataGrid
                                        rows={rowsWithIds}
                                        columns={columns}
                                        // disableColumnFilter
                                        disableColumnSelector
                                        disableDensitySelector
                                        rowHeight={37}
                                        getRowId={(row) => row.Student_Id}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { pageSize: 10, page: 0 },
                                            },
                                        }}
                                        slots={{ toolbar: CustomToolbar }}
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