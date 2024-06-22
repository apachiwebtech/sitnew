import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom';
import AdminDashBoard from './AdminComponent/AdminDashBoard';
import { BASE_URL } from './AdminComponent/BaseUrl';
import Header from './AdminComponent/Header';
import OneFieldForm from './AdminComponent/OneFieldForm';
import PageNotFound from './AdminComponent/PageNotFound';

import WebLogin from './AdminComponent/WebLogin';
import './App.css';

import './Responsive.css';
import './Style.css';
import TwoFieldForm from './AdminComponent/TwoFieldForm';
import ThreeFieldForm from './AdminComponent/ThreeFieldForm';
import VendorMaster from './AdminComponent/VenorMaster';
import Course from './AdminComponent/Course';
import BookCode from './AdminComponent/College';
import College from './AdminComponent/College';
import BatchCategory from './AdminComponent/BatchCategory';
// import Faculty from './AdminComponent/LibraryBook';
// import { Feedback, LibraryBooks } from '@mui/icons-material';
import LibraryBook from './AdminComponent/LibraryBook';
// import Feedback from './AdminComponent/Feedback';
import Faculty from './AdminComponent/Faculty';
import AnnualBatch from './AdminComponent/AnnualBatch';
import BookIssue from './AdminComponent/BookIssue';
import ReturnBook from './AdminComponent/ReturnBook';
import EmployeeRecord from './AdminComponent/EmployeeRecord';
import EmployeeTraining from './AdminComponent/EmployeeTraining';
import OnlineStudent from './AdminComponent/OnlineStudent';
import SiteVisit from './AdminComponent/SiteVisit';
import StudentReport from './AdminComponent/StudentReport';
import StudentBatch from './AdminComponent/StudentBatch';
import YearlyMock from './AdminComponent/YearlyMock';
import AnnualBatchPlan from './AdminComponent/AnnualBatchPlan';
import CorporateRecord from './AdminComponent/CorporateRecord';
import BatchRecord from './AdminComponent/BatchRecord';
import CorporateInquiry from './AdminComponent/CorporateInquiry';
import CollogeFollowUp from './AdminComponent/CollegeFollowUp';
import ConvocationGuest from './AdminComponent/ConvocationGuest';
import FinalExam from './AdminComponent/FinalExam';
import SmsEmailReport from './AdminComponent/SmsEmailReport';
import FeedbackAnalysis from './AdminComponent/FeedbackAnalysis';
import NewFeedback from './AdminComponent/NewFeedback';
import StudentSearch from './AdminComponent/StudentSearch';
import Inquiry from './AdminComponent/Inquiry';
import InquiryCorporate from './AdminComponent/InquiryCorporate';
import LectureTaken from './AdminComponent/LectureTaken';
import AssignmentsTaken from './AdminComponent/AssignmentsTaken';
import UnitTestTaken from './AdminComponent/UnitTestTaken';
import VivaMOCTaken from './AdminComponent/VivaMOCTaken';
import FinalExamTaken from './AdminComponent/FinalExamTaken';
import GenerateResult from './AdminComponent/GenerateResult';
import FacultyWorking from './AdminComponent/FacultyWorking';
import VisitSite from './AdminComponent/VisitSite';
import FestivalPhoto from './AdminComponent/FestivalPhoto';
import NoticeBoard from './AdminComponent/NoticeBoard';
import UploadEventPhoto from './AdminComponent/UploadEventPhoto';
import UploadTestimonial from './AdminComponent/UploadTestimonial';
import EmailMaster from './AdminComponent/EmailMaster';
import QSMDoes from './AdminComponent/QSMDoes';
// import ConsultancyMaster from './AdminComponent/ConsultancyMaster';
import CVShortListed from './AdminComponent/CVShortListed.js';
import CVUpdated from './AdminComponent/CVUpdated.js';
import Convocation from './AdminComponent/Convocation.js';
import ViewStudentCV from './AdminComponent/ViewStudentCV.js';
// import CompanyRequirment from './AdminComponent/CompanyRequirment.js';
import Students from './AdminComponent/Students.jsx';
import OnlineAdmissions from './AdminComponent/OnlineAdmission.jsx';
import GetCorporate from './AdminComponent/GetCorporate.jsx';
import AdmissionForm from './AdminComponent/AdmissionForm.js';
import InquiryListing from './AdminComponent/InquiryListing.js';
import OnlineAdmissionForm from './AdminComponent/OnlineAdmissionForm.js';
import PerssonalInfo from './AdminComponent/PerssonalInfo.js';
import AcademicQualification from './AdminComponent/AcademicQualification.js';
import CompanyInfo from './AdminComponent/CompanyInfo.js';
import Discussion from './AdminComponent/Discussion.js';
import Documents from './AdminComponent/Documents.js';
import AdmissionListing from './AdminComponent/AdmissionListing.js';
import Admission from './AdminComponent/Admission.js';
import AddCorporateInquiry from './AdminComponent/AddCorporateInquiry.js';
import LectureTakenListing from './AdminComponent/LectureTakenListing.js';
import FeedBack1 from './AdminComponent/FeedBack1.js';
import UploadBanner from './AdminComponent/Uploadbanner.js';
import InquiryReport from './AdminComponent/InquiryReport.js';
import Assets from './AdminComponent/assets.js';
import BatchTransfer from './AdminComponent/BatchTransfer.js';
import BatchCancellation from './AdminComponent/BatchCancellation.js';
import MaterialConsumption from './AdminComponent/MaterialConsumption.js';
import SalaryMaster from './AdminComponent/SalaryMaster.js';
import BatchLeft from './AdminComponent/BatchLeft.js';
import BatchMoving from './AdminComponent/BatchMoving.js';
import EmployeeLoan from './AdminComponent/EmployeeLoan.js';
import ProjectMaster from './AdminComponent/ProjectMaster.js';
import MLWFMaster from './AdminComponent/MLWFMaster.js';
import EmployeeTrainingPlan from './AdminComponent/EmployeeTrainingPlan.js';
import AddFeedbackNewQuestion from './AdminComponent/AddFeedbackNewQuestion.js';






const Router = createBrowserRouter([
  {
    path: '/weblog',
    element: <WebLogin />
  },

  {
    path: '/',
    element: <WebApp />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <AdminDashBoard />
      },
      {
        path: '/onefieldform/:tablename/:fieldname',
        element: <OneFieldForm />
      },
      {
        path: '/twofieldform/:tablename/:text1/:text2/:type/:fieldname',
        element: <TwoFieldForm />
      },
      {
        path: '/threefieldform/:tablename/:text1/:text2/:text3/:type/:fieldname',
        element: <ThreeFieldForm />
      },
      {
        path: '/vendormaster',
        element: <VendorMaster />
      },
      {
        path: '/course',
        element: <Course/>
      },
      {
        path: '/college',
        element: <College />
      },

      {
        path: '/batchcategory',
        element: <BatchCategory/>
      },
      {
        path: '/librarybook',
        element: <LibraryBook/>
      },
      {
        path: '/addfeedbacknewquestion',
        element: <AddFeedbackNewQuestion/>
      },
      
      {
        path: '/faculty',
        element: <Faculty/>
      },
      {
        path: '/annualbatch',
        element: <AnnualBatch/>
      },
      {
        path: '/bookissue',
        element: <BookIssue/>
      },
      {
        path: '/returnbook',
        element: <ReturnBook/>
      },

      {
        path: '/employeetrainingplan',
        element: <EmployeeTrainingPlan/>
      },
      {
        path: '/employeerecord',
        element: <EmployeeRecord/>
      },

      {
        path: '/onlinestudent',
        element: <OnlineStudent/>
      },
      {
        path: '/sitevisit',
        element: <SiteVisit/>
      },
      {
        path: '/studentreport',
        element: <StudentReport/>
      },
      {
        path: '/studentbatch',
        element: <StudentBatch/>
      },
      {
        path: '/yearlymock',
        element: <YearlyMock/>
      },
      {
        path: '/annualbatchplan',
        element: <AnnualBatchPlan/>
      },
      {
        path: '/corporaterecord',
        element: <CorporateRecord/>
      },
      {
        path: '/batchrecord',
        element: <BatchRecord/>
      },
      {
        path: '/corporateinquiry',
        element: <CorporateInquiry/>
      },
      {
        path: '/collegefollowup',
        element: <CollogeFollowUp/>
      },
      {
        path: '/convocationguest',
        element: <ConvocationGuest/>
      },
      {
        path: '/finalexam',
        element: <FinalExam/>
      },
      {
        path: '/smsemailreport',
        element:  <SmsEmailReport/>
      },
      {
        path: '/feedbackanalysis',
        element: <FeedbackAnalysis/>
      },
      {
        path: '/newfeedback',
        element: <NewFeedback/>
      },
      {
        path: '/studentsearch',
        element: <StudentSearch/>
      },
      {
        path: '/inquiryreport',
        element: <InquiryReport/>
      },
      // =====================Admission Activity===================

      {
        path: '/inquiry/:inquiryid',
        element: <Inquiry/>
      },
      {
        path: '/Student',
        element: <Students/>
      },
      {
        path: '/onlineadmission',
        element: <OnlineAdmissions/>
      },
      {
        path: '/inquirycorporate',
        element: <InquiryCorporate/>
      },
      {
        path: '/addcorporateinquiry/:corpid',
        element: <AddCorporateInquiry/>
      },
      //================Daily Activities======================

      {
        path: '/lecturetaken',
        element: <LectureTakenListing/>
      },

      {
        path: '/lecturetaken/:lecturetakenid',
        element: <LectureTaken/>
      },
      {
        path: '/assignmentstaken',
        element: <AssignmentsTaken/>
      },
      {
        path: '/unittesttaken',
        element: <UnitTestTaken/>
      },
      {
        path: '/vivamoctaken',
        element: <VivaMOCTaken/>
      },
      {
        path: '/finalexamtaken',
        element: <FinalExamTaken/>
      },
      {
        path: '/generateresult',
        element: <GenerateResult/>
      },
      {
        path: '/facultyworking',
        element: <FacultyWorking/>
      },
      {
        path: '/visitsite',
        element: <VisitSite/>
      },

      {
        path: '/feedback1',
        element: <FeedBack1/>
      },

      //================Utility======================

      {
        path: '/festivalphoto',
        element: <FestivalPhoto/>
      },
      {
        path: '/noticeboard',
        element: <NoticeBoard/>
      },
      {
        path: '/uploadeventphoto',
        element: <UploadEventPhoto/>
      },
      {
        path: '/uploadbanner',
        element: <UploadBanner/>
      },
      {
        path: '/uploadtestimonial',
        element: <UploadTestimonial/>
      },
      {
        path: '/emailmaster',
        element: <EmailMaster/>
      },
      {
        path: '/qmsdoes',
        element: <QSMDoes/>
      },

    //  ================Placements======================

      // {
      //   path: '/consultancymaster',
      //   element: <ConsultancyMaster/>
      // },
      {
        path: '/cvshortlisted',
        element: <CVShortListed/>
      },
      {
        path: '/latestcvupdated',
        element: <CVUpdated/>
      },
      {
        path: '/convocation',
        element: <Convocation/>
      },
      {
        path: '/viewstudent',
        element: <ViewStudentCV/>
      },
      {
        path: '/admissionform',
        element: <AdmissionForm/>
      },
      {
        path: '/admissionlisting',
        element: <AdmissionListing/>
      },
      {
        path: '/admission/:studentid',
        element: <Admission/>
      },
      {
        path: '/inquirylisting',
        element: <InquiryListing/>
      },
      {
        path: '/onlineadmissionform/personalinfo/:admissionid',
        element: <PerssonalInfo/>
      },
      {
        path: '/onlineadmissionform/academicqualification/:admissionid',
        element: <AcademicQualification/>
      },
      {
        path: '/onlineadmissionform/companyinfo/:admissionid',
        element: <CompanyInfo/>
      },
   
      {
        path: '/onlineadmissionform/discussion/:admissionid',
        element: <Discussion/>
      },
      {
        path: '/onlineadmissionform/documents/:admissionid',
        element: <Documents/>
      },

    // ======================Account Master

      {
        path: '/assets',
        element: <Assets/>
      },

      {
        path: '/batchtransfer',
        element: <BatchTransfer/>
      },

      {
        path: '/batchcancellation',
        element: <BatchCancellation/>
      },

      {
        path: '/materialconsumption',
        element: <MaterialConsumption/>
      },

      {
        path: '/salarymaster',
        element: <SalaryMaster />
      },
      {
        path: '/batchleft',
        element: <BatchLeft/>
      },
      {
        path: '/batchmoving',
        element: <BatchMoving/>
      },
      {
        path: '/employeeloan',
        element: <EmployeeLoan/>
      },

      {
        path: '/projectmaster',
        element: <ProjectMaster/>
      },
      {
        path: '/mlwfmaster',
        element: <MLWFMaster/>
      }
      


  

      
   

    




    ]
  }
])

function checkLocalStorageAndRedirect(navigate) {
  const user_id = Cookies.get('userid');
  if (user_id == null) {
    navigate('/weblog'); // Redirect to dashboard if id exists in localStorage
  }
}






function WebApp() {


  async function accessSession() {
    axios.get(`${BASE_URL}/checkauth`)
      .then((res) => {
        if (res.data.valid) {
        } else {
          navigate('/')
        }
      });
  }



  const navigate = useNavigate();
  useEffect(() => {
    checkLocalStorageAndRedirect(navigate);
    accessSession()
  }, [navigate]);





  return (
    <>
      <div className="container-scroller row">
        <Header />
        <Outlet />
      </div>
    </>

  );
}



export default Router;
