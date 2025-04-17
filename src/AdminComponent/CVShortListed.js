import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { useNavigate, Link } from 'react-router-dom';
import Loader from "./Loader";
import { StyledDataGrid } from "./StyledDataGrid";

const CVShortListed = () => {
    const [CVShortlistedList, setCVShortlistedList] = useState([])
    const navigate = useNavigate()
    const [deleteId, setDeleteId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });


    const getCVShortlistedData = async()=>{
        try{
            setLoading(true)
            const response = await axios.get(`${BASE_URL}/cvshortlisted`)
            setCVShortlistedList(response.data)
        }catch(err){
            console.log('Error fetching cv shortlisted data', err)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getCVShortlistedData()
    },[])

    const handleDelete = async () => {
        try {
            await axios.delete(`${BASE_URL}/deleteCVShortlisted/${deleteId}`);
            setDeleteId(null)
            getCVShortlistedData();
            alert('Deleted successfully')
        } catch (error) {
            setDeleteId(null)
            console.error("Error deleting CV Shortlisted data:", error);
            alert("Error deleting data")
        }
    };

    const columns = [
        { field: 'Batch_code', headerName: 'Batch Code', flex:1.6 },
        { field: 'Course_Name', headerName: 'Course Name', flex:3 },
        { field: 'CompanyName', headerName: 'Company Name', flex:3 },
        {
            field: "TDate",
            headerName: "Date",
            flex: 2,
            renderCell: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if already in DD-MM-YYYY format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return params.value; // Return original value if not a valid date
          
              // Convert valid date to DD-MM-YYYY format
              return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
          },
          

        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => {
                            navigate(`/cvshortlisted/${params.row.id}`)
                        }} />
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => setDeleteId(params.row.id)} />
                    </>
                )
            }
        },
    ];



    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            {loading && <Loader />}
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between align-items-center gap-3' style={{borderBottom: "2px solid #dce4ec", width: "100%", padding: "10px 0" }}>
                                        <h4 class="card-title">CV Shortlisted </h4>
                                        <Link to='/cvshortlisted/:cvid' className="btn btn-success">Add +</Link>
                                    </div>
                                    <div>
                                        <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                            <StyledDataGrid
                                                rows={CVShortlistedList}
                                                columns={columns}
                                                // disableColumnFilter
                                                disableColumnSelector
                                                disableDensitySelector
                                                rowHeight={35}
                                                getRowId={(row) => row.id}
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

                                                {deleteId && (
                                                    <div className='confirm-delete'>
                                                        <p>Are you sure you want to delete?</p>
                                                        <button onClick={() => handleDelete()} className='btn btn-sm btn-primary'>OK</button>
                                                        <button onClick={() => setDeleteId(null)} className='btn btn-sm btn-danger'>Cancel</button>
                                                    </div>
                                                )}
                                        </div>
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

export default CVShortListed