import React, { useEffect, useState } from 'react';
import InnerHeader from './InnerHeader';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import DeleteIcon from '@mui/icons-material/Delete';

const AddCVShortListed = ()=>{
    const [isEdit, setIsEdit] = useState(false)
    const { CVId } = useParams()
    const navigate = useNavigate()
    const [cvChildData, setCVChildData] = useState([])
    const [companyData, setCompanyData] = useState([])
    const [courseData, setCourseData] = useState([])
    const [batchData, setBatchData ] = useState([])
    const [formState, setFormState] = useState({
        id:null,
        CompanyName:"",
        TDate:"",
        Course_id: "",
        Batch_Id: "",
        Company_Id: "",
    }) 
    

    useEffect(()=>{
        const id = parseInt(CVId)
        if(!isNaN(id)){
            setIsEdit(true)
            const getCVShortListedData = async() =>{
                try{
                    const response = await axios.get(`${BASE_URL}/cvshortlisted/${id}`)
                    console.log(response.data)
                }catch(err){
                    console.log('Error fetching CVShortListed Data with Id',id)
                    console.log(err)
                    alert('Error fetching CVShortListed details')
                    navigate("/cvshortlisted"); 
                }
            }
            const getCVChildData = async()=>{
                try{
                    const response = await axios.get(`${BASE_URL}/cvchild/${id}`)
                    setCVChildData(response.data)
                }catch(err){
                    console.log('Error fetching CVChild Data with Id',id)
                    console.log(err)
                    alert('Error fetching data')
                    navigate("/cvshortlisted");
                }
            }
            getCVShortListedData()
            getCVChildData()
        }
    },[])

    async function getCompanyData() {
        axios.get(`${BASE_URL}/getCompanies`)
            .then((res) => {
                setCompanyData(res.data)
            }).catch((err)=>{
                console.log(err)
            })
    }

    async function getCourseData() {
        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                setCourseData(res.data)
            }).catch((err)=>{
                console.log(err)
            })
    }

    async function getBatchCodeData(id) {
        axios.get(`${BASE_URL}/getBatchCode/${id}`)
            .then((res) => {
                setBatchData(res.data)
            }).catch((err)=>{
                console.log(err)
            })
    }

    useEffect(()=>{
        getCompanyData()
        getCourseData()
    },[])

    useEffect(()=>{
        setFormState((prev)=>({...prev, Batch_Id:""}))
        setBatchData([])
        if(formState.Course_id){
            getBatchCodeData(formState.Course_id)
        }
    },[formState.Course_id])


    const headers = [
        'Batch_code',
        'Student_Name',
        'Sended',
        'Result',
        'Placement',
        'PlacedBy',
        'Placement_Type',
        'Placement_Block',
        'Placement_BlockReason',
        'BlockReason_Remark',
        'Remark'
    ]


    return (
        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader/>
            <div class="main-panel">
                <div class="content-wrapper">
                    <h4 className='h5' style={{fontWeight:600}}>CV Shortlisted</h4>
                    <hr className='py-1'></hr>
                    <div className='row mb-4'>
                        <div class="form-group col-lg-3">
                            <label for="CVShortListDateInput">Date</label>
                            <input type="date" class="form-control" id="CVShortListDateInput" value={formState.TDate}
                            onChange={(e)=>setFormState((prev)=>({...prev,TDate:e.target.value}))}/>
                        </div>
                        <div className="form-group col-lg-3">
                            <label for="CVShortListCompanyInput">Company Name</label>
                            <select className="form-control" id="CVShortListCompanyInput" value={formState.Company_Id}
                            onChange={(e)=>setFormState((prev)=>({
                                ...prev,
                                Company_Id: e.target.value? parseInt(e.target.value): "",
                                CompanyName: e.target.value? e.target.options[e.target.selectedIndex].textContent: ""
                            }))}>
                                <option value="">--Select Company--</option>
                                {companyData.map((item,index) => {
                                    return (
                                        <option key={index} value={item.Company_Id}>{item.CompanyName}</option>
                                    )
                                })}    
                            </select>
                        </div>
                        <div className="form-group col-lg-3">
                            <label for="CVShortListCourseInput">Course Name</label>
                            <select className="form-control" id="CVShortListCourseInput" value={formState.Course_id}
                            onChange={(e)=>setFormState((prev)=>({
                                    ...prev,
                                    Course_id: e.target.value? parseInt(e.target.value): ""
                                }))
                            }
                            >
                                <option value="">--Select Course--</option>
                                {courseData.map((item,index) => {
                                    return (
                                        <option key={index} value={item.Course_Id}>{item.Course_Name}</option>
                                    )
                                })}     
                            </select>
                        </div>
                        <div className="form-group col-lg-3">
                            <label for="CVShortListBatchInput">Batch Code</label>
                            <select className="form-control" id="CVShortListBatchInput" value={formState.Batch_Id}
                            onChange={(e)=>setFormState((prev)=>({
                                ...prev,
                                Batch_Id: e.target.value? parseInt(e.target.value): ""
                            }))}>
                                <option value="">--Select Batch Code--</option>
                                {batchData.map((item,index) => {
                                    return (
                                        <option key={index} value={item.Batch_Id}>{item.Batch_code}</option>
                                    )
                                })}     
                            </select>
                        </div>
                        <div className='col-auto py-2'>
                            <button type="submit" class="btn btn-primary mr-2">Add more Students</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table class="table table-bordered table-gen">
                            <thead>
                                <tr>
                                    <th>Batch Code</th>
                                    <th>Student Name</th>
                                    <th>CV Sent</th>
                                    <th>Interviewed</th>
                                    <th>Placement</th>
                                    <th>Placed By</th>
                                    <th>Placement Type</th>
                                    <th>Block Placement</th>
                                    <th>Block Reason</th>
                                    <th>Reason Remark</th>
                                    <th>Remark</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cvChildData.map((row)=>(
                                        <tr key={row.Id}>
                                            <td>{row.Batch_code}</td>
                                            <td>{row.Student_Name}</td>
                                            <td>
                                                <select className="form-control" style={{width:'70px'}} value={row.Sended !== null ? row.Sended: ""}>
                                                    <option value="">--Select--</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-control" style={{width:'70px'}} value={row.Result !== null ? row.Result: ""}>
                                                    <option value="">--Select--</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-control" style={{width:'70px'}} value={row.Placement !== null ? row.Placement: ""}>
                                                    <option value="">--Select--</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-control" style={{width:'70px'}} value={row.PlacedBy !== null ? row.PlacedBy: ""}>
                                                    <option value="">--Select--</option>
                                                    <option>SIT</option>
                                                    <option>Own</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-control" style={{width:'80px'}} value={row.Placement_Type !== null ? row.Placement_Type: ""}>
                                                    <option value="">--Select--</option>
                                                    <option>Permanent</option>
                                                    <option>Temporary</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-control" style={{width:'70px'}} value={row.Placement_Block !== null ? row.Placement_Block: ""}>
                                                    <option value="">--Select--</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-control" style={{width:'100px'}} value={row.Placement_BlockReason !== null ? row.Placement_BlockReason: ""}>
                                                    <option value="">--Select--</option>
                                                    <option>Location constraint</option>
                                                    <option>Knowledge based</option>
                                                    <option>Other</option>
                                                </select>
                                            </td>

                                            <td>
                                                <textarea placeholder='Reason Remark' value={row.BlockReason_Remark !== null ? row.BlockReason_Remark: ""}
                                                className='form-control' style={{width:'150px'}}></textarea>
                                            </td>
                                            <td>
                                                <textarea placeholder='Remark' value={row.Remark !== null ? row.Remark: ""}
                                                className='form-control' style={{width:'150px'}}></textarea>
                                            </td>
                                            <td>
                                                <button className=''>
                                                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCVShortListed;