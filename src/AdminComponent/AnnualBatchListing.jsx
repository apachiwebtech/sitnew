import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import InnerHeader from './InnerHeader';
import { Link } from 'react-router-dom';

const AnnualBatchListing = () => {

    const [annulbatch, setAnnulBatch] = useState([])
    const [cid, setCid] = useState("")
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [uid, setUid] = useState([])


    async function getAnnualData() {
    
        axios.get(`${BASE_URL}/getannualbatch`)
            .then((res) => {
                console.log(res.data)
                setAnnulBatch(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAnnualData()
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
            delete_id: id,
            tablename: "Batch_Mst",
            column_name: 'Batch_Id'
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getAnnualData()
            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
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
        { field: 'Course_Id', headerName: 'Course Name', flex: 2 },
        { field: 'Batch_code', headerName: 'Batch No.', flex: 2 },
        { field: 'Category', headerName: 'Category', flex: 2 },
        { field: 'Timings', headerName: 'Timings', flex: 2 },
        { field: 'SDate', headerName: 'Planned Start Date', flex: 2 },
        { field: 'SDate', headerName: 'Actual Start Date', flex: 2 },
        { field: 'EDate', headerName: 'Last Date of Admission', flex: 2 },
        { field: 'EDate', headerName: 'Training Completion Date', flex: 2 },
        { field: 'Duration', headerName: 'Duration', flex: 2 },
        { field: 'Training_Coordinator', headerName: 'Training Coordinator', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/annualbatch/${params.row.Batch_Id}`}><EditIcon style={{ cursor: "pointer" }}  /></Link>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Batch_Id)} />
                    </>
                )
            }
        },
    ];


    const rowsWithIds = annulbatch.map((row, index) => ({ index: index + 1, ...row }));

    
    return (
        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">

                    <div className="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div>
                                            <h4 class="card-title">Annual Batch</h4>
                             
                                        </div>
                                        <Link to='/annualbatch/:batch_id'> <button className='btn btn-success'>Add +</button></Link>

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Batch_Id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                            slots={{ toolbar: GridToolbar }}
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
            </div>
        </div>
    )
}

export default AnnualBatchListing;