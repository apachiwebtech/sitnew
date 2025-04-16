import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { OndemandVideo, Padding } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';




const AddCashVoucher = () => {

    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [voucherno, setVouncherno] = useState([])
    const [account, setAccount] = useState([])
    const [project, setProject] = useState([])
    const [course, setCourse] = useState([])
    const [batch, setBatch] = useState([])
    const [courseid, setCourseid] = useState('')
    const { voucherid } = useParams()
    const [loader, setLoader] = useState(false)
    const rows = Array.from({ length: 8 });

    const [value, setValue] = useState({
        company: "",
        date: "",
        paidto: "",
        paidby: "",
        prepaired_by: "",
        approved_by: "",
        total: "",
        checked_by: "",
    })

    const [rowvalue, setrowValue] = useState({});



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

    const getcourse = () => {

        const data = {
            tablename: "Course_Mst",
            columnname: "Course_Id,Course_Name"
        }

        axios.post(`${BASE_URL}/get_new_data`, data)
            .then((res) => {
                console.log(res.data)
                setCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getBatch = async (id) => {
        setCourseid(id)
        const data = {
            courseid: id
        }


        if (id) {
            axios.post(`${BASE_URL}/getcoursewisebatch`, data)
                .then((res) => {
                    console.log(res.data)
                    setBatch(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            try {
                const res = await axios.get(`${BASE_URL}/getbatch`, data);

                setBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


    }


    async function getAccountHead(params) {

        const data = {
            tablename: "sit_account_head",
            columnname: "id,title"
        }


        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                setAccount(res.data)
            })

    }

    async function getProject(params) {

        const data = {
            tablename: "awt_projectmaster",
            columnname: "id,projectno"
        }


        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                setProject(res.data)
            })

    }


    async function getvoucherno(params) {
        axios.get(`${BASE_URL}/generatevoucherno`)
            .then((res) => {
                setVouncherno(res.data.voucherno)
            })
    }


    const handleUpdate = (id) => {
        const data = {
            u_id: voucherid,
            tablename: "awt_cashvoucher"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                setValue({
                    company: res.data[0].company,
                    date: res.data[0].date,
                    paidto: res.data[0].paidto,
                    paidby: res.data[0].paidby,
                    prepaired_by: res.data[0].prepaired_by,
                    approved_by: res.data[0].approved_by,
                    checked_by: res.data[0].checked_by,
                })

                setVouncherno(res.data[0].voucherno)

            })
            .catch((err) => {
                console.log(err)
            })
    }





    const updatechild = () => {

        const data = {
            u_id: voucherid,
            tablename: "awt_cashvoucherchild",
            uidname: "voucherid"
        }

        axios.post(`${BASE_URL}/new_update_data`, data)
            .then((res) => {
                const newdata = res.data
                const initialData = {};
                let totalAmount = 0;
                newdata.forEach((item, index) => {
                    const amount = parseFloat(item.amount) || 0;
                    totalAmount += amount;


                    initialData[`row${index + 1}`] = item.id; // For id
                    initialData[`bill${index + 1}`] = item.bill_no; // For bill
                    initialData[`date${index + 1}`] = item.date; // For date
                    initialData[`accounthead${index + 1}`] = item.account_head; // For account head
                    initialData[`ammount${index + 1}`] = item.amount; // For amount
                    initialData[`description${index + 1}`] = item.description; // For description
                    initialData[`project${index + 1}`] = item.project; // For project
                    initialData[`trainingprogramme${index + 1}`] = item.training_programee; // For training programme
                    initialData[`batchcode${index + 1}`] = item.batch_code; // For batch code
                    // Add grand total to the same state object
                    initialData.total = totalAmount;
                });
                setrowValue(initialData);

                setValue((prev) =>({
                    ...prev,
                    total : totalAmount
                }))



            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {

        if (voucherid != ":voucherid") {
            handleUpdate()
            updatechild()
        }

        getvoucherno()
        getAccountHead()
        getcourse()
        getProject()
        getBatch()
    }, [])

console.log(rowvalue , "DDD")
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoader(true)


        const data = {
            company: value.company,
            voucherno: voucherno,
            date: value.date,
            paidto: value.paidto,
            paidby: value.paidby,
            prepaired_by: value.prepaired_by,
            approved_by: value.approved_by,
            checked_by: value.checked_by,
            uid: uid.id
        }


        if (validateForm()) {
            await axios.post(`${BASE_URL}/add_cashvoucher`, data)
                .then((res) => {
                    alert('Data Submitted')

                    addrows(res.data.insertId || voucherid)

                    navigate('/cashvoucher')
                })
        }









    }

    async function addrows(rowid) {
        let totalAmount = 0;



        const formattedData = rows.map((_, index) => {

            const amount = parseFloat(rowvalue[`ammount${index + 1}`]) || 0;
            totalAmount += amount;


            return {
                bill: rowvalue[`bill${index + 1}`],
                date: rowvalue[`date${index + 1}`],
                accounthead: rowvalue[`accounthead${index + 1}`],
                ammount: rowvalue[`ammount${index + 1}`],
                description: rowvalue[`description${index + 1}`],
                project: rowvalue[`project${index + 1}`],
                trainingprogramme: rowvalue[`trainingprogramme${index + 1}`],
                batchcode: rowvalue[`batchcode${index + 1}`],
                uid: rowvalue[`row${index + 1}`],
                voucherid: rowid,
            };


        });



        await axios.post(`${BASE_URL}/add_cashvoucherchild`, { rows: formattedData, grandTotal: totalAmount })
            .then((res) => {
                alert("submitted")
                setLoader(false)
            })
    }











    const onhandleChange = (e) => {
        const { name, value: inputValue } = e.target;

        setrowValue(prevState => {
            // Update the changed field
            const updatedState = {
                ...prevState,
                [name]: inputValue,
            };

            // Recalculate totalAmount for all 'ammount' fields
            let total = 0;
            Object.keys(updatedState).forEach(key => {
                if (key.startsWith('ammount')) {
                    const val = parseFloat(updatedState[key]);
                    if (!isNaN(val)) total += val;
                }
            });

            // Add total to updated state if needed
            updatedState.totalAmount = total;

            return updatedState;
        });
    };


    const handlechange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }





    return (
        <div class="container-fluid page-body-wrapper">

            <InnerHeader />

            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <p>Total Amount: ₹{rowvalue.totalAmount || 0}</p>
                                    <h4 class="card-title">Add Cash Voucher Details</h4>
                                    <hr></hr>
                                    <form class="form-sample py-3" onSubmit={handleSubmit}>
                                        <div class="row">

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFromControlSelect1">Company</label>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.comapny} name='company' onChange={handlechange} >
                                                    <option value={`SUVIDYA`}>SUVIDYA</option>
                                                    <option value={`ACCENT`}>ACCENT</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Sr. No.</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={voucherno} onChange={handlechange} disabled />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Date<span className="text-danger">*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.date} name='date' onChange={handlechange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Paid To<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.paidto} name='paidto' onChange={handlechange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">	Opening Balance</label>
                                                <input type="text" class="form-control" id="exampleInputUsername" value={value.opening} name='opening' onChange={handlechange} disabled />
                                            </div>


                                            <table>
                                                <thead>
                                                    <th>Details</th>
                                                </thead>
                                                <hr></hr>
                                                <tbody>
                                                    <tr className='card-title'>
                                                        <td>Bill No</td>
                                                        <td>Date</td>
                                                        <td>Account Head</td>
                                                        <td>Amount</td>
                                                        <td>Desciption</td>
                                                        <td>Project</td>
                                                        <td>Training Programme</td>
                                                        <td>Batch Code</td>
                                                    </tr>
                                                    {rows.map((_, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <label htmlFor={`bill${index + 1}`}></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id={`bill${index + 1}`}
                                                                    value={rowvalue[`bill${index + 1}`] || ''}
                                                                    placeholder="BillNo."
                                                                    name={`bill${index + 1}`}
                                                                    onChange={onhandleChange}
                                                                />
                                                            </td>

                                                            <td>
                                                                <label htmlFor={`date${index + 1}`}></label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    id={`date${index + 1}`}
                                                                    value={rowvalue[`date${index + 1}`] || ''}
                                                                    name={`date${index + 1}`}
                                                                    onChange={onhandleChange}
                                                                />
                                                            </td>

                                                            <td>
                                                                <label htmlFor={`accounthead${index + 1}`}></label>
                                                                <select
                                                                    className="form-control"
                                                                    id={`accounthead${index + 1}`}
                                                                    value={rowvalue[`accounthead${index + 1}`] || ''}
                                                                    name={`accounthead${index + 1}`}
                                                                    onChange={onhandleChange}
                                                                >
                                                                    <option>Select</option>
                                                                    {account.map((item) => {
                                                                        return (
                                                                            <option value={item.title}>{item.title}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </td>

                                                            <td>
                                                                <label htmlFor={`ammount${index + 1}`}></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id={`ammount${index + 1}`}
                                                                    value={rowvalue[`ammount${index + 1}`] || ''}
                                                                    placeholder="Amount"
                                                                    name={`ammount${index + 1}`}
                                                                    onChange={onhandleChange}
                                                                />
                                                            </td>

                                                            <td>
                                                                <label htmlFor={`description${index + 1}`}></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id={`description${index + 1}`}
                                                                    value={rowvalue[`description${index + 1}`] || ''}
                                                                    placeholder="Description"
                                                                    name={`description${index + 1}`}
                                                                    onChange={onhandleChange}
                                                                />
                                                            </td>

                                                            <td>
                                                                <label htmlFor={`project${index + 1}`}></label>
                                                                <select
                                                                    className="form-control"
                                                                    id={`project${index + 1}`}
                                                                    value={rowvalue[`project${index + 1}`] || ''}
                                                                    name={`project${index + 1}`}
                                                                    onChange={onhandleChange}
                                                                >
                                                                    <option>Select Project</option>
                                                                    {project.map((item) => {
                                                                        return (

                                                                            <option value={item.id}>{item.projectno}</option>
                                                                        )
                                                                    })}

                                                                </select>
                                                            </td>

                                                            <td>
                                                                <label htmlFor={`trainingprogramme${index + 1}`}></label>
                                                                <select
                                                                    className="form-control"
                                                                    id={`trainingprogramme${index + 1}`}
                                                                    value={rowvalue[`trainingprogramme${index + 1}`] || ''}
                                                                    name={`trainingprogramme${index + 1}`}
                                                                    onChange={onhandleChange}
                                                                >
                                                                    <option>Select</option>
                                                                    {course.map((item) => {
                                                                        return (
                                                                            <option value={item.Course_Name}>{item.Course_Name}</option>

                                                                        )
                                                                    })}

                                                                </select>
                                                            </td>

                                                            <td>
                                                                <label htmlFor={`batchcode${index + 1}`}></label>
                                                                <select
                                                                    className="form-control"
                                                                    id={`batchcode${index + 1}`}
                                                                    value={rowvalue[`batchcode${index + 1}`] || ''}
                                                                    name={`batchcode${index + 1}`}
                                                                    onChange={onhandleChange}
                                                                >
                                                                    <option>Select</option>
                                                                    {batch.map((item) => {
                                                                        return (
                                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    ))}


                                                </tbody>
                                            </table>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Paid By</label>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.paidby}
                                                    name='paidby' onChange={handlechange} >
                                                    <option>--Select Paid By--</option>
                                                    <option value={`Cash`}>Cash</option>
                                                    <option value={`Cheque`}>Cheque</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Prepaired By</label>
                                                <input type="text" class="form-control" id="exapmleInputUsername1" value={value.prepaired_by}
                                                    placeholder='Prepaired By' name='prepaired_by' onChange={handlechange} />
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Approved By</label>
                                                <input type="text" class="form-control" id="exampleInputUsername" value={value.approved_by}
                                                    placeholder='Approved By' name='approved_by' onChange={handlechange} />
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for-="exampleInputUsername1">Total</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={rowvalue.totalAmount || value.total}
                                                    placeholder="0" name='total' onChange={handlechange} disabled />
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Checked By</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.checked_by}
                                                    placeholder="Checked By" name='checked_by' onChange={handlechange} />
                                            </div>
                                        </div>

                                        <div className=' row p-2 gap-2'>
                                            <button className='mr-2 btn btn-primary' type='submit' onSubmit={handleSubmit}>{loader ? "Processing.." : "Save Change"}</button>
                                            <button className='mr-2 btn btn-primary'>Close</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCashVoucher