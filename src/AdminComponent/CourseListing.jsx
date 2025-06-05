import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid ,GridToolbar } from '@mui/x-data-grid';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loader from './Loader';
import { StyledDataGrid } from './StyledDataGrid';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';


const CACHE_KEY = 'course_data'; // Key for localStorage caching
const CACHE_EXPIRY_MS = 1000 * 60 * 15; // Cache expiry time (15 minutes)
const CourseListing = () => {

    const [brand, setBrand] = useState([])
    const [coursedata, setCourseData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading , setLoading] = useState(true)
    const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });
 



    async function getCourseData() {
    
        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                   // Cache data in localStorage
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: res.data,
                timestamp: Date.now()
            }));
                setCourseData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    



    useEffect(() => {
        // const cachedData = localStorage.getItem(CACHE_KEY);
        // if (cachedData) {
        //     const { data, timestamp } = JSON.parse(cachedData);
        //     // Check if cache is expired
        //     if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
        //         setCourseData(data);
        //         setLoading(false)
        //     } else {
        //         getCourseData(); // Fetch new data if cache is expired
        //     }
        // } else {
        // }
        getCourseData(); // Fetch data if not cached
    
        setError({})
        setUid([])
    }, [])

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
            delete_id: id,
            tablename: "Course_Mst",
            column_name: 'Course_Id'
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getCourseData()
            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }




const roledata = {
        role: Cookies.get(`role`),
        pageid: 13
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])

    const columns = [
        {
            field: 'index',
            headerName: 'Id',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 0.5,
            filterable: false,
        },
        { field: 'Course_Name', headerName: 'Course Name', flex: 2 },
        { field: 'Course_Code', headerName: 'Course Code', flex: 2 },
        { field: 'Introduction', headerName: 'Introduction', flex: 2 },
        ...(roleaccess > 2 ? [{
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess > 2 && <Link to={`/course/${params.row.Course_Id}`}><EditIcon style={{ cursor: "pointer" }}  /></Link>}
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Course_Id)} />}
                    </>
                )
            }
        },] : [])
    ];


    const rowsWithIds = coursedata.map((row, index) => ({ index: index + 1, ...row }));


    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />

           {loading && <Loader /> } 

            <div class="main-panel" style={{display : loading  ? "none" : "block"}}>
                <div class="content-wrapper">
                    <div class="row">
                   
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between' style={{ width: "100%", padding: "10px 0",borderBottom: "2px solid #dce4ec", }}>
                                        <div>
                                            <h4 class="card-title">List of Course ({coursedata.length})</h4>
                                            
                                        </div>
                                        {roleaccess > 1 && <Link to='/course/:courseid'> <button className='btn btn-success'>Add +</button></Link>}

                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.Course_Id}
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

                                        {confirmationVisibleMap[cid] && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default CourseListing