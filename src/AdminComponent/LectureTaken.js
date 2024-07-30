import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const LectureTaken = () => {

    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const { lecturetakenid } = useParams();
    const [course, SetCourse] = useState([])
    const [lecture, SetLecture] = useState([])
    const [faculty, setFacilty] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [value, setValue] = useState({
        course: '',
        batch: '',
        lecture: '',
        classroom: '',
        lecturedate: '',
        time: '',
        to: '',
        faculty: '',
        facultytime: '',
        timeto: '',
        assignmentadate: '',
        enddate: '',
        materialissued: '',
        material: '',
        assignmentgive: '',
        assignment: '',
        testgiven: '',
        test: '',
        topicdescuss: '',
        nextplanning: '',
    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.course) {
            isValid = false;
            newErrors.course = "Name is Require"
        }

        if (!value.batch) {
            isValid = false;
            newErrors.batch = "Batch is Require"
        }

        if (!value.lecturedate) {
            isValid = false;
            newErrors.lecturedate = "Lecture Date is Require"
        }

        if (!value.faculty) {
            isValid = false;
            newErrors.faculty = "Faculty is Require"
        }

        if (!value.assignmentdate) {
            isValid = false;
            newErrors.assignmentdate = "AssignmentDate is Require"
        }

        if (!value.material) {
            isValid = false;
            newErrors.material = "Matrerial is Require"
        }

        if (!value.assignmentgiven) {
            isValid = false;
            newErrors.assignmentgiven = "AssignmentGiven is Require"
        }

        if (!value.assignment) {
            isValid = false;
            newErrors.assignment = "Assignment is Require"
        }

        if (!value.testgiven) {
            isValid = false;
            newErrors.testgiven = "TestGiven is Require"
        }

        if (!value.test) {
            isValid = false;
            newErrors.test = "Test is Require"
        }

        if (!value.topicdescuss) {
            isValid = false;
            newErrors.topicdescuss = "TopicDescuss is Require"
        }

        if (!value.nextplanning) {
            isValid = false;
            newErrors.nextplanning = "NextPlanning is Require"
        }

        setError(newErrors)
        return isValid
    }


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
    async function getfaculty() {

        axios.get(`${BASE_URL}/getfaculty`)
            .then((res) => {

                setFacilty(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCourseData()
        getfaculty()
        setUid([])
    }, [])


    const getbatch = async (id) => {

        const data = {
            courseid: id
        }

        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data);

        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };
    const getlecture = async (id) => {

        const data = {
            batch_id: id
        }

        try {
            const res = await axios.post(`${BASE_URL}/getbatchwiselecture`, data);
            SetLecture(res.data);

        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };




    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: lecturetakenid,
                uidname: "Take_Id",
                tablename: "lecture_taken_master"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();



        setValue(prevState => ({
            ...prevState,
            course: data[0].Course_Id,
            batch: data[0].Batch_Id,
            lecture: data[0].Lecture_Id,
            classroom: data[0].ClassRoom,
            lecturedate: data[0].lecturedate,
            time: data[0].time,
            to: data[0].to,
            faculty: data[0].faculty,
            facultytime: data[0].facultytime,
            timeto: data[0].timeto,
            assignmentadate: data[0].assignmentadate,
            enddate: data[0].enddate,
            materialissued: data[0].materialissued,
            material: data[0].material,
            assignmentgive: data[0].assignmentgive,
            assignment: data[0].assignment,
            testgiven: data[0].testgiven,
            test: data[0].test,
            topicdescuss: data[0].topicdiscuss,
            nextplanning: data[0].nextplanning,
        }))
    }
    useEffect(() => {
        if (lecturetakenid !== ":lecturetakenid") {
            getStudentDetail()
        }

        value.title = ""
        setError({})
        setUid([])
    }, [])







    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {

            const data = {
                course: value.course,
                batch: value.batch,
                lecture: value.lecture,
                classroom: value.classroom,
                lecturedate: value.lecturedate,
                time: value.time,
                to: value.to,
                faculty: value.faculty,
                facultytime: value.facultytime,
                timeto: value.timeto,
                assignmentadate: value.assignmentadate,
                enddate: value.enddate,
                materialissued: value.materialissued,
                material: value.material,
                assignmentgive: value.assignmentgive,
                assignment: value.assignment,
                testgiven: value.testgiven,
                test: value.test,
                topicdescuss: value.topicdescuss,
                nextplanning: value.nextplanning,
                uid: uid.Take_Id
            }


            axios.post(`${BASE_URL}/add_lecturetaken`, data)
                .then((res) => {
                    console.log(res.data)
                })




        }
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    return (

        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-12 col-lg-12'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Lecture Taken</h4>

                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleFormControlSelect1">Course<span className="text-danger">*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} name='course' onChange={(e) => getbatch(e.target.value)} >

                                                                <option value="Select Course">Select Course</option>
                                                                {course.map((item) => {
                                                                    return (

                                                                        <option value={item.Course_Id}>{item.Course_Name}</option>
                                                                    )
                                                                })}

                                                            </select>
                                                            {<span className='text-danger'>{error.course}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Batch<span className="text-danger">*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} name='batch' onChange={(e) =>getlecture(e.target.value)} >

                                                                <option>Select Batch</option>
                                                                {batch.map((item) => {
                                                                    return (
                                                                        <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            {<span className="text-danger">{error.batch}</span>}
                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleexampleFormControlSelect1InputUsername1">Lecture</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.lecture} name='lecture' onChange={onhandleChange} >

                                                                <option>Select Lecture</option>
                                                                 {lecture.map((item)=>{
                                                                     return(
                                                                        <option value={item.id}>{item.subject_topic}</option>

                                                                    )
                                                                 })}


                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Class Room<span className="text-danger">*</span></label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.classroom} name='classroom' onChange={onhandleChange} >
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                            </select>
                                                            {<span className="text-danger"> {error.classroom} </span>}
                                                        </div>
                                                        <div className='form-group col-2'>
                                                            <label for="exampleInputUsername1">Lecture Date<span className="text-danger">*</span></label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.lecturedate} placeholder="Date" name='lecturedate' onChange={onhandleChange} />
                                                            {<span className="text-danger"> {error.lecturedate} </span>}
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <label for="exampleFormControlSelect1">From - Time</label>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.time}
                                                                name='time' onChange={onhandleChange}>
                                                                <option>--Select Time--</option>
                                                                <option>5:00 AM</option>
                                                                <option>5:15 AM</option>
                                                                <option>5:30 AM</option>
                                                                <option>5:45 AM</option>
                                                            </select>

                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <label for="exampleFormControlSelect1">To</label>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.to}
                                                                name='to' onChange={onhandleChange}>
                                                                <option>--Select Time--</option>
                                                                <option>5:00 AM</option>
                                                                <option>5:15 AM</option>
                                                                <option>5:30 AM</option>
                                                                <option>5:45 AM</option>
                                                            </select>

                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleFormControlSelect1">Faculty<span className="text-danger">*</span></lable>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.faculty}
                                                                name='faculty' onChange={onhandleChange}>
                                                                <option>--Select Faculty--</option>
                                                                {faculty.map((item)=>{
                                                                    return(
                                                                        <option value={item.Faculty_Id}>{item.Faculty_Name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            {<span className="text-danger"> {error.faculty} </span>}
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Faculty - Time</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.facultytime}
                                                                name='facultytime' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <lable for="exampleInputUsername1">Time - To</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.timeto}
                                                                name='timeto' onChange={onhandleChange} />
                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Assignment/Test Start Date<span className='text-danger'>*</span></label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.assignmentdate} placeholder="Assignment*" name='assignmentadate' onChange={onhandleChange} />
                                                            {<span className='text-danger'>{error.assignmentdate}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">End Date<span className='text-danger'>*</span></label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.enddate} placeholder="End Date*" name='enddate' onChange={onhandleChange} />
                                                            {error.enddate && <span className='text-danger'>{error.enddate}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Material Issued</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.materialissued} name='materialissued' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Material<span className="text-danger">*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.material} name='material' onChange={onhandleChange} >
                                                                <option>Documents</option>
                                                                <option>LCD</option>
                                                                <option>None</option>
                                                                <option>Course Material</option>
                                                                <option>Xerox</option>
                                                            </select>
                                                            {<span className="text-danger"> {error.material} </span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Assignment Given<span className="text-danger">*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.assignmentgiven} name='assignmentgiven' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                            {<span className="text-danger"> {error.assignmentgiven} </span>}
                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Assignment<span className='text-danger'>*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.assignment} name='assignment' onChange={onhandleChange} >
                                                                <option></option>
                                                            </select>
                                                            {<span className='text-danger'> {error.assignment} </span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Test Given<span className='text-danger'>*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.testgiven} name='testgiven' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                            {<span className='text-danger'> {error.testgiven} </span>}
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Test<span className='text-danger'>*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.test} name='test' onChange={onhandleChange} >
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                            {<span className='text-danger'> {error.test} </span>}
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Topic Descuss<span className='text-danger'>*</span></label>
                                                            <textarea class="form-control" id="exampleTextarea1" name='topicdescuss' value={value.topicdescuss} placeholder="Topic Descuss*" onChange={onhandleChange}></textarea>
                                                            {<span className='text-danger'> {error.topicdescuss} </span>}
                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Next Planning<span className='text-danger'>*</span></label>
                                                            <textarea class="form-control" id="exampleTextarea1" name='nextplanning' value={value.nextplanning} placeholder="Next Panning*" onChange={onhandleChange}></textarea>
                                                            {<span className='text-danger'> {error.nextplanning} </span>}
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>


                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                {/* <button className='col-2'>close</button> */}
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

export default LectureTaken