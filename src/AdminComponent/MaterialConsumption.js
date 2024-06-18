import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LibraryBooks } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MaterialConsumption = () => {


    // const [date, setDate] = useState('');

    // useEffect(() => {
    //     const currentDate = new Date();
    //     const year = currentDate.getFullYear();
    //     let month = currentDate.getMonth() + 1;
    //     month = month < 10 ? '0' + month : month;
    //     let day = currentDate.getDate();
    //     day = day < 10 ? '0' + day : day;
    //     const formattedDate = `${year}-${month}-${day}`;
    //     setDate(formattedDate);
    // }, []);


    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [specification, setSpecification] = useState("")
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

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

    // const children = (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    //       <FormControlLabel
    //         label="Child 1"
    //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label="Child 2"
    //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );

    const [value, setValue] = useState({
        isussed: "" || uid.isussed,
        startdate: "" || uid.startdate,
        course: "" || uid.course,
        qtyinstock: "" || uid.qtyinstock,
        batchno: "" || uid.batchno,
        student: "" || uid.student,
        selectitem: "" || uid.selectitem,
        qtyissue: "" || uid.qtyissue,
        price: "" || uid.price,
        ammounts: "" || uid.ammounts,
        purpose: "" || uid.purpose,

    })

    useEffect(() => {
        setValue({

            isussed: uid.isussed,
            startdate: uid.startdate,
            course: uid.course,
            qtyinstock: uid.qtyinstock,
            batchno: uid.student,
            student: uid.student,
            selectitem: uid.selectitem,
            qtyissue: uid.qtyissue,
            price: uid.price,
            ammounts: uid.ammounts,
            purpose: uid.purpose,

        })
    }, [uid])


    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}


    //    if (!value.college) {
    //     isValid = false;
    //     newErrors.name = "Name is require"
    //    }
    //     if (!value.email) {
    //         isValid = false;
    //         newErrors.email = "Email is require"
    //     }
    //     setError(newErrors)
    //     return isValid
    // }


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
            tablename: "awt_materialconsumption"
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
            u_id: id,
            tablename: "awt_materialconsumption"
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
            tablename: "awt_materialconsumption"
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

        // if(validateForm()){
        const data = {



            isussed: value.isussed,
            startdate: value.startdate,
            course: value.course,
            qtyinstock: value.qtyinstock,
            batchno: value.batchno,
            student: value.student,
            selectitem: value.selectitem,
            qtyissue: value.qtyissue,
            price: value.price,
            ammounts: value.ammounts,
            purpose: value.purpose,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_materialconsumption`, data)
            .then((res) => {
                console.log(res)
                getEmployeeData()

            })
            .catch((err) => {
                console.log(err)
            })
        // }





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
        { field: 'isussed', headerName: 'Isussed', flex: 2 },
        { field: 'startdate', headerName: 'Start Date', flex: 2 },
        { field: 'course', headerName: 'Course', flex: 2 },
        { field: 'qtyinstock', headerName: 'QTY Instock', flex: 2 },
        { field: 'batchno', headerName: 'Batch No.', flex: 2 },
        { field: 'student', headerName: 'Student', flex: 2 },
        { field: 'selectitem', headerName: 'Select Item', flex: 2 },
        { field: 'qtyissue', headerName: 'QTY Issue', flex: 2 },
        { field: 'price', headerName: 'Price', flex: 2 },
        { field: 'ammounts', headerName: 'Ammounts', flex: 2 },
        { field: 'purpose', headerName: 'Purpose', flex: 2 }, 

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
                                    <h4 class="card-title">Add Material Consumption</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleFormControlSelect1">Isussed By</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.isussed} name='isussed' onChange={onhandleChange}>
                                                    <option>Select</option>
                                                    <option> Vivek Vijay Meghade</option>
                                                    <option>Aakash Vaijnath Shirsat</option>
                                                    <option>Akanksha Anil Tambe</option>
                                                    <option>Aniket Suryakant Parab</option>
                                                    <option>Anisha Ajay Haryan</option>
                                                    <option>Ankit Jaideep Nijai</option>
                                                    <option>Atharva Vijay Prabhu</option>
                                                    <option>Balkrishna  Tirodkar</option>
                                                    <option>Charudatta Kashinath Dabholkar</option>
                                                    <option>Chetan Narayan Masurkar</option>
                                                    <option>Harshada Harishchandra Vajantri</option>
                                                    <option>Harshada Harishchandra Vajantri</option>
                                                    <option>Jeena Peter Fernandes</option>
                                                    <option>Kiran Chandrakant Panchal</option>
                                                    <option>Lavanya Komaraiah Mandvaraj</option>
                                                    <option>Manasi Mahesh Panchal</option>
                                                    <option>Mansi Suresh Sakat</option>
                                                    <option>Mayur Dattatraya Patil</option>
                                                    <option>Parag Digambar Mestry</option>
                                                    <option>Parag Vikas Nikam</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Start Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.startdate} name='startdate' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleFormControlSelect1">Select Course</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} name='course' onChange={onhandleChange}>
                                                    <option>Select Course</option>
                                                    <option> Training in Process Plant System Modelling Using E3D</option>
                                                    <option>Advance Pipe Stress Analysis </option>
                                                    <option>Air Conditioning System Design (HVAC)</option>
                                                    <option>Autocad - Piping</option>
                                                    <option>Basics AutoCAD – 2D</option>
                                                    <option>Civil/Structural Design &amp; Drafting </option>
                                                    <option>Electrical &amp; Instrumentation Design and Drafting </option>
                                                    <option>Electrical System Design</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Qty In Stock</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.qtyinstock} placeholder='Qty In Stock' name='qtyinstock' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Select Batch</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batchno} name='batchno' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Select Student</label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1" value={value.student} name='student' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleFomrControlSelect1">Select Item</label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1" value={value.selectitem} name='selectitem' onChange={onhandleChange}>
                                                    <option>Select Material Type</option>
                                                    <option>PEN</option>
                                                    <option>Apsara Pencil</option>
                                                    <option>Asignment front Pages</option>
                                                    <option>A4 Papers</option>
                                                    <option>A3 Papers</option>
                                                    <option>A2 Papers</option>
                                                    <option>Blue Pen</option>
                                                    <option>Bags for gifts</option>
                                                    <option>CD Markers</option>
                                                    <option>Dusters</option>
                                                    <option>Erasers</option>
                                                    <option>Full Size Papers</option>
                                                    <option>Glue Sticks</option>
                                                    <option>Gift Pens</option>
                                                    <option>Highlighters</option>
                                                    <option>Leads</option>
                                                </select>
                                            </div>


                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsername1">Qty Issue</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.qtyissue} placeholder='Quantity' name='qtyissue' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exmpaleInputUsername">Price</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.price} placeholder='Price' name='price' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <lable for="exampleInputUsernamae">Total Ammounts</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.ammounts} placeholder='Total Ammount' name='ammounts' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Purpose</label>
                                                <textarea class="form-control" id="exampleTextarea1" name='purpose' value={value.purpose} placeholder="Purpose" onChange={onhandleChange}></textarea>

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
                                            <h4 class="card-title">View Batch Transfer</h4>
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

export default MaterialConsumption
