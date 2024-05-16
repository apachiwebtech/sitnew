import React from 'react'
import OnlineAdmissionForm from './OnlineAdmissionForm'
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

const PerssonalInfo = () => {
  return (
    
      
        
        <div className="container-fluid page-body-wrapper">
        <InnerHeader />
            
        
            <div className="main-panel">

                <div className="content-wrapper">

                <OnlineAdmissionForm/>
                 
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Student Details :  </h4>
                                                    </div>
                                                    <div className='row'>
                                                      <div className="form-group col-lg-4 ">
                                                          <label for="exampleInputUsername1">B.M. ID<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='firstname' onChange='' />
                                                      </div>

                                                      <div className="form-group col-lg-8">
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

                                                      <div className="form-group col-lg-4 ">
                                                          <label for="exampleInputUsername1">Nationality<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Nationality*" name='nationality' onChange='' />
                                                          
                                                      </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Date Of Birth</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value='' placeholder="Contact Person" name='dob' onChange='' />

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                          <label for="exampleInputUsername1">Password<span className='text-danger'>*</span></label>
                                                          <input type="text" className="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='email' onChange='' />
                                                        </div>

                                                        <div className="form-group col-lg-12 ">
                                                          <label for="exampleInputUsername1">How they come to know about SIT</label>
                                                          <input type="text" className="form-control" id="exampleInputUsername1" value='Google' placeholder="Name*" name='email' onChange='' />
                                                        </div>

                                                    </div>

                                                    <div>
                                                        <h4 className="card-title titleback">Present Address :  </h4>
                                                    </div>

                                                    <div className='row'>

                                                      <div className="form-group col-lg-12">
                                                          <label for="exampleTextarea1">Address </label>
                                                          <textarea className="form-control" id="exampleTextarea1" value='' placeholder="Discussion" name='discussion' onChange=''></textarea>

                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">Pincode<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='country' onChange='' />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">City<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='country' onChange='' />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">State<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='country' onChange='' />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='country' onChange='' />
                                                          
                                                      </div>
                                                      
                                                      <div className='form-group col-3'>
                                                          <label for="exampleInputUsername1">Mobile</label>
                                                          <input type="number" className="form-control" id="exampleInputUsername1" value='' placeholder="Number" name='mobile' onChange='' />
                                                      </div>
                                                      <div className='form-group col-3'>
                                                          <label for="exampleInputUsername1">Whatsapp Number</label>
                                                          <input type="number" className="form-control" id="exampleInputUsername1" value='' placeholder="Number" name='whatsapp' onChange='' />
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
                                                        <h4 className="card-title titleback">Training Programme & Batch Detail</h4>
                                                    </div>
                                                    <div className='row'>
                                                    <div className="form-group col-lg-4">
                                                        <label for="exampleInputUsername1">Training Programme</label>
                                                        <input type="date" className="form-control" id="exampleInputUsername1" value='' placeholder="Contact Person" name='InquiryDate' onChange='' />

                                                    </div>
                                                    <div className="form-group col-lg-3 ">
                                                        <label for="exampleInputUsername1">Category</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='modeEnquiry' onChange='' >
                                                            <option>Mail</option>
                                                            <option>Person</option>
                                                            <option>Phone</option>
                                                            <option>OnlineMail</option>
                                                        </select>
                                                    </div>

                                                    
                                                    <div className="form-group col-lg-5 ">
                                                        <label for="exampleInputUsername1">Batch    </label>
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
                                                        <h4 className="card-title titleback">Online Admission Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                    <div className="form-group col-lg-4">
                                                        <label for="exampleTextarea1">Online Admission Date	</label>
                                                        <input type="date" className="form-control" id="exampleInputUsername1" value='' placeholder="Contact Person" name='InquiryDate' onChange='' />

                                                    </div>

                                                    <div className="form-group col-lg-4">
                                                        <label for="exampleInputUsername1">Status	</label>
                                                        <input type="text" className="form-control" id="exampleInputUsername1" value='Open' placeholder="Contact Person" name='InquiryDate' disabled onChange='' />
                                                    </div>
                                                    <div className="form-group col-lg-4">
                                                        <label for="exampleInputUsername1">Date</label>
                                                        
                                                        <input type="text" className="form-control" id="exampleInputUsername1" value='13-May-2024' placeholder="Contact Person" name='InquiryDate' disabled onChange='' />
                                                    </div>
                                                    </div>
                             
                                                    <div className='row'>
                                                    
                                                      <div className="form-group col-lg-6">
                                                          <label for="exampleInputUsername1">Set Status</label>
                                                          <select className="form-control form-control-lg" id="exampleFormControlSelect1" value='' name='batch' >
                                                              
                                                                <option value="0">Select Status</option>
                                                                <option value="1">Conducted</option>
                                                                <option value="2">Pending </option>
                                                                <option value="4">Junk</option>
                                                                <option value="6">On Hold</option>
                                                                <option value="7">Follow Up</option>
                                                                <option value="12">Duplicate Inquiries</option>
                                                                <option value="13">Close </option>
                                                                <option value="16">Interested (follow up)</option>
                                                                <option value="24">Will let you know</option>
                                                                <option value="25">Not connected</option>
                                                                <option value="26">Duplicate enquiry</option>
                                                                <option value="27">Not interested  (closed)</option>
                                                                <option value="28">Not eligible</option>
                                                                <option value="29">Next Batch</option>
                                                                <option value="30">Financial Problem</option>
                                                                <option value="31">Job assurance</option>
                                                                <option value="32">High experience in different field</option>
                                                                <option value="33">Fees is high for him</option>
                                                                <option value="34">If interested will contact in future</option>
                                                                <option value="35">Req Specific Short Term Training</option>
                                                                <option value="36">Old enq – Not interested (closed)</option>
                                                                <option value="37">Old enq – Next Batch</option>
                                                                <option value="38">Old enq - If interested will contact in future</option>
                                                                <option value="40">Old enq - Interested (follow up)</option>
                                                                <option value="41">Old enq – financial Problem</option>
                                                                <option value="42">Old enq - Job assurance</option>

          
                                                          </select>
                                                      </div>
                                                      <div className="form-group col-lg-6">
                                                          <label for="exampleInputUsername1">Date</label>
                                                          <input type="date" className="form-control" id="exampleInputUsername1" value='' placeholder="Contact Person" name='InquiryDate' onChange='' />
                                                      </div>
                                                    </div>

                                                    <div className='pt-3'>
                                                        <h4 className="card-title titleback">Permanent Address   :  </h4>
                                                    </div>

                                                    <div className='row'>

                                                      <div className="form-group col-lg-12">
                                                          <label for="exampleTextarea1">Address </label>
                                                          <textarea className="form-control" id="exampleTextarea1" value='' placeholder="Discussion" name='discussion' onChange=''></textarea>

                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">Pincode<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='country' onChange='' />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">City<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='country' onChange='' />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">State<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='country' onChange='' />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value='' placeholder="Name*" name='country' onChange='' />
                                                          
                                                      </div>
                                                      
                                                      <div className='form-group col-3'>
                                                          <label for="exampleInputUsername1">Mobile</label>
                                                          <input type="number" className="form-control" id="exampleInputUsername1" value='' placeholder="Number" name='mobile' onChange='' />
                                                      </div>
                                                      <div className='form-group col-3'>
                                                          <label for="exampleInputUsername1">Whatsapp Number</label>
                                                          <input type="number" className="form-control" id="exampleInputUsername1" value='' placeholder="Number" name='whatsapp' onChange='' />
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

export default PerssonalInfo