import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from "./InnerHeader";
import { type } from "@testing-library/user-event/dist/type";
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


const FacultyMonthlyStatement = () => {

    const [value, setValue] = useState([])
    const [hide, setHide] = useState([])
    const [vendordata, setStudent] = useState([])
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });



    const handleSubmit = (e) => {
        e.preventDefult()

        const data = {

        }
    }

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


const roledata = {
        role: Cookies.get(`role`),
        pageid: 67,
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
            flex: 1,
            filterable: false,
        },

        //{ field: 'period', headerName: 'Period' flex: 2},

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 2,
            renderCall:(param) => {
                return (
                    <>
                    {roleaccess > 2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => (param.row.id)} />}
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red", cursor: "pointer"}} onClick={() => (param.row.id)} />}
                    </>
                )
            }
        },

    ];

    const rowsWithIds = vendordata.map((row, index) => ({index: index + 1, ...row}));

    return (

        <div class="container-fluid page-body-warpper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">
                                        Faculty Monthly Salary Statement
                                    </h4>
                                    <hr></hr>

                                    <form class="form-sample py-3" onSubmit={handleSubmit} >
                                        <div class="row">
                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Period</lable>
                                                <select class="form-control" id="exampleFormControlSelecet1"
                                                    value={value.period} name="period"
                                                    onChange={onhandleChange}>
                                                    <option>--Select Months--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleFormControlSelect1">Year</lable>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={value.periodyear} name="periodyear"
                                                    onChange={onhandleChange}>
                                                    <option>--Select Year--</option>
                                                </select>
                                            </div>

                                            <div class="d-flex align-items-center mt-3">
                                                <button type="submit" class="btn btn-sm btn-primary mr-2 py-2">Go</button>
                                            </div>


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className="d-flex justify-content-wrrper">
                                        <div>
                                            <h4 class="card-title">
                                                Details
                                            </h4>
                                        </div>
                                    </div>

                                    {hide && <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "scroll"}}>
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

                                        <button type="submit" class="btn btn-primary mr-2">Excel</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FacultyMonthlyStatement