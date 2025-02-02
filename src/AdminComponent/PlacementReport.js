import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { BASE_URL } from "./BaseUrl";
import { useEffect, useState } from "react";

const PlacementReport = () => {
    const [placementReportList, setPlacementReportList] = useState([]);

    useEffect(() => {
        getPlacementReport();
    }, []);

    const getPlacementReport = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/getPlacementData`);
            setPlacementReportList(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const columns = [
        {
            field: "Batch_code",
            headerName: "Batch Number",
            width: 120,
        },
        { field: "Course_Name", headerName: "Training Program Name", width: 210 },
        {
            field: "NoStudent",
            headerName: "Total Students in Batch",
            width: 100,
        },
        {
            field: "Placement",
            headerName: "Students Placed",
            width: 100,
        },
        {
            field: "Sparkline",
            headerName: "Sparkline",
            width: 120,
            renderCell: (params) => {
                const { NoStudent, Placement } = params.row;
                const percentage = NoStudent && Placement ? (Placement / NoStudent) * 100 : 0;

                return (
                    <div
                        style={{
                            width: "100%",
                            height: "20px",
                            backgroundColor: "lightgray",
                        }}
                    >
                        <div
                            style={{
                                width: `${Math.min(percentage, 100)}%`,
                                height: "100%",
                                backgroundColor: "green",
                            }}
                        ></div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="row mt-4">
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Placement Report</h4>
                        <div className="custom-header">
                            <DataGrid
                                rows={placementReportList}
                                columns={columns}
                                rowHeight={35}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                sx={{
                                    "& .MuiDataGrid-columnHeaderTitle": {
                                        whiteSpace: "normal",
                                        lineHeight: "normal",
                                    },
                                    "& .MuiDataGrid-columnHeader": {
                                        height: "unset !important",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        maxHeight: "175px !important",
                                    },
                                    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                                        height: 5, // Thin scrollbar
                                    },
                                    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
                                        backgroundColor: "rgba(0, 0, 0, 0.1)", // Scrollbar thumb color
                                        borderRadius: 10,
                                    },
                                    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.4)", // Darker on hover
                                    },
                                    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
                                        background: "transparent", // Transparent track
                                    },
                                }}
                                // className="hide-scrollbar"
                                getRowId={(row) => row.Batch_Id}
                                pageSizeOptions={[5]}
                                disableColumnFilter
                                disableColumnSelector
                                disableDensitySelector
                                disableColumnMenu
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementReport;
