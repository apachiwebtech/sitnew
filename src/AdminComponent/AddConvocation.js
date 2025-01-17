import React, { useEffect, useState } from "react";
import InnerHeader from "./InnerHeader";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { BASE_URL } from "./BaseUrl";
import { AddCircleOutline } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from "react-router-dom";

const AddConvocation = () => {
    const { Id } = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const [batchData, setBatchData] = useState({});
    const [facultyData, setFacultyData] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState([]);
    const [errors, setErrors] = useState({})
    const [guestData, setGuestData] = useState([])
    const [deleteId, setDeleteId] = useState(null)
    const navigate = useNavigate()
    const [newGuestData, setNewGuestData] = useState([
        {
            C_Id: null,
            Id: null,
            FName: "",
            GName: "",
            Mobile_no: "",
            Email_Id: "",
        },
    ]);
    const [formState, setFormState] = useState({
        Id: null,
        Batch_Id: "",
        DateAdded: "",
    });

    useEffect(() => {
        getBatch();
        getFaculty();
    }, []);

    useEffect(()=>{
        if(formState.Batch_Id && Object.keys(batchData).length > 0){
            const batchIdSelected = formState.Batch_Id.split(',').map((batchId)=>({
                label:batchData[batchId].label, value: parseInt(batchId)
            }))
           
            setSelectedBatch(batchIdSelected)
        }
    },[formState.Batch_Id, batchData])

    const getBatch = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getbatch`);
            
            const data = response.data.reduce((acc, curr)=>
                ({
                    ...acc,
                    [curr.Batch_Id]:{
                        label:curr.Batch_code,
                        value:curr.Batch_Id
                    }
                }),{})
            
            setBatchData(data)
        } catch (err) {
            console.log(err);
        }
    };
    const getFaculty = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getfaculty`);
            setFacultyData(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(()=>{
        const id = parseInt(Id)
        if(!isNaN(id)){
            setIsEdit(true)
            getConvocation(id)
            getGuestList(id)
        }
    },[])

    const getConvocation = async(Id)=>{
        try{
            const response = await axios.get(`${BASE_URL}/getConvocation/${Id}`)
            setFormState(response.data)
        }catch(err){
            console.log(err)
        }
    }

    const getGuestList = async(Id)=>{
        try{
            const response = await axios.get(`${BASE_URL}/getGuestList/${Id}`)
            setGuestData(response.data)
        }catch(err){
            console.log(err)
        }
    }
    const handleChange = (index, e)=>{
        const updatedDate = guestData.map((item,i)=>
            i === index ? ({...item, [e.target.name]:e.target.value}): item
        )
        setGuestData(updatedDate)
    }

    const handleChangeNew = (index, e) => {
        const updatedData = newGuestData.map((item, i)=>
            i === index ? ({...item,[e.target.name]:e.target.value}): item
        );
        setNewGuestData(updatedData);
    };

    const handleDelete = (index, student)=>{
        setDeleteId(student.C_Id)
    }
    const handleDeleteConfirm = async()=>{
        try{
            await axios.post(`${BASE_URL}/new_delete_data`,{
                delete_id : deleteId,
                tablename : 'Convocation_Guest_List_Child',
                column_name : 'C_Id'
            })
            setDeleteId(null)
            getGuestList(Id)
        }catch(err){
            setDeleteId(null)
            console.log('Error deleting data', err)
            alert('Error deleting data')
        }
    }

    const handleDeleteNew = (index, student)=>{
        setNewGuestData((prev)=>prev.filter((row,i)=>i!==index))
    }

    const addNewGuest = ()=>{
        setNewGuestData((prev)=>[
            ...prev,
            {
                C_Id: null,
                Id: null,
                FName: "",
                GName: "",
                Mobile_no: "",
                Email_Id: "",
            }
        ])
    }

    const validateForm = ()=>{
        let isValid = true
        const newErrors = {}
        if(!formState.DateAdded){
            newErrors.DateAdded = "Date is required"
            isValid = false
        }
        setErrors(newErrors)
        setTimeout(()=>{
            setErrors({})
        },5000)

        return isValid
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(validateForm()){
            try{
                const Batch_Id = batchIdListString()
                const newGuests = newGuestData.filter((row)=>row.GName);
    
                if(!isEdit){
                    const response = await axios.post(`${BASE_URL}/addConvocation`,{
                        convoData:{...formState,Batch_Id},
                        newGuests
                    })
                    
                    alert('Convocation Details added successfully')
                    navigate('/convocation')
                }else{
                    const response = await axios.put(`${BASE_URL}/updateConvocation`,{
                        convoData:{...formState,Batch_Id},
                        newGuests,
                        guests:guestData
                    })
    
                    setNewGuestData([
                        {
                            C_Id: null,
                            Id: null,
                            FName: "",
                            GName: "",
                            Mobile_no: "",
                            Email_Id: "",
                        },
                    ])
                    getGuestList(Id)
                    alert('Convocation Details Updated Successfully')
                }
            }catch(err){
                console.log('Errors',err)
                alert('Error')
            }
        }
    };

    const batchIdListString = ()=>{
        return selectedBatch.map((item)=>item.value).join(',')
    }

    return (
        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <h4 className="h5" style={{ fontWeight: 600 }}>
                        Convocation Details
                    </h4>
                    <hr className="py-1"></hr>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div class="form-group col-lg-3">
                                <label htmlFor="ConvocationDateInput">
                                    Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="date"
                                    class="form-control"
                                    id="ConvocationDateInput"
                                    value={formState.DateAdded}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            DateAdded: e.target.value,
                                        }))
                                    }
                                />
                                {errors.DateAdded && (
                                    <span className="text-danger">
                                        {errors.DateAdded}
                                    </span>
                                )}
                            </div>
                            <div className="form-group col-lg-3">
                                <label htmlFor="ConvocationBatchListInput">
                                    Batch Code
                                </label>
                                <MultiSelect
                                    options={Object.values(batchData)}
                                    value={selectedBatch}
                                    onChange={setSelectedBatch}
                                    id="ConvocationBatchListInput"
                                    labelledBy="Select"
                                    name="selected"
                                    hasSelectAll={false}
                                ></MultiSelect>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table class="table table-bordered table-gen">
                                <thead>
                                    <tr>
                                        <th>Faculty Name</th>
                                        <th>Guest Name</th>
                                        <th>Guest Mobile No.</th>
                                        <th>Guest Email Id</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <GuestRows
                                        guestList={guestData}
                                        onChange={handleChange}
                                        facultyData={facultyData}
                                        onDelete={handleDelete}
                                    />
                                    <GuestRows
                                        guestList={newGuestData}
                                        onChange={handleChangeNew}
                                        facultyData={facultyData}
                                        onDelete={handleDeleteNew}
                                    />
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="d-flex justify-content-center">
                                                <button onClick={addNewGuest} type="button">
                                                    <AddCircleOutline/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className=" d-flex justify-content-end">
                            <button
                                type="submit"
                                className="btn btn-primary mr-2"
                            >
                                Save
                            </button>
                            <button type="button" className="btn btn-light">
                                Cancel
                            </button>
                        </div>
                    </form>
                    {deleteId && (
                        <div className='confirm-delete'>
                            <p>Are you sure you want to delete?</p>
                            <button type='button' onClick={() =>{ 
                                    handleDeleteConfirm()
                            }} className='btn btn-sm btn-primary'>OK</button>
                            <button type='button' onClick={()=>setDeleteId(null)} className='btn btn-sm btn-danger'>Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const GuestRows = ({ guestList, onChange, facultyData, onDelete }) => {
    return (
        <>
            {guestList.map((row, index) => (
                <tr key={index}>
                    <td>
                        <select
                            className="form-control"
                            value={row.FName !== null ? row.FName : ""}
                            name="FName"
                            onChange={(e) => onChange(index, e)}
                            style={{width:'150px'}}
                        >
                            <option value="">Select</option>
                            {facultyData.map((item, i) => {
                                return (
                                    <option key={i} value={item.Faculty_Name}>
                                        {item.Faculty_Name}
                                    </option>
                                );
                            })}
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Guest Name"
                            value={row.GName !== null ? row.GName : ""}
                            name="GName"
                            onChange={(e) => onChange(index, e)}
                            style={{width:'150px'}}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Guest Mobile"
                            value={row.Mobile_no !== null ? row.Mobile_no : ""}
                            name="Mobile_no"
                            onChange={(e) => onChange(index, e)}
                            style={{width:'150px'}}
                        />
                    </td>
                    <td>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Guest Email"
                            value={row.Email_Id !== null ? row.Email_Id : ""}
                            name="Email_Id"
                            onChange={(e) => onChange(index, e)}
                            style={{width:'150px'}}
                        />
                    </td>
                    <td>
                        <button className='' type='button' onClick={()=>onDelete(index, row)}>
                            <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
};
export default AddConvocation;
