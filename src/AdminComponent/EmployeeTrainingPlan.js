import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { useNavigate ,useParams } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
//import FormControlLabel from '@mui/material/FormControlLabel';

const EmployeeTrainingPlan = () => {


    const [Training_Dt, setDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = currentDate.getDate();
        day = day < 10 ? '0' + day : day;
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    }, []);

    const { employeetrainingplanid } = useParams();
    const [uid, setUid] = useState([])
    const [cid, setCid] = useState("")
    const [error, setError] = useState({})
    const [checked, setChecked] = React.useState([true, false]);
    const [selected, setSelected] = useState([]);
    const [employeevalue, setEmployeevalue] = useState()
    const [Emp_Id, setEmployee] = useState([])
    const navigate = useNavigate();


 
   const [value, setValue] = useState({
  Emp_Id: '' || uid.Emp_Id,
  Subject: ''|| uid.Subject,
  Inernal_By: '' || uid.Inernal_By,
  Identified_By: '' || uid.Identified_By,
});

    useEffect(() => {
        setValue({

            Subject: uid.Subject,
            Inernal_By: uid.Inernal_By,
            Identified_By: uid.Identified_By,
            Emp_Id: uid.Emp_Id,
      


        })
    }, [uid])



    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.Subject) {
            isValid = false;
            newErrors.Subject = "Subject is Required"
        }

        if(!value.Inernal_By) {
            isValid = false;
            newErrors.Inernal_By = "Internal/External is Required"
        }

        if(!value.Identified_By){
            isValid = false;
            newErrors.Identified_By = "Identified is Required"
        }

        setError(newErrors)
        return isValid
    }

const fetchEmployee = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getEmployee`);
    const formatted = res.data.map(item => ({
      label: item.Employee_Name,
      value: item.Emp_Id,
    }));
    setEmployee(formatted);
    return formatted; // return list
  } catch (err) {
    console.error(err);
    return [];
  }
};


        const handleselect = (value) => {

        setSelected(value)

        setEmployeevalue(value.map((item) => item.value).join(','))

        console.log(value.map((item) => item.value))

    }

        useEffect(() => {
    
            fetchEmployee()
            value.title = ""
            setError({})
            setUid([])
    
        }, [])


const getEmployeeDetails = () => {
    const data = {
        u_id:  employeetrainingplanid,
        uidname: "Training_Id",
        tablename: "Office_Employee_Annual_Training"
    }
    axios.post(`${BASE_URL}/new_update_data`,data)
    .then((res) => {
        setUid(res.data[0])

        const ids = res.data[0].Emp_Id
        const idArray = ids.split(',').map(Number)
        
        const formattedArray = idArray.map((id, index) => ({ label: 'select' + (index + 1), value: id }));
        setSelected(formattedArray)

        // setValue(prevState => ({
        //     ...prevState,
        //     Subject: data[0].Subject || '',
        //     Inernal_By: data[0].Inernal_By || '',
        //     Identified_By: data[0].Identified_By || '',
        // }));
        
    })
    .catch((err) => {
        console.log(err)
    })
}

    useEffect(() => {
        if (employeetrainingplanid !== ":employeetrainingplanid") {
            getEmployeeDetails()
            // setHide(true)
        }
    }, [employeetrainingplanid])

    




        
const handleSubmit = async (e) => {
  e.preventDefault();

  const selectedEmpIds = selected.map(item => item.value);

  if (selectedEmpIds.length === 0) {
    setError({ Emp_Id: "Please select at least one employee" });
    return;
  }

  setError({});

  const isEdit =
    employeetrainingplanid &&
    employeetrainingplanid !== "" &&
    employeetrainingplanid !== "0" &&
    employeetrainingplanid !== ":employeetrainingplanid";

  const payload = {
    Emp_Id: selectedEmpIds.join(","), // ✅ Always send comma-separated employee IDs
    Subject: value.Subject,
    Inernal_By: value.Inernal_By,
    Identified_By: value.Identified_By,
    Training_Dt: Training_Dt,
    Date_Added: new Date().toISOString().split("T")[0],
    ...(isEdit && { u_id: employeetrainingplanid }), // ✅ If updating, include the ID
  };

  console.log("Submitting payload:", payload); // Optional: debug log

  try {
    const response = await fetch(`${BASE_URL}/add_employeetrainingplan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (data && data.success) {
      alert(isEdit ? "Training Plan Updated Successfully!" : "Employee Training Plan Inserted Successfully!");

      setSelected([]);
      setValue({
        Subject: "",
        Inernal_By: "",
        Identified_By: "",
        u_id: "",
      });
      // Optional: reset Training_Dt
      // setTraining_Dt("");

      setError({});
         if (isEdit) {
    navigate("/employeetrainingplan");
  }
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    alert("Error occurred while submitting. Please try again.");
  }
};











    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }




    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Employee Training Plan</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Employee<span className='text-danger'>*</span> </label>
                                               <MultiSelect options={Emp_Id} value={selected}
                                                                        onChange={(value) => handleselect(value)}
                                                                        labelledBy='Select All' name="selected">
                                                                    </MultiSelect>
                                                {<span className='text-danger'> {error.Emp_Id} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Subject<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.Subject} placeholder="Subject" name='Subject' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.Subject} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Internal/External By<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.Inernal_By} placeholder="Inernal_By" name='Inernal_By' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.Inernal_By} </span>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Identified By<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.Identified_By} placeholder="Identified_By" name='Identified_By' onChange={onhandleChange} />
                                                {<span className="text-danger"> {error.Identified_By} </span>}
                                            </div>
                                            <div className="form-group col-lg-3">
                                                <label htmlFor="exampleInputUsername1">Date<span className="text-danger">*</span></label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    value={Training_Dt}
                                                    name="Training_Dt"
                                                    onChange={(e) => { }}
                                                    disabled
                                                />
                                                
                                            </div>
                                            
                                        </div>
                                    
                <button type="submit" className="btn btn-primary mr-2">
  {employeetrainingplanid && employeetrainingplanid !== '' && employeetrainingplanid !== '0' && employeetrainingplanid !== ':employeetrainingplanid'
    ? 'Update'
    : 'Submit'}
</button>



                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Back</button>





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

export default EmployeeTrainingPlan







    // async function getEmployeeDetails() {

    //     const response = await fetch(`${BASE_URL}/update_data`, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             u_id: employeetrainingplanid,
    //             tablename :"awt_employeeplan"
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });

    //     const data = await response.json();
         
    //     setUid(data[0])

    //     setValue(prevState => ({
    //         ...prevState,
    //         subject: data[0].subject,
    //         internal: data[0].internal,
    //         identified: data[0].identified,
    //         date: data[0].date,
    //     }))
    // }
    // useEffect(() => {
    //     if (employeetrainingplanid !== ":employeetrainingplanid") {
    //         getEmployeeDetails()
    //     }

    //     value.title = ""
    //     setError({})
    //     setUid([])
    // }, [])

