import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const UploadEventPhoto = () => {
  const [brand, setBrand] = useState([]);
  const [vendordata, setVendorData] = useState([]);
  const [specification, setSpecification] = useState("");
  const [uid, setUid] = useState([]);
  const [cid, setCid] = useState("");
  const [error, setError] = useState({});
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [checked, setChecked] = React.useState([true, false]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [eventPhotoId, setEventPhotoId] = useState(null);

  const [value, setValue] = useState({
    event: "" || uid.event,
    eventheader: "" || uid.eventheader,
    specification: "" || uid.specification,
  });

  useEffect(() => {
    setValue({
      event: uid.event,
      eventheader: uid.eventheader,
      specification: uid.specification,
    });
  }, [uid]);

  async function getEmployeeData() {
    const data = {
      tablename: "awt_uploadeventphoto",
    };
    axios
      .post(`${BASE_URL}/get_data`, data)
      .then((res) => {
        console.log(res.data);
        setVendorData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getEmployeeData();
    // value.title = "";
    setError({});
    setUid([]);
  }, []);

  const handleClick = (id) => {
    setCid(id);
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: true,
    }));
  };

  const handleCancel = (id) => {
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  const handleUpdate = (id) => {
    const data = {
      u_id: id,
      tablename: "awt_uploadeventphoto",
    };
    axios
      .post(`${BASE_URL}/update_data`, data)
      .then((res) => {
        setUid(res.data[0]);
        console.log(res.data, "update");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    const data = {
      cat_id: id,
      tablename: "awt_uploadeventphoto",
    };

    axios
      .post(`${BASE_URL}/delete_data`, data)
      .then((res) => {
        getEmployeeData();
      })
      .catch((err) => {
        console.log(err);
      });

    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const formData = new FormData();
    const data = {
      event: value.event,
      eventheader: value.eventheader,
      specification: specification,
      uid: uid.id,
    };

    axios
      .post(`${BASE_URL}/add_uploadeventphoto`, data)
      .then((res) => {
        console.log(res);
        getEmployeeData();
        // formData.append("event_id", res);
        setEventPhotoId(res.data.id);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
    setImageNames(selectedImages.map((file) => file.name));
  };

  const uploadImages = () => {
    const formData = new FormData();
    formData.append('event_photo_id', eventPhotoId);
    images.forEach((image, index) => {
      formData.append(`image`, image);
    });
    console.log([...formData]);
    axios
      .post(`${BASE_URL}/upload_img`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("Images uploaded successfully:", res.data);
        setIsModalOpen(false);
        getEmployeeData();
        setImages([]); // Clear the selected images
        setImageNames([]); 
      })
      .catch((err) => {
        console.log("Error uploading images:", err);
      });
  };

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const columns = [
    { field: "index", headerName: "Id", type: "number", align: "center", headerAlign: "center", flex: 1, filterable: false },
    { field: "event", headerName: "Attendee", flex: 2 },
    { field: "eventheader", headerName: "Instructor", flex: 2 },
    {
      field: "specification",
      headerName: "Description",
      flex: 2,
      renderCell: (params) => (
        <div dangerouslySetInnerHTML={{ __html: params.row.specification }}></div>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
          <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
        </>
      ),
    },
  ];

  const rowsWithIds = vendordata.map((row, index) => ({
    index: index + 1,
    ...row,
  }));

  return (
    <div class="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Upload Event Photos</h4>
                  <hr />
                  <form class="forms-sample py-3" onSubmit={handleSubmit}>
                    <div class="row">
                      <div class="form-group col-lg-4">
                        <label for="exampleFormControlSelect1">Select Event Type</label>
                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.event} onChange={onhandleChange} name="event">
                          <option>Select</option>
                          <option>Convocation</option>
                          <option>Seminar</option>
                          <option>Exhibition</option>
                          <option>Induction</option>
                          <option>Testimonials</option>
                        </select>
                      </div>
                      <div class="form-group col-lg-4">
                        <label for="exampleInputUsername1">Event Header</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.eventheader} name="eventheader" onChange={onhandleChange} />
                      </div>
                      <div class="form-group col-lg-12">
                        <label for="exampleTextarea1">Event Description</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={uid.specification}
                          onReady={(editor) => { editor.ui.view.editable.element.style.minHeight = "300px"; }}
                          onChange={(event, editor) => { setSpecification(editor.getData()); }}
                        />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                    <button type="button" onClick={() => { window.location.reload(); }} class="btn btn-light">Cancel</button>{" "}
                    <span className="text-danger"> *Save the event then upload the images</span>
                  </form>

                  {isModalOpen && (
                    <div style={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "400px",
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
                      padding: "20px",
                      textAlign: "center",
                    }}>
                      <h5 style={{ marginBottom: "15px", fontWeight: "bold" }}>Upload Images</h5>
                      <input type="file" multiple onChange={handleImageChange} className="form-control" style={{ border: "1px solid #ced4da", borderRadius: "5px", marginBottom: "15px", width: "100%" }} />
                      {imageNames.length > 0 && <ul>{imageNames.map((name, index) => (<li key={index}>{name}</li>))}</ul>}
                      <button onClick={uploadImages} className="btn btn-primary">Upload</button>
                    </div>
                  )}

                  <div class="table-responsive">
                    <DataGrid
                      rows={rowsWithIds}
                      columns={columns}
                      autoHeight
                      density="compact"
                      components={{ Toolbar: GridToolbar }}
                      disableRowSelectionOnClick
                    />
                  </div>

                  {Object.keys(confirmationVisibleMap).map((id) => confirmationVisibleMap[id] && (
                    <div key={id} style={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "300px",
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
                      padding: "20px",
                      textAlign: "center",
                    }}>
                      <p>Are you sure you want to delete this record?</p>
                      <button onClick={() => handleDelete(id)} className="btn btn-danger">Yes</button>
                      <button onClick={() => handleCancel(id)} className="btn btn-secondary" style={{ marginLeft: "10px" }}>No</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadEventPhoto;
