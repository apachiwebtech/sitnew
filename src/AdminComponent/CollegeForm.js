import React from 'react'
import { Link } from 'react-router-dom'

const CollegeForm = ({collegeid}) => {
  
  return (
    <div className='d-flex '>
      <div className='px-2 mx-2'><Link to={`/college/${collegeid}`}>CollegeInformation</Link></div>
      <div className='px-2 mx-2'><Link to={`/studentdetails/${collegeid}`}>Student Details</Link></div>
      <div className='px-2 mx-2'><Link to={`/followup/${collegeid}`}>Follow Up's</Link></div>
    </div>
  )
}

export default CollegeForm
