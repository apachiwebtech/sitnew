import React, { useState, useEffect } from 'react';
import InnerHeader from './InnerHeader';
import { BASE_URL } from './BaseUrl';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const SalaryStructure = () => {
  const { empolyeeid } = useParams();
  const [rows, setRows] = useState([]);
  const [visibleFormIndex, setVisibleFormIndex] = useState(null);
  const [salaryType, setSalaryType] = useState('Hourly');

  const [formData, setFormData] = useState({
  fromDate: '',
  toDate: '',
  type: 'Hourly',
  stdWH: '',
  stdWHRate: '',
  otRate: '',
  basicDA: '',
  daAmt: '',
  hra: '',
  call: '',
  convey: '',
  other: '',
  gross: '',
  basic: ''
});


  const handleToggleForm = (index) => {
    setVisibleFormIndex(prevIndex => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const fetchSalaryStructure = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get_salary_structure/${empolyeeid}`);
        setRows(response.data || []);
      } catch (error) {
        console.error("Error fetching salary structure:", error);
      }
    };

    fetchSalaryStructure();
  }, [empolyeeid]);

  

  const handleSave = async () => {
    try {
      const payload = {
        empolyeeid: empolyeeid,
        records: rows
      };

      const response = await axios.post(`${BASE_URL}/save_or_update_salary_structure`, payload);

      if (response.data.success) {
        alert("Salary structure saved successfully!");
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("Error saving salary structure:", err);
    }
  };

   const SalaryForm = () => (
    <div className="mt-3 p-3 bg-white border rounded">
      <h5><strong>Add Salary Info</strong></h5>
      <div className="row mb-2">
        <div className="col-md-3">
          <label>Date : From</label>
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-3">
          <label>To</label>
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-3">
          <label>Type</label>
          <select className="form-control" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
            
            <option>Hourly</option>
            <option>Monthly</option>
            <option>Professional</option>
          </select>
        </div>
      </div>

      {salaryType === 'Hourly' || salaryType === 'Professional' ? (
        <div className="row bg-light p-3 rounded">
          <div className="col-md-2"><label>Std. W.H. (Hrs)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>Std. WH Rate</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>OT Rate</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>Basic+DA(%)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>DA(Amt)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>HRA(%)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>Call(%)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>Convey(%)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>Other(%)</label><input type="number" className="form-control" /></div>
        </div>
      ) : (
        <div className="row bg-light p-3 rounded">
          <div className="col-md-2"><label>Gross</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>Basic (Basic+DA=50%)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>DA</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>HRA (20%)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>Call (10%)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>Convey (10%)</label><input type="number" className="form-control" /></div>
          <div className="col-md-2"><label>Other (10%)</label><input type="number" className="form-control" /></div>
        </div>
      )}
    </div>

  );
  return (
    <div className="container-fluid page-body-wrapper">
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
          {/* Top Navigation Tabs */}
          <div className="d-flex flex-wrap">
            <div className='px-2 mx-2'><Link to={`/employeepersonaldetails/${empolyeeid}`}><h4>Personal Information</h4></Link></div>
            <div className='px-2 mx-2'><Link to={`/emailcredential/${empolyeeid}`}><h4>Email Credential</h4></Link></div>
            <div className='px-2 mx-2'><Link to={`/academicqualificationsemp/${empolyeeid}`}><h4>Academic Qualification</h4></Link></div>
            <div className='px-2 mx-2'><Link to={`/workexperience/${empolyeeid}`}><h4>Work Experience</h4></Link></div>
            <div className='px-2 mx-2'><Link to={`/leavestructure/${empolyeeid}`}><h4>Leave Structure</h4></Link></div>
            <div className='px-2 mx-2'><Link to={`/salarystructure/${empolyeeid}`}><h4>Salary Structure</h4></Link></div>
            <div className='px-2 mx-2'><Link to={`/weeklyoff/${empolyeeid}`}><h4>Weekly Off</h4></Link></div>
            <div className='px-2 mx-2'><Link to={`/intimesetting/${empolyeeid}`}><h4>Intime Setting</h4></Link></div>
          </div>

          {/* Salary Display */}
          <div className="col-lg-12 grid-margin stretch-card mt-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title titleback">Salary Structure</h2>
                <hr />

                {/* Case: No rows */}
                {rows.length === 0 ? (
                  <div className="border p-3 mb-4 rounded bg-light">
                    <div className="row">
                      <div className="col-md-3 d-flex flex-column">
                        <label>Options</label>
                        <div className="d-flex gap-2">
                          <button className="btn btn-success btn-sm" onClick={() => handleToggleForm(-1)}>
                            {visibleFormIndex === -1 ? "Save Form" : "Add Salary"}
                          </button>
                          <button className="btn btn-primary btn-sm">Edit Salary</button>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label>Salary Type</label>
                        <input type="text" className="form-control" value="" readOnly />
                      </div>
                      <div className="col-md-3">
                        <label>From Date</label>
                        <input type="date" className="form-control" value="" readOnly />
                      </div>
                      <div className="col-md-3">
                        <label>To Date</label>
                        <input type="date" className="form-control" value="" readOnly />
                      </div>
                    </div>
                    {visibleFormIndex === -1 && SalaryForm()}
                  </div>
                ) : (
                  rows.map((row, index) => (
                    <div key={index} className="border p-3 mb-4 rounded bg-light">
                      <div className="row">
                        <div className="col-md-3 d-flex flex-column">
                          <label>Options</label>
                          <div className="d-flex gap-2">
                            <button className="btn btn-success btn-sm" onClick={() => handleToggleForm(index)}>
                              {visibleFormIndex === index ? "Close Form" : "Add Salary"}
                            </button>
                            <button className="btn btn-primary btn-sm">Edit Salary</button>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label>Salary Type</label>
                          <input type="text" className="form-control" value={row.In_time || ''} readOnly />
                        </div>
                        <div className="col-md-3">
                          <label>From Date</label>
                          <input type="date" className="form-control" value={row.Date_from || ''} readOnly />
                        </div>
                        <div className="col-md-3">
                          <label>To Date</label>
                          <input type="date" className="form-control" value={row.To_Date || ''} readOnly />
                        </div>
                      </div>
                      {visibleFormIndex === index && SalaryForm()}
                    </div>
                  ))
                  
                )}
                 {/* ✅ Add checkboxes below the above row like this: */}
  <div className="row mt-3">
  <div className="col-md-12 d-flex  align-items-center gap-0">
    {[
      { id: "ot", label: "OT" },
      { id: "pt", label: "PT" },
      { id: "pf", label: "PF" },
      { id: "tds", label: "TDS" },
      { id: "mlwf", label: "MLWF" },
      { id: "esic", label: "ESIC" },
      { id: "leave", label: "Leave" },
    ].map((item) => (
      <div className="form-check d-flex align-items-center " style={{marginLeft: "50px"}} key={item.id}>
        <input
          className="form-check-input"
          type="checkbox"
          id={item.id}
          style={{ marginLeft: "10px" }}
        />
        <label className="form-check-label" htmlFor={item.id} style={{marginRight:"5px",textAlign:'start'}}>
          {item.label}
        </label>
      </div>
    ))}
  </div>
</div>




                <div className="mt-4">
                  <button type="submit" className="btn btn-primary mx-2" onClick={handleSave}>Save</button>
                  <button type="button" className="btn btn-light" onClick={() => window.location.reload()}>Close</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryStructure;
