import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';

const BatchCancellation = () => {


    const [date, setDate] = useState('');

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
    const [course, SetCourse] = useState([])
    const [batch, setAnnulBatch] = useState([])
    const [vendordata, setVendorData] = useState([]);
    const [uid, setUid] = useState(null); // Set initial state to null
    const [cid, setCid] = useState(null); // Set initial state to null
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading, setLoading] = useState(true);

    const [value, setValue] = useState({
        selectcourse: '',
        batchno: '',
        student: '',
        cancellationammount: '',
        date: '',
    });

    useEffect(() => {
        if (uid) {
            setValue({
                selectcourse: uid.selectcourse || "",
                batchno: uid.batchno || "",
                student: uid.student || "",
                cancellationammount: uid.cancellationammount || "",
                date: uid.date || ""
            });
        }
    }, [uid]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!value.from_sal) {
            isValid = false;
            newErrors.from_sal = "Salary From is Required";
        }

        if (!value.to_sal) {
            isValid = false;
            newErrors.to_sal = "Salary To is Required";
        }

        if (!value.tax_price) {
            isValid = false;
            newErrors.tax_price = "Tax Rate is Required";
        }

        setError(newErrors);
        return isValid;
    };

    const getbatch = async (id) => {

        const data = {
            courseid: "id"
        }

        try {
            const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
            setAnnulBatch(res.data);

        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };


    async function getsit_eptaxmaster() {
        try {
            const res = await axios.get(`${BASE_URL}/getsit_eptaxmaster`);
            setVendorData(res.data);
            SetCourse(res.data)
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getsit_eptaxmaster();
        setError({});
        setUid(null);
    }, []);

    const handleClick = (id) => {
        setCid(id);
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };

    const handleCancel = (id) => {
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleUpdate = async (id) => {
        try {
            const data = {
                u_id: id,
                uidname: "id",
                tablename: "sit_eptaxmaster"
            }
            axios.post(`${BASE_URL}/update_data`, data)
                .then((res) => {
                    setUid(res.data[0])
                    console.log(res.data, "update")
                })
                .catch((err) => {
                    console.log(err)
                })

        } catch (err) {
            console.error(err);
        }
    };



    const handleDelete = async (id) => {
        try {
            const data = {
                delete_id: id,
                tablename: "sit_eptaxmaster",
                column_name: 'id'
            };
            axios.post(`${BASE_URL}/delete_data`, data);
            getsit_eptaxmaster();
        } catch (err) {
            console.error(err);
        }
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));


    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                selectcourse: value.selectcourse,
                batchno: value.batchno,
                student: value.student,
                cancellationammount: value.cancellationammount,
                date: value.date,
                uid: uid ? uid.id : null
            };

            try {
                await axios.post(`${BASE_URL}/add_sit_eptaxmaster`, data);
                getsit_eptaxmaster();
                alert("Data Submitted Successfully");
            } catch (err) {
                console.error(err);
            }
        }
    };

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const columns = [
        { field: 'from_sal', headerName: 'From', flex: 2 },
        { field: 'to_sal', headerName: 'To', flex: 2 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <>
                    <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleClick(params.row.id)} />
                </>
            )
        },
    ];

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
                                    <h4 class="card-title">Batch Cancellation</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class='row'>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Select Course<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.selectcourse} name='selectcourse' onChange={(e) => getbatch(e.target.value)}>
                                                    <option>--Select Course--</option>

                                                    {course.map((item) => {
                                                        return (
                                                            <option value={item.Course_Id}>{item.Course_Name}</option>
                                                        )
                                                    })}

                                                </select>
                                                {<span className='text-danger'> {error.selectcourse} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">Batch No.<span className="text-danger">*</span></label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"
                                                    value={value.batchno} name='batchno' onChange={onhandleChange}>
                                                    <option>--Select Batch--</option>

                                                    {batch.map((item) => {
                                                        return (
                                                            <option value={item.Batch_code}>{item.Batch_code}</option>
                                                        )
                                                    })}
                                                </select>
                                                {<span className='text-danger'> {error.batchno} </span>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFomrControlSelect1">Student<span className="text-danger">*</span></label>
                                                <select className='form-control form-control-lg' id="exampleFormControlSelect1"
                                                    value={value.student} name='student' onChange={onhandleChange}>
                                                    <option></option>
                                                </select>
                                                {<span className='text-danger'> {error.student} </span>}
                                            </div>


                                            <div class="form-group col-lg-3">
                                                <lable for="exampleInputUsername1">Cancellation Ammount<span className="text-danger">*</span></lable>
                                                <input text="text" class="form-control" id="exampleInputUsername1"
                                                    value={value.cancellationammount} placeholder='00.00' name='cancellationammount'
                                                    onChange={onhandleChange} />
                                                {<span className='text-danger'> {error.cancellationammount} </span>}
                                            </div>


                                            <div className="form-group col-lg-3">
                                                <label htmlFor="exampleInputUsername1">Date<span className="text-danger">*</span> </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    value={date}
                                                    name="date"
                                                    onChange={(e) => { }}
                                                    disabled
                                                />
                                                {<span className='text-danger'> {error.date} </span>}
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
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">View Batch Cancellation</h4>
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

export default BatchCancellation
