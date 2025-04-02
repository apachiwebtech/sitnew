import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { BASE_URL } from "./BaseUrl";
import { useEffect, useState } from "react";

const AnnualTargetsListing = () => {
    const [annualTargetsList, setAnnualTargetsList] = useState([]);

    useEffect(() => {
        getAnnualTargets();
    }, []);

    const getAnnualTargets = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/getAnnualTargets`, {
                date: "2024-%",
            });

            const data = response.data.map((row) => ({
                ...row,
                Students_Target: Math.floor(Math.random() * 101) + 50,
            }));
            console.log(data);
            setAnnualTargetsList(data);
        } catch (err) {
            console.log("getAnnualTargets err", err);
        }
    };

    const columns = [
        {
            field: "Program_Name",
            headerName: "Training Program Name",
            width: 210,
            valueGetter: (params) => `${params.row.Course_Name}-${params.row.Category}`,
        },
        {
            field: "Duration",
            headerName: "Duration of Program",

            width: 150,
        },
        {
            field: "Program_Fees",
            headerName: "Training Program Fees",
            width: 170,
        },
        {
            field: "Frequency_Conducted",
            headerName: "Frequency Conducted",
            width: 150,
        },
        {
            field: "Target_Frequency",
            headerName: "Target Frequency of Batches in Year",
            width: 170,
        },
        {
            field: "Min_Students",
            headerName: "Min. No. of Students per Batch",
            width: 150,
        },
        {
            field: "Students_Admitted",
            headerName: "Students Admitted (Yearly)",
            width: 130,
        },
        {
            field: "Students_Target",
            headerName: "Yearly Students Target",
            width: 130,
        },
        {
            field: "Sparkline",
            headerName: "Sparkline",
            width: 120,
            renderCell: (params) => {
                const { Students_Target, Students_Admitted } = params.row;
                const percentage = Students_Target > 0 ? (Students_Admitted / Students_Target) * 100 : 100;

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
        {
            field: "Fees_Collected",
            headerName: "Fees Collected (₹)",
            width: 120,
        },
        {
            field: "Fees_Target",
            headerName: "Fees Target",
            width: 120,
        },
        // {
        //     field: "Sparkline",
        //     headerName: "Sparkline",
        //     width: 120,
        // },
    ];

    return (
        <div className="row mb-4">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Annual Targets </h4>
                        <div className="custom-header">
                            <DataGrid
                                rows={annualTargetsList}
                                columns={columns}
                                rowHeight={35}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
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
                                getRowId={(row, index) => `${row.Course_Name}-${row.Category}`}
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

export default AnnualTargetsListing;
