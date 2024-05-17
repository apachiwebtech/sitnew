import React from 'react'
import { Link } from 'react-router-dom'

const OnlineAdmissionForm = ({admissionid}) => {
  
  return (
    <div className='d-flex '>
      <div className='px-2 mx-2'><Link to={`/onlineadmissionform/personalinfo/${admissionid}`}>Personal Info</Link></div>
      <div className='px-2 mx-2'><Link to={`/onlineadmissionform/academicqualification/${admissionid}`}>AcademicQualification</Link></div>
      <div className='px-2 mx-2'><Link to={`/onlineadmissionform/companyinfo/${admissionid} `}>Company Information</Link></div>
      <div className='px-2 mx-2'><Link to={`/onlineadmissionform/discussion/${admissionid} ` }>Discussion</Link></div>
      <div className='px-2 mx-2'><Link to={`/onlineadmissionform/documents/${admissionid} `}>Documents</Link></div>
    </div>
  )
}

export default OnlineAdmissionForm