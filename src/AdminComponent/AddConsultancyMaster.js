import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';
import { MultiSelect } from 'react-multi-select-component';

const AddConsultancyMaster = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState([])
    const { addconsultancymasterid } = useParams();
    const [category, setCat] = useState('')
    const [course, setCourse] = useState([])
    const [annualbatch, setAnnulBatch] = useState([])
    const navigate = useNavigate();


    const [value, setValue] = useState({
        Comp_Name: "",
        Contact_Person: "",
        Designation: "",
        Address: "",
        City: "",
        State: "",
        Pin: "",
        Country: "",
        Tel: "",
        Fax: "",
        EMail: "",
        Remark: "",
        Date_Added: "",
        Purpose: "",
        IsActive: true,
        IsDelete: false,
        Company_Status: "",
        Website: "",
        Mobile: "",
        Mention_Date: "",
        Industry: "",
        CreatedBy: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/addConsultancy`, value);
            alert(response.data.message);
            navigate("/consultancymasterlisting"); // Redirect after adding data
        } catch (error) {
            console.error("Error adding data:", error);
        }
    };

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="d-flex">

                            <div className='px-2 mx-2'><Link to="/consultancymaster/:consultancymasterid"><h4>Consultancy Details</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/consstudentdetails"><h4>Student Details</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/consultancybranches"><h4>Branch</h4></Link></div>
                        </div>
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Consultancy Master</h4>

                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Consultancy<span className="text-danger">*</span></lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.consultancy}
                                                 placeholder='Consultancy ' name='consultancy ' onChange={onhandleChange} />
                                                 {<span class='text-danger'> {error.consultancy} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Contact Person </lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.contactperson}
                                                 placeholder='Contact Person' name='contactperson' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Designation  </lable>
                                                <input type="text" class="form-control" id="exampleInputUsername" value={value.designation}
                                                 placeholder='Designation ' name='designation' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleTextarea1">Address <span className="text-danger">*</span> </lable>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.address} 
                                                placeholder='Address ' name='address ' onChange={onhandleChange}></textarea>
                                                {<span className='text-danger'> {error.address} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">City</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.city}
                                                 placeholder='City' name='city' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exqmpleInputUsername1">Pin Code <span className="text-danger">*</span> </lable>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.pincode}
                                                 placeholder='Pin Code' name='pincode' onChange={onhandleChange} />
                                                 {<span className='text-danger'> {error.pincode} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">State</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername" value={value.state} placeholder='State' name='state' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Country</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.country} placeholder='Country' name='country' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Phone</lable>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.phone} placeholder='Phone' name='phone' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">E-mail</lable>
                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email} placeholder='E-mail' name='email' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Fax</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.fax} placeholder='Fax' name='fax' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Purpose</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.purpose} name='purpose' onChange={onhandleChange}>
                                                    <option>--Select Purpose--</option>
                                                    <option>Meeting</option>
                                                    <option>Placements</option>
                                                    <option>Training</option>
                                                    <option>Project</option>
                                                    <option>Others</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exqmpleInputUsername1">Mobile Nu.</lable>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.mobile} placeholder='Mobile Nu.' name='mobile' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Website</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.website} placeholder='Wibsite' name='website' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Date</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFromControlSelect1">Status</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.status} name='status' onChange={onhandleChange}>
                                                    <option>--Select--</option>
                                                    <option>Active</option>
                                                    <option>Deactive</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Industry</label>
                                                <MultiSelect options={options} value={selected}
                                                id="exampleFormControlSelect1"
                                                onChange={setSelected}
                                                labelledBy='All Select' name='selected'></MultiSelect>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleTextarea1">Comment </lable>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.comment} placeholder='Comment' name='comment' onChange={onhandleChange} ></textarea>
                                            </div>


                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFromControlSlect1">Course 1</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} 
                                                name='course' onChange={(e) => setCourse(e.target.value)} >
                                                    <option>--Select--</option>

                                                    {course.map((item) => {
                                                        return (
                                                            <option key={item.Course_Id} value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFromControlSlect1">Course 2</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course2}
                                                 name='course2' onChange={onhandleChange} >
                                                    <option>--Select--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFromControlSlect1">Course 3</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course3} name='course3' onChange={onhandleChange} >
                                                    <option>--Select--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFromControlSlect1">Course 4</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course4} name='course4' onChange={onhandleChange} >
                                                    <option>--Select--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFromControlSlect1">Course 5</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course5} name='course5' onChange={onhandleChange} >
                                                    <option>--Select--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFromControlSlect1">Course 6</lable>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course6} name='course6' onChange={onhandleChange} >
                                                    <option>--Select--</option>
                                                </select>
                                            </div>




                                        </div>

                                        <div className='row p-2 gap-2'>
                                            <button className='mr-2 btn btn-primary' type="submit">Submit</button>
                                            <button type="button" className="btn btn-light" onClick={() => navigate("/consultancymasterlisting")}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddConsultancyMaster;