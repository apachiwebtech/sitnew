import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { BatchWiseFeesDetailsNewpdf } from "./Document/BatchWiseFeesDetailsNewpdf";
import { pdf } from "@react-pdf/renderer";


const FeesDetails = () => {

    const [course, SetCourse] = useState([])
     const [batch, setBatch] = useState([]);
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [category, setCat] = useState("batchwise");
    const [value, setValue] = useState({
        
        course: "" || uid.course,
        batch: "" || uid.batch,
    })


    useEffect(() => {
        setValue({
            // course: uid.course,
            training: uid.training,
            attendee: uid.attendee,
            // selectbatch: uid.selectbatch,
            amounttype: uid.amounttype,

        })
    }, [uid])

    // useEffect (() => {
    //     fetch('/course')
    //     .then (response => response.json())
    //     .then (data => SetCourse(data))
    //     .catch(error => console.error('Error fatch course:', error));
    // }, []);


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.course) {
        isValid = false;
        newErrors.course = "Course is RequireD"
       }
       if (!value.batch) {
        isValid = false;
        newErrors.batch = "Batch is Required";
    }
        setError(newErrors)
        return isValid
    }


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
            tablename: "awt_employeerecord"
        }
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    async function getCourseData() {
            axios
                .get(`${BASE_URL}/getCourse`)
                .then((res) => {
                    SetCourse(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    useEffect(() => {
        getEmployeeData()
        getCourseData();
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
            tablename: "awt_employeerecord"
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

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_employeerecord"
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

                course: value.course,
                batch: value.batch,
                // selectbatch: value.selectbatch,
                amounttype: value.amounttype,
                uid: uid.id
            };

            console.log("onSubmit");
            console.log(category);
            generatePdf();


            // axios.post(`${BASE_URL}/add_employeerecord`, data)
            //     .then((res) => {
            //         console.log(res)
            //         getEmployeeData()

            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })
            }
            
    }

    const generatePdf = () => {
        switch(category){
            case "batchwise":
                batchwisefeesdetailsnewpdf();
                break;  

        }
    }

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

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }




    const batchwisefeesdetailsnewpdf = async () => {
        const res = await axios.post(`${BASE_URL}/getbatchwisefees`, { batch_code: value.batch });

        const blob = await pdf(<BatchWiseFeesDetailsNewpdf batchwisefee = {res.data}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

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
        { field: 'attendee', headerName: 'Attendee', flex: 2 },
        { field: 'instructor', headerName: 'Instructor', flex: 2 },
        { field: 'description', headerName: 'Description', flex: 2 },
        { field: 'feedback', headerName: 'FeedBack', flex: 2 },

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


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));


    return (
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div class="d-flex">

                                <div className='px-2 mx-2'><Link to="/feesreport"><h4>Cheque/PDC and Receipts</h4></Link></div>
                                <div className='px-2 mx-2'><Link to="/feesdetails"><h4>Fees Details</h4></Link></div>
                                <div className='px-2 mx-2'><Link to="/facultypayment"><h4>Faculty Payment Detail Report</h4></Link></div>
                            </div>
                            <div className="card">
                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>

                                        <div className='col-lg-12'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <form class="form-sample py-3" onSubmit={handleSubmit}>
                                                        <div class="row">
                                                            <div class="form-group col-lg-12">
                                                                <FormControl>
                                                                    <RadioGroup

                                                                        row aria-labelledby='demo-row-radio-button-group-lable'
                                                                        name='row-radio-button-group' value={category}>
                                                                        <FormControlLabel value="batchwise" control={<Radio/>} label="Batch Wise Fees Details New"  onChange={(e) => setCat(e.target.value)}  />
                                                                        <FormControlLabel value="feesrecord" control={<Radio />} label="Fees Record New" />
                                                                        <FormControlLabel value="facultypayment" control={<Radio />} label="Batch Wise Faculty Payment" />

                                                                    </RadioGroup>

                                                                </FormControl>
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <label for="exapmleFormControlSelect1">Course<span className="text-danger">*</span></label>
                                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    onChange={(e) => handlegetbatch(e.target.value)}
                                                    name="course"
                                                >
                                                    <option>Select Course</option>
                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        );
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.course} </span>}
                                                            </div>

                                                            <div class="form-group col-lg-3">
                                                                <lable for="exampleFormControlSelect1">Select Batch<span className="text-danger">*</span></lable>
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


                                                            <div class="form-group col-lg-3">
                                                                <lable for="exampleFormControlSelect1">Select Amount Type</lable>
                                                                <select class="form-control" id="exampleFormCpntrolSelect1" value={value.amounttype}
                                                                    name='amounttype' onChange={onhandleChange}>
                                                                    <option>All</option>

                                                                
                                                                </select>
                                                            </div>

                                                             <div class='p-4'>
                                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Excel</button>
                                                            </div>

                                                        </div>

                                                        <div className='row p-2 gap-2'>
                                                            <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Show</button>
                                                        </div>


                                                    </form>
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
        </div>

    )
}

export default FeesDetails