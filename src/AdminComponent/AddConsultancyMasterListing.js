import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';

const AddConsultancyMasterListing = () => {
    const [inquiryData, setInquiryData] = useState([]);
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(null); // Track the current row for editing

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    // Fetch inquiry data on mount
    useEffect(() => {
        getInquiryData();
    }, []);

    const getInquiryData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getadmissionactivity`);
            setInquiryData(response.data);
        } catch (error) {
            console.error("Error fetching inquiry data:", error);
        }
    };

    const openEditModal = (row) => {
        setCurrentRow(row);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setCurrentRow(null);
    };

    const handleEditChange = (e) => {
        setCurrentRow({ ...currentRow, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.post(`${BASE_URL}/update_data`, {
                ...currentRow,
                tablename: "Student_Inquiry"
            });
            setEditModalOpen(false);
            getInquiryData();
        } catch (error) {
            console.error("Error updating inquiry data:", error);
        }
    };

    const handleClick = (id) => {
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };

    const handleCancel = (id) => {
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${BASE_URL}/delete_inquiry_data`, {
                cat_id: id,
                tablename: "Student_Inquiry"
            });
            setConfirmationVisibleMap((prevMap) => ({
                ...prevMap,
                [id]: false,
            }));
            getInquiryData();
        } catch (error) {
            console.error("Error deleting inquiry data:", error);
        }
    };

    const handleSwitchChange = async (value, Inquiry_Id) => {
        const newStatus = value === 0 ? 1 : 0;
        try {
            await axios.post(`${BASE_URL}/data_status`, { status: newStatus, Inquiry_Id, table_name: "Student_Inquiry" });
            getInquiryData();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const columns = [
        { field: 'index', headerName: 'Id', type: 'number', align: 'center', headerAlign: 'center', flex: 1, filterable: false },
        { field: 'FName', headerName: 'Student Name', flex: 2 },
        { field: 'course', headerName: 'Course Name', flex: 2 },
        { field: 'inquiry_DT', headerName: 'Inquiry Date', flex: 2 },
        { field: 'discussion', headerName: 'Discuss', flex: 2 },
        { field: 'present_mobile', headerName: 'Mobile', flex: 2 },
        { field: 'Email', headerName: 'Email', flex: 2 },
        { field: 'Discipline', headerName: 'Discipline', flex: 2 },
        { field: 'Inquiry_type', headerName: 'Inquiry Type', flex: 2 },
        {
            field: 'actions',
            headerName: 'Action',
            flex: 2,
            renderCell: (params) => (
                <>
                    <EditIcon style={{ cursor: "pointer" }} onClick={() => openEditModal(params.row)} />
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                    <Switch
                        {...label}
                        onChange={() => handleSwitchChange(params.row.isActive, params.row.id)}
                        checked={params.row.isActive === 1}
                        color="secondary"
                    />
                </>
            )
        },
    ];

    const rowsWithIds = inquiryData.map((row, index) => ({ index: index + 1, ...row }));

    return (
        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <h4 className="card-title">View Consultancy</h4>
                                        <Link to='/consultancymaster/:consultancymasterid'><button className='btn btn-success'>Add +</button></Link>
                                    </div>

                                    <DataGrid
                                        rows={rowsWithIds}
                                        columns={columns}
                                        disableColumnFilter
                                        disableColumnSelector
                                        disableDensitySelector
                                        rowHeight={37}
                                        getRowId={(row) => row.id}
                                        initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                                        slots={{ toolbar: GridToolbar }}
                                        slotProps={{ toolbar: { showQuickFilter: true } }}
                                    />

                                    {confirmationVisibleMap[currentRow?.id] && (
                                        <div className='confirm-delete'>
                                            <p>Are you sure you want to delete?</p>
                                            <button onClick={() => handleDelete(currentRow.id)} className='btn btn-sm btn-primary'>OK</button>
                                            <button onClick={() => handleCancel(currentRow.id)} className='btn btn-sm btn-danger'>Cancel</button>
                                        </div>
                                    )}

                                   
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
