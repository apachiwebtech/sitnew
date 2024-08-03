import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const AddChecklist = () => {

    const [specification, setSpecification] = useState("")
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
        title: '',
        specification: '',
      
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
                    title: value.title,
                    specification: value.specification,
                   
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {

            response = await fetch(`${BASE_URL}/updateInquiry`, {
                method: 'POST',
                body: JSON.stringify({

                    title: value.title,
                    specification: value.specification,
                    
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
                    <h4 class="card-title">Checklist Registration</h4>
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">


                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-12 col-lg-12'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    {/* <div>
                                                        <h4 className="card-title titleback">Basic Information</h4>
                                                    </div> */}
                                                    <div className='row'>
                                                        <div class="form-group col-lg-4">
                                                            <lable for="exampleInputUsername1">Title</lable>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder='Title' name='title' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-12">
                                                            <CKEditor editor={ClassicEditor} data={uid.specification}
                                                                config={{
                                                                    height: '1000px'
                                                                }}
                                                                onReady={editor => {

                                                                }}

                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    setSpecification(data)
                                                                }}

                                                                onBlur={(event, editor) => {

                                                                }}
                                                                onFocus={(event, editor) => {

                                                                }}
                                                            />


                                                        </div>

                                                    </div>

                                                </div>
                                            </div>



                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                <button className='mr-2 btn btn-primary'>Back</button>
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

export default AddChecklist