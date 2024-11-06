import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';

const EmailMaster = () => {

    const { emailmasterid } = useParams();
    const [specification, setSpecification] = useState([])
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})


    const [value, setValue] = useState({
        emailpurpose: '',
        department: '',
        emailsubject: '',
        cc: '',
        bcc: '',
        specification: '',

    })



    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if(!value.emailpurpose){
        isValid = false;
        newErrors.emailpurpose = "Email Purpose is Required"
       }

       if(!value.department){
        isValid = false;
        newErrors.department = "Department is Required"
       }

       if(!value.cc){
        isValid = false;
        newErrors.cc = "CC is Required"
       }

       if(!value.bcc){
        isValid = false;
        newErrors.bcc = "BCC is Required"
       }

       if(!value.emailsubject){
        isValid = false;
        newErrors.emailsubject = "Email Subject is Required"
       }
       

        setError(newErrors)
        return isValid
    }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: emailmasterid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        setValue(prevState => ({
            ...prevState,
            emailpurpose: data[0].emailpurpose,
            department: data[0].department,
            emailsubject: data[0].emailsubject,
            cc: data[0].cc,
            bcc: data[0].bcc,
            specification: data[0].specification,

        }))
    }
    useEffect(() => {
        if (':emailmasterid' !== ":emailmasterid") {
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
            if (emailmasterid == ":emailmasterid") {
                response = await fetch(`${BASE_URL}/add_awt_emailmaster`, {
                    method: 'POST',
                    body: JSON.stringify({
                        emailpurpose: value.emailpurpose,
                        department: value.department,
                        emailsubject: value.emailsubject,
                        cc: value.cc,
                        bcc: value.bcc,
                        specification: value.specification,
                        userId: "1"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                response = await fetch(`${BASE_URL}/updateemailmaster'`, {
                    method: 'POST',
                    body: JSON.stringify({

                        emailpurpose: value.emailpurpose,
                        department: value.department,
                        emailsubject: value.emailsubject,
                        cc: value.cc,
                        bcc: value.bcc,
                        specification: value.specification,
                        uid: emailmasterid


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
                                    <h4 class="card-title">Add Email Detail</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Email Purpose<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.emailpurpose} placeholder='Email Purpose' name='emailpurpose' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.emailpurpose} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Department<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.department} placeholder='Department' name='department' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.department} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">CC<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.cc} placeholder='CC' name='cc' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.cc} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">BCC<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.bcc} placeholder='BCC' name='bcc' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.bcc} </span>}
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="exampleTextarea1">Email Subject<span className="text-danger">*</span></label>
                                                <textarea type="text" class="form-control form-control-lg" id="exampleTextarea1" 
                                                value={value.emailsubject} placeholder="Email Subject" name="emailsubject" onChange={onhandleChange}></textarea>
                                                {<span className="text-danger"> {error.emailsubject} </span>}
                                            </div>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Event Description</label>
                                                    <CKEditor
                                                    editor={ClassicEditor}

                                                    data={uid.specification}
                                                    // data={uid.specification}
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

export default EmailMaster
