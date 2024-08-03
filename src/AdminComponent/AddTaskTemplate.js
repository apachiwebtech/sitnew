import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const AddTaskTemplate = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const { projectmasterid } = useParams();
    const [inquiryData, setInquiryData] = useState([]);
    const [Discipline, setDescipline] = useState([]);
    const [Course, setCourse] = useState([]);
    const [Education, setEducation] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchCategoty, setbatchCategory] = useState([]);
    const [value, setValue] = useState({
        taskname: '',
        nominalco: '',
        standardde: '',
        remind: '',
        checklist: '',
        
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
        if (':aadtasktemplateid' !== ":aadtasktemplateid") {
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
                    taskname: value.taskname,
                    nominalco: value.nominalco,
                    standardde: value.standardde,
                    remind: value.remind,
                    checklist: value.checklist,
                   
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updateInquiry`, {
                method: 'POST',
                body: JSON.stringify({

                    taskname: value.taskname,
                    nominalco: value.nominalco,
                    standardde: value.standardde,
                    remind: value.remind,
                    checklist: value.checklist,
                   
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
                    <h4 class="card-title">Task Template</h4>
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">
                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Basic Information</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-6">
                                                            <lable for="exampleInputUsername1">Task Name</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.taskname} placeholder='Task Name' name='taskname' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-6">
                                                            <lable for="exampleInputUsername1">Nominal Completion Time</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.nominalco} placeholder="Nominal Completion Time" name="nominalco" onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-12">
                                                            <lable for="exampleTextarea1">Standard Description of Task</lable>
                                                            <textarea class="form-control form-control-lg" id="exampleTextarea1" value={value.standardde} placeholder='Standard Description of task' name='standaedde' onChange={onhandleChange}  ></textarea>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>



                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                <button className='mr-2'>Back</button>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Other Information</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-12">
                                                            <FormControl>Repetitive
                                                                <RadioGroup
                                                                    row aria-labelledby='demo-row-radio-button-group-lable'
                                                                    name='row-radio-button-group'>
                                                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                                                </RadioGroup>

                                                            </FormControl>
                                                        </div>

                                                        <div class="form-group col-lg-6">
                                                            <lable for="exampleInputUsername1">Remind before</lable>
                                                            <input type='text' class="form-control" id="exampleInputUsername1" value={value.remind} placeholder='Remind Before' name='remind' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-6">
                                                            <lable for="exampleFormControlSelect1">Checklist</lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.checklist} name='checklist' onChange={onhandleChange} >
                                                                <option>--Select CheckList--</option>
                                                                <option>N.A.</option>
                                                                <option>New Test</option>
                                                                <option>Test 2</option>
                                                            </select>
                                                        </div>

                                                    </div>

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

export default AddTaskTemplate