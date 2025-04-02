import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";
import { StyledDataGrid } from "./StyledDataGrid";
//import AssignmentsTaken from "./AssignmentsTaken";

const UnitTestTakenListing = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [loading, setLoading] = useState(true)
    const [unittesttakendata, setunittakendata] = useState([]);
    const [value, setValue] = useState({
        batchcode: ' ',
        coursename: ' ',
        utname: ' ',
        utdate: ' ',
        marks: ' ',
        duration: ' ',

    })




    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getunittesttakendata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setLoading(false)

        setunittakendata(data);
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
            delete_id: id,
            tablename: "Test_taken_master",
            column_name : "Take_Id"
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
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

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "awt_unittesttaken" })
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
            flex: 0.5,
            filterable: false,

        },
        { field: 'Batch_code', headerName: 'Batch Code', flex: 1 },
        { field: 'Course_Name', headerName: 'Course Name', flex: 1 },
        { field: 'subject', headerName: 'Test Name', flex: 1 },
        {
            field: "Test_Dt",
            headerName: "Date",
            flex: 1,
            valueGetter: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if the date is already in DD-MM-YYYY format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return ""; // Handle invalid dates
          
              // Convert to DD-MM-YYYY format
              return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
          },
          
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                       <Link to={`/unittesttaken/${params.row.Take_Id}`}> <EditIcon style={{ cursor: "pointer" }} /></Link>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Take_Id)} />
                    </>
                )
            }
        },
    ];



    const rowsWithIds = unittesttakendata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            {loading && <Loader />}
            <div className="main-panel" style={{display : loading ? "none" : "block"}} >

                <div className="content-wrapper">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{borderBottom: "2px solid #dce4ec", width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">Unit Test Taken</h4>
                                        </div>
                                        <Link to='/unittesttaken/:unittesttakenid'> <button className='btn btn-success'>Add +</button></Link>


                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "scroll"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Take_Id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 50, page: 0 },
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

export default UnitTestTakenListing