import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { StyledDataGrid } from "./StyledDataGrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';

const NoticeBoard = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [specification, setSpecification] = useState("")
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });

    console.log(specification)

    const handleChange1 = (event) => {
      setChecked([event.target.checked, event.target.checked]);
    };
  
    const handleChange2 = (event) => {
      setChecked([event.target.checked, checked[1]]);
    };
  
    const handleChange3 = (event) => {
      setChecked([checked[0], event.target.checked]);
    };

    

    const [value, setValue] = useState({
        startdate : ""|| uid.startdate,
        enddate : ""|| uid.enddate,
        specification : ""|| uid.specification,

        


    })

    useEffect(() => {
        setValue({
            startdate : uid.startdate,
            enddate : uid.enddate,
            specification : uid.specification,

        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}
        
        

       if (!value.startdate) {
        isValid = false;
        newErrors.startdate = "Date is Required"
       }
        if (!value.enddate) {
            isValid = false;
            newErrors.enddate = "Date is Required"
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
            tablename : "awt_noticeboard"
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
            tablename : "awt_noticeboard"
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
            tablename : "awt_noticeboard"
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
            
            		

        startdate : value.startdate,
        enddate : value.enddate,
        specification: specification,
        uid : uid.id
        }


        axios.post(`${BASE_URL}/add_noticeboard`, data)
            .then((res) => {
               console.log(res)
               getEmployeeData()

               setValue({
                startdate: "",
                enddate: "",
                specification: "",
            });
            setSpecification("");

            })
            .catch((err) => {
                console.log(err)
            })
    }

   
        


    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

 
    const roledata = {
        role: Cookies.get(`role`),
        pageid: 92,
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
            flex: 1,
            filterable: false,
                                              
        },
        { 
            field: "startdate", 
            headerName: "Start Date", 
            flex: 2, 
            renderCell: ({ value }) => value ? new Date(value).toLocaleDateString("en-GB") : "" 
          },
          
          { 
            field: "enddate", 
            headerName: "End Date", 
            flex: 2, 
            renderCell: ({ value }) => value ? new Date(value).toLocaleDateString("en-GB") : "" 
          },
          
        { field: 'specification', headerName: 'Description', flex: 2, renderCell : (params) => {
            return (
                <>
                 <div dangerouslySetInnerHTML={{ __html: params.row.specification }}></div>
                </>
            )
        }},
        
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
                                    <h4 class="card-title">Add Notice</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3" style={{ display: "flex", flexDirection:"column"}}>
                                                <label for="exampleInputUsername1">Start Date<span className="text-danger" >*</span></label>
                                                <DatePicker
        selected={value.startdate ? new Date(value.startdate) : null}
        onChange={(date) => onhandleChange({ target: { name: "startdate", value: date.toISOString().split("T")[0] } })}
        className="form-control"
        id="startdate"
        placeholderText="Select Start Date"
        dateFormat="dd-MM-yyyy"
        minDate={new Date()} // Prevents selecting past dates
      />
                                                {<span className='text-danger'> {error.startdate} </span>}
                                            </div>

                                            <div class="form-group col-lg-3" style={{ display: "flex", flexDirection:"column"}}>
                                                <label for="exampleInputUsername1">End Date<span className="text-danger">*</span></label>
                                                <DatePicker
        selected={value.enddate ? new Date(value.enddate) : null}
        onChange={(date) => onhandleChange({ target: { name: "enddate", value: date.toISOString().split("T")[0] } })}
        className="form-control"
        id="enddate"
        placeholderText="Select End Date"
        dateFormat="dd-MM-yyyy"
        minDate={value.startdate ? new Date(value.startdate) : new Date()} // Prevents selecting before start date
      />
                                                {<span className='text-danger'> {error.enddate} </span>}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleTextarea1">Basic Study Preparation required<span className="text-danger">*</span></label>
                                                    <CKEditor
                                                    editor={ClassicEditor}
                                                  
                                                    data={uid.specification}
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
                                    <div className='d-flex justify-content-between' style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">View Notice Board</h4>
                                        </div>

                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
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
                                            pageSizeOptions= {[50]}
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

export default NoticeBoard
