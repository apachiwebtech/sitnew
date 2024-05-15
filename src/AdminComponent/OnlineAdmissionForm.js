import React from 'react'
import { Link } from 'react-router-dom'

const OnlineAdmissionForm = () => {
  return (
    <div className='d-flex ' style={{justifyContent:"space-between"}}>
      <div><Link to="/onlineadmissionform/personalinfo/:admissionid">Personal Info</Link></div>
      <div><Link to="/onlineadmissionform/academicqualification/:admissionid">AcademicQualification</Link></div>
      <div><Link to="/onlineadmissionform/companyinfo/:admissionid">Company Information</Link></div>
      <div><Link to="/onlineadmissionform/discussion/:admissionid">Discussion</Link></div>
      <div><Link to="/onlineadmissionform/documents/:admissionid">Documents</Link></div>
    </div>
  )
}

export default OnlineAdmissionForm