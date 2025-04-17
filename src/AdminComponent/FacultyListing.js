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



const FacultyListing = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [faculty_masterdata, setfaculty_masterdata] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });
    const [value, setValue] = useState({
        Faculty_Name: '',
        Faculty_Code: '',
        DOB: '',
        Nationality: '',
        discipline: '',
        status: '',
        invoicename: '',
        Married: '',
        joiningdate: '',
        Faculty_Type: '',
        software: '',
        training: '',
        Present_Address: '',
        Permanent_City: '',
        Present_Pin: '',
        Present_State: '',
        Present_Country: '',
        Mobile: '',
        EMail: '',
        Permanent_Address: '',
        Permanent_City: '',
        Permanent_Pin: '',
        Permanent_State: '',
        Permanent_Country: '',
        Permanent_Tel: '',

    })




    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getfaculty_masterdata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        

        setfaculty_masterdata(data);
       
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
            tablename: "faculty_master"

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
            cat_id: id,
            tablename: "faculty_master"
        }

        axios.post(`${BASE_URL}/delete_faculty_data`, data)
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

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "faculty_master" })
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
            flex: 0.8,
            filterable: false,

        },
        { field: 'Faculty_Name', headerName: 'Faculty Name', flex: 4 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 0.8,
            renderCell: (params) => {
                return (
                    <>
                    <Link to={`/faculty/${params.row.Faculty_Id}`}><EditIcon style={{cursor: "pointer"}} /></Link>
                        {/* <EditIcon style={{ cursor: "pointer" }} Link={() => handleUpdate(params.row.id)} /> */}
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} Link={() => handleClick(params.row.Faculty_Id)} />
                    </>
                )
            }
        },
    ];



    const rowsWithIds = faculty_masterdata.map((row, index) => ({ index: index + 1, ...row }));

   

    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
           
            <div className="main-panel">

                <div className="content-wrapper">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0",borderBottom: "2px solid #dce4ec", }}>
                                        <div >
                                            <h4 class="card-title">View  Final Result</h4>
                                        </div>
                                        <Link to='/faculty/:facultyid'> <button className='btn btn-success'>Add +</button></Link>


                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Faculty_Id}
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

export default FacultyListing