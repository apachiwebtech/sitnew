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
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));



const AddCollegeInfo = ({ open, setOpen, collegeid, edit, add, getFollowData }) => {



    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const [descipline, setDescipline] = useState([])
    const [desciplinevalue, setDesciplinevalue] = useState()
    const [selected, setSelected] = useState([]);

    const [value, setValue] = useState({
        date: "" || uid.Tdate,
        contactperson: "" || uid.CName,
        designation: "" || uid.Designation,
        purpose: "" || uid.Purpose,
        directline: "" || uid.DirectLine,
        email: "" || uid.Email,
        nextdate: "" || uid.nextdate,
        remark: "" || uid.Remark,
        note: "" || uid.Note,
        mobile: "" || uid.Phone

    })

    useEffect(() => {

        setValue({

            date: uid.Tdate,
            contactperson: uid.CName,
            designation: uid.Designation,
            purpose: uid.Purpose,
            directline: uid.DirectLine,
            email: uid.Email,
            nextdate: uid.nextdate,
            remark: uid.Remark,
            note: uid.Note,
            mobile: uid.Phone


        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        const mobileRegex = /^[0-9]{10,14}$/;// Example: 10 digits, adjust as needed
        if (value.mobile && !mobileRegex.test(value.mobile)) {
            isValid = false;
            newErrors.mobile = "Mobile number is invalid"
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value.email && !emailRegex.test(value.email)) {
            isValid = false;
            newErrors.email = "Invalid email"
        }
        setError(newErrors)
        return isValid
    }


    const handleClose = () => {
        setOpen(false);
    };


    async function getfollowdetails() {

        const data = {
            followid: edit || add
        }

        axios.post(`${BASE_URL}/getfollowdetails`, data)
            .then((res) => {
                setUid(res.data[0])

                const ids = res.data[0].Discipline
                const idArray = ids.split(',').map(Number)

                const formattedArray = idArray.map((id, index) => ({ label: 'select' + (index + 1), value: id }));

                setSelected(formattedArray)
            })
    }


    async function fetdescipline() {

        axios.get(`${BASE_URL}/getDiscipline`)
            .then((res) => {
                setDescipline(
                    res.data.map(item => ({ label: item.Deciplin, value: item.Id }))
                );
            })
            .catch((err) => {
                console.log(err)
            })

    }

    useEffect(() => {
        fetdescipline()
        if (add || edit) {
            getfollowdetails()
        }

        value.title = ""
        setError({})
        setUid([])
    }, [add, edit])




    const handleselect = (value) => {

        setSelected(value)

        setDesciplinevalue(value.map((item) => item.value).join(','))

        console.log(value.map((item) => item.value))

    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                date: value.date,
                contactperson: value.contactperson,
                designation: value.designation,
                purpose: value.purpose,
                directline: value.directline,
                email: value.email,
                nextdate: value.nextdate,
                remark: value.remark,
                note: value.note,
                mobile: value.mobile,
                descipline: desciplinevalue,
                collegeid: collegeid,
                uid: edit
            }


            axios.post(`${BASE_URL}/add_college_follow`, data)
                .then((res) => {
                    alert("Form submitted")
                    setOpen(false)
                    setValue({
                        date: "",
                        contactperson: "",
                        designation: "" ,
                        purpose: "" ,
                        directline: "",
                        email: "",
                        nextdate: "" ,
                        remark: "" ,
                        note: "" ,
                        mobile: "" 

                    })
                    setUid([])
                    getFollowData()
                    setSelected([])

                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }



    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    return (


        <div class="container-fluid page-body-warpper col-lg-10" >

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth='lg'

            >
                <DialogTitle sx={{ m: 0, p: 2, width: "100%" }} id="customized-dialog-title">
                    Add College Info
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>

                    <div class="main-panel">
                        <div class="content-wrapper">


                            <div class="row">
                                <div class="col-lg-12 grid-margin stretch-card">
                                    <form class="form-sample py-3" onSubmit={handleSubmit}>
                                        <div class="row">
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Date</label>
                                                <input type="date" class="form-control" id="exampleInputUasename1" value={value.date}
                                                    name='date' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Contact Person</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.contactperson}
                                                    placeholder="Contact Person" name='contactperson' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Designation</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.designation} placeholder="Designation"
                                                    name='designation' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFromControlSelect1">Purpose</label>
                                                <select class="form-control" id="exampleFromControlSelect1" value={value.purpose}
                                                    name='purpose' onChange={onhandleChange}>
                                                    <option>select purpose</option>
                                                    <option value="0">Others</option>
                                                    <option value="Meeting">Meeting</option>
                                                    <option value="Placement">Placement</option>
                                                    <option value="Training">Training</option>
                                                    <option value="Placement">Placement</option>
                                                    <option value="Proposal">Proposal</option>
                                                    <option value="Others">Others</option>
                                                    <option value="Seminar">Seminar</option>
                                                    <option value="Project">Project</option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Mobile</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.mobile}
                                                    placeholder='Mobile Number' name='mobile' onChange={onhandleChange} />
                                                {error.mobile && <span className="text-danger">{error.mobile}</span>}
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Direct Line</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.directline}
                                                    placeholder="Direct Line" name='directline' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Email</label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email}
                                                    placeholder="Email" name='email' onChange={onhandleChange} />
                                                {error.email && <span className="text-danger">{error.email}</span>}
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Disciplines</label>
                                                <MultiSelect options={descipline} value={selected}
                                                    onChange={(value) => handleselect(value)}
                                                    labelledBy='Select All' name="selected" ></MultiSelect>
                                            </div>

                                            <div class="from-group col-lg-4">
                                                {/* <FormControlLabel control={<Checkbox />} label="Next Date" /> */}

                                                <label for="exampleInputUsername1">Next Date</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.nextdate}
                                                    name='nextdate' placeholder="Enter next date" onChange={onhandleChange}  />

                                            </div>

                                            <div class="from-group col-lg-12">
                                                <label for="exampleTextarea1">Remark</label>
                                                <textarea class="form-control form-control-lg" id="exampleTextarea1" value={value.remark}
                                                    name='remark' onChange={onhandleChange} rows={`3`} ></textarea>
                                            </div>

                                            <div class="from-group col-lg-12">
                                                <label for="exampleTextarea1">Note</label>
                                                <textarea class="form-control form-control-lg" id="exampleTextarea1" value={value.note}
                                                    name='note' onChange={onhandleChange} rows={`3`}></textarea>
                                            </div>

                                        </div>



                                        <button type="submit" class="btn btn-primary mr-2">Save Changes</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Close</button>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>

            </BootstrapDialog>



        </div>
    )
}
export default AddCollegeInfo