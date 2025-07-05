import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, IMG_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const TestimonialChild = () => {


    const { testimonialid } = useParams('');
    const [uid, setUid] = useState([])
    const [courseid, setCourseid] = useState([])
    const [studentdata, setVendorData] = useState([])
    const [student, setOneStudent] = useState([])
    const [error, setError] = useState({})
    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [selectedStudents, setSelectedStudents] = useState({});
    const navigate = useNavigate();
    const [value, setValue] = useState({
        course: "",
        batch: "",
        adddecription: ""
    })


    const getBatch = async (id) => {
        setCourseid(id)
        const data = {
            courseid: id
        }

        if (id) {
            try {
                const res = await
                    axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                setAnnulBatch(res.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            try {
                const res = await
                    axios.get(`${BASE_URL}/getbatch`);
                setAnnulBatch(res.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

    };

    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                SetCourse(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    async function getBatchwisedata(id) {
        const data = {
            batch_code: id
        }
        axios.post(`${BASE_URL}/batchwisestudentdata`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    const handleUpdate = (id) => {
        const data = {
            u_id: testimonialid,
            tablename: "Testimonial_Master"
        }
        axios.post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getTestDetails = () => {
        const data = {
            testid: testimonialid,
        }
        axios.post(`${BASE_URL}/gettestdetails`, data)
            .then((res) => {
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }




    useEffect(() => {
        getCourseData()
        getBatch()
        value.title = ""
        setError({})
        setUid([])

        if (testimonialid != ':testimonialid') {
            getTestDetails()
        }

    }, [])




    const handleSubmit = (e) => {
        e.preventDefault()

        const selectedArray = Object.values(selectedStudents);
        if (selectedArray.length === 0) {
            alert("No students selected.");
            return;
        }

        const payload = selectedArray.map(({ student, addDescription }) => ({
            Student_Id: student.Student_Id,
            Student_Name: student.Student_Name,
            Add_Description: addDescription || value.adddecription,
            Course_Id: value.course,
            Batch_Id: value.batch,
            description: student.Description,
        }));


        axios.post(`${BASE_URL}/add_uploadtestimonial`, payload)
            .then((res) => {
                alert("Testimonial Added Successfully");
                navigate('/UploadTestimonial')
            })
            .catch((err) => {
                console.log(err)
            })

    }



    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))

        if (e.target.name === 'batch') {
            getBatchwisedata(e.target.value);
        }
    }

    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />


            <div className="main-panel" >

                <div className="content-wrapper">

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-12 col-lg-12'>
                                            {testimonialid == ':testimonialid' &&
                                                <div className='row justify-content-center'>
                                                    <div className='p-3' style={{ width: "100%" }}>
                                                        <div>
                                                            <h4 className="card-title titleback">Lecture Taken</h4>

                                                        </div>
                                                        <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                                            <div class='row'>

                                                                <div class="form-group col-lg-3">
                                                                    <label for="exampleFormControlSelect1">Course<span className="text-danger">*</span></label>
                                                                    <select class="form-control" id="exampleFormControlSelect1"
                                                                        value={value.course} name='course' onChange={(e) => {
                                                                            getBatch(e.target.value);
                                                                            onhandleChange(e);
                                                                        }}>
                                                                        <option value="">Select Course</option>
                                                                        {course.map((item) => (
                                                                            <option key={item.Course_Id} value={item.Course_Id}>{item.Course_Name}</option>
                                                                        ))}
                                                                    </select>
                                                                    {<span className='text-danger'> {error.course} </span>}
                                                                </div>

                                                                <div class="form-group col-lg-3">
                                                                    <label for="exampleFormControlSelect1">Batch</label>
                                                                    <select class="form-control" id="exampleFormControlSelect1"
                                                                        value={value.batch} name='batch' onChange={onhandleChange}>
                                                                        <option value="">Select Batch</option>
                                                                        {batch.map((item) => (
                                                                            <option key={item.Batch_Id} value={item.Batch_Id}>{item.Batch_code}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                            </div>

                                                            <div className='row justify-content-end'>
                                                                <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                                                <button type='button' onClick={() => {
                                                                    window.location.reload()
                                                                }} class="btn btn-light">Cancel</button>

                                                            </div>

                                                        </form>


                                                    </div>
                                                </div>
                                            }

                                            {studentdata.length > 0 ? (
                                                <div className='row justify-content-center'>
                                                    <div className='p-3' style={{ width: "100%" }}>
                                                        <div>
                                                            <h4 className="card-title titleback">Student List</h4>

                                                        </div>
                                                        <table className="table table-bordered" width={"100%"} cellSpacing="0">
                                                            <thead>
                                                                <tr >
                                                                    <th className='py-2' width="5%">Select</th>
                                                                    <th className='py-2' width="10%">Student Id</th>
                                                                    <th className='py-2' width="10%">Photo</th>
                                                                    <th className='py-2' width="15%">Student Name</th>
                                                                    <th className='py-2' width="20%">Decription</th>
                                                                    <th className='py-2' width="20%">Add Decription</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {studentdata.length > 0 ? (
                                                                    studentdata.map((item) => (
                                                                        <tr>
                                                                            <td>
                                                                                <input type="checkbox" name="select" value={item.id} onChange={(e) => {
                                                                                    const checked = e.target.checked;
                                                                                    setSelectedStudents(prev => {
                                                                                        const updated = { ...prev };
                                                                                        if (checked) {
                                                                                            updated[item.Student_Id] = { ...updated[item.Student_Id], student: item };
                                                                                        } else {
                                                                                            delete updated[item.Student_Id];
                                                                                        }
                                                                                        return updated;
                                                                                    });
                                                                                }} />
                                                                            </td>
                                                                            <td>
                                                                                {item.Student_Id}
                                                                            </td>
                                                                            <td>
                                                                                <img style={{ width: "80px", height: "80px" }} src={`${IMG_URL}/student_document/${item.Student_Id}/` + item.upload_image} />
                                                                            </td>
                                                                            <td>
                                                                                {item.Student_Name}
                                                                            </td>
                                                                            <td>
                                                                                <textarea className="form-control" rows="2" readOnly>{item.Description}</textarea>
                                                                            </td>
                                                                            <td>
                                                                                <textarea className="form-control" rows="2" name='adddecription' onChange={onhandleChange}></textarea>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="3" className="text-center">No Data Found</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            ) : null}



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

export default TestimonialChild


