import CloseIcon from "@mui/icons-material/Close";
import Checkbox from '@mui/material/Checkbox';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from "./InnerHeader";
import { batch } from "react-redux";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));


const LectureReport = () => {

    const [course, setCourse] = useState([])
    const [value, setValue] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [hide, setHide] = useState([])
    const [vendordata, setStudent] = useState([])




    const getbatch = async (id) => {
        const data = {
            course: id
        }

        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data);
        }catch (err) {
            console.error(":", err);
        }
    };


    const getstudentlisiting = (e) => {
        setHide(true)
        const data = {
            batch_code: ''
        }

        axios.post(`${BASE_URL}/getcoursewisebatch`, data)
        .then((res) => {
            setStudent(res.data)
        })
    }


    const handleSubmit = (e) => {
        e.preventDefult()

        const data = {

        }
    }

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value}))
    }

    return (

        <div class="container-fluid page-body-warpper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="car-body">
                                    <h4 class='card-title'>
                                        Leacture Search
                                    </h4>
                                    <hr></hr>

                                    <form class="form-sample py-3" onSubmit={handleSubmit} >
                                        <div class="row">
                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Course<span class="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.course}
                                                name="course" onChange={(e) => getbatch(e.target.value)}>
                                                    <option>--Select Course--</option>

                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Batch<span class="text-danger">*</span></lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.batch}
                                                name="batch" onChange={(e) => getstudentlisiting(e.target.value)}>
                                                    <option>--Select Batch--</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        )
                                                    })}

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Lecture</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.lecture}
                                                name="lecture" onChange={onhandleChange}>
                                                    <option>--Select Lecture--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Faculty</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.faculty}
                                                name="faculty" onChange={onhandleChange}>
                                                    <option>--Select Faculty--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Months</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.months}
                                                name="months" onChange={onhandleChange}>
                                                    <option>--Select Months--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleFormControlSelect1">Year</lable>
                                                <select class="form-control" id="exampleFormControlSelect1" value={value.year}
                                                name="year" onChange={onhandleChange}>
                                                    <option>--Select Year--</option>
                                                </select>
                                            </div>
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
export default LectureReport