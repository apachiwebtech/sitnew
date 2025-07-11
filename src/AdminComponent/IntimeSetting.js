import React, { useState } from 'react';
import InnerHeader from './InnerHeader';
import { BASE_URL } from './BaseUrl';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const IntimeSetting = () => {
  const { empolyeeid } = useParams();
      const [rows, setRows] = useState([]);
  
      const handleInputChange = (e, index) => {
          const { name, value } = e.target;
          const updatedRows = [...rows];
          updatedRows[index][name] = value;
          setRows(updatedRows);
      };
  
      const addNewRow = () => {
          setRows([
              ...rows,
              {
                 In_time: '',
                  Date_from: '',
                  To_Date: '',
                  
              }
          ]);
      };
  
      const handleCancelRow = (indexToRemove) => {
          const updatedRows = rows.filter((_, index) => index !== indexToRemove);
          setRows(updatedRows);
      };
  
      const handleSave = async () => {
          try {
              const validRows = rows.filter(row =>
                  row.Company.trim() !== '' &&
                  row.Designation.trim() !== '' &&
                  row.Address.trim() !== '' &&
                  row.City.trim() !== ''
              );
  
              if (validRows.length === 0) {
                  alert("Please fill in at least one row with essential fields.");
                  return;
              }
  
              const payload = {
                  empolyeeid: empolyeeid,
                  records: validRows
              };
  
              const response = await axios.post(`${BASE_URL}/save_or_update_work_experience`, payload);
  
              if (response.data.success) {
                  alert("Work experience saved successfully!");
              } else {
                  alert("Something went wrong.");
              }
          } catch (err) {
              console.error("Error saving work experience:", err);
          }
      };
  
      return (
          <div className="container-fluid page-body-wrapper">
              <InnerHeader />
              <div className="main-panel">
                  <div className="content-wrapper">
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
  
                      <div className="col-lg-12 grid-margin stretch-card mt-4">
                          <div className="card">
                              <div className="card-body">
                                  <h2 className="card-title titleback">Intime Setting</h2>
                                  <hr />
  
                                  {rows.map((row, index) => (
                                      <div key={index} className="border p-3 mb-4 rounded bg-light">
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <label>In time</label>
                                                  <input type="text" className="form-control" name="Company" value={row.In_time} onChange={(e) => handleInputChange(e, index)} />
                                              </div>
                                              <div className="col-md-2">
                                                  <label>Date from</label>
                                                  <input type="text" className="form-control" name="Business_Nature" value={row.Date_from} onChange={(e) => handleInputChange(e, index)} />
                                              </div>
                                              <div className="col-md-2">
                                                  <label>To Date</label>
                                                  <input type="text" className="form-control" name="Designation" value={row.To_Date} onChange={(e) => handleInputChange(e, index)} />
                                              </div>
                                             
                                          </div>
  
                                          <div className="row mt-3">
                                              <div className="col-md-3 d-flex align-items-end">
                                                  <button className="btn btn-danger btn-sm" onClick={() => handleCancelRow(index)}>Remove</button>
                                              </div>
                                          </div>
                                      </div>
                                  ))}
  
                                  <div className="mt-4">
                                      <button type="button" className="btn btn-success" onClick={addNewRow}>Add Row</button>
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
}

export default IntimeSetting