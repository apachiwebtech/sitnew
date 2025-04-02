import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Loader from './Loader';
import AddCollegeInfo from './AddCollegeInfo';
import CollegeForm from './CollegeForm';
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { param } from 'jquery';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const StudentDetails = () => {


    const [vendordata, setVendorData] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const { collegeid } = useParams()
    const [selectedRows, setSelectedRows] = useState([]);
    const [opendi, setOpendi] = useState(false)
    const [college, setCollege] = useState([])
    const [collegeval , Setcollegeval] = useState("")
    const handleClose = () => {
        setOpendi(false);
    };

    async function getStudentData() {
        const data = {
            collegeid: collegeid
        }
        axios.post(`${BASE_URL}/getcollegestudent`, data)
            .then((res) => {

                setVendorData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    async function getCollegeData() {
        const data = {
            tablename: "awt_college",
        }
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                setCollege(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCollegeData()
        getStudentData()

    }, [])




    const handleSelectionChange = (newSelection) => {
        setSelectedRows(newSelection);
    };


    const handlechange = (id) => {

        const data = {
            studentid: selectedRows,
            collegeid: id
        }

        axios.post(`${BASE_URL}/collegechange`, data)
            .then((res) => {
                console.log(res.data)
                setOpendi(false)
                getStudentData()
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
        { field: 'Student_Name', headerName: 'Student Name', flex: 2 },
        { field: 'Course_Id', headerName: 'Course Name', flex: 2 },
        { field: 'Batch_Code', headerName: 'Batch Code', flex: 2 },
        { field: 'date', headerName: 'Year of Passing', flex: 2 },
        { field: 'Present_Mobile', headerName: 'Mobile', flex: 2 },
        { field: 'Email', headerName: 'Email', flex: 2 },
        { filed: 'Discipline', headerName: 'Discipline', flex: 2 },

    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />

            {loading && <Loader />}

            <div class="main-panel" style={{ display: loading ? "none" : "block" }}>
                <div class="content-wrapper">
                    <div className='my-2 text-right'>
                        <button className='btn btn-success' onClick={() => setOpen(true)}>Add +</button>
                    </div>
                    <CollegeForm collegeid={collegeid} />
                    <div class="row">


                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        {/* <div>
                                            <h4 class="card-title">Student Details</h4>
                                        </div> */}

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}

                                            checkboxSelection
                                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                                handleSelectionChange(newRowSelectionModel);
                                            }}
                                            rowHeight={35}
                                            getRowId={(row) => row.Student_Id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}

                                        />

                                        <div className='my-3'>
                                            <button className='btn btn-primary' onClick={() => setOpendi(true)}>Change College</button>
                                            <button className='btn btn-success mx-2' >Print</button>
                                        </div>


                                        <BootstrapDialog
                                            onClose={handleClose}
                                            aria-labelledby="customized-dialog-title"
                                            open={opendi}
                                            maxWidth='lg'

                                        >
                                            <DialogTitle sx={{ m: 0, p: 2, width: "100%" }} id="customized-dialog-title">
                                                Add College Info
                                            </DialogTitle>
                                            <IconButton
                                                aria-label="close"
                                                onClick={handleClose}
                                                sx={{
                                                    position: "absolute",
                                                    right: 8,
                                                    top: 8,
                                                    color: (theme) => theme.palette.grey[500],
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <DialogContent dividers>

                                                <div class="row m-2 align-items-center">
                                                    <div class="form-group col-lg-9">
                                                        <label for="exampleFromControlSelect1">College Name</label>
                                                        <select class="form-control" id="exampleFromControlSelect1"
                                                            name='purpose' onChange={(e) => Setcollegeval(e.target.value)}>
                                                            <option>select college</option>
                                                            {college.map((item) => {
                                                                return (
                                                                    <option value={item.id}>{item.college_name}</option>
                                                                )
                                                            })}

                                                        </select>
                                                    </div>
                                                    <div class=" col-lg-3">
                                                        <button className='btn btn-primary' onClick={() => handlechange(collegeval)}>Change</button>
                                               
                                                    </div>
                                                </div>
                                            </DialogContent>

                                        </BootstrapDialog>


                                        {/* this is form  */}

                                        <AddCollegeInfo open={open} setOpen={setOpen} />


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

export default StudentDetails