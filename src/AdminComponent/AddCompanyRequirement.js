import FormControlLabel from "@mui/material/FormControlLabel";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import { MultiSelect } from "react-multi-select-component";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddCompanyRequirement = () => {
    const [batchData, setBatchData] = useState([]);
    const [company, StudentCompany] = useState([]);
    const [selected, setSelected] = useState([]);

    const [error, setError] = useState({});
    const { companyrequirmentid } = useParams();

    const [coursedata, setCourseData] = useState([]);

    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        CompanyId: "",
        CourseId: "",
        Profile: "",
        Location: "",
        Eligibility: "",
        Responsibility: "",
        IsPassStudents: 0,
        PostedDate: "",
    });

    

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formState.CompanyId) {
            isValid = false;
            newErrors.CompanyId = "Company Name is Required";
        }
        if (!formState.Profile) {
            isValid = false;
            newErrors.Profile = "Profile is Required";
        }
        if (!formState.Location) {
            isValid = false;
            newErrors.Location = "Location is Required";
        }
        if (!formState.Eligibility) {
            isValid = false;
            newErrors.Eligibility = "Eligibilty is Required";
        }
        if (!formState.PostedDate) {
            isValid = false;
            newErrors.PostedDate = "Date is Required";
        }

        if (!formState.Responsibility) {
            isValid = false;
            newErrors.Responsibility = "Responsibility is Required";
        }
        if (!formState.CourseId) {
            isValid = false;
            newErrors.CourseId = "Course is Required";
        }
        setError(newErrors);
        return isValid;
    };



    const getcompany = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getCompanies`);
            StudentCompany(res.data);
        } catch (err) {
            console.error(err);
            navigate('/companyrequirment')
        }
    };

    useEffect(() => {
        const courseId = parseInt(formState.CourseId);
        if (!isNaN(courseId)) {
            getBatchCodeData(courseId);
        }
    }, [formState.CourseId]);

    async function getBatchCodeData(id) {
        axios
            .post(`${BASE_URL}/getcoursewisebatch`, {
                courseid: id,
            })
            .then((res) => {
                setBatchData(
                    res.data.map((item) => ({
                        label: item.Batch_code,
                        value: item.Batch_Id,
                    }))
                );
            })
            .catch((err) => {
                console.log(err);
                navigate('/companyrequirment')
            });
    }

    async function getCourseData() {
        axios
            .get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data);
                setCourseData(res.data);
            })
            .catch((err) => {
                console.log(err);
                navigate('/companyrequirment')
            });
    }

    useEffect(() => {
        getCourseData();
        getcompany();
    }, []);


    useEffect(() => {
        const id = parseInt(companyrequirmentid)
        if(!isNaN(id)){
            setIsEdit(true)
            getCompanyReq(id)
        }
    }, []);

    useEffect(()=>{
        const batchIdArr = formState.companyReqBatch

        if(batchIdArr && batchIdArr.length>0 && batchData.length>0){
            const selectedArr = batchData.filter((data)=>batchIdArr.includes(data.value))
            setSelected(selectedArr)
        }
    },[formState.companyReqBatch, batchData])

    const getCompanyReq = async(id)=>{
        try{
            const response = await axios.get(`${BASE_URL}/getCompanyRequirement/${id}`)
            setFormState({...response.data.companyReq,companyReqBatch:response.data.companyReqBatch.map((item)=>item.BatchId)})
        }catch(err){
            console.log('getCompanyReq error', err)
            alert('Error')
            navigate('/companyrequirment')
        }
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(validateForm()) {
                const BatchIdArr = selected.map((item)=>item.value)
                
                if(!isEdit){
                    const response = await axios.post(`${BASE_URL}/add_companyrequirement`,{...formState,BatchIdArr})
                    
                    alert('Data added successfully')
                }else{
                    const BatchIdRemove = formState.companyReqBatch.filter((item)=>!BatchIdArr.includes(item))
                    const BatchIdInsert = BatchIdArr.filter((item)=>!formState.companyReqBatch.includes(item))
                    const response = await axios.put(`${BASE_URL}/updateCompanyRequirement`,{...formState,BatchIdRemove,BatchIdInsert})
                    
                    alert('Data updated successfully')
                }

            }
        }catch(err){
            console.log('error adding company Req', err)
            alert('Error')
            navigate('/companyrequirment')
        }
    };

    const handleChange = (e) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChangeId = (e)=>{
        if(e.target.value){
            setFormState((prev)=>({...prev, [e.target.name]:parseInt(e.target.value)}))
        }else{
            setFormState((prev)=>({...prev,[e.target.name]:null}))
        }
    }


    return (
        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">
                                        Company Requirement Details
                                    </h4>

                                    <hr></hr>
                                    <form
                                        class="forms-sample py-3"
                                        onSubmit={handleSubmit}
                                    >
                                        <div class="row">
                                            <div class="form-group col-lg-6">
                                                <label for="exampleFormControlSelect1">
                                                    Company Name
                                                    <span className="text-danger">
                                                        *
                                                    </span>{" "}
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFormControlSelect1"
                                                    value={formState.CompanyId !== null ? formState.CompanyId:""}
                                                    onChange={handleChangeId}
                                                    name="CompanyId"
                                                >
                                                    <option value="">
                                                        ---Select Company
                                                        Name---
                                                    </option>
                                                    {company.map(
                                                        (item, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item.Company_Id
                                                                    }
                                                                >
                                                                    {
                                                                        item.CompanyName
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                                {error.CompanyId && (
                                                    <span className="text-danger">
                                                        {error.CompanyId}
                                                    </span>
                                                )}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleInputUsername1">
                                                    Profile{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>{" "}
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="exampleInputUsername1"
                                                    value={formState.Profile}
                                                    placeholder="Profile"
                                                    name="Profile"
                                                    onChange={handleChange}
                                                />

                                                {error.Profile && (
                                                    <span className="text-danger">
                                                        {error.Profile}
                                                    </span>
                                                )}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleInputUsername1">
                                                    Location
                                                    <span className="text-danger">
                                                        *
                                                    </span>{" "}
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="exampleInputUsername1"
                                                    value={formState.Location}
                                                    placeholder="Location"
                                                    name="Location"
                                                    onChange={handleChange}
                                                />
                                                {error.Location && (
                                                    <span className="text-danger">
                                                        {error.Location}
                                                    </span>
                                                )}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleInputUsername1">
                                                    Eligibilty{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>{" "}
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="exampleInputUsername"
                                                    value={
                                                        formState.Eligibility
                                                    }
                                                    placeholder="Eligibilty"
                                                    name="Eligibility"
                                                    onChange={handleChange}
                                                />

                                                {error.Eligibility && (
                                                    <span className="text-danger">
                                                        {error.Eligibility}
                                                    </span>
                                                )}
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">
                                                    Responsibilities{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>{" "}
                                                </label>
                                                <textarea
                                                    class="form-control"
                                                    id="exampleTextarea1"
                                                    value={
                                                        formState.Responsibility
                                                    }
                                                    placeholder="Responsibilities"
                                                    name="Responsibility"
                                                    onChange={handleChange}
                                                ></textarea>

                                                {error.Responsibility && (
                                                    <span className="text-danger">
                                                        {error.Responsibility}
                                                    </span>
                                                )}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label htmlfor="exampleInputUsername1">
                                                    Posted Date{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="date"
                                                    class="form-control"
                                                    id="exampleInputUsername1"
                                                    value={formState.PostedDate}
                                                    name="PostedDate"
                                                    onChange={handleChange}
                                                />

                                                {error.PostedDate && (
                                                    <span className="text-danger">
                                                        {error.PostedDate}
                                                    </span>
                                                )}
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">
                                                    Course
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <select
                                                    class="form-control form-control-lg"
                                                    id="exampleFromControlSelect1"
                                                    value={formState.CourseId !== null? formState.CourseId:""}
                                                    name="CourseId"
                                                    onChange={handleChangeId}
                                                >
                                                    <option value="">
                                                        --Select Course--
                                                    </option>
                                                    {coursedata.map((item) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    item.Course_Id
                                                                }
                                                            >
                                                                {
                                                                    item.Course_Name
                                                                }
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                                {error.CourseId && (
                                                    <span className="text-danger">
                                                        {error.CourseId}
                                                    </span>
                                                )}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">
                                                    Batch
                                                </label>
                                                <MultiSelect
                                                    options={batchData}
                                                    value={selected}
                                                    onChange={setSelected}
                                                    labelledBy="Select All"
                                                    name="selected"
                                                />
                                            </div>

                                            <div class="from-group col-lg-12">
                                                <FormControl>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    Boolean(formState.IsPassStudents)
                                                                }
                                                                onChange={(e) =>
                                                                    setFormState(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            IsPassStudents:
                                                                                e
                                                                                    .target
                                                                                    .checked
                                                                                    ? 1
                                                                                    : 0,
                                                                        })
                                                                    )
                                                                }
                                                                name="IsPassStudent"
                                                            />
                                                        }
                                                        label="Is Pass Student"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>

                                        <div className="row p-2 gap-2">
                                            <button
                                                className="mr-2 btn btn-primary"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>
                                            <button className="mr-2">
                                                Cancel
                                            </button>
                                            <button className="mr-2 btn btn-primary">
                                                Send Notification
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCompanyRequirement;
