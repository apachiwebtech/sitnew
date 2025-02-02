import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { BASE_URL } from "./BaseUrl";
import { useEffect, useState } from "react";

const UpcomingBatchesListing = () => {
    const [upcomingBatchList, setUpcomingBatchList] = useState([]);

    useEffect(() => {
        getUpcomingBatches();
    }, []);

    const getUpcomingBatches = async () => {
        try {
            const currentDate = new Date();

            const response = await axios.post(`${BASE_URL}/getUpcomingBatch`, {
                date: currentDate.toISOString().split("T")[0],
            });

            setUpcomingBatchList(response.data);
        } catch (err) {
            console.log("getUpcomingBatches err", err);
        }
    };

    const columns = [
        { field: "Course_Name", headerName: "Training Program Name", width: 210 },
        {
            field: "Batch_code",
            headerName: "Batch Number",
            width: 120,
        },
        {
            field: "SDate",
            headerName: "Start Date",
            width: 120,
        },
        {
            field: "EDate",
            headerName: "End Date",
            width: 120,
        },
        {
            field: "Min_Students",
            headerName: "Min. No. of Students per Batch",
            width: 120,
        },
        {
            field: "NoStudent",
            headerName: "Students Admitted ",
            width: 100,
        },
        {
            field: "Percentage_Filled",
            headerName: "Percentage Filled",
            width: 120,
        },
        {
            field: "Sparkline",
            headerName: "Sparkline",
            width: 120,
        },
    ];

    return (
        <div className="row mb-4">
            <div className="col-8">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Upcoming Batches</h4>
                        <div className="custom-header">
                            <DataGrid
                                rows={upcomingBatchList}
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

export default UpcomingBatchesListing;
