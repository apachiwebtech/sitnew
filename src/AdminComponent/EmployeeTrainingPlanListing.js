import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";
//import AssignmentsTaken from "./AssignmentsTaken";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import Cookies from "js-cookie";


const EmployeeTrainingPlanListing = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [employeerecorddata, setemployeerecorddata] = useState([]);
    const [employeetrainingplandata, setemployeetrainingplandata] = useState([]);
    const [value, setValue] = useState({
            subject: '',
            internal: '',
            identified: '',
            date: '',

    })
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });
          




    const getInquiryData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/employee_training_plan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    // Map to match DataGrid expectations
    setemployeerecorddata(
      data.map((item, index) => ({
        id: index + 1,
        Training_Id : item.Training_Id,
        subject: item.Subject,
        internal: item.Inernal_By,
        identified: item.Identified_By,
        date: item.Date_Added
      }))
    );
  } catch (error) {
    console.error("Failed to fetch employee training plan:", error);
  }
};



    useEffect(() => {
        getInquiryData()

        value.title = ""
        setError({})
        setUid([])
    }, [])

    const handleClick = (Training_Id) => {
        setCid(Training_Id)
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [Training_Id]: true,
        }));
    };

    const handleCancel = (Training_Id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [Training_Id]: false,
        }));
    };

    const handleUpdate = (id) => {
        const data = {
            u_id: id,
            tablename: "awt_employeeplan"

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

    const handleDelete = (Training_Id) => {
        const data = {
            cat_id: Training_Id,
            tablename: "Office_Employee_Annual_Training",
            // column_name:"Training_Id"
            
        }

        axios.post(`${BASE_URL}/delete_employeedata`, data)
            .then((res) => {
                getInquiryData()
            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [Training_Id]: false,
        }));
    }


    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value == 0 ? 1 : 0

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "awt_employeeplan" })
            .then((res) => {
                console.log(res)
                getInquiryData()
            })
    }



const roledata = {
        role: Cookies.get(`role`),
        pageid: 42,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);


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
        { field: 'subject', headerName: 'Subject', flex: 1.5 },
        { field: 'internal', headerName: 'Internal', flex: 1.5 },
        { field: 'identified', headerName: 'Identified', flex: 1.5 },
        {
            field: "date",
            headerName: "Date",
            flex: 1.5,
            renderCell: (params) => {
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
                        {roleaccess > 2 && <Link to={`/employeetrainingplan/${params.row.Training_Id}`}><EditIcon style={{cursor: "pointer"}} /></Link>}
                        {/* <EditIcon style={{ cursor: "pointer" }} Link={() => handleUpdate(params.row.id)} /> */}
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick  ={() => handleClick(params.row.Training_Id)} />}
                    </>
                )
            }
        },
    ];



    const rowsWithIds = employeerecorddata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{borderBottom: "2px solid #dce4ec", width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">Employee Training Plan</h4>
                                        </div>
                                        {roleaccess > 1 && <Link to='/employeetrainingplan/:employeetrainingplanid'> <button className='btn btn-success'>Add +</button></Link>}


                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row, index) => row.id}
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

export default EmployeeTrainingPlanListing