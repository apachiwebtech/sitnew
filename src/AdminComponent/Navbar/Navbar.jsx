// NavbarWithDropdowns.jsx
import React from "react";
import 'bootstrap/dist/js/bootstrap.min.js'
import { Link } from "react-router-dom";

const NavbarWithDropdowns = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light px-2 text-light">
            <div className="container-fluid ">
                <Link className="navbar-brand" to="/" style={{fontWeight :"800"}}>SIT MANAGER</Link>
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
                                <li><Link className="dropdown-item" to="#">Action 1</Link></li>
                                <li><Link className="dropdown-item" to="#">Action 2</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
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
                                <li><Link className="dropdown-item" to="/finalexam">Final Exam</Link></li>
                        
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarWithDropdowns;
