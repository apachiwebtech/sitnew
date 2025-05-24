import React, { useEffect } from 'react'
import { useState } from 'react'
import { BASE_URL } from './BaseUrl';
import axios from 'axios';

const followUpFormStyle = {
    position:'fixed',
    backgroundColor:'white',
    top:'0',
    left: '50%',
    transform: 'translate(-50%, 0)',
    maxWidth:'600px',
    maxHeight: '600px',
    overflow: 'auto'
}

const ConsultancyFollowUpForm = ({onClose, formState, setFormState, onSubmit, isEdit})=>{
    const [courseData, setCourseData] = useState([])

    useEffect(()=>{
        getCourseData()
    },[])

    async function getCourseData() {
        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                setCourseData(res.data)
            }).catch((err)=>{
                console.log(err)
            })
    }

    const handleChange = (e)=>{
        setFormState((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleCourseSelect = (e)=>{
        if(e.target.value){
            setFormState((prev)=>({
                ...prev,
                Course_id: parseInt(e.target.value),
                Course: e.target.options[e.target.selectedIndex].textContent
            }))
        }else{
            setFormState((prev)=>({
                ...prev,
                Course_id: null,
                Course:""
            }))
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            let response;
            if(!isEdit){
                response = await axios.post(`${BASE_URL}/addConsultancyFollowUp`,formState)
            }else{
                response = await axios.put(`${BASE_URL}/updateConsultancyFollowUp/${formState.ID}`,formState)
            }

            alert(response.data.message)
        }catch(err){
            console.log('Error adding/updating follow up', err)
            alert('Error adding/updating follow up')
        }finally{
            onSubmit()
            onClose()
        }
    }

    return (
        <div className='rounded rounded-1 p-4' style={followUpFormStyle}>
            <h2 className='h4 pb-1' style={{fontWeight:500}}>Add Follow Up</h2>
            <hr className='my-0 pb-3'/>
            <form className='container-fluid p-0' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='row'>
                            <div className="form-group col-12">
                                <label for="followUpDateInput">Date</label>
                                <input type="date" className="form-control" id="followUpDateInput" value={formState.Tdate} onChange={handleChange} name='Tdate'/>
                            </div>
                            <div className="form-group col-12">
                                <label for="followUpCourseInput">Course</label>
                                <select className="form-control" id="followUpCourseInput" value={formState.Course_id !== null? formState.Course_id : ""}
                                onChange={handleCourseSelect} name='Course_id'>
                                    <option value="">Select Course</option> 
                                    {courseData.map((item) => {
                                        return (
                                            <option key={item.Course_Id} value={item.Course_Id}>{item.Course_Name}</option>
                                        )
                                    })}                        
                                </select>
                            </div>
                            <div className="form-group col-12">
                                <label for="followUpDesignationInput">Designation</label>
                                <input type="text" className="form-control" id="followUpDesignationInput"
                                placeholder='Designation' value={formState.Designation} onChange={handleChange} name='Designation'/>
                            </div>
                            <div className="form-group col-12">
                                <label for="followUpDirectLineInput">Direct Line</label>
                                <input type="text" className="form-control" id="followUpDirectLineInput"
                                placeholder='Direct Line'  value={formState.DirectLine} onChange={handleChange} name='DirectLine'/>
                            </div>
                            <div className="form-group col-12">
                                <label for="followUpNextDateInput">Next Date</label>
                                <input type="date" className="form-control" id="followUpNextDateInput"
                                value={formState.nextdate} onChange={handleChange} name='nextdate'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='row'>
                            <div className="form-group col-12">
                                <label for="followUpPurposeInput">Purpose</label>
                                <select className="form-control" id="followUpPurposeInput" 
                                value={formState.Purpose} onChange={handleChange} name='Purpose'>
                                    <option value="">--Select Purpose--</option>
                                    <option>Meeting</option>
                                    <option>Placements</option>
                                    <option>Placements Received</option>
                                    <option>Training</option>
                                    <option>Project</option>
                                    <option>Others</option>
                                </select>
                            </div>
                            <div className="form-group col-12">
                                <label for="followUpContactPersonInput">Contact Person</label>
                                <input type="text" className="form-control" id="followUpContactPersonInput" placeholder='Contact Person'
                                value={formState.CName} onChange={handleChange} name='CName'/>
                            </div>
                            <div className="form-group col-12">
                                <label for="followUpMobileInput">Mobile</label>
                                <input type="number" className="form-control" id="followUpMobileInput" placeholder='Mobile'
                                value={formState.Phone} onChange={handleChange} name='Phone'/>
                            </div>
                            <div className="form-group col-12">
                                <label for="followUpEmailInput">E-mail</label>
                                <input type="email" className="form-control" id="followUpEmailInput" placeholder='E-mail' 
                                value={formState.Email} onChange={handleChange} name='Email'/>
                            </div>
                            <div className="form-group col-12">
                                <label for="followUpRemarkInput">Remark</label>
                                <textarea className="form-control" id="followUpRemarkInput" placeholder='Remark'
                                value={formState.Remark} onChange={handleChange} name='Remark'></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row px-3'>
                    <button className='mr-2 btn btn-primary' type="submit">Submit</button>
                    <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ConsultancyFollowUpForm;