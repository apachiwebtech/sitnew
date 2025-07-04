import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import OnlineAdmissionForm from "./OnlineAdmissionForm";
import img from "../assets/pass.jpg";
import Admissionform from "./Admissionform";
import InnerHeaderForm from "./InnerHeaderForm";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const StudentPlacement = () => {
    const [onlineAdmissions, setOnlineAdmissions] = useState([]);
    const location = useLocation();
    const [placement, setplacement] = useState({
        block: "",
        Student_Id: "",
        Email: "",
        Batch_Code: "",
        gender: "",
        nationality: "",
        dob: "",
        password: "",
        reference: "",

    });
    const { admissionid } = useParams();

    async function getplacementdetails() {

        const data = {
            Student_id: localStorage.getItem('Admissionid')
        }
        axios.post(`${BASE_URL}/getplacementdetails`, data)
            .then((res) => {
                setOnlineAdmissions(res.data)
            })
    }

    useEffect(() => {

        getplacementdetails()
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setplacement((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        {
            field: "index",
            headerName: "id",
            type: "number",
            align: "center",
            headerAlign: "center",
            flex: 1,
            filterable: false,
        },
        {
            field: "TDate", headerName: "Discussion Date", flex: 2,
            valueFormatter: (params) => formatDateToDDMMYYYY(params.value)
        },
        { field: "CompanyName", headerName: "Company", flex: 2 },
        { field: "Sended", headerName: "CVShotlisted", flex: 2 },
        { field: "PlacedBy", headerName: "Placed", flex: 2 },
        { field: "Remark", headerName: "Placed By", flex: 2 },
        { field: "Placement", headerName: "Remark", flex: 2 },
        // {
        //     field: "actions",
        //     type: "actions",
        //     headerName: "Action",
        //     flex: 1,
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 {/* <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
        //                 <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handledelete(params.row.id)} /> */}
        //             </>
        //         )

        //     },
        // },
    ];
    const rowsWithIds = onlineAdmissions.map((row, index) => ({
        id: index + 1,
        index: index + 1,
        ...row,
    }));

    function formatDateToDDMMYYYY(dateInput) {
        const date = new Date(dateInput);

        const day = String(date.getDate()).padStart(2, '0');       // ensures 2 digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }




    return (
        <div className="container-fluid page-body-wrapper">
            <InnerHeaderForm />

            <div className="main-panel">
                <div className="content-wrapper">
                    <Admissionform admissionid={admissionid} />

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">
                                <div className="container-fluid">
                                    <form className="row d-flex justify-content-between">

                                        <div className="row justify-content-center">
                                            <div className="p-3" style={{ width: "98%" }}>
                                                <div>
                                                    <h4 className="card-title titleback">Placement Details : </h4>
                                                </div>
                                                <div className="row">

                                                    <div className="form-group col-lg-2 ">
                                                        <label for="exampleInputUsername1">Placement Block Reason</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={placement.block}
                                                            name="block"
                                                            onChange={handleChange}
                                                        >
                                                            <option value="/">Select</option>
                                                            <option value="Location constraint">Location constraint</option>
                                                            <option value="Knowledge based">Knowledge based</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-2 ">
                                                        <label for="exampleInputUsername1">Ready to Relocate</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={placement.relocate}
                                                            name="relocate"
                                                            onChange={handleChange}
                                                        >
                                                            <option value="/">Select</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-2 ">
                                                        <label for="exampleInputUsername1">
                                                            Expected Location<span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            id="exampleInputUsername1"
                                                            value={placement.explocation}
                                                            placeholder="Id*"
                                                            name="explocation"
                                                            onChange={handleChange}

                                                        />
                                                    </div>

                                                    <div className="form-group col-lg-2">
                                                        <label for="exampleInputUsername1">
                                                            Area of Interest<span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            id="exampleInputUsername1"
                                                            value={placement.aoi}
                                                            placeholder="Area of Interest"
                                                            name="aoi"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-2 ">
                                                        <label for="exampleInputUsername1">
                                                            Notice Period(Days)<span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            id="exampleInputUsername1"
                                                            value={placement.explocation}
                                                            placeholder="Id*"
                                                            name="explocation"
                                                            onChange={handleChange}

                                                        />
                                                    </div>
                                                    <div className="form-group col-lg-2 ">
                                                        <label for="exampleInputUsername1">Placement Assistance Required</label>
                                                        <select
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={placement.prequired}
                                                            name="prequired"
                                                            onChange={handleChange}
                                                        >
                                                            <option value="/">Select</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>

                                                        </select>
                                                    </div>


                                                    <div className="form-group col-lg-4">
                                                        <label htmlFor="blockReasonRemark">
                                                            Block Reason Remark<span className="text-danger">*</span>
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="blockReasonRemark"
                                                            name="premark"
                                                            value={placement.premark}
                                                            placeholder="Block Reason Remark*"
                                                            onChange={handleChange}
                                                            rows="4"

                                                        ></textarea>
                                                    </div>
                                                    <div className="form-group col-lg-8">
                                                        <label htmlFor="placementremark">
                                                            Placement Remark<span className="text-danger">*</span>
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="placementremark"
                                                            name="Blockrremark"
                                                            value={placement.premark}
                                                            placeholder="Block Reason Remark*"
                                                            onChange={handleChange}
                                                            rows="4"

                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="row p-2 gap-2">
                                                    <button type="submit" className="mr-2 btn btn-primary">
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>





                                    </form>
                                </div>
                            </div>

                            <div className="card">
                                <div className="container-fluid">


                                    <div className="row justify-content-center">
                                        <div className="p-3" style={{ width: "98%" }}>
                                            <div>
                                                <h4 className="card-title titleback">Placement History </h4>
                                            </div>

                                            <div>
                                                <DataGrid
                                                    rows={rowsWithIds}
                                                    columns={columns}
                                                    getRowId={(row) => row.index} // <-- this is the fix
                                                    disableColumnFilter
                                                    disableColumnSelector
                                                    disableDensitySelector
                                                    rowHeight={37}
                                                    initialState={{
                                                        pagination: {
                                                            paginationModel: { pageSize: 5, page: 0 },
                                                        },
                                                    }}
                                                    slots={{ toolbar: GridToolbar }}
                                                    slotProps={{
                                                        toolbar: {
                                                            showQuickFilter: true,
                                                        },
                                                    }}
                                                />

                                            </div>


                                        </div>
                                    </div>






                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPlacement;
