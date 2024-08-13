import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InnerHeader from './InnerHeader';


const TaskManagement = () => {

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


    const rowsWithIds = vendordata.map((row, index) => ({ index: index + 1, ...row }));

    return (


        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                    <h4 class="card-title">Task Management</h4>
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">


                                <div className='container-fluid'>
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <Link to="/addtasktemplate"><h4> ● Add Task Template</h4></Link>
                                                    </div>

                                                    <div>
                                                        <Link to="/taskadd"><h4> ● Add Task</h4></Link>
                                                    </div>

                                                    <div>
                                                        <Link to="/AddChecklist"><h4> ● Add Checklist</h4></Link>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='row justify-content-center' >
                                                <div className='p-3' style={{ width: "100%" }}>
                                                    <div>
                                                        <Link to="/searchedittasktemplate"> <h4> ● Search / Edit Task Template </h4></Link>
                                                    </div>

                                                    <div>
                                                       <Link to="/searchedittask"><h4> ● Search / Edit Task</h4></Link>
                                                    </div>

                                                    <div>
                                                        <Link to="/searcheditchecklist"><h4> ● Search / Edit Checklist </h4></Link>
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

export default TaskManagement
