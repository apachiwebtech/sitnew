import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import React, { useState } from 'react';
import InnerHeader from "./InnerHeader";
//import FormGroup from '@mui/material/FormGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));


const PaymentCollectionReport = () => {

    const [value, setValue] = useState([])
    const [vendordata, setStudent] = useState([])
    const [selectedYear, setselectedYear] = useState ('');

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2000; year <= currentYear; year++) {
        years.push(year);
    }



    const handleSubmit = (e) => {
        e.preventDefult()

        const data = {

        }
    }

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-warpper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">
                                        Payment Collection New
                                    </h4>
                                    <hr></hr>

                                    <form class="form-sample py-3" onSubmit={handleSubmit} >
                                        <div class="row">

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Select Criteria</lable>
                                                <select class="form-control" id="exampleFormControlSelect1"
                                                    value={value.criteria} name="criteria"
                                                    onChange={onhandleChange}>
                                                    <option>--Select Criteria--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Select Course</lable>
                                                <select class="form-control" id="exampleFormControlSelecet1"
                                                    value={value.course} name="course"
                                                    onChange={onhandleChange}>
                                                    <option>--Select Course--</option>
                                                </select>
                                            </div>

                                            <div className="form-group col-lg-3">
                                                <label htmlFor="yearInput">Year</label>
                                                <select
                                                    className="form-control"
                                                    id="yearInput"
                                                    value={selectedYear}
                                                    name="yearinput"
                                                    onChange={onhandleChange}
                                                >
                                                    <option value="">--Select Year--</option>
                                                    {years.map(year => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div class="fomr-group col-lg-3 py-4">
                                                <lable for="exampleInputUsername1"></lable>
                                                <input type="year" class="form-control" id="exampleInputUsername1" 
                                                value={value.year}
                                                name="year" onChange={onhandleChange} disabled />

                                            </div>

                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Print</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Back</button>
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

export default PaymentCollectionReport