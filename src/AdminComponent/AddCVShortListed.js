import React, { useEffect, useState } from 'react';
import InnerHeader from './InnerHeader';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import AddCVShortListedStudents from './AddCVShortListedStudents';
import Loader from './Loader';

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
        Batch_code:""
    }) 
    const [openAddStudents, setOpenAddStudents] = useState(false)
    const [batchWiseStudents, setBatchWiseStudents] = useState([])
    const [errors, setErrors] = useState({})
    const [newCVChild, setNewCVChild] = useState([])
    const [availableStudents, setAvailableStudents] = useState([]);
    const [deleteId, setDeleteId] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const combinedIds = new Set([...cvChildData.map(d => d.Student_Id), ...newCVChild.map(d => d.Student_Id)]);
        setAvailableStudents(batchWiseStudents.filter(student => !combinedIds.has(student.Student_Id)));
    }, [cvChildData, newCVChild, batchWiseStudents]);

    
    const getCVChildData = async(id)=>{
        try{
            setLoading(true)
            const response = await axios.get(`${BASE_URL}/cvchild/${id}`)
            setCVChildData(response.data)
        }catch(err){
            console.log('Error fetching CVChild Data with Id',id)
            console.log(err)
            alert('Error fetching data')
            navigate("/cvshortlisted");
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const id = parseInt(CVId)
        if(!isNaN(id)){
            setIsEdit(true)
            const getCVShortListedData = async() =>{
                try{
                    const response = await axios.get(`${BASE_URL}/cvshortlisted/${id}`)
                    setFormState(response.data)
                }catch(err){
                    console.log('Error fetching CVShortListed Data with Id',id)
                    console.log(err)
                    alert('Error fetching CVShortListed details')
                    navigate("/cvshortlisted"); 
                }
            }
            
            getCVShortListedData()
            getCVChildData(id)
        }
    },[])

    async function getCompanyData() {
        axios.get(`${BASE_URL}/getCompanies`)
            .then((res) => {
                setCompanyData(res.data)
            }).catch((err)=>{
                console.log(err)
                navigate("/cvshortlisted");
                alert("Error fetching companies data")
            })
    }

    async function getCourseData() {
        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                setCourseData(res.data)
            }).catch((err)=>{
                console.log(err)
                navigate("/cvshortlisted");
                alert('Error fetching course Data')
            })
    }

    async function getBatchCodeData(id) {
        axios.get(`${BASE_URL}/getBatchCode/${id}`)
            .then((res) => {
                setBatchData(res.data)
            }).catch((err)=>{
                console.log(err)
                navigate("/cvshortlisted");
                alert('Error fetching batch code')
            })
    }

    useEffect(()=>{
        getCompanyData()
        getCourseData()
    },[])

    // As New Course ID is selected clear previous selected Batch ID,
    // Batch Code, Batch Data, Students Data and New students added
    // of previous Batch Id
    useEffect(()=>{
        if(!isEdit){
            setFormState((prev)=>({...prev, Batch_Id:"", Batch_code:""}))
            setBatchData([])
            setBatchWiseStudents([])
            setNewCVChild([])
        }
    },[formState.Course_id])

    // As Course_id changes fetch Batch codes corresponding to that 
    // Course Id
    useEffect(()=>{
        if(formState.Course_id){
            getBatchCodeData(formState.Course_id)
        }
    },[formState.Course_id])

    // As Batch Code changes clear students data and newly added cv child data
    useEffect(()=>{
        if(!isEdit){
            setBatchWiseStudents([])
            setNewCVChild([])
        }
    },[formState.Batch_code])

    // fetch students data corresponding to batch code
    useEffect(()=>{
        if(formState.Batch_code){
            getBatchWiseStudent(formState.Batch_code)
        }
    },[formState.Batch_code])


    const getBatchWiseStudent = async(batch_code)=>{
        axios.post(`${BASE_URL}/getbatchwisestudent`,{batch_code})
            .then((res) => {
                setBatchWiseStudents(res.data)
            }).catch((err)=>{
                console.log(err)
                navigate("/cvshortlisted");
                alert('Error fetching student data')
            })
    }

    const handleAdd = (selectAll, selectedStudents)=>{
        const createCVChild = (student)=>({
            Batch_code: formState.Batch_code,
            Student_Name: student.Student_Name,
            Student_Code: parseInt(student.Student_Code)? parseInt(student.Student_Code) : null,
            Student_Id: student.Student_Id,
            Result: 'No',
            Placement:"No",
            Sended: "No",
            Batch_id: formState.Batch_Id,
            Remark: "",
            PlacedBy: "",
            Placement_Type: "",
            Placement_Block: "",
            IsActive: 1,
            IsDelete: 0,
            Placement_BlockReason: "",
            BlockReason_Remark: ""
        })

        if(selectAll){
            const data = availableStudents.map((student)=>createCVChild(student))
            setNewCVChild((prev)=>[...prev, ...data])
        }else{
            const data = availableStudents.filter((student)=>selectedStudents.includes(student.Student_Id))
                                            .map((student)=>createCVChild(student))
            setNewCVChild((prev)=>[...prev, ...data])
        }
    }

    const handleChange = (index, e)=>{
        const updatedData = [...cvChildData]
        updatedData[index][e.target.name] = e.target.value 
        setCVChildData(updatedData)
    }
    const handleChangeNew = (index, e)=>{
        const updatedData = [...newCVChild]
        updatedData[index][e.target.name] = e.target.value 
        setNewCVChild(updatedData)
    }
    const handleDeleteNew = (index, student)=>{
        setNewCVChild((prev)=>prev.filter((row,i)=>i!==index))
    }
    const handleDeleteCVChild = (index, student)=>{
        setDeleteId(student.Id)
    }

    const handleDelete = async()=>{
        try {
            await axios.delete(`${BASE_URL}/deleteCVChild/${deleteId}`);
            setDeleteId(null)
            getCVChildData(parseInt(CVId))
        } catch (error) {
            setDeleteId(null)
            console.error("Error deleting CVChild data:", error);
            alert('Error deleting data')
        }
    }

    const validateForm = ()=>{
        let isValid = true
        const newErrors = {}
        if(!formState.TDate){
            newErrors.TDate = 'Date is required'
            isValid = false
        }
        if(!formState.Company_Id){
            newErrors.Company_Id = 'Company is required'
            isValid = false
        }
        if(!formState.Course_id){
            newErrors.Course_id = 'Course is required'
        }
        if(!formState.Batch_Id){
            newErrors.Batch_Id = 'Batch is required'
        }

        setErrors(newErrors)

        setTimeout(()=>{
            setErrors("")
        },5000)

        return isValid
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(validateForm()){
            try{
                setLoading(true)
                let response;
                if(!isEdit){
                    response = await axios.post(`${BASE_URL}/addCVShortlistedChild`,{
                        cvShortlisted: formState,
                        newCVChild: newCVChild
                    })
                    setLoading(false) 
                    alert('Data addded successfully')
                    navigate('/cvshortlisted')
                }else{
                    response = await axios.put(`${BASE_URL}/updateCVShortlistedChild`,{
                        cvShortlisted: formState,
                        cvChild: cvChildData,
                        newCVChild: newCVChild
                    })
                    setLoading(false)
                    setNewCVChild([])
                    getCVChildData(CVId)
                    alert('Data updated successfully')
                }
            }catch(err){
                setLoading(false)
                console.log('Error adding data',err)
                alert('Error')
                navigate('/cvshortlisted')
            }  
        }
    }

    return (
        <div class="container-fluid page-body-wrapper ">
            <InnerHeader/>
            {loading && <Loader />}
            <div class="main-panel">
                <div class="content-wrapper">
                    <h4 className='h5' style={{fontWeight:600}}>CV Shortlisted</h4>
                    <hr className='py-1'></hr>
                    <form onSubmit={handleSubmit}>
                        <div className='row mb-4'>
                            <div class="form-group col-lg-3">
                                <label for="CVShortListDateInput">Date <span className='text-danger'>*</span></label>
                                <input type="date" class="form-control" id="CVShortListDateInput" value={formState.TDate}
                                onChange={(e)=>setFormState((prev)=>({...prev,TDate:e.target.value}))}/>
                                {errors.TDate && <span className='text-danger'>{errors.TDate}</span>}
                            </div>
                            <div className="form-group col-lg-3">
                                <label for="CVShortListCompanyInput">Company Name <span className='text-danger'>*</span></label>
                                <select className="form-control" id="CVShortListCompanyInput" disabled={isEdit} value={formState.Company_Id}
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
                                {errors.Company_Id && <span className='text-danger'>{errors.Company_Id}</span>}
                            </div>
                            <div className="form-group col-lg-3">
                                <label for="CVShortListCourseInput">Course Name <span className='text-danger'>*</span></label>
                                <select className="form-control" id="CVShortListCourseInput" disabled={isEdit} value={formState.Course_id}
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
                                {errors.Course_id && <span className='text-danger'>{errors.Course_id}</span>}
                            </div>
                            <div className="form-group col-lg-3">
                                <label for="CVShortListBatchInput">Batch Code <span className='text-danger'>*</span></label>
                                <select className="form-control" id="CVShortListBatchInput" disabled={isEdit} value={formState.Batch_Id}
                                onChange={(e)=>setFormState((prev)=>({
                                    ...prev,
                                    Batch_Id: e.target.value? parseInt(e.target.value): "",
                                    Batch_code: e.target.value? e.target.options[e.target.selectedIndex].textContent: ""
                                }))}>
                                    <option value="">--Select Batch Code--</option>
                                    {batchData.map((item,index) => {
                                        return (
                                            <option key={index} value={item.Batch_Id}>{item.Batch_code}</option>
                                        )
                                    })}     
                                </select>
                                {errors.Batch_Id && <span className='text-danger'>{errors.Batch_Id}</span>}
                            </div>
                            <div className='col-auto py-2'>
                                <button class="btn btn-primary mr-2" type='button' onClick={()=>setOpenAddStudents(true)}>Add more Students</button>
                                <button class="btn btn-primary mr-2" type='submit' >Save</button>
                                <Modal
                                    open={openAddStudents}
                                    onClose={()=>setOpenAddStudents(false)}
                                >
                                    <AddCVShortListedStudents 
                                        studentList={availableStudents}  
                                        batchCode = {formState.Batch_code}
                                        onAdd = {handleAdd}
                                        onClose = {()=>setOpenAddStudents(false)}
                                    />
                                </Modal>
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
                                    <CVChildRows cvChildList={cvChildData} handleChange={handleChange} onDelete={handleDeleteCVChild}/>
                                    <CVChildRows cvChildList={newCVChild} handleChange={handleChangeNew} onDelete={handleDeleteNew}/>
                                    
                                </tbody>
                            </table>
                        </div>
                    </form>
                    {deleteId && (
                                <div className='confirm-delete'>
                                    <p>Are you sure you want to delete?</p>
                                    <button type='button' onClick={() =>{ 
                                            handleDelete()
                                    }} className='btn btn-sm btn-primary'>OK</button>
                                    <button type='button' onClick={()=>setDeleteId(null)} className='btn btn-sm btn-danger'>Cancel</button>
                                </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const CVChildRows = ({cvChildList, handleChange, onDelete})=>{
    return(
        cvChildList.map((row,index)=>(
            <tr key={index}>
                <td>{row.Batch_code}</td>
                <td>{row.Student_Name}</td>
                <td>
                    <select className="form-control" style={{width:'70px'}} value={row.Sended !== null ? row.Sended: ""} name='Sended'
                    onChange={(e)=>handleChange(index, e)}>
                        <option value="">--Select--</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" style={{width:'70px'}} value={row.Result !== null ? row.Result: ""} name='Result'
                    onChange={(e)=>handleChange(index, e)}>
                        <option value="">--Select--</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" style={{width:'70px'}} value={row.Placement !== null ? row.Placement: ""} name='Placement'
                    onChange={(e)=>handleChange(index, e)}>
                        <option value="">--Select--</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" style={{width:'70px'}} value={row.PlacedBy !== null ? row.PlacedBy: ""} name='PlacedBy'
                    onChange={(e)=>handleChange(index, e)}>
                        <option value="">--Select--</option>
                        <option>SIT</option>
                        <option>Own</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" style={{width:'80px'}} value={row.Placement_Type !== null ? row.Placement_Type: ""} name='Placement_Type'
                    onChange={(e)=>handleChange(index, e)}>
                        <option value="">--Select--</option>
                        <option>Permanent</option>
                        <option>Temporary</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" style={{width:'70px'}} value={row.Placement_Block !== null ? row.Placement_Block: ""} name='Placement_Block'
                    onChange={(e)=>handleChange(index, e)}>
                        <option value="">--Select--</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" style={{width:'100px'}} value={row.Placement_BlockReason !== null ? row.Placement_BlockReason: ""} name='Placement_BlockReason'
                    onChange={(e)=>handleChange(index, e)}>
                        <option value="">--Select--</option>
                        <option>Location constraint</option>
                        <option>Knowledge based</option>
                        <option>Other</option>
                    </select>
                </td>

                <td>
                    <textarea placeholder='Reason Remark' value={row.BlockReason_Remark !== null ? row.BlockReason_Remark: ""}
                    className='form-control' style={{width:'150px'}} name='BlockReason_Remark' onChange={(e)=>handleChange(index, e)}></textarea>
                </td>
                <td>
                    <textarea placeholder='Remark' value={row.Remark !== null ? row.Remark: ""}
                    className='form-control' style={{width:'150px'}} name='Remark' onChange={(e)=>handleChange(index, e)}></textarea>
                </td>
                <td>
                    <button className='' type='button' onClick={()=>onDelete(index, row)}>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                    </button>
                </td>
            </tr>
        ))
    )
}

export default AddCVShortListed;