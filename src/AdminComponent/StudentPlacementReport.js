import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from './StyledDataGrid';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import Discipline from './Discipline';
//import FormControlLabel from '@mui/material/FormControlLabel';

const StudentPlacementReport = () => {

    const [coursedata, setCourseData] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [courseid, setCourseId] = useState([])
    const [batchid, setbatchId] = useState([])
    const [batch, setBatch] = useState([])
    const [student, setStudent] = useState([])
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });




    const [value, setValue] = useState({
        college_name: "" || uid.college_name,
        university: "" || uid.university,
        contact_person: "" || uid.contact_person,
        designation: "" || uid.designation,



    })

    const getStudentDetails = async () => {
        const data = {
            batchId: batchid, // send selected batchId
        };

        try {
            const res = await axios.post(`${BASE_URL}/getStudentplacementreport`, data);
            setVendorData(res.data); // assuming response contains student list
            console.log(res.data, 'test');
        } catch (err) {
            console.error("Error fetching student details:", err);
        }
    };




    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!batchid) {
            isValid = false;
            newErrors.batchid = "This is required"
        }

        setError(newErrors)
        return isValid
    }


    async function getCourseData() {
        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                setCourseData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }



    async function getbatch(courseid) {
        setCourseId(courseid)
        const data = {
            courseid: courseid
        }
        axios.post(`${BASE_URL}/getcoursewisebatch`, data)
            .then((res) => {
                setBatch(res.data)
            })
            .catch((err) => {
                console.log(err)
            })


    }

    async function getbatchwisestudent(batchid) {
        setbatchId(batchid)

        if (validateForm()) {
            const data = {
                Batch_Id: batchid
            }
            axios.post(`${BASE_URL}/getcvStudent`, data)
                .then((res) => {
                    setStudent(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }



    }

    useEffect(() => {
        getCourseData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!batchid) {
            alert("Please select a batch");
            return;
        }

        // Simply call getStudentDetails which already uses value.rollnumberallot
        getStudentDetails();
    };


    const columns = [
        {
            field: 'id',
            headerName: 'Sr No.',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            width: 100,
            filterable: false,
        },
        {
            field: 'Student_Name',
            headerName: 'Name',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Present_Mobile',
            headerName: 'Mobile Number',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Email',
            headerName: 'Email',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Qualification',
            headerName: 'Qualification',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Years',
            headerName: 'Year',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Discipline',
            headerName: 'Discipline',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Marks',
            headerName: 'Marks',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Design_Exp',
            headerName: 'Design_Exp',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'Total_Exp',
            headerName: 'Total_Exp',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
        }


    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                }}
            >
                <GridToolbarFilterButton />
                <GridToolbarQuickFilter />
            </GridToolbarContainer>
        );
    }

    const exportToExcel = async () => {
        if (!vendordata || vendordata.length === 0) {
            alert("No data available to export.");
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Export Contacts");

        // Define columns
        worksheet.columns = [
            { header: "Student Name", key: "Student_Name", width: 30 },
            { header: "Email", key: "Email", width: 30 },
            { header: "Present Mobile", key: "Present_Mobile", width: 20 },
            { header: "Qualification", key: "Qualification", width: 30 },
            { header: "Year", key: "Years", width: 30 },
            { header: "Discipline", key: "Discipline", width: 20 },
            { header: "Marks", key: "Marks", width: 30 },
            { header: "Design_Exp", key: "Design_Exp", width: 30 },
            { header: "Total_Exp", key: "Total_Exp", width: 20 },
        ];

        // Add rows
        vendordata.forEach(row => {
            worksheet.addRow({
                Student_Name: row.Student_Name || '',
                Email: row.Email || '',
                Present_Mobile: row.Present_Mobile || '',
                Qualification: row.Qualification || '',
                Year: row.Years || '',
                Discipline: row.Discipline || '',
                Marks: row.Marks || '',
                Design_Exp: row.Design_Exp || '',
                Total_Exp: row.Total_Exp || '',
            });
        });

        // Export
        try {
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, "StudentPlacementReport.xlsx");
        } catch (error) {
            console.error("Excel export failed:", error);
        }
    };








    const rowsWithIds = vendordata.map((row, index) => ({
        ...row,
        id: index + 1 // this will be used as the unique ID
    }));







    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Placement Report</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" >
                                        <div class='row'>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={courseid} onChange={(e) => getbatch(e.target.value)} name='course'>
                                                    <option>Select Course</option>
                                                    {coursedata.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleFormControlSelect1">Batch</lable>
                                                <select class="form-control form-control-lg" id="exampleFromControlSelect1" value={batchid} name='batch' onChange={(e) => getbatchwisestudent(e.target.value)} >
                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <button type="button" class="btn btn-primary mr-2" onClick={getStudentDetails}>
                                            Go
                                        </button>

                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Details</h4>
                                        </div>

                                    </div>
                                    <form className="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5></h5>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={exportToExcel}
                                                disabled={vendordata.length === 0}
                                            >
                                                Excel
                                            </button>
                                        </div>
                                        {vendordata.length > 0 && (
                                            <div>
                                                {/* Top bar with Excel button aligned right */}


                                                {/* DataGrid below with top margin */}
                                                <div
                                                    style={{
                                                        borderLeft: "1px solid #dce4ec",
                                                        height: "510px",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <StyledDataGrid
                                                        rows={rowsWithIds}
                                                        columns={columns}
                                                        disableColumnSelector
                                                        disableDensitySelector
                                                        rowHeight={37}
                                                        pagination
                                                        paginationModel={paginationModel}
                                                        onPaginationModelChange={setPaginationModel}
                                                        pageSizeOptions={[50]}
                                                        autoHeight={false}
                                                        sx={{
                                                            height: 500,
                                                            '& .MuiDataGrid-footerContainer': {
                                                                justifyContent: 'flex-end',
                                                            },
                                                        }}
                                                        slots={{
                                                            toolbar: CustomToolbar,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </form>

                                    


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default StudentPlacementReport
