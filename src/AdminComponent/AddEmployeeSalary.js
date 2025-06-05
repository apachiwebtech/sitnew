import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const AddEmployeeSalary = () => {

    const [uid, setUid] = useState([])
    const [error, setError] = useState({})

    const { projectmasterid } = useParams();
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({
        projectno: '',
        projectname: '',
        description: '',
        dworkorderob: '',
        wodate: '',
        woamount: '',
        quotation: '',
        qtndate: '',
        qtnamount: '',
        invoice: '',
        invoicedate: '',
        invoiceamount: '',
    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.facultyname) {
            isValid = false;
            newErrors.name = "Name is require"
        }

        setError(newErrors)
        return isValid
    }


    const getInquiryData = async () => {
        const response = await fetch(`${BASE_URL}/getadmissionactivity`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setInquiryData(data);
    }

    const getDiscipline = async () => {
        const response = await fetch(`${BASE_URL}/getDiscipline`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setDescipline(data);
    }
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
    const getEducation = async () => {
        const response = await fetch(`${BASE_URL}/getEducation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setEducation(data);
    }
    const getBatch = async () => {
        const response = await fetch(`${BASE_URL}/getBtach`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setBatch(data);
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

    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: projectmasterid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        console.log(data, "DATA A GAYA!");


    }
    useEffect(() => {
        if (':addemployeesalaryid' !== ":addemployeesalaryid") {
            getStudentDetail()
        }
        value.title = ""
        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        // if(validateForm()){
        if (projectmasterid == ":projectmasterid") {
            response = await fetch(`${BASE_URL}/add_projectmaster`, {
                method: 'POST',
                body: JSON.stringify({
                    projectno: value.projectno,
                    projectname: value.firstname,
                    description: value.gender,
                    dworkorderob: value.dob,
                    wodate: value.mobile,
                    woamount: value.woamount,
                    quotation: value.quotation,
                    qtndate: value.qtndate,
                    qtnamount: value.qtnamount,
                    invoice: value.invoice,
                    invoicedate: value.invoicedate,
                    invoiceamount: value.invoiceamount,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updateInquiry`, {
                method: 'POST',
                body: JSON.stringify({

                    projectno: value.projectno,
                    projectname: value.firstname,
                    description: value.gender,
                    dworkorderob: value.dob,
                    wodate: value.mobile,
                    woamount: value.woamount,
                    quotation: value.quotation,
                    qtndate: value.qtndate,
                    qtnamount: value.qtnamount,
                    invoice: value.invoice,
                    invoicedate: value.invoicedate,
                    invoiceamount: value.invoiceamount,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }





        const data = await response.json();

        alert(data.message)
        //   window.location.pathname = '/inquirylisting'


        // }        
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(setValue)
    }
// useEffect(() => {
//     console.log(value)
// }, [value])



    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                    <h4 class="card-title">Add Employee Salary Details</h4>
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">


                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Employee Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <lable for="exampleFormControlSelect1">Months</lable>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.months} name='months' onChange={onhandleChange} >
                                                                <option>--Select Months--</option>
                                                                <option>January</option>
                                                                <option>February</option>
                                                                <option>March</option>
                                                                <option>May</option>
                                                                <option>June</option>
                                                                <option>July</option>
                                                                <option>August</option>
                                                                <option>September</option>
                                                                <option>October</option>
                                                                <option>November</option>
                                                                <option>December</option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleFormControlSelect1">Year</lable>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect" value={value.year} name='year' onChange={onhandleChange}>
                                                                <option>--Select Year--</option>
                                                                <option>2024</option>
                                                                <option>2023</option>
                                                                <option>2022</option>
                                                                <option>2021</option>
                                                                <option>2020</option>
                                                                <option>2019</option>
                                                                <option>2018</option>
                                                                <option>2017</option>
                                                                <option>2016</option>
                                                                <option>2015</option>
                                                                <option>2014</option>
                                                                <option>2013</option>
                                                                <option>2012</option>
                                                                <option>2011</option>
                                                                <option>2010</option>
                                                                <option>2009</option>
                                                                <option>2008</option>
                                                                <option>2007</option>
                                                                <option>2006</option>
                                                                <option>2005</option>
                                                                <option>2004</option>
                                                                <option>2003</option>
                                                                <option>2002</option>
                                                                <option>2001</option>
                                                                <option>2000</option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleFormControlSelect1">Company</lable>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.company} name='company' onChange={onhandleChange}>
                                                                <option>--Select--</option>
                                                                <option>SIT</option>
                                                                <option>Accent</option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleFormControlSelect1">Name</lable>
                                                            <select class="form-control Form-control-lg" id="exampleFormControlSelect1" value={value.facultyname} name='facultyname' onChange={onhandleChange}>
                                                                <option>--Name of Employee--</option>
                                                                <option>A. G. Belwalkar</option>
                                                                <option>Aadhar Classes</option>
                                                                <option>Aashay Dedhia</option>
                                                                <option>Abhay Gaikar</option>
                                                                <option>Abhijit A Kulkarni.</option>
                                                                <option>Abhijit Tapare</option>
                                                                <option>Abhilash Srinivasan</option>
                                                                <option>Abhishek Pednekar</option>
                                                                <option>Abhishek Rakesh Gupta</option>
                                                                <option>Abhishek Vyas</option>
                                                                <option>ABIDHUSAIN RIZVI</option>
                                                                <option>Abrar</option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Total WH</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername" value={value.totalwh} placeholder="0.00" name='totalwh' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Desig</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.desig} name='desig' onChange={onhandleChange} disabled />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">	D.O.J.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.doj} name='doj' onChange={onhandleChange} disabled />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">PF No.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.pfno} name='pfno' onChange={onhandleChange} disabled />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">D.O.B</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.dob} name='dob' onChange={onhashchange} disabled />
                                                        </div>

                                                         <div class="form-group col-lg-4">
                                                           <lable for="exampleInputUsername1" >Company</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.company} name='company' onChange={onhandleChange} disabled />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">	Salary Type</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.salarytype} name='salarytype' onChange={onhandleChange} disabled />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Hours Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Std. Working Hrs (a) </label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.stdworking} placeholder="Std. Working" name='stdworkikn' onChange={onhandleChange} />

                                                        </div>

                                                        <div class='form-group col-lg-3'>
                                                            <label for="exampleInputUsername1">Std. WH Rate</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.stdwhrate} placeholder="Std. WH Rtae" name='stdwhrate' onChange={onhandleChange} />
                                                        </div>

                                                        <div class='form-group col-lg-3'>
                                                            <lable for="exampleTextarea1">OT Hrs (b)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.othrs} placeholder="OT Hrs" name='othrs' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3" >
                                                            <lable for="exampleInputUsername1">OT Rate</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.otrate} placeholder="OT Rate" name='otrate' onChange={onhandleChange} />
                                                        </div>


                                                    </div>


                                                </div>
                                            </div>

                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Salary Details</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Basic Salary</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.basicsalary} placeholder='Basic Salry' name='basicsalary' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">H.R.A.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.hra} placeholder='H.R.A' name='hra' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername">Conveyance</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.conveyance} placeholder='Conveyance' name='conveyance' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Call Allowance</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.callallowance} placeholder='Call Allowance' name='callallowance' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Others</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.other} placeholder='Other' name='other' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Total</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.total} placeholder='Total' name='total' onChange={onhandleChange} />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row justity-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Working Hours and other Charges</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <di class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Std Sal (A)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername" value={value.stdsal} name='stdsal' onChange={onhandleChange} disabled />
                                                        </di>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">OT Sal (B)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.otsal} name='otsal' onChange={onhandleChange} disabled />
                                                        </div>

                                                        <div class="form=group col-lg-3">
                                                            <lable for="exampleInputUsername1">Total WH (a+b)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.totalwh} name='totalwh' onChange={onhandleChange} disabled />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Total Amt (A+B)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.totalatm} name='totalatm' onChange={onhandleChange} disabled />
                                                        </div>
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Serv. Chrg(%)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.servchrg} name='servchrg' onChange={onhandleChange} disabled />
                                                        </div>
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Amount (C)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.amountc} name='amountc' onChange={onhandleChange} disabled />
                                                        </div>
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Emp. Contri.(%)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.empcontri} name='empcontri' onChange={onhandleChange} disabled />
                                                        </div>
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Amount (D)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.amountd} name='amoountd' onChange={onhandleChange} disabled />
                                                        </div>
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Gross [(A+B)-C-D]</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.gross} name='gross' onChange={onhandleChange} disabled />
                                                        </div>
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Basic</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.basic} name='basic' onChange={onhandleChange} disabled />
                                                        </div>
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">DA</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.da} name='da' onChange={onhandleChange} disabled />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Submit</button>
                                                <button className='col-2'>Close</button>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">EARNINGS</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-3 ">
                                                            <label for="exampleInputUsername1">Basic</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.basic1} name='basic1' onChange={onhandleChange} />

                                                        </div>
                                                        <div class='form-group col-lg-3'>
                                                            <label for="exampleInputUsername1"> DA</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.DA1} name='DA1' onChange={onhandleChange} />
                                                        </div>

                                                        <div class='form-group col-lg-3'>
                                                            <lable for="exampleTextarea1">H.R.A.</lable>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.hra} name='hra' onChange={onhandleChange} />
                                                        </div>

                                                        <div class='form-group col-lg-3'>
                                                            <lable for="exampleTextarea1">Conveyance</lable>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.conveyance1} name='conveyance1' onChange={onhandleChange} />
                                                        </div>

                                                        <div class='form-group col-lg-3'>
                                                            <lable for="exampleTextarea1">Call Allowance</lable>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.callallowance1} name='callallowance1' onChange={onhandleChange} />
                                                        </div>

                                                        <div class='form-group col-lg-3'>
                                                            <lable for="exampleTextarea1">Others</lable>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.other1} name='other1' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3 card-title">
                                                            <lable for="exampleInputUsername1">Sub Total</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.suntotal} name='subtotal' onChange={onhandleChange} />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">OTHERS</h4>
                                                    </div>

                                                    <div className='row'>

                                                        <div className='form-group col-lg-3'>
                                                            <label for="exampleInputUsername1">O.T. (Hr)</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.othr} name='othr' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exqmpleInputUsername1">W.O. (Hr)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.wohr} name='wohr' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">H.W. (Hrs.)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.hwhrs} name='hwhrs' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Travelling Alw.</lable>
                                                            <input type="text" class="form-control" id="exapmleInputUsername1" value={value.travelling} name='travelling' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Amount</lable>
                                                            <input type="text" class="form-control" id="exapmleInputUsername1" value={value.amount} name='amount' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Amount</lable>
                                                            <input type="text" class="form-control" id="exapmleInputUsername1" value={value.amount1} name='amount1' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Amount</lable>
                                                            <input type="text" class="form-control" id="exapmleInputUsername1" value={value.amount2} name='amount2' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Amount</lable>
                                                            <input type="text" class="form-control" id="exapmleInputUsername1" value={value.amount3} name='amount3' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Leave E.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.leave} name='leave' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exapmleInputUsername1">B.P. Award</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bpaward} name='bpaward' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Bonus</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bonus} name='bonus' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3 card-title">
                                                            <lable for="exampleInputUsername1">Gross</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.gross} name='gross' onChange={onhandleChange} />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className='row justify-contect-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 class="card-title titleback">Deductions(INR)</h4>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Prov. Fund</lable>
                                                            <input type="text" class="form-control" id="exapmleInputUsername" value={value.profund} name='profund' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Income Tax</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.incometax} name='incometax' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Prof. Tax</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.proftax} name='proftax' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">TDS Per</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.tdsper} name='tdsper' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">TDS Amt</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.tdsamt} name='tdsamt' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">E.S.I.C.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.esic} name='esic' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Advance</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.advance} name='advance' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Loan</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.loan} name='loan' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Other Tax</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.othertax} name='othertax' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Absent Amt.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.absentamt} name='absentamt' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3 card-title">
                                                            <lable for="exampleINputUsername1">Deduction</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.deduction} name='deduction' onChange={onhandleChange} />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 class="card-title titleback">Net Salary</h4>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-lg-6">
                                                            <lable for="exampleInputUsername1">Net Salary</lable>
                                                            <input type="text" class="form-control" id='exampleInputUsername1' value={value.netsalary} name='netsalary' onChange={onhandleChange} disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 class='card-title titleback'>Payment Details</h4>
                                                    </div>
                                                    <div class="row">

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleFormControlSelect1">Payment Type</lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.paymenttype} name='paymenttype' onChange={onhandleChange}>
                                                                <option>--Payment Type--</option>
                                                                <option>Cash</option>
                                                                <option>Cheque</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">	Payment Date</lable>
                                                            <input type="date" class="form-control" id="exapmleInputUsername" value={value.paymentdate} name='paymentdate' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">Cheque No.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.chequeno} name='chequeno' onChange={onhandleChange}  />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername1">	Bal. Loan Amt.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.balloanamt} name='balloanamt' onChange={onhandleChange}  />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{width: "100%"}}>
                                                    <div>
                                                        <h4 class="card-title titleback">Total</h4>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername">T. Gross</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername" value={value.tgross} name='tgross' onChange={onhandleChange}  />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername">T.P.F.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername" value={value.tpf} name='tpf' onChange={onhandleChange}  />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername">T.P.T.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername" value={value.tpt} name='tpt' onChange={onhandleChange}  />
                                                        </div>

                                                        <div class="form-group col-lg-3">
                                                            <lable for="exampleInputUsername">T.Net</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername" value={value.tnet} name='tnet' onChange={onhandleChange}  />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >

    )
}

export default AddEmployeeSalary