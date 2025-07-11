import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";
import { Link } from "react-router-dom";
//import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import Cookies from "js-cookie";

const FinalExamListing = () => {

    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

    const [loading, setLoading] = useState(true)
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });
          




    async function getEmployeeData() {
     
        axios.get(`${BASE_URL}/getfinalexam`)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {

        getEmployeeData()

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
            tablename: "Final_exam_master",
            column_name : "Take_Id"
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getEmployeeData()

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
        { field: 'Course_Name', headerName: 'Course Name', flex: 2 },
        { field: 'Batch_code', headerName: 'Batch Code', flex: 2 },
        {
            field: "Test_Dt",
            headerName: "Exam Date",
            flex: 2,
            valueGetter: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if already in DD-MM-YYYY format
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
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/finalexamtaken/${params.row.Take_Id}`}><EditIcon style={{ cursor: "pointer" }}  /></Link>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }}
                         onClick={() => handleClick(params.row.Take_Id)} 
                         />
                    </>
                )
            }
        },
    ];
 const roledata = {
        role: Cookies.get(`role`),
        pageid: 32,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);

    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            {loading && <Loader />}
            <div class="main-panel" style={{display : loading ? "none" : "block"}}>
                <div class="content-wrapper">
                    <div class="row">
                    
                        
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between' style={{ width: "100%", padding: "10px 0" }}>
                                        <div>
                                            <h4 class="card-title">Final Exam Taken</h4>
                                        </div>
                                        {roleaccess > 1 && <Link to='/finalexamtaken/:finalexamtakenid'> <button className='btn btn-success'>Add +</button></Link>}

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Take_Id}
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

export default FinalExamListing;