import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const UploadTestimonial = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [hide, setHide] = useState([])
    const [vindordata, setStudent] = useState([])
    const [courseid, setCourseid] = useState([])
    const navigate = useNavigate();
    const [batchid, setBatch] = useState('')
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });

    const [value, setValue] = useState({
        course: "",
        batch: "",




    })

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

    const getBatch = async (id) => {
        setCourseid(id)
        const data = {
            courseid: id
        }

        if (id) {
            try {
                const res = await
                    axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                setAnnulBatch(res.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            try {
                const res = await
                    axios.get(`${BASE_URL}/getbatch`);
                setAnnulBatch(res.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

    };

    useEffect(() => {
        setValue({
            course: uid.course,
            batch: uid.batch,

        })
        getBatch()
    }, [uid])



    async function getDatas() {

        axios.post(`${BASE_URL}/gettestimonial`)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDatas()
        getCourseData()
        getBatch()
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
            tablename: "awt_uploadtestimonial"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_uploadtestimonial"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {

                setValue({
                    course: "",
                    batch: "",
                });
                setUid([]);

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
        console.log("Submitting data:", value);
        const data = {

            course: value.course,
            batch: value.batch,
            uid: uid.length > 0 ? uid.id : undefined
        }
        console.log("Data being sent to the server:", data);

        axios.post(`${BASE_URL}/add_uploadtestimonial`, data)
            .then((res) => {
                console.log(res)

            })
            .catch((err) => {
                console.log(err)
            })

    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const roledata = {
        role: Cookies.get(`role`),
        pageid: 96,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);



    const columns = [

        { field: 'Batch_code', headerName: 'Batch Name', flex: 1 },
        { field: 'Course_Name', headerName: 'Course Name', flex: 2 },
        { field: 'Student_Name', headerName: 'Student Name', flex: 2 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess > 2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => navigate(`/uploadtestimonial/${params.row.Id}`)} />}
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Id)} />}
                    </>
                )
            }
        },
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        {/* <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Testimonial Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Course<span className="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={value.course} name='course' onChange={(e) => {
                                                        getBatch(e.target.value);
                                                        onhandleChange(e);
                                                    }}>
                                                    <option value="">Select Course</option>
                                                    {course.map((item) => (
                                                        <option key={item.Course_Id} value={item.Course_Id}>{item.Course_Name}</option>
                                                    ))}
                                                </select>
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch</label>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={value.batch} name='batch' onChange={onhandleChange}>
                                                    <option value="">Select Batch</option>
                                                    {batch.map((item) => (
                                                        <option key={item.Batch_code} value={item.Batch_code}>{item.Batch_code}</option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>


                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>

                                    </form>

                                </div>
                            </div>
                        </div> */}
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between '>
                                        <div>
                                            <h4 class="card-title">View Testimonial Details</h4>
                                        </div>
                                        <Link to="/uploadtestimonial/:testimonialid">
                                            {" "}
                                            <button className="btn btn-success my-2">Add +</button>
                                        </Link>

                                    </div>

                                    <div style={{ border: "1px solid #dce4ec", height: "510px", overflow: "hidden" }}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Id}
                                            pagination
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={setPaginationModel}
                                            pageSizeOptions={[50]}
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

                                        {confirmationVisibleMap[cid] && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                    </div>


                                    {/* <div>
                                      <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Excel</button>
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

export default UploadTestimonial 
