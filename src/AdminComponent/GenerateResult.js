import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import axios from 'axios';
import MyDocument1 from './MyDocument1';
import MyDocument4 from './MyDocument4';
import MyDocument5 from './MyDocument5';
import MyDocument6 from './MyDocument6';
import { pdf } from '@react-pdf/renderer';
//import FormControlLabel from '@mui/material/FormControlLabel';

const GenerateResult = () => {
    const { generateresultid } = useParams();
    const [uid, setUid] = useState([])
    const [faculty, setFacilty] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [error, setError] = useState({})
    const [course, SetCourse] = useState([])
    const [courseid, SetCoursid] = useState('')
    const [child, setChild] = useState([])

    const [value, setValue] = useState({
        course: '',
        batch: '',
        returndate: '',
        printdate: '',
        label1: '',
        label2: '',
        faculty1: '',
        faculty2: '',
        approved: '',
        startdate: '',
        enddate: '',

    })


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!courseid) {
            isValid = false;
            newErrors.course = "Course is Required"
        }

        if (!value.batch) {
            isValid = false;
            newErrors.batch = "Batch is Required"
        }

        if (!value.returndate) {
            isValid = false;
            newErrors.returndate = "Return Date is Required"
        }



        if (!value.approved) {
            isValid = false;
            newErrors.approved = "Approved is Required"
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


    async function getchilddata() {

        const data = {
            Gen_id: generateresultid
        }
        axios.post(`${BASE_URL}/getresultchild`, data)
            .then((res) => {
                console.log(res)
                setChild(res.data)
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


    async function getUpdateDetails() {
        const response = await fetch(`${BASE_URL}/new_update_data`, {
            method: 'POST',
            body: JSON.stringify({
                u_id: generateresultid,
                uidname: "Id",
                tablename: "generate_final_result"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        SetCoursid(data[0].Course_Id)

        setUid(data[0])


        setValue(prevState => ({
            ...prevState,
            batch: data[0].Batch_Id,
            returndate: data[0].Result_date,
            printdate: data[0].Print_date,
            label1: data[0].Label1,
            label2: data[0].Label2,
            faculty1: data[0].Faculty1,
            faculty2: data[0].Faculty2,
            approved: data[0].Approve,
            startdate: data[0].Start_date,
            enddate: data[0].End_date,
        }))
    }



    useEffect(() => {
        if (generateresultid !== ":generateresultid") {
            getUpdateDetails()
            getchilddata()
        }

        value.title = ""
        getCourseData()
        getbatch()
        getfaculty()
        setError({})

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {

            const data = {
                course: courseid,
                batch: value.batch,
                returndate: value.returndate,
                printdate: value.printdate,
                faculty1: value.faculty1,
                faculty2: value.faculty2,
                label1: value.label1,
                label2: value.label2,
                approved: value.approved,
                startdate: value.startdate,
                enddate: value.enddate,
                uid: uid.Id
            }

            axios.post(`${BASE_URL}/add_generateresult`, data)
                .then((res) => {
                    alert("Data Added Successfully")
                })
        }



    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const excludeKeys = [
        "id",
        "Gen_id",
        "Batch_Id",
        "deleted",
        "updated_date",
        "updated_by",
        "created_by",
        "created_date",
    ];



    const headers = child.length > 0
        ? Object.keys(child[0]).filter(key => !excludeKeys.includes(key))
        : [];




    // For pdf     

    const withoutabsentrule = async (data) => {

        const blob = await pdf(<MyDocument6 data={data} />).toBlob();
        const url = URL.createObjectURL(blob);

        window.open(url);
        URL.revokeObjectURL(url);
    };

    const fullAttendence = async (data) => {

        const blob = await pdf(<MyDocument4 data={data} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };
    const printReportCard = async (data) => {

        const blob = await pdf(<MyDocument5 data={data} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };
    const marksheet = async (data) => {

        const blob = await pdf(<MyDocument1 data={data} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };

    const certificateprint = async (data) => {

        const blob = await pdf(<MyDocument1 data={data} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };
    const printSheet = async (data) => {

        const blob = await pdf(<MyDocument1 data={data} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    };



    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Generate Final Result</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={courseid} onChange={(e) => getbatch(e.target.value)} name='course'>
                                                    <option>Select</option>
                                                    {course.map((item) => {
                                                        return (

                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className='text-danger'> {error.course} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option>Select</option>
                                                    {batch.map((item) => {
                                                        return (

                                                            <option value={item.Batch_Id}>{item.Batch_code}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.batch} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Result Date<span className='text-danger'>*</span></label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.returndate} name='returndate' onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.returndate} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Print Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.printdate} name='printdate' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-3">
                                                <select className='label-select' value={value.label1} name='label1' onChange={onhandleChange}>
                                                    <option>Select</option>
                                                    <option value="Prepared">Prepared By</option>
                                                    <option value="Checked">Checked By</option>
                                                    <option value="Training">Training Coordinator</option>
                                                    <option value="Faculty">Faculty</option>
                                                </select>

                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.faculty1} onChange={onhandleChange} name='faculty1'>
                                                    <option>Select</option>
                                                    {faculty.map((item) => {
                                                        return (
                                                            <option value={item.Faculty_Id}>{item.Faculty_Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <select className='label-select' value={value.label2} name='label2' onChange={onhandleChange}>
                                                    <option>Select</option>
                                                    <option value="Prepared">Prepared By</option>
                                                    <option value="Checked">Checked By</option>
                                                    <option value="Training">Training Coordinator</option>
                                                    <option value="Faculty">Faculty</option>
                                                </select>


                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.faculty2} onChange={onhandleChange} name='faculty2'>
                                                    <option>Select</option>
                                                    {faculty.map((item) => {
                                                        return (
                                                            <option value={item.Faculty_Id}>{item.Faculty_Name}</option>
                                                        )
                                                    })}
                                                </select>

                                            </div>



                                            <div className='col-lg-12 '>
                                                <div className='row align-items-center'>

                                                    <div class="form-group col-lg-3">
                                                        <label for="exampleFormControlSelect1">Approved By<span className='text-danger'>*</span> </label>
                                                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.approved} onChange={onhandleChange} name='approved'>
                                                            <option>Select</option>
                                                            {faculty.map((item) => {
                                                                return (
                                                                    <option value={item.Faculty_Id}>{item.Faculty_Name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        {<span className='text-danger'> {error.approved} </span>}
                                                    </div>
                                                    <div class="form-group col-lg-3">
                                                        <label for="exampleInputUsername1">Period (Start Date)</label>
                                                        <input type='date' class="form-control" id="exampleInputUsername1" value={value.startdate}
                                                            name='startdate' onChange={onhandleChange} />

                                                    </div>

                                                    <div class="form-group col-lg-3">
                                                        <label for="exampleInputUsername1">End Date</label>
                                                        <input type="date" class="form-control" id="exampleInputUsername1" value={value.enddate}
                                                            name='enddate' onChange={onhandleChange} />

                                                    </div>

                                                    <div className='col-lg-3'>

                                                        <button type="submit" class="btn btn-primary mr-2">Generate</button>
                                                    </div>
                                                </div>

                                            </div>



                                        </div>






                                    </form>

                                    <button type="submit" class="btn btn-primary mr-2">Save</button>
                                    <button type="button" onClick={withoutabsentrule} class="btn btn-primary mr-2">Without Absent Rule</button>
                                    <button type="button" onClick={fullAttendence} class="btn btn-primary mr-2">Without Absent Rule with Full Attendance</button>
                                    <button type="button" onClick={printReportCard} class="btn btn-primary mr-2">Print Report Card</button>
                                    <button type="button" onClick={marksheet} class="btn btn-primary mr-2">MarkSheet</button>
                                    <button type="button" onClick={certificateprint} class="btn btn-primary mr-2">Certificate Print</button>
                                    <button type="button"  onClick={printSheet}class="btn btn-primary mr-2">Print Sheet</button>
                                    <button type='button'  onClick={() => {
                                        window.location.reload()
                                    }} class="btn btn-light border">Cancel</button>


                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12 mt-3">
                            <form class="card" >
                                <div class="card-body">

                                    <div className='table-responsive'>


                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>

                                                    {headers.map((item, index) => {
                                                        return (
                                                            <th width="10%" key={index}>
                                                                {item}
                                                            </th>
                                                        )
                                                    })}


                                                </tr>
                                            </thead>

                                            <tbody>
                                                {child.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {headers.map((header, index) => (
                                                            <td key={index}>
                                                                {row[header]}
                                                            </td>
                                                        ))}
                                                        {/* Additional <td> if needed */}
                                                        <td></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                    <button type="button" style={{ float: "right" }} class="btn btn-primary m-2">Update Sheet</button>



                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default GenerateResult
