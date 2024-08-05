import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';

const EmailMasterListing = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    const [assignmentstakendata, setassignmentstakendata] = useState ([]);

    const [value, setValue] = useState({
        emailpurpose: ' ',
        department: ' ',
        emailsubject: ' ',
        cc: ' ',
        bcc: ' ',
        specification: ' ',

    })




    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getassignmentstakendata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setassignmentstakendata(data);
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


    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "assignmentstaken"
        }

        axios.post(`${BASE_URL}/delete_assignmentstaken_data`, data)
            .then((res) => {
                getInquiryData()
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

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "assignmentstaken" })
            .then((res) => {
                console.log(res)
                getInquiryData()
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
        { field: 'Course_Name', headerName: 'Course Name', flex: 2 },
        { field: 'Batch_code', headerName: 'Batch Code', flex: 2 },
        { field: 'Assign_Dt', headerName: 'Assignment Name', flex: 2 },
        { field: 'Return_Dt', headerName: 'Assignment Date', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/assignmentstaken/${params.row.Given_Id}`} ><EditIcon style={{ cursor: "pointer" }}  /></Link>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} Link={() => handleClick(params.row.Given_Id)} />
                    </>
                )
            }
        },
    ];



    const rowsWithIds = assignmentstakendata.map((row, index) => ({ index: index + 1, ...row }));

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
                                        <div >
                                            <h4 class="card-title">Email Details</h4>
                                        </div>
                                        <Link to='/emailmaster/:emailmaster'> <button className='btn btn-success'>Add +</button></Link>


                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Given_Id}
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

export default EmailMasterListing