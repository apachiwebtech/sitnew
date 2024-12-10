import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import BatchEdit from './BatchEdit';


const FeesStructure = () => {

    const [error, setError] = useState({})
    const [uid, setUid] = useState([])

    const { batchid } = useParams()


    const [value, setValue] = useState({
        basicinr: "" || uid.INR_Basic,
        sevicetaxinr: "" || uid.INR_ServiceTax,
        totalinr: "" || uid.INR_Total,
        basicdoller: "" || uid.Dollar_Basic,
        sevicetaxdoller: "" || uid.Dollar_ServiceTax,
        totaldoller: "" || uid.Dollar_Total,
        actualfees: "" || uid.Actual_Fees_Payment,
        fullfees: "" || uid.Fees_Full_Payment,
        installment: "" || uid.Fees_Installment_Payment,
        duedate: "" || uid.duedate,
        pmode: "" || uid.paymode,
        beforedate: "" || uid.bdateamt,
        afterdate: "" || uid.adateamt,
    })

    useEffect(() => {
        setValue({
            basicinr: uid.INR_Basic,
            sevicetaxinr: uid.INR_ServiceTax,
            totalinr: uid.INR_Total,
            basicdoller: uid.Dollar_Basic,
            sevicetaxdoller: uid.Dollar_ServiceTax,
            totaldoller: uid.Dollar_Total,
            actualfees: uid.Actual_Fees_Payment,
            fullfees: uid.Fees_Full_Payment,
            installment: uid.Fees_Installment_Payment,
            duedate: uid.duedate,
            pmode: uid.paymode,
            beforedate: uid.bdateamt,
            afterdate: uid.adateamt,
        })
    }, [uid])




    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.fullfees) {
            isValid = false;
            newErrors.fullfees = "This feild is required"
        }
        if (!value.installment) {
            isValid = false;
            newErrors.installment = "This feild is required"
        }



        setError(newErrors)
        return isValid
    }




    console.log(batchid)


    async function getupdatedata() {

        const data = {
            u_id: batchid,
            uidname: "Batch_Id",
            tablename: "Batch_Mst"
        }
        axios.post(`${BASE_URL}/new_update_data`, data)
            .then((res) => {

                if (res.data[0].Batch_Id) {

                    setUid(res.data[0])
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }





    useEffect(() => {
        if (batchid !== ':batch_id') {
            getupdatedata()
        }
    }, [])




    const handleFeesSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                basicinr: value.basicinr,
                sevicetaxinr: value.sevicetaxinr,
                totalinr: value.basicinr,
                basicdoller: value.basicdoller,
                sevicetaxdoller: value.sevicetaxdoller,
                totaldoller: value.totaldoller,
                actualfees: value.actualfees,
                fullfees: value.fullfees,
                installment: value.installment,
                batchid: batchid,
            }


            axios.post(`${BASE_URL}/Update_Batch_Fees`, data)

                .then((res) => {
                    console.log(res)
                    alert("Date Submitted successfully")

                })
                .catch((err) => {
                    console.log(err)
                    alert("Something is wrong")
                })
        }





    }

    const handlesubmit = (e) => {

        e.preventDefault()

        if (validateForm()) {
            const data = {
                duedate: value.duedate,
                pmode: value.pmode,
                beforedate: value.beforedate,
                afterdate: value.afterdate,
                uid: batchid,
            }


            axios.post(`${BASE_URL}/Update_fees_structure`, data)

                .then((res) => {
                    console.log(res)
                    alert("Date Submitted successfully")

                })
                .catch((err) => {
                    console.log(err)
                    alert("Something is wrong")
                })
        }
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }








    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <BatchEdit batchid={batchid} />
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Fees Structure</h5>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleFeesSubmit}>

                                        <div className=''>


                                            <div className='row'>
                                                <h5 className='col-lg-3'>Fees Details in INR</h5>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Basic</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.basicinr} placeholder="Enter Amount" name='basicinr' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Service Tax</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.sevicetaxinr} placeholder="Enter Amount" name='sevicetaxinr' onChange={onhandleChange} disabled />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Total</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.totalinr} placeholder="Enter Amount" name='totalinr' onChange={onhandleChange} disabled />

                                                </div>
                                            </div>

                                        </div>

                                        <hr />

                                        <div className=''>


                                            <div className='row'>
                                                <h5 className='col-lg-3'>Fees Details in $</h5>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Basic</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.basicdoller} placeholder="Enter Amount" name='basicdoller' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Service Tax</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.sevicetaxdoller} placeholder="Enter Amount" name='sevicetaxdoller' onChange={onhandleChange} disabled />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Total</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.totaldoller} placeholder="Enter Amount" name='totaldoller' onChange={onhandleChange} disabled />

                                                </div>
                                            </div>

                                        </div>

                                        <hr />

                                        <div className=''>


                                            <div className='row'>
                                                <h5 className='col-lg-3'>Payment Details</h5>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Actual Fees Payment</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.actualfees} placeholder="Enter Amount" name='actualfees' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Full Fees Payment<span className='text-danger'>*</span></label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.fullfees} placeholder="Enter Amount" name='fullfees' onChange={onhandleChange} />
                                                    {<span className='text-danger'>{error.fullfees}</span>}
                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Installment Payment<span className='text-danger'>*</span></label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.installment} placeholder="Enter Amount" name='installment' onChange={onhandleChange} />
                                                    {<span className='text-danger'>{error.installment}</span>}
                                                </div>
                                            </div>

                                        </div>
                                        <div className='text-right'>

                                            <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Cancel</button>
                                        </div>


                                    </form>
                                    <hr />

                                    <form onSubmit={handlesubmit}>
                                        <div className=''>

                                            <h5>Installment Structure</h5>

                                            <div className='row'>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Due Date</label>
                                                    <input type="date" class="form-control" id="exampleInputUsername1" value={value.duedate} placeholder="Enter.." name='duedate' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Payment Mode</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.pmode} placeholder="Enter.." name='pmode' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">Before Date Amt</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.beforedate} placeholder="Enter.." name='beforedate' onChange={onhandleChange} />

                                                </div>
                                                <div class="form-group col-lg-3">
                                                    <label for="exampleInputUsername1">After Date Amt</label>
                                                    <input type="text" class="form-control" id="exampleInputUsername1" value={value.afterdate} placeholder="Enter.." name='afterdate' onChange={onhandleChange} />

                                                </div>
                                            </div>

                                        </div>

                                        <div className='text-right'>
                                            <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Cancel</button>
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

export default FeesStructure;