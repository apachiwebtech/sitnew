import React, { useState } from 'react';
import InnerHeader from './InnerHeader';
import { BASE_URL } from './BaseUrl';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const WorkExperience = () => {
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
                Company: '',
                Business_Nature: '',
                Designation: '',
                Address: '',
                City: '',
                Telephone: '',
                Duration: '',
                Gross_Salary: '',
                Net_Salary: '',
                Leave_Reason: '',
                Last_Date: ''
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
                                <h2 className="card-title titleback">Work Experience</h2>
                                <hr />

                                {rows.map((row, index) => (
                                    <div key={index} className="border p-3 mb-4 rounded bg-light">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <label>Company</label>
                                                <input type="text" className="form-control" name="Company" value={row.Company} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label>Business Nature</label>
                                                <input type="text" className="form-control" name="Business_Nature" value={row.Business_Nature} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label>Designation</label>
                                                <input type="text" className="form-control" name="Designation" value={row.Designation} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label>Address</label>
                                                <input type="text" className="form-control" name="Address" value={row.Address} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label>City</label>
                                                <input type="text" className="form-control" name="City" value={row.City} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                            
                                            <div className="col-md-2">
                                                <label>Last Date</label>
                                                <input type="date" className="form-control" name="Last_Date" value={row.Last_Date} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                        </div>

                                        <div className="row mt-4">
                                            <div className="col-md-2">
                                                <label>Telephone</label>
                                                <input type="text" className="form-control" name="Telephone" value={row.Telephone} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label>Duration</label>
                                                <input type="text" className="form-control" name="Duration" value={row.Duration} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label>Gross Salary</label>
                                                <input type="text" className="form-control" name="Gross_Salary" value={row.Gross_Salary} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label>Net Salary</label>
                                                <input type="text" className="form-control" name="Net_Salary" value={row.Net_Salary} onChange={(e) => handleInputChange(e, index)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label>Leave Reason</label>
                                                <input type="text" className="form-control" name="Leave_Reason" value={row.Leave_Reason} onChange={(e) => handleInputChange(e, index)} />
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
};

export default WorkExperience;
