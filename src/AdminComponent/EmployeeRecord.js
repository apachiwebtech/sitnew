import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const EmployeeRecord = () => {

    const { employeerecordid } = useParams();
    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
      setChecked([event.target.checked, event.target.checked]);
    };
  
    const handleChange2 = (event) => {
      setChecked([event.target.checked, checked[1]]);
    };
  
    const handleChange3 = (event) => {
      setChecked([checked[0], event.target.checked]);
    };

    const [value, setValue] = useState({
        training: '',
        attendee: '',
        instructor: '',
        description: '',
        feedback: '',

    })



    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.training){
        isValid = false;
        newErrors.training = "Training is Required"
       }

       if(!value.attendee){
        isValid = false
        newErrors.attendee = "Attendee is Required"
       }

       if(!value.instructor){
        isValid = false;
        newErrors.instructor = "Instructor is Required"
       }

       if(!value.description){
        isValid = false;
        newErrors.description = "Descriptionn is Required"
       }

       if(!value.feedback){
        isValid = false;
        newErrors.feedback = "FeedBack is Required"
       }

        setError(newErrors)
        return isValid
    }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: employeerecordid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        setValue(prevState => ({
            ...prevState,
            training: data[0].training,
            attendee: data[0].attendee,
            instructor: data[0].instructor,
            description: data[0].description,
            feedback: data[0].feedback,
        }))
    }
    useEffect(() => {
        if (':employeerecordid' !== ":employeerecordid") {
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
            if (employeerecordid == ":employeerecordid") {
                response = await fetch(`${BASE_URL}/add_employerecord`, {
                    method: 'POST',
                    body: JSON.stringify({
                        training: value.training,
                        attendee: value.attendee,
                        instructor: value.instructor,
                        description: value.description,
                        feedback: value.feedback,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                response = await fetch(`${BASE_URL}/updateemployeerecord'`, {
                    method: 'POST',
                    body: JSON.stringify({

                        training: value.training,
                        attendee: value.attendee,
                        instructor: value.instructor,
                        description: value.description,
                        feedback: value.feedback,



                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }



        }
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
                                    <h4 class="card-title">Employee Training Record</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Training Date<span className="text-danger">*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.training} placeholder="Training Date" name='training' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.training}</span>}
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Attendee<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.attendee} onChange={onhandleChange} name='attendee'>
                                                    <option>Select</option>
                                                    <option>Admin</option>
                                                    <option>BalKrishana</option>
                                                    <option>Ankit</option>
                                                    <option>Athrava</option>
                                                    <option>Manshi Suresh</option>
                                                </select>
                                                {<span className='text-danger'> {error.attendee} </span>}
                                            </div>
                                           
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Instructor<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.instructor} placeholder="Instructor" name='instructor' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.instructor}</span>}
                                            </div>
                                            
                                            <div class="form-group col-lg-8">
                                                <label for="exampleTextarea1">Description<span className='text-danger'>*</span></label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.description} placeholder="Description" name='description' onChange={onhandleChange}></textarea>
                                                {<span className='text-danger'> {error.description} </span>}
                                            </div>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleTextarea1">Feedback<span className='text-danger'>*</span></label>
                                                <textarea class="form-control" id="exampleTextarea1" value={value.feedback} placeholder="Feedback" name='feedback' onChange={onhandleChange}></textarea>
                                                {<span className='text-danger'> {error.feedback} </span>}
                                            </div>
                                            

                                            

                                        </div>
                                            



                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>
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

export default EmployeeRecord