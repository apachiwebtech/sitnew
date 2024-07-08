import React from 'react'
import { Link } from 'react-router-dom'

const InquiryForm = ({inquiryid}) => {
  
  return (
    <div className='d-flex '>
      <div className='px-2 mx-2'><Link to={`/onlineinquiry/inquiryform/${inquiryid}`}>Personal Information</Link></div>
      <div className='px-2 mx-2'><Link to={`/onlineinquiry/inquirydiscussion/${inquiryid}`}>Discussion</Link></div>
    </div>
  )
}

export default InquiryForm