import React from 'react'
import { Link } from 'react-router-dom'

const ConsultancyMaster = ({consultancymasterid}) => {
  
  return (
    <div className='d-flex '>
      <div className='px-2 mx-2'><Link to={`./consultancymaster/${consultancymasterid}`}>Consultancy Details</Link></div>
      <div className='px-2 mx-2'><Link to={`./consultancymaster/${consultancymasterid}`}>Student Details</Link></div>
    </div>
  )
}

export default ConsultancyMaster