import React, { useEffect, useState } from "react";
import InnerHeader from "./InnerHeader";

const AddShortlistedBySIT = () => {
    return (
        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div className="table-responsive">
                        <table class="table table-bordered table-gen">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Batch Code</th>
                                    <th>View CV</th>
                                    <th>CV Update Date</th>
                                    <th>SIT Result</th>
                                    <th>SIT Remark</th>
                                    <th>Notification</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Vinaykumar S Mashihanchinal</td>
                                    <td>01119</td>
                                    <td>Vinaykumar S Mashihanchinal.txt</td>
                                    <td>19 Nov 15</td>
                                    <td>
                                        <select className="form-control">
                                            <option value="">--Select--</option>
                                            <option>Shortlisted</option>
                                            <option>Rejected</option>
                                        </select>
                                    </td>
                                    <td>
                                        <textarea
                                            placeholder="SIT Remark"
                                            className="form-control"
                                            style={{ width: "150px" }}
                                        ></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddShortlistedBySIT;
