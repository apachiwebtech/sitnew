import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { BASE_URL, IMG_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
//import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';

const FacultyExperience = () => {

    const { facultyid } = useParams();
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const storedFacultyId = localStorage.getItem("faculty_id");



    const [value, setValue] = useState({
  idproof: null,
  addressproof: null,
  facultycv: null,
});




   async function getFacultyExperience() {
  try {
    const res = await axios.post(`${BASE_URL}/get_faculty_documents`, { facultyid });

    if (res.data.success) {
      const files = res.data.documents;

      const docMap = {};
      files.forEach(file => {
        // Match known types and store the URL
        if (file.type === "ID Proof") docMap.idproof = file.url;
        if (file.type === "Address Proof") docMap.addressproof = file.url;
        if (file.type === "CV") docMap.facultycv = file.url;
      });

      setValue(prev => ({
        ...prev,
        ...docMap,
      }));
    }
  } catch (err) {
    console.error("Error fetching documents:", err);
  }
}

    useEffect(() => {
            if (facultyid !== ":facultyid") {
                getFacultyExperience()
            }
    
            value.title = ""
            setError({})
            setUid([])
        }, [])


        

   const handleSubmit = async (e) => {
  e.preventDefault();

  const uploadSingleFile = async (file, typeLabel) => {
    const formData = new FormData();
    formData.append("faculty_id", facultyid); // important: use 'faculty_id' as backend expects
formData.append("file", file);            // key must be 'file'
formData.append("fileType", typeLabel);   // for DB
formData.append("doc_name", typeLabel);   // for filename

    try {
      await axios.post(`${BASE_URL}/add_faculty_documents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`${typeLabel} uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${typeLabel}:`, error.response?.data || error);
      alert(`Error uploading ${typeLabel}`);
    }
  };

  // Upload each file with a label used as doc_name in backend
  if (value.idproof) await uploadSingleFile(value.idproof, "ID Proof");
  if (value.addressproof) await uploadSingleFile(value.addressproof, "Address Proof");
  if (value.facultycv) await uploadSingleFile(value.facultycv, "CV");
};



const onhandleChange = (e) => {
  const { name, files } = e.target;
  setValue((prev) => ({
    ...prev,
    [name]: files[0] // gets the selected file
  }));
};


    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="d-flex">

                            <div className='px-2 mx-2'><Link to={`/faculty/${facultyid}`}><h4>Personal Information</h4></Link></div>
                           
                            <div className='px-2 mx-2'><Link to={`/addfacultymaster/${facultyid}` }><h4>Current Experience/Other Details</h4></Link></div>
                             <div className='px-2 mx-2'><Link to={`/facademicqualification/${facultyid}`}><h4>Academic Qualification</h4></Link></div>

                            <div className='px-2 mx-2'><Link to={`/facultyexperience/${facultyid}`}><h4>Total Experience and Documents</h4></Link></div>
                            <div className='px-2 mx-2'><Link to={`/facultydiscussion/${facultyid}`}><h4>Discussion</h4></Link></div>

                        </div>
                        <div class="col-lg-12 grid-margin">
<form onSubmit={handleSubmit}>
                            <div class="card" >
                                <div className='container-fluid'>
                                    <div className='row justify-content-center'>
                                        <div className='p-3' style={{ width: "100%" }}>
                                            <div>
                                                <h4 class="card-title titleback">Edit Faculty</h4>
                                            </div>
                                            <div class='row'>
                                               <div className="form-group col-lg-3">
  <label htmlFor="idproof">ID Proof</label>
  <input
    type="file"
    className="form-control"
    id="idproof"
    name="idproof"
    onChange={onhandleChange}
  />
  {value.idproof && (
    <a
      href={`${IMG_URL}${value.idproof}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontSize: "0.875rem", color: "#007bff", display: "block", marginTop: "4px" }}
    >
      View Uploaded ID Proof
    </a>
  )}
</div>

<div className="form-group col-lg-3">
  <label htmlFor="addressproof">Address Proof</label>
  <input
    type="file"
    className="form-control"
    id="addressproof"
    name="addressproof"
    onChange={onhandleChange}
  />
  {value.addressproof && (
    <a
      href={`${IMG_URL}${value.addressproof}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontSize: "0.875rem", color: "#007bff", display: "block", marginTop: "4px" }}
    >
      View Uploaded Address Proof
    </a>
  )}
</div>

<div className="form-group col-lg-3">
  <label htmlFor="facultycv">CV</label>
  <input
    type="file"
    className="form-control"
    id="facultycv"
    name="facultycv"
    onChange={onhandleChange}
  />
  {value.facultycv && (
    <a
      href={`${IMG_URL}${value.facultycv}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontSize: "0.875rem", color: "#007bff", display: "block", marginTop: "4px" }}
    >
      View Uploaded CV
    </a>
  )}
</div>


                                                
                                                {/* <button
                                                  type="button"
                                                  onClick={() => window.location.reload()}
                                                  className="btn btn-light btn-sm col-lg-2"
                                                  style={{ height: "40px", top: "29px" }}
                                                >
                                                  Download Docs.
                                                </button> */}


                                            </div>
                                           <button type="submit" className="btn btn-primary mr-2">Save</button>
                                        <button type='button' onClick={() => window.location.reload()} className="btn btn-light">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default FacultyExperience;
