import React from 'react'
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
import { Button, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

const AdmissionForm = () => {
  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                 
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Edit Inquiry</h4>
                                                    </div>
                                                    <div className='row'>
                                                    <div className="form-group col-lg-8 ">
                                                        <label for="exampleInputUsername1">Name<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='firstname' onChange='' />
                                                    </div>
                                                    
                                                    <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">Gender</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='gender' onChange='' >
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                  
                                                    </div>
                                                    <div className='row'>
                                                    <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">Date Of Brith</label>
                                                        <input type="date" class="form-control" id="exampleInputUsername1" value='' placeholder="Contact Person" name='dob' onChange='' />

                                                    </div>
                                                    <div className='form-group col-4'>
                                                                <label for="exampleInputUsername1">Mobile</label>
                                                                <input type="number" className="form-control" id="exampleInputUsername1" value='' placeholder="Number" name='mobile' onChange='' />
                                                            </div>
                                                            <div className='form-group col-4'>
                                                                <label for="exampleInputUsername1">Whatsapp Number</label>
                                                                <input type="number" className="form-control" id="exampleInputUsername1" value='' placeholder="Number" name='whatsapp' onChange='' />
                                                            </div>
                                                    </div>
                                                   
                                                   
                                                    <div className='row'>
                                                    <div className="form-group col-lg-6 ">
                                                        <label for="exampleInputUsername1">Email<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='email' onChange='' />
                                                    </div>
                                                    <div className="form-group col-lg-3 ">
                                                        <label for="exampleInputUsername1">Nationality<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Nationality*" name='nationality' onChange='' />
                                                        
                                                    </div>

                                                    <div className="form-group col-lg-3 ">
                                                        <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='country' onChange='' />
                                                        
                                                    </div>
                                                    </div>
                                                    
                                                    <div className="form-group col-lg-12 p-0">
                                                        <label for="exampleTextarea1">Discussion </label>
                                                        <textarea className="form-control" id="exampleTextarea1" value='' placeholder="Discussion" name='discussion' onChange=''></textarea>

                                                    </div>
                                                  
                                                </div>
                                            </div>
                                           
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Status Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                    <div class="form-group col-lg-6 ">
                                                        <label for="exampleInputUsername1">Date</label>
                                                        <input type="date" className="form-control" id="exampleInputUsername1" value='' placeholder="Contact Person" name='dob' onChange='' disabled />

                                                    </div>
                                                    <div className="form-group col-lg-6 ">
                                                        <label for="exampleInputUsername1">Set Status</label>
                                                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='gender' onChange='' disabled>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                    

                                                </div>
                                            </div>
                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary'>Save</button>
                                                {/* <button className='col-2'>close</button> */}
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Inquiry Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                    <div className="form-group col-lg-4">
                                                        <label for="exampleInputUsername1">Inquiry Date</label>
                                                        <input type="date" className="form-control" id="exampleInputUsername1" value='' placeholder="Contact Person" name='InquiryDate' onChange='' />

                                                    </div>
                                                    <div className="form-group col-lg-3 ">
                                                        <label for="exampleInputUsername1">Mode Of Inquiry</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='modeEnquiry' onChange='' >
                                                            <option>Mail</option>
                                                            <option>Person</option>
                                                            <option>Phone</option>
                                                            <option>OnlineMail</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-5 ">
                                                        <label for="exampleInputUsername1">How they come to know about SIT	    </label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='advert' onChange='' >
                                                            <option>Advertisement</option>
                                                            <option>facebook</option>
                                                            <option>Google</option>
                                                        </select>
                                                    </div>

                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Training Programme & batch details</h4>
                                                    </div>
                                                    <div className='row'>
                                                    <div className="form-group col-lg-12">
                                                        <label for="exampleTextarea1">Programme inquired	</label>
                                                        <textarea class="form-control" id="exampleTextarea1" value='' placeholder="Discussion" name='programmeEnquired' onChange=''></textarea>

                                                    </div>
                                                    </div>
                             
                                                    <div className='row'>
                                                    <div className="form-group col-lg-5">
                                                        <label for="exampleInputUsername1">Selected Training Programme	</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='selectedProgramme'>
                                                            
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-4">
                                                        <label for="exampleInputUsername1">Category</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='category' onChange='' >
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-3">
                                                        <label for="exampleInputUsername1">Batch</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='batch' >
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Education Qualification & Work</h4>
                                                    </div>
                                                    <div className='row'>
                                                    <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">Qualification</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='qualification'  >
                                                            
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">Descipline</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='descipline' onChange='' >
                                                            
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-lg-4 ">
                                                        <label for="exampleInputUsername1">Percentage<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputUsername1" value= '' placeholder="Percentage" name='percentage' onChange='' />
                                                    </div>
                                                    
                                                    </div>
                                                   

                                                </div>
                                            </div>
                                        </div>

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

export default AdmissionForm