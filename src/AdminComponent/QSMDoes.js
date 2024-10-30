import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";

const QSMDoes = () => {
  const [brand, setBrand] = useState([]);
  const [QMS, setQMS] = useState([]);
  const [role, setrole] = useState([]);
  const [vendordata, setVendorData] = useState([]);
  const [uid, setUid] = useState([]);
  const [cid, setCid] = useState("");
  const [error, setError] = useState({});
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [checked, setChecked] = React.useState([true, false]);
  const [image, setImage] = useState();

  const [value, setValue] = useState({
    qmsname: "" ,
    department: "",
    // file: "" || uid.file,
  });

  useEffect(() => {
    setValue({
      qmsname: uid.qmsname,
      department: uid.department,
      file: uid.file,
    });
  }, [uid]);

  useEffect(() => {
    getEmployeeData();
    getqms();
    getrole();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!value.qmsname) {
      isValid = false;
      newErrors.qmsname = "QMSName is Required";
    }

    if (!value.department) {
      isValid = false;
      newErrors.department = "Department is Required";
    }

    setError(newErrors);
    return isValid;
  };

  async function getEmployeeData() {
    const data = {
      tablename: "awt_qmsdoes",
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

  async function getqms() {
    axios
      .post(`${BASE_URL}/getqms_master`)
      .then((res) => {
        console.log(res.data);
        setQMS(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getrole() {
    axios
      .get(`${BASE_URL}/role_data`)
      .then((res) => {
        console.log(res.data);
        setrole(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

//   useEffect(() => {
//     getEmployeeData();
//     getqms();
//     getrole();
//     value.title = "";
//     setError({});
//     setUid([]);
//   }, []);

  const handleClick = (id) => {
    setCid(id);
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: true,
    }));
  };

  const handleCancel = (id) => {
    // Hide the confirmation dialog without performing the delete action
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  const handleUpdate = (id) => {
    const data = {
      u_id: id,
      tablename: "awt_qmsdoes",
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
      tablename: "awt_qmsdoes",
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

    if (validateForm()) {
      const formdata = new FormData();

      formdata.append("image", image);
      formdata.append("qmsname", value.qmsname);
      formdata.append("department", value.department);
      if (uid) {
        formdata.append("uid", uid);
      }
      axios
        .post(`${BASE_URL}/add_qmsdoes`, formdata)
        .then((res) => {
          console.log(res);
          getEmployeeData();
          setValue({ qmsname: "", department: "" });
          setImage(null);
          setUid(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onhandleupload = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const columns = [
    {
      field: "index",
      headerName: "Id",
      type: "number",
      align: "center",
      headerAlign: "center",
      flex: 1,
      filterable: false,
    },
    { field: "qmsname", headerName: "QMS Name", flex: 2 },
    { field: "department", headerName: "Department", flex: 2 },
    { field: "file", headerName: "File", flex: 2 },

    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
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
        );
      },
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
                  <h4 class="card-title">Add QMS Document</h4>
                  <hr></hr>
                  <form class="forms-sample py-3" onSubmit={handleSubmit}>
                    <div class="row">
                      <div class="form-group col-lg-3">
                        <label for="exampleFormControlSelect1">
                          QMS Name<span className="text-danger">*</span>{" "}
                        </label>
                        <select
                          class="form-control form-control-lg"
                          id="exampleFormControlSelect1"
                          value={value.qmsname}
                          onChange={onhandleChange}
                          name="qmsname"
                        >
                          <option>Select</option>
                          {QMS.map((item) => {
                            return (
                              <option value={item.Id}>{item.QMS_name}</option>
                            );
                          })}
                        </select>
                        {<span className="text-danger"> {error.qmsname} </span>}
                      </div>

                      <div class="form-group col-lg-3">
                        <label for="exampleFormControlSelect1">
                          Department<span className="text-danger">*</span>{" "}
                        </label>
                        <select
                          class="form-control form-control-lg"
                          id="exampleFormControlSelect1"
                          value={value.department}
                          onChange={onhandleChange}
                          name="department"
                        >
                          <option>Select</option>
                          {role.map((item) => {
                            return (
                              <option value={item.id}>{item.title}</option>
                            );
                          })}
                        </select>
                        {
                          <span className="text-danger">
                            {" "}
                            {error.department}{" "}
                          </span>
                        }
                      </div>

                      <div class="form-group col-lg-4">
                        <label for="exampleInputUsername1">Select File</label>
                        <input
                          type="file"
                          class="form-control"
                          id="exampleInputUsername1"
                          value={value.file}
                          name="file"
                          onChange={onhandleupload}
                        />
                      </div>

                      {/* <div className="container-fluid page-body-wrapper">
                                                <input type="file" onChange={handleFileChange} />
                                                {selectedFile && (
                                                    <div>
                                                    <p>Selected File: {selectedFile.name}</p>
                                                    <p>File Size: {selectedFile.size} bytes</p>
                                                    </div>
                                                )}
                                            </div> */}
                    </div>

                    <button type="submit" class="btn btn-primary mr-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.reload();
                      }}
                      class="btn btn-light"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 class="card-title">QMS Docs Details</h4>
                    </div>
                  </div>

                  <div>
                    <DataGrid
                      rows={rowsWithIds}
                      columns={columns}
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      rowHeight={35}
                      getRowId={(row) => row.id}
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 10, page: 0 },
                        },
                      }}
                      slots={{ toolbar: GridToolbar }}
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

                  {/* <div>
                                      <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Excel</button>
                                      </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QSMDoes;
