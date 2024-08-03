import React from 'react'
import { Link } from 'react-router-dom'

const Admissionform = ({admissionid}) => {
  
  return (
    <div className='d-flex '>
      <div className='px-2 mx-2'><Link to={`/admissionform/personalinfo/${admissionid}`}>Personal Info</Link></div>
      <div className='px-2 mx-2'><Link to={`/admissionform/academicqualification/${admissionid}`}>AcademicQualification</Link></div>
      <div className='px-2 mx-2'><Link to={`/admissionform/companyinfo/${admissionid} `}>Company Information</Link></div>
      <div className='px-2 mx-2'><Link to={`/admissionform/discussion/${admissionid} ` }>Discussion</Link></div>
      <div className='px-2 mx-2'><Link to={`/admissionform/documents/${admissionid} `}>Documents</Link></div>
    </div>
  )
}

export default Admissionform