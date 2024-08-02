import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { useParams } from "react-router-dom";
//import FormControlLabel from '@mui/material/FormControlLabel';

const EmployeeTrainingPlan = () => {


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

    const { employeetrainingplanid } = useParams();
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [checked, setChecked] = React.useState([true, false]);

 


    const [value, setValue] = useState({
        subject: '',
        internal: '',
        identified: '',
        date: '',

    })



    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.subject) {
            isValid = false;
            newErrors.subject = "Subject is Required"
        }

        if(!value.internal) {
            isValid = false;
            newErrors.internal = "Internal/External is Required"
        }

        if(!value.identified){
            isValid = false;
            newErrors.identified = "Identified is Required"
        }

        setError(newErrors)
        return isValid
    }


    async function getStudentDetail() {

        const response = await fetch(`${BASE_URL}/update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: employeetrainingplanid,
                tablename :"awt_employeeplan"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
         
        setUid(data[0])

        setValue(prevState => ({
            ...prevState,
            subject: data[0].subject,
            internal: data[0].internal,
            identified: data[0].identified,
            date: data[0].date,
        }))
    }
    useEffect(() => {
        if (employeetrainingplanid !== ":employeetrainingplanid") {
            getStudentDetail()
        }

        value.title = ""
        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()
        let response


        if (validateForm()) {
            response = await fetch(`${BASE_URL}/add_employeetrainingplan`, {
                    method: 'POST',
                    body: JSON.stringify({
                        subject: value.subject,
                        internal: value.internal,
                        identified: value.identified,
                        date: value.date,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
      


        }
    }


    const onhandleChange = (e) => {
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
                                    <h4 class="card-title">Add Employee Training Plan</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Subject<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.subject} placeholder="Subject" name='subject' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.subject} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Internal/External By<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.internal} placeholder="Internal" name='internal' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.internal} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Identified By<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.identified} placeholder="Identified" name='identified' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.identified} </span>}
                                            </div>
                                            <div className="form-group col-lg-3">
                                                <label htmlFor="exampleInputUsername1">Date<span className="text-danger">*</span></label>
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


                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>

                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Back</button>





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

export default EmployeeTrainingPlan
