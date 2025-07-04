import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";

const ContactExport = () => {

    const [vendordata, setVendorData] = useState([])
    const [specification, setSpecification] = useState("")
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });

    console.log(specification)

    const [value, setValue] = useState({
        startdate: "" || uid.startdate,
        enddate: "" || uid.enddate,
        specification: "" || uid.specification,


    })

    useEffect(() => {
        setValue({
            startdate: uid.startdate,
            enddate: uid.enddate,
            specification: uid.specification,

        })
    }, [uid])

    const getStudentDetails = async () => {
        const data = {
            batchId: value.rollnumberallot, // send selected batchId
        };

        try {
            const res = await axios.post(`${BASE_URL}/getStudentExcel`, data);
            setVendorData(res.data); // assuming response contains student list
            console.log(res.data, 'test');
        } catch (err) {
            console.error("Error fetching student details:", err);
        }
    };



    const getbatch = async (id) => {

        const data = {
            courseid: id
        }

        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data);

        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };



    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                SetCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCourseData()
        // getStudentDetails()

        setUid([])
    }, [])




    useEffect(() => {
        // getStudentDetails()
        getCourseData()
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







    const handleSubmit = (e) => {
        e.preventDefault();

        if (!value.rollnumberallot) {
            alert("Please select a batch");
            return;
        }

        // Simply call getStudentDetails which already uses value.rollnumberallot
        getStudentDetails();
    };


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }






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
        ];

        // Add rows
        vendordata.forEach(row => {
            worksheet.addRow({
                Student_Name: row.Student_Name || '',
                Email: row.Email || '',
                Present_Mobile: row.Present_Mobile || ''
            });
        });

        // Export
        try {
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, "Export_Contacts.xlsx");
        } catch (error) {
            console.error("Excel export failed:", error);
        }
    };








    const rowsWithIds = vendordata.map((row, index) => ({
        ...row,
        id: index + 1 // this will be used as the unique ID
    }));


    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Student Contact Details</h4>

                                    <hr></hr>
                                    <form class="forms-sample py-3" >
                                        <div class='row'>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleFormControlSelect1">Select Course<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.selectcourse} name='selectcourse' onChange={(e) => getbatch(e.target.value)}>
                                                    <option>Select Course</option>

                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className='text-danger'> {error.selectcourse} </span>}
                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleFormControlSelect1">Select Batch Code</label>
                                                <select
                                                    className="form-control form-control-lg"
                                                    id="exampleFromControlSelect1"
                                                    value={value.rollnumberallot}
                                                    name="rollnumberallot"
                                                    onChange={onhandleChange}
                                                >
                                                    <option value="">Select Batch</option>
                                                    {batch.map((item) => (
                                                        <option key={item.Batch_Id} value={item.Batch_Id}>
                                                            {item.Batch_code}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>

                                        </div>
                                        <div className="py-3">
                                            <button type="button" className="btn btn-primary mr-2" onClick={getStudentDetails}>
                                                Go
                                            </button>
                                        </div>



                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-12 col-lg-12'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h3>Details</h3>
                                                    </div><hr></hr>
                                                    <form className="forms-sample py-3" onSubmit={handleSubmit}>
                                                        {vendordata.length > 0 && (
                                                            <div>
                                                                {/* Top bar with Excel button aligned right */}
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

                            </div>
                        </div>
                    </div>
                    <div className="#">


                    </div>
                </div>
            </div >
        </div >

    )
}

export default ContactExport


