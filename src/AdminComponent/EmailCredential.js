import React, { useState } from 'react';
import InnerHeader from './InnerHeader';
import { BASE_URL } from './BaseUrl';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const EmailCredential = () => {
  const { empolyeeid } = useParams();

  const [formData, setFormData] = useState({
    smtpHost: '',
    port: '',
    useCredential: false,
    enableSSL: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit logic here
      console.log("Form Submitted", formData);
      // Example: await axios.post(`${BASE_URL}/submit-email-credentials`, formData);
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleClear = () => {
    setFormData({
      smtpHost: '',
      port: '',
      useCredential: false,
      enableSSL: false
    });
  };

  return (
    <div className="container-fluid page-body-wrapper">
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="d-flex">
            <>
              <div className='px-2 mx-2'><Link to={`/employeepersonaldetails/${empolyeeid}`}><h4>Personal Information</h4></Link></div>
              <div className='px-2 mx-2'><Link to={`/emailcredential/${empolyeeid}`}><h4>Email Credential</h4></Link></div>
              <div className='px-2 mx-2'><Link to={`/academicqualificationsemp/${empolyeeid}`}><h4>Academic Qualification</h4></Link></div>
              <div className='px-2 mx-2'><Link to={`/workexperience/${empolyeeid}`}><h4>Work Experience</h4></Link></div>
              <div className='px-2 mx-2'><Link to={`/leavestructure/${empolyeeid}`}><h4>Leave Structure</h4></Link></div>
              <div className='px-2 mx-2'><Link to={`/salarystructure/${empolyeeid}`}><h4>Salary Structure</h4></Link></div>
              <div className='px-2 mx-2'><Link to={`/weeklyoff/${empolyeeid}`}><h4>Weekly Off</h4></Link></div>
              <div className='px-2 mx-2'><Link to={`/intimesetting/${empolyeeid}`}><h4>Intime Setting</h4></Link></div>
            </>
          </div>

          <form onSubmit={handleSubmit} className="card p-4">
            <h4 className="card-title mb-3">Email Credential</h4>

            <div className="row">
              <div className="col-lg-4">
                <label>SMTP Host:<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="smtpHost"
                  value={formData.smtpHost}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-4">
                <label>Port:<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="port"
                  value={formData.port}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mt-3 "style={{ marginLeft: "20px" }}>
              
              <div className="col-lg-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="useCredential"
                    name="useCredential"
                    checked={formData.useCredential}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="useCredential">
                    Use Credential
                  </label>
                </div>
              </div>

              <div className="col-lg-4"style={{ marginLeft: "20px" }}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="enableSSL"
                    name="enableSSL"
                    checked={formData.enableSSL}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="enableSSL">
                    Enable SSL
                  </label>
                </div>
              </div>
            </div>

            {/* ✅ Buttons Section */}
            <div className="row mt-4">
              <div className="col-lg-4">
                <button type="submit" className="btn btn-primary me-2">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailCredential;
