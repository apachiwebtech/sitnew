import { mdiAccountGroupOutline, mdiAccountOutline, mdiCartOutline, mdiCircleMedium, mdiFormatListBulleted, mdiFormatListBulletedSquare, mdiHome, } from '@mdi/js';
import Icon from '@mdi/react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { mdiAccountTie } from '@mdi/js';
import { mdiCog } from '@mdi/js';
//import { mdiAnimationOutline } from '@mdi/js';
import { mdiChartTree } from '@mdi/js';
import { mdiClipboardFileOutline } from '@mdi/js';
import { mdiLayersTripleOutline } from '@mdi/js';
import { mdiBookmarkMultipleOutline } from '@mdi/js';
import { SidebarContext } from '../context/SideBarContext';

const Header = () => {

  const { isSidebarOpen, toggleSidebar,setSidebarOpen } = useContext(SidebarContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


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
    <nav className= {`sidebar sidebar-offcanvas `} style={{width : isSidebarOpen ? '72px' : ''}}  id="sidebar" wordBreak='break-word' overflowWrap='break-word'>
      <div className='p-2'>
      <Icon path={mdiFormatListBulleted} style={{color :"#fff", cursor:"poin"}} size={1} onClick={() =>setSidebarOpen(!isSidebarOpen)} className={`mx-3 `}  />
        </div>
      <ul className="nav p-2">

        <li className="nav-item">
          <Link className="nav-link" to="/">
            <Icon path={mdiHome} size={1} className={`mx-3 `}  />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`} >Dashboard</span>
            {/* <div className="badge badge-info badge-pill">2</div> */}
          </Link>
        </li>
        {/* <li className="nav-item sidebar-category">
          <p>Master</p>
          <span></span>
        </li> */}


        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('product')}>
          <div className="nav-link" >
            <Icon path={mdiAccountTie} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>General Master</span>
            {openStates.product ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>
        </li>

        <Collapse in={openStates.product} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to='/discipline'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Discipline</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/Qualification'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Qualification</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/bank'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Bank</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/feesnotes'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Fees Notes</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/holiday'>
                {/* <Icon path={mdiMagnifyPlusOutline} size={1}  /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Holiday</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to='/color'>

                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Room</span>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to='/location'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Location</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_extention"}/${"Extension"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Extension</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_rack"}/${"Rack"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Rack</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/twofieldform/${"awt_material_cat"}/${"Category"}/${"Comments"}/${"text"}/${"Material Category"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Material Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/twofieldform/${"awt_vendor_type"}/${"Category"}/${"Comments"}/${"text"}/${"Vendor Type"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Vendor Type Master</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vendormaster">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Vendor Master</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to='/productapproval'>
                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Vendor Master</span>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to={`/threefieldform/${"awt_material_price"}/${"Item"}/${"Vendor"}/${"Price"}/${"text"}/${"Material Price"}`}>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Material Price</span>
              </Link>
            </li>


          </ul>
        </Collapse>













        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('home')}>
          <div className="nav-link" >

            <Icon path={mdiLayersTripleOutline} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Masters</span>
            {openStates.home ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>
        </li>
        <Collapse in={openStates.home} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
          <li className="nav-item">
              <Link className="nav-link" to="/courselisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Course</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/annualbatchlisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Annual Batch</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/batchcategory">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Batch Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/batchlisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Batch</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/status'>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Status</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_bookcode"}/${"Book Code"}`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Book Code</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/collegelisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>College</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/librarybook">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Library Book</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/addfeedbacknewquestion">

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Feedback Question</span>
              </Link>
            </li> */}

            <li className="nav-item">
              <Link className="nav-link" to="/faculty">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Faculty</span>
              </Link>
            </li>



            {/* <li className="nav-item">
              <Link className="nav-link" to='/webapp/gallery'

                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Library Book</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/gallery'>

                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Feedback Questions</span>
              </Link>
            </li> */}


          </ul>
        </Collapse>

        {/* ================Admission Activity====================== */}


        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('admission')}>
          <div className="nav-link" >

            <Icon path={mdiChartTree} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Admission Activity</span>
            {openStates.admission ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>


        </li>
        <Collapse in={openStates.admission} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/inquirylisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Inquiry</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/onlineadmission">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Online Admission</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admissionlisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Admission</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/Student">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Student</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/inquirycorporate">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Corporate Inquiry</span>
              </Link>
            </li>


          </ul>
        </Collapse>


        {/* ================Admission Activity End====================== */}


        {/* ================Daily Activities====================== */}


        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('daily')}>
          <div className="nav-link" >

            <Icon path={mdiChartTree} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Daily Activities</span>
            {openStates.daily ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>


        </li>
        <Collapse in={openStates.daily} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/rollnumberallot">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Allot Roll Number</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/lecturetaken">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Lecture Taken</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/assignmentstaken">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Assignments Taken</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/unittesttaken">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Unit Test Taken</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/vivamoctaken">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Viva / MOC Taken</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/finalexamtakenlisting">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Final Exam Taken</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/generateresult">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Generate Final Result</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/facultyworking">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Faculty Working Hours</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/feedback1">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>FeedBack1</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/feedback2">
              <Icon path={mdiCircleMedium} size={1} className='mx-3' />
              <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>FeedBack2</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/visitsite">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Site Visit</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="batchleft">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Batch Left</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="batchmoving">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Bacth Moving</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='batchtransfer'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Batch Transfer</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='batchcancellation'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Batch Cancellation</span>
              </Link>
            </li>

          </ul>
        </Collapse>


        {/* ================Daily Activities End====================== */}


        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('library')}>
          <div className="nav-link" >

            <Icon path={mdiLayersTripleOutline} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Library Management</span>
            {openStates.library ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>


        </li>
        <Collapse in={openStates.library} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to="/bookissue">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Book Issue</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/returnbook">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Return Book</span>
              </Link>
            </li>




          </ul>
        </Collapse>

        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('role')}>
          <div className="nav-link" >

            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Role Rights</span>
            {openStates.role ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>


        </li>
        <Collapse in={openStates.role} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/addrole">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Add Role</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminuser">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Admin User</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/roleassign">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Role Page</span>
              </Link>
            </li>




          </ul>
        </Collapse>



        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('employee')}>
          <div className="nav-link" >

            <Icon path={mdiAccountTie} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Employee Training</span>
            {openStates.employee ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>


        </li>
        <Collapse in={openStates.employee} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/employeetrainingplan">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Employee Training Plan</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/employeerecord">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Employee Training Record</span>
              </Link>
            </li>

          </ul>
        </Collapse>




        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('reports')}>
          <div className="nav-link" >

            <Icon path={mdiClipboardFileOutline} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Reports</span>
            {openStates.reports ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>


        </li>
        <Collapse in={openStates.reports} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="rinquiry">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Inquiry</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/onlinestudent">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Online Student</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/studentbatch">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Student Batch Wise</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/studentreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Student Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/batchrecord">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Batch Record</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/sitevisit">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Site Visit List</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/corporateinquiry">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Corporate Inquiry</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/corporaterecord">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Corporate Record</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/collegefollowup">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>College Follow Up</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/convocationguest">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Convocation Guest List</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/yearlymock">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Yearly Mock</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/annualbatchplan">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Annual Batch Plan</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/finalexam">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Final Exam</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/feesreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Fees Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/smsemailreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>SMS / Email Send Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/servicetaxreportonfees">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Service Tax Report On Fees</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/lecturereport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Lecture Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/feedbackanalysis">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Feedback Analysis Lecturewise</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/newfeedback">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>New FeedBack Analysis</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/studentsearch">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Student Search for Interview</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/batchanalysis">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Batch Analysis Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/paymentcollection">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Payment Collection Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/facultysalary">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Faculty Salary Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/facultymonthly">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Faculty Monthly Statement</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/inquiryreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Inquiry Report</span>
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link" to="/inquiryreport">
                <Icon path={mdiCircleMedium } size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Inquiry Reports</span>
              </Link>
            </li> */}


          </ul>
        </Collapse>

        {/* ==============Acount Master=================== */}

        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('Accountmaster')}>
          <div className="nav-link" >

            <Icon path={mdiBookmarkMultipleOutline} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Account Masters</span>
            {openStates.Accountmaster ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>


        </li>


        <Collapse in={openStates.Accountmaster} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to={'/employeeprofessiontaxmaster'} >
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Employee Profession Tax</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_tds"}/${"TDS"}`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>TDS</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/taxmaster`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Tax</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"sit_account_head"}/${"Account Head"}`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Account Head</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='assets'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Assets</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={`/onefieldform/${"awt_asset_category"}/${"Asset Category"}`}>
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Asset Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='addfeesdetails'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Fees Details</span>
              </Link>
            </li>
 

            <li className="nav-item">
              <Link className="nav-link" to='purchasematerial'>

                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Purchase Material</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='addfacultysalry'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Faculty Payment</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='cashvoucher'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Cash Voucher</span>
              </Link>

            </li>

            <li className="nav-item">
              <Link className="nav-link" to="stockview">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Stock View</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='materialconsumption'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Material Consumption</span>
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
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Salary Master</span>
              </Link>
            </li>

         

            <li className="nav-item">
              <Link className="nav-link" to="employeeloan">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}> Employee Loan</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/projectmaster">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Project Master</span>
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

        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('utility')}>
          <div className="nav-link" >

            <Icon path={mdiCog} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Utility</span>
            {openStates.utility ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>


        </li>
        <Collapse in={openStates.utility} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/festivalphoto">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Festival Photo Upload</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/noticeboard">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Notice Board</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/masssms">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Mass SMS</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/massemail">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Mass Email</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/uploadeventphoto">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Upload Event Photo</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/uploadtestimonial">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Upload Testmonial Photo</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/uploadbanner">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Upload Banner Image</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/exportcontacts">
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Export Contacts</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/qmsdoes'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>QSM Does</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/masswhatsapp'>
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Mass WhatsApp</span>
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
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Email Master</span>
              </Link>
            </li>


          </ul>
        </Collapse>


        {/* ================Utility End====================== */}


        {/* ================Placements====================== */}


        <li className="nav-item" style={{cursor :"pointer"}} onClick={() => handleToggle('placement')}>
          <div className="nav-link" >

            <Icon path={mdiAccountTie} size={1} className='mx-3' />
            <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Placement</span>
            {openStates.placement ? <ExpandLess className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} /> : <ExpandMore className={`mx-3 ${isSidebarOpen ? 'd-none' : ''}`} />}
          </div>


        </li>
        <Collapse in={openStates.placement} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to="/consultancymaster">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Consultancy Master</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/cvshortlisted">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>CV Shortlisted</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/latestcvupdated">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Latest CV Updated</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/convocation">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Convocation Guest List</span>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/consultancyreport">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Consultancy Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/studentplacement">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Student Placement Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/viewstudent">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>View Student CV Folder</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/companyrequirment">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Company Requirment Report</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/shortlisted">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Shortlisted By SIT</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/shortlistedcompany">
                {/* <Icon path={mdiCircleMedium } size={1} className='mx-3' /> */}
                <Icon path={mdiCircleMedium} size={1} className='mx-3' />
                <span className={`menu-title ${isSidebarOpen ? 'd-none' : ''}`}>Shortlisted By Company</span>
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
