import React, { useEffect, useState } from 'react'
import { BASE_URL } from './BaseUrl'
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const OnlineAdmissions = () => {

    const [onlineAdmissions, setOnlineAdmissions] = useState([])
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
    }

    useEffect(() => {
        getOnlineAdmissions();
    }, [])
    const handleUpdate = () => {
        console.log('hehehe')
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
        { field: 'Batch_Code', headerName: 'Batch Code', flex: 2 },
        { field: 'Student_Name', headerName: 'Student Name', flex: 2 },
        { field: 'Present_Address', headerName: 'Address', flex: 2 },
        { field: 'Email', headerName: 'Email', flex: 2 },
        { field: 'present_mobile', headerName: 'mobile', flex: 2 },
        { field: 'Qualification', headerName: 'Qualification', flex: 2 },
        { field: 'IsActive', headerName: 'Status', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                    </>
                )
            }
        },
    ];

    const rowsWithIds = onlineAdmissions.map((row, index) => ({ index: index + 1, ...row }));


    return (
        <div className="container-fluid page-body-wrapper col-lg-10">
            <div className="main-pannel">
                <div className="content-wrapper ">
                    <DataGrid
                        rows={rowsWithIds}
                        columns={columns}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        rowHeight={50}
                        getRowId={(row) => row.Present_Mobile}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                        }}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: false,
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default OnlineAdmissions