import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';

const AcademicQualification = () => {
    const { feedback1id } = useParams();



    const [value, setValue] = useState({
        
        qualification: '',
        institute: '',
        passingyear: '',
        greadpercentage: '',

    })




    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: feedback1id,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        setValue(prevState => ({
            ...prevState,
            
            qualification: data[0].qualification,
            institute: data[0].institute,
            passingyear: data[0].passingyear,
            greadpercentage: data[0].greadpercentage,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        
        if (feedback1id == ":feedback1id") {
            response = await fetch(`${BASE_URL}/add_feedback1`, {
                method: 'POST',
                body: JSON.stringify({
                    
                    qualification: value.qualification,
                    institute: value.institute,
                    passingyear: value.passingyear,
                    greadpercentage: value.greadpercentage,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updatefeedbackid`, {
                method: 'POST',
                body: JSON.stringify({

                    
                    qualification: value.qualification,
                    institute: value.institute,
                    passingyear: value.passingyear,
                    greadpercentage: value.greadpercentage,




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

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="d-flex">

                            <div className='px-2 mx-2'><Link to="/faculty/:facultyid"><h4>Personal Information</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/academicqualification"><h4>Academic Qualification</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/addfacultymaster"><h4>Current Experience/Other Details</h4></Link></div>

                            <div className='px-2 mx-2'><Link to="/facultyexperience"><h4>Total Experience and Documents</h4></Link></div>
                            <div className='px-2 mx-2'><Link to="/facultydiscussion"><h4>Discussion</h4></Link></div>

                        </div>
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h2 class="card-title titleback">Academic Qualification</h2>
                                    <hr></hr>
                                    <div className="pt-2">
                                        <table className='table table-bordered'>
                                            <tr>
                                                <td>
                                                </td>
                                                <td>
                                                    <h4>Qualification</h4>
                                                </td>
                                                <td>
                                                    <h4>Institute</h4>
                                                </td>
                                                <td>
                                                    <h4>Passing Year</h4>
                                                </td>
                                                <td>
                                                    <h4>Grade/Percentage</h4>
                                                </td>
                                            </tr>
                                            <tbody>
                                                <tr>
                                                    <td><a href=''>Update</a>/<a href='/academicqualification'>Cancel</a></td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="qualificationInput1"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="qualificationInput1"
                                                                value={value.qualification}
                                                                name='qualification'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="instituteInput1"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="instituteInput1"
                                                                value={value.institute}
                                                                name='institute'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="passingyearInput1"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="passingyearInput1"
                                                                value={value.passingyear}
                                                                name='passingyear'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                    <td>

                                                        <div className="form-group">
                                                            <label html="greadpercentageInput1"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="greadpercentageInput1"
                                                                value={value.greadpercentage}
                                                                name='greadpercentage'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="qualificationInput1"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="qualificationInput1"
                                                                value={value.qualification}
                                                                name='qualification'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="instituteInput1"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="instituteInput1"
                                                                value={value.institute}
                                                                name='institute'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="passingyearInput1"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="passingyearInput1"
                                                                value={value.passingyear}
                                                                name='passingyear'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label html="greadpercentageInput1"></label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="greadpercentageInput1"
                                                                value={value.greadpercentage}
                                                                name='greadpercentage'
                                                                onChange={onhandleChange} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="d-flex align-items-center mt-3">
                                                            <button type="submit" class="btn btn-sm btn-primary mr-2 py-2">Add</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button type="submit" class="btn btn-primary mr-2">Save</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Close</button>
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

export default AcademicQualification
