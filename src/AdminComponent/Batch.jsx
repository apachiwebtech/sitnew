import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import InnerHeader from './InnerHeader';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const CACHE_KEY = 'annulbatch_data'; // Key for localStorage caching
const CACHE_EXPIRY_MS = 1000 * 60 * 15; // Cache expiry time (15 minutes)

const Batch = () => {

    const [annulbatch, setAnnulBatch] = useState([])
    const [cid, setCid] = useState("")
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading , setLoading] = useState(true)


    const getAnnualData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getannualbatch`);
            setAnnulBatch(res.data);
            // Cache data in localStorage
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: res.data,
                timestamp: Date.now()
            }));
            setLoading(false)
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    // Load data when component mounts
    useEffect(() => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            // Check if cache is expired
            if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
                setAnnulBatch(data);
                setLoading(false)
            } else {
                getAnnualData(); // Fetch new data if cache is expired
            }
        } else {
            getAnnualData(); // Fetch data if not cached
        }
    }, []);

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
                setLoading(false)
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
        { field: 'Batch_code', headerName: 'Batch No.', flex: 1 },
        { field: 'Course_Name', headerName: 'Course Name', flex: 3 },
        { field: 'Category', headerName: 'Category', flex: 2 },
        { field: 'Timings', headerName: 'Timings', flex: 2 },
        { field: 'SDate', headerName: 'Planned Start Date', flex: 2 },
        { field: 'EDate', headerName: 'Last Date of Admission', flex: 2 },
        { field: 'Training_Coordinator', headerName: 'Training Coordinator', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/batchedit/batchdetails/${params.row.Batch_Id}`}><EditIcon style={{ cursor: "pointer" }}  /></Link>
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

            {loading && <Loader />}

            <div className="main-panel">

                <div className="content-wrapper" style={{display : loading ? "none" : "block"}}>

                    <div className="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div>
                                            <h4 class="card-title">List of Batch ({annulbatch.length})</h4>
                             
                                        </div>

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

export default Batch;