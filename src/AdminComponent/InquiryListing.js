import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";

const InquiryListing = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")

    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [loading , setLoading] = useState(true)
    const [inquiryData, setInquiryData] = useState([]);

    const [value, setValue] = useState({
      from_date:"",
      to_date:""
    })


    const getInquiryData = async () => {

        const response = await fetch(`${BASE_URL}/getadmissionactivity`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setInquiryData(data);
        setLoading(false)
    }






    useEffect(() => {
        getInquiryData()

        setError({})
        setUid([])
    }, [])


    const handleSubmit = (e) => {
      e.preventDefault()
      if ( value.from_date || value.to_date ) {

      }else{
        alert('Nothing Is Select')
        return
      }
      if (value.from_date) {
        if (value.to_date) {

        }else{
          alert("Please select to date")
          return

        }
      }else{
        if (value.to_date) {
          alert("Please select from date")
          return
        }
      }
      setLoading(true)
      const data = {
        from_date : value.from_date,
        to_date : value.to_date
      }

      axios.post(`${BASE_URL}/getfilterinqury`, data)
      .then((res) => {
         console.log(res)
         setInquiryData(res.data)
         setLoading(false)
         setUid([])
         setValue({
          from_date: '',
          to_date: ''
       })
      })
      .catch((err) => {
          console.log(err)
          setLoading(false)
      })

    }

    const handleClick = (id) => {
        setCid(id)
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


    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "Student_Inquiry"
        }

        axios.post(`${BASE_URL}/delete_inquiry_data`, data)
            .then((res) => {
                getInquiryData()
            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }


    const handleswitchchange = (value, Inquiry_Id) => {
        const newval = value == 0 ? 1 : 0

        axios.post(`${BASE_URL}/data_status`, { status: newval, Inquiry_Id: Inquiry_Id, table_name: "Student_Inquiry" })
            .then((res) => {
                alert("Status changed...")
                getInquiryData()
            })
    }

    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            {/* <GridToolbarExport /> */}
            <GridToolbarFilterButton />
          </GridToolbarContainer>
        );
      }


    const columns = [

        {
            field: 'index',
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            width: 50,
            filterable: false,
        },
        { field: 'Student_Name', headerName: 'Student Name',  width : 200 , renderCell:(params) =>{
            return(
                <>
                  {params.row.IsUnread == 0 ?<p className ="text-danger" >{params.row.Student_Name}</p> : <p>{params.row.Student_Name}</p> }
                </>
            )
        } },
        { field: 'Course_Name', headerName: 'Course Name',  width : 150 , renderCell:(params) =>{
            return(
                <>
                  {params.row.IsUnread == 0 ?<p className ="text-danger" >{params.row.Course_Name}</p> : <p>{params.row.Course_Name}</p> }
                </>
            )
        }},
        { field: 'inquiry_DT', headerName: 'Inquiry Date', width : 100 , renderCell:(params) =>{
            return(
                <>
                  {params.row.IsUnread == 0 ?<p className ="text-danger" >{params.row.inquiry_DT}</p> : <p>{params.row.inquiry_DT}</p> }
                </>
            )
        }},
        { field: 'Discussion', headerName: 'Discuss', width : 200 , renderCell:(params) =>{
            return(
                <>
                  {params.row.IsUnread == 0 ?<p className ="text-danger" >{params.row.Discussion}</p> : <p>{params.row.Discussion}</p> }
                </>
            )
        }},
        { field: 'present_mobile', headerName: 'Mobile', width : 100 , renderCell:(params) =>{
            return(
                <>
                  {params.row.IsUnread == 0 ?<p className ="text-danger" >{params.row.present_mobile}</p> : <p>{params.row.present_mobile}</p> }
                </>
            )
        }},
        { field: 'Deciplin', headerName: 'Discipline',  width : 150 , renderCell:(params) =>{
            return(
                <>
                  {params.row.IsUnread == 0 ?<p className ="text-danger" >{params.row.Deciplin}</p> : <p>{params.row.Deciplin}</p> }
                </>
            )
        }},
        { field: 'Inquiry_type', headerName: 'Inquiry type', width : 100 , renderCell:(params) =>{
            return(
                <>
                  {params.row.IsUnread == 0 ?<p className ="text-danger" >{params.row.Inquiry_type}</p> : <p>{params.row.Inquiry_type}</p> }
                </>
            )
        }},
        { field: 'Status', headerName: 'Status', width : 150,renderCell: (params) => {
            return (
                <>
                  {params.row.IsUnread == 0 ?<p className ="text-danger" >{params.row.Status}</p> : <p>{params.row.Status}</p> }
                </>
            )
        }

         },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/inquiry/${params.row.id}`} ><EditIcon style={{ cursor: "pointer" }} /></Link>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                        <Switch {...label} onChange={() => handleswitchchange(params.row.isActive, params.row.id)} defaultChecked={params.row.isActive == 0 ? false : true} color="secondary" />
                    </>
                )
            }
        },
    ];
 const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
}

    const rowsWithIds = inquiryData.map((row, index) => ({ index: index + 1, ...row }));


    const paginationModel = (param) =>{
       console.log(param)
    }

    return (

        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
           {loading &&  <Loader />}

            <div className="main-panel" style={{display : loading ? "none" : "block"}}>

                <div className="content-wrapper">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="">
                                {/* <div className="card-body"> */}
                                    <div className='d-flex justify-content-between gap-3' style={{ width: "100%", padding: "10px 0" }}>
                                        <div >
                                            {/* <h4 class="card-title">List Of Inquiry</h4> */}
                                        </div>
                                        <Link to='/onlineinquiry/inquiryform/:inquiryid'> <button className='btn btn-success'>Add +</button></Link>


                                    </div>
                                    <div className="card" >
                                      <div className="card-body">
                                      <form class="forms-sample row py-3 " onSubmit={handleSubmit}>
                                          <div class="form-group col-lg-3">
                                            <label for="exampleInputUsername1">From Date <span className='text-danger'>*</span></label>
                                            <input type="date" class="form-control" id="exampleInputUsername1" placeholder="from_date" name='from_date' onChange={onhandleChange}/>
                                          </div>
                                          <div class="form-group col-lg-3">
                                            <label for="exampleInputUsername1">To Date <span className='text-danger'>*</span></label>
                                            <input type="date" class="form-control" id="exampleInputUsername1" placeholder="to_date" name='to_date' onChange={onhandleChange}/>
                                          </div>
                                          <div className='d-flex align-items-center mt-3' >
                                            <button type="submit" class="btn btn-sm btn-primary mr-2">Submit</button>
                                            <button type='reset' onClick={()=>getInquiryData() } class="btn btn-sm btn-primary mr-2">Clear</button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>

                                    <div className="card">
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            // pageSizeOptions={[5]}
                                            // paginationMode="server"
                                            onPaginationModelChange={paginationModel}
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                            slots={{ toolbar: CustomToolbar }}
                                            slotProps={{
                                                toolbar: {
                                                    showQuickFilter: true,
                                                },
                                            }}
                                        />

                                        {confirmationVisibleMap[cid] && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                    </div>



                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default InquiryListing
