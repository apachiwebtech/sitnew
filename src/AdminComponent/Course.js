import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid ,GridToolbar } from '@mui/x-data-grid';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Course = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [specification, setSpecification] = useState("")
    const [specification2, setSpecification2] = useState("")
    const [specification3, setSpecification3] = useState("")
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

 

    const [value, setValue] = useState({
        course: "" || uid.course,
        course_code: "" || uid.course_code,
        eligibility: "" || uid.eligibility,
        introduction: "" || uid.introduction,
        specification: "" || uid.specification,
        specification2: "" || uid.specification2,
        specification3: "" || uid.specification3

    })

    useEffect(() => {
        setValue({
            course: uid.course,
            course_code: uid.course_code,
            eligibility: uid.eligibility,
            introduction: uid.introduction,
            specification : uid.specification,
            specification2 : uid.specification2,
            specification3 : uid.specification3
        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.course) {
            isValid = false;
            newErrors.name = "Name is require"
        }

        setError(newErrors)
        return isValid
    }


    async function getCourseData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    async function getCourseData() {
        const data = {
            tablename: "awt_course"
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

    useEffect(() => {
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
            tablename: "awt_course"
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
            tablename: "awt_course"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getCourseData()

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

        // if (validateForm()) {
            const data = {
                course: value.course,
                course_code: value.course_code,
                eligibility: value.eligibility,
                introduction: value.introduction,
                specification :specification,
                specification2 :specification2,
                specification3 :specification3,
                uid : uid.id
            }


            axios.post(`${BASE_URL}/add_course`, data)
                .then((res) => {
                    console.log(res)
                    getCourseData()

                })
                .catch((err) => {
                    console.log(err)
                })
        //}





    }


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
        { field: 'course', headerName: 'Course Name', flex: 2 },
        { field: 'course_code', headerName: 'Course Code', flex: 2 },
        { field: 'eligibility', headerName: 'Eligibility', flex: 2 },
        { field: 'introduction', headerName: 'Introduction', flex: 2 },
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

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Course Information</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Course Name<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.course} placeholder="Course Name*" name='course' onChange={onhandleChange} />
                                                {error.course && <span className='text-danger'>{error.course}</span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Course Code</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.course_code} placeholder="Course Code*" name='course_code' onChange={onhandleChange} />
                                                {error.course_code && <span className='text-danger'>{error.course_code}</span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleTextarea1">Eligibility</label>
                                                <textarea class="form-control" id="exampleTextarea1" name='eligibility' value={value.eligibility} placeholder="Eligibility*" onChange={onhandleChange}></textarea>
                                                {error.eligibility && <div className="text-danger">{error.eligibility}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Introduction</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.introducation} placeholder="Introduction" name='introduction' onChange={onhandleChange} />
                                                
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleTextarea1">Key Points of Syllabus:</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    // data={uid.specification}
                                                    onReady={editor => {
                                                        // Allows you to store the editor instance and use it later.
                                                        // console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setSpecification(data)
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        // console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        // console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>

                                            <div class="form-group col-lg-6">
                                            <label for="exampleTextarea1">Objective:</label>
                                                 <CKEditor
                                                    editor={ClassicEditor}
                                                    // data={uid.specification}
                                                    onReady={editor => {
                                                    // Allows you to store the editor instance and use it later.
                                                    // console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setSpecification2(data)
                                                    }}
                                                    onBlur={(event, editor) => {
                                                    // console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                    // console.log('Focus.', editor);
                                                    }}
                                                    />
                                            </div>
                                            

                                            <div class="form-group col-lg-6">
                                            <label for="exampleTextarea1">Basic Study Preparation required:</label>
                                                 <CKEditor
                                                    editor={ClassicEditor}
                                                    // data={uid.specification}
                                                    onReady={editor => {
                                                    // Allows you to store the editor instance and use it later.
                                                    // console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setSpecification3(data)
                                                    }}
                                                    onBlur={(event, editor) => {
                                                    // console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                    // console.log('Focus.', editor);
                                                    }}
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
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">View Course Information</h4>
                                            
                                        </div>

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
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

export default Course