const EnquiryReport = () => {
    return (
        <div className="row mb-4">
            <div className="col-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className=" card-title">Enquiry Report</h4>
                        <div className=" d-flex flex-column p-3">
                            <div className="row text-black border border-2 border-dark text-center">
                                <div className="col border-right border-dark">New</div>
                                <div className="col border-right border-dark">In Progress</div>
                                <div className="col border-right border-dark">Admitted</div>
                                <div className=" col border-right border-dark">Lost</div>
                                <div className=" col">Total</div>
                            </div>
                            <div className="row text-black text-center">
                                <div className="col " style={{ backgroundColor: " #ffeb3b", fontWeight: 500 }}>
                                    10
                                </div>
                                <div className="col" style={{ backgroundColor: "#ff9800", fontWeight: 500 }}>
                                    15
                                </div>
                                <div className="col" style={{ backgroundColor: "#76ff03", fontWeight: 500 }}>
                                    5
                                </div>
                                <div className=" col" style={{ backgroundColor: "#f44336", fontWeight: 500 }}>
                                    20
                                </div>
                                <div className=" col" style={{ fontWeight: 500 }}>
                                    12
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiryReport;
