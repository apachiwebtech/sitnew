import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';
import { StyledDataGrid } from "./StyledDataGrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';

const LibraryBook = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [courses, setCourses] = useState([]);
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [loading, setLoading] = useState(true)
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });



    const [value, setValue] = useState({
        bookname: "" || uid.bookname,
        booknumber: "" || uid.booknumber,
        publication: "" || uid.publication,
        page: "" || uid.page,
        status: "" || uid.status,
        comment: "" || uid.comment,
        coursename: "" || uid.coursename,
        author: "" || uid.author,
        purchasedate: "" || uid.purchasedate,
        price: "" || uid.price,
        rackno: "" || uid.rackno


    })

    useEffect(() => {
        setValue({

            bookname: uid.bookname,
            booknumber: uid.booknumber,
            publication: uid.publication,
            page: uid.page,
            status: uid.status,
            comment: uid.comment,
            coursename: uid.coursename,
            author: uid.author,
            purchasedate: uid.purchasedate,
            price: uid.price,
            rackno: uid.rackno


        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.bookname) {
            isValid = false;
            newErrors.bookname = "Book Name is Required"
        }
        if (!value.booknumber) {
            isValid = false;
            newErrors.booknumber = "Book Number is Required"
        }

        if (!value.coursename || value.coursename === "") {
            isValid = false;
            newErrors.coursename = "Course Name is Required";
        }

        setError(newErrors)
        return isValid
    }

    async function fetchCourses() {
        try {
            const res = await axios.get(`${BASE_URL}/getCourses`);
            setCourses(res.data);
            setLoading(false);
        } catch (err) {
            console.log('Error fetching courses:', err);
        }
    }



    async function getLibraryData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    async function getLibraryData() {
        const data = {
            tablename: "awt_librarybook"
        }
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
                setLoading(false)

            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getLibraryData()
        value.title = ""
        setError({})
        setUid([])
        fetchCourses()
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
            tablename: "awt_librarybook"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data, "update")
                setValue({
                    bookname: '',
                    booknumber: '',
                    publication: '',
                    page: '',
                    status: '',
                    comment: '',
                    coursename: '',
                    author: '',
                    purchasedate: '',
                    price: '',
                    rackno: '',
                });

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_librarybook"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getLibraryData()

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

        if (validateForm()) {
            const data = {

                bookname: value.bookname,
                booknumber: value.booknumber,
                publication: value.publication,
                page: value.page,
                status: value.status,
                comment: value.comment,
                coursename: value.coursename,
                author: value.author,
                purchasedate: value.purchasedate,
                price: value.price,
                rackno: value.rackno,
                uid: uid.id
            }


            axios.post(`${BASE_URL}/add_librarybook`, data)
                .then((res) => {
                    console.log(res)
                    getLibraryData()
                    if (res.data === "Data Inserted") {
                        alert("Data Added Successfully");
                    } else if (res.data === "Data Updated") {
                        alert("Data Updated Successfully");
                    }

                    setValue({
                        bookname: '',
                        booknumber: '',
                        publication: '',
                        page: '',
                        status: '',
                        comment: '',
                        coursename: '',
                        author: '',
                        purchasedate: '',
                        price: '',
                        rackno: '',
                    });


                })
                .catch((err) => {
                    if (err.response && err.response.status === 409) {
                        alert(err.response.data.message || "Duplicate Book Number!");
                    } else {
                        alert("Something went wrong!");
                    }
                    console.log(err)
                })
        }





    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    const roledata = {
        role: Cookies.get(`role`),
        pageid: 20
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])



    const columns = [
        {
            field: 'index',
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 0.5,
            filterable: false,
        },
        { field: 'bookname', headerName: 'Book Name', flex: 1 },
        { field: 'booknumber', headerName: 'Book Number', flex: 1 },
        { field: 'coursename', headerName: 'Course Name', flex: 1 },
        {
            field: 'purchasedate',
            headerName: 'Purchase Date',
            flex: 1,
            valueGetter: (params) => {
                if (!params.value) return '';
                const date = new Date(params.value);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
        },
        { field: 'rackno', headerName: 'Rach No.', flex: 1 },

        ...(roleaccess > 2 ? [{
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess >= 2 && (<EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />)}
                        {roleaccess > 3 && (<DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />)}
                    </>
                )
            }
        },] : [])
    ];


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />

            {loading && <Loader />}

            <div class="main-panel" style={{ display: loading ? "none" : "block" }}>
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Library Book Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Book Name<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.bookname}
                                                    placeholder="Book Name*" name='bookname' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.bookname}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Book Number<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.booknumber}
                                                    placeholder="Book Number*" name='booknumber' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.booknumber}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Publication</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.publication}
                                                    placeholder="Publication" name='publication' onChange={onhandleChange} />

                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Page</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.page} placeholder="Page" name='page' onChange={onhandleChange} />

                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Status </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.status} onChange={onhandleChange} name='status'>
                                                    <option></option>
                                                    <option value="1">Current</option>
                                                    <option value="2">Non-Current</option>

                                                </select>
                                            </div>


                                            <div className="form-group col-lg-2">
                                                <label htmlFor="exampleFormControlSelect1">
                                                    Course Name <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    name="coursename"
                                                    value={value.coursename}
                                                    onChange={onhandleChange}
                                                >
                                                    <option value="">--Select Course--</option>
                                                    {courses.map((course) => (
                                                        <option key={course.id} value={course.id}>
                                                            {course.Course_Name} {/* change to course.title or course.coursename if needed */}
                                                        </option>
                                                    ))}
                                                </select>

                                                {error.coursename && (
                                                    <span className="text-danger">{error.coursename}</span>
                                                )}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Author</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.author} placeholder="Author" name='author' onChange={onhandleChange} />

                                            </div>
                                            <div class="form-group col-lg-2" style={{ display: "flex", flexDirection: "column" }}>
                                                <label for="exampleInputUsername1">Purchase Date</label>
                                                <DatePicker
                                                    selected={value.purchasedate ? new Date(value.purchasedate) : null}
                                                    onChange={(date) => onhandleChange({ target: { name: "purchasedate", value: date } })}
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    dateFormat="dd-MM-yyyy"
                                                    placeholderText="Purchase Date"
                                                />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Price</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.price} placeholder="Price" name='price' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Rack No.</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.rackno} placeholder="Rack No." name='rackno' onChange={onhandleChange} />
                                                <option value=""></option>
                                            </div>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Comment </label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.comment} placeholder="Comment*" name='comment' onChange={onhandleChange}></textarea>

                                            </div>



                                        </div>




                                        {roleaccess > 2 && <button type="submit" class="btn btn-primary mr-2">Submit</button>}
                                        {roleaccess > 2 && <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>}
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'
                                        style={{ borderBottom: "2px solid #dce4ec", width: "100%" }}>
                                        <div>
                                            <h4 class="card-title">View Library Book Details</h4>
                                        </div>

                                    </div>

                                    <div style={{ borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden" }}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
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



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default LibraryBook