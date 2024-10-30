import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, IMG_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import OnlineAdmissionForm from './OnlineAdmissionForm';
import img from '../assets/pass.jpg';
import InnerHeaderForm from './InnerHeaderForm';

const PerssonalInfo = () => {
    const [course, setCourse] = useState([])
    const [batchCategoty, setbatchCategory] = useState([]);
    const [status, setStatus] = useState([])
    const [batch, setBatch] = useState([])
    const [amount, setAmount] = useState('')
    const [batchid, setBatchId] = useState([])
    const [batchcode, setbatchcode] = useState('')
    const [profilephoto, setProfile] = useState('')
    const location = useLocation();
    const navigate = useNavigate()
    const [personalInfo, setPersonalInfo] = useState({
        studentName: '',
        Student_Id: '',
        gender: '',
        nationality: '',
        dob: '',
        password: '',
        reference: '',
        presentaddress: '',
        presentPincode: '',
        presentCity: '',
        state: '',
        presentCountry: '',
        mobile: '',
        whatsapp: '',
        course: '',
        category: '',
        // Referby: '',
        admission_dt: '',
        prestatus: '',
        changestatus: '',
        prestatusdate: '',
        date: '',
        permanentAdress: '',
        permanentPincode: '',
        permanentCity: '',
        permanentState: '',
        permanentCountry: '',
        permanentmobile: '',
        perWatsapp: '',
        sdate: '',
        edate: '',
        Amount: '',
        permanentemail: ''

    })
    const { admissionid } = useParams();

    const getCourse = async () => {
        const response = await fetch(`${BASE_URL}/getCourses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setCourse(data);
    }
    const getBtachCategory = async () => {
        const response = await fetch(`${BASE_URL}/getBtachCategory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setbatchCategory(data);
    }
    const getBtach = async () => {
        const response = await fetch(`${BASE_URL}/getBtach`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setBatch(data);

    }

    const getBatchwiseamount = async (batchcode) => {

        setbatchcode(batchcode)
        

        const param = {
            Batch_Code: batchcode
        }

        axios.post(`${BASE_URL}/getBtachwiseamount`, param)
            .then((res) => {
                if (res.data[0]) {
                    setAmount(res.data[0].total_inr)

                }
            })

    }

    async function getStatus() {
        axios.get(`${BASE_URL}/getstatus`)
            .then((res) => {
                setStatus(res.data)
            })
    }

    const handleStatus = (value) => {

        const data = {
            statusid: value,
            student_id : admissionid
        }

        axios.post(`${BASE_URL}/updateadmissionstatus`, data)
            .then((res) => {
                console.log(res)
                alert('status updated')
                navigate(`/onlineadmission`)

            })
    }


    async function getProfile() {

        const data = {
          student_id: localStorage.getItem(`Admissionid`)
        }
        axios.post(`${BASE_URL}/getdocuments`, data)
          .then((res) => {
            console.log(res)

            if(res.data && res.data[0].upload_image){
                
                setProfile(res.data[0].upload_image)
            }
          })
      }


    useEffect(() => {
        getProfile()
        getStatus()
        getCourse()
        getBtachCategory()
        getBtach()
        localStorage.setItem("Admissionid", admissionid);
    }, [admissionid])



    const getPersonalData = async () => {
        const response = await fetch(`${BASE_URL}/getPersonal`, {
            method: 'POST',
            body: JSON.stringify({
                admissionid: localStorage.getItem(`Admissionid`),
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        setbatchcode(data[0].Batch_Code)
        getBatchwiseamount(data[0].Batch_Code)
        setBatchId(data[0].Batch_Id)

        console.log(data[0].Permanent_Country)
        setPersonalInfo(prevState => ({
            ...prevState,
            Batch_Code: data[0].Batch_Code,
            studentName: data[0].Student_Name,
            gender: data[0].Sex,
            nationality: data[0].Nationality,
            dob: data[0].DOB,
            // password: data[0].,
            Student_Id: data[0].Student_Id,
            presentaddress: data[0].Present_Address,
            presentPincode: data[0].Present_Pin,
            presentCity: data[0].Present_City,
            state: data[0].Present_State,
            presentCountry: data[0].Present_Country,
            mobile: data[0].Present_Mobile,
            reference: data[0].Refered_By,
            whatsapp: '',
            course: data[0].Course_Id,
            category: data[0].Batch_Category_id,
            // Referby: data[0].Refered_By,
            admission_dt: data[0].Admission_Dt,
            prestatus: data[0].Status_id,
            changestatus: data[0].Status_id,
            date: data[0].Status_date,
            prestatusdate: data[0].Status_date,
            permanentAdress: data[0].Permanent_Address,
            permanentPincode: data[0].Permanent_Pin,
            permanentCity: data[0].Permanent_City,
            permanentState: data[0].Permanent_State,
            permanentCountry: data[0].Permanent_Country,
            permanentmobile: data[0].Permanent_Tel,
            permanentemail: data[0].Email,
            perWatsapp: '',
            sdate: data[0].SDate,
            edate: data[0].Edate
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prevState => ({
            ...prevState,
            [name]: value,
        }
        ))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        // if(validateForm()){

        const response = await fetch(`${BASE_URL}/updateStudent`, {
            method: 'POST',
            body: JSON.stringify({
                Student_Id: localStorage.getItem(`Admissionid`),
                studentName: personalInfo.studentName,
                Batch_Code: batchcode,
                gender: personalInfo.gender,
                nationality: personalInfo.nationality,
                dob: personalInfo.dob,
                password: personalInfo.password,
                reference: personalInfo.reference,
                presentaddress: personalInfo.presentaddress,
                presentPincode: personalInfo.presentPincode,
                presentCity: personalInfo.presentCity,
                state: personalInfo.state,
                presentCountry: personalInfo.presentCountry,
                mobile: personalInfo.mobile,
                whatsapp: personalInfo.whatsapp,
                course: personalInfo.course,
                category: personalInfo.category,
                // Referby: personalInfo.Referby,
                admission_dt: personalInfo.admission_dt,
                prestatus: personalInfo.prestatus,
                changestatus: personalInfo.changestatus,
                date: personalInfo.date,
                prestatusdate: personalInfo.prestatusdate,
                permanentAdress: personalInfo.permanentAdress,
                permanentPincode: personalInfo.permanentPincode,
                permanentCity: personalInfo.permanentCity,
                permanentState: personalInfo.permanentState,
                permanentCountry: personalInfo.permanentCountry,
                permanentmobile: personalInfo.permanentmobile,
                perWatsapp: personalInfo.perWatsapp,
                permanentemail: personalInfo.permanentemail
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        alert("Updated Successfully")

        // }
    }
    useEffect(() => {
        getPersonalData();
    }, [])


    const handleadmission = async (id) => {
        
      let confirm = window.confirm("Are you sure you want to proceed?");

      if (confirm) {
          try {
              // Fetch batch code from personalInfo.Batch_Code
              const dataw =  { batch: personalInfo.Batch_Code }


              // const batchCodeResponse = await axios.post(`${BASE_URL}/getBatchCode`, dataw);
              // const batchCode = batchCodeResponse.data[0].Batch_code;
              const batchCode = personalInfo.Batch_Code;

              // const batchCode = personalInfo.Batch_Code;
              const data =  { batch: personalInfo.Batch_Code }
              // Fetch the existing student count for the batch
              const countResponse = await axios.post(`${BASE_URL}/getStudentCount`,data);
              const existingCount = countResponse.data[0].total + 1;
              console.log(existingCount)

              // Generate the student code
              const year = new Date().getFullYear().toString().slice(2);
              const countStr = String(existingCount).padStart(3, '0');
              const studentCode = `${year}${batchCode}${countStr}`;


              const dataq = {
                  Student_Id: personalInfo.Student_Id, // Send the generated student code as Student_Id
                  Course_Id: personalInfo.course,
                  Batch_Id: personalInfo.Batch_Code,
                  Admission_Dt: "05-08-2024",
                  Amount: amount,
                  student_code : studentCode
              };

              // Send the data via POST request
              const res = await axios.post(`${BASE_URL}/process_admission`, dataq);

              alert("Admission successful");

              // Optionally navigate to a different page
              navigate(`/admissionlisting`);
          } catch (error) {
              console.error("Error processing admission:", error);
              alert("Failed to process admission. Please try again.");
          }
      }
  };

    // const handleadmission = (id) => {
    //     let confirm = window.confirm("Are you sure want to proceed ")

    //     if (confirm) {


    //         const data = {
    //             Student_Id: id,
    //             Course_Id: personalInfo.course,
    //             Batch_Id: personalInfo.Batch_Code,
    //             Admission_Dt: "05-08-2024",
    //             Amount: amount

    //         }

    //         axios.post(`${BASE_URL}/process_admission`, data)
    //             .then((res) => {
    //                 alert("Admission successfull")
    //             })

    //         // navigate(`/admission/${id}`)


    //     }


    // }

    return (


        <div className="container-fluid page-body-wrapper">
            <InnerHeaderForm />

            <div className="main-panel">

                <div className="content-wrapper">

                    <OnlineAdmissionForm admissionid={admissionid} />

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <form onSubmit={handleSubmit} className='row d-flex justify-content-between'>
                                        <div className='col-md-5 col-lg-5'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Student Details :  </h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">B.M. ID<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.Student_Id} placeholder="Name*" name='Student_Id' onChange={handleChange} disabled />
                                                        </div>

                                                        <div className="form-group col-lg-8">
                                                            <label for="exampleInputUsername1">Name<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.studentName} placeholder="Name*" name='studentName' onChange={handleChange} />
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Gender</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.gender} name='gender' onChange={handleChange} >
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Nationality<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.nationality} placeholder="nationality*" name='nationality' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Date Of Birth</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={personalInfo.dob} placeholder="Dob" name='dob' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Password<span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={personalInfo.password} placeholder="Name*" name='password' onChange={handleChange} />
                                                        </div>

                                                        <div className="form-group col-lg-12 ">
                                                            <label for="exampleInputUsername1">How they come to know about SIT</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={personalInfo.reference} placeholder="Ex. Google" name='reference' onChange={handleChange} disabled />
                                                        </div>

                                                    </div>

                                                    <div>
                                                        <h4 className="card-title titleback">Present Address :  </h4>
                                                    </div>

                                                    <div className='row'>

                                                        <div className="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Address </label>
                                                            <textarea className="form-control" id="exampleTextarea1" value={personalInfo.presentaddress} placeholder="presentAdress" name='presentaddress' onChange={handleChange}></textarea>

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Pincode<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.presentPincode} placeholder="Name*" name='presentPincode' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">City<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.presentCity} placeholder="Name*" name='presentCity' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">State<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.state} placeholder="Name*" name='state' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.presentCountry} placeholder="Name*" name='presentCountry' onChange={handleChange} />

                                                        </div>

                                                        <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.mobile} placeholder="Number" name='mobile' onChange={handleChange} />
                                                        </div>

                                                        {/* <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Whatsapp Number</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.whatsapp} placeholder="Number" name='whatsapp' onChange={handleChange} />
                                                        </div> */}
                                                    </div>



                                                </div>
                                            </div>


                                            <div className='row p-2 gap-2 '>
                                                <button type='button' className='mr-2 btn btn-success' value={`9`} onClick={(e) => handleStatus(e.target.value)}>Accept</button>
                                                <button type='button' className='mr-2 btn btn-danger' value={`5`} onClick={(e) => handleStatus(e.target.value)}>Denied</button>
                                                <button type='button' className='mr-2 btn btn-secondary' onClick={() => handleadmission(admissionid)}>Admission</button>
                                                <button type="submit" className='mr-2 btn btn-primary'>Save</button>
                                                <Link to="/onlineadmission" className='mr-2 btn btn-secondary'>close</Link>
                                            </div>

                                        </div>
                                        <div className='col-md-5 col-lg-5'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Training Programme & Batch Detail</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">
                                                                Training Programme</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.course} name='course' defaultValue={personalInfo.course} onChange={handleChange} >
                                                                {course.map((item) => {
                                                                    return (
                                                                        <option key={item.id} value={item.Course_Id}>{item.Course_Name}</option>
                                                                    )
                                                                })}

                                                            </select>

                                                        </div>
                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Category</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.category} name='category' defaultValue={personalInfo.category} onChange={handleChange} >
                                                                {batchCategoty?.map((item) => {
                                                                    return <option value={item.id}>{item.BatchCategory}</option>
                                                                })}
                                                            </select>
                                                        </div>


                                                        <div className="form-group col-lg-5 ">
                                                            <label for="exampleInputUsername1">Batch Code</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.Batch_Code} name='Batch_Code' onChange={(e) => getBatchwiseamount(e.target.value)} >

                                                                <option value="">Select batch</option>
                                                                {batch.map((item) => {
                                                                    return (

                                                                        <option value={item.Batch_code}>{item.Batch_code}</option>
                                                                    )
                                                                })}


                                                            </select>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Online Admission Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Online Admission Date	</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={personalInfo.admission_dt} placeholder="" name='admission_dt' onChange={handleChange} disabled />

                                                        </div>

                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Status	</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={personalInfo.prestatus} placeholder="Ex. Closed" name='prestatus' disabled onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Date</label>

                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={personalInfo.prestatusdate} placeholder="Date" name='prestatusdate' disabled onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    <div className='row'>

                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Set Status</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={personalInfo.changestatus} onChange={handleChange} defaultValue={personalInfo.changestatus} name='changestatus' >

                                                                {status.map((item) => {
                                                                    return (
                                                                        <option value={item.Id} >{item.Status}</option>
                                                                    )
                                                                })}

                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={personalInfo.date} placeholder="Contact Person" name='date' onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    <div className='pt-3'>
                                                        <h4 className="card-title titleback">Permanent Address   :  </h4>
                                                    </div>

                                                    <div className='row'>

                                                        <div className="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Address </label>
                                                            <textarea className="form-control" id="exampleTextarea1" value={personalInfo.permanentAdress} placeholder="permanentAdress" name='permanentAdress' onChange={handleChange}></textarea>

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Pincode<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentPincode} placeholder="Name*" name='permanentPincode' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">City<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentCity} placeholder="Name*" name='permanentCity' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">State<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentState} placeholder="Name*" name='permanentState' onChange={handleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={personalInfo.permanentCountry} placeholder="Name*" name='permanentCountry' onChange={handleChange} />

                                                        </div>

                                                        <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Family Mobile</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={personalInfo.permanentmobile} placeholder="Number" name='permanentmobile' onChange={handleChange} />
                                                        </div>

                                                        <div className='form-group col-3'>
                                                            <label for="exampleInputUsername1">Email</label>
                                                            <input type="email" className="form-control" id="exampleInputUsername1" value={personalInfo.permanentemail} placeholder="Email" name='permanentemail' onChange={handleChange} />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-md-2 col-lg-2'>
                                            <div className='p-3'>
                                                <div>
                                                    <h4 className="card-title titleback">Student Image</h4>
                                                </div>

                                                <div className='student-img text-center'>
                                                    <img style={{ width: "150px" }} src={`${IMG_URL}/` + profilephoto} alt='' />
                                                </div>

                                            </div>

                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >

    )
}

export default PerssonalInfo
