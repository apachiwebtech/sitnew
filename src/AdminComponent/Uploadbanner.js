import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { StyledDataGrid } from "./StyledDataGrid";
//import FormControlLabel from '@mui/material/FormControlLabel';
// import ImageList from '@mui/material/ImageList';
// import { ImageSourcePropType } from 'react-native';

const UploadBanner = () => {
  const [brand, setBrand] = useState([]);
  const [vendordata, setVendorData] = useState([]);
  const [uid, setUid] = useState([]);
  const [image, setImage] = useState();
  const [cid, setCid] = useState("");
  const [error, setError] = useState({});
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [checked, setChecked] = React.useState([true, false]);
  const [paginationModel, setPaginationModel] = useState({
          pageSize: 50,
          page: 0,
        });

  const [value, setValue] = useState({
    titlename: "",
    seqno: "",
  });

  useEffect(() => {
    getVendorData();
    setValue({ titlename: "", seqno: "" });
    setError({});
    setUid({});
  }, []);

  useEffect(() => {
    if (uid.id) {
      setValue({
        titlename: uid.titlename,
        seqno: uid.seqno,
      });
    }
  }, [uid]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!value.titlename) {
      isValid = false;
      newErrors.titlename = "Title Name is Required";
    }
    if (!value.seqno) {
      isValid = false;
      newErrors.seqno = "Seq. No. is Required";
    }
    setError(newErrors);
    return isValid;
  };

  const getVendorData = () => {
    const data = { tablename: "awt_uploadbanner" };
    axios
      .post(`${BASE_URL}/get_data`, data)
      .then((res) => {
        console.log(res.data);
        setVendorData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getVendorData();
    value.title = "";
    setError({});
    setUid([]);
  }, []);

  const handleClick = (id) =>
    setCid(id) || setConfirmationVisibleMap({ [id]: true });

  const handleCancel = (id) =>
    setConfirmationVisibleMap((prevMap) => ({ ...prevMap, [id]: false }));

  const handleUpdate = (id) => {
    axios
      .post(`${BASE_URL}/update_data`, {
        u_id: id,
        tablename: "awt_uploadbanner",
      })
      .then((res) => setUid(res.data[0]))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .post(`${BASE_URL}/delete_data`, {
        cat_id: id,
        tablename: "awt_uploadbanner",
      })
      .then(() => getVendorData())
      .catch((err) => console.error(err));

    setConfirmationVisibleMap((prevMap) => ({ ...prevMap, [id]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("titlename", value.titlename);
      formdata.append("seqno", value.seqno);
      if (uid.id) {
        formdata.append("uid", uid.id);
      }

      try {
        const res = await axios.post(`${BASE_URL}/add_uploadbanner`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        getVendorData();
        
        setValue({ titlename: "", seqno: "" });
        setImage(null);
        document.getElementById("fileInput").value = "";
      } catch (err) {
        console.error(
          "Error uploading banner:",
          err.response ? err.response.data : err.message
        );
        alert(
          "Error uploading banner: " +
            (err.response ? err.response.data : "Something went wrong!")
        );
      }
    }
  };

  const clearForm = () => {
    setValue({ titlename: "", seqno: "" });
    setUid({});
    setImage(null);
    document.getElementById("fileInput").value = "";
  };

  const onhandleChange = (e) =>
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onhandleupload = (e) => setImage(e.target.files[0]);

  const columns = [
    {
      field: "index",
      headerName: "Id",
      type: "number",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    { field: "titlename", headerName: "Title Name", flex: 2 },
    { field: "file", headerName: "File", flex: 2 },
    { field: "seqno", headerName: "Seq. No.", flex: 2 },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdate(params.row.id)}
          />
          <DeleteIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleClick(params.row.id)}
          />
        </>
      ),
    },
  ];

  const rowsWithIds = vendordata.map((row, index) => ({
    index: index + 1,
    ...row,
  }));

  return (
    <div className="container-fluid page-body-wrapper ">
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Add Banner Image Details</h4>
                  <hr />
                  <form className="forms-sample py-3" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group col-lg-4">
                        <label>
                          Title Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          name="titlename"
                          value={value.titlename}
                          onChange={onhandleChange}
                        />
                        <span className="text-danger">{error.titlename}</span>
                      </div>
                      <div className="form-group col-lg-4">
                        <label>Upload File</label>
                        <input
                          type="file"
                          id="fileInput"
                          className="form-control"
                          name="file"
                          onChange={onhandleupload}
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label>
                          Seq. No.<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="No."
                          name="seqno"
                          value={value.seqno}
                          onChange={onhandleChange}
                        />
                        <span className="text-danger">{error.seqno}</span>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={clearForm}
                      className="btn btn-light"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card" style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                <div className="card-body" style={ { border: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                  <h4 className="card-title">View Banner Image</h4>
                  <StyledDataGrid
                    rows={rowsWithIds}
                    columns={columns}
                    rowHeight={35}
                    getRowId={(row) => row.id}
                    pagination
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions= {[50]}
                    autoHeight={false}
                    sx={{
                      height: 500, // Ensure enough height for pagination controls
                      '& .MuiDataGrid-footerContainer': {
                        justifyContent: 'flex-end',
                      },
                    }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                      },
                    }}
                  />
                  {confirmationVisibleMap[cid] && (
                    <div className="confirm-delete">
                      <p>Are you sure you want to delete?</p>
                      <button
                        onClick={() => handleDelete(cid)}
                        className="btn btn-sm btn-primary"
                      >
                        OK
                      </button>
                      <button
                        onClick={() => handleCancel(cid)}
                        className="btn btn-sm btn-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBanner;
