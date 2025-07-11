import React, { useState } from 'react';
import InnerHeader from './InnerHeader';
import { BASE_URL } from './BaseUrl';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const EmployeePersonalDetails = () => {

  const { empolyeeid } = useParams();
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
    Email: '',
    EmailPassword: '',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Designation: '',
    Gender: '',
    EmpType: '',
    EmployeeStatus: '',
    // Department: '',
    PFNo: '',
    Nationality: '',
    DOB: '',
    CompanyType: '',
    MaritalStatus: '',
    JoiningDate: '',
    PresentAddress: '',
    PresentCity: '',
    PresentPin: '',
    PresentState: '',
    PresentCountry: '',
    PresentPhone: '',
    PresentMobile: '',
    PanNo: '',
    PermanentAddress: '',
    PermanentCity: '',
    PermanentPin: '',
    PermanentState: '',
    PermanentCountry: '',
    PermanentPhone: '',
    Emails: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${BASE_URL}/employeessend`, formData);
    alert("Employee inserted successfully");
    console.log(res.data);
  } catch (err) {
    console.error("Error inserting employee:", err);
    alert("Failed to insert employee",err);
  }
};

// console.log(empolyeeid)

  return (
    <div className="container-fluid page-body-wrapper">
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
        <div class="d-flex">
        
                                    {
                                        empolyeeid === "new" ? (<>
                                            <div className='px-2 mx-2'><Link to="/employeepersonaldetails/:empolyeeid"><h4>Personal Information</h4></Link></div>
        
                                             </>) :
                                            <>
                                                <div className='px-2 mx-2'><Link to={`/employeepersonaldetails/${empolyeeid}`}><h4>Personal Information</h4></Link></div>
                                                <div className='px-2 mx-2'><Link to={`/emailcredential/${empolyeeid}` }><h4>Email Credential</h4></Link></div>
                                                <div className='px-2 mx-2'><Link to={`/academicqualificationsemp/${empolyeeid}` }><h4>Academic Qualification</h4></Link></div>
                                                <div className='px-2 mx-2'><Link to={`/workexperience/${empolyeeid}` }><h4>Work Experience</h4></Link></div>
                                                <div className='px-2 mx-2'><Link to={`/leavestructure/${empolyeeid}` }><h4>Leave Structure</h4></Link></div>
                                                <div className='px-2 mx-2'><Link to={`/salarystructure/${empolyeeid}`}><h4>Salary Structure</h4></Link></div>
                                                <div className='px-2 mx-2'><Link to={`/weeklyoff/${empolyeeid}` }><h4>Weekly Off</h4></Link></div>
                                                <div className='px-2 mx-2'><Link to={`/intimesetting/${empolyeeid}` }><h4>Intime Setting</h4></Link></div>

                                                </>
                                    }
                                </div>
        
          <form onSubmit={handleSubmit} className="card p-4">
            <h4 className="card-title mb-3">Employee Personal Details</h4>

            <div className="row">
              <div className="col-lg-4">
                <label>UserName<span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="UserName" value={formData.UserName} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Password<span className="text-danger">*</span></label>
                <input type="password" className="form-control" name="Password" value={formData.Password} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Email<span className="text-danger">*</span></label>
                <input type="email" className="form-control" name="Email" value={formData.Email} onChange={handleChange} />
              </div>

              <div className="col-lg-4">
                <label>Email Password<span className="text-danger">*</span></label>
                <input type="password" className="form-control" name="EmailPassword" value={formData.EmailPassword} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>First Name<span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="FirstName" value={formData.FirstName} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Middle Name</label>
                <input type="text" className="form-control" name="MiddleName" value={formData.MiddleName} onChange={handleChange} />
              </div>

              <div className="col-lg-4">
                <label>Last Name<span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="LastName" value={formData.LastName} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Designation</label>
                <input type="text" className="form-control" name="Designation" value={formData.Designation} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Gender</label>
                <select className="form-control" name="Gender" value={formData.Gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="col-lg-4">
                <label>Emp Type</label>
                <select className="form-control" name="EmpType" value={formData.EmpType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Permanent</option>
                  <option>Contract</option>
                  <option>Probation</option>
                  <option>training</option>
                </select>
              </div>
              <div className="col-lg-4">
                <label>Employee Status</label>
                <select className="form-control" name="EmployeeStatus" value={formData.EmployeeStatus} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Active</option>
                  <option>Resigned</option>
                </select>
              </div>
              <div className="col-lg-4">
                <label>Department</label>
                <select className="form-control" name="Department" value={formData.Department} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Administration</option>
                  <option>Business Development</option>
                  <option>Training & Development</option>
                  <option>Account</option>
                  <option>Placement</option>
                  <option>Purchase</option>
                  <option>Leadership / DD</option>
                  <option>Quality Assurance</option>
                  <option>Human Resource</option>
                  <option>Corporate Training</option>
                  <option>Test User</option>
                </select>

              </div>

              <div className="col-lg-4">
                <label>Role<span className="text-danger">*</span></label>
                <select className="form-control" name="Role" value={formData.Role} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Administrator</option>
                  <option>Restricted</option>
                </select>
              </div>
              <div className="col-lg-4">
                <label>PF No.</label>
                <input type="text" className="form-control" name="PFNo" value={formData.PFNo} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Nationality<span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="Nationality" value={formData.Nationality} onChange={handleChange} />
              </div>

              <div className="col-lg-4">
                <label>DOB</label>
                <input type="date" className="form-control" name="DOB" value={formData.DOB} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Company Type<span className="text-danger">*</span></label>
                <select className="form-control" name="CompanyType" value={formData.CompanyType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Private</option>
                  <option>Government</option>
                </select>
              </div>
              <div className="col-lg-4">
                <label>Marital Status<span className="text-danger">*</span></label>
                <select className="form-control" name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Single</option>
                  <option>Married</option>
                </select>
              </div>

              <div className="col-lg-4">
                <label>Joining Date<span className="text-danger">*</span></label>
                <input type="date" className="form-control" name="JoiningDate" value={formData.JoiningDate} onChange={handleChange} />
              </div>
              
            </div>

            <hr />
            <h5>Present Address</h5>
            <div className="row">
              <div className="col-lg-4">
                <label>Address<span className="text-danger">*</span></label>
                <textarea className="form-control" name="PresentAddress" value={formData.PresentAddress} onChange={handleChange}></textarea>
              </div>
              <div className="col-lg-4">
                <label>City<span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="PresentCity" value={formData.PresentCity} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Pin</label>
                <input type="text" className="form-control" name="PresentPin" value={formData.PresentPin} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>State<span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="PresentState" value={formData.PresentState} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Country</label>
                <input type="text" className="form-control" name="PresentCountry" value={formData.PresentCountry} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Phone</label>
                <input type="text" className="form-control" name="PresentPhone" value={formData.PresentPhone} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Mobile</label>
                <input type="text" className="form-control" name="PresentMobile" value={formData.PresentMobile} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Email<span className="text-danger">*</span></label>
                <input type="email" className="form-control" name="Emails" value={formData.Emails} onChange={handleChange} />
              </div>
            </div>

            <hr />
            <h5>Permanent Address</h5>
            <div className="row">
              <div className="col-lg-4">
                <label>Address</label>
                <textarea className="form-control" name="PermanentAddress" value={formData.PermanentAddress} onChange={handleChange}></textarea>
              </div>
              <div className="col-lg-4">
                <label>City</label>
                <input type="text" className="form-control" name="PermanentCity" value={formData.PermanentCity} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Pin</label>
                <input type="text" className="form-control" name="PermanentPin" value={formData.PermanentPin} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>State</label>
                <input type="text" className="form-control" name="PermanentState" value={formData.PermanentState} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Country</label>
                <input type="text" className="form-control" name="PermanentCountry" value={formData.PermanentCountry} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Phone</label>
                <input type="text" className="form-control" name="PermanentPhone" value={formData.PermanentPhone} onChange={handleChange} />
              </div>
              <div className="col-lg-4">
                <label>Pan No</label>
                <input type="text" className="form-control" name="PanNo" value={formData.PanNo} onChange={handleChange} />
              </div>
            </div>

           <div className="d-flex justify-content-start gap-3 mt-4">
  <button type="submit" className="btn btn-primary">Submit</button>
  <button
    type="button"
    className="btn btn-secondary"
    onClick={() => window.location.reload()}
  >
    Cancel
  </button>
</div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeePersonalDetails;
