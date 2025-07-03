import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { StyledDataGrid } from "./StyledDataGrid";
// import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';
import { GridToolbar } from '@mui/x-data-grid';

const StockView = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  const [vendordata, setVendordata] = useState([]);
  const [value, setValue] = useState({ selectcourse: "All" });

  const dispatch = useDispatch();
  const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

  const roledata = {
    role: Cookies.get(`role`),
    pageid: 80
  };

  useEffect(() => {
    dispatch(getRoleData(roledata));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/materials_summary`);
      setVendordata(res.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/materials_summary`);
      let data = res.data;

      if (value.selectcourse !== "All") {
        data = data.filter(item => item.Category === value.selectcourse);
      }

      setVendordata(data);
    } catch (error) {
      console.error("Error filtering data", error);
    }
  };

  const onhandleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const columns = [
    {
      field: "Category",
      headerName: "Item Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      filterable: false,
    },
    {
      field: "total_qtyinstock",
      headerName: "Total Purchase",
      flex: 2,
    },
    {
      field: "total_qtyissue",
      headerName: "Consume",
      flex: 2,
    },
    {
      field: "remaining_stock",
      headerName: "Today's Stock",
      flex: 2,
    },
  ];

  const rowsWithIds = vendordata.map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  return (
    <div className="container-fluid page-body-wrapper">
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Stock View Report</h4>
                  <hr />
                  <form className="forms-sample py-3" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group col-lg-3">
                        <label htmlFor="exampleFormControlSelect1">Select Item</label>
                        <select
                          className="form-control form-control-lg"
                          id="exampleFormControlSelect1"
                          value={value.selectcourse}
                          name="selectcourse"
                          onChange={onhandleChange}
                        >
                          <option>All</option>
                          <option>PEN</option>
                          <option>Apsara Pencil</option>
                          <option>Asignment front Pages</option>
                          <option>A4 Papers</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">
                      View
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div
                    className="d-flex justify-content-between"
                    style={{ borderBottom: "2px solid #dce4ec", width: "100%" }}
                  >
                    <div>
                      <h4 className="card-title">Book Issue</h4>
                    </div>
                  </div>

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
                      sx={{
                        height: 500,
                        '& .MuiDataGrid-footerContainer': {
                          justifyContent: 'flex-end',
                        },
                      }}
                      slots={{
                        toolbar: GridToolbar,
                      }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                        },
                      }}
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

export default StockView;
