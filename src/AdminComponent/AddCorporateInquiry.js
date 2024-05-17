import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const AddCorporateInquiry = () => {

    const [uid, setUid] = useState([])

    const [error, setError] = useState({})

    const { corpid } = useParams();

    const [value, setValue] = useState({
        firstname: '',
        lastname: '',
        middilename:'',
        Mobile:'',
        Phone: '',
        Email:'',
        CompanyName: '',
        Designation: '',
        Country: '',
        Address:'',
        Pin: '',
        City: '',
        State:'',
        Place: '',
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


  
    useEffect(() => {
 
        getStudentDetail()
        value.title = ""
        setError({})
        setUid([])
    }, [])



    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/getcorporateinquiryform`, {
            method: 'POST',
            body: JSON.stringify({
                id: corpid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        setValue(prevState => ({
            ...prevState,
            firstname: data[0].Fname,
            lastname: data[0].Lname,
            middilename: data[0].MName,
            Mobile: data[0].Mobile,
            Phone: data[0].Phone,
            Email: data[0].Email,
            CompanyName: data[0].CompanyName,
            Designation: data[0].Designation,
            Country: data[0].Country,
            Address: data[0].Address,
            Pin: data[0].Pin,
            City: data[0].City,
            State: data[0].State,
            Place: data[0].Place,

        }))
    }




    const handleSubmit = async (e) => {
        e.preventDefault()
    
        // if(validateForm()){
            const response = await fetch(`${BASE_URL}/postCorporateInquiry`, {

                method: 'POST',
                body: JSON.stringify({
                    firstname: value.firstname,
                    lastname: value.lastname,
                    middilename: value.middilename,
                    Mobile: value.Mobile,
                    Phone: value.Phone,
                    Email: value.Email,
                    CompanyName: value.CompanyName,
                    Designation: value.Designation,
                    Country: value.Country,
                    Address: value.Address,
                    Pin: value.Pin,
                    City: value.City,
                    State: value.State,
                    Place: value.Place,
                    id :corpid
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

     





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

                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Inquiry Information</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">First Name</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.firstname} placeholder="First Name" name='firstname' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Middle Name</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.middilename} placeholder="Middle Name" name='middilename' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Last Name</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.lastname} placeholder="Last Name" name='lastname' onChange={onhandleChange} />

                                                        </div>


                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Mobile</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Mobile} placeholder="Mobile" name='Mobile' onChange={onhandleChange} />

                                                        </div>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Phone </label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Phone} placeholder="Phone " name='Phone' onChange={onhandleChange} />
                                                            {/* {error.facultyname && <span className='text-danger'>{error.name}</span>} */}
                                                        </div>

                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">E-Mail </label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Email} placeholder="E-Mail " name='Email' onChange={onhandleChange} />
                                                            {/* {error.facultyname && <span className='text-danger'>{error.name}</span>} */}
                                                        </div>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Business </label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.bussiness} placeholder="Business " name='bussiness' onChange={onhandleChange} />
                                                            {/* {error.facultyname && <span className='text-danger'>{error.name}</span>} */}
                                                        </div>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Company Name  </label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.CompanyName} placeholder="Company Name  " name='CompanyName' onChange={onhandleChange} />
                                                            {/* {error.facultyname && <span className='text-danger'>{error.name}</span>} */}
                                                        </div>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Designation  </label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Designation} placeholder="Designation  " name='Designation' onChange={onhandleChange} />
                                                            {/* {error.facultyname && <span className='text-danger'>{error.name}</span>} */}
                                                        </div>

                                                        <div className="form-group col-lg-12 ">
                                                            <label for="exampleInputUsername1">Discussion   </label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1"  placeholder="Discussion   " name='firstname' onChange={onhandleChange} />
                                                            {/* {error.facultyname && <span className='text-danger'>{error.name}</span>} */}
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>


                                            <div className='row p-2 gap-2'>
                                                <button className='mr-2 btn btn-primary' onClick={handleSubmit}>Save</button>
                                                {/* <button className='col-2'>close</button> */}
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Training Programme & Batch Details</h4>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="form-group col-lg-6 ">
                                                            <label for="exampleInputUsername1">Course </label>
                                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" value={value.Course_Id} name='course ' onChange={onhandleChange} >
                                                                <option>Autocad</option>
                                                                <option>Civil</option>

                                                            </select>
                                                        </div>

                                                        <div className="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Date</label>
                                                            <input type="date" className="form-control" id="exampleInputUsername1" value={value.InquiryDate} placeholder="Installment Amount" name='InquiryDate' onChange={onhandleChange} />

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 className="card-title titleback">Address Details</h4>
                                                    </div>
                                                    <div className='row'>

                                                        <div className="form-group col-lg-12">
                                                            <label for="exampleTextarea1">Address </label>
                                                            <textarea className="form-control" id="exampleTextarea1" value={value.Address} placeholder="Address" name='Address' onChange=''></textarea>

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Pincode<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Pin} placeholder="Name*" name='country' onChange={onhandleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">City<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.City} placeholder="Name*" name='country' onChange={onhandleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">State<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.State} placeholder="Name*" name='State' onChange={onhandleChange} />

                                                        </div>

                                                        <div className="form-group col-lg-4 ">
                                                            <label for="exampleInputUsername1">Country<span className='text-danger'>*</span></label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Country} placeholder="Country" name='Country' onChange={onhandleChange} />

                                                        </div>

                                                        <div className='form-group col-4'>
                                                            <label for="exampleInputUsername1">Place</label>
                                                            <input type="number" className="form-control" id="exampleInputUsername1" value={value.Place} placeholder="Place" name='Place' onChange={onhandleChange} />
                                                        </div>

                                                    </div>



                                                </div>
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

export default AddCorporateInquiry