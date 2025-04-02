// NavbarWithDropdowns.jsx
import React from "react";
import 'bootstrap/dist/js/bootstrap.min.js'
import { Link } from "react-router-dom";

const NavbarWithDropdowns = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light px-2 text-light">
            <div className="container-fluid ">
                <Link className="navbar-brand" to="/" style={{fontWeight :"800", color: "white", fontFamily: "Montserrat"}}>SIT MANAGER</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu1"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                General Master
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li><Link className="dropdown-item" to="/discipline">Discipline</Link></li>
                                <li><Link className="dropdown-item" to="/qualification">Qualification</Link></li>
                                <li><Link className="dropdown-item" to="/bank">Bank</Link></li>
                                <li><Link className="dropdown-item" to="/feesnotes">Fees Notes</Link></li>
                                <li><Link className="dropdown-item" to="/holiday">Holiday</Link></li>
                                
                                <li><Link className="dropdown-item" to="/location">Location</Link></li>
                                <li><Link className="dropdown-item" to={`/onefieldform/${"awt_extention"}/${"Extension"}`}>Extention</Link></li>
                                <li><Link className="dropdown-item" to={`/onefieldform/${"awt_rack"}/${"Rack"}`}>Rack</Link></li>
                                <li><Link className="dropdown-item" to={`/twofieldform/${"awt_material_cat"}/${"Category"}/${"Comments"}/${"text"}/${"Material Category"}`}>Material Category </Link></li>
                                <li><Link className="dropdown-item" to={`/twofieldform/${"awt_vendor_type"}/${"Category"}/${"Comments"}/${"text"}/${"Vendor Type"}`}>Vendor Type Master</Link></li>
                                <li><Link className="dropdown-item" to="/vendormaster">Vendor Master</Link></li>
                                <li><Link className="dropdown-item" to={`/threefieldform/${"awt_material_price"}/${"Item"}/${"Vendor"}/${"Price"}/${"text"}/${"Material Price"}`}>Material Price</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu2"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Masters
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li><Link className="dropdown-item" to="/courselisting">Course</Link></li>
                                <li><Link className="dropdown-item" to="/annualbatchlisting">Annual Batch</Link></li>
                                <li><Link className="dropdown-item" to="/batchcategory">Batch Category</Link></li>
                                <li><Link className="dropdown-item" to="/batchlisting">Batch</Link></li>
                                <li><Link className="dropdown-item" to="/status">Status</Link></li>
                                <li><Link className="dropdown-item" to={`/onefieldform/${"awt_bookcode"}/${"Book Code"}`}>Book Code</Link></li>
                                <li><Link className="dropdown-item" to="/collegelisting">College</Link></li>
                                <li><Link className="dropdown-item" to="/librarybook">Library Book</Link></li>
                                <li><Link className="dropdown-item" to="/faculty">Faculty</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu3"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Admission Activity
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu3">
                                <li><Link className="dropdown-item" to="/inquirylisting">Inquiry</Link></li>
                                <li><Link className="dropdown-item" to="/onlineadmission">Online Admission</Link></li>
                                <li><Link className="dropdown-item" to="/admissionlisting">Admission</Link></li>
                                <li><Link className="dropdown-item" to="/Student">Student</Link></li>
                                <li><Link className="dropdown-item" to="/inquirycorporate">Corporate Inquiry</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu4"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Daily Activities
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu3">
                                <li><Link className="dropdown-item" to="/rollnumberallot">Allot Roll Number</Link></li>
                                <li><Link className="dropdown-item" to="/lecturetaken">Lecture Taken</Link></li>
                                <li><Link className="dropdown-item" to="/assignmentstaken">Assignments Taken</Link></li>
                                <li><Link className="dropdown-item" to="/unittesttaken">Unit Test Taken</Link></li>
                                <li><Link className="dropdown-item" to="/vivamoctaken">Viva / MOC Taken</Link></li>
                                <li><Link className="dropdown-item" to="/finalexamtakenlisting">Final Exam Taken</Link></li>
                                <li><Link className="dropdown-item" to="/generateresult">Generate Final Result</Link></li>
                                <li><Link className="dropdown-item" to="/facultyworking">Faculty Working Hours</Link></li>
                                <li><Link className="dropdown-item" to="/feedback1">FeedBack1</Link></li>
                                <li><Link className="dropdown-item" to="/feedback2">FeedBack2</Link></li>
                                <li><Link className="dropdown-item" to="/visitsite">Site Visit</Link></li>
                                <li><Link className="dropdown-item" to="/batchleft">Batch Left</Link></li>
                                <li><Link className="dropdown-item" to="/batchmoving">Batch Moving</Link></li>
                                <li><Link className="dropdown-item" to="/batchtransfer">Batch Transfer</Link></li>
                                <li><Link className="dropdown-item" to="/batchcancellation">Batch Cancellation</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu5"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Report
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu5">
                                <li><Link className="dropdown-item" to="/rinquiry">Inquiry</Link></li>
                                <li><Link className="dropdown-item" to="/onlinestudent">Online Student</Link></li>
                                <li><Link className="dropdown-item" to="/studentbatch">Student Batch Wise</Link></li>
                                <li><Link className="dropdown-item" to="/studentreport">Student Report</Link></li>
                                <li><Link className="dropdown-item" to="/batchrecord">Batch Record</Link></li>
                                <li><Link className="dropdown-item" to="/sitevisit">Site Visit List</Link></li>
                                <li><Link className="dropdown-item" to="/corporateinquiry">Corporate Inquiry</Link></li>
                                <li><Link className="dropdown-item" to="/corporaterecord">Corporate Record</Link></li>
                                <li><Link className="dropdown-item" to="/collegefollowup">College Follow Up</Link></li>
                                <li><Link className="dropdown-item" to="/convocationguest">Convocation Guest List</Link></li>
                                <li><Link className="dropdown-item" to="/yearlymock">Yearly Mock</Link></li>
                                <li><Link className="dropdown-item" to="/annualbatchplan">Annual Batch Plan</Link></li>
                                <li><Link className="dropdown-item" to="/finalexam">Final Exam</Link></li>
                                <li><Link className="dropdown-item" to="/feesreport">Fees Report</Link></li>
                                <li><Link className="dropdown-item" to="/smsemailreport">SMS / Email Send Report</Link></li>
                                <li><Link className="dropdown-item" to="/servicetaxreportonfees">Service Tax Report On Fees</Link></li>
                                <li><Link className="dropdown-item" to="/lecturereport">Lecture Report</Link></li>
                                <li><Link className="dropdown-item" to="/feedbackanalysis">Feedback Analysis Lecture Wise</Link></li>
                                <li><Link className="dropdown-item" to="/newfeedback">New FeedBack Analysis</Link></li>
                                <li><Link className="dropdown-item" to="/studentsearch">Student Search for Interview</Link></li>
                                <li><Link className="dropdown-item" to="/batchanalysis">Batch Analysis Report</Link></li>
                                <li><Link className="dropdown-item" to="/paymentcollection">Payment Collection Report</Link></li>
                                <li><Link className="dropdown-item" to="/facultysalary">Faculty Salary Report</Link></li>
                                <li><Link className="dropdown-item" to="/facultymonthly">Faculty Monthly Statement</Link></li>
                                <li><Link className="dropdown-item" to="/inquiryreport">Inquiry Report</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu6"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Library Mannagement
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu6">
                                <li><Link className="dropdown-item" to="/bookissue">Book Issue</Link></li>
                                <li><Link className="dropdown-item" to="/returnbook">Return Book</Link></li>
                        
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu7"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Role Right
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu7">
                                <li><Link className="dropdown-item" to="/addrole">Add Role</Link></li>
                                <li><Link className="dropdown-item" to="/adminuser">Admin User</Link></li>
                                <li><Link className="dropdown-item" to="/roleassign">Role Page</Link></li> 
                
                        
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu8"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Employee Training
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu8">
                                <li><Link className="dropdown-item" to="/employeetrainingplan">Employee Training Plan</Link></li>
                                <li><Link className="dropdown-item" to="/employeerecord">Employee Training Record</Link></li>
                        
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu9"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Account Master
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu9">
                                <li><Link className="dropdown-item" to="/employeeprofessiontaxmaster">Employee Profession Tax</Link></li>
                                <li><Link className="dropdown-item" to={`/onefieldform/${"awt_tds"}/${"TDS"}`}>TDS</Link></li>
                                <li><Link className="dropdown-item" to="/taxmaster">Tax</Link></li>
                                <li><Link className="dropdown-item" to={`/onefieldform/${"sit_account_head"}/${"Account Head"}`}>Account Head</Link></li>
                                <li><Link className="dropdown-item" to="/assets">Assets</Link></li>
                                <li><Link className="dropdown-item" to={`/onefieldform/${"awt_asset_category"}/${"Asset Category"}`}>Asset Category</Link></li>
                                <li><Link className="dropdown-item" to="/addfeesdetails">Fees Details</Link></li>
                                <li><Link className="dropdown-item" to="/purchasematerial">Purchase Material</Link></li>
                                <li><Link className="dropdown-item" to="/addfacultysalry">Faculty Payment</Link></li>
                                <li><Link className="dropdown-item" to="/cashvoucher">Cash Voucher</Link></li>
                                <li><Link className="dropdown-item" to="/stockview">Stock View</Link></li>
                                <li><Link className="dropdown-item" to="/materialconsumption">Material Consumption</Link></li>
                                <li><Link className="dropdown-item" to="/employeesalary">Employee Salary</Link></li>
                                <li><Link className="dropdown-item" to="/addemployeeattendance">Employee Attendance</Link></li>
                                <li><Link className="dropdown-item" to="/salarymaster">Salary Master</Link></li>
                                <li><Link className="dropdown-item" to="/employeeloan">Employee Loan</Link></li>
                                <li><Link className="dropdown-item" to="/projectmaster">Project Master</Link></li>
                                <li><Link className="dropdown-item" to="/mlwfmaster">MLWF Master</Link></li>
                                <li><Link className="dropdown-item" to="/qmsmaster">QMA Master</Link></li>
                        
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu10"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Utility
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu10">
                                <li><Link className="dropdown-item" to="/festivalphoto">Festival Photo Upload</Link></li>
                                <li><Link className="dropdown-item" to="/noticeboard">Notice Board</Link></li>
                                <li><Link className="dropdown-item" to="/masssms">MASS SMS</Link></li>
                                <li><Link className="dropdown-item" to="/massemail">Mass Email</Link></li>
                                <li><Link className="dropdown-item" to="/uploadeventphoto">Upload Event Photo</Link></li>
                                <li><Link className="dropdown-item" to="/uploadtestimonial">Upload Testmonial Photo</Link></li>
                                <li><Link className="dropdown-item" to="/uploadbanner">Upload Banner Image</Link></li>
                                <li><Link className="dropdown-item" to="/exportcontacts">Export Contacts</Link></li>
                                <li><Link className="dropdown-item" to="/qmsdoes">QMS Does</Link></li>
                                <li><Link className="dropdown-item" to="/masswhatsapp">Mass WhatsApp</Link></li>
                                <li><Link className="dropdown-item" to="/taskmanagements">Task Managements</Link></li>
                                <li><Link className="dropdown-item" to="/emailmaster">Email Master</Link></li>
                        
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="dropdownMenu11"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Placement
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu11">
                                <li><Link className="dropdown-item" to="/consultancymaster">Consultancy Master</Link></li>
                                <li><Link className="dropdown-item" to="/cvshortlisted">CV Shortlisted</Link></li>
                                <li><Link className="dropdown-item" to="/latestcvupdated">Latest CV Updated</Link></li>
                                <li><Link className="dropdown-item" to="/convocation">Convocation Guest List</Link></li>
                                <li><Link className="dropdown-item" to="/consultancyreport">Consultancy Report</Link></li>
                                <li><Link className="dropdown-item" to="/studentplacement">Student Placement Report</Link></li>
                                <li><Link className="dropdown-item" to="/viewstudent">View Student CV Folder</Link></li>
                                <li><Link className="dropdown-item" to="/companyrequirment">Company Requirment Master</Link></li>
                                <li><Link className="dropdown-item" to="/shortlisted">Shortlisted By SIT</Link></li>
                                <li><Link className="dropdown-item" to="/shortlistedcompany">Shortlisted By Company</Link></li>
                        
                            </ul>
                        </li>

                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarWithDropdowns;
