import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid ,GridToolbar} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LibraryBooks } from '@mui/icons-material';


const Feedback = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
      setChecked([event.target.checked, event.target.checked]);
    };
  
    const handleChange2 = (event) => {
      setChecked([event.target.checked, checked[1]]);
    };
  
    const handleChange3 = (event) => {
      setChecked([checked[0], event.target.checked]);
    };

    // const suggestion = (
    //     <Box sx={{flexDirection: 'column', }}>
    //       <FormControlLabel
    //         label="Suggestion Required"
    //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label="Brief answer required"
    //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );

        const [selectedOption, setSelectedOption] = useState('');
      
        //Function to handle radio button change
        const handleOptionChange = (event) => {
          setSelectedOption(event.target.value);
        };




    const [value, setValue] = useState({
        questionfor : ""|| uid.questionfor,
        category : ""|| uid.category,
        question : ""|| uid.question,
        selection : ""|| uid.selection,
        order : ""|| uid.order


    })

    useEffect(() => {
        setValue({

        questionfor : uid.questionfor,
        category : uid.category,
        question : uid.question,
        selection : uid.selection,
        order :uid.order
   

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


    async function getFeedData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    async function getFeedData() {
        const data = {
            tablename : "awt_feedback"
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
        getFeedData()
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
            tablename : "awt_feedback"
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
            tablename : "awt_feedback"
        }

        axios.post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getFeedData()

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
            
        questionfor : value.questionfor,
        category : value.category,
        question : value.question,
        selection : value.selection,
        order :value.order,
        uid : uid.id
        }


        axios.post(`${BASE_URL}/add_feedback`, data)
            .then((res) => {
               console.log(res)
               getFeedData()

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
        { field: 'questionfor', headerName: 'Question For', flex: 2 },
        { field: 'question', headerName: 'Question', flex: 2 },
        { field: 'order', headerName: 'Question Order', flex: 2},
        
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
                                    <h4 class="card-title">Feedback Questions</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Question For </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.questionfor} onChange={onhandleChange} name='questionfor'>
                                                    <option>Question For</option>
                                                    <option>Training in Process Plant System Modelling Using E3D</option>
                                                    <option>Advance Pipe Stress Analysis</option>
                                                    <option>Air Conditioning System Design (HVAC)</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Category </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.category} onChange={onhandleChange} name='category'>
                                                    <option>Category</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                </select>
                                            </div>
                                            
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Selection Type</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.selection} onChange={onhandleChange} name='selection'>
                                                    <option>Select</option>
                                                    <option>FreeTextBox</option>
                                                    <option>Numeric</option>
                                                    <option>Multiple Selection</option>
                                                    <option>Yes /No /May Be</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Order</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.order} placeholder="Order" name='order' onChange={onhandleChange} />
                                               
                                            </div>


                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Question</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.question} placeholder="Question" name='question' onChange={onhandleChange} />
                                               
                                            </div>

                                            

                                        </div>
                                        <div>
                                            <div>
                                                <label>
                                                    <input
                                                    name='suggestion'
                                                    type="radio"
                                                    value="Suggestion Required"
                                                    checked={selectedOption === "Suggestion Required"}
                                                    onChange={handleOptionChange}
                                                    />
                                                    Suggestion Required
                                                </label>

                                                <label className='mx-5'>
                                                    <input
                                                    name='brief'
                                                    type="radio"
                                                    value="Brief answer required"
                                                    checked={selectedOption === "Brief answer required"}
                                                    onChange={handleOptionChange}
                                                    />
                                                    Brief answer required
                                                </label>


                                                <div>Selected option: {selectedOption}</div>
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
                                            <h4 class="card-title">Feedback Details</h4>
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

export default Feedback