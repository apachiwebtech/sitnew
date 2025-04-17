import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import BatchEdit from "./BatchEdit";
import InnerHeader from "./InnerHeader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { StyledDataGrid } from "./StyledDataGrid";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Convocation = () => {

  const [open, setOpen] = React.useState(false);
  const { batchid } = useParams();
  console.log("Batch ID:", batchid);
  const [paginationModel, setPaginationModel] = useState({
          pageSize: 50,
          page: 0,
        });
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [cid, setCid] = useState("")
  const [uid, setUid] = useState([])
  const [batchData, setBatchData] = useState({})
  const [convocationData, setConvocationData] = useState([])
  const [convocationDataM, setConvocationDataM] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValue(
      {
        faculty_name: "",
        guest_name: "",
        guest_mobile: "",
        email: "",
        guest_designation: "",

      }
    )
    setUid([])
  };

  const [onlineAdmissions, setOnlineAdmissions] = useState([]);

  async function getUnitTest() {

    const data = {
      batch_id: batchid

    }
    axios.post(`${BASE_URL}/batch_convocation`, data)
      .then((res) => {
        setOnlineAdmissions(res.data);
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
    console.log("Batch ID:", batchid);
  }

  useEffect(() => {
    getUnitTest();
  }, []);

  const memoizedAdmissions = useMemo(() => onlineAdmissions, [onlineAdmissions]);

  const [value, setValue] = useState({
    faculty_name: "" || uid.faculty_name,
    guest_name: "" || uid.guest_name,
    guest_mobile: "" || uid.guest_mobile,
    email: "" || uid.email,
    guest_designation: "" || uid.guest_designation,

  })

  useEffect(() => {
    setValue({
      faculty_name: uid.faculty_name,
      guest_name: uid.guest_name,
      guest_mobile: uid.guest_mobile,
      email: uid.email,
      guest_designation: uid.guest_designation,
    })
  }, [uid])

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  useEffect(()=>{
    getBatch()
    getConvocationData()
  },[])


  const getConvocationData = async()=>{
    try{
        const response = await axios.get(`${BASE_URL}/getConvocation`)
        setConvocationData(response.data)
    }catch(err){
        console.log(err)
    }
  }
  const getBatch = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getbatch`);

        const data = response.data.reduce((acc, curr)=>({
            ...acc,
            [curr.Batch_Id]:curr.Batch_code
        }),{})

        setBatchData(data)
    } catch (err) {
        console.log(err);
    }
  };

  useEffect(()=>{
    if(convocationData.length>0 && Object.keys(batchData).length>0){
        const data = convocationData.map((row)=>{
            let batchCodeStr = ''
            const batchIdArr = row.Batch_Id ? row.Batch_Id.split(','):[]
            batchCodeStr = batchIdArr.map((id)=>batchData[id]).join(',')
            return {...row, Batch_Code: batchCodeStr}
        })
        setConvocationDataM(data)
    }
  },[convocationData, batchData])

  const handleDeleteConfirm = async()=>{
    try{
        await axios.post(`${BASE_URL}/deletePChild`,{
            parentTable: 'Convocation_Guest_List',
            parentColumn: 'Id',
            childTable: 'Convocation_Guest_List_Child',
            childColumn: 'Id',
            id: deleteId
        })
        setDeleteId(null)
        getConvocationData()
        alert('Data deleted successfully')
    }catch(err){
        setDeleteId(null)
        console.log('Error deleting data',err)
        alert('Error deleting data')
    }
  }

  const columns = [
    { field: "Batch_Code", headerName: "Batch Code", flex:2, },
    {
      field: "DateAdded",
      headerName: "Convocation Date",
      flex: 1,
      renderCell: (params) => {
        if (!params.value) return ""; // Handle empty values
    
        // Check if already in DD-MM-YYYY format
        const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (ddmmyyyyRegex.test(params.value)) {
          return params.value; // Return as-is if already formatted
        }
    
        const date = new Date(params.value);
        if (isNaN(date.getTime())) return params.value; // Return original value if not a valid date
    
        // Convert valid date to DD-MM-YYYY format
        return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
      },
    },
    
    { field: "Combined_FName", headerName: "Faculty Name", flex: 2 },
    {
      field: 'actions',
      headerName: 'Action',
      flex:0.8,
      align: 'center',
      renderCell: (params) => {
        return (
          <>
            <EditIcon style={{ cursor: "pointer" }} onClick={()=>navigate(`/convocation/${params.row.Id}`)} />
            <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => setDeleteId(params.row.Id)} />
          </>
        )
      }
    },
  ];


  const rowsWithIds = memoizedAdmissions.map((row, index) => ({
    index: index + 1,
    ...row,
  }));

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      faculty_name: value.faculty_name,
      guest_name: value.guest_name,
      guest_mobile: value.guest_mobile,
      email: value.email,
      guest_designation: value.guest_designation,
      uid: uid.id,
      batch_id: batchid
    }

    axios.post(`${BASE_URL}/add_batchconvocation`, data)
      .then((res) => {
        console.log(res)
        setOpen(false)
        getUnitTest()
        setUid([])
      })

  }

  return (
    <div className="container-fluid page-body-wrapper ">
      <InnerHeader />
      <div className="main-pannel">
        <div className="content-wrapper ">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div
                    className="d-flex justify-content-between gap-3"
                    style={{borderBottom: "2px solid #dce4ec", width: "100%", padding: "10px 0" }}
                  >
                    <div>
                      <h4 class="card-title">Convocation</h4>
                    </div>
                    {/* <button
                      className="btn btn-success"
                      onClick={handleClickOpen}
                    >
                      Add +
                    </button> */}
                    <Link to='/convocation/:Id' className='btn btn-success'>
                        Add +
                    </Link>
                  </div>

                  <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                    <StyledDataGrid
                      rows={convocationDataM}
                      columns={columns}
                      // disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      rowHeight={37}
                      getRowId={(row) => row.Id}
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
                                            slots={{
                                              toolbar: GridToolbar
                                          }}
                                            slotProps={{
                                              toolbar: {
                                                showQuickFilter: true,
                                              },
                                            }}
                    />
                    {deleteId && (
                        <div className='confirm-delete'>
                            <p>Are you sure you want to delete?</p>
                            <button type='button' onClick={() =>{ 
                                    handleDeleteConfirm()
                            }} className='btn btn-sm btn-primary'>OK</button>
                            <button type='button' onClick={()=>setDeleteId(null)} className='btn btn-sm btn-danger'>Cancel</button>
                        </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Company Information
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center" >
              <div className="p-3" style={{ width: "100%" }}>
                <div className="row">
                  <div className="form-group col-lg-4 ">

                    <label for="exampleInputUsername1">
                      Faculty Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.faculty_name}
                      placeholder="Enter.."
                      name="faculty_name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.guest_name}
                      placeholder="Enter.."
                      name="guest_name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Guest Mobile
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.guest_mobile}
                      placeholder="Enter.."
                      name="guest_mobile"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Email
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.email}
                      placeholder="Enter.."
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-lg-4">
                    <label for="exampleInputUsername1">
                      Guest Designation
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      value={value.guest_designation}
                      placeholder="Enter.."
                      name="guest_designation"
                      onChange={handleChange}
                    />
                  </div>


                  <div className="form-group col-lg-12 ">
                    <button className="btn btn-success" type="submit">Save</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row p-2 gap-2">
              {/* <button className='mr-2 btn btn-primary'>Save</button> */}
              {/* <button className='col-2'>close</button> */}
            </div>
          </form>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </BootstrapDialog>

    </div>
  );
};

export default Convocation;
