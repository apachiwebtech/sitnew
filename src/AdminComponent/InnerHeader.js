import React from 'react'
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import img1 from "../assets/images/prof.png";

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
            default:
                return '';
        }
    };
    return (
        <div>
            <header class="main-header">
                <div class="container-fluid">
                    <div class="main-header-inner">
                        <div class="page-title">
                            <h1>{getPageName()}</h1>
                        </div>
                        <div class="main-header-toolbar">
                            <div class="header-action">
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

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default InnerHeader