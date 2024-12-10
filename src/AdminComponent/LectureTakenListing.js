import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";
import { StyledDataGrid } from "./StyledDataGrid";

const LectureTakenListing = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [lecturetakendata, setlecturetakendata] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0); // Current page
    const [pageSize, setPageSize] = useState(10); // Number of records per page
    const [lastStudentId, setLastStudentId] = useState(null);




    const getLectureTakenData = async () => {
        setLoading(true); // Set loading to true before the request

        const data = {
            page: page,
            pageSize: pageSize
        };

        try {
            const response = await fetch(`${BASE_URL}/getlecturetakendata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Serialize the data to JSON
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const newdata = await response.json();
            setlecturetakendata(newdata.data);
            setLastStudentId(newdata.lastTakeId);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Ensure loading is set to false after the request
        }
    };



    useEffect(() => {
        // getLectureTakenData()
        setError({})
        setUid([])
    }, [])

    useEffect(() => {
        getLectureTakenData(page, pageSize);
    }, [page, pageSize]);

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
            tablename: "lecture_taken_master",
            column_name: 'Take_Id'
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getLectureTakenData()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }


    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value == 0 ? 1 : 0

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "awt_lecturetaken" })
            .then((res) => {
                console.log(res)
                getLectureTakenData()
                setLoading(false)
            })
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
        { field: 'Topic', headerName: 'Lecture', flex: 2 },
        { field: 'Take_Dt', headerName: 'Date', flex: 2 },
        { field: 'Batch_Id', headerName: 'Batch Code', flex: 2 },
        { field: 'Topic', headerName: 'Topic', flex: 2 },
        { field: 'Faculty_Id', headerName: 'Faculty Name', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 2,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/lecturetaken/${params.row.Take_Id}`} ><EditIcon style={{ cursor: "pointer" }} /></Link>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Take_Id)} />
                        {/* <Switch {...label} onChange={() => handleswitchchange(params.row.isActive, params.row.id)} defaultChecked={params.row.isActive == 0 ? false : true} color="secondary" /> */}
                    </>
                )
            }
        },
    ];


    const rowsWithIds = lecturetakendata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />

            {loading && <Loader />}

            <div className="main-panel" style={{ display: loading ? "nonr" : "Block" }}>

                <div className="content-wrapper">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">Add Lecture Details</h4>
                                        </div>
                                        <Link to='/lecturetaken/:lecturetakenid'> <button className='btn btn-success'>Add +</button></Link>


                                    </div>

                                    <div>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            pageSize={pageSize}
                                            page={page}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row, index) => row.Take_Id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                        // slots={{ toolbar: GridToolbar }}
                                        // slotProps={{
                                        //     toolbar: {
                                        //         showQuickFilter: true,
                                        //     },
                                        // }}
                                        />

                                        <div className='float-right py-2'>
                                            <button
                                                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                                disabled={page === 0} // Disable the "Previous" button on the first page
                                            >
                                                Previous
                                            </button>

                                            <span>Page {page + 1}</span>

                                            <button
                                                onClick={() => setPage((prev) => prev + 1)}
                                                disabled={!lastStudentId} // Disable the "Next" button if there is no lastStudentId (i.e., no data)
                                            >
                                                Next
                                            </button>
                                        </div>


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
            </div >
        </div >

    )
}

export default LectureTakenListing