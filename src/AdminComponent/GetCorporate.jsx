import React, { useEffect, useState } from 'react'
import { BASE_URL } from './BaseUrl'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid,GridToolbar } from '@mui/x-data-grid';

const GetCorporate = () => {

    const [corporate, setCorporate] = useState([])
    const getCorporate = async()=>{
        const response = await fetch(`${BASE_URL}/getCorporate`, {
            method : 'GET', 
            headers : {
                'Content-Type' : 'application/json',
            }
        })

        const data = await response.json();
        setCorporate(data);
        console.log(data);
    }

    useEffect(()=>{
        getCorporate();
    }, [])
    const handleUpdate=()=>{
        console.log('hehehe')
    }
    const handleClick = ()=>{
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
        { field: 'FullName', headerName: 'Inquirer', flex: 2 },
        { field: 'email', headerName: 'Email', flex: 2 },
        { field: 'Course_Name', headerName: 'Course', flex: 2},
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

    const rowsWithIds = corporate.map((row, index) => ({ index: index + 1, ...row }));
    console.log(rowsWithIds);
  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
        <div className="main-pannel">
            <div className="content-wrapper">
            <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={50}
                                            getRowId={(row) => row.Id}
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

export default GetCorporate