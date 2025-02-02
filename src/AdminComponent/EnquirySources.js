import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import chroma from "chroma-js";
import { BASE_URL } from "./BaseUrl";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const EnquirySources = () => {
    const [EnquirySources, setEnquirySources] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [batchList, setBatchList] = useState([]);
    const [filterState, setFilterState] = useState({
        Course_Id: "",
        Batch_Code: "",
    });

    const colors = chroma.scale("Paired").colors(EnquirySources.length);

    const total = EnquirySources.reduce((acc, curr) => {
        return acc + curr.count;
    }, 0);

    useEffect(() => {
        getCourseList();
    }, []);

    useEffect(() => {
        const courseId = filterState.Course_Id;
        setBatchList([]);
        setEnquirySources([]);
        if (courseId) {
            getBatchCodeList(courseId);
        }
    }, [filterState.Course_Id]);

    useEffect(() => {
        const Course_Id = filterState.Course_Id;
        const Batch_Code = filterState.Batch_Code;

        setEnquirySources([]);
        if (Course_Id && Batch_Code) {
            getEnquiryData(Course_Id, Batch_Code);
        }
    }, [filterState.Batch_Code]);

    async function getCourseList() {
        axios
            .get(`${BASE_URL}/getCourse`)
            .then((res) => {
                setCourseList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function getBatchCodeList(id) {
        axios
            .post(`${BASE_URL}/getcoursewisebatch`, {
                courseid: id,
            })
            .then((res) => {
                setBatchList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getEnquiryData = async (Course_Id, Batch_Code) => {
        try {
            if (Batch_Code.startsWith("0")) {
                Batch_Code = Batch_Code.slice(1);
            }

            const response = await axios.post(`${BASE_URL}/getEnquirySources`, {
                Course_Id,
                Batch_Code,
            });

            setEnquirySources(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const data = {
        labels: EnquirySources.map((item) => item.Enquiry_Source || "unknown"),
        datasets: [
            {
                label: "Enquiry count",
                data: EnquirySources.map((item) => item.count),
                backgroundColor: colors,
                borderWidth: 0.5,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "right",
                align: "center",
            },
            datalabels: {
                anchor: "center",
                align: "end",

                formatter: (value) => {
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`; // Show percentages
                },
                color: "#000", // Label color
                font: {
                    weight: "medium",
                    size: 12,
                },
            },
        },
        maintainAspectRatio: false,
    };

    const handleChange = (e) => {
        setFilterState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-body d-flex flex-column" style={{ maxHeight: "600px" }}>
                        <div className="row">
                            <div className="col-4 form-group">
                                <label htmlFor="selectCourseInput">Course</label>
                                <select
                                    className="form-control"
                                    id="selectCourseInput"
                                    name="Course_Id"
                                    onChange={handleChange}
                                >
                                    <option value="">--Select Course--</option>
                                    {courseList.map((item, index) => (
                                        <option key={index} value={item.Course_Id}>
                                            {item.Course_Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4 form-group">
                                <label htmlFor="selectBatchInput">Batch</label>
                                <select
                                    className="form-control"
                                    id="selectBatchInput"
                                    name="Batch_Code"
                                    onChange={handleChange}
                                >
                                    <option value="">--Select Batch--</option>
                                    {batchList.map((item, index) => (
                                        <option key={index} value={item.Batch_code}>
                                            {item.Batch_code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ position: "relative", height: "50vh" }}>
                            <Pie data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquirySources;
