import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import AssignmentsTaken from "./AssignmentsTaken";
import GenerateResult from "./GenerateResult";
import Loader from "./Loader";
import toast, { Toaster } from 'react-hot-toast';



const GenerateResultListing = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [generateresultdata, setgenerateresultdata] = useState([]);
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState({
        course: '',
        batch: '',
        returndate: '',
        printdate: '',
        prepared: '',
        checked: '',
        approved: '',
        startdate: '',
        enddate: '',

    })

   


    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/generateresultdata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setLoading(false)

        setgenerateresultdata(data);
       
    }


    useEffect(() => {
        getInquiryData()

        value.title = ""
        setError({})
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

    const handleUpdate = (id) => {
        const data = {
            u_id: id,
            tablename: "awt_generateresult"

        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            delete_id: id,
            tablename: "generate_final_result",
            column_name: "Id"
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getInquiryData()
                toast.success('Deleted', {
                    position: "bottom-center"
                  })
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

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "awt_generateresult" })
            .then((res) => {
                console.log(res)
                getInquiryData()
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
        { field: 'Batch_code', headerName: 'Batch Code', flex: 2 },
        { field: 'Course_Name', headerName: 'Course Name', flex: 2 },
        { field: 'Result_date', headerName: 'Result Date', flex: 2 },
        { field: 'Faculty_Name', headerName: 'Approved By', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/generateresult/${params.row.Id}`} > <EditIcon style={{ cursor: "pointer" }}  /></Link>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Id)} />
                    </>
                )
            }
        },
    ];



    const rowsWithIds = generateresultdata.map((row, index) => ({ index: index + 1, ...row }));

   

    return (

        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <Toaster />
            {loading && <Loader />}
            <div className="main-panel" style={{display : loading ? "none" : "block"}} >

                <div className="content-wrapper">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">View  Final Result</h4>
                                        </div>
                                        <Link to='/generateresult/:generateresultid'> <button className='btn btn-success'>Add +</button></Link>


                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Id}
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
            </div >
        </div >

    )
}

export default GenerateResultListing