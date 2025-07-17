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
        Book_Name: "" || uid.Book_Name,
        Book_No: "" || uid.Book_No,
        Publisher: "" || uid.Publisher,
        Total_Pages: "" || uid.Total_Pages,
        Status: "" || uid.Status,
        Remark: "" || uid.Remark,
        Book_Course: "" || uid.Book_Course,
        Author: "" || uid.Author,
        Purchase_Dt: "" || uid.Purchase_Dt,
        Amount: "" || uid.Amount,
        RackNo: "" || uid.RackNo,


    })

    useEffect(() => {
        setValue({

            Book_Name: uid.Book_Name,
            Book_No: uid.Book_No,
            Publisher: uid.Publisher,
            Total_Pages: uid.Total_Pages,
            Status: uid.Status,
            Remark: uid.Remark,
            Book_Course: uid.Book_Course,
            Author: uid.Author,
            Purchase_Dt: uid.Purchase_Dt,
            Amount: uid.Amount,
            RackNo: uid.RackNo


        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.Book_Name) {
            isValid = false;
            newErrors.Book_Name = "Book Name is Required"
        }
        if (!value.Book_No) {
            isValid = false;
            newErrors.Book_No = "Book Number is Required"
        }

        if (!value.Book_Course || value.Book_Course === "") {
            isValid = false;
            newErrors.Book_Course = "Course Name is Required";
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
            tablename: "Library_Book_Mst"
        }
        axios.post(`${BASE_URL}/get_librarydata`, data)
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

    const handleUpdate = (Book_Id) => {
        const data = {
            u_id: Book_Id,
            tablename: "Library_Book_Mst"
        };

        axios.post(`${BASE_URL}/update_library_data`, data)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    const bookData = res.data[0];

                    // Handle date cleanup
                    const rawDate = bookData.Purchase_Dt;
                    let parsedDate = null;

                    if (rawDate && rawDate !== "00:00.0" && rawDate !== "Invalid Date") {
                        const tryDate = new Date(rawDate);
                        if (!isNaN(tryDate.getTime())) {
                            parsedDate = tryDate;
                        }
                    }

                    setUid(bookData);

                    setValue({
                        Book_Name: bookData.Book_Name || '',
                        Book_No: bookData.Book_No || '',
                        Publisher: bookData.Publisher || '',
                        Total_Pages: bookData.Total_Pages || '',
                        Status: bookData.Status || '',
                        Remark: bookData.Remark || '',
                        Book_Course: bookData.Book_Course || '',
                        Author: bookData.Author || '',
                        Purchase_Dt: parsedDate, // Null if invalid
                        Amount: bookData.Amount || '',
                        RackNo: bookData.RackNo || '',
                    });

                    console.log(res.data, "update");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "Library_Book_Mst"
        }

        axios.post(`${BASE_URL}/delete_librarydata`, data)
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

                Book_Name: value.Book_Name,
                Book_No: value.Book_No,
                Publisher: value.Publisher,
                Total_Pages: value.Total_Pages,
                Status: value.Status,
                Remark: value.Remark,
                Book_Course: value.Book_Course,
                Author: value.Author,
                Purchase_Dt: value.Purchase_Dt,
                Amount: value.Amount,
                RackNo: value.RackNo,
                uid: uid.Book_Id
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
                        Book_Id: '',
                        Book_Name: '',
                        Book_No: '',
                        Publisher: '',
                        Total_Pages: '',
                        Status: '',
                        Remark: '',
                        Book_Course: '',
                        Author: '',
                        Purchase_Dt: '',
                        Amount: '',
                        RackNo: '',
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
            field: 'Book_Id',
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 0.5,
            filterable: false,
        },
        { field: 'Book_Name', headerName: 'Book Name', flex: 1 },
        { field: 'Book_No', headerName: 'Book Number', flex: 1 },
        { field: 'Book_Course', headerName: 'Course Name', flex: 1 },
        {
            field: 'Purchase_Dt',
            headerName: 'Purchase Date',
            flex: 1,
            valueGetter: (params) => {
                if (!params.value) return '';
                const date = new Date(params.value);

                // Check for invalid date
                if (isNaN(date.getTime())) return '';

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
        },
        { field: 'RackNo', headerName: 'Rack No.', flex: 1 },

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


    const rowsWithIds = vendordata.map((row, index) => ({
        id: row.Book_Id ?? index + 1,  // Prefer Book_Id, fallback to index
        ...row,
    }));

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
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.Book_Name}
                                                    placeholder="Book Name*" name='Book_Name' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.Book_Name}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Book Number<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.Book_No}
                                                    placeholder="Book Number*" name='Book_No' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.Book_No}</span>}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Publication</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.Publisher}
                                                    placeholder="Publisher" name='Publisher' onChange={onhandleChange} />

                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Page</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    value={value.Total_Pages}
                                                    placeholder="Total_Pages"
                                                    name="Total_Pages"
                                                    onChange={(e) => {
                                                        const onlyNums = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                                        onhandleChange({ target: { name: 'Total_Pages', value: onlyNums } });
                                                    }}
                                                />

                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Status </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.Status} onChange={onhandleChange} name='Status'>
                                                    <option>Select Status</option>
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
                                                    name="Book_Course"
                                                    value={value.Book_Course}
                                                    onChange={onhandleChange}
                                                >
                                                    <option value="">--Select Course--</option>
                                                    {courses.map((course) => (
                                                        <option key={course.id} value={course.id}>
                                                            {course.Course_Name} {/* change to course.title or course.Book_Course if needed */}
                                                        </option>
                                                    ))}
                                                </select>

                                                {error.Book_Course && (
                                                    <span className="text-danger">{error.Book_Course}</span>
                                                )}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Author</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.Author} placeholder="Author" name='Author' onChange={onhandleChange} />

                                            </div>
                                            <div class="form-group col-lg-2" style={{ display: "flex", flexDirection: "column" }}>
                                                <label for="exampleInputUsername1">Purchase Date</label>
                                                <DatePicker
                                                    selected={
                                                        value.Purchase_Dt && !isNaN(new Date(value.Purchase_Dt)) && value.Purchase_Dt !== "00:00.0"
                                                            ? new Date(value.Purchase_Dt)
                                                            : null
                                                    }
                                                    onChange={(date) => onhandleChange({ target: { name: "Purchase_Dt", value: date } })}
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    dateFormat="dd-MM-yyyy"
                                                    placeholderText="Purchase Date"
                                                />


                                            </div>

                                            <div className="form-group col-lg-2">
                                                <label htmlFor="exampleInputUsername1">Price</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    value={value.Amount}
                                                    placeholder="Price"
                                                    name="Amount"
                                                    onChange={(e) => {
                                                        let input = e.target.value;

                                                        // Allow only digits and a single decimal point
                                                        input = input.replace(/[^0-9.]/g, ''); // Remove all except digits and .
                                                        input = input.replace(/(\..*)\./g, '$1'); // Allow only one dot

                                                        onhandleChange({ target: { name: 'Amount', value: input } });
                                                    }}
                                                />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Rack No.</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.RackNo} placeholder="Rack No." name='RackNo' onChange={onhandleChange} />
                                                <option value=""></option>
                                            </div>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Comment </label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.Remark} placeholder="Comment*" name='Remark' onChange={onhandleChange}></textarea>

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