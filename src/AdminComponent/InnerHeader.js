import React from 'react'
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import img1 from "../assets/images/prof.png";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
const InnerHeader = () => {

    const location = useLocation();
    const getPageName = () => {
        switch (location.pathname) {
            case '/':
                return 'Dashboard';
            case '/onefieldform/awt_descipline/Descipline':
                return 'Descipline';
            case '/onefieldform/awt_qualification/Qualification':
                return 'Qualification';
            case '/onefieldform/awt_bank/Bank':
                return 'Bank';
            case '/twofieldform/awt_holiday/Holiday/Holiday_date/date/Holiday':
                return 'Holiday';
            case '/onefieldform/awt_feesnotes/Fees%20Notes':
                return 'Fees Notes';
            case '/onefieldform/awt_extention/Extension':
                return 'Extention';
            case '/onefieldform/awt_rack/Rack':
                return 'Rack';
            case '/twofieldform/awt_material_cat/Category/Comments/text/Material%20Category':
                return 'Material Category';
            case '/twofieldform/awt_vendor_type/Category/Comments/text/Vendor%20Type':
                return 'Vendor Type';
            case '/twofieldform/awt_status/Status/Description/text/Status':
                return 'Status';
            case '/onefieldform/awt_bookcode/Book%20Code':
                return 'Book Code';
            case '/twofieldform/awt_tax/Tax/Tax_date/date/Tax':
                return 'Tax';
            case '/threefieldform/awt_material_price/Item/Vendor/Price/text/Material%20Price':
                return 'Material Price';
            case '/onefieldform/awt_location/Location':
                return 'Location';
            case '/onefieldform/awt_tds/TDS':
                return 'TDS';
            case '/onefieldform/awt_account_head/Account%20Head':
                return 'Account Head';
            case '/onefieldform/awt_asset_category/Asset%20Category':
                return 'Account Head';
            case '/inquiry':
                return 'Inquiry';
            case '/inquirylisting':
                return 'Inquiry Listing';
            case '/inquiry/:inquiryid':
                return 'Edit Inquiry';
            case '/onlineadmission':
                return 'Online Admission';
            case '/admissionlisting':
                return 'Admission';
            case '/inquirycorporate':
                return 'Corporate Inquiry';
            case '/Student':
                return 'Student';
            case location.pathname.match(/^\/addcorporateinquiry\/\d+$/) ? location.pathname : '':
                return 'Corporate Inquiry';
            case location.pathname.match(/^\/admission\/\d+$/) ? location.pathname : '':
                return 'Admission';
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

export default InnerHeader