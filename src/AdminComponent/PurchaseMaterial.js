import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { StyledDataGrid } from "./StyledDataGrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PurchaseMaterial = () => {
    const [purchase, setpurchase] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [vendor, setVendor] = useState([]);
    const [batch, setBatch] = useState([]);
    const [course, setCourse] = useState([]);
    const [purchasematerialdata, setPurchaseMaterialData] = useState([]);
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [courseid, setCourseid] = useState("");
    const [error, setError] = useState({});
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [checked, setChecked] = React.useState([true, false]);

    const [value, setValue] = useState({
        company: "" || uid.company,
        item: "" || uid.item,
        purchase_date: "" || uid.purchase_date,
        purchase: "" || uid.purchase,
        vendor: "" || uid.vendor,
        voucherno: "" || uid.voucherno,
        purpose: "" || uid.purpose,
        requireddate: "" || uid.requireddate,
        price: "" || uid.price,
        quantity: "" || uid.quantity,
        totalamt: "" || uid.totalamt,
        purposetxt: "" || uid.purposetxt,
        batch: "" || uid.batch_id,
    });

    useEffect(() => {
        setValue({
            company: uid.company,
            item: uid.item,
            purchase_date: uid.purchase_date,
            purchase: uid.purchase,
            vendor: uid.vendor,
            voucherno: uid.voucherno,
            purpose: uid.purpose,
            requireddate: uid.requireddate,
            price: uid.price,
            quantity: uid.quantity,
            totalamt: uid.totalamt,
            purposetxt: uid.purposetxt,
            batch: "" || uid.batch_id,
        });
    }, [uid]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!value.item) {
            isValid = false;
            newErrors.item = "Item is Required";
        }
        if (!value.purchase_date) {
            isValid = false;
            newErrors.purchase_date = "Date is Required";
        }
        if (!value.requireddate) {
            isValid = false;
            newErrors.requireddate = "Date is Required";
        }
        if (!value.quantity) {
            isValid = false;
            newErrors.quantity = "Quantity is Required";
        }
        setError(newErrors);
        return isValid;
    };

    async function getPurchaseMaterial() {
        const data = {
            tablename: "awt_material_cat",
            columnname: "id,Category",
        };

        axios
            .post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                setpurchase(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function getVendor() {
        const data = {
            tablename: "awt_vendor_master",
            columnname: "id,vendorname",
        };

        axios
            .post(`${BASE_URL}/get_data`, data)
            .then((res) => {
                setVendor(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    async function getFaculty() {
        const data = {
            tablename: "faculty_master",
            columnname: "Faculty_Id,Faculty_Name",
        };

        axios
            .post(`${BASE_URL}/get_new_data`, data)
            .then((res) => {
                setFaculty(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getcourse = () => {
        const data = {
            tablename: "Course_Mst",
            columnname: "Course_Id,Course_Name",
        };

        axios
            .post(`${BASE_URL}/get_new_data`, data)
            .then((res) => {
                console.log(res.data);
                setCourse(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const getPurchase = () => {
        axios
            .get(`${BASE_URL}/getpurchase`)
            .then((res) => {
                setPurchaseMaterialData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getbatch = async (id) => {
        setCourseid(id);

        const data = {
            courseid: id,
        };

        if (id) {
            try {
                const res = await axios.post(`${BASE_URL}/getcoursewisebatch`, data);
                setBatch(res.data);
            } catch (err) {
                console.error("error fetching data:", err);
            }
        } else {
            try {
                const res = await axios.post(`${BASE_URL}/get_new_data`, {
                    tablename: "Batch_Mst",
                    columnname: "Batch_Id , Batch_code",
                });
                setBatch(res.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }
    };

    useEffect(() => {
        getFaculty();
        getcourse();
        getbatch();
        getVendor();
        getPurchase();
        getPurchaseMaterial();
        value.title = "";
        setError({});
        setUid([]);
    }, []);

    const handleClick = (id) => {
        setCid(id);
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

    const handleUpdate = (id) => {
        const data = {
            u_id: id,
            tablename: "awt_purchase_material",
        };
        axios
            .post(`${BASE_URL}/update_data`, data)
            .then((res) => {
                setUid(res.data[0]);

                console.log(res.data, "update");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = (id) => {
        const data = {
            cat_id: id,
            tablename: "awt_purchase_material",
        };

        axios
            .post(`${BASE_URL}/delete_data`, data)
            .then((res) => {
                getPurchase();
            })
            .catch((err) => {
                console.log(err);
            });

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                company: value.company,
                item: value.item,
                purchase_date: value.purchase_date,
                purchase: value.purchase,
                vendor: value.vendor,
                voucherno: value.voucherno,
                purpose: value.purpose,
                purposetxt: value.purposetxt,
                batch_id: value.batch,
                course_id: courseid,
                requireddate: value.requireddate,
                price: value.price,
                quantity: value.quantity,
                totalamt: value.totalamt,
                uid: uid.id,
            };

            axios
                .post(`${BASE_URL}/add_purchase_material`, data)
                .then((res) => {
                    console.log(res);
                    alert(res.data);

                    getPurchase();
                    setValue({
                        company: "",
                        item: "",
                        purchase_date: "",
                        purchase: "",
                        vendor: "",
                        voucherno: "",
                        purpose: "",
                        requireddate: "",
                        price: "",
                        quantity: "",
                        totalamt: "",
                        purposetxt: "",
                        batch: "",
                    });

                    setCourseid("");
                    setUid([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const columns = [
        {
            field: "index",
            headerName: "Id",
            type: "number",
            align: "center",
            headerAlign: "center",
            flex: 1,
            filterable: false,
        },
        { field: "company", headerName: "Company", flex: 2 },
        { field: "Category", headerName: "Item", flex: 2 },
        {
            field: "purchase_date",
            headerName: "Purchase Date",
            flex: 2,
            renderCell: (params) => {
              if (!params.value) return ""; // Handle empty values
          
              // Check if already in DD-MM-YYYY format
              const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
              if (ddmmyyyyRegex.test(params.value)) {
                return params.value; // Return as-is if already formatted
              }
          
              const date = new Date(params.value);
              if (isNaN(date.getTime())) return ""; // Handle invalid dates
          
              // Convert to DD-MM-YYYY format
              return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
            },
          },
          
        { field: "vendorname", headerName: "Vender", flex: 2 },
        { field: "Faculty_Name", headerName: "Who Purchased", flex: 2 },
        { field: "voucherno", headerName: "Vouchar No." },
        { field: "price", headerName: "Price", flex: 2 },
        { field: "quantity", headerName: "Quantity", flex: 2 },
        { field: "totalamt", headerName: "Total Amt", flex: 2 },

        {
            field: "actions",
            type: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />
                        <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleClick(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    const rowsWithIds = purchasematerialdata.map((row, index) => ({ index: index + 1, ...row }));

    return (
        <div class="container-fluid page-body-wrapper ">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Purchase Material</h4>
                                    <hr></hr>
                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="row">
                                            <div className="col-lg-4 borderRight">
                                                <div className="row">
                                                    <div class="form-group col-lg-6">
                                                        <label class="exampleFormControlSelect1">Company</label>
                                                        <select
                                                            class="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={value.company}
                                                            name="company"
                                                            onChange={onhandleChange}
                                                        >
                                                            <option value={``}>Select Company</option>
                                                            <option value={`suvidya`}>SUVIDYA</option>
                                                            <option value={`accent`}>ACCENT</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label class="exampleFormControlSelect1">
                                                            Item<span className="text-danger">*</span>
                                                        </label>
                                                        <select
                                                            class="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={value.item}
                                                            name="item"
                                                            onChange={onhandleChange}
                                                        >
                                                            <option>Select Item</option>
                                                            {purchase.map((item) => {
                                                                return <option value={item.id}>{item.Category}</option>;
                                                            })}
                                                        </select>
                                                        {<span className="text-danger"> {error.item} </span>}
                                                    </div>

                                                    <div className="form-group col-lg-6" style={{ display: "flex", flexDirection: "column"}}>
                                                        <label htmlFor="exampleInputUsername1">
                                                            Purchase Date <span className="text-danger">*</span>
                                                        </label>
                                                        {/* <input
                                                            type="date"
                                                            className="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.purchase_date}
                                                            name="purchase_date"
                                                            onChange={onhandleChange}
                                                        /> */}
                                                         <DatePicker
        selected={value.purchase_date}
        onChange={(date) => onhandleChange({ target: { name: "purchase_date", value: date } })}
        className="form-control"
        id="purchase_date"
        placeholderText="Select Purchase Date"
        dateFormat="dd-MM-yyyy"
        maxDate={new Date()} // Prevents future dates
      />
                                                        {<span className="text-danger"> {error.purchase_date} </span>}
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label class="exampleFormControlSelect1">Who Purchase</label>
                                                        <select
                                                            class="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={value.purchase}
                                                            name="purchase"
                                                            onChange={onhandleChange}
                                                        >
                                                            <option>Select</option>
                                                            {faculty.map((item) => {
                                                                return (
                                                                    <option value={item.Faculty_Id}>
                                                                        {item.Faculty_Name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 borderRight">
                                                <div className="row">
                                                    <div class="form-group col-lg-6">
                                                        <label class="exampleFormControlSelect1">Vendor Name</label>
                                                        <select
                                                            class="form-control form-control-lg"
                                                            id="exampleFormCorntrolSelect1"
                                                            value={value.vendor}
                                                            name="vendor"
                                                            onChange={onhandleChange}
                                                        >
                                                            <option>Select Vendor</option>
                                                            {vendor.map((item) => {
                                                                return (
                                                                    <option value={item.id}>{item.vendorname}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Voucher No</label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.voucherno}
                                                            placeholder="Voucher No"
                                                            name="voucherno"
                                                            onChange={onhandleChange}
                                                            disabled
                                                        />
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label class="exampleFormControlSelect1">Purpose</label>
                                                        <select
                                                            class="form-control form-control-lg"
                                                            id="exampleFormControlSelect1"
                                                            value={value.purpose}
                                                            name="purpose"
                                                            onChange={onhandleChange}
                                                        >
                                                            <option value={``}>Select Purpose</option>
                                                            <option value={`personal`}>Personal</option>
                                                            <option value={`batch`}>Batch</option>
                                                            <option value={`employee`}>Employee</option>
                                                            <option value={`faculty`}>Faculty</option>
                                                            <option value={`student`}>Student</option>
                                                        </select>
                                                    </div>

                                                    {value.purpose == "batch" ? (
                                                        <>
                                                            <div class="form-group col-lg-6">
                                                                <label class="exampleFormControlSelect1">Course</label>
                                                                <select
                                                                    class="form-control form-control-lg"
                                                                    id="exampleFormControlSelect1"
                                                                    value={value.course}
                                                                    name="course"
                                                                    onChange={(e) => getbatch(e.target.value)}
                                                                >
                                                                    <option value={courseid}>Select Course</option>
                                                                    {course.map((item) => {
                                                                        return (
                                                                            <option value={item.Course_Id}>
                                                                                {item.Course_Name}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </div>
                                                            <div class="form-group col-lg-6">
                                                                <label class="exampleFormControlSelect1">Batch</label>
                                                                <select
                                                                    class="form-control form-control-lg"
                                                                    id="exampleFormControlSelect1"
                                                                    value={value.batch}
                                                                    name="batch"
                                                                    onChange={onhandleChange}
                                                                >
                                                                    <option value={``}>Select Batch</option>
                                                                    {batch.map((item) => {
                                                                        return (
                                                                            <option value={item.Batch_Id}>
                                                                                {item.Batch_code}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div class="form-group col-lg-6">
                                                            <label for="exampleInputUsername1">Purpose Text</label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="exampleInputUsername1"
                                                                value={value.purposetxt}
                                                                placeholder="Enter.."
                                                                name="purposetxt"
                                                                onChange={onhandleChange}
                                                            />
                                                        </div>
                                                    )}

                                                    <div class="form-group col-lg-6" style={{ display: "flex", flexDirection: "column"}}>
                                                        <label for="exampleInputUsername1">
                                                            Required Date<span className="text-danger">*</span>
                                                        </label>
                                                        <DatePicker
        selected={value.requireddate}
        onChange={(date) => onhandleChange({ target: { name: "requireddate", value: date } })}
        className="form-control"
        id="requireddate"
        placeholderText="Select Required Date"
        dateFormat="dd-MM-yyyy"
        minDate={new Date()} // Prevents past dates
      />
                                                        {<span className="text-danger"> {error.requireddate} </span>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 ">
                                                <div className="row">
                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">
                                                            Price<span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.price}
                                                            placeholder="price"
                                                            name="price"
                                                            onChange={onhandleChange}
                                                            disabled
                                                        />
                                                        {<span className="text-danger"> {error.price} </span>}
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">
                                                            Quantity<span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.quantity}
                                                            placeholder="Quantity"
                                                            name="quantity"
                                                            onChange={onhandleChange}
                                                        />
                                                        {<span className="text-danger"> {error.quantity} </span>}
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Total Amt</label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            id="exampleInputUsername1"
                                                            value={value.totalamt}
                                                            placeholder="Total Amt"
                                                            name="totalamt"
                                                            onChange={onhandleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">
                                            Submit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                            class="btn btn-light"
                                        >
                                            Back
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div className="d-flex justify-content-between" style={{borderBottom: "2px solid #dce4ec", width: "100%"}}>
                                        <div>
                                            <h4 class="card-title">Purchase Material</h4>
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
                                            slots={{ toolbar: GridToolbar }}
                                            slotProps={{
                                                toolbar: {
                                                    showQuickFilter: true,
                                                },
                                            }}
                                        />

                                        {confirmationVisibleMap[cid] && (
                                            <div className="confirm-delete">
                                                <p>Are you sure you want to delete?</p>
                                                <button
                                                    onClick={() => handleDelete(cid)}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    OK
                                                </button>
                                                <button
                                                    onClick={() => handleCancel(cid)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* <button type="submit" class="btn btn-primary mr-2">Excel</button>
                                    <button type="submit" class="btn btn-primary mr-2">Print</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-primary mr-2">Back</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseMaterial;
