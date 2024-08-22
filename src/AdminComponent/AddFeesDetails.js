import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const AddFeesDetails = () => {


    const [date, setDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = currentDate.getDate();
        day = day < 10 ? '0' + day : day;
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    }, []);





    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const { addfeesdetailsid } = useParams();
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({

        studentname: '',
        studentid: '',
        coursename: '',
        batchcode: '',
        contactno: '',
        emailaddress: '',
        type: '',
        generatereceipt: '',
        materialissued: '',
        paymenttype: '',
        bank: '',
        chequeddno: '',
        chequedate: '',
        branch: '',
        amount: '',
        particular: '',
        deudate: ''

    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        // if (!value.facultyname) {
        //     isValid = false;
        //     newErrors.name = "Name is require"
        // }

        setError(newErrors)
        return isValid
    }




    useEffect(() => {

        value.title = ""
        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        // if(validateForm()){
        if (addfeesdetailsid == ":addfeesdetailsid") {
            response = await fetch(`${BASE_URL}/add_addfeesdetails`, {
                method: 'POST',
                body: JSON.stringify({
                    studentname: value.studentname,
                    studentid: value.studentid,
                    coursename: value.coursename,
                    batchcode: value.batchcode,
                    contactno: value.contactno,
                    emailaddress: value.emailaddress,
                    type: value.type,
                    generatereceipt: value.generatereceipt,
                    materialissued: value.materialissued,
                    paymenttype: value.paymenttype,
                    bank: value.bank,
                    chequeddno: value.chequeddno,
                    chequedate: value.chequedate,
                    branch: value.branch,
                    amount: value.amount,
                    particular: value.particular,
                    deudate: value.deudate,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updateaddfeesdetails`, {
                method: 'POST',
                body: JSON.stringify({

                    studentname: value.studentname,
                    studentid: value.studentid,
                    coursename: value.coursename,
                    batchcode: value.batchcode,
                    contactno: value.contactno,
                    emailaddress: value.emailaddress,
                    type: value.type,
                    generatereceipt: value.generatereceipt,
                    materialissued: value.materialissued,
                    paymenttype: value.paymenttype,
                    bank: value.bank,
                    chequeddno: value.chequeddno,
                    chequedate: value.chequedate,
                    branch: value.branch,
                    amount: value.amount,
                    particular: value.particular,
                    deudate: value.deudate,

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

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-12 col-lg-12'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h3>Add Fees Details</h3>
                                                    </div><hr></hr>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Student Name</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.studentname} placeholder='Student Name' name='studentname' onChange={onhandleChange} />
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Student Id</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername" value={value.studentid} placeholder='Student Id' name='studentid' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Course Name</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.coursename} name='coursename' onChange={onhandleChange} disabled>
                                                                <option>----Select Course Name----</option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable class="exapmleInputUsername1">Batch Code</lable>
                                                            <select className="form-control form-control-lg" id="exampleInputUsername1" value={value.batchcode} name='batchcode' onChange={onhandleChange} disabled>
                                                                <option>---Select Batch Code---</option>
                                                            </select>

                                                        </div>
                                                        <div className='form-group col-2'>
                                                            <label for="exampleInputUsername1">Contact No.</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.contactno} placeholder="Contact No." name='contactno' onChange={onhandleChange} disabled />
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Email Address</lable>
                                                            <input type="email" class="form-control" id="exampleInputUsername1" value={value.emailaddress} placeholder="Emial Address" name='emailaddress' onChange={onhandleChange} disabled />
                                                        </div>
                                                        <div class="form-group col-lg-2">
                                                            <lable class="exampleInputUsername1">Type</lable>
                                                            <select className="form-control form-control-lg" id="exampleInputUsername1" value={value.type} name='type' onChange={onhandleChange}>
                                                                <option>Credit</option>
                                                                <option>Debit</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Generate Receipt</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.generatereceipt} name='generatereceipt' onChange={onhandleChange} disabled />

                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Material Issued</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.materialissued} name='materialissued' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Payment Type</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.paymenttype} name='paymenttype' onChange={onhandleChange} >
                                                                <option>---Select Payment Type---</option>
                                                                <option>Cash</option>
                                                                <option>Cash - SIT</option>
                                                                <option>Cash Direct Deposit</option>
                                                                <option>NEFT</option>
                                                                <option>Cheque/DD</option>
                                                                <option>P.D.C</option>
                                                                <option>Wire Trf</option>
                                                                <optioin>Card Payment</optioin>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Bank</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.bank} name='bank' onChange={onhandleChange} >
                                                                <option>Select Bank Name</option>
                                                                <option>0028FIR1101138</option>
                                                                <option>11336825293</option>


                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Cheque/D.D.No.</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.chequeddno} placeholder='Cheque/D.D.No.' name='chequeddno' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Cheque Date</lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.chequedate} name='chequedate' onChange={onhandleChange} />
                                                        </div>
                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Branch</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.branch} placeholder='Branch' name='branch' onChange={onhandleChange} />
                                                        </div>
                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Amount:(Rs.)</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.amount} placeholder='Amount:(Rs.)' name='amount' onChange={onhandleChange} />
                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Particular</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.particular} name='particular' onChange={onhandleChange} >
                                                                <option>Select Particular Type</option>
                                                                <option>Cheque Bounce</option>
                                                                <option>Cheque Bounce Charges</option>
                                                               
                                                            </select>
                                                        </div>


                                                        <div className="form-group col-lg-2">
                                                            <label htmlFor="exampleInputUsername1">Receipt Date</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="exampleInputUsername1"
                                                                value={date}
                                                                name="date"
                                                                onChange={(e) => { }}
                                                                disabled
                                                            />
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Deu Date</lable>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.deudate} name='duedate' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-6">
                                                            <FormControl>Tax Type
                                                                <RadioGroup
                                                                    row
                                                                                                                                   aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="row-radio-buttons-group"  >
                                                                    <FormControlLabel value="0116" control={<Radio />} label="CGST" />
                                                                    <FormControlLabel value="0117" control={<Radio />} label="SGST" />
                                                                    <FormControlLabel value="0118" control={<Radio />} label="IGST" />

                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>

                                                    </div><hr></hr>
                                                    <div>
                                                        <h2>Student Account Details</h2>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-12 col-lg-12'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h3>Balance Details</h3>
                                                    </div><hr></hr>
                                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                                        <div className='row'>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleInputUsername1">Debit</lable>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.debit} name='debit' onChange={onhandleChange} disabled />
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleInputUsername1">Credit</lable>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.credit} name='credit' onChange={onhandleChange} disabled />
                                                            </div>
                                                            <div class="form-group col-lg-4">
                                                                <lable for="exampleInputUsername1">Balance</lable>
                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.balance} name='balance' onChange={onhandleChange} disabled />
                                                            </div>
                                                        </div>

                                                        


                                                        <button type="submit" class="btn btn-primary mr-2">Generate Invoice</button>
                                                        <button type="submit" class="btn btn-primary mr-2">Save</button>
                                                        <button typr="submit" class="btn btn-primary mr-2">Print Tax Receipt</button>
                                                        <button type="submit" class="btn btn-primary mr-2">Print Receipt</button>
                                                        <button type="submit" class="btn btn-primary mr-2">Invoice</button>


                                                        <button type='button' onClick={() => {
                                                            window.location.reload()
                                                        }} class="btn btn-light">Close</button>
                                                    </form>

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

export default AddFeesDetails