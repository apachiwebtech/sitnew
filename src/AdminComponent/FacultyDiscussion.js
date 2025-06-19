import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const FacultyDiscussion = () => {
  const { facultyid } = useParams();
   const [rows, setRows] = useState([]);
  const [error, setError] = useState({});

  const [value, setValue] = useState([
    { discussiondate: '', remark: '', department: '' }
  ]);

  // Fetch existing data if editing
 useEffect(() => {
  if (facultyid) {
    getDiscussion();
  }
}, [facultyid]); // ← important: pass it as dependency
 

    const getDiscussion = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/get_faculty_discussion`, { facultyid });
            const data = res.data;

            if (data && data.length > 0) {
  const mappedData = data.map(item => ({
    discussiondate: item.Dis_date || '',
    remark: item.Remark || '',
    department: item.Department || ''
  }));
  setRows(mappedData);
} else {
  setRows([{ discussiondate: '', remark: '', department: '' }]);
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
  setRows([...rows, { discussiondate: '', remark: '', department: '' }]);
};

    ///
  
const handleCancelRow = (indexToRemove) => {
    const updatedRows = rows.filter((_, index) => index !== indexToRemove);
    setRows(updatedRows);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Format date to YYYY-MM-DD
  const formattedRows = rows.map((row) => {
    const date = new Date(row.discussiondate);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    return {
      ...row,
      discussiondate: formattedDate
    };
  });

  try {
    const res = await axios.post(`${BASE_URL}/save_faculty_discussion`, {
  facultyid,
  records: formattedRows   // ✅ Must match what backend expects
});


    if (res.status === 200) {
      alert("Discussion data saved successfully!");
      getDiscussion(); // Refresh fetched data
    }
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Failed to save data.");
  }
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

            <div className="col-lg-12 grid-margin">
              <div className="card">
                <div className='container-fluid'>
                  <div className='row justify-content-center'>
                    <div className='p-3' style={{ width: "100%" }}>
                      <form onSubmit={handleInputChange}>
                        <h4 className="card-title titleback">Edit Faculty</h4>

                        {rows.map((row, index) => (
  <div key={index} className="row align-items-end mb-2">
    <div className="form-group col-lg-3">
      <label>Discussion Date</label>
      <input
  type="date"
  className="form-control"
  name="discussiondate"
  value={row.discussiondate}
  onChange={(e) => handleInputChange(e, index)}
/>
    </div>
    <div className="form-group col-lg-3">
      <label>Remark</label>
      <input
  type="text"
  className="form-control"
  name="remark"
  value={row.remark}
  onChange={(e) => handleInputChange(e, index)}
/>
    </div>
    <div className="form-group col-lg-3">
      <label>Department</label>
     <select
  className="form-control"
  name="department"
  value={row.department}
  onChange={(e) => handleInputChange(e, index)}
>
        <option value="">--Select Department--</option>
        <option value="Computer">Computer</option>
        <option value="IT">IT</option>
        <option value="Electronics">Electronics</option>
      </select>
    </div>
    <div className="form-group col-lg-2 d-flex align-items-end gap-2">
      {index === rows.length - 1 && (
        <button type="button" className="btn btn-sm btn-primary" onClick={addNewRow}>Add More</button>
      )}
      {rows.length > 1 && (
        <button type="button" className="btn btn-sm btn-danger" onClick={() => handleCancelRow(index)}>Cancel Row</button>
      )}
    </div>
  </div>
))}


                        <button type="submit" className="btn btn-primary mr-2 mt-3"  onClick={handleSubmit}>Save</button>
                        <button type="button" onClick={() => window.location.reload()} className="btn btn-light mt-3">Close</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div >
    </div >
  );
};

export default FacultyDiscussion;
