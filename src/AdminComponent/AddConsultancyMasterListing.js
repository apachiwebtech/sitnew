import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";

const AddConsultancyMasterListing = () => {
    const [deleteId, setDeleteId] = useState(null)
    const [consultancyData, setConsultancyData] = useState([])
    const navigate = useNavigate()

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    useEffect(() => {
        getConsultancyData();
    }, []);
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });

    
    const getConsultancyData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/consultancy`);
            setConsultancyData(response.data)
        } catch (error) {
            console.error("Error fetching consultancy data:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${BASE_URL}/deleteConsultancy/${deleteId}`);
            setDeleteId(null)
            getConsultancyData();
        } catch (error) {
            setDeleteId(null)
            console.error("Error deleting consultancy data:", error);
        }
    };

    const handleSwitchChange = async (value, Const_Id) => {
        const newStatus = value === 0 ? 1 : 0;
        try {
            await axios.put(`${BASE_URL}/consultancy/status`, { status: newStatus, Const_Id});
            getConsultancyData();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    
    const columns = [
        { field: 'Comp_Name', headerName: 'Consultancy Name', flex: 1 },
        { field: 'Contact_Person', headerName: 'Contact Person', width: 150 },
        { field: 'Designation', headerName: 'Designation', width: 200 },
        { field: 'Address', headerName: 'Address', width: 350 },
        { field: 'City', headerName: 'City', width: 100 },
        { field: 'Tel', headerName: 'Telephone', width: 150 },
        { field: 'EMail', headerName: 'Email', width: 200 },
        {
            field: 'actions',
            headerName: 'Action',
            width:200,
            renderCell: (params) => (
                <>
                    <EditIcon style={{ cursor: "pointer" }} onClick={() =>{navigate(`/consultancymaster/${params.row.Const_Id}`)}} />
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => setDeleteId(params.row.Const_Id)} />
                    <Switch
                        {...label}
                        onChange={() =>
                            handleSwitchChange(params.row.IsActive, params.row.Const_Id)
                         }
                        checked={params.row.IsActive === 1}
                        color="secondary"
                    />
                </>
            )
        },
    ];


    return (
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{borderBottom: "2px solid #dce4ec", width: "100%", padding: "10px 0" }}>
                                        <h4 className="card-title">View Consultancy</h4>
                                        <Link to='/consultancymaster/:consultancymasterid'><button className='btn btn-success'>Add +</button></Link>
                                    </div>
                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                            rows={consultancyData}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row) => row.Const_Id}
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
                                            slotProps={{
                                              toolbar: {
                                                showQuickFilter: true,
                                              },
                                            }}
                                        />

                                        {deleteId && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() =>{ 
                                                    handleDelete()
                                                }} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={()=>setDeleteId(null)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                    </div>               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddConsultancyMasterListing;
