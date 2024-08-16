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



const AddCollegeInfo = ({ open, setOpen }) => {


    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const [loading, setLoading] = useState(true)
    const [category, setCat] = useState(' ')
    const { collegeid } = useParams()
    const [selected, setSelected] = useState ([]);
    const [options, setOptions0] = useState ([]);

    const [value, setValue] = useState({
        date: "" || uid.date,
        contactperson: "" || uid.contactperson,
        designation: "" || uid.designation,
        purpose: "" || uid.purpose,
        directline: "" || uid.directline,
        email: "" || uid.email,
        nextdate: "" || uid.nextdate,
        remark: "" || uid.remark,
        note: "" || uid.note



    })

    useEffect(() => {
        setValue({

            date: uid.date,
            contactperson: uid.contactperson,
            designation: uid.designation,
            purpose: uid.purpose,
            directline: uid.directline,
            email: uid.email,
            nextdate: uid.nextdate,
            remark: uid.remark,
            note: uid.note,



        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.college) {
            isValid = false;
            newErrors.name = "Name is required"
        }
        if (!value.email) {
            isValid = false;
            newErrors.email = "University is required"
        }
        setError(newErrors)
        return isValid
    }


    const handleClose = () => {
        setOpen(false);
    };


    async function getCollegeData() {
        const data = {
            tablename: "awt_college"
        }
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCollegeData()
        value.title = ""
        setError({})
        setUid([])
    }, [])

    const handleClick = (id) => {
        setCid(id)
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };



    const handleUpdate = () => {
        const data = {
            u_id: collegeid,
            tablename: "awt_college"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // useEffect(() => {
    //     if (collegeid != ':collegeid')

    //         handleUpdate()

    // }, [collegeid])



    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                date: value.data,
                contactperson: value.contactperson,
                designation: value.designation,
                purpose: value.purpose,
                directline: value.directline,
                email: value.email,
                nextdate: value.nextdate,
                remark: value.remark,
                note: value.note,

            }


            axios.post(`${BASE_URL}/add_college`, data)
                .then((res) => {
                    console.log(res)
                    getCollegeData()

                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }


    // const handleCheckboxChange = (event) => {
    //     setIsChecked(event.target.cheched);
    // };

    const handleInputchenge = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value,
        });
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
                                                <lable for="exampleInputUsername1">Date</lable>
                                                <input type="date" class="form-control" id="exampleInputUasename1" value={value.date}
                                                    name='date' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Contact Person</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.contactperson}
                                                    placeholder="Contact Person" name='contactperson' onChange={onhashchange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Designation</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.designation} placeholder="Designation"
                                                    name='designation' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleFromControlSelect1">Purpose</lable>
                                                <select class="form-control" id="exampleFromControlSelect1" value={value.purpose}
                                                    name='purpose' onChange={onhandleChange}>
                                                    <option>--Select All--</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Mobile</lable>
                                                <input type="number" class="form-control" id="exampleInputUsername1" value={value.mobile}
                                                placeholder='Mobile Number' name='number' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Direct Line</lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.directline}
                                                    placeholder="Direct Line" name='directline' onChange={onhashchange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleInputUsername1">Email</lable>
                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email}
                                                    placeholder="Email" name='email' onChange={onhashchange} />
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <lable for="exampleFormControlSelect1">Disciplines</lable>
                                                <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy='Select All' name='selecteed' ></MultiSelect>
                                            </div>

                                            <div class="from-group col-lg-4">
                                            <FormControlLabel control={<Checkbox />} label="Next Date" />

                                                <lable for="exampleInputUsername1"></lable>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.nextdate}
                                                    name='nextdate' onChange={onhandleChange} disabled />

                                            </div>

                                            <div class="from-group col-lg-12">
                                                <lable for="exampleTextarea1">Remark</lable>
                                                <textarea class="form-control form-control-lg" id="exampleTextarea1" value={value.remark}
                                                    name='remark' onChange={onhandleChange} rows={`3`} ></textarea>
                                            </div>

                                            <div class="from-group col-lg-12">
                                                <lable for="exampleTextarea1">Note</lable>
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