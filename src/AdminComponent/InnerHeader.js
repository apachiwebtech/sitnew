import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
            // case '/onefieldform/awt_asset_category/Asset%20Category':
            //     return 'Account Head';
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
            case '/bank':
                return 'Bank';
            case '/discipline':
                return 'Discipline';
            case '/Qualification':
                return 'Qualification';
            case '/feesnotes':
                return 'Fees note';
            case '/hoilday':
                return 'Hoilday';
            case '/location':
                return 'Location';
            case '/facultyworking':
                return 'Faculty Working Hour ';
            case '/vendormaster':
                return 'Vender Master';
            case '/courselisting':
                return 'Course';
            case '/annualbatchlisting':
                return 'Annul Batch';
            case '/finalexamtaken':
                return 'Final Exam Detail';
            case '/batchcategory':
                return 'Batch Category'
            case '/batchlisting':
                return 'Batch';
            case '/status':
                return 'Status';
            case '/college':
                return 'College';
            case '/librarybook':
                return 'Library Book';
            case '/faculty':
                return 'Faculty';
            case '/rollnumberallot':
                return 'Allot Roll Number';
            case '/lecturetaken':
                return 'Lecture Taken';
            case '/assignmentstaken':
                return 'Assignments Taken';
            case '/unittesttaken':
                return 'Unit Test';
            case '/vivamoctaken':
                return 'Viva / MOC Taken';
            case '/generateresult':
                return 'Generate Final Result';
            case '/feedback1':
                return 'FeedBack 1';
            case '/visitsite':
                return 'Visit Site';
            case '/bookissue':
                return 'Book Issue';
            case '/returnbook':
                return 'Return Book';
            case '/addrole':
                return 'Add Role';
            case '/adminuser':
                return 'Admin User';
            case '/roleassign':
                return 'Role Assign';
            case '/employeetrainingplan':
                return 'Employee Training Plan';
            case '/employeerecord':
                return 'Employee Training Record';
            case '/r_inquiry':
                return 'Inquirys';
            case '/onlinestudent':
                return 'Online Student';
            case '/studentbatch':
                return 'Student Batch Wise';
            case '/studentreport':
                return 'Student Report';
            case '/batchrecord':
                return 'Batch Report';
            case '/sitevisit':
                return 'Site Visit';
            case '/corporateinquiry':
                return 'Corporate Inquiry';
            case '/corporaterecord':
                return 'Corporate Record';
            case '/collegefollowup':
                return 'College Follow';
            case '/convocationguest':
                return 'Convocation Guest';
            case '/yearlymock':
                return 'Yearly Mock';
            case '/annualbatchplan':
                return 'Annual Batch Plan';
            case '/finalexam':
                return 'Final Exam';
            case '/feesreport':
                return 'Fees Report';
            case '/feesdetails':
                return 'Fees Report';
            case '/feesdetails':
                return 'Fees Report';
            case '/facultypayment':
                return 'Fees Report';
            case '/smsemailreport':
                return 'SMS / Email Send';
            case '/servicetax':
                return 'Service Tax';
            case '/lecturereport':
                return 'Lecture Report';
            case '/feedbackanalysis':
                return 'Feedback Analysis';
            case '/newfeedback':
                return 'Student Search Feedback';
            case '/studentsearch':
                return 'Student Search Interview';
            case '/bathanalysis':
                return 'Batch Analysis'
            case '/paymentcollection':
                return 'Payment Collection';
            case '/facultysalary':
                return 'Faculty Salary Report';
            case '/facultymonthly':
                return 'Faculty Monthly Statement';
            case '/inquiryreport':
                return 'Inquiry Report';
            case '/onefieldform/sit_account_head/Account%20Head':
                return 'Add Account Head';
            case '/assets':
                return 'Add Assets';
            case '/onefieldform/awt_asset_category/Asset%20Category':
                return 'Add Asset Category';
            case '/batchtransfer':
                return 'Transfer Batch';
            case '/batchcancellation':
                return 'Batch Cancellation';
            case '/purchasematerial':
                return 'Purchase Material';
            // case '/facultypayment':
            //     return 'Faculty Payment';
            case '/cashvoucher':
                return 'Cash Voucher';
            case '/stockview':
                return 'Stock View';
            case '/materialconsumption':
                return 'Material Consumption';
            case '/employeesalary':
                return 'Employee Salary';
            case '/employeeattendance':
                return 'Employee Attendance';
            case '/salarymaster':
                return 'Salary Master';
            case '/batchleft':
                return 'Batch Left'
            case '/batchmoving':
                return 'Batch Moving';
            case '/employeeloan':
                return 'Employee Loan';
            case '/projectmaster':
                return 'Project Master'
            case '/mlwfmaster':
                return 'MLWF Master';
            case '/qmsmaster':
                return 'Qms Master';
            case '/festivalphoto':
                return 'Festival Photos';
            case '/noticeboard':
                return 'Notice Board';
            case '/masssms':
                return 'Mass SMS';
            case '/massemail':
                return 'Mass Email'
            case '/uploadeventphoto':
                return 'Upload Event Photo';
            case '/uploadtestimonial':
                return 'Upload Testmonial';
            case '/uploadbanner':
                return 'Upload Banner Image'
            case '/exportcontacts':
                return 'Export Contacts';
            case '/qmsdoes':
                return 'QMS Does';
            case '/masswhatsapp':
                return 'Mass WhatsApp';
            case '/taskmanagements':
                return 'Task Management';
            case '/emailmaster':
                return 'Email Master';
            case '/consultancymaster':
                return 'Consultancy Master';
            case '/cvshortlisted':
                return 'CV Short Listed';
            case '/latestcvupdated':
                return 'Latest CV Updated';
            case '/convocation':
                return 'Convocation Guest List';
            case '/consultancyreport':
                return 'Consultancy Report';
            case '/studentplacement':
                return 'Student Placement';
            case '/viewstudent':
                return 'View Student CV Folder';
            case '/companyrequirment':
                return 'Company Requirment';
            case '/shortlisted':
                return 'Short Listed By SIT';
            case '/studentdetails':
                return 'Student Details';
            case '/taxmaster':
                return 'Tax';

                
            case '/collegelisting':
                return 'College Information';
            case '/college/:collegeid':
                return 'College Information';
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
                    { location.pathname !== "/" &&   <ArrowCircleLeftSharpIcon onClick={() => navigate(-1)} class="arrow" /> }
                        <div class="page-title px-2">
                            <h1>{getPageName()}</h1>
                        </div>
                        <div>

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