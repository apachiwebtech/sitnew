import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import FormControl from '@mui/material/FormControl';
import { StyledDataGrid } from "./StyledDataGrid";
import Course from "./Course";
import { pdf } from "@react-pdf/renderer";
import { Category } from "@mui/icons-material";
import Forcardlist from "./Document/Forcardlist";

const StudentReport = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [course, setCourse] = useState([])
    const [batch, setBatch] = useState([]);

    
  
  

    const [value, setValue] = useState({
        course : ""|| uid.course,
        batch : ""|| uid.batch,

    })

    useEffect(() => {
        setValue({
            course : uid.course,
            batch : uid.batch,

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.course) {
        isValid = false;
        newErrors.course = "Course is Required"
       }
        if (!value.batch) {
            isValid = false;
            newErrors.batch = "Batch is Required"
        }
        setError(newErrors)
        return isValid
    
    
    }

    async function getCourseData() {
            axios
                .get(`${BASE_URL}/getCourse`)
                .then((res) => {
                    setCourse(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    
        useEffect(() => {
            getCourseData();
            value.title = "";
            setError({});
            setUid([]);
        }, []);





    async function getEmployeeData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getEmployeeData() {
        const data = {
            tablename : "awt_employeerecord"
        }
        axios.post(`${BASE_URL}/get_data`,data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getEmployeeData()
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
            u_id : id,
            tablename : "awt_employeerecord"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data , "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename : "awt_employeerecord"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getEmployeeData()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    if(validateForm()){
        const data = {
            
        course : value.course,
        batch : value.batch,
        uid : uid.id
        };

        console.log("onSubmit");
            console.log(Category)
            generatePdf();


            

        

        axios.post(`${BASE_URL}/add_employeerecord`, data)
            .then((res) => {
               console.log(res)
               getEmployeeData()

            })
            .catch((err) => {
                console.log(err)
            })
    }
};

    const generatePdf = () => {
        switch (Category) {
            case "forcard":
                forcardlistpdf();
                break;
        }
    };


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
        { field: 'attendee', headerName: 'Attendee', flex: 2},
        { field: 'instructor', headerName: 'Instructor', flex: 2},
        { field: 'description', headerName: 'Description', flex: 2},
        { field: 'feedback', headerName: 'FeedBack', flex: 2},
        
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                    </>
                )
            }
        },
    ];

    const handlegetbatch = async (courseid) => {
        setValue({
            course: courseid,
        });

        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, { courseid: courseid });
            
            
            setBatch(res.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const forcardlistpdf = async () => {
        
            const blob = await pdf(<Forcardlist /> ).toBlob();
            console.log("Blob created:", blob);

             
            const url = URL.createObjectURL(blob);
            console.log("Generated PDF URL:", url);
            window.open(url);
            URL.revokeObjectURL(url);
        };

    

    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Student Report</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="from-group col-lg-12">
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group" >
                                                        <FormControlLabel value="student" control={<Radio />} label="Student List" />
                                                        <FormControlLabel value="batch" control={<Radio />} label="Batch Wise" />
                                                        <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
                                                        <FormControlLabel value="forcard" control={<Radio />} label="For Card List" />
                                                        <FormControlLabel value="month" control={<Radio />} label="Month Wise" />
                                                        <FormControlLabel value="document" control={<Radio />} label="Documents" />
                                                        <FormControlLabel value="left" control={<Radio />} label="Left" />
                                                        <FormControlLabel value="cancelled" control={<Radio />} label="Cancelled Students" />
                                                        <FormControlLabel value="placed" control={<Radio />} label="Placed Students" />

                                                    </RadioGroup>
                                                </FormControl>
                                                
                                            </div>
                                          

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Select Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" 
                                                onChange={(e) => handlegetbatch(e.target.value)}
                                                name="course">
                                                    <option value="">Select</option>
                                                    {course.map((courses)=>{
                                                        return(
                                                            <option value={courses.Course_Id} >
                                                                {courses.Course_Name}
                                                            </option>
                                                        );
                                                    })}
                                                        
                                                </select>
                                                {<span className="text-danger"> {error.course} </span>}
                                            </div>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Select Batch<span className='text-danger'>*</span> </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    onChange={onhandleChange}
                                                    name="batch"
                                                >
                                                    <option>Select Batch</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.batch} </span>}
                                            </div>

                                        </div>
                                            



                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">Student Record</h4>
                                        </div>

                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "scroll"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
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

export default StudentReport
