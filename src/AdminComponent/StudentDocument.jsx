import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import OnlineAdmissionForm from "./OnlineAdmissionForm";

import axios from "axios";
import Admissionform from "./Admissionform";
import InnerHeaderForm from "./InnerHeaderForm";



const StudentDocument = () => {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState(null);
  const [name, SetName] = useState('')


  const{admissionid}  = useParams();

  useEffect(()=>{
      localStorage.setItem("Admissionid", admissionid);
  },[])

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);

  async function getOnlineAdmissions() {

    const data = {
      student_id: localStorage.getItem(`Admissionid`)
    }
    axios.post(`${BASE_URL}/getdocuments`, data)
      .then((res) => {
        console.log(res)
        setOnlineAdmissions(res.data)
      })
  }

  useEffect(() => {
    getOnlineAdmissions();
  }, []);


  const columns = [
    {
      field: "index",
      headerName: "id",
      type: "number",
      align: "center",
      headerAlign: "center",
      flex: 1,
      filterable: false,
    },
    { field: "doc_name", headerName: "Document Name", flex: 2 },
    { field: "upload_image", headerName: "Image", flex: 2 },


  ];

  const rowsWithIds = onlineAdmissions.map((row, index) => ({
    index: index + 1,
    ...row,
  }));

  const handleUpload3 = async (e) => {
    const file = e.target.files[0];
    setImage(file);

  };

  const handlesubmit = (e) => {
    e.preventDefault()

    const data = {
      doc_name: name,
      image: image,
      student_id: localStorage.getItem(`Admissionid`)
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('doc_name', name);
    formData.append('student_id', data.student_id);

    fetch(`${BASE_URL}/upload_doc`, {
      method: 'POST',
      body: formData
    })

      .then((res) => {
      
        alert("File Uploaded")
        getOnlineAdmissions()
    
      })

  }


  return (
    <div className="container-fluid page-body-wrapper col-lg-12">

      <InnerHeaderForm />
      
      <div className="main-pannel">
        <div className="content-wrapper ">
          <Admissionform admissionid={admissionid} />
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div
                    className="d-flex justify-content-between gap-3"
                    style={{ width: "100%", padding: "10px 0" }}
                  >
                    <div>
                      <h4 class="card-title">Add Documents</h4>
                    </div>
                    {/* <button
                      className="btn btn-success"
                      onClick={handleClickOpen}
                    >
                      Add +
                    </button> */}
                  </div>
                  <div className="row">
                    <div className="col-lg-6 p-0">
                      <div>
                        <h4 className="card-title titleback">Documents List</h4>
                      </div>
                      <DataGrid
                        rows={rowsWithIds}
                        columns={columns}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        rowHeight={37}
                        getRowId={(row) => row.id}
                        initialState={{
                          pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                          },
                        }}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                          toolbar: {
                            showQuickFilter: false,
                          },
                        }}
                      />
                    </div>
                    <div className="col-lg-6 " onSubmit={handlesubmit}>
                      <form>                      <div>
                        <h4 className="card-title titleback">
                          Upload Documents
                        </h4>
                      </div>
                        <div className="form-group col-lg-6">
                          <label for="exampleInputUsername1">
                            Name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"

                            placeholder="Name"
                            name="remark"
                            onChange={(e) => SetName(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-lg-6">
                          <label for="exampleInputUsername1">
                            Upload<span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="exampleInputUsername1"
                            placeholder=" Remark"
                            name="remark"
                            onChange={handleUpload3}
                          />
                        </div>
                        <button className="btn btn-success" style={{ float: "inline-end" }}>Save</button>
                      </form>

                    </div>
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

export default StudentDocument;
