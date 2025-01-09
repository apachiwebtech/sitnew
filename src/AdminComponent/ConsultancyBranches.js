import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams,useSearchParams } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from '@mui/material/Switch';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Faculty from './Faculty';
import ConsultancyMaster from './ConsultancyMaster';
import axios from 'axios';
//import FormControlLabel from '@mui/material/FormControlLabel';

const ConsultancyBranches = () => {
    const { facultyid } = useParams();
    const [searchParams] = useSearchParams()
    const Const_Id = searchParams.get('Const_Id')
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [consultancyBranches, setConsultancyBranches] = useState([]) 
    const initialState = {
        Branch_Id: null,
        Contact_Person: "",
        Designation: "",
        Branch_Address: "",
        Branch_City: "",
        Branch_Tel: "",
        Mobile: "",
        Email: ""
    }
    const[formState, setFormState] = useState(initialState)
    const[isEdit, setIsEdit] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const handleChange = (e) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [value, setValue] = useState({
        course: '',
        batch: '',
        returndate: '',
        printdate: '',
        prepared: '',
        checked: '',
        approved: '',
        startdate: '',
        enddate: '',

    })

    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: facultyid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        setValue(prevState => ({
            ...prevState,
            course: data[0].course,
            batch: data[0].batch,
            returndate: data[0].returndate,
            printdate: data[0].printdate,
            prepared: data[0].prepared,
            checked: data[0].checked,
            approved: data[0].approved,
            startdate: data[0].startdate,
            enddate: data[0].enddate,
        }))
    }
    useEffect(() => {
        if (':facultyid' !== ":facultyid") {
            getStudentDetail()
        }

        value.title = ""
        setError({})
        setUid([])
    }, [])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            let response;
            if(!isEdit){
                response = await axios.post(`${BASE_URL}/addConsultancyBranch`,{...formState,Const_Id})
            }else{
                response = await axios.put(`${BASE_URL}/updateConsultancyBranch/${formState.Branch_Id}`,formState)
            }

            alert(response.data.message)
            getBranchesData()
        }catch(err){
            alert('Error adding consultancy Branch')
            console.log("Error adding consultancy branch", err)
        }finally{
            setIsEdit(false)
            setFormState(initialState)
        }
    }

    useEffect(()=>{
        getBranchesData()
    },[])

    const getBranchesData = async()=>{
        try{
            const response = await axios.get(`${BASE_URL}/consultancyBranches?Const_Id=${Const_Id}`)
            setConsultancyBranches(response.data)
        }catch(err){
            console.log('Error fetching consultancy Branches data', err)
        }

    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`${BASE_URL}/deleteConsultancyBranch/${deleteId}`);
            setDeleteId(null)
            getBranchesData()
            alert('Consultancy Branch deleted successfully')
        } catch (error) {
            setDeleteId(null)
            console.error("Error deleting consultancy branch:", error);
            alert('Error deleting consultancy branch')
        }
    };

    const handleSwitchChange = async (value, Branch_Id) => {
        const newStatus = value === 0 ? 1 : 0;
        try {
            await axios.put(`${BASE_URL}/consultancyBranch/status`, { status: newStatus, Branch_Id});
            getBranchesData()
            alert('Consultancy Branch status updated successfully')
        } catch (error) {
            console.error("Error updating status:", error);
            alert('Error updating status')
        }
    };

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const columns = [
        { field: 'Contact_Person', headerName: 'Contact Person', width:150 },
        { field: 'Designation', headerName: 'Designation', width: 200 },
        { field: 'Branch_Address', headerName: 'Branch Address', width: 250 },
        { field: 'Branch_City', headerName: 'City', width: 100 },
        { field: 'Branch_Tel', headerName: 'Telephone', width: 150 },
        { field: 'Mobile', headerName: 'Mobile', width: 150 },
        { field: 'Email', headerName: 'Email', width: 200 },
        {
            field: 'actions',
            headerName: 'Action',
            width:150,
            renderCell: (params) => (
                <>
                    <EditIcon style={{ cursor: "pointer" }} onClick={() =>{
                        setIsEdit(true)
                        setFormState(params.row)
                    }} />
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() =>{ 
                        setDeleteId(params.row.Branch_Id)
                    }} />
                    <Switch
                        {...label}
                        onChange={() =>{
                            handleSwitchChange(params.row.IsActive, params.row.Branch_Id)
                         }}
                        checked={params.row.IsActive === 1}
                        color="secondary"
                    />
                </>
            )
        },
    ];

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                            <div class="d-flex">
                                <div className='px-2 mx-2'><Link to={`/consultancymaster/${Const_Id}`}><h4>Consultancy Details</h4></Link></div>
                                <div className='px-2 mx-2'><Link to={`/consstudentdetails?Const_Id=${Const_Id}`}><h4>Student Details</h4></Link></div>
                                <div className='px-2 mx-2'><Link to={`/consultancybranches?Const_Id=${Const_Id}`}><h4>Branches</h4></Link></div>
                                <div className='px-2 mx-2'><Link to={`/consultancyfollowup?Const_Id=${Const_Id}`}><h4>Follow Up</h4></Link></div>
                            </div>
                       
                        <div class="col-lg-12 grid-margin">

                            <div class="card">
                                <div className='container-fluid'>
                                    <div className='row justify-content-center'>
                                        <form className='p-3' style={{ width: "100%" }} onSubmit={handleSubmit}>
                                            {/* <div>
                                                <h4 class="card-title">View Consultancy Info</h4>
                                            </div> */}
                                            {/* <Link to=''> <button className='btn btn-success'>Add +</button></Link> */}
                                            <div className='row'>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1" >Contact Person</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={formState.Contact_Person}
                                                    placeholder='Contact Person' name='Contact_Person' onChange={handleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1"> Designation </label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={formState.Designation}
                                                    placeholder='Designation'    name='Designation' onChange={handleChange} />

                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">	Branch Address</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={formState.Branch_Address}
                                                    placeholder="Branch Address" name='Branch_Address' onChange={handleChange} />
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">	City</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={formState.Branch_City}
                                                    placeholder="City" name='Branch_City' onChange={handleChange} />
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exxampleInputUsename1">Telephone</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={formState.Branch_Tel}
                                                    placeholder="Telephone" name='Branch_Tel' onChange={handleChange} />
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Mobile</label>
                                                    <input type="number" class="form-control" id="exampleInputUsername1" value={formState.Mobile}
                                                    placeholder="Mobile" name='Mobile' onChange={handleChange} />
                                                </div>

                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Email</label>
                                                    <input type="email" class="form-control" id="exampleInputUsername1" value={formState.Email}
                                                    placeholder="Email" name='Email' onChange={handleChange} />
                                                </div>

                                                <button type="submit" class="btn btn-sm btn-primary mr-5 mt-5">Add More</button>

                                            </div>
                                            <button type="submit" class="btn btn-primary mr-2">Save</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Close</button>
                                        </form>
                                    </div>
                                </div>
                                <div>
                                        <DataGrid
                                            rows={consultancyBranches}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={37}
                                            getRowId={(row) => row.Branch_Id}
                                            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                                            slots={{ toolbar: GridToolbar }}
                                            slotProps={{ toolbar: { showQuickFilter: true } }}
                                            className='p-2'
                                        />
                                        {deleteId && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() =>{ 
                                                    handleDelete()
                                                }} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={()=>setDeleteId(null)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default ConsultancyBranches
