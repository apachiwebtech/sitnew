import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InnerHeader from './InnerHeader';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from '@mui/icons-material/Print';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import MyDocument1 from "./MyDocument1";
import Loader from "./Loader";
import { BASE_URL } from './BaseUrl';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}

const AdmissionListing = () => {
    const [cid, setCid] = useState("");
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [admission, setadmissionData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/admissiondata`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        setadmissionData(data);
    };

    useEffect(() => {
        getInquiryData();
        setLoading(false);
    }, []);

    const handleClick = (id) => {
        setCid(id);
        setConfirmationVisibleMap(prevMap => ({ ...prevMap, [id]: true }));
    };

    const handleCancel = (id) => {
        setConfirmationVisibleMap(prevMap => ({ ...prevMap, [id]: false }));
    };

    const handleDelete = (id) => {
        const data = {
            delete_id: id,
            tablename: "Admission_master",
            column_name: "Admission_Id"
        };

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then(() => getInquiryData())
            .catch(err => console.log(err));

        setConfirmationVisibleMap(prevMap => ({ ...prevMap, [id]: false }));
    };

    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value === 0 ? 1 : 0;
        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id, table_name: "Admission_master" })
            .then(() => {
                getInquiryData();
                setLoading(false);
            });
    };

    const downloadPDF = async (id) => {
        const blob = await pdf(<MyDocument1 id={id} />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'admission.pdf';
        a.click();
        URL.revokeObjectURL(url);
    };

    const columns = [
        { field: 'index', headerName: 'Id', type: 'number', align: 'center', headerAlign: 'center', flex: 1, filterable: false },
        { field: 'Student_Name', headerName: 'Student Name', flex: 3 },
        { field: 'Course_Name', headerName: 'Course Name', flex: 3 },
        { field: 'Admission_Date', headerName: 'Admission Date', flex: 2 },
        { field: 'Batch_code', headerName: 'Batch Code', flex: 2 },
        { field: 'Payment_Type', headerName: 'Payment Type', flex: 2 },
        { field: 'Amount', headerName: 'Total Fees', flex: 2 },
        { field: 'Status', headerName: 'Status', flex: 2, renderCell: () => <p>Active</p> },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 2,
            renderCell: (params) => (
                <>
                    <Button onClick={() => downloadPDF(params.row.Admission_Id)}>
                        <PrintIcon />
                    </Button>
                    <Link to={`/admission/${params.row.Admission_Id}`}><EditIcon style={{ cursor: "pointer" }} /></Link>
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Admission_Id)} />
                    <Switch
                        onChange={() => handleswitchchange(params.row.isActive, params.row.id)}
                        defaultChecked={params.row.isActive === 0 ? false : true}
                        color="secondary"
                    />
                </>
            )
        },
    ];

    const rowsWithIds = admission.map((row, index) => ({ index: index + 1, ...row }));

    return (
        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            {loading && <Loader />}
            <div className="main-panel" style={{ display: loading ? "none" : "block" }}>
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <h4 className="card-title">List Of Admission</h4>
                                    </div>
                                    <div className="table-responsive">
                                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <DataGrid
                                                rows={rowsWithIds}
                                                columns={columns}
                                                disableColumnSelector
                                                rowHeight={37}
                                                getRowId={(row) => row.Admission_Id}
                                                initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                                                slots={{ toolbar: CustomToolbar }}
                                                slotProps={{ toolbar: { showQuickFilter: true } }}
                                            />
                                        </Box>
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
            </div>
        </div>
    );
};

export default AdmissionListing;
