import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { Link, useParams } from 'react-router-dom';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
//import FormControlLabel from '@mui/material/FormControlLabel';

const AddFacultyMaster = () => {

    const { facultyid } = useParams();
    const [uid, setUid] = useState([])
    const [error, setError] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);
    const storedFacultyId = localStorage.getItem("faculty_id");


    const [value, setValue] = useState({
        Experience: '',
        Company_Name: '',
        Specialization: '',
        Company_Address: '',
        Company_Phone: '',
        Service_Offered: '',
        Interview_Date: '',
        Reference_by: '',
        designexperience: '',
        DesignExp: '',
        Working_Status: '',
        Comments: '',
        Interviewer: '',
        Interview_Status: '',
        Salary: '',
        TDS: '',
        PAN: '',
        Sal_Struct: '',
        Qualified: '',

    })


    // const validateForm = () => {
    //     let isValid = true
    //     const newErrors = {}


    //     if (!value.facultyname) {
    //         isValid = false;
    //         newErrors.facultyname = "Faculty Name is Required"
    //     }

    //     if (!value.maritalstatus) {
    //         isValid = false;
    //         newErrors.maritalstatus = "Marital Status is Required"
    //     }

    //     if (!value.address) {
    //         isValid = false;
    //         newErrors.address = "Address is Required"
    //     }


    //     setError(newErrors)
    //     return isValid
    // }


    async function getFacultyDetail() {
        axios.post(`${BASE_URL}/getfacultydata`, { facultyid: facultyid })
        
                    .then((res) => {
        
                        const data = res.data;


        setValue(prevState => ({
            ...prevState,
            Experience: data[0].Experience,
            Company_Name: data[0].Company_Name,
            Specialization: data[0].Specialization,
            Company_Address: data[0].Company_Address,
            Company_Phone: data[0].Company_Phone,
            Service_Offered: data[0].Service_Offered,
            Interview_Date: data[0].Interview_Date,
            Reference_by: data[0].Reference_by,
            designexperience: data[0].designexperience,
            DesignExp: data[0].DesignExp,
            Working_Status: data[0].Working_Status,
            Comments: data[0].Comments,
            Interviewer: data[0].Interviewer,
            Interview_Status: data[0].Interview_Status,
            Salary: data[0].Salary,
            TDS: data[0].TDS,
            PAN: data[0].PAN,
            Qualified:data[0].Qualified,
            Sal_Struct: data[0].Sal_Struct
        }))
         })
    }
    useEffect(() => {
        if (facultyid !== ":facultyid") {
            getFacultyDetail()
        }

        value.title = ""
        setError({})
        setUid([])
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        // if (validateForm()) {
        // if (!localStorage.getItem("faculty_id")) {
        if (facultyid === ":facultyid") {
            response = await fetch(`${BASE_URL}/add_faculty_master`, {
                method: 'POST',
                body: JSON.stringify({
                    Experience: value.Experience,
                    Company_Name: value.Company_Name,
                    Specialization: value.Specialization,
                    Company_Address: value.Company_Address,
                    Company_Phone: value.Company_Phone,
                    Service_Offered: value.Service_Offered,
                    Interview_Date: value.Interview_Date,
                    Reference_by: value.Reference_by,
                    designexperience: value.designexperience,
                    DesignExp: value.DesignExp,
                    Working_Status: value.Working_Status,
                    Comments: value.Comments,
                    Interviewer: value.Interviewer,
                    Interview_Status: value.Interview_Status,
                    Salary: value.Salary,
                    TDS: value.TDS,
                    PAN: value.PAN,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
  // ✅ Format Interview_Date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const formattedInterviewDate = formatDate(value.Interview_Date);

  response = await fetch(`${BASE_URL}/Current_Experience`, {
    method: 'POST',
    body: JSON.stringify({
      Experience: value.Experience === '' ? null : parseInt(value.Experience),
      Company_Name: value.Company_Name,
      Specialization: value.Specialization,
      Company_Address: value.Company_Address,
      Company_Phone: value.Company_Phone,
      Service_Offered: value.Service_Offered,
      Interview_Date: formattedInterviewDate,  // ✅ formatted date
      Reference_by: value.Reference_by,
      designexperience: value.designexperience,
      DesignExp: value.DesignExp === '' ? null : parseInt(value.DesignExp),
      Working_Status: value.Working_Status,
      Comments: value.Comments,
      Interviewer: value.Interviewer,
      Interview_Status: value.Interview_Status,
      Salary: value.Salary === '' ? null : parseInt(value.Salary),
      TDS: value.TDS === '' ? null : parseInt(value.TDS),
      PAN: value.PAN,
      Qualified: value.Qualified,
      Sal_Struct: value.Sal_Struct, // ✅ Salary Type added here
      uid: facultyid,
      form_type: 2,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}


// alert("Page 2 submitted successfully!");
//   localStorage.removeItem("faculty_uid");


        // }
    }


   const onhandleChange = (e) => {
  const { name, value } = e.target;
  setValue(prev => ({
    ...prev,
    [name]: value
  }));
};


    return (

        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">

                        <div class="d-flex">

                          
                            <div className='px-2 mx-2'><Link to={`/faculty/${facultyid}`}><h4>Personal Information</h4></Link></div>
                                        <div className='px-2 mx-2'><Link to={`/addfacultymaster/${facultyid}`}><h4>Current Experience/Other Details</h4></Link></div>
                                        <div className='px-2 mx-2'><Link to={`/facademicqualification/${facultyid}`}><h4>Academic Qualification</h4></Link></div>
                                       <div className='px-2 mx-2'><Link to={`/facultyexperience/${facultyid}`}><h4>Total Experience and Documents</h4></Link></div>
                                        <div className='px-2 mx-2'><Link to={`/facultydiscussion/${facultyid}`}><h4>Discussion</h4></Link></div>
                        </div>

                        
                        <div class="col-lg-12 grid-margin">

                            <form onSubmit={handleSubmit} class="card">
                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>

                                        <div className='col-md-6 col-lg-6'>

                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 class="card-title titleback">Work Experience</h4>
                                                    </div>
                                                    <div class="row">

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Experience</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Experience}
                                                                placeholder="00.00 (Year)" name='Experience' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Present Company</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Company_Name}
                                                                placeholder="Company" name='Company_Name' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Specialization</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Specialization}
                                                                placeholder="Specialization" name='Specialization' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-8">
                                                            <label for="exampleTextarea1">Address</label>
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.Company_Address}
                                                                placeholder="Address" name='Company_Address' onChange={onhandleChange}></textarea>


                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Phone</label>
                                                            <input type="number" class="form-control" id="exampleInputUsername1" value={value.Company_Phone}
                                                                placeholder="Contact No." name='Company_Phone' onChange={onhandleChange} />

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Service Offered</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Service_Offered}
                                                                placeholder="Service Offered" name='Service_Offered' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Interview Date</label>
                                                            <input type="date" class="form-control" id="exampleInputUsername1" value={value.Interview_Date}
                                                                placeholder='DD/MM/YYYY' name='Interview_Date' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Reference by</label>
                                                            <input type="text" class="form-control" id="exampleUsername1" value={value.Reference_by}
                                                                placeholder="Reference By" name='Reference_by' onChange={onhandleChange} />
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Design Experience (Year)</label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.designexperience}
                                                                name='designexperience' onChange={onhandleChange} >
                                                                <option>--Select--</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Design Experience (Months)</label>
                                                            <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.DesignExp}
                                                                name='DesignExp' onChange={onhandleChange} >
                                                                <option>--Select--</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Working Status</label>
                                                            <select 
                                                              className="form-control form-control-lg" 
                                                              id="exampleFormControlSelect1" 
                                                              value={value.Working_Status}
                                                              name="Working_Status" 
                                                              onChange={onhandleChange}
                                                            >
                                                              <option value="">--Select--</option>
                                                              <option value="Working">Working</option>
                                                              <option value="Not Working">Not Working</option>
                                                            </select>

                                                        </div>


                                                    </div>
                                                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                                    <button type='button' onClick={() => {
                                                        window.location.reload()
                                                    }} class="btn btn-light">Cancel</button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center'>
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <h4 class="card-title titleback">SIT Use Only</h4>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-lg-8">
                                                            <label for="exampleTextarea1">Comments </label>
                                                            <textarea class="form-control" id="exampleTextarea1" value={value.Comments} placeholder="Comments"
                                                                name='Comments' onChange={onhandleChange}></textarea>

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <FormControl component="fieldset">
                                                              <label>Qualified</label>
                                                              <RadioGroup
                                                                row
                                                                aria-labelledby="qualified-radio-group"
                                                                name="Qualified" // 🔑 Must match your state key (e.g., value.Qualified)
                                                                value={value.Qualified} // Controlled value
                                                                onChange={onhandleChange} // Change handler
                                                              >
                                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                                              </RadioGroup>
                                                            </FormControl>
                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Interviewer</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Interviewer}
                                                                placeholder="Interviewer" name='Interviewer' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleFormControlSelect1">Interview Status</label>
                                                            <select
  className="form-control"
  id="exampleFormControlSelect1"
  value={value.Interview_Status}
  name="Interview_Status"
  onChange={onhandleChange}
>
  <option value="">--Interviewer Status--</option>
  <option value="Appointed">Appointed</option>
</select>

                                                        </div>
                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">Salary Offered</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.Salary}
                                                                placeholder="00.00" name='Salary' onChange={onhandleChange} />

                                                        </div>

                                                       <div className="form-group col-lg-4">
                                                          <FormControl component="fieldset">
                                                            <label>Salary Type</label>
                                                            <RadioGroup
                                                              row
                                                              aria-labelledby="salary-type-radio-group"
                                                              name="Sal_Struct"             // ✅ This will work correctly with state
                                                              value={value.Sal_Struct}      // ✅ Controlled component
                                                              onChange={onhandleChange}      // ✅ Event handler
                                                            >
                                                              <FormControlLabel value="Hourly" control={<Radio />} label="Hourly" />
                                                              <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                                                            </RadioGroup>
                                                          </FormControl>
                                                        </div>


                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">TDS</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.TDS}
                                                                placeholder="TDS" name='TDS' onChange={onhandleChange} />

                                                        </div>

                                                        <div class="form-group col-lg-4">
                                                            <label for="exampleInputUsername1">PAN NO.</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.PAN}
                                                                placeholder="PAN NO." name='PAN' onChange={onhandleChange} />

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default AddFacultyMaster
// app.post("/nodeapp/add_faculty_master", (req, res) => {
//     let {
//         Faculty_Code,
//         Faculty_Name,
//         Married,
//         DOB,
//         Nationality,
//         Faculty_Type,
//         Office_Tel,
//         Res_Tel,
//         Mobile,
//         EMail,
//         Present_Address,
//         Present_City,
//         Present_State,
//         Present_Country,
//         Present_Pin,
//         Present_Tel,
//         Permanent_Address,
//         Permanent_City,
//         Permanent_State,
//         Permanent_Country,
//         Permanent_Pin,
//         Permanent_Tel,
//         Service_Offered,
//         Specialization,
//         Experience,
//         Company_Name,
//         Company_Address,
//         Company_Phone,
//         Interview_Date,
//         Working_At,
//         Qualified,
//         Joining_Date,
//         Comments,
//         Interviewer,
//         Sal_Struct,
//         Salary,
//         Date_added,
//         TDS,
//         PAN,
//         Resigned,
//         InvoiceName,
//         IsActive,
//         IsDelete,
//         CourseId,
//         DesignExp,
//         KnowSw,
//         Working_Status,
//         TrainingCategory,
//         Interview_Status,
//         Reference_by,
//         uid,
//     } = req.body;
    






//     if (uid == undefined) {
//         const getMaxCodeQuery = "SELECT Faculty_Code AS maxCode FROM faculty_master order by Faculty_Id desc limit 1";

//     con.query(getMaxCodeQuery, (err, result) => {
//         if (err) return res.json(err);

//         const newFacultyCode = (result[0].maxCode || 0) + 1;  
//       const insertSql =
//             "insert into faculty_master(`Faculty_Code`, `Faculty_Name`, `Married`, `DOB`, `Nationality`, `Faculty_Type`, `Office_Tel`, `Res_Tel`, `Mobile`, `EMail`, `Present_Address`, `Present_City`, `Present_State`, `Present_Country`, `Present_Pin`, `Present_Tel`, `Permanent_Address`, `Permanent_City`, `Permanent_State`, `Permanent_Country`, `Permanent_Pin`, `Permanent_Tel`, `Service_Offered`, `Specialization`,`Experience`,`Company_Name`,`Company_Address`,`Company_Phone`,`Interview_Date`,`Working_At`,`Qualified`,`Joining_Date`,`Comments`,`Interviewer`,`Sal_Struct`,`Salary`,`Date_added`,`TDS`,`PAN`,`Resigned`,`InvoiceName`,`IsActive`,`IsDelete`,`CourseId`,`DesignExp`,`KnowSw`,`Working_Status`,`TrainingCategory`,`Interview_Status`,`Reference_by`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

//          const insertParams = [
//             newFacultyCode,
//             Faculty_Name,
//             Married,
//             DOB,
//             Nationality,
//             Faculty_Type,
//             Office_Tel,
//             Res_Tel,
//             Mobile,
//             EMail,
//             Present_Address,
//             Present_City,
//             Present_State,
//             Present_Country,
//             Present_Pin,
//             Present_Tel,
//             Permanent_Address,
//             Permanent_City,
//             Permanent_State,
//             Permanent_Country,
//             Permanent_Pin,
//             Permanent_Tel,
//             Service_Offered,
//             Specialization,
//             Experience,
//             Company_Name,
//             Company_Address,
//             Company_Phone,
//             Interview_Date,
//             Working_At,
//             Qualified,
//             Joining_Date,
//             Comments,
//             Interviewer,
//             Sal_Struct,
//             Salary,
//             Date_added,
//             TDS,
//             PAN,
//             Resigned,
//             InvoiceName,
//             IsActive,
//             IsDelete,
//             CourseId,
//             DesignExp,
//             KnowSw,
//             Working_Status,
//             TrainingCategory,
//             Interview_Status,
//             Reference_by,
//         ];
//         con.query(insertSql, insertParams, (err, data) => {
//             if (err) return res.json(err);
//             return res.json({ message: "Faculty added", Faculty_Code: newFacultyCode, result: data });
//         });
//         });
//     }
//         else {
// const sql =
//             "update `faculty_master` set `Faculty_Code` =? , `Faculty_Name` =? , `Married` =? , `DOB` =? , `Nationality` =? , `Faculty_Type` =? , `Office_Tel` =? , `Res_Tel` =? , `Mobile` =? , `EMail` =? , `Present_Address` =? , `Present_City` =? , `Present_State` =? , `Present_Country` =? , `Present_Pin` =? , `Present_Tel` =? , `Permanent_Address` =? , `Permanent_City` =? , `Permanent_State` =? , `Permanent_Country` =? , `Permanent_Pin` =? , `Permanent_Tel` =? , `Service_Offered` =? , `Specialization` =? ,`Experience` =? ,`Company_Name` =? ,`Company_Address` =? ,`Company_Phone` =? ,`Interview_Date` =? ,`Working_At` =? ,`Qualified` =? ,`Joining_Date` =? ,`Comments` =? ,`Interviewer` =? ,`Sal_Struct` =? ,`Salary` =? ,`Date_added` =? ,`TDS` =? ,`PAN` =? ,`Resigned` =? ,`InvoiceName` =? ,`IsActive` =? ,`IsDelete` =? ,`CourseId` =? ,`DesignExp` =? ,`KnowSw` =? ,`Working_Status` =? ,`TrainingCategory` =? ,`Interview_Status` =? ,`Reference_by` =? where id = ?";

//        const  param = [
//             Faculty_Code,
//             Faculty_Name,
//             Married,
//             DOB,
//             Nationality,
//             Faculty_Type,
//             Office_Tel,
//             Res_Tel,
//             Mobile,
//             EMail,
//             Present_Address,
//             Present_City,
//             Present_State,
//             Present_Country,
//             Present_Pin,
//             Present_Tel,
//             Permanent_Address,
//             Permanent_City,
//             Permanent_State,
//             Permanent_Country,
//             Permanent_Pin,
//             Permanent_Tel,
//             Service_Offered,
//             Specialization,
//             Experience,
//             Company_Name,
//             Company_Address,
//             Company_Phone,
//             Interview_Date,
//             Working_At,
//             Qualified,
//             Joining_Date,
//             Comments,
//             Interviewer,
//             Sal_Struct,
//             Salary,
//             Date_added,
//             TDS,
//             PAN,
//             Resigned,
//             InvoiceName,
//             IsActive,
//             IsDelete,
//             CourseId,
//             DesignExp,
//             KnowSw,
//             Working_Status,
//             TrainingCategory,
//             Interview_Status,
//             Reference_by,
//             uid,
//         ];
        
//             con.query(sql, param, (err, data) => {
//         if (err) {
//             return res.json(err);
//         } else {
//             return res.json(data);
//         }
//     });
//     }


// });