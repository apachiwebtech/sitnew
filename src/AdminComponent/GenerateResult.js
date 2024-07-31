import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
//import FormControlLabel from '@mui/material/FormControlLabel';

const GenerateResult = () => {

    const [brand, setBrand] = useState([])
    const [vendordata, setVendorData] = useState([])
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    // const children = (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    //       <FormControlLabel
    //         label="Child 1"
    //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label="Child 2"
    //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );

    const [value, setValue] = useState({
        coursename: '',
        batchcode: '',
        vivamocname: '',
        maxmarks: '',
        date: '',

    })



    const validateForm = () => {
        let isValid = true
        const newErrors = {}


       if (!value.coursename){
        isValid = false;
        newErrors.coursename = "Course Name is Required"
       }

       if(!value.batchcode){
        isValid = false;
        newErrors.batchcode = "Batch Code is Required"
       }

       if(!value.vivamocname){
        isValid = false;
        newErrors.vivamocname = "Viva MOC is Required"
       }

       if(!value.date){
        isValid = false;
        newErrors.date = "Date is Required"
       }


        setError(newErrors)
        return isValid
    }


    async function getStudentDetail() {
        const response = await fetch(`${BASE_URL}/studentDetail`, {
            method: 'POST',
            body: JSON.stringify({
                id: vivamoctakenid,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();


        setValue(prevState => ({
            ...prevState,
            coursename: data[0].coursename,
            batchcode: data[0].batchcode,
            vivamocname: data[0].vivamocname,
            maxmarks: data[0].maxmarks,
            date: data[0].date,
        }))
    }
    useEffect(() => {
        if (':vivamoctakenid' !== ":vivamoctakenid") {
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
            if (vivamoctakenid == ":vivamoctakenid") {
                response = await fetch(`${BASE_URL}/add_vivamoctaken`, {
                    method: 'POST',
                    body: JSON.stringify({
                        coursename: value.coursename,
                        batchcode: value.batchcode,
                        vivamocname: value.vivamocname,
                        maxmarks: value.maxmarks,
                        date: value.date,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                response = await fetch(`${BASE_URL}/updatevivamoctaken'`, {
                    method: 'POST',
                    body: JSON.stringify({

                        coursename: value.coursename,
                        batchcode: value.batchcode,
                        vivamocname: value.vivamocname,
                        maxmarks: value.maxmarks,
                        date: value.date,



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
                                    <h4 class="card-title">Generate Final Result</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Course<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.course} onChange={onhandleChange} name='course'>
                                                    <option>Select</option>
                                                    <option>Administration</option>
                                                    <option>Business Development</option>
                                                    <option>Training &amp; Development</option>
                                                    <option>Account</option>
                                                    <option>Placement</option>
                                                    <option>Purchase</option>
                                                    <option>Leadership / DD</option>
                                                    <option>Quality Assurance</option>
                                                    <option>Human Resources</option>
                                                    <option>Corporate Training</option>
                                                    <option>Test User</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.batch} onChange={onhandleChange} name='batch'>
                                                    <option>00001</option>
                                                    <option>01002</option>
                                                    <option>01003</option>
                                                    <option>01004</option>
                                                    <option>01005</option>
                                                    <option>01006</option>
                                                    <option>01007</option>
                                                    <option>01008</option>
                                                    <option>01009</option>


                                                </select>
                                            </div>



                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Result Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.returndate} name='returndate' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Print Date</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.printdate} name='printdate' onChange={onhandleChange} />

                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Prepared By<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.prepared} onChange={onhandleChange} name='prepared'>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>

                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Checked By<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.checked} onChange={onhandleChange} name='checked'>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>


                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Approved By<span className='text-danger'>*</span> </label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.approved} onChange={onhandleChange} name='approved'>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>
                                                    <option>A. G. Belwalkar</option>
                                                    <option>Aashay Dedhia</option>


                                                </select>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Period (Start Date)</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.startdate}
                                                    name="startdate" onChange={onhandleChange} />
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername">End Date</lable>
                                                <input type="date" class="form-control" id="exampleInputUsername1" value={value.enddate}
                                                    name="enddate" onChange={onhandleChange} />
                                            </div>






                                        </div>


                                        <button type="submit" class="btn btn-primary mr-2">Generate</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>



                                    </form>

                                    <button type="submit" class="btn btn-primary mr-2">Save</button>
                                    <button type="submit" class="btn btn-primary mr-2">Without Absent Rule</button>
                                    <button type="submit" class="btn btn-primary mr-2">Without Absent Rule with Full Attendance</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print Report Card</button>
                                    <button type="submit" class="btn btn-primary mr-2">MarkSheet</button>
                                    <button type="submit" class="btn btn-primary mr-2">Certificate Print</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print Sheet</button>



                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">View  Final Result</h4>
                                        </div>

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                            slots={{ toolbar: GridToolbar }}
                                            slotProps={{
                                                toolbar: {
                                                    showQuickFilter: true,
                                                },
                                            }}
                                        />

                                        {confirmationVisibleMap[cid] && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                    </div>


                                    {/* <div>
                                      <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Excel</button>
                                      </div> */}



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default GenerateResult
