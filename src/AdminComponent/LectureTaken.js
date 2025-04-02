import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const LectureTaken = () => {

    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const { lecturetakenid } = useParams();
    const [course, SetCourse] = useState([])
    const [courseid, SetCoursid] = useState('')
    const [batchid, setBatchid] = useState('')
    const [lecture, SetLecture] = useState([])
    const [faculty, setFacilty] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [assign, Setassign] = useState([])
    const [unit, SetUnit] = useState([])
    const [unitid, SetUnitid] = useState(0)
    const [assignid, Setassignid] = useState(0)
    const [lectureid, setLectureid] = useState('')
    const [loading, setLoading] = useState(true)
    const [studentdata, setStudentdata] = useState([])
    const [hide, setHide] = useState(false)
    const [lecturedata, setLecturedata] = useState([])
    const [time, setTime] = useState([])
    const [updateloading, setupdateLoding] = useState()
    const [value, setValue] = useState(
        {
            course: '',
            batch: '',
            lecture: '',
            classroom: '',
            lecturedate: '',
            lecturefrom: '',
            lectureto: '',
            faculty: '',
            facultytime: '',
            timeto: '',
            assignmentadate: '',
            enddate: '',
            materialissued: '',
            material: '',
            assignmentgive: '',
            assignment: 0 || '',
            testgiven: '',
            test: 0 || '',
            topicdescuss: '',
            nextplanning: '',
            In_Time: "",
        })





    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!courseid) {
            isValid = false;
            newErrors.course = "Name is Required"
        }

        if (!batchid) {
            isValid = false;
            newErrors.batch = "Batch is Required"
        }

        if (!lectureid) {
            isValid = false;
            newErrors.lecture = "Lecture is Required"
        }
        if (!value.classroom) {
            isValid = false;
            newErrors.classroom = "Classroom is Required"
        }



        setError(newErrors)
        return isValid
    }


    async function getCourseData() {

        axios.get(`${BASE_URL}/getCourse`)
            .then((res) => {
                console.log(res.data)
                SetCourse(res.data)
                setLoading(false)
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

    async function gettime(params) {


        axios.get(`${BASE_URL}/gettime`)

            .then((res) => {
                setTime(res.data)
            })
    }

    useEffect(() => {
        gettime()
        getCourseData()
        getfaculty()
        setUid([])
    }, [])


    const getbatch = async (id) => {

        SetCoursid(id)

        const data = {
            courseid: id
        }




        if (id) {
            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                setAnnulBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            try {
                const res = await axios.get(`${BASE_URL}/getbatch`, data);

                setAnnulBatch(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }





    };

    async function gettakedata(params) {
        axios.post(`${BASE_URL}/geteditlecturetaken`, { Takeid: params || lecturetakenid })
            .then((res) => {
                console.log(res)
                setStudentdata(res.data)

             
            })
    }

    useEffect(() => {
        gettakedata()
        getbatch()
        getlecture()
    }, [])



    const getlecture = async (id) => {

        setBatchid(id)

        const data = {
            batch_id: id,
            AnnulBatch: id
        }


        if (id) {
            try {
                const res = await axios.post(`${BASE_URL}/getbatchwiselecture`, data);
                SetLecture(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_data`, { tablename: "Batch_Lecture_Master", columnname: "id,subject_topic" });
                SetLecture(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }



        if (id) {
            try {
                const res = await axios.post(`${BASE_URL}/getbatchwiseassignment`, data);
                Setassign(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_data`, { tablename: "assignmentstaken", columnname: "id,assignmentname" });
                Setassign(res.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }


        if (id) {
            try {
                const res = await axios.post(`${BASE_URL}/getbatchwiseunittest`, data);
                if (res.data[0].id) {

                    SetUnit(res.data);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_data`, { tablename: "awt_unittesttaken", columnname: "id,subject" });
                if (res.data[0].id) {

                    SetUnit(res.data);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }






    };


    const onlectureselect = (id) => {
        setLectureid(id)

        const data = {
            lectureid: id
        }

        axios.post(`${BASE_URL}/getlecturedetails`, data)
            .then((res) => {
                setLecturedata(res.data)
                const data = res.data[0]
                setValue({
                    lecturedate: data.date,
                    lecturefrom: data.starttime,
                    lectureto: data.endtime,
                    faculty: data.faculty_name,
                    assignmentadate: data.assignment_date,
                    assignment: data.assignment,
                    test: data.unit_test,

                })
            })
    }






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


        SetCoursid(data[0].Course_Id)
        setBatchid(data[0].Batch_Id)
        SetUnitid(data[0].Test_Id)
        Setassignid(data[0].Assignment_Id)
        setLectureid(data[0].Lecture_Id)
        setUid(data[0])

        setValue(prevState => ({
            ...prevState,
            course: data[0].Course_Id,
            batch: data[0].Batch_Id,
            lecture: data[0].Lecture_Id,
            classroom: data[0].ClassRoom,
            lecturedate: data[0].Take_Dt,
            lecturefrom: data[0].Lecture_Start,
            lectureto: data[0].Lecture_End,
            faculty: data[0].Faculty_Id,
            facultytime: data[0].Faculty_Start,
            timeto: data[0].Faculty_End,
            assignmentadate: data[0].Assign_Start,
            enddate: data[0].Assign_End,
            materialissued: data[0].Material,
            // material: data[0].material,
            assignmentgive: data[0].Assign_Given,
            assignment: data[0].assignid,
            testgiven: data[0].Test_Given,
            test: data[0].Test_Id,
            topicdescuss: data[0].Topic,
            nextplanning: data[0].Next_Planning,
        }))
    }
    useEffect(() => {
        if (lecturetakenid !== ":lecturetakenid") {
            getStudentDetail()
            setHide(true)
        }

        setUid([])
    }, [])




    const Navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {

            const data = {
                course: courseid,
                batch: batchid,
                lecture: lectureid,
                classroom: value.classroom,
                lecturedate: value.lecturedate,
                lecturefrom: value.lecturefrom,
                lectureto: value.lectureto,
                faculty: value.faculty,
                facultytime: value.facultytime,
                timeto: value.timeto,
                assignmentadate: value.assignmentadate,
                enddate: value.enddate,
                materialissued: value.materialissued,
                material: value.material,
                assignmentgive: value.assignmentgive,
                assignment: assignid,
                testgiven: value.testgiven,
                test: unitid,
                topicdescuss: value.topicdescuss,
                nextplanning: value.nextplanning,
                uid: uid.Take_Id
            }


            axios.post(`${BASE_URL}/add_lecturetaken`, data)
                .then((res) => {
                    console.log(res.data)
                    alert("Data submitted successfully")
                    gettakedata(res.data.TakeId)
                    setHide(true)
                })





        }
    }



    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedStudents = [...studentdata];
        updatedStudents[index][name] = value;
        setStudentdata(updatedStudents);
    };



    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleSubmitTable = async (e) => {

        setupdateLoding(true)


        try {
            const response = await axios.post(`${BASE_URL}/update_lecture_child`, studentdata);
            if (response) {
                setupdateLoding(false)
                alert("Data updated successfully")
                Navigate('/lecturetaken')
            }


        } catch (error) {
            console.error('Error saving data', error);
            // Handle the error
        }
    };

    const handleImport = () => {
        
        const studentIds = studentdata.map((item) => item.Student_Id);

        const data = {
            date : value.lecturedate
        }

        const url = `${BASE_URL}/getAttendence`;

        axios.post(url , data)
            .then((res) => {
                const logdata = res.data;

                // Function to format the date
                const formatLogDate = (logDate) => {
                    const date = new Date(logDate);
                    let hours = date.getHours();
                    const minutes = date.getMinutes().toString().padStart(2, "0");
                    const ampm = hours >= 12 ? "PM" : "AM";
                    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
                    return `${hours}:${minutes} ${ampm}`;
                };

                // Group logs by EmployeeCode
                const groupedLogs = studentIds.reduce((acc, id) => {
                    acc[id] = logdata
                        .filter((item) => Number(item.EmployeeCode) === id)
                        .sort((a, b) => new Date(a.LogDate) - new Date(b.LogDate)); // Sort logs by date
                    return acc;
                }, {});

                // Map student data to include In_Time and Out_Time
                const updatedStudentData = studentdata.map((student) => {
                    const logs = groupedLogs[student.Student_Id] || [];

                    return {
                        ...student,
                        In_Time: logs.length > 0 ? formatLogDate(logs[0].LogDate) : null, // First log
                        Out_Time: logs.length > 1 ? formatLogDate(logs[logs.length - 1].LogDate) : null, // Last log
                    };
                });


                // Update your state with the formatted data
                setStudentdata(updatedStudentData);

                setStudentdata((prevData) =>
                    prevData.map((item) => ({
                        ...item,
                        Student_Atten: item.In_Time ? "Present" : "Absent",
                    }))
                );
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });


    };





    return (

        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />
            {loading && <Loader />}

            <div className="main-panel" style={{ dispale: loading ? "none" : "block" }}>

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
                                                            <select className="form-control form-control-lg"
                                                                id="exampleFormControlSelect1" name='course'
                                                                value={courseid} onChange={(e) => getbatch(e.target.value)} >

                                                                <option >Select Course</option>

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
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" name='batch' value={batchid} onChange={(e) => getlecture(e.target.value)} >

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
                                                            <label for="exampleexampleFormControlSelect1InputUsername1">Lecture<span className="text-danger">*</span></label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" name='lecture' value={lectureid} onChange={(e) => onlectureselect(e.target.value)} >

                                                                <option>Select Lecture</option>
                                                                {lecture.map((item) => {
                                                                    return (
                                                                        <option value={item.id}>{item.subject_topic}</option>

                                                                    )
                                                                })}

                                                                {<span className="text-danger">{error.lecture}</span>}
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Class Room<span className="text-danger">*</span></label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.classroom} name='classroom' onChange={onhandleChange} >
                                                                <option  >Select class</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                            </select>
                                                            {<span className="text-danger"> {error.classroom} </span>}
                                                        </div>
                                                        <div className='form-group col-2'>
                                                            <label for="exampleInputUsername1">Lecture Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.lecturedate} placeholder="Date" name='lecturedate' onChange={onhandleChange} />

                                                            {<span className="text-danger"> {error.lecturedate} </span>}
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <label for="exampleFormControlSelect1">From - Time</label>
                                                            {/* <input type="time" class="form-control" id="exampleInputUsername1" value={value.lecturefrom} name='lecturefrom' onChange={onhandleChange} /> */}
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" name='lecturefrom' value={value.lecturefrom} onChange={onhandleChange}  >

                                                                <option>Select Time</option>
                                                                {time.map((item) => {

                                                                    return (
                                                                        <option value={item.Timing}>{item.Timing}</option>
                                                                    )

                                                                })}

                                                            </select>

                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <label for="exampleFormControlSelect1">To</label>
                                                            {/* <input type="time" class="form-control" id="exampleInputUsername1" value={value.lectureto}
                                                                name='lectureto' onChange={onhandleChange} /> */}

                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" name='lectureto' value={value.lectureto} onChange={onhandleChange}  >

                                                                <option>Select Time</option>
                                                                {time.map((item) => {

                                                                    return (
                                                                        <option value={item.Timing}>{item.Timing}</option>
                                                                    )

                                                                })}

                                                            </select>

                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <label for="exampleFormControlSelect1">Faculty</label>
                                                            <select class="form-control" id="exampleFormControlSelect1" value={value.faculty}
                                                                name='faculty' onChange={onhandleChange}>
                                                                <option>--Select Faculty--</option>
                                                                {faculty.map((item) => {
                                                                    return (
                                                                        <option value={item.Faculty_Id}>{item.Faculty_Name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            {<span className="text-danger"> {error.faculty} </span>}
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <label for="exampleInputUsername1">Faculty - Time</label>
                                                            {/* <input type="time" class="form-control" id="exampleInputUsername1" value={value.facultytime} name='facultytime' onChange={onhandleChange} /> */}

                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" name='facultytime' value={value.facultytime} onChange={onhandleChange}  >

                                                                <option>Select Time</option>
                                                                {time.map((item) => {

                                                                    return (
                                                                        <option value={item.Timing}>{item.Timing}</option>
                                                                    )

                                                                })}

                                                            </select>
                                                        </div>

                                                        <div class="form-group col-lg-2">
                                                            <label for="exampleInputUsername1">Time - To</label>
                                                            {/* <input type="time" class="form-control" id="exampleInputUsername1" value={value.timeto} name='timeto' onChange={onhandleChange} /> */}

                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" name='timeto' value={value.timeto} onChange={onhandleChange}  >

                                                                <option>Select Time</option>
                                                                {time.map((item) => {

                                                                    return (
                                                                        <option value={item.Timing}>{item.Timing}</option>
                                                                    )

                                                                })}

                                                            </select>

                                                        </div>


                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">Assignment/Test Start Date</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.assignmentadate} placeholder="Assignment*" name='assignmentadate' onChange={onhandleChange} />
                                                            {<span className='text-danger'>{error.assignmentdate}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleInputUsername1">End Date</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.enddate} placeholder="End Date*" name='enddate' onChange={onhandleChange} />
                                                            {error.enddate && <span className='text-danger'>{error.enddate}</span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Material Issued</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.materialissued} name='materialissued' onChange={onhandleChange} >

                                                                <option value="">selelct option</option>
                                                                <option value="No">No</option>
                                                                <option value="Yes">Yes</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Material</label>
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
                                                            <label for="exampleFormControlSelect1">Assignment Given</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.assignmentgive} name='assignmentgive' onChange={onhandleChange} >
                                                                <option value="">selelct option</option>
                                                                <option value="No">No</option>
                                                                <option value="Yes">Yes</option>
                                                            </select>
                                                            {<span className="text-danger"> {error.assignmentgiven} </span>}
                                                        </div>


                                                        <div className="form-group col-lg-2">
                                                            <label for="exampleFormControlSelect1">Assignment</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={assignid} name='assignment' onChange={(e) => Setassignid(e.target.value)} >

                                                                <option>select assignment</option>
                                                                {assign.map((item) => {
                                                                    return (
                                                                        <option value={item.id}>{item.assignmentname}</option>
                                                                    )
                                                                })}

                                                            </select>
                                                            {<span className='text-danger'> {error.assignment} </span>}
                                                        </div>

                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Test Given</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.testgiven} name='testgiven' onChange={onhandleChange} >
                                                                <option>select option</option>
                                                                <option value="No">No</option>
                                                                <option value="Yes">Yes</option>
                                                            </select>
                                                            {<span className='text-danger'> {error.testgiven} </span>}
                                                        </div>
                                                        <div className="form-group col-lg-2 ">
                                                            <label for="exampleFormControlSelect1">Test</label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={unitid} name='test' onChange={(e) => SetUnitid(e.target.value)} >
                                                                <option>select test</option>
                                                                {unit.map((item) => {
                                                                    return (
                                                                        <option value={item.id}>{item.subject}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            {<span className='text-danger'> {error.test} </span>}
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Topic Descuss</label>
                                                            <textarea class="form-control" id="exampleTextarea1" name='topicdescuss' value={value.topicdescuss} placeholder="Topic Descuss*" onChange={onhandleChange}></textarea>
                                                            {<span className='text-danger'> {error.topicdescuss} </span>}
                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleTextarea1">Next Planning</label>
                                                            <textarea class="form-control" id="exampleTextarea1" name='nextplanning' value={value.nextplanning} placeholder="Next Panning*" onChange={onhandleChange}></textarea>
                                                            {<span className='text-danger'> {error.nextplanning} </span>}
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>


                                            <div className='row p-2 justify-content-end'>
                                                <button className='mr-2 btn btn-primary' onClick={handleImport}>Import</button>
                                                {/* <button className='col-2'>close</button> */}
                                                <button className='mr-2 btn btn-primary' style={{ float: "right"}} onClick={handleSubmit} >Save</button>
                                                {/* <button className='col-2'>close</button> */}
                                            </div>


                                        </div>

                                        {hide && <div class="col-lg-12 mt-3">
                                            <form class="card" >
                                                <div class="card-body">
                                                    <div className='d-flex justify-content-between'>
                                                        {/* <div>
                                                            <h4 class="card-title">Allot Roll Number List</h4>
                                                        </div> */}

                                                    </div>
                                                    <div>




                                                        <table class="table table-bordered p-0">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Id
                                                                    </th>
                                                                    <th>
                                                                        Student Code
                                                                    </th>

                                                                    <th>
                                                                        Student Name
                                                                    </th>
                                                                    <th>
                                                                        Feedback
                                                                    </th>
                                                                    <th>
                                                                        Attendence
                                                                    </th>
                                                                    <th>
                                                                        In Time
                                                                    </th>
                                                                    <th>
                                                                        Out Time
                                                                    </th>
                                                                    <th>
                                                                        Assignment
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {studentdata.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td>
                                                                                {item.Student_Code}
                                                                            </td>
                                                                            <td>
                                                                                {item.Student_Name}

                                                                            </td>
                                                                            <td>
                                                                                <select
                                                                                    className="form-control form-control-lg"
                                                                                    name="Student_Reaction"
                                                                                    onChange={(e) => handleInputChange(index, e)}
                                                                                    value={ item.Student_Reaction} 
                                                                                    id="exampleFromControlSelect1"
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    <option value="0">Excellent</option>
                                                                                    <option value="1">Very Good</option>
                                                                                    <option value="2">Good</option>
                                                                                    <option value="3">Satisfactory</option>
                                                                                    <option value="4">Unsatisfactory</option>
                                                                                </select>

                                                                            </td>
                                                                            <td>
                                                                                <>
                                                                                    <select class="form-control form-control-lg" value={item.Student_Atten} onChange={(e) => handleInputChange(index, e)} name='Student_Atten' id="exampleFromControlSelect1" >

                                                                                        <option>Select</option>
                                                                                        <option value='Present'>Present</option>
                                                                                        <option value='Absent'>Absent</option>



                                                                                    </select>
                                                                                </>
                                                                            </td>
                                                                            <td>
                                                                                <div class="form-group ">
                                                                                    <label for="exampleFormControlSelect1"></label>
                                                                                    <input type="text" class="form-control" id="exampleInputUsername1" name='In_Time' onChange={(e) => handleInputChange(index, e)} value={item.In_Time} />



                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div class="form-group ">
                                                                                    <label for="exampleFormControlSelect1"></label>
                                                                                    <input type="text" class="form-control" id="exampleInputUsername1"
                                                                                        name='Out_Time' onChange={(e) => handleInputChange(index, e)} value={item.Out_Time} />

                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div class="form-group ">
                                                                                    <label for="exampleFormControlSelect1"></label>
                                                                                    <select class="form-control form-control-lg"
                                                                                        name='AssignmentReceived' id="exampleFromControlSelect1" onChange={(e) => handleInputChange(index, e)} value={item.AssignmentReceived}>

                                                                                        <option>Select </option>
                                                                                        <option value='Yes'>Yes</option>
                                                                                        <option value='No'>No</option>


                                                                                    </select>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                    <button type="button" onClick={handleSubmitTable} style={{ float: "right" }} class="btn btn-primary m-2">{updateloading ? "Processing.." : "Update Sheet"}</button>



                                                </div>
                                            </form>
                                        </div>}

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