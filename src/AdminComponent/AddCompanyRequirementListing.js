import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";

const AddCompanyRequirementListing = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    const [inquiryData, setInquiryData] = useState([]);
    const [companyReqData, setCompanyReqData] = useState([])
    const [deleteId, setDeleteId] = useState(null)
    const [value, setValue] = useState({
        companyname: '',
        profile: '',
        location: '',
        eligibilty: '',
        date: '',
        responsibilities: '',
        course: '',
        selected: '',
    })

    useEffect(()=>{
        getCompanyReq()
    },[])

    const getCompanyReq = async()=>{
        try{
            const response = await axios.get(`${BASE_URL}/getCompanyRequirement`)
            setCompanyReqData(response.data)
        }catch(err){
            console.log('/getCompanyRequirement error', err)
        }
    }

    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getadmissionactivity`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setInquiryData(data);
    }

   
    useEffect(() => {
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
            tablename: "awt_faculty"
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


 const handleSwitchChange = async (status ,id) =>{
    try{
        const newStatus = status === 1 ? 0 : 1
        console.log(newStatus)
        await axios.post(`${BASE_URL}/statusPChild`,{
            parentTable: 'Company_Requirements_APK',
            parentColumn: 'CompReqId',
            childTable: 'Company_Req_Batch_details_APK',
            childColumn: 'CompanyReqId',
            id,
            status:newStatus
        })
        getCompanyReq()
        alert('Status updated successfully')
    }catch(err){
        console.log('Error updating status', err)
        alert('Error updating status')
    }
 }

 const handleDelete = async()=>{
    try{
        await axios.post(`${BASE_URL}/deletePChild`,{
            parentTable: 'Company_Requirements_APK',
            parentColumn: 'CompReqId',
            childTable: 'Company_Req_Batch_details_APK',
            childColumn: 'CompanyReqId',
            id: deleteId
        })
        setDeleteId(null)
        getCompanyReq()
        alert('Data deleted successfully')
    }catch(err){
        setDeleteId(null)
        console.log('Error deleting data',err)
        alert('Error deleting data')
    }
  }





 const columns = [
    { field: 'CompanyName', headerName: 'Company Name', flex: 1 },
    { field: 'Profile', headerName: 'Profile', flex: 1 },
    { field: 'Location', headerName: 'Location', flex: 1 },
    { field: 'Eligibility', headerName: 'Eligibility', flex: 1 },
    { field: 'Responsibility', headerName: 'Responsibilities', flex: 1 },
    { field: 'Course_Name', headerName: 'Course', flex: 1 },
    {
        field: 'actions',
        headerName: 'Action',
        flex: 1,
        renderCell: (params) => {
            return (
                <>
                    <Link to={`/companyrequirment/${params.row.CompReqId}`}><EditIcon style={{ cursor: "pointer" }}  /></Link>
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => setDeleteId(params.row.CompReqId)} />
                    <Switch {...label} onChange={() => handleSwitchChange(params.row.IsActive, params.row.CompReqId )} checked={params.row.IsActive === 1} color="secondary" />
                </>
            )
        }
    },
];


    

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
                                            <h4 class="card-title">Company Requirement</h4>
                                        </div>
                                           <Link to='/companyrequirment/:companyrequirmentid'> <button className='btn btn-success'>Add +</button></Link>

                                       

                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "scroll"}}>
                                        <StyledDataGrid
                                            rows={companyReqData}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row) => row.CompReqId}
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

                                        {deleteId && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() =>{ 
                                                    handleDelete()
                                                }} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={()=>setDeleteId(null)} className='btn btn-sm btn-danger'>Cancel</button>
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

export default AddCompanyRequirementListing