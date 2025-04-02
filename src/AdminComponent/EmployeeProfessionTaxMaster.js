import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';
import { StyledDataGrid } from "./StyledDataGrid";

const EmployeeProfessionTaxMaster = () => {

    const [vendordata, setVendorData] = useState([]);
    const [uid, setUid] = useState(null); // Set initial state to null
    const [cid, setCid] = useState(null); // Set initial state to null
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loading, setLoading] = useState(true);

    const [value, setValue] = useState({
        from_sal: "",
        to_sal: "",
        tax_price: "",
        sep_mnth: "",
        sep_tax_price: ""
    });

    useEffect(() => {
        if (uid) {
            setValue({
                from_sal: uid.from_sal || "",
                to_sal: uid.to_sal || "",
                tax_price: uid.tax_price || "",
                sep_mnth: uid.sep_mnth || "",
                sep_tax_price: uid.sep_tax_price || ""
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

    async function getsit_eptaxmaster() {
        try {
            const res = await axios.get(`${BASE_URL}/getsit_eptaxmaster`);
            setVendorData(res.data);
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
            .then ((res) => {
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
        const data = {
                cat_id: id,
                tablename: "sit_eptaxmaster",
            };
            axios.post(`${BASE_URL}/delete_data`, data)
            .then((res)=>{

                getsit_eptaxmaster();

                setConfirmationVisibleMap((prevMap) => ({
                    ...prevMap,
                    [id]: false,
                }));
            })
        
          

       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                from_sal: value.from_sal,
                to_sal: value.to_sal,
                tax_price: value.tax_price,
                sep_mnth: value.sep_mnth,
                sep_tax_price: value.sep_tax_price,
                uid: uid ? uid.id : null
            };

            try {
                await axios.post(`${BASE_URL}/add_sit_eptaxmaster`, data);

                setValue({
                    from_sal:"",
                    to_sal:"",
                    tax_price:"",
                    sep_mnth:"",
                    sep_tax_price:"",
                })
                setUid([])
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

    const months = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' }
    ];

    const columns = [
        { field: 'index', headerName: 'Id', type: 'number', align: 'center', headerAlign: 'center', flex: 1, filterable: false },
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
        <div className="container-fluid page-body-wrapper ">
            <InnerHeader />

            {loading && <Loader />}

            <div className="main-panel" style={{ display: loading ? "none" : "block" }}>
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-5 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add Employee Profession Tax Master</h4>
                                    <hr />
                                    <form className="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="from_sal">Salary From<span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id="from_sal"
                                                    value={value.from_sal} placeholder="Salary From*" name='from_sal' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.from_sal}</span>}
                                            </div>

                                            <div className="form-group col-lg-12">
                                                <label htmlFor="to_sal">Salary To <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id="to_sal"
                                                    value={value.to_sal} placeholder="Salary To" name='to_sal' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.to_sal}</span>}
                                            </div>

                                            <div className="form-group col-lg-12">
                                                <label htmlFor="tax_price">Tax Rate<span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="tax_price"
                                                    value={value.tax_price} placeholder="Tax Rate*" name='tax_price' onChange={onhandleChange} />
                                                {<span className='text-danger'>{error.tax_price}</span>}
                                            </div>

                                            <div className="form-group col-lg-12">
                                                <label htmlFor="sep_mnth">Separate Month</label>
                                                <select className="form-control" id="sep_mnth" value={value.sep_mnth}
                                                    name='sep_mnth' onChange={onhandleChange}>
                                                    <option value="">Select Months</option>
                                                    {months.map((month) => (
                                                        <option key={month.value} value={month.value}>
                                                            {month.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group col-lg-12">
                                                <label htmlFor="sep_tax_price">Separated Tax Rate</label>
                                                <input type="text" className="form-control" id="sep_tax_price" value={value.sep_tax_price}
                                                    placeholder="Separated Tax Rate" name='sep_tax_price' onChange={onhandleChange} />
                                            </div>

                                            <h6 className="text-title">
                                                <span className="text-danger">Notes: </span> Select Separated month only when there is a
                                                change in tax rate for any particular month.
                                            </h6>
                                        </div>

                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => window.location.reload()} className="btn btn-light">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between' style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 className="card-title">Employee Profession Tax Master</h4>
                                        </div>
                                    </div>

                                    <div style={ { borderLeft: "1px solid #dce4ec", height: "510px", overflow: "scroll"}}>
                                        <StyledDataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            rowHeight={35}
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 50, page: 0 },
                                                },
                                            }}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeProfessionTaxMaster;
