import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";
import { styled } from '@mui/material/styles';
import { SidebarContext } from "../context/SideBarContext";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: '#1d1d1d',
        ...theme.applyStyles('light', {
            backgroundColor: '#fafafa',
        }),
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: '1px solid #303030',
        ...theme.applyStyles('light', {
            borderRightColor: '#f0f0f0',
        }),
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: '1px solid #303030',
        ...theme.applyStyles('light', {
            borderBottomColor: '#f0f0f0',
        }),
    },
    '& .MuiDataGrid-cell': {
        color: 'rgba(255,255,255,0.65)',
        ...theme.applyStyles('light', {
            color: 'rgba(0,0,0,.85)',
        }),
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },


    ...theme.applyStyles('light', {
        color: 'rgba(0,0,0,.85)',
    }),
}));

const InquiryListing = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const { isSidebarOpen } = useContext(SidebarContext);
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [loading, setLoading] = useState(true)
    const [inquiryData, setInquiryData] = useState([]);

    const [value, setValue] = useState({
        from_date: "",
        to_date: ""
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
        if (value.from_date || value.to_date) {

        } else {
            alert('Nothing Is Select')
            return
        }
        if (value.from_date) {
            if (value.to_date) {

            } else {
                alert("Please select to date")
                return

            }
        } else {
            if (value.to_date) {
                alert("Please select from date")
                return
            }
        }
        setLoading(true)
        const data = {
            from_date: value.from_date,
            to_date: value.to_date
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
        {
            field: 'Student_Name', headerName: 'Student Name', width: 150, renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? <p className="text-danger font-12" >{params.row.Student_Name}</p> : <p className="font-12">{params.row.Student_Name}</p>}
                    </>
                )
            }
        },
        {
            field: 'Course_Name', headerName: 'Course Name', width: 150, renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? <p className="text-danger font-12" >{params.row.Course_Name}</p> : <p className="font-12">{params.row.Course_Name}</p>}
                    </>
                )
            }
        },
        {
            field: 'inquiry_DT', headerName: 'Inquiry Date', width: 100, renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? <p className="text-danger font-12" >{params.row.inquiry_DT}</p> : <p className="font-12">{params.row.inquiry_DT}</p>}
                    </>
                )
            }
        },
        {
            field: "Discussion",
            headerName: "Discussion",
            width: 250,
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            overflowWrap: "break-word", // Ensure long words break properly
                            lineHeight: 1,

                        }}
                    >
                        {params.row.IsUnread == 0 ? (
                            <p className="text-danger font-12">{params.row.Discussion}</p>
                        ) : (
                            <p className="font-12">{params.row.Discussion}</p>
                        )}
                    </div>
                );
            },
        },
        {
            field: 'present_mobile', headerName: 'Mobile', width: 100, renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? <p className="text-danger font-12" >{params.row.present_mobile}</p> : <p className="font-12">{params.row.present_mobile}</p>}
                    </>
                )
            }
        },
        {
            field: 'Email', headerName: 'Email', width: 200, renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? <p className="text-danger font-12" >{params.row.Email}</p> : <p className="font-12">{params.row.Email}</p>}
                    </>
                )
            }
        },
        {
            field: 'Deciplin', headerName: 'Discipline', width: 100, renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? <p className="text-danger font-12" >{params.row.Deciplin}</p> : <p className="font-12">{params.row.Deciplin}</p>}
                    </>
                )
            }
        },
        {
            field: 'Inquiry_type', headerName: 'Inquiry type', width: 100, renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? <p className="text-danger font-12" >{params.row.Inquiry_type}</p> : <p className="font-12">{params.row.Inquiry_type}</p>}
                    </>
                )
            }
        },
        {
            field: 'Status', headerName: 'Status', width: 150, renderCell: (params) => {
                return (
                    <>
                        {params.row.IsUnread == 0 ? <p className="text-danger font-12" >{params.row.Status}</p> : <p className="font-12">{params.row.Status}</p>}
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


    const paginationModel = (param) => {
        console.log(param)
    }

    return (

        <div className={`container-fluid page-body-wrapper `}>

            <InnerHeader />
            {loading && <Loader />}

            <div className="main-panel" style={{ display: loading ? "none" : "block" }}>

                <div className="content-wrapper">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="">
                                {/* <div className="card-body"> */}

                                <div className="card" >

                                    <div className="px-3">
                                        <form class="forms-sample row py-1 " onSubmit={handleSubmit}>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">From Date <span className='text-danger'>*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="from_date" name='from_date' onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">To Date <span className='text-danger'>*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="to_date" name='to_date' onChange={onhandleChange} />
                                            </div>
                                            <div className='d-flex align-items-center mt-3 col-lg-3' >
                                                <button type="submit" class="btn btn-sm btn-primary mr-2">Submit</button>
                                                <button type='reset' onClick={() => getInquiryData()} class="btn btn-sm btn-primary mr-2">Clear</button>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="m-2 float-right">
                                                    <Link to='/onlineinquiry/inquiryform/:inquiryid'> <button className='btn btn-success'>Add +</button></Link>
                                                </div>
                                            </div>
                                        </form>


                                    </div>
                                </div>

                                <div className="card">
                                    <StyledDataGrid
                                        rows={rowsWithIds}
                                        columns={columns}
                                        disableColumnSelector
                                        disableDensitySelector
                                        rowHeight={40}
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

                                        // sx={{
                                        //     "& .MuiDataGrid-cell": {
                                        //       borderRight: "1px solid #ccc", // Add border to cells
                                        //     },
                                        //     "& .MuiDataGrid-columnHeaders": {
                                        //       borderBottom: "2px solid #000", // Add border below header
                                        //     },
                                        //   }}

                                        sx={{
                                            "& .MuiDataGrid-cell": {
                                                whiteSpace: "normal",
                                                wordWrap: "break-word",
                                                overflowWrap: "break-word",
                                                lineHeight: 2,
                                                display: "block",
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
