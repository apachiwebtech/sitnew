import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const AddFacultySalary = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
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
        if (projectmasterid !== ":projectmasterid") {
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
    }



    return (

        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                    <h4 class="card-title">Add Faculty Salary</h4>
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">


                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Faculty Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <lable for="exampleFormControlSelect1">Months</lable>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.months} name='months' onChange={onhandleChange} >
                                                                <option>--Select Months--</option>

                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleFormControlSelect1">Year</lable>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect" value={value.year} name='year' onChange={onhandleChange}>
                                                                <option>--Select Year--</option>
                                                                <option>2024</option>

                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleFormControlSelect1">Faculty Name</lable>
                                                            <select class="form-control Form-control-lg" id="exampleFormControlSelect1" value={value.facultyname} name='facultyname' onChange={onhandleChange}>
                                                                <option>--Faculti Name--</option>
                                                                <option>A. G. Belwalkar</option>
                                                                <option>Aadhar Classes</option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Employee Type</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.employeetype} name='employeetype' onChange={onhandleChange} disabled />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Salary Structure</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.salarystructure} name='salarystructure' onChange={onhandleChange} disabled />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Charges</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.charges} name='charger' onChange={onhandleChange} disabled />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Lecture Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-12">
                                                            <label for="exampleTextarea1"></label>
                                                            <textarea class="form-control form-control-lg" id="exampleTextarea1"
                                                                value={value.lecturedetails} name='lecturedetails' onChange={onhandleChange} disabled></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Income Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-8">
                                                            <label for="exampleTextarea1"></label>
                                                            <textarea class="form-control form-control-lg" id="exampleTextarea1"
                                                                value={value.incomedetails} name='incomedetails' onChange={onhandleChange} disabled></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Income</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Totle Hours</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.totlehours} placeholder="Totle Hours" name='totlehours' onChange={onhandleChange} />

                                                        </div>

                                                        <div class='form-group col-lg-4'>
                                                            <label for="exampleInputUsername1">Best performance Awards</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.performance} placeholder="Best Performance Awards" name='performance' onChange={onhandleChange} />
                                                        </div>

                                                        <div class='form-group col-lg-4'>
                                                            <lable for="exampleTextarea1">Other If Any</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.otherifany} placeholder="Other If Any" name='otherifany' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4" >
                                                            <lable for="exampleInputUsername1">Bonus</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bonus} placeholder="Bonus" name='bonus' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Total Amount</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.totalamount} placeholder="Total Amount" name='totalamount' onChange={onhandleChange} />
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Deduction</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">TDS%</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.tds} placeholder='TDS%' name='tds' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Advance If Any</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.advanceif} placeholder='Advance' name='advanceif' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername">Other If Any</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.otherifany} placeholder='Other If Any' name='otherifany' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">TDS Amount</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.tdsamount} placeholder='TDS Amount' name='tdsamount' onChange={onhandleChange} />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Net Payment</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Total Income</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.totleincome} placeholder="Totle Income" name='totleincome' onChange={onhandleChange} />

                                                        </div>
                                                        <div className='form-group col-lg-4'>
                                                            <label for="exampleInputUsername1">Total Deduction</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.totlededuction} placeholder="Totle Deducation" name='totlededucation' onChange={onhandleChange} />
                                                        </div>

                                                        <div className='form-group col-lg-4'>
                                                            <lable for="exampleTextarea1">Net Payment</lable>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.netpayment} placeholder="Net Payment" name='netpayment' onChange={onhandleChange} />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Payment Details</h4>
                                                    </div>

                                                    <div className='row'>

                                                        <div class="form-group col-lg-6">
                                                            <lable for="exampleFormControlSelect1">Payment Type</lable>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.paymenttype} name='paymenttype' onChange={onhandleChange}>
                                                                <option>--Payment Type--</option>
                                                                <option>Cash</option>
                                                                <option>Cheque</option>
                                                                <option>NEFT</option>
                                                            </select>
                                                        </div>
                                                        <div className='form-group col-lg-6'>
                                                            <label for="exampleInputUsername1">Payment Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.paymentdate} placeholder="Payment Date" name='paymentdate' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-12">
                                                            <lable for="exampleTextarea1">Remark</lable>
                                                            <textarea class="form-control" id="exampleTeaxtarea1" value={value.remark} placeholder='Remark' name='remark' onChange={onhandleChange}></textarea>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Submit</button>
                                                <button className='col-2'>Close</button>
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

export default AddFacultySalary