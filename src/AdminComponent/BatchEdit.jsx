import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';



const BatchEdit = ({ batchid }) => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
  
    useEffect(() => {
      setActiveLink(location.pathname);
    }, [location.pathname]);
  
    const links = [
      { to: `/batchedit/batchdetails/${batchid}`, text: 'Batch Details' },
      { to: `/batchedit/feesstructure/${batchid}`, text: 'Fees Structure' },
      { to: `/batchedit/assignmentdetails/${batchid}`, text: 'Assignment Details' },
      { to: `/batchedit/unittest/${batchid}`, text: 'Unit Test Details' },
      { to: `/batchedit/descipline/${batchid}`, text: 'DESCIPLINE / MOC Details' },
      { to: `/batchedit/feedbackdetails/${batchid}`, text: 'FeedBack Details' },
      { to: `/batchedit/standardlecture/${batchid}`, text: 'Standard Lecture Plan' },
      { to: `/batchedit/lectureplan/${batchid}`, text: 'Lecture Plan' },
      { to: `/batchedit/convocation/${batchid}`, text: 'Convocation Details' },
      { to: `/batchedit/result/${batchid}`, text: 'Result Structure' },
      { to: `/batchedit/sitevisit/${batchid}`, text: 'Site Visit /Final Exam Details' },
    ];
  
    return (
      <div className='d-flex'>
        {links.map((link, index) => (
          <div key={index} className={`px-2 mx-2 ${activeLink === link.to ? 'active' : ''}`}>
            <Link to={link.to}>{link.text}</Link>
          </div>
        ))}
      </div>
    );
  };
  
  export default BatchEdit;
  