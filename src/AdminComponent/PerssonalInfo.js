import React, { useEffect, useState } from 'react'
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

    const [personalInfo, setPersonalInfo] = useState({
      studentName : '', 
      Batch_Code : '', 
      gender : '', 
      nationality : '', 
      dob : '', 
      address : '', 
      pincode : '', 
      city : '', 
      state : '', 
      country : '', 
      mobile : '', 
      whastapp : '', 
      permanentAdress :'', 
      permanentPincode :'', 
      permanentCity :'', 
      permanentState :'',
      permanentCountry :'',
      password : '',
      Inquiry_Type: '',
      inquiry_from : '',
      admission_dt : '',
    })
    const{admissionid}  = useParams();

    useEffect(()=>{
        localStorage.setItem("Admissionid", admissionid);
    },[admissionid])

    const getPersonalData = async()=>{
        const response = await fetch(`${BASE_URL}/getPersonal`, {
            method : 'POST', 
            body : JSON.stringify({
                admissionid : localStorage.getItem(`Admissionid`),
            }), 
            headers : {
                'Content-Type' : 'application/json',
            }
        });

        const data = await response.json();
        
        setPersonalInfo(prevState=>({
            ...prevState,
            studentName : data[0].FName, 
            Batch_Code : data[0].Batch_Code, 
            gender : data[0].Sex, 
            nationality : data[0].Nationality, 
            dob : data[0].DOB, 
            address : data[0].Present_Address, 
            pincode : data[0].Present_Pin, 
            city : data[0].Present_City, 
            state : data[0].Present_State, 
            country : data[0].Present_Country, 
            mobile : data[0].Present_Mobile, 
            whastapp : '', 
            permanentAdress : data[0].Permanent_Address, 
            permanentPincode : data[0].Permanent_Pin, 
            permanentCity : data[0].Permanent_City, 
            permanentState : data[0].Permanent_State,
            permanentCountry : data[0].Permanent_Country,
            Inquiry_Type : data[0].Inquiry_Type, 
            inquiry_from : data[0].Inquiry_From,
            admission_dt : data[0].Admission_Dt,
        }));
    }

    const handleChange=(e)=>{
        const {name , value} = e.target;
        setPersonalInfo(prevState =>({
            ...prevState ,
            [name] : value,
        }
        ))
    }
    const handleSubmit = async(e) => {
        e.preventDefault()

    // if(validateForm()){

       const response = await fetch(`${BASE_URL}/updateStudent`, {
        method : 'POST', 
        body : JSON.stringify({
        Student_Id : localStorage.getItem(`Admissionid`),
        firstname : personalInfo.firstname,
        gender : personalInfo.gender, 
        dob : personalInfo.dob, 
        mobile : personalInfo.mobile, 
        whatsapp : personalInfo.mobile, 
        email : personalInfo.email,
        nationality : personalInfo.nationality, 
        discussion : personalInfo.discussion, 
        country : personalInfo.country,
        InquiryDate : personalInfo.InquiryDate, 
        modeEnquiry : personalInfo.modeEnquiry, 
        advert : personalInfo.advert, 
        programmeEnquired : personalInfo.programmeEnquired, 
        selectedProgramme : personalInfo.selectedProgramme, 
        category : personalInfo.category, 
        batch : personalInfo.batch, 
        qualification : personalInfo.qualification, 
        descipline : personalInfo.descipline, 
        percentage : personalInfo.percentage,
        address : personalInfo.address,
        pincode : personalInfo.pincode,
        city : personalInfo.city,
        state : personalInfo.state,
        permanentAdress :personalInfo.permanentAdress, 
        permanentPincode :personalInfo.permanentPincode, 
        permanentCity :personalInfo.permanentCity, 
        permanentState :personalInfo.permanentState,
        permanentCountry :personalInfo.permanentCountry,
        password : personalInfo.password,
        Inquiry_Type: personalInfo.Inquiry_Type,
        inquiry_from : personalInfo.inquiry_from,
        admission_dt : personalInfo.admission_dt,
        }), 
        headers : {
            'Content-Type' : 'application/json'
        }
       })

       const data = await response.json();

       console.log(data);

    // }        
    }
    useEffect(()=>{
        getPersonalData();
    }, [])
  return (
    
      
        
        <div className="container-fluid page-body-wrapper">
        <InnerHeader />
            
        
            <div className="main-panel">

                <div className="content-wrapper">

                <OnlineAdmissionForm admissionid={admissionid}/>
                 
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
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.Batch_Code} placeholder="Name*" name='Batch_Code' onChange={handleChange} />
                                                      </div>

                                                      <div className="form-group col-lg-8">
                                                          <label for="exampleInputUsername1">Name<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.studentName} placeholder="Name*" name='studentName' onChange={handleChange} />
                                                      </div>
                                                    
                                                      <div className="form-group col-lg-4 ">
                                                          <label for="exampleInputUsername1">Gender</label>
                                                          <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.gender} name='gender' onChange={handleChange} >
                                                              <option>Male</option>
                                                              <option>Female</option>
                                                              <option>Other</option>
                                                          </select>
                                                      </div>

                                                      <div className="form-group col-lg-4 ">
                                                          <label for="exampleInputUsername1">Nationality<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.nationality} placeholder="nationality*" name='nationality' onChange={handleChange} />
                                                          
                                                      </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Date Of Birth</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={personalInfo.dob} placeholder="Contact Person" name='dob' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                          <label for="exampleInputUsername1">Password<span className='text-danger'>*</span></label>
                                                          <input type="text" className="form-control" id="exampleInputUsername1" value={personalInfo.password} placeholder="Name*" name='password' onChange={handleChange} />
                                                        </div>

                                                        <div className="form-group col-lg-12 ">
                                                          <label for="exampleInputUsername1">How they come to know about SIT</label>
                                                          <input type="text" className="form-control" id="exampleInputUsername1" value='Google' placeholder="Name*" name='email' onChange={handleChange} />
                                                        </div>

                                                    </div>

                                                    <div>
                                                        <h4 className="card-title titleback">Present Address :  </h4>
                                                    </div>

                                                    <div className='row'>

                                                      <div className="form-group col-lg-12">
                                                          <label for="exampleTextarea1">Address </label>
                                                          <textarea className="form-control" id="exampleTextarea1" value={personalInfo.address} placeholder="presentAdress" name='discussion' onChange={handleChange}></textarea>

                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">Pincode<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.pincode} placeholder="Name*" name='presentPincode' onChange={handleChange} />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">City<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.city} placeholder="Name*" name='presentCity' onChange={handleChange} />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">State<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.state} placeholder="Name*" name='country' onChange={handleChange} />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.country} placeholder="Name*" name='presentCountry' onChange={handleChange} />
                                                          
                                                      </div>
                                                      
                                                      <div className='form-group col-3'>
                                                          <label for="exampleInputUsername1">Mobile</label>
                                                          <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.mobile} placeholder="Number" name='mobile' onChange={handleChange} />
                                                      </div>
                                                      <div className='form-group col-3'>
                                                          <label for="exampleInputUsername1">Whatsapp Number</label>
                                                          <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.whatsapp} placeholder="Number" name='whatsapp' onChange={handleChange} />
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
                                                        <input type="date" className="form-control" id="exampleInputUsername1" value='' placeholder="Contact Person" name='InquiryDate' onChange={handleChange} />

                                                    </div>
                                                    <div className="form-group col-lg-3 ">
                                                        <label for="exampleInputUsername1">Category</label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.inquiry_from} name='inquiry_from' onChange={handleChange} >
                                                            <option>Mail</option>
                                                            <option>Person</option>
                                                            <option>Phone</option>
                                                            <option>OnlineMail</option>
                                                        </select>
                                                    </div>

                                                    
                                                    <div className="form-group col-lg-5 ">
                                                        <label for="exampleInputUsername1">Batch    </label>
                                                        <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.Inquiry_Type} name='Inquiry_Type' onChange={handleChange} >
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
                                                        <input type="date" className="form-control" id="exampleInputUsername1" value={personalInfo.admission_dt} placeholder="Contact Person" name='admission_dt' onChange={handleChange} />

                                                    </div>

                                                    <div className="form-group col-lg-4">
                                                        <label for="exampleInputUsername1">Status	</label>
                                                        <input type="text" className="form-control" id="exampleInputUsername1" value='Open' placeholder="Contact Person" name='InquiryDate' disabled onChange={handleChange} />
                                                    </div>
                                                    <div className="form-group col-lg-4">
                                                        <label for="exampleInputUsername1">Date</label>
                                                        
                                                        <input type="text" className="form-control" id="exampleInputUsername1" value='13-May-2024' placeholder="Contact Person" name='InquiryDate' disabled onChange={handleChange} />
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
                                                          <input type="date" className="form-control" id="exampleInputUsername1" value='' placeholder="Contact Person" name='InquiryDate' onChange={handleChange} />
                                                      </div>
                                                    </div>

                                                    <div className='pt-3'>
                                                        <h4 className="card-title titleback">Permanent Address   :  </h4>
                                                    </div>

                                                    <div className='row'>

                                                      <div className="form-group col-lg-12">
                                                          <label for="exampleTextarea1">Address </label>
                                                          <textarea className="form-control" id="exampleTextarea1" value={personalInfo.permanentAdress} placeholder="permanentAdress" name='permanentAdress' onChange={handleChange}></textarea>

                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">Pincode<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentPincode} placeholder="Name*" name='permanentPincode' onChange={handleChange} />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">City<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentCity} placeholder="Name*" name='permanentCity' onChange={handleChange} />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">State<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentState} placeholder="Name*" name='permanentState' onChange={handleChange} />
                                                          
                                                      </div>

                                                      <div className="form-group col-lg-3 ">
                                                          <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                          <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentCountry} placeholder="Name*" name='permanentCountry' onChange={handleChange} />
                                                          
                                                      </div>
                                                      
                                                      <div className='form-group col-3'>
                                                          <label for="exampleInputUsername1">Mobile</label>
                                                          <input type="number" className="form-control" id="exampleInputUsername1" value='' placeholder="Number" name='mobile' onChange={handleChange} />
                                                      </div>
                                                      <div className='form-group col-3'>
                                                          <label for="exampleInputUsername1">Whatsapp Number</label>
                                                          <input type="number" className="form-control" id="exampleInputUsername1" value='' placeholder="Number" name='whatsapp' onChange={handleChange} />
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