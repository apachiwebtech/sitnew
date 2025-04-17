import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL, IMG_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { StyledDataGrid } from "./StyledDataGrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FestivalPhoto = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [image , setImage] = useState()
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });
    const [checked, setChecked] = React.useState([true, false]);


    const [value, setValue] = useState({
        startdate : ""|| uid.startdate,
        enddate : ""|| uid.enddate,
        file : ""|| uid.file,
        description : ""|| uid.description,

        


    })

    useEffect(() => {
        setValue({
            startdate : uid.startdate,
            enddate : uid.enddate,
            file : uid.file,
            description :uid.description,

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
        if (!value.description) {
            isValid = false;
            newErrors.description = "Description is Required"
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
            tablename : "awt_festival_photo"
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
            tablename : "awt_festival_photo"
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
            tablename : "awt_festival_photo"
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
        // const data = {
            
        // startdate : value.startdate,
        // enddate : value.enddate,
        // file : value.file,
        // description :value.description,
        // uid : uid.id
        // }

         const formdata = new FormData()

         formdata.append('image' , image)
         formdata.append('startdate' , value.startdate)
         formdata.append('enddate', value.enddate)
         formdata.append('description', value.description)
         formdata.append('uid', uid.id)
     

        axios.post(`${BASE_URL}/add_festival_photo`, formdata)
            .then((res) => {
               console.log(res)
               getEmployeeData()
               
               setValue({
                startdate: "",
                enddate: "",
                file: "",
                description: "",
            });
            setImage(null);

            })
            .catch((err) => {
                console.log(err)
            })
    }

    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

 
    
   const onhandleupload = (e) =>{
   const image = e.target.files[0]
   setImage(image)
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
        {
            field: "startdate",
            headerName: "Start Date",
            flex: 2,
            renderCell: (params) =>
              params.value
                ? /^\d{2}-\d{2}-\d{4}$/.test(params.value) // Check if already in DD-MM-YYYY format
                  ? params.value
                  : new Date(params.value).toLocaleDateString("en-GB") // Convert valid dates
                : "",
          },
          
        {
            field: "enddate",
            headerName: "End Date",
            flex: 2,
            renderCell: (params) =>
              params.value
                ? /^\d{2}-\d{2}-\d{4}$/.test(params.value) // Check if already in DD-MM-YYYY format
                  ? params.value
                  : new Date(params.value).toLocaleDateString("en-GB") // Convert valid dates
                : "",
          },
          
        { field: 'description', headerName: 'Description', flex: 2},
        {
            field: 'file',
            headerName: 'Image',
            flex: 2,
            renderCell: (params) => (
                <img 
                    src={`${IMG_URL}/${params.row.file}`} 
                    alt="Festival photo" 
                    style={{ width: '50px',padding:'5px', objectFit: 'cover' }}
                />
            ),
        },
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

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Festival Photos Upload</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-2" style={{ display: "flex", flexDirection: "column"}}>
                                                <label for="exampleInputUsername1">Start Date<span className="text-danger">*</span></label>
                                                <DatePicker
        selected={value.startdate ? new Date(value.startdate) : null}
        onChange={(date) => onhandleChange({ target: { name: "startdate", value: date.toISOString().split("T")[0] } })}
        className="form-control"
        id="startdate"
        placeholderText="Select Start Date"
        dateFormat="dd-MM-yyyy"
        minDate={new Date()} // Prevents past dates
      />
                                                {<span className='text-danger'> {error.startdate} </span>}
                                            </div>

                                            <div class="form-group col-lg-2" style={{ display: "flex", flexDirection: "column"}}>
                                                <label for="exampleInputUsername1">End Date <span className="text-danger">*</span></label>
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

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1"></label>
                                                <input type="file" class="form-control" id="exampleInputUsername1"
                                                 value={value.image} name='file' onChange={onhandleupload} />
                                                
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleTextarea1">Description<span className='text-danger'>*</span></label>
                                                <textarea class="form-control" id="exampleTextarea1" 
                                                value={value.description} placeholder="Description" 
                                                name='description' onChange={onhandleChange}></textarea>
                                                {<span className='text-danger'> {error.description} </span>}
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
                                            <h4 class="card-title">View Festival Photos</h4>
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

export default FestivalPhoto
