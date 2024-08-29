import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';

const FeedBack2 = () => {
    const { feedback2id } = useParams();
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})

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





    const [value, setValue] = useState({
        course: '',
        batch: '',
        returndate: '',
        printdate: '',
        prepared: '',
        checked: '',
        approved: '',
        startdate: '',
        enddate: '',

    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.facultyname) {
            isValid = false;
            newErrors.facultyname = "Faculty Name is Required"
        }

        if (!value.maritalstatus) {
            isValid = false;
            newErrors.maritalstatus = "Marital Status is Required"
        }

        if (!value.address) {
            isValid = false;
            newErrors.address = "Address is Required"
        }


        setError(newErrors)
        return isValid
    }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: feedback2id,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        setValue(prevState => ({
            ...prevState,
            course: data[0].course,
            batch: data[0].batch,
            returndate: data[0].returndate,
            printdate: data[0].printdate,
            prepared: data[0].prepared,
            checked: data[0].checked,
            approved: data[0].approved,
            startdate: data[0].startdate,
            enddate: data[0].enddate,
        }))
    }
    useEffect(() => {
        if (':feedback2id' !== ":feedback2id") {
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
            if (feedback2id == ":feedback2id") {
                response = await fetch(`${BASE_URL}/add_feedback1`, {
                    method: 'POST',
                    body: JSON.stringify({
                        course: value.course,
                        batch: value.batch,
                        returndate: value.returndate,
                        printdate: value.printdate,
                        prepared: value.prepared,
                        checked: value.checked,
                        approved: value.approved,
                        startdate: value.startdate,
                        enddate: value.enddate,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                response = await fetch(`${BASE_URL}/updatefeedbackid`, {
                    method: 'POST',
                    body: JSON.stringify({

                        course: value.course,
                        batch: value.batch,
                        returndate: value.returndate,
                        printdate: value.printdate,
                        prepared: value.prepared,
                        checked: value.checked,
                        approved: value.approved,
                        startdate: value.startdate,
                        enddate: value.enddate,




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

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Student Feedback On Training Co-ordination 2</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Select Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>Select</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Select Batch<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option></option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Student Name<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.student} onChange={onhandleChange} name='student'>
                                                    <option></option>

                                                </select>
                                            </div>



                                            <div class="form-group col-lg-3">
                                                <label htmlfor="exampleInputUsername1">Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1"
                                                    value={date}
                                                    name='date'
                                                    onChange={(e) => { }} disabled />

                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Feedback<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.feedback} onChange={onhandleChange} name='feedback'>
                                                    <option></option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Sr No</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.srno} name='srno' onChange={onhandleChange} />

                                            </div>



                                        </div>

                                    </form>
                                    <div class="card">
                                        <div className="card-body">
                                            <h3>Feedback Entry</h3>
                                        </div>
                                    </div>

                                    <div className='pt-2'>
                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <th>Questions</th>
                                                    <th>Answer</th>
                                                    <th>Feedback</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Please give your ratings for the Training Program.</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect1"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect1"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="feedbackInput1"></label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="feedbackInput1"
                                                                value={value.program}
                                                                name='program'
                                                                onChange={onhandleChange}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the information given to you by ‘Training Co-ordinator’ for 'Code of Conduct’.</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect2"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect2"
                                                                value={value.ratings1}
                                                                name='ratings1'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="feedbackInput2"></label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="feedbackInput2"
                                                                value={value.program1}
                                                                name='program1'
                                                                onChange={onhandleChange}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the explanation given to you by ‘Training Co-ordinator’ for ‘Attendance & Punctuality’.</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect3"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect3"
                                                                value={value.ratings2}
                                                                name='ratings2'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="feedbackInput3"></label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="feedbackInput3"
                                                                value={value.program2}
                                                                name='program2'
                                                                onChange={onhandleChange}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the introduction given to you by ‘Training Co-ordinator’ for all faculties and their subjects.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect4"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect4"
                                                                value={value.ratings3}
                                                                name='ratings3'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput4"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput4"
                                                                value={value.program3}
                                                                name='program3'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the explanation given to you by ‘Training Co-ordinator’ for the assignments.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect5"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect5"
                                                                value={value.ratings4}
                                                                name='ratings4'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput5"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput5"
                                                                value={value.program4}
                                                                name='program4'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the explanation given to you by ‘Training Co-ordinator’ for the Unit Test and Final Examination rules	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect6"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect6"
                                                                value={value.ratings5}
                                                                name='ratings5'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput6"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput6"
                                                                value={value.program5}
                                                                name='program5'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the explanation given to you by ‘Training Co-ordinator’ for the weightage of marks and grading system.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect7"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect7"
                                                                value={value.ratings6}
                                                                name='ratings6'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput7"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput7"
                                                                value={value.program6}
                                                                name='program6'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings on record of attendance.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect8"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect8"
                                                                value={value.ratings7}
                                                                name='ratings7'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput8"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput8"
                                                                value={value.program7}
                                                                name='program7'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the information on time given to you by ‘Training Co-ordinator’ especially for cancellation of lectures.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect9"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect9"
                                                                value={value.ratings8}
                                                                name='ratings8'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput9"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput9"
                                                                value={value.program8}
                                                                name='program8'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the receipt of assigments on time after checking.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect10"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect10"
                                                                value={value.ratings9}
                                                                name='ratings9'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput10"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput10"
                                                                value={value.program9}
                                                                name='program9'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for conducting the unit test on time & for the supervision and shown on time.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect11"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect11"
                                                                value={value.ratings10}
                                                                name='ratings10'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput11"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput11"
                                                                value={value.program10}
                                                                name='program10'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the “Unit Test’ marks displayed after every unit test on the Notice board on time.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect12"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect12"
                                                                value={value.ratings11}
                                                                name='ratings11'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput12"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput12"
                                                                value={value.program11}
                                                                name='program11'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the overall performance and services offered by ‘Training Co-ordinator’.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect13"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect13"
                                                                value={value.ratings12}
                                                                name='ratings12'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput13"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput13"
                                                                value={value.program12}
                                                                name='program12'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Please give your ratings for the suggestions/ complaints handled by ‘Training Co-ordinator’.	</td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect15"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect15"
                                                                value={value.ratings14}
                                                                name='ratings14'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput15"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput15"
                                                                value={value.program14}
                                                                name='program14'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="card">
                                        <div className="card-body">
                                            <h3>Faculty</h3>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <table className='table table-bordered'>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="faculty1"></label>
                                                            <select
                                                                className="form-control"
                                                                id="faculty2"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>Vasant Mestry</option>
                                                                <option>Pramod Joshi</option>
                                                            </select>
                                                        </div>
                                                    </td>                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect16"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect16"
                                                                value={value.ratings16}
                                                                name='ratings16'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput15"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput15"
                                                                value={value.program15}
                                                                name='program15'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="faculty1"></label>
                                                            <select
                                                                className="form-control"
                                                                id="faculty2"
                                                                value={value.ratings1}
                                                                name='ratings1'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>Vasant Mestry</option>
                                                                <option>Pramod Joshi</option>
                                                            </select>
                                                        </div>
                                                    </td>                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect16"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect16"
                                                                value={value.ratings17}
                                                                name='ratings17'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput15"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput15"
                                                                value={value.program}
                                                                name='program'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="faculty1"></label>
                                                            <select
                                                                className="form-control"
                                                                id="faculty2"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>Vasant Mestry</option>
                                                                <option>Pramod Joshi</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect16"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect16"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput15"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput15"
                                                                value={value.program}
                                                                name='program'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="faculty1"></label>
                                                            <select
                                                                className="form-control"
                                                                id="faculty2"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>Vasant Mestry</option>
                                                                <option>Pramod Joshi</option>
                                                            </select>
                                                        </div>
                                                    </td>                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect16"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect16"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput15"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput15"
                                                                value={value.program}
                                                                name='program'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="faculty1"></label>
                                                            <select
                                                                className="form-control"
                                                                id="faculty2"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>Vasant Mestry</option>
                                                                <option>Pramod Joshi</option>
                                                            </select>
                                                        </div>
                                                    </td>                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect16"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect16"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput15"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput15"
                                                                value={value.program}
                                                                name='program'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="faculty1"></label>
                                                            <select
                                                                className="form-control"
                                                                id="faculty2"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>Vasant Mestry</option>
                                                                <option>Pramod Joshi</option>
                                                            </select>
                                                        </div>
                                                    </td>                                                    <td>
                                                        <div className="form-group">
                                                            <label htmlFor="ratingsSelect16"></label>
                                                            <select
                                                                className="form-control"
                                                                id="ratingsSelect16"
                                                                value={value.ratings}
                                                                name='ratings'
                                                                onChange={onhandleChange}
                                                            >
                                                                <option>Select</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="feedbackInput15"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="feedbackInput15"
                                                                value={value.program}
                                                                name='program'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button type="submit" class="btn btn-primary mr-2">Save</button>
                                        <button type="button" class="btn btn-primary mr-2">Print</button>
                                        <button type="button" class="btn btn-primary mr-2">Blank Print</button>

                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Back</button>
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

export default FeedBack2
