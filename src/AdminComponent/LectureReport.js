import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from "./InnerHeader";
import { StyledDataGrid } from "./StyledDataGrid";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import Cookies from "js-cookie";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const CACHE_KEY = 'lecture_data';

const LectureReport = () => {

    const [course, setCourse] = useState([])
    const [value, setValue] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [hide, setHide] = useState([])
    const [vendordata, setStudent] = useState([])
    const [lecturereport, setLectureReport] = useState([])
    const [loading, setLoading] = useState ([true])
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });




    const getbatch = async (id) => {
        const data = {
            course: id
        }

        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data);
        } catch (err) {
            console.error(":", err);
        }
    };


    const getstudentlisiting = (e) => {
        setHide(true)
        const data = {
            batch_code: ''
        }

        axios.post(`${BASE_URL}/getcoursewisebatch`, data)
            .then((res) => {
                setStudent(res.data)
            })
    }

    async function getLectureReportData() {
        
        axios.get(`${BASE_URL}/lecturereport`)
        .then((res) => {
            console.log (res.data)
            setLectureReport(res.data)
            localStorage.setItem(CACHE_KEY. JSON.stringify({
                data:res.data,
                timestamp: Date.now()
            }));
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const handleSubmit = (e) => {
        e.preventDefult()

        const data = {

        }
    }

const roledata = {
        role: Cookies.get(`role`),
        pageid: 60,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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

        //{ field: 'attendee', headerName: 'Student Code', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 2,
            renderCall:(param) => {
                return (
                    <>
                    {roleaccess > 2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => (param.row.id)} />}
                    {roleaccess > 3 && <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => (param.row.id)} />}
                    </>
                )
            }
        },
    ];

    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row}));

    return (

        <div class="container-fluid page-body-warpper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class='card-title'>
                                        Leacture Search
                                    </h4>
                                    <hr></hr>

                                    <form class="form-sample py-3" onSubmit={handleSubmit} >
                                        <div class="row">
                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Course<span class="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.course}
                                                    name="course" onChange={(e) => getbatch(e.target.value)}>
                                                    <option>--Select Course--</option>

                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Batch<span class="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.batch}
                                                    name="batch" onChange={(e) => getstudentlisiting(e.target.value)}>
                                                    <option>--Select Batch--</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Lecture</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.lecture}
                                                    name="lecture" onChange={onhandleChange}>
                                                    <option>--Select Lecture--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Faculty</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.faculty}
                                                    name="faculty" onChange={onhandleChange}>
                                                    <option>--Select Faculty--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Months</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.months}
                                                    name="months" onChange={onhandleChange}>
                                                    <option>--Select Months--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Year</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.year}
                                                    name="year" onChange={onhandleChange}>
                                                    <option>--Select Year--</option>
                                                </select>
                                            </div>
                                            <div class='d-flex align-items-center mt-3'>
                                                <button type="submit" class="btn btn-sm btn-primary mr-5">Go</button>
                                                <button type="reset" onClick={() => getLectureReportData()} class="btn btn-sm btn-primary mr-2" >Clear All</button>
                                                <button type="submit" class="btn btn-sm btn-primary mr-2">Back</button>
                                            </div>
                                           
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className="d-flex justify-content-warrper"style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">Details</h4>
                                        </div>
                                    </div>
                                    {hide && <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                        rows={rowsWithIds}
                                        columns={columns}
                                        // disableColumnFilter
                                        disableColumnSelector
                                        disableDensitySelector
                                        rowHeight={35}
                                        getRowId={(row) => row.Batch_Id}
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
                                    </div>}

                                    <button type="Submit" class="btn btn-primary mr-2">Excel</button>
                                    <button type='button' onClick={() => {
                                        window.location.reload()
                                    }} class="btn btn-light">Print</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )


}
export default LectureReport