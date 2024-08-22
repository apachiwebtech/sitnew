import { mdiAccountGroupOutline, mdiAccountOutline, mdiCartOutline, mdiCircleMedium, mdiFormatListBulletedSquare, mdiHome, } from '@mdi/js';
import Icon from '@mdi/react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const Header = ({click}) => {

  const [openStates, setOpenStates] = useState({
    order: false,
    product: false,
    home: false,
    Accountmaster: false,
    admission: false
    // Add more menu items as needed
  });

  const handleToggle = (itemName) => {
    setOpenStates((prevState) => {
      // If the clicked item is already true, toggle it to false
      if (prevState[itemName]) {
        return {
          ...prevState,
          [itemName]: false
        };
      } else {
        // Create a new state object where all items are set to false
        const newState = Object.fromEntries(Object.keys(prevState).map(key => [key, false]));
        // Set the clicked item to true
        newState[itemName] = true;
        return newState;
      }
    });
  };

  return (
    <nav className= {`sidebar sidebar-offcanvas ${click ? 'col-lg-2' :''}`}  id="sidebar" wordBreak='break-word' overflowWrap='break-word'>
      <ul className="nav p-2">

        <li className="nav-item">
          <Link className="nav-link" to="/">
            <Icon path={mdiHome} size={1} className='mx-3' />
            <span className="menu-title">Dashboard</span>
            {/* <div className="badge badge-info badge-pill">2</div> */}
          </Link>
        </li>
        <li className="nav-item sidebar-category">
          <p>Master</p>
          <span></span>
        </li>


        <li className="nav-item" onClick={() => handleToggle('product')}>
          <div className="nav-link" >
            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">General Master</span>
            {openStates.product ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>

        <Collapse in={openStates.product} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to='/discipline'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Discipline</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/Qualification'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Qualification</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/bank'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Bank</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/feesnotes'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Fees Notes</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/holiday'>
                {/* <Icon path={mdiMagnifyPlusOutline} size={1}  /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Holiday</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to='/color'>

                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className="menu-title">Room</span>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to='/location'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Location</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_extention"}/${"Extension"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Extension</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_rack"}/${"Rack"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Rack</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/twofieldform/${"awt_material_cat"}/${"Category"}/${"Comments"}/${"text"}/${"Material Category"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Material Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/twofieldform/${"awt_vendor_type"}/${"Category"}/${"Comments"}/${"text"}/${"Vendor Type"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Vendor Type Master</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vendormaster">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Vendor Master</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to='/productapproval'>
                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className="menu-title">Vendor Master</span>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to={`/threefieldform/${"awt_material_price"}/${"Item"}/${"Vendor"}/${"Price"}/${"text"}/${"Material Price"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Material Price</span>
              </Link>
            </li>


          </ul>
        </Collapse>













        <li className="nav-item" onClick={() => handleToggle('home')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Masters</span>
            {openStates.home ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>
        <Collapse in={openStates.home} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
          <li className="nav-item">
              <Link className="nav-link" to="/courselisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Course</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/annualbatchlisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Annual Batch</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/batchcategory">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Batch Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/batchlisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Batch</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/status'>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Status</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_bookcode"}/${"Book Code"}`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Book Code</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/collegelisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">College</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/librarybook">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Library Book</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/addfeedbacknewquestion">

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Feedback Question</span>
              </Link>
            </li> */}

            <li className="nav-item">
              <Link className="nav-link" to="/faculty">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Faculty</span>
              </Link>
            </li>



            {/* <li className="nav-item">
              <Link className="nav-link" to='/webapp/gallery'

                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className="menu-title">Library Book</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/gallery'>

                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className="menu-title">Feedback Questions</span>
              </Link>
            </li> */}


          </ul>
        </Collapse>

        {/* ================Admission Activity====================== */}


        <li className="nav-item" onClick={() => handleToggle('admission')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Admission Activity</span>
            {openStates.admission ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.admission} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/inquirylisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Inquiry</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/onlineadmission">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Online Admission</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admissionlisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Admission</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/Student">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Student</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/inquirycorporate">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Corporate Inquiry</span>
              </Link>
            </li>


          </ul>
        </Collapse>


        {/* ================Admission Activity End====================== */}


        {/* ================Daily Activities====================== */}


        <li className="nav-item" onClick={() => handleToggle('daily')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Daily Activities</span>
            {openStates.daily ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.daily} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/rollnumberallot">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Allot Roll Number</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/lecturetaken">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Lecture Taken</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/assignmentstaken">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Assignments Taken</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/unittesttaken">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Unit Test Taken</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/vivamoctaken">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Viva / MOC Taken</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/finalexamtaken">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Final Exam Taken</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/generateresult">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Generate Final Result</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/facultyworking">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Faculty Working Hours</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/feedback1">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">FeedBack1</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/visitsite">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Site Visit</span>
              </Link>
            </li>

          </ul>
        </Collapse>


        {/* ================Daily Activities End====================== */}


        <li className="nav-item" onClick={() => handleToggle('library')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Library Management</span>
            {openStates.library ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.library} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to="/bookissue">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Book Issue</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/returnbook">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Return Book</span>
              </Link>
            </li>




          </ul>
        </Collapse>

        <li className="nav-item" onClick={() => handleToggle('role')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Role Rights</span>
            {openStates.role ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.role} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/addrole">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Add Role</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminuser">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Admin User</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/roleassign">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Role Page</span>
              </Link>
            </li>




          </ul>
        </Collapse>



        <li className="nav-item" onClick={() => handleToggle('employee')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Employee Training</span>
            {openStates.employee ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.employee} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/employeetrainingplan">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Employee Training Plan</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/employeerecord">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Employee Training Record</span>
              </Link>
            </li>





          </ul>
        </Collapse>




        <li className="nav-item" onClick={() => handleToggle('reports')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Reports</span>
            {openStates.reports ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.reports} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="rinquiry">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Inquiry</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/onlinestudent">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Online Student</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/studentbatch">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Student Batch Wise</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/studentreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Student Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/batchrecord">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Batch Record</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/sitevisit">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Site Visit List</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/corporateinquiry">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Corporate Inquiry</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/corporaterecord">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Corporate Record</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/collegefollowup">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">College Follow Up</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/convocationguest">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Convocation Guest List</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/yearlymock">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Yearly Mock</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/annualbatchplan">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Annual Batch Plan</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/finalexam">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Final Exam</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/feesreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Fees Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/smsemailreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">SMS / Email Send Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/servicetaxreportonfees">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Service Tax Report On Fees</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/lecturereport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Lecture Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/feedbackanalysis">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Feedback Analysis Lecturewise</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/newfeedback">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">New FeedBack Analysis</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/studentsearch">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Student Search for Interview</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/batchanalysis">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Batch Analysis Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/paymentcollection">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Payment Collection Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/facultysalary">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Faculty Salary Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/facultymonthly">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Faculty Monthly Statement</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/inquiryreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Inquiry Report</span>
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link" to="/inquiryreport">
                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className="menu-title">Inquiry Reports</span>
              </Link>
            </li> */}


          </ul>
        </Collapse>

        {/* ==============Acount Master=================== */}

        <li className="nav-item" onClick={() => handleToggle('Accountmaster')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Account Masters</span>
            {openStates.Accountmaster ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>


        <Collapse in={openStates.Accountmaster} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" >

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Employee Profession Tax</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_tds"}/${"TDS"}`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">TDS</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/twofieldform/${"awt_tax"}/${"Tax"}/${"Tax_date"}/${"date"}/${"Tax"}`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Tax</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"sit_account_head"}/${"Account Head"}`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Account Head</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='assets'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Assets</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_asset_category"}/${"Asset Category"}`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Asset Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='addfeesdetails'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Fees Details</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='batchtransfer'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Batch Transfer</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='batchcancellation'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Batch Cancellation</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='purchasematerial'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Purchase Material</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='addfacultysalry'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Faculty Payment</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='cashvoucher'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Cash Voucher</span>
              </Link>

            </li>

            <li className="nav-item">
              <Link className="nav-link" to="stockview">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <spna className="menu-title">Stock View</spna>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='materialconsumption'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Material Consumption</span>
              </Link>
            </li>

            <li className="nav-item">
            <Link className="nav-link" to='employeesalary'>
            <Icon path={mdiCircleMedium} size={1} className='mx-3' />
            <span className='menu-title'>Employee Salary</span>
            </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='addemployeeattendance'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className='menu-title'>Employee Attendance</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='salarymaster'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Salary Master</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="batchleft">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Batch Left</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="batchmoving">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Bacth Moving</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="employeeloan">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title"> Employee Loan</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="projectmaster">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Project Master</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='mlwfmaster'>
                <Icon path={mdiCircleMedium } size={1} className="mx-3" />
                <span className='menu-title'>MLWF Master</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/qmsmaster'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className='menu-title'>QMS Master</span>
              </Link>
            </li>


          </ul>
        </Collapse>


        {/* ================Utility====================== */}

        <li className="nav-item" onClick={() => handleToggle('utility')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Utility</span>
            {openStates.utility ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.utility} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/festivalphoto">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Festival Photo Upload</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/noticeboard">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Notice Board</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/masssms">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Mass SMS</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/massemail">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Mass Email</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/uploadeventphoto">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Upload Event Photo</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/uploadtestimonial">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Upload Testmonial Photo</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/uploadbanner">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Upload Banner Image</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/exportcontacts">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Export Contacts</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/qmsdoes'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">QSM Does</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/masswhatsapp'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Mass WhatsApp</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/taskmanagements'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="manu-title">Task Managements</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/emailmaster'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Email Master</span>
              </Link>
            </li>


          </ul>
        </Collapse>


        {/* ================Utility End====================== */}


        {/* ================Placements====================== */}


        <li className="nav-item" onClick={() => handleToggle('placement')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Placement</span>
            {openStates.placement ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.placement} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/consultancymaster">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Consultancy Master</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/cvshortlisted">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">CV Shortlisted</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/latestcvupdated">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Latest CV Updated</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/convocation">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Convocation Guest List</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/consultancyreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Consultancy Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/studentplacement">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Student Placement Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/viewstudent">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">View Student CV Folder</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/companyrequirment">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Company Requirment Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/shortlisted">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Shortlisted By SIT</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/shortlistedcompany">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className="menu-title">Shortlisted By Company</span>
              </Link>
            </li>


          </ul>
        </Collapse>


        {/* ================Placements End====================== */}




      </ul>
    </nav>
  )
}

export default Header
