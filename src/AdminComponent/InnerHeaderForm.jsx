import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

const InnerHeaderForm = () => {

    const location = useLocation();
    const getPageName = () => {
        switch (location.pathname) {
            case '/':
                return 'Dashboard';
            case '/onefieldform/awt_descipline/Descipline':
                return 'Descipline';
            case location.pathname.match(/^\/onlineadmissionform\/personalinfo\/\d+$/) ? location.pathname : '':
                return 'Personal Information ';
            case location.pathname.match(/^\/onlineadmissionform\/academicqualification\/\d+$/) ? location.pathname : '':
                return 'Academic Qualification ';
            case location.pathname.match(/^\/onlineadmissionform\/companyinfo\/\d+$/) ? location.pathname : '':
                return 'Company Information';
            case location.pathname.match(/^\/onlineadmissionform\/discussion\/\d+$/) ? location.pathname : '':
                return 'Discussion';
            case location.pathname.match(/^\/onlineadmissionform\/documents\/\d+$/) ? location.pathname : '':
                return 'Documents';
            default:
                return '';
        }
    };

    const navigate = useNavigate()


    return (
        <div>
            <header class="main-header">
                <div class="container-fluid">
                    <div class="main-header-inner">
                        <ArrowCircleLeftSharpIcon onClick={() => navigate(-1)} class="arrow" />
                        <div class="page-title px-2">
                            <h1>{getPageName()}</h1>
                        </div>
                        <div class="main-header-toolbar">
                            <div>
                                {location.pathname.match(/^\/admissionform\/personalinfo\/\d+$/) && <Link to="/Student"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/admissionform\/academicqualification\/\d+$/) && <Link to="/Student"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/admissionform\/companyinfo\/\d+$/) && <Link to="/Student"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/admissionform\/discussion\/\d+$/) && <Link to="/Student"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/admissionform\/placement\/\d+$/) && <Link to="/Student"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/admissionform\/documents\/\d+$/) && <Link to="/Student"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/onlineadmissionform\/personalinfo\/\d+$/) && <Link to="/onlineadmission"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/onlineadmissionform\/academicqualification\/\d+$/) && <Link to="/onlineadmission"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/onlineadmissionform\/companyinfo\/\d+$/) && <Link to="/onlineadmission"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/onlineadmissionform\/discussion\/\d+$/) && <Link to="/onlineadmission"><CancelIcon class="arrow" />
                                </Link>}
                                {location.pathname.match(/^\/onlineadmissionform\/documents\/\d+$/) && <Link to="/onlineadmission"><CancelIcon class="arrow" />
                                </Link>}
                            </div>
                            {/* <div class="header-action">
                                <div class="header-action__item">
                                    <Link class="link"><DesktopWindowsRoundedIcon style={{ fontSize: "17px" }} /></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><SearchRoundedIcon style={{ fontSize: "17px" }} /></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><StorefrontOutlinedIcon style={{ fontSize: "17px" }} /></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><NotificationsActiveTwoToneIcon style={{ fontSize: "17px" }} /></Link>
                                </div>

                                <div class="header-action__item header-acc">
                                    <span class="header-account__img"><Link class="link"><img src={img1} alt="" /></Link></span>

                                </div>

                            </div> */}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default InnerHeaderForm