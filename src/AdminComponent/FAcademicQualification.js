import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const FAcademicQualification = () => {
    const { facultyid } = useParams();
    const [rows, setRows] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        if (facultyid !== ":facultyid") {
            getFacultyDetails();
        }
    }, []);

    const getFacultyDetails = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/getfaculty_acadamic_records`, { facultyid });
            const data = res.data;

            if (data && data.length > 0) {
                setRows(data);
            } else {
                setRows([
                    { Aca_Qualification: '', Institute: '', Year: '', Grade: '' }
                ]);
            }
        } catch (err) {
            console.error("Error fetching academic qualification:", err);
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
            facultyid: facultyid,
            records: validRows
        };

        console.log("Submitting:", payload);

        const response = await axios.post(`${BASE_URL}/save_or_update_faculty_academic_qualification`, payload);

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
                    <div className="row">
                        <div className="d-flex">
                            <div className='px-2 mx-2'><Link to={`/faculty/${facultyid}`}><h4>Personal Information</h4></Link></div>
                            <div className='px-2 mx-2'><Link to={`/addfacultymaster/${facultyid}`}><h4>Current Experience/Other Details</h4></Link></div>
                            <div className='px-2 mx-2'><Link to={`/facademicqualification/${facultyid}`}><h4>Academic Qualification</h4></Link></div>
                            <div className='px-2 mx-2'><Link to={`/facultyexperience/${facultyid}`}><h4>Total Experience and Documents</h4></Link></div>
                            <div className='px-2 mx-2'><Link to={`/facultydiscussion/${facultyid}`}><h4>Discussion</h4></Link></div>
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
                                                            <a href="#" onClick={(e) => e.preventDefault()}>Update</a> /
                                                            <a href="#" onClick={(e) => {
                                                                e.preventDefault();
                                                                handleCancelRow(index);
                                                            }}>Cancel</a>
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
        </div>
    );
};

export default FAcademicQualification;
