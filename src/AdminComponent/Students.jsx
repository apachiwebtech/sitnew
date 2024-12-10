import React, { useEffect, useState } from 'react'
import { BASE_URL } from './BaseUrl'
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import InnerHeader from './InnerHeader';
import axios from 'axios';
import { Button, Switch } from '@mui/material';
import Loader from './Loader';
import * as XLSX from "xlsx";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledDataGrid } from './StyledDataGrid';
import { param } from 'jquery';
import _debounce from 'lodash.debounce';

const Students = () => {

    const [excelData, setExcelData] = useState([]);
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                {/* <GridToolbarExport /> */}
                <GridToolbarFilterButton />
            </GridToolbarContainer>
        );
    }
    const [loading, setLoading] = useState(true)
    const [onlineAdmissions, setOnlineAdmissions] = useState([])
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [age, setAge] = React.useState('');
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(0); // Current page
    const [pageSize, setPageSize] = useState(10); // Number of records per page
    const [lastStudentId, setLastStudentId] = useState(null);
    const [totalstudent, setTotalStudent] = useState('')
    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [searchwise, setSearchWise] = useState('')
    const [searchdata, setSearchData] = useState('')
    const [searchtext, setText] = useState('')
    const [expand, setPageExpand] = useState(false)
    const [data, setData] = useState([])
    async function getOnlineAdmissions(params) {
        setLoading(true)
        const data = {
            page: page,
            pageSize: pageSize
        }
        axios.post(`${BASE_URL}/getAllStudent`, data)

            .then((response) => {
                if (response.data) {
                    setStudents(response.data.data); // Set fetched student data
                    setLastStudentId(response.data.lastStudentId);
                    setTotalStudent(response.data.totalCount)
                    setLoading(false)
                }

            })
    }



    useEffect(() => {
        getOnlineAdmissions();
    }, [])

    useEffect(() => {
        getOnlineAdmissions(page, pageSize);
    }, [page, pageSize]);


    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value == 0 ? 1 : 0

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "Student_Master" })
            .then((res) => {
                console.log(res)
                getOnlineAdmissions()
                setLoading(false)
            })
    }


    const columns = [
        {
            field: 'Student_Id',
            headerName: 'Student Id',
            type: 'text',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,
        },
        { field: 'Batch_code', headerName: 'Batch Code', flex: 1 },
        { field: 'Student_Name', headerName: 'Student Name', flex: 2 },
        { field: 'Present_Address', headerName: 'Address', flex: 2 },
        { field: 'Email', headerName: 'Email', flex: 2 },
        { field: 'Present_Mobile', headerName: 'mobile', flex: 2 },
        // { field: 'Qualification', headerName: 'Qualification', flex: 2 },
        { field: 'Status', headerName: 'Status', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admissionform/personalinfo/${params.row.Student_Id}`}><EditIcon style={{ cursor: "pointer" }} /></Link>
                        <Switch {...label} onChange={() => handleswitchchange(params.row.isActive, params.row.id)} defaultChecked={params.row.isActive == 0 ? false : true} color="secondary" />
                    </>
                )
            }
        },
    ];

    const rowsWithIds = onlineAdmissions.map((row, index) => ({ index: index + 1, ...row }));


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;

            // Parse the binary string to create a workbook object
            const workbook = XLSX.read(binaryStr, { type: "binary" });

            // Get the first sheet name
            const sheetName = workbook.SheetNames[0];

            // Get the worksheet from the workbook
            const sheet = workbook.Sheets[sheetName];

            // Convert the worksheet to JSON format
            const data = XLSX.utils.sheet_to_json(sheet);

            // Set the parsed Excel data (array of objects)
            setExcelData(data);
        };

        reader.readAsArrayBuffer(file);

    };


    const handleImport = async () => {
        const batchSize = 5000;
        for (let i = 0; i < excelData.length; i += batchSize) {
            const batch = excelData.slice(i, i + batchSize);
            await axios.post(`${BASE_URL}/upload-student-excel`, { data: batch });
        }
    };



    //Search Section



    async function getstudents() {

        axios.post(`${BASE_URL}/getAdmittedStudent`, { param: searchtext })
            .then((res) => {
                setData(res.data)
            })
    }
    async function getBatchcode() {


        axios.post(`${BASE_URL}/getSearchBatch`, { param: searchtext })
            .then((res) => {
                setData(res.data)
            })
    }
    async function getEmail() {


        axios.post(`${BASE_URL}/getSearchEmail`, { param: searchtext })
            .then((res) => {
                setData(res.data)
            })
    }



    const onsearchformSumbit = (e) => {
        e.preventDefault()

        const data = {
            searchwise: searchwise,
            search: searchdata
        }

        axios.post(`${BASE_URL}/getserchresult`, data)
            .then((res) => {
                setStudents(res.data)
            })


    }

    const handlesearchselect = (value) => {
        setSearchWise(value)
  

        if (value == 'BatchWise') {
            getBatchcode()
        }
        if (value == 'EmailWise') {
            getEmail()
        }
    }

    const handleSearchChange = (newValue) => {
        setSelectedStudent(newValue); // Update state

        if (searchwise == 'NameWise') {
            setSearchData(newValue?.Student_Id)
        }
        if (searchwise == 'BatchWise') {
            setSearchData(newValue?.Batch_code)
        }
        if (searchwise == 'EmailWise') {
            setSearchData(newValue?.Email)
        }
        


    };


    const handleInputChange = _debounce((newValue) => {
        console.log(newValue)
        setText(newValue)

        if (searchwise == 'BatchWise') {
            getBatchcode()
        }
        if (searchwise == 'NameWise') {
            getstudents()

        }
        if (searchwise == 'EmailWise') {
            getEmail()

        }

    }, 500);






    return (
        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            {loading && <Loader />}
            <div className="main-pannel" style={{ display: loading ? "none" : "block" }} >
                <div className="content-wrapper ">
                    <div className="row">
                        {/* <input className="mx-2" type="file" onChange={handleFileUpload}  />
                    <button
                      className="btn btn-success mx-2"
                      onClick={handleImport}
                    >
                      Import 
                    </button> */}
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='row ' style={{ width: "100%", padding: "10px 0" }}>
                                        <div className='col-lg-7 ' >
                                            <form className='row align-items-center' onSubmit={onsearchformSumbit} >
                                                {/* <h4 class="card-title">Student Information</h4> */}

                                                <div class="form-group col-lg-3">

                                                    <FormControl fullWidth size="small">
                                                        <InputLabel id="demo-simple-select-label">Select Search</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={searchwise}
                                                            label="Select Search"
                                                            onChange={(e) => handlesearchselect(e.target.value)}

                                                        >
                                                            <MenuItem value={`Select`}>Select</MenuItem>
                                                            <MenuItem value={`NameWise`}>Name Wise</MenuItem>
                                                            <MenuItem value={`BatchWise`}>Batch Wise</MenuItem>
                                                            <MenuItem value={`CourseWise`}>Course Wise</MenuItem>
                                                            <MenuItem value={`EmailWise`}>Email Wise</MenuItem>
                                                            <MenuItem value={`MobileWise`}>Mobile Wise</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <div class="form-group col-lg-5">

                                                    <Autocomplete
                                                        size="small"
                                                        disablePortal
                                                        options={data} // Pass the array of student objects
                                                        getOptionLabel={(option) =>
                                                            searchwise === 'NameWise'
                                                                ? option.Student_Name
                                                                : searchwise === 'BatchWise'
                                                                    ? option.Batch_code
                                                                    : searchwise === 'EmailWise' ?  option.Email : '' // Provide a default fallback
                                                        } // Dynamically display the label based on `searchdata`
                                                        value={selectedStudent} // Use a state to manage the selected value
                                                        onChange={(e, newValue) => handleSearchChange(newValue)} // `newValue` is the selected object
                                                        onInputChange={(e, newInputValue) => handleInputChange(newInputValue)} // Capture typed input
                                                        renderOption={(props, option) => (
                                                            <li {...props} key={option.Student_Id}>
                                                                {searchwise === 'NameWise'
                                                                    ? option.Student_Name
                                                                    : searchwise === 'BatchWise'
                                                                        ? option.Batch_code
                                                                        : searchwise === 'EmailWise' ? option.Email : ''} {/* Dynamically render the option */}
                                                            </li>
                                                        )}
                                                        renderInput={(params) => <TextField {...params} label="Enter.." />} // Render the input field
                                                    />




                                                </div>

                                                <div class="form-group col-lg-2">

                                                    <Button type='submit' onClick={() =>{
                                                        setPageExpand()
                                                    }} variant="contained">Search</Button>
                                                </div>
                                                <div className='form-group col-lg-2'>
                                                    <Button type='submit' onClick={() => {
                                                        window.location.reload()
                                                    }} variant="contained">Clear</Button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className='col-lg-5'>
                                            <p className='float-right'><b>Total Student :</b>{totalstudent}</p>
                                        </div>



                                    </div>

                                    <div>
                                        {/* <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            estimatedRowCount={100}
         
                                            getRowId={(row) => row.Student_Id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 5, page: 0 },
                                                },
                                            }}
                                            slots={{ toolbar: CustomToolbar }}
                                            slotProps={{
                                                toolbar: {
                                                    showQuickFilter: true,
                                                },
                                            }}
                                            paginationModel={paginationModel} // Ensure this is controlled by state
                                            onPaginationModelChange={handlegetnewdata} // Updates pagination state
                                        /> */}

                                        <StyledDataGrid
                                            rows={students}
                                            columns={columns}
                                            pageSize={pageSize}
                                            page={page}
                                            rowHeight={37}
                                            pagination={false}
                                            disableColumnSelector
                                            disableDensitySelector
                                            getRowId={(row) => row.Admission_Id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 100, page: 0 },
                                                },
                                            }}
                                        // Any other DataGrid props you need
                                        />
                                        <div className='float-right py-2'>
                                            <button
                                                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                                disabled={page === 0} // Disable the "Previous" button on the first page
                                            >
                                                Previous
                                            </button>

                                            <span>Page {page + 1}</span>

                                            <button
                                                onClick={() => setPage((prev) => prev + 1)}
                                                disabled={!lastStudentId} // Disable the "Next" button if there is no lastStudentId (i.e., no data)
                                            >
                                                Next
                                            </button>
                                        </div>



                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Students