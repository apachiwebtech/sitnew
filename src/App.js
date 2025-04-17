import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Outlet, createBrowserRouter, useLocation, useNavigate } from "react-router-dom";
import AdminDashBoard from "./AdminComponent/AdminDashBoard";
import { BASE_URL } from "./AdminComponent/BaseUrl";
import Header from "./AdminComponent/Header";
import OneFieldForm from "./AdminComponent/OneFieldForm";
import PageNotFound from "./AdminComponent/PageNotFound";
import WebLogin from "./AdminComponent/WebLogin";
import { SidebarContext, SidebarProvider } from "./context/SideBarContext.jsx";
import "./App.css";
import "./Responsive.css";
import "./Style.css";
import TwoFieldForm from "./AdminComponent/TwoFieldForm";
import ThreeFieldForm from "./AdminComponent/ThreeFieldForm";
import VendorMaster from "./AdminComponent/VenorMaster";
import Course from "./AdminComponent/Course";
import BookCode from "./AdminComponent/College";
import College from "./AdminComponent/College";
import BatchCategory from "./AdminComponent/BatchCategory";
// import Faculty from './AdminComponent/LibraryBook';
// import { Feedback, LibraryBooks } from '@mui/icons-material';
import LibraryBook from "./AdminComponent/LibraryBook";
// import Feedback from './AdminComponent/Feedback';
import Faculty from "./AdminComponent/Faculty";
import AnnualBatch from "./AdminComponent/AnnualBatch";
import BookIssue from "./AdminComponent/BookIssue";
import ReturnBook from "./AdminComponent/ReturnBook";
import EmployeeRecord from "./AdminComponent/EmployeeRecord";
import EmployeeTraining from "./AdminComponent/EmployeeTraining";
import OnlineStudent from "./AdminComponent/OnlineStudent";
import SiteVisit from "./AdminComponent/SiteVisit";
import StudentReport from "./AdminComponent/StudentReport";
import StudentBatch from "./AdminComponent/StudentBatch";
import YearlyMock from "./AdminComponent/YearlyMock";
// import AnnualBatchPlan from './AdminComponent/AnnualBatchPlan';
import CorporateRecord from "./AdminComponent/CorporateRecord";
import BatchRecord from "./AdminComponent/BatchRecord";
import CollogeFollowUp from "./AdminComponent/CollegeFollowUp";
import ConvocationGuest from "./AdminComponent/ConvocationGuest";
import FinalExam from "./AdminComponent/FinalExam";
import SmsEmailReport from "./AdminComponent/SmsEmailReport";
import FeedbackAnalysis from "./AdminComponent/FeedbackAnalysis";
import NewFeedback from "./AdminComponent/NewFeedback";
import StudentSearch from "./AdminComponent/StudentSearch";
import Inquiry from "./AdminComponent/Inquiry";
import InquiryCorporate from "./AdminComponent/InquiryCorporate";
import LectureTaken from "./AdminComponent/LectureTaken";
import AssignmentsTaken from "./AdminComponent/AssignmentsTaken";
import UnitTestTaken from "./AdminComponent/UnitTestTaken";
import VivaMOCTaken from "./AdminComponent/VivaMOCTaken";
import FinalExamTaken from "./AdminComponent/FinalExamTaken";
import GenerateResult from "./AdminComponent/GenerateResult";
import FacultyWorking from "./AdminComponent/FacultyWorking";
import VisitSite from "./AdminComponent/VisitSite";
import FestivalPhoto from "./AdminComponent/FestivalPhoto";
import NoticeBoard from "./AdminComponent/NoticeBoard";
import UploadEventPhoto from "./AdminComponent/UploadEventPhoto";
import UploadTestimonial from "./AdminComponent/UploadTestimonial";
import EmailMaster from "./AdminComponent/EmailMaster";
import QSMDoes from "./AdminComponent/QSMDoes";
// import ConsultancyMaster from './AdminComponent/ConsultancyMaster';
import CVShortListed from "./AdminComponent/CVShortListed.js";
import CVUpdated from "./AdminComponent/CVUpdated.js";
import Convocation from "./AdminComponent/Convocation.jsx";
import ViewStudentCV from "./AdminComponent/ViewStudentCV.js";
// import CompanyRequirment from './AdminComponent/CompanyRequirment.js';
import Students from "./AdminComponent/Students.jsx";
import OnlineAdmissions from "./AdminComponent/OnlineAdmission.jsx";
import GetCorporate from "./AdminComponent/GetCorporate.jsx";
import InquiryListing from "./AdminComponent/InquiryListing.js";
import OnlineAdmissionForm from "./AdminComponent/OnlineAdmissionForm.js";
import PerssonalInfo from "./AdminComponent/PerssonalInfo.js";
import AcademicQualification from "./AdminComponent/AcademicQualification.js";
import CompanyInfo from "./AdminComponent/CompanyInfo.js";
import Discussion from "./AdminComponent/Discussion.js";
import Documents from "./AdminComponent/Documents.js";
import AdmissionListing from "./AdminComponent/AdmissionListing.js";
import Admission from "./AdminComponent/Admission.js";
import AddCorporateInquiry from "./AdminComponent/AddCorporateInquiry.js";
import LectureTakenListing from "./AdminComponent/LectureTakenListing.js";
import FeedBack1 from "./AdminComponent/FeedBack1.js";
import UploadBanner from "./AdminComponent/Uploadbanner.js";
import InquiryReport from "./AdminComponent/InquiryReport.js";
import BatchTransfer from "./AdminComponent/BatchTransfer.js";
import BatchCancellation from "./AdminComponent/BatchCancellation.js";
import MaterialConsumption from "./AdminComponent/MaterialConsumption.js";
import SalaryMaster from "./AdminComponent/SalaryMaster.js";
import BatchLeft from "./AdminComponent/BatchLeft.js";
import BatchMoving from "./AdminComponent/BatchMoving.js";
import EmployeeLoan from "./AdminComponent/EmployeeLoan.js";
import ProjectMaster from "./AdminComponent/ProjectMaster.js";
import MLWFMaster from "./AdminComponent/MLWFMaster.js";
import EmployeeTrainingPlan from "./AdminComponent/EmployeeTrainingPlan.js";
import AddFeedbackNewQuestion from "./AdminComponent/AddFeedbackNewQuestion.js";
import RollNumberAllot from "./AdminComponent/RollNumberAllot.js";
import PurchaseMaterial from "./AdminComponent/PurchaseMaterial.js";
import AddRole from "./AdminComponent/AddRole.js";
import RoleAssignment from "./AdminComponent/RoleAssignment.js";
import AdminUser from "./AdminComponent/AdminUser.js";
import InquiryDiscussuion from "./AdminComponent/InquiryDiscussuion.js";
import AnnualBatchListing from "./AdminComponent/AnnualBatchListing.jsx";
import CourseListing from "./AdminComponent/CourseListing.jsx";
import Status from "./AdminComponent/Status.jsx";
import AssignmentsTakenListing from "./AdminComponent/AssignmentsTakenListing.js";
import Batch from "./AdminComponent/Batch.jsx";
import BatchEdit from "./AdminComponent/BatchEdit.jsx";
import BatchDetails from "./AdminComponent/BatchDetails.jsx";
import FeesStructure from "./AdminComponent/FeesStructure.jsx";
import Assignmentdetails from "./AdminComponent/Assignmentdetails.jsx";
import UnitTest from "./AdminComponent/UnitTest.jsx";
import Desciline from "./AdminComponent/Descipline.jsx";
import Descipline from "./AdminComponent/Descipline.jsx";
import FeedbackDetails from "./AdminComponent/FeedbackDetails.jsx";
import StandardLecturePlan from "./AdminComponent/StanderdLecturePlan.jsx";
import LecturePlan from "./AdminComponent/LecturePlan.jsx";
import ResultStructure from "./AdminComponent/ResultStructure.jsx";
import SiteVise from "./AdminComponent/SiteVise.jsx";
import Discipline from "./AdminComponent/Discipline.jsx";
import UnitTestTakenListing from "./AdminComponent/UnitTestTakenListing.js";
import VivaMOCTakenListing from "./AdminComponent/VivaMOCTakenListing.js";
import GenerateResultListing from "./AdminComponent/GenerateResultListing.js";
import Qualification from "./AdminComponent/Qualification.jsx";
import Bank from "./AdminComponent/Bank.jsx";
import Feesnotes from "./AdminComponent/Feesnotes.jsx";
import Hoilday from "./AdminComponent/Hoilday.jsx";
import Holiday from "./AdminComponent/Hoilday.jsx";
import Location from "./AdminComponent/Location.jsx";
import EmployeeRecordListing from "./AdminComponent/EmployeeRecordListing.js";
import EmployeeTrainingListing from "./AdminComponent/EmployeeTrainingPlanListing.js";
import EmployeeTrainingPlanListing from "./AdminComponent/EmployeeTrainingPlanListing.js";
import CorporateInquiry from "./AdminComponent/CorporateInquiry.js";
import MassSMS from "./AdminComponent/MassSMS.js";
import MassEMail from "./AdminComponent/MassEMail.js";
import MassEMailContent from "./AdminComponent/MassEMailContent.js";
import MassWhatsApp from "./AdminComponent/MassWhatsApp.js";
import ContactExport from "./AdminComponent/ContanctExport.js";
import TaskManagement from "./AdminComponent/TaskManagement.js";
import AddTaskTemplate from "./AdminComponent/AddTaskTemplate.js";
import TaskAdd from "./AdminComponent/AddTask.js";
import AddChecklist from "./AdminComponent/AddChecklist.js";
import SearchEditTaskTemplate from "./AdminComponent/SearchEditTaskTemplate.js";
import SearchEditChecklist from "./AdminComponent/SearchEditChecklist.js";
import StudentPersonalInfo from "./AdminComponent/StudentPersonalInfo.jsx";
import StudentAqualification from "./AdminComponent/StudentAqualification.jsx";
import StudentCompanyInfo from "./AdminComponent/StudentCompanyInfo.jsx";
import StudentDiscussion from "./AdminComponent/StudentDiscussion.jsx";
import StudentDocument from "./AdminComponent/StudentDocument.jsx";
//import SearchEditTask from './AdminComponent/SearchEditTask.js';
// import StudentPersonalInfo from './AdminComponent/StudentPersonalInfo.jsx';
// import StudentAqualification from './AdminComponent/StudentAqualification.jsx';
// import StudentCompanyInfo from './AdminComponent/StudentCompanyInfo.jsx';
// import StudentDiscussion from './AdminComponent/StudentDiscussion.jsx';
// import StudentDocument from './AdminComponent/StudentDocument.jsx';
import EmailMasterListing from "./AdminComponent/EmailMasterListing.js";
import MyDocument from "./AdminComponent/MyDocument.js";
import RInquiry from "./AdminComponent/RInquiry.js";
import FeesReport from "./AdminComponent/FeesReport.js";
import FeesDetails from "./AdminComponent/FeesDetails.js";
import CollegeListing from "./AdminComponent/CollegeListing.jsx";
import QmsMaster from "./AdminComponent/QmsMaster.js";
import AddCollegeInfo from "./AdminComponent/AddCollegeInfo.js";
import AddCollegeMaster from "./AdminComponent/AddCollegeMaster.js";
import StudentDetails from "./AdminComponent/StudentDetails.js";
import FollowUp from "./AdminComponent/FollowUp.js";
import LectureReport from "./AdminComponent/LectureReport.js";
import FacultyMonthlyStatement from "./AdminComponent/FacultyMonthlyStatement.js";
import FacultySalaryReport from "./AdminComponent/FacultySalaryReport.js";
import PaymentCollectionReport from "./AdminComponent/PaymentCollectionReport.js";
import CashVoucher from "./AdminComponent/CashVoucher.js";
import AddCashVoucher from "./AdminComponent/AddCashVoucher.js";
import StockView from "./AdminComponent/StockView.js";
import StudentPlacementReport from "./AdminComponent/StudentPlacementReport.js";
import ConsultancyReport from "./AdminComponent/ConsultancyReport.js";
import ShortlistedByCompany from "./AdminComponent/ShortlistedByCompany.js";
import AddFeesDetails from "./AdminComponent/AddFeesDetails.js";
import AddFeesDetailsListing from "./AdminComponent/AddFeesDetailsListing.js";
import AddEmployeeSalary from "./AdminComponent/AddEmployeeSalary.js";
import AddEmployeeSalaryListing from "./AdminComponent/AddEmployeeSalaryListing.js";
import AddConsultancyMaster from "./AdminComponent/AddConsultancyMaster.js";
import AddConsultancyMasterListing from "./AdminComponent/AddConsultancyMasterListing.js";
import AddCompanyRequirementListing from "./AdminComponent/AddCompanyRequirementListing.js";
import AddCompanyRequirement from "./AdminComponent/AddCompanyRequirement.js";
import ServiceTaxReportonFees from "./AdminComponent/ServiceTaxReportonFees.js";
import ChequeNumber from "./AdminComponent/ChequeNumber.js";
import AddEmployeeAttendance from "./AdminComponent/AddEmployeeAttendance.js";
import AddFacultySalary from "./AdminComponent/AddFacultySalary.js";
import AddFacultySalaryListing from "./AdminComponent/AddFacultySalaryListing.js";
import FacultyListing from "./AdminComponent/FacultyListing.js";
import AddFacultyMaster from "./AdminComponent/AddFacultyMaster.js";
import FacultyExperience from "./AdminComponent/FacultyExperience.js";
import FacultyDiscussion from "./AdminComponent/FacultyDiscussion.js";
import FAcademicQualification from "./AdminComponent/FAcademicQualification.js";
import ConsStudentDetails from "./AdminComponent/ConsStudentDetails.js";
import ConsultancyBranches from "./AdminComponent/ConsultancyBranches.js";
import ConsultancyMaster from "./AdminComponent/ConsultancyMaster.js";
import ConsultancyFollowUp from "./AdminComponent/ConsultancyFollowUp.js";
import ShortlistedBySIT from "./AdminComponent/ShortlistedBySIT.js";
import FeedBack1Listing from "./AdminComponent/FeedBack1Listing.js";
import FeedBack2 from "./AdminComponent/FeedBack2.js";
import FeedBack2Listing from "./AdminComponent/FeedBack2Listing.js";
import FinalExamListing from "./AdminComponent/FinalExamListing.js";
import EmployeeProfessionTaxMaster from "./AdminComponent/EmployeeProfessionTaxMaster.js";
import MyDocument3 from "./AdminComponent/MyDocument3.js";
//import BatchTransferListing from './AdminComponent/BatchTransferListing.js';
import AddAssets from "./AdminComponent/AddAssets.js";
import Taxmaster from "./AdminComponent/Taxmaster.js";
import AddAdminUSer from "./AdminComponent/AddAdminUSer.jsx";
import AcademicQualificationss from "./AdminComponent/AcademicQualificaton.js";
import NavbarWithDropdowns from "./AdminComponent/Navbar/Navbar.jsx";
import AddCVShortListed from "./AdminComponent/AddCVShortListed.js";
import AddConvocation from "./AdminComponent/AddConvocation.js";
import AddShortlistedBySIT from "./AdminComponent/AddShortlistedBySIT.js";
import TestDocument from "./AdminComponent/TestDocument.js";
import { PDFViewer } from "@react-pdf/renderer";
import StandardLecturePlanDoc from "./AdminComponent/Document/StandardLecturePlanDoc.js";
import AssignmentReceiptDoc from "./AdminComponent/Document/AssignmentReceiptDoc.js";
import TestTakenDoc from "./AdminComponent/Document/TestTakenDoc.js";
import StudentLabelDoc from "./AdminComponent/Document/StudentLabelDoc.js";
import SessionPlanDoc from "./AdminComponent/Document/SessionPlanDoc.js";
import ID_CardDoc from "./AdminComponent/Document/ID_CardDoc.js";
import VivaMOCDoc from "./AdminComponent/Document/VivaMOCDoc.js";
import AnalysisDoc from "./AdminComponent/Document/AnalysisDoc";
import Acomodation from "./AdminComponent/Document/Acomodation.js";
import LectureReports from "./AdminComponent/otherDocuments/LectureReport.js";
import Sitpayment from "./AdminComponent/Document/payment.js";
import { Voucher } from "./AdminComponent/Document/Voucher.js";
import TimeSheetDoc from "./AdminComponent/Document/TimeSheetDoc.js";
import StudentReports from "./AdminComponent/Document/StudentReports.js";


const Router = createBrowserRouter([
    {
        path: "/weblog",
        element: <WebLogin />,
    },

    {
        path: "/mydocument",
        element: <MyDocument />,
    },
    {
        path: "/onlineadmissionform/personalinfo/:admissionid",
        element: <PerssonalInfo />,
    },
    {
        path: "/onlineadmissionform/academicqualification/:admissionid",
        element: <AcademicQualification />,
    },
    {
        path: "/onlineadmissionform/companyinfo/:admissionid",
        element: <CompanyInfo />,
    },

    {
        path: "/onlineadmissionform/discussion/:admissionid",
        element: <Discussion />,
    },
    {
        path: "/onlineadmissionform/documents/:admissionid",
        element: <Documents />,
    },

    {
        path: "/admissionform/personalinfo/:admissionid",
        element: <StudentPersonalInfo />,
    },
    {
        path: "/admissionform/academicqualification/:admissionid",
        element: <StudentAqualification />,
    },
    {
        path: "/admissionform/companyinfo/:admissionid",
        element: <StudentCompanyInfo />,
    },

    {
        path: "/admissionform/discussion/:admissionid",
        element: <StudentDiscussion />,
    },
    {
        path: "/admissionform/documents/:admissionid",
        element: <StudentDocument />,
    },

    {
        path: "/",
        element: <WebApp />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: "/",
                element: <AdminDashBoard />,
            },
            {
                path: "/onefieldform/:tablename/:fieldname",
                element: <OneFieldForm />,
            },
            {
                path: "/twofieldform/:tablename/:text1/:text2/:type/:fieldname",
                element: <TwoFieldForm />,
            },
            {
                path: "/threefieldform/:tablename/:text1/:text2/:text3/:type/:fieldname",
                element: <ThreeFieldForm />,
            },
            {
                path: "/vendormaster",
                element: <VendorMaster />,
            },
            {
                path: "/status",
                element: <Status />,
            },
            {
                path: "/discipline",
                element: <Discipline />,
            },
            {
                path: "/qualification",
                element: <Qualification />,
            },
            {
                path: "/bank",
                element: <Bank />,
            },
            {
                path: "/feesnotes",
                element: <Feesnotes />,
            },
            {
                path: "/holiday",
                element: <Holiday />,
            },
            {
                path: "/location",
                element: <Location />,
            },
            // {
            //   path: '/test',
            //   element: <MyDocument3 />
            // },
            {
                path: "/courselisting",
                element: <CourseListing />,
            },
            {
                path: "/course/:courseid",
                element: <Course />,
            },
            {
                path: "/college",
                element: <College />,
            },
            {
                path: "/college/:collegeid",
                element: <College />,
            },
            {
                path: "/addcollegemaster/:collegeid",
                element: <AddCollegeMaster />,
            },
            {
                path: "/studentdetails/:collegeid",
                element: <StudentDetails />,
            },
            {
                path: "/followup/:collegeid",
                element: <FollowUp />,
            },
            {
                path: "/collegelisting",
                element: <CollegeListing />,
            },
            {
                path: "/Qualification",
                element: <Qualification />,
            },

            {
                path: "/batchcategory",
                element: <BatchCategory />,
            },
            {
                path: "/batchlisting",
                element: <Batch />,
            },

            // batch details
            {
                path: "/batchedit",
                element: <BatchEdit />,
            },
            {
                path: "/batchedit/batchdetails/:batchid",
                element: <BatchDetails />,
            },
            {
                path: "/batchedit/feesstructure/:batchid",
                element: <FeesStructure />,
            },
            {
                path: "/batchedit/assignmentdetails/:batchid",
                element: <Assignmentdetails />,
            },
            {
                path: "/batchedit/unittest/:batchid",
                element: <UnitTest />,
            },
            {
                path: "/batchedit/descipline/:batchid",
                element: <Descipline />,
            },
            {
                path: "/batchedit/feedbackdetails/:batchid",
                element: <FeedbackDetails />,
            },
            {
                path: "/batchedit/standardlecture/:batchid",
                element: <StandardLecturePlan />,
            },
            {
                path: "/batchedit/lectureplan/:batchid",
                element: <LecturePlan />,
            },
            {
                path: "/batchedit/convocation/:batchid",
                element: <Convocation />,
            },
            {
                path: "/batchedit/result/:batchid",
                element: <ResultStructure />,
            },
            {
                path: "/batchedit/sitevisit/:batchid",
                element: <SiteVise />,
            },

            // batch details
            {
                path: "/librarybook",
                element: <LibraryBook />,
            },
            {
                path: "/addfeedbacknewquestion",
                element: <AddFeedbackNewQuestion />,
            },
            {
                path: "/faculty",
                element: <FacultyListing />,
            },

            {
                path: "/faculty/:facultyid",
                element: <Faculty />,
            },
            {
                path: "/addfacultymaster",
                element: <AddFacultyMaster />,
            },
            {
                path: "/facultyexperience",
                element: <FacultyExperience />,
            },
            {
                path: "/facultydiscussion",
                element: <FacultyDiscussion />,
            },
            {
                path: "/facademicqualification",
                element: <FAcademicQualification />,
            },
            {
                path: "/annualbatch/:batch_id",
                element: <AnnualBatch />,
            },
            {
                path: "/annualbatchlisting",
                element: <AnnualBatchListing />,
            },
            {
                path: "/bookissue",
                element: <BookIssue />,
            },
            {
                path: "/returnbook",
                element: <ReturnBook />,
            },
            {
                path: "/employeetrainingplan",
                element: <EmployeeTrainingPlanListing />,
            },
            {
                path: "/employeetrainingplan/:employeetrainingplanid",
                element: <EmployeeTrainingPlan />,
            },
            {
                path: "/employeerecord",
                element: <EmployeeRecordListing />,
            },
            {
                path: "/employeerecord/:employeerecordid",
                element: <EmployeeRecord />,
            },
            //===================Report================
            {
                path: "/rinquiry",
                element: <RInquiry />,
            },
            {
                path: "/onlinestudent",
                element: <OnlineStudent />,
            },
            {
                path: "/sitevisit",
                element: <SiteVisit />,
            },
            {
                path: "/studentreport",
                element: <StudentReport />,
            },
            {
                path: "/studentbatch",
                element: <StudentBatch />,
            },
            {
                path: "/yearlymock",
                element: <YearlyMock />,
            },

            {
                path: "/corporaterecord",
                element: <CorporateRecord />,
            },
            {
                path: "/corporateinquiry",
                element: <CorporateInquiry />,
            },
            {
                path: "/feesreport",
                element: <FeesReport />,
            },
            {
                path: "/feesdetails",
                element: <FeesDetails />,
            },
            {
                path: "/batchrecord",
                element: <BatchRecord />,
            },
            {
                path: "/collegefollowup",
                element: <CollogeFollowUp />,
            },
            {
                path: "/convocationguest",
                element: <ConvocationGuest />,
            },
            {
                path: "/finalexam",
                element: <FinalExam />,
            },
            {
                path: "/testDoc",
                element: (
                    <div style={{ width: "100vw", height: "100vh" }}>
                        <PDFViewer style={{ width: "100%", height: "100%" }}>
                           {/* <Voucher/> */}
                           {/* <ID_CardDoc/> */}
                           <StudentReports/>
                        </PDFViewer>
                    </div>
                ),
            },
            {
                path: "/smsemailreport",
                element: <SmsEmailReport />,
            },
            {
                path: "/feedbackanalysis",
                element: <FeedbackAnalysis />,
            },
            {
                path: "/newfeedback",
                element: <NewFeedback />,
            },
            {
                path: "/studentsearch",
                element: <StudentSearch />,
            },
            {
                path: "/inquiryreport",
                element: <InquiryReport />,
            },

            {
                path: "/lecturereport",
                element: <LectureReport />,
            },
            {
                path: "/facultymonthly",
                element: <FacultyMonthlyStatement />,
            },
            {
                path: "/facultysalary",
                element: <FacultySalaryReport />,
            },
            {
                path: "/paymentcollection",
                element: <PaymentCollectionReport />,
            },
            {
                path: "/servicetaxreportonfees",
                element: <ServiceTaxReportonFees />,
            },
            {
                path: "/chequenumber",
                element: <ChequeNumber />,
            },
            // =====================Admission Activity===================

            {
                path: "/inquiry/:inquiryid",
                element: <Inquiry />,
            },
            {
                path: "/Student",
                element: <Students />,
            },
            {
                path: "/onlineadmission",
                element: <OnlineAdmissions />,
            },
            {
                path: "/inquirycorporate",
                element: <InquiryCorporate />,
            },
            {
                path: "/addcorporateinquiry/:corpid",
                element: <AddCorporateInquiry />,
            },
            //================Daily Activities======================

            {
                path: "/rollnumberallot",
                element: <RollNumberAllot />,
            },

            {
                path: "/lecturetaken",
                element: <LectureTakenListing />,
            },

            {
                path: "/lecturetaken/:lecturetakenid",
                element: <LectureTaken />,
            },
            {
                path: "/assignmentstaken/:assignmentstakenid",
                element: <AssignmentsTaken />,
            },
            {
                path: "/assignmentstaken",
                element: <AssignmentsTakenListing />,
            },
            {
                path: "/unittesttaken",
                element: <UnitTestTakenListing />,
            },
            {
                path: "/unittesttaken/:unittesttakenid",
                element: <UnitTestTaken />,
            },
            {
                path: "/vivamoctaken",
                element: <VivaMOCTakenListing />,
            },
            {
                path: "/vivamoctaken/:vivamoctakenid",
                element: <VivaMOCTaken />,
            },

            {
                path: "/finalexamtakenlisting",
                element: <FinalExamListing />,
            },
            {
                path: "/finalexamtaken/:finalexamtakenid",
                element: <FinalExamTaken />,
            },
            {
                path: "/generateresult",
                element: <GenerateResultListing />,
            },
            {
                path: "/generateresult/:generateresultid",
                element: <GenerateResult />,
            },
            {
                path: "/facultyworking",
                element: <FacultyWorking />,
            },
            {
                path: "/visitsite",
                element: <VisitSite />,
            },

            {
                path: "/feedback1",
                element: <FeedBack1Listing />,
            },

            {
                path: "/feedback1/:feedback1id",
                element: <FeedBack1 />,
            },
            {
                path: "/feedback2",
                element: <FeedBack2Listing />,
            },

            {
                path: "/feedback2/:feedback2id",
                element: <FeedBack2 />,
            },

            //================Utility======================

            {
                path: "/festivalphoto",
                element: <FestivalPhoto />,
            },
            {
                path: "/noticeboard",
                element: <NoticeBoard />,
            },
            {
                path: "/masssms",
                element: <MassSMS />,
            },
            {
                path: "/massemail",
                element: <MassEMail />,
            },
            {
                path: "/massemailcontent",
                element: <MassEMailContent />,
            },
            {
                path: "/uploadeventphoto",
                element: <UploadEventPhoto />,
            },
            {
                path: "/uploadbanner",
                element: <UploadBanner />,
            },
            {
                path: "/exportcontacts",
                element: <ContactExport />,
            },
            {
                path: "/uploadtestimonial",
                element: <UploadTestimonial />,
            },

            {
                path: "/emailmaster",
                element: <EmailMasterListing />,
            },
            {
                path: "/emailmaster/:emailmaster",
                element: <EmailMaster />,
            },

            {
                path: "/qmsdoes",
                element: <QSMDoes />,
            },
            {
                path: "/qmsmaster",
                element: <QmsMaster />,
            },
            {
                path: "/masswhatsapp",
                element: <MassWhatsApp />,
            },
            {
                path: "/taskmanagements",
                element: <TaskManagement />,
            },
            {
                path: "/addtasktemplate",
                element: <AddTaskTemplate />,
            },
            {
                path: "/taskadd",
                element: <TaskAdd />,
            },
            {
                path: "/taxmaster",
                element: <Taxmaster />,
            },
            {
                path: "/AddChecklist",
                element: <AddChecklist />,
            },
            {
                path: "/searchedittasktemplate",
                element: <SearchEditTaskTemplate />,
            },
            // {
            //   path: '/searchedittask',
            //   element: <SearchEditTask/>
            // },

            {
                path: "/searcheditchecklist",
                element: <SearchEditChecklist />,
            },

            //  ================Placements======================

            // {
            //   path: '/consultancymaster',
            //   element: <ConsultancyMaster/>
            // },
            {
                path: "/shortlisted",
                element: <ShortlistedBySIT />,
            },
            {
                path: "/shortlisted/:id",
                element: <AddShortlistedBySIT />,
            },
            {
                path: "/cvshortlisted",
                element: <CVShortListed />,
            },
            {
                path: "/cvshortlisted/:CVId",
                element: <AddCVShortListed />,
            },
            {
                path: "/latestcvupdated",
                element: <CVUpdated />,
            },
            {
                path: "/convocation",
                element: <Convocation />,
            },
            {
                path: "/convocation/:Id",
                element: <AddConvocation />,
            },
            {
                path: "/viewstudent",
                element: <ViewStudentCV />,
            },
            {
                path: "/admissionlisting",
                element: <AdmissionListing />,
            },
            {
                path: "/admission/:studentid",
                element: <Admission />,
            },
            {
                path: "/inquirylisting",
                element: <InquiryListing />,
            },
            {
                path: "/studentplacement",
                element: <StudentPlacementReport />,
            },
            {
                path: "/consultancyreport",
                element: <ConsultancyReport />,
            },
            {
                path: "/shortlistedcompany",
                element: <ShortlistedByCompany />,
            },

            // ======================Inquiry form

            {
                path: "/onlineinquiry/inquiryform/:inquiryid",
                element: <Inquiry />,
            },
            {
                path: "/onlineinquiry/inquirydiscussion/:inquiryid",
                element: <InquiryDiscussuion />,
            },

            // ======================Account Master

            {
                path: "/employeeprofessiontaxmaster",
                element: <EmployeeProfessionTaxMaster />,
            },
            {
                path: "/assets",
                element: <AddAssets />,
            },

            // {
            //   path: '/batchtransfer',
            //   element: <BatchTransferListing />
            // },

            {
                path: "/batchtransfer",
                element: <BatchTransfer />,
            },

            {
                path: "/batchcancellation",
                element: <BatchCancellation />,
            },

            {
                path: "/materialconsumption",
                element: <MaterialConsumption />,
            },

            {
                path: "/salarymaster",
                element: <SalaryMaster />,
            },
            {
                path: "/batchleft",
                element: <BatchLeft />,
            },
            {
                path: "/batchmoving",
                element: <BatchMoving />,
            },
            {
                path: "/employeeloan",
                element: <EmployeeLoan />,
            },
            {
                path: "/addfacultysalry",
                element: <AddFacultySalaryListing />,
            },
            {
                path: "/addfacultysalary/:addfacultysalaryid",
                element: <AddFacultySalary />,
            },

            {
                path: "/projectmaster",
                element: <ProjectMaster />,
            },
            {
                path: "/mlwfmaster",
                element: <MLWFMaster />,
            },
            {
                path: "/purchasematerial",
                element: <PurchaseMaterial />,
            },
            {
                path: "/cashvoucher/:voucherid",
                element: <AddCashVoucher />,
            },
            {
                path: "/cashvoucher",
                element: <CashVoucher />,
            },
            {
                path: "/stockview",
                element: <StockView />,
            },
            {
                path: "/addfeesdetails",
                element: <AddFeesDetailsListing />,
            },
            {
                path: "/addfeesdetails/:addfeesdetailsid",
                element: <AddFeesDetails />,
            },
            {
                path: "/employeesalary",
                element: <AddEmployeeSalaryListing />,
            },
            {
                path: "/addemployeesalary/:addemployeesalaryid",
                element: <AddEmployeeSalary />,
            },
            {
                path: "/consultancymaster",
                element: <AddConsultancyMasterListing />,
            },
            {
                path: "/consultancymaster/:consultancymasterid",
                element: <AddConsultancyMaster />,
            },
            {
                path: "/consstudentdetails",
                element: <ConsStudentDetails />,
            },
            {
                path: "/consultancymaster",
                element: <ConsultancyMaster />,
            },
            {
                path: "/consultancybranches",
                element: <ConsultancyBranches />,
            },
            {
                path: "/consultancyfollowup",
                element: <ConsultancyFollowUp />,
            },
            {
                path: "/companyrequirment",
                element: <AddCompanyRequirementListing />,
            },
            {
                path: "/companyrequirment/:companyrequirmentid",
                element: <AddCompanyRequirement />,
            },
            {
                path: "/addemployeeattendance",
                element: <AddEmployeeAttendance />,
            },

            // ====================Role Rights

            {
                path: "/addrole",
                element: <AddRole />,
            },
            {
                path: "/adminuser",
                element: <AdminUser />,
            },
            {
                path: "/adminuser/:userid",
                element: <AddAdminUSer />,
            },
            {
                path: "/roleassign",
                element: <RoleAssignment />,
            },

            //===============================
            {
                path: "/addcollegeinfo",
                element: <AddCollegeInfo />,
            },

            {
                path: "/academicqualification",
                element: <AcademicQualificationss />,
            },
        ],
    },
]);

function WebApp() {
    const [click, setClick] = useState(false);
    const { pathname } = useLocation();

    async function accessSession(navigate) {
        const token = Cookies.get("token");

        try {
            await axios.get(`${BASE_URL}/protected`, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error) {
            console.log("You are not authorized to view this content.");
            navigate("/weblog");
        }
    }

    const navigate = useNavigate();
    useEffect(() => {
        accessSession(navigate);

        return () => {};
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <SidebarProvider>
                <div className="container-scroller ">
                    <NavbarWithDropdowns />
                    {/* <Header /> */}
                    <Outlet />
                </div>
            </SidebarProvider>
        </>
    );
}

export default Router;
