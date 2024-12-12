import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';


const AcademicQualification = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);



    const [value, setValue] = useState({
        student: "" || uid.student,
        book: "" || uid.book,
        bookcode: "" || uid.bookcode,
        issuedate: "" || uid.issuedate,
        returndate: "" || uid.status,



    })

    useEffect(() => {
        setValue({
            student: uid.student,
            book: uid.book,
            bookcode: uid.bookcode,
            issuedate: uid.issuedate,
            returndate: uid.returndate,


        })
    }, [uid])


    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}


    //    if (!value.student) {
    //     isValid = false;
    //     newErrors.student = "Student is Required"
    //    }
    //     if (!value.book) {
    //         isValid = false;
    //         newErrors.book = "Book is Required"
    //     }
    //     setError(newErrors)
    //     return isValid
    // }


    async function getBookData() {

        axios.post(`${BASE_URL}/vendor_details`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    async function getBookData() {
        const data = {
            tablename: "awt_bookissue"
        }
        axios.post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getBookData()
        value.title = ""
        setError({})
        setUid([])
    }, [])

    const handleClick = (id) => {
        setCid(id)
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };

    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    // const handleUpdate = (id) => {
    //     const data = {
    //         u_id: id,
    //         tablename: "awt_bookissue"
    //     }
    //     axios.post(`${BASE_URL}/update_data`, data)
    //         .then((res) => {
    //             setUid(res.data[0])

    //             console.log(res.data, "update")
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    // const handleDelete = (id) => {
    //     const data = {
    //         cat_id: id,
    //         tablename: "awt_bookissue"
    //     }

    //     axios.post(`${BASE_URL}/delete_data`, data)
    //         .then((res) => {
    //             getBookData()

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    //     setConfirmationVisibleMap((prevMap) => ({
    //         ...prevMap,
    //         [id]: false,
    //     }));
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

        // if(validateForm()){
        const data = {

            student: value.student,
            book: value.book,
            bookcode: value.bookcode,
            issuedate: value.issuedate,
            returndate: value.returndate,
            uid: uid.id
        }


        axios.post(`${BASE_URL}/add_bookissue`, data)
            .then((res) => {
                console.log(res)
                getBookData()

            })
            .catch((err) => {
                console.log(err)
            })
    }
    // }





    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Acadamic Qualification</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Qualification</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.qualification}
                                                    placeholder="Qualification" name='qualification' onChange={onhandleChange} />
                                                {/* {<span className='text-danger'>{error.student}</span>} */}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Institute</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.institute}
                                                    placeholder="Institute" name='institute' onChange={onhandleChange} />
                                                {/* {<span className='text-danger'>{error.book}</span>} */}
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Passing Year</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.passingyear}
                                                    placeholder="Passing Year" name='passingyear' onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Grade/Percentage</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.grade} placeholder='Grade/Percentage'
                                                    name='grade' onChange={onhandleChange} />
                                            </div>

                                            <div class="d-flex align-items-center mt-3">
                                                <button type="submit" class="btn btn-sm btn-primary mr-2 py-2">Add</button>
                                            </div>



                                        </div>




                                        <button type="submit" class="btn btn-primary mr-2">Save</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Close</button>
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

export default AcademicQualification