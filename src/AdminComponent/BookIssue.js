import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import Cookies from "js-cookie";

const BookIssue = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [batch, setBatch] = useState([])
    const [course, setCourse] = useState([])
    const [book, setBook] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [batchid, setBatchid] = useState('')
    const [courseid, setCourseid] = useState('')
    const [bookid, setBookid] = useState('')
    const [student, setStudent] = useState([])

    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });



    const [value, setValue] = useState({
        student: "" || uid.student,
        book: "" || uid.book,
        bookcode: "" || uid.bookcode,
        issuedate: new Date() || uid.issuedate,
        returndate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) || uid.status,



    })

    useEffect(() => {
        setValue({
            student: uid.student,
            book: uid.book,
            bookcode: uid.bookcode,
            issuedate: new Date() || uid.issuedate,
            returndate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) || uid.returndate,


        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.student) {
            isValid = false;
            newErrors.student = "Student is Required"
        }
        if (!value.book) {
            isValid = false;
            newErrors.book = "Book is Required"
        }
        setError(newErrors)
        return isValid
    }








    useEffect(() => {
        value.title = ""
        setError({})
        setUid([])
        getCourseData()
        getBatchData()
        getBook()
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
            tablename: "awt_bookissue"
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
            tablename: "awt_bookissue"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                // getBookData()

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

                student: value.student,
                book: value.book,
                bookcode: value.bookcode,
                issuedate: value.issuedate,
                returndate: value.returndate,
                uid: uid.id
            }


            axios.post(`${BASE_URL}/add_bookissue`, data)
                .then((res) => {
                    console.log(res)
                    // getBookData()

                })
                .catch((err) => {
                    console.log(err)
                })
        }





    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const getCourseData = () => {

        const data = {
            tablename: "Course_Mst",
            columnname: "Course_Id,Course_Name"
        }

        axios.post(`${BASE_URL}/get_new_data`, data)
            .then((res) => {
                console.log(res.data)
                setCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getBook = () => {

        const data = {
            tablename: "awt_librarybook",
            columnname: "id,bookname"
        }

        axios.post(`${BASE_URL}/get_book`, data)
            .then((res) => {
                console.log(res.data)
                setBook(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getBatchData = async (id) => {
        setCourseid(id)
        const data = {
            courseid: id
        }


        if (id) {
            axios.post(`${BASE_URL}/getcoursewisebatch`, data)
                .then((res) => {
                    console.log(res.data)
                    setBatch(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            try {
                const res = await axios.get(`${BASE_URL}/getbatch`, data);

                setBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


    }



    const getStudent = async (code) => {
        setBatchid(code)
        const data = {
            batch_code: code
        }
        if (code) {
            axios.post(`${BASE_URL}/getbatchwisestudent`, data)
                .then((res) => {

                    setStudent(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_new_data`,
                    {
                        tablename: "Student_Master",
                        columnname: "Student_Id,Student_Name"
                    });

                setStudent(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


    }


    const roledata = {
        role: Cookies.get(`role`),
        pageid: 37,
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
            flex: 0.5,
            filterable: false,
        },
        { field: 'student', headerName: 'Student Name', flex: 2 },
        { field: 'book', headerName: 'Book', flex: 2 },
        { field: 'bookcode', headerName: 'Book Code', flex: 2 },
        {
            field: "issuedate",
            headerName: "Issue Date",
            flex: 1.5,
            renderCell: (params) => {
                if (!params.value) return ""; // Handle empty values

                // Check if already in DD-MM-YYYY format
                const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
                if (ddmmyyyyRegex.test(params.value)) {
                    return params.value; // Return as-is if already formatted
                }

                const date = new Date(params.value);
                if (isNaN(date.getTime())) return ""; // Handle invalid dates

                // Convert to DD-MM-YYYY format
                return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
        },

        {
            field: "returndate",
            headerName: "Return Date",
            flex: 1.5,
            renderCell: (params) => {
                if (!params.value) return ""; // Handle empty values

                // Check if already in DD-MM-YYYY format
                const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
                if (ddmmyyyyRegex.test(params.value)) {
                    return params.value; // Return as-is if already formatted
                }

                const date = new Date(params.value);
                if (isNaN(date.getTime())) return ""; // Handle invalid dates

                // Convert to DD-MM-YYYY format
                return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
        },


        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess > 2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />}
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />}
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
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Book Issue Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Course<span className="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={courseid} name='coursename' onChange={(e) => getBatchData(e.target.value)}>
                                                    <option>Select Course</option>
                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>

                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.coursename} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch No.</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={batchid} name='oldbatchno' onChange={(e) => getStudent(e.target.value)}>
                                                    <option>Select Batch</option>
                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>

                                                        )
                                                    })}
                                                </select>
                                                {<span className="text-danger">{error.oldbatchno} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFomrControlSelect1">Student</label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.student} name='student' onChange={onhandleChange}>

                                                    <option>Select Student</option>
                                                    {student.map((item) => {
                                                        return (
                                                            <option value={item.Student_Id}>{item.Student_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className="text-danger"> {error.student} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Book<span className="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={bookid} name='coursename' onChange={onhandleChange}>
                                                    <option>Select Book</option>
                                                    {book.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.bookname}</option>

                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.coursename} </span>}
                                            </div>
                                            {/* <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Book Code</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.bookcode}
                                                    placeholder="Book Code*" name='bookcode' onChange={onhandleChange} />
                                            </div> */}
                                            <div className="form-group col-lg-3" style={{ display: "flex", flexDirection: "column" }}>
                                                <label htmlFor="exampleInputUsername1">Issue Date</label>
                                                <DatePicker
                                                    selected={value.issuedate}
                                                    onChange={(date) =>
                                                        onhandleChange({ target: { name: "issuedate", value: date } })
                                                    }
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    dateFormat="dd-MM-yyyy"
                                                    placeholderText="Select Issue Date"
                                                    disabled
                                                />
                                            </div>
                                            <div class="form-group col-lg-3" style={{ display: "flex", flexDirection: "column" }}>
                                                <label for="exampleInputUsername1">Return Date</label>
                                                <DatePicker
                                                    selected={value.returndate ? new Date(value.returndate) : null}
                                                    onChange={(date) => onhandleChange({ target: { name: "returndate", value: date } })}
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    dateFormat="dd-MM-yyyy"
                                                    placeholderText="Select Return Date"
                                                    disabled 
                                                />

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
                                    <div className='d-flex justify-content-between' style={{ borderBottom: "2px solid #dce4ec", width: "100%" }}>
                                        <div>
                                            <h4 class="card-title">Book Issue</h4>
                                        </div>

                                    </div>

                                    <div style={{ borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden" }}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            getRowId={(row) => row.id}
                                            disableColumnSelector
                                            disableDensitySelector
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

export default BookIssue