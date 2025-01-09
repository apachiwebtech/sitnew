import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import ConsultancyFollowUpForm from "./ConsultancyFollowUpForm";
import Modal from '@mui/material/Modal';

const ConsultancyFollowUp = () => {
    const [searchParams] = useSearchParams()
    const Const_Id = parseInt(searchParams.get('Const_Id'))
    const [followUpData, setFollowUpData] = useState([])
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false)
    const initialState = {
        Consultant_Id: Const_Id,
        CName: "",
        Phone: "",
        Email: "",
        Designation: "",
        Purpose: "",
        Remark: "",
        Tdate: "",
        Course: "",
        nextdate: "",
        DirectLine: "",
        Course_id: null
    }
    const [formState, setFormState] = useState(initialState)
    const [isEdit, setIsEdit] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const handleDelete = async () => {
        try {
            const id = deleteId;
            setDeleteId(null)
            await axios.delete(`${BASE_URL}/deleteConsultancyFollowUp/${id}`);
            getFollowUpData()
            alert('Follow up deleted successfully')
        } catch (error) {
            setDeleteId(null)
            console.error("Error deleting follow up:", error);
            alert('Error deleting')
        }
    };

    useEffect(()=>{
        getFollowUpData()
    },[])

    const getFollowUpData = async()=>{
        try{
            const response = await axios.get(`${BASE_URL}/consultancyFollowUp?Const_Id=${Const_Id}`)
            setFollowUpData(response.data)
        }catch(err){
            console.log('Error fetching consultancy Follow Up data', err)
        }

    }

    const duplicateFollowUp = async(data)=>{
        try{
            const response = await axios.post(`${BASE_URL}/addConsultancyFollowUp`,data)
            getFollowUpData()
            alert("Done")
        }catch(err){
            console.log('Error duplicating Follow up data', err)
            alert('Error')
        }
    }

    const handleFollowUpFormClose = ()=>{
        setIsEdit(false)
        setFormState(initialState)
        setOpenFollowUpForm(false)
    }

    const columns = [
        { field: 'Tdate', headerName: 'Date', width:100 },
        { field: 'CName', headerName: 'Contact Person', width:150 },
        { field: 'Designation', headerName: 'Designation', width:200 },
        { field: 'Phone', headerName: 'Mobile', width: 150 },
        { field: 'Email', headerName: 'Email', width: 200 },
        { field: 'Purpose', headerName: 'Purpose', width:150 },
        { field: 'Course', headerName: 'Course', width: 200 },
        { field: 'DirectLine', headerName: 'Direct Line', width: 150 },
        { field: 'Remark', headerName: 'Remarks', width: 200},
        { field: 'CreatedBy', headerName: 'Added By', width: 150},
        {
            field: 'actions',
            headerName: 'Action',
            width:130,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={()=>{
                            setIsEdit(true)
                            setFormState(params.row)
                            setOpenFollowUpForm(true)
                        }}/>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() =>{
                            setDeleteId(params.row.ID)
                        }} />
                        <AddCircleOutlineIcon style={{color:"green", cursor:"pointer"}} onClick={()=> duplicateFollowUp(params.row)}/>
                    </>
                )
            }
        },
    ];


    return (

        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">

                    <div className="row">
                        <div class="d-flex">

                            <div className='px-2 mx-2'><Link to={`/consultancymaster/${Const_Id}`}><h4>Consultancy Details</h4></Link></div>
                            <div className='px-2 mx-2'><Link to={`/consstudentdetails?Const_Id=${Const_Id}`}><h4>Student Details</h4></Link></div>
                            <div className='px-2 mx-2'><Link to={`/consultancybranches?Const_Id=${Const_Id}`}><h4>Branches</h4></Link></div>
                            <div className='px-2 mx-2'><Link to={`/consultancyfollowup?Const_Id=${Const_Id}`}><h4>Follow Up</h4></Link></div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div >
                                            <h4 class="card-title">View Consultancy Info</h4>
                                        </div>
                                        
                                        <button class="btn btn-success" onClick={()=>setOpenFollowUpForm(true)}>
                                            Add + 
                                        </button>
                                        <Modal
                                            open={openFollowUpForm}
                                            onClose={handleFollowUpFormClose}
                                        >
                                            <ConsultancyFollowUpForm onClose={handleFollowUpFormClose} formState={formState}
                                            setFormState={setFormState} isEdit={isEdit} onSubmit={()=>{
                                                getFollowUpData()
                                            }}/>
                                        </Modal>
                                    </div>
                                    <div>
                                        <DataGrid
                                            rows={followUpData}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row) => row.ID}
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

                                        {deleteId && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={handleDelete} className='btn btn-sm btn-primary'>Ok</button>
                                                <button onClick={() => setDeleteId(null)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                    </div>

                                    {/* <div className='row p-2 gap-2'>
                                            <button className='mr-2 btn btn-primary' >Submit</button>
                                            <button class="btn btn-light">Cancel</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default ConsultancyFollowUp