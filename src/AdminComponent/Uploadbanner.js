import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';

const UploadBanner = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [image , setImage] = useState()
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

		

    const [value, setValue] = useState({
        titlename: "",
        seqno: "",
    });

    useEffect(() => {
        getVendorData();
        setValue({ titlename: "", seqno: "" });
        setError({});
        setUid({});
    }, []);

    useEffect(() => {
        if (uid.id) {
            setValue({
                titlename: uid.titlename,
                seqno: uid.seqno,
            });
        }
    }, [uid]);


    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!value.titlename) {
            isValid = false;
            newErrors.titlename = "Title Name is Required";
        }
        if (!value.seqno) {
            isValid = false;
            newErrors.seqno = "Seq. No. is Required";
        }
        setError(newErrors);
        return isValid;
    };


    
    const getVendorData = () => {
        const data = { tablename: "awt_uploadbanner" };
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data);
                setVendorData(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getVendorData()
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
            tablename : "awt_uploadbanner"
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
            tablename : "awt_uploadbanner"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getVendorData()

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
            
        titlename : value.titlename,
        seqno : value.seqno,
        file : value.file,
        uid : uid.id
        }

         const formdata = new FormData()

         formdata.append('image' , image)
         formdata.append('titlename' , value.titlename)
         formdata.append('seqno', value.seqno)
         if (uid.id) {
            formdata.append('uid', uid.id); 
        }


        axios.post(`${BASE_URL}/add_uploadbanner`, formdata)
            .then((res) => {
               console.log(res)
               getVendorData()
               setValue({ titlename: "", file: "", seqno: "" });
               setImage(null); // Reset i

            })
            .catch((err) => {
                console.log(err)
            })
    }
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    
    //     // Check if form is valid
    //     if (!validateForm()) {
    //         alert('Please fill in all required fields');
    //         return;
    //     }
    
    //     // Create a new FormData object
    //     const formdata = new FormData();
    
    //     // Append image to formdata if it exists
    //     if (image) {
    //         formdata.append('image', image);
    //     }
    
    //     // Append titlename and seqno to formdata
    //     if (value && value.titlename && value.seqno) {
    //         formdata.append('titlename', value.titlename);
    //         formdata.append('seqno', value.seqno);
    //     } else {
    //         alert('Please fill in titlename and seqno');
    //         return;
    //     }
    
    //     // Append uid to formdata if it exists
    //     if (uid && uid.id) {
    //         formdata.append('uid', uid.id);
    //     }
    
    //     console.log('FormData:', formdata);
    
    //     // Make POST request to add_uploadbanner endpoint
    //     axios.post(`${BASE_URL}/add_uploadbanner`, formdata)
    //         .then((res) => {
    //             console.log(res.data);
    //             getVendorData();
    //             setValue({ titlename: "", seqno: "" });
    //             setImage(null);
    //             setUid({});
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             const errorMessage = err.response?.data?.message || 'Something went wrong!';
    //             alert('Error: ' + errorMessage);
    //         });
    // };


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

 
    
    const onhandleupload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
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
        { field: 'titlename', headerName: 'Title Name', flex: 2},
        { field: 'file', headerName: 'File', flex: 2},
        { field: 'seqno', headerName: 'Seq. No.', flex: 2},
        
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

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Banner Image Details</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Image Title Name<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.titlename} placeholder='Title' name='titlename' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.titlename} </span>}
                                                
                                            </div>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1"></label>
                                                <input type="file" class="form-control" id="exampleInputUsername1" 
                                                value={value.file} name='file' onChange={onhandleupload} />
                                                
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Seq. No.<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" 
                                                value={value.seqno} placeholder='No.' name='seqno' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.seqno} </span>}
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
                                            <h4 class="card-title">View Banner Image</h4>
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

export default UploadBanner
