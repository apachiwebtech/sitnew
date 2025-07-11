import React, { useEffect, useState } from "react";
import InnerHeader from './InnerHeader';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { GridToolbar } from '@mui/x-data-grid';
import { StyledDataGrid } from "./StyledDataGrid";
import axios from "axios";
import { Link } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from './BaseUrl';

const EmployeeUser = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  const [vendordata, setVendordata] = useState([]);
  const [value, setValue] = useState({
    selectcourse: "All",
    searchText1: "",
    searchText2: ""
  });

  const dispatch = useDispatch();
  const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

  const roledata = {
    role: Cookies.get(`role`),
    pageid: 80
  };
   const fetchData = async () => {
    try {
      // 👇 Check and correct the API name here
const res = await axios.get(`${BASE_URL}/employeesdatas`);

      setVendordata(res.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.get(`${BASE_URL}/employeesdatas`, {
  //       params: {
  //         searchBy: value.selectcourse,
  //         searchText1: value.searchText1,
  //         searchText2: value.searchText2
  //       }
  //     });
  //     setVendordata(res.data);
  //   } catch (error) {
  //     console.error("Error filtering data", error);
  //   }
  // };
   

 useEffect(() => {
    // dispatch(getRoleData(roledata));
    fetchData();
  }, []);

 

  const onhandleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const columns = [
    { field: "code", headerName: "Code", align: "center", headerAlign: "center", flex: 1 },
    { field: "user_name", headerName: "Username", flex: 1.5 },
    { field: "employee_Name", headerName: "Employee Name", flex: 3 },
    { field: "department", headerName: "Department", flex: 2 },
    { field: "Designation", headerName: "Designation", flex: 2.5 },
    { field: "email_ID", headerName: "Email ID", flex: 3 },
    { field: "mobile", headerName: "Mobile", flex: 1.5 },
    { field: "status", headerName: "Status", flex: 1.5 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Action',
      flex: 1.5,
      renderCell: (params) => (
        <>
          <Link to={`/employeepersonaldetails/${params.row.id}`}><EditIcon style={{ cursor: "pointer" }} /></Link>
          <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
        </>
      )
    }
  ];

  const rowsWithIds = vendordata.map((row, index) => ({ id: index + 1, ...row }));

  return (
    <div className="container-fluid page-body-wrapper ">
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className='d-flex justify-content-between' style={{ borderBottom: "2px solid #dce4ec", width: "100%" }}>
                    <div>
                      <h4 className="card-title">View Users</h4>
                    </div>
                    <div className='my-2 text-right'>
                      <Link to='/employeepersonaldetails/new'>
                        <button className='btn btn-success'>Add +</button>
                      </Link>
                    </div>
                  </div>

                  <form className="forms-sample py-3" 
                  // onSubmit={handleSubmit}
                  >
                    <div className="row align-items-end">
                      <div className="form-group col-lg-3">
                        <label htmlFor="selectcourse">Select Search</label>
                        <select className="form-control form-control-lg" name="selectcourse" value={value.selectcourse} onChange={onhandleChange}>
                          <option value="All">All</option>
                          <option value="User Name Wise">User Name Wise</option>
                          <option value="Company Wise">Company Wise</option>
                          <option value="Name Wise">Name Wise</option>
                          <option value="Dept Wise">Dept Wise</option>
                          <option value="Email Wise">Email Wise</option>
                        </select>
                      </div>

                      <div className="form-group col-lg-3">
                        <label htmlFor="searchText1">Enter User Name</label>
                        <input type="text" className="form-control form-control-lg" name="searchText1" value={value.searchText1} onChange={onhandleChange} />
                      </div>

                      <div className="form-group col-lg-3">
                        <label htmlFor="searchText2">Select Category</label>
                        <select className="form-control form-control-lg" name="searchText2" value={value.searchText2} onChange={onhandleChange}>
                          <option value="">All</option>
                          <option value="Working">Working</option>
                          <option value="Resigned">Resigned</option>
                        </select>
                      </div>

                      <div className="form-group col-lg-3 d-flex">
                        <button type="submit" className="btn btn-primary me-3">Search</button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setValue({ selectcourse: "All", searchText1: "", searchText2: "" });
                            fetchData();
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </form>

                  <div style={{ borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden" }}>
                    <StyledDataGrid
                      rows={rowsWithIds}
                      columns={columns}
                      getRowId={(row) => row.id}
                      disableColumnSelector
                      disableDensitySelector
                      pagination
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      pageSizeOptions={[50]}
                      autoHeight={false}
                      sx={{ height: 500, '& .MuiDataGrid-footerContainer': { justifyContent: 'flex-end' } }}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{ toolbar: { showQuickFilter: true } }}
                    />
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

export default EmployeeUser;
