import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';

const Course = () => {

    const [specification, setSpecification] = useState("")
    const [specification2, setSpecification2] = useState("")
    const [specification3, setSpecification3] = useState("")
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const { courseid } = useParams()



    const [value, setValue] = useState({
        course: "" || uid.Course_Name,
        course_code: "" || uid.Course_Code,
        eligibility: "" || uid.Eligibility,
        introduction: '' || uid.Introduction,
    })

    useEffect(() => {
        setValue({
            course: uid.Course_Name,
            course_code: uid.Course_Code,
            eligibility: uid.Eligibility,
            introduction: '' || uid.Introduction,
        })
    }, [uid])


    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.course) {
            isValid = false;
            newErrors.course = "Course is require"
        }

        setError(newErrors)
        return isValid
    }

    async function getnewcode(params) {

        axios.get(`${BASE_URL}/getcoursecode`)
        .then((res) =>{

            setValue({
                course_code : res.data.code
            })
        })

    }


    async function getupdatedata() {

        const data = {
            u_id: courseid,
            uidname: "Course_Id",
            tablename: "Course_Mst"
        }
        axios.post(`${BASE_URL}/new_update_data`, data)
            .then((res) => {
                setUid(res.data[0])

                console.log(res.data, "update")
            })
            .catch((err) => {
                console.log(err)
            })
    }





    useEffect(() => {

        if (courseid !== ':courseid') {

            getupdatedata()
        }
        if(courseid == ':courseid'){

            getnewcode()
        }
        setError({})
    }, [courseid])



    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                course: value.course,
                course_code: value.course_code,
                eligibility: value.eligibility,
                introduction: value.introduction,
                keypoint: specification,
                objective: specification2,
                studyprep: specification3,
                uid: uid.Course_Id
            }


            axios.post(`${BASE_URL}/add_course`, data)
                .then((res) => {
                    console.log(res)
                    alert("form submitted")
                    localStorage.removeItem('course_data')
                    navigate(`/courselisting`)
                })
                .catch((err) => {
                    console.log(err)
                })
        }





    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    console.log(uid.Basic_Subject, "@@@")

    return (
        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Course Information</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Course Name<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.course} placeholder="Course Name*" name='course' onChange={onhandleChange} />
                                                {error.course && <span className='text-danger'>{error.course}</span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Course Code</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.course_code} placeholder="Course Code" name='course_code' onChange={onhandleChange} disabled/>

                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="exampleTextarea1">Eligibility</label>
                                                <textarea class="form-control" id="exampleTextarea1" name='eligibility' value={value.eligibility} placeholder="Eligibility" onChange={onhandleChange}></textarea>

                                            </div>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Introduction</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.introduction} placeholder="Introduction" name='introduction' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Key Points of Syllabus:</label>
                                                <CKEditor

                                                    editor={ClassicEditor}
                                                    data={uid.Course_Description || specification}
                                                    onReady={editor => {
                                                        // Allows you to store the editor instance and use it later.
                                                        // console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setSpecification(data)
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        // console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        // console.log('Focus.', editor);
                                                    }}

                                                />
                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Objective:</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={uid.Objective || specification2}
                                                    onReady={editor => {
                                                        // Allows you to store the editor instance and use it later.
                                                        // console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setSpecification2(data)
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        // console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        // console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>


                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Basic Study Preparation required:</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={uid.Basic_Subject || specification3}
                                                    onReady={editor => {
                                                        // Allows you to store the editor instance and use it later.
                                                        // console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setSpecification3(data)
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        // console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        // console.log('Focus.', editor);
                                                    }}
                                                />
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

export default Course
