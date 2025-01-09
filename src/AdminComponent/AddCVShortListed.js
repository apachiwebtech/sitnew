import React, { useEffect, useState } from 'react';
import InnerHeader from './InnerHeader';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';

const AddCVShortListed = ()=>{
    const [isEdit, setIsEdit] = useState(false)
    const { CVId } = useParams()
    const navigate = useNavigate() 
    

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
            getCVShortListedData()
        }
    },[])

    return (
        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader/>
            <div class="main-panel">
                <div class="content-wrapper">
                    <h4 className='h5' style={{fontWeight:600}}>CV Shortlisted</h4>
                    <hr className='py-1'></hr>
                    <div className='row'>
                        <div class="form-group col-lg-3">
                            <label for="CVShortListDateInput">Date</label>
                            <input type="date" class="form-control" id="CVShortListDateInput"/>
                        </div>
                        <div className="form-group col-lg-3">
                            <label for="CVShortListCompanyInput">Company Name</label>
                            <select className="form-control" id="CVShortListCompanyInput" >
                                <option value="">--Select Company--</option>    
                            </select>
                        </div>
                        <div className="form-group col-lg-3">
                            <label for="CVShortListCourseInput">Course Name</label>
                            <select className="form-control" id="CVShortListCourseInput" >
                                <option value="">--Select Course--</option>    
                            </select>
                        </div>
                        <div className="form-group col-lg-3">
                            <label for="CVShortListBatchInput">Batch Code</label>
                            <select className="form-control" id="CVShortListBatchInput" >
                                <option value="">--Select Batch Code--</option>    
                            </select>
                        </div>
                        <div className='col-auto py-2'>
                            <button type="submit" class="btn btn-primary mr-2">Add more Students</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCVShortListed;