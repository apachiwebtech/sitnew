import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid ,GridToolbar} from '@mui/x-data-grid';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';
import { StyledDataGrid } from './StyledDataGrid';
import { BorderAll } from '@mui/icons-material';

const Discipline = () => {

    const [Discipline, setDisciplinedata] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
     const [paginationModel, setPaginationModel] = useState({
            pageSize: 50,
            page: 0,
          });
 

    const [value, setValue] = useState({
        discipline: "" || uid.Discipline,

    })

    useEffect(() => {
        setValue({
            discipline: uid.Discipline,
        })

    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.discipline) {
            isValid = false;
            newErrors.discipline = "Name is require"
        }

        setError(newErrors)
        return isValid
    }




    async function getDiscipline() {

        axios.get(`${BASE_URL}/get_dicipline`)
            .then((res) => {
                console.log(res.data)
                setDisciplinedata(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDiscipline()
        value.title = ""
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

    const handleUpdate = (id) => {
        setValue({
            discipline :"",
        })
        const data = {
            u_id: id,
            uidname: "Id",
            tablename: "MST_Deciplin"
        }
        axios.post(`${BASE_URL}/new_update_data`, data)
            .then((res) => {
                setUid(res.data[0])
                setValue({
                    discipline :res.data[0].Deciplin,
                })
                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const data = {
            delete_id: id,
            tablename: "MST_Deciplin",
            column_name: 'Id'
        }

        axios.post(`${BASE_URL}/new_delete_data`, data)
            .then((res) => {
                getDiscipline()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                Discipline:  value.discipline,
                u_id : uid.Id
            }


            axios.post(`${BASE_URL}/add_dicipline`, data)
                .then((res) => {
                    console.log(res)
                    getDiscipline()
                    alert("Data Submitted Successfully")
                    setUid([])
                    setValue({
                        discipline :""
                     })
                })
                .catch((err) => {
                    console.log(err)
                })
        }





    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }






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
        { field: 'Deciplin', headerName: 'Discipline', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                       {roleaccess >=2 && <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.Id)} />} 
                        {roleaccess > 3 &&  <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.Id)} />}
                    </>
                )
            }
        },
    ];


    const rowsWithIds = Discipline.map((row, index) => ({ index: index + 1, ...row }));

    const roledata = {
        role: Cookies.get(`role`),
        pageid: 1
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])

    


    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />

          {roleaccess > 1 ?     <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Discipline</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Disciplaine<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.discipline} placeholder="Disciplain" name='discipline' onChange={onhandleChange} />
                                                {error.discipline && <span className='text-danger'>{error.discipline}</span>}
                                            </div>
                                        </div>


                                        {roleaccess > 2 && <button type="submit" class="btn btn-primary mr-2">Submit</button>}
                                        {roleaccess > 2 &&  <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>}
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between' >
                                        <div 
                                        style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                            <h4 class="card-title">List of Discipline</h4>
                                            
                                        </div>

                                    </div>

                                    <div 
                                    style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "hidden"}}>
                                   
                                    <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            // disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
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
            </div >:null } 
      
        </div >

    )
}

export default Discipline