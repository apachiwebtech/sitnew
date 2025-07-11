import React, { useState } from 'react';
import InnerHeader from './InnerHeader';
import { BASE_URL } from './BaseUrl';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const Academicqualificationsemp = () => {
const { empolyeeid } = useParams();
const [rows, setRows] = useState([]);



    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    
  } catch (err) {
   
  }
};

 const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };
const addNewRow = () => {
        setRows([
            ...rows,
            { Aca_Qualification: '', Institute: '', Year: '', Grade: '' }
        ]);
    };


     const handleSave = async () => {
    try {
        // Filter out rows with all fields empty
        const validRows = rows.filter(row =>
            row.Aca_Qualification.trim() !== '' &&
            row.Institute.trim() !== '' &&
            row.Year.trim() !== '' &&
            row.Grade.trim() !== ''
        );

        if (validRows.length === 0) {
            alert("Please fill in at least one row with all fields.");
            return;
        }

        // Send payload
        const payload = {
            empolyeeid: empolyeeid,
            records: validRows
        };

        console.log("Submitting:", payload);

        const response = await axios.post(`${BASE_URL}/save_or_update_employee_academic_qualification`, payload);

        if (response.data.success) {
            alert("Academic qualifications saved successfully!");
        } else {
            alert("Something went wrong.");
        }
    } catch (err) {
        console.error("Error saving academic qualification:", err);
    }
};

 const handleCancelRow = (indexToRemove) => {
    const updatedRows = rows.filter((_, index) => index !== indexToRemove);
    setRows(updatedRows);
};


  return (
    <div className="container-fluid page-body-wrapper">
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
        <div class="d-flex">
        
                                    {
                                        empolyeeid === ":empolyeeid" ? (<>
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
        
          <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title titleback">Academic Qualification</h2>
                                    <hr />
                                    <div className="pt-2">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Action</th>
                                                    <th>Qualification</th>
                                                    <th>Institute</th>
                                                    <th>Passing Year</th>
                                                    <th>Grade/Percentage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="col-md-2 d-flex align-items-end gap-2">
  <button className="btn btn-outline-primary btn-sm" onClick={() => alert("Update clicked")}>Update</button>
  <button className="btn btn-danger btn-sm" onClick={() => handleCancelRow(index)}>Cancel</button>
</div>

                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Aca_Qualification"
                                                                value={row.Aca_Qualification}
                                                                onChange={(e) => handleInputChange(e, index)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Institute"
                                                                value={row.Institute}
                                                                onChange={(e) => handleInputChange(e, index)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Year"
                                                                value={row.Year}
                                                                onChange={(e) => handleInputChange(e, index)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Grade"
                                                                value={row.Grade}
                                                                onChange={(e) => handleInputChange(e, index)}
                                                            />
                                                        </td>
                                                        
                                                    </tr>
                                                ))}
                                            </tbody>
                                            
                                        </table>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-success my-2"
                                            onClick={addNewRow}
                                        >
                                            Add Row
                                        </button>


                                        
                                        <br />
                                        <button type="submit" className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
                                        <button type="button" onClick={() => window.location.reload()} className="btn btn-light">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
              </div>
              </div>
              </div>
  )
}

export default Academicqualificationsemp