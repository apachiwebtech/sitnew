import React, { useEffect, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import axios from "axios";

Font.register({
    family: "Helvetica",
    fonts: [
        { fontWeight: "normal" }, // Default Helvetica
        { fontWeight: "bold" }, // Bold Helvetica
    ],
});

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    header: {
        textAlign: "left",
        fontSize: 12,
        fontFamily: "Helvetica",
        fontWeight: "bold",
        marginBottom: 10,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        borderStyle: "solid",
        borderWidth: 1,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        minHeight: 40,
    },
    tableCol1: {
        borderStyle: "solid",
        borderWidth: 1,
        // borderBottomWidth:0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        minHeight: 40,
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
    },
    tableCellr: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
        // transform: 'rotate(-20deg)',
    },
    tableCellBlank: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
        color: "#CCCCCC",
    },
    innerTable: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    innerTableRow: {
        flexDirection: "row",
    },
    innerTableCol: {
        width: "33.33%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        minHeight: 20,
    },
    footer: {
        fontSize: 10,
        textAlign: "center",
        marginTop: 20,
    },
    sectionTitle: {
        textAlign: "center",
        fontSize: 10,
        marginBottom: 4,
        marginTop: 4,
        fontWeight: "bold",
    },
    reportTitle: {
        textAlign: "center",
        fontSize: 12,
        paddingTop: "8px",
        paddingBottom: "8px",
        borderStyle: "solid",
        borderWidth: "1.5px",
        marginBottom: "10px",
    },
});

const TestDocument = ({ data }) => {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     downloadPDF(908);
    // }, []);

    // async function downloadPDF(id) {
    //     axios
    //         .post(`${BASE_URL}/getfinalreport`, { Batch_Id: id })
    //         .then((res) => {
    //             console.log(res.data);
    //             setData(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    return (
        <Document>
            <Page size="A3" orientation="landscape" style={styles.page}>
                {/* Header Section */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1px",
                    }}
                >
                    <Image src={`/sitLogo.jpg`} style={{ width: "70px" }}></Image>
                </View>
                <View style={styles.header}>
                    <Text>Suvidya Institute of Technology Pvt. Ltd.</Text>
                    {/* <Text>REPORT OF FINAL EXAMINATION</Text> */}
                </View>
                <View style={styles.reportTitle}>
                    <Text>REPORT OF FINAL EXAMINATION</Text>
                </View>
                <View
                    style={{
                        borderStyle: "solid",
                        borderWidth: "1.5px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        display: "flex",
                        flexDirection: "row",
                        paddingHorizontal: "20px",
                        marginBottom: "10px",
                    }}
                >
                    <View style={{ display: "flex", flexDirection: "row", flexGrow: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: 12 }}>Training Programme: </Text>
                        <Text style={{ fontSize: 10 }}>Electrical System Design</Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: 1,
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <Text style={{ fontSize: 12 }}>Batch No.</Text>
                        <Text style={{ fontSize: 10 }}>09065</Text>
                    </View>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid black",
                        marginBottom: "10px",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            borderBottom: "1px solid black",
                        }}
                    >
                        <View style={{ padding: 5, borderRight: "1px solid black", width: "2%" }}>
                            <Text style={{ fontSize: 10, margin: "auto" }}>Sr. No.</Text>
                        </View>
                        <View style={{ padding: 5, borderRight: "1px solid black", width: "6%" }}>
                            <Text style={{ fontSize: 10, margin: "auto" }}>Student Id</Text>
                        </View>
                        <View style={{ padding: 5, borderRight: "1px solid black", width: "12%" }}>
                            <Text style={{ fontSize: 10, marginVertical: "auto", marginHorizontal: "auto" }}>Name</Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "20%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <View style={{ borderBottom: "1px solid black", paddingVertical: 3, flexGrow: 1 }}>
                                <Text style={{ fontSize: 10, margin: "auto" }}>Unit Test Marks</Text>
                            </View>
                            <View style={{ borderBottom: "1px solid black", display: "flex", flexDirection: "row" }}>
                                {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
                                    <View
                                        key={index}
                                        style={{
                                            ...(index !== 10 ? { borderRight: "1px solid black" } : {}),
                                            // flexGrow: 1,
                                            width: 30,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: 1,
                                            minHeight: 13,
                                        }}
                                    >
                                        <Text style={{ fontSize: 10, textAlign: "right" }}>
                                            {data.length
                                                ? data[0][`Test${index}_Max`]
                                                    ? data[0][`Test${index}_Max`]
                                                    : ""
                                                : ""}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            <View style={{ borderBottom: "1px solid black", paddingVertical: 3, flexGrow: 1 }}>
                                <Text style={{ fontSize: 10, margin: "auto" }}>Marks Obtained</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
                                    <View
                                        key={index}
                                        style={{
                                            ...(index !== 10 ? { borderRight: "1px solid black" } : {}),
                                            width: 30,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 1,
                                            minHeight: 13,
                                        }}
                                    >
                                        <Text style={{ fontSize: 10, textAlign: "right" }}>
                                            {data.length ? (data[0][`Test${index}_Max`] ? `U${index}` : "") : ""}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ padding: 5, borderRight: "1px solid black", width: "2.5%" }}>
                            <View style={{ flexDirection: "column", alignItems: "center",justifyContent:"center" }}>
                                {"Average".split("").map((letter, index) => (
                                    <Text key={index} style={{ fontSize: 9, }}>
                                        {letter}
                                    </Text>
                                ))}
                            </View>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "20%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <View style={{ borderBottom: "1px solid black", paddingVertical: 3, flexGrow: 1 }}>
                                <Text style={{ fontSize: 10, margin: "auto" }}>Assignment Marks</Text>
                            </View>
                            <View style={{ borderBottom: "1px solid black", display: "flex", flexDirection: "row" }}>
                                {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
                                    <View
                                        key={index}
                                        style={{
                                            ...(index !== 10 ? { borderRight: "1px solid black" } : {}),
                                            width: 30,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: 1,
                                            minHeight: 13,
                                        }}
                                    >
                                        <Text style={{ fontSize: 10, textAlign: "right" }}>
                                            {data.length
                                                ? data[0][`Ass${index}_Max`]
                                                    ? data[0][`Ass${index}_Max`]
                                                    : ""
                                                : ""}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            <View style={{ borderBottom: "1px solid black", paddingVertical: 3, flexGrow: 1 }}>
                                <Text style={{ fontSize: 10, margin: "auto" }}>Marks Obtained</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
                                    <View
                                        key={index}
                                        style={{
                                            ...(index !== 10 ? { borderRight: "1px solid black" } : {}),
                                            // flexGrow: 1,
                                            width: 30,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 1,
                                            minHeight: 13,
                                        }}
                                    >
                                        <Text style={{ fontSize: 10, textAlign: "right" }}>
                                            {data.length ? (data[0][`Ass${index}_Max`] ? `A${index}` : "") : ""}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ justifyContent:"center", alignItems:"center", borderRight: "1px solid black", width: "2.5%" }}>
                            <View style={{ flexDirection: "column", justifyContent:'center' }}>
                                {"Average".split("").map((letter, index) => (
                                    <Text key={index} style={{ fontSize: 9, }}>
                                        {letter}
                                    </Text>
                                ))}
                            </View>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "7%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <View style={{ borderBottom: "1px solid black", paddingVertical: 3, flexGrow: 1 }}>
                                <Text style={{ fontSize: 10, margin: "auto" }}>Final Exam</Text>
                            </View>
                            <View style={{ borderBottom: "1px solid black", display: "flex", flexDirection: "row" }}>
                                {Array.from({ length: 3 }, (_, index) => index + 1).map((index) => (
                                    <View
                                        key={index}
                                        style={{
                                            ...(index !== 3 ? { borderRight: "1px solid black" } : {}),
                                            width: 30,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: 1,
                                            minHeight: 13,
                                        }}
                                    >
                                        <Text style={{ fontSize: 10, textAlign: "right" }}>
                                            {data.length
                                                ? data[0][`Final${index}_Max`]
                                                    ? data[0][`Final${index}_Max`]
                                                    : ""
                                                : ""}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            <View style={{ borderBottom: "1px solid black", paddingVertical: 3, flexGrow: 1 }}>
                                <Text style={{ fontSize: 10, margin: "auto" }}>Marks Obtained</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                {Array.from({ length: 3 }, (_, index) => index + 1).map((index) => (
                                    <View
                                        key={index}
                                        style={{
                                            ...(index !== 3 ? { borderRight: "1px solid black" } : {}),
                                            // flexGrow: 1,
                                            width: 30,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 1,
                                            minHeight: 13,
                                        }}
                                    >
                                        <Text style={{ fontSize: 10, textAlign: "right" }}>{index}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ alignItems:"center",justifyContent:"center", borderRight: "1px solid black", width: "2.5%" }}>
                            <View style={{ flexDirection: "row", gap: "5px" }}>
                                <View style={{ flexDirection: "column", alignItems: "center" }}>
                                    {"Final".split("").map((letter, index) => (
                                        <Text key={index} style={{ fontSize: 9 }}>
                                            {letter}
                                        </Text>
                                    ))}
                                </View>
                                <View style={{ alignItems:"center",justifyContent:"center", flexDirection: "column", width: "2.5%" }}>
                                    {"Average".split("").map((letter, index) => (
                                        <Text key={index} style={{ fontSize: 9,alignSelf:"center", }}>
                                            {letter}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                display: "flex",
                                width: "3.2%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "8px",
                                    transform: "rotate(270deg)",
                                    margin: "auto",
                                }}
                            >
                                Discipline
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                display: "flex",
                                width: "3.8%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "8px",
                                    transform: "rotate(270deg)",
                                    margin: "auto",
                                }}
                            >
                                Attendance
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                display: "flex",
                                width: "3.4%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "8px",
                                    transform: "rotate(270deg)",
                                    margin: "auto",
                                }}
                            >
                                Absent{"(%)"}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                display: "flex",
                                width: "3.4%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "8px",
                                    transform: "rotate(270deg)",
                                    margin: "auto",
                                }}
                            >
                                Absent days
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                display: "flex",
                                width: "3.4%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "8px",
                                    transform: "rotate(270deg)",
                                    margin: "auto",
                                }}
                            >
                                FullAttendance
                            </Text>
                        </View>
                        <View style={{ padding: 5, borderRight: "1px solid black", width: "4%" }}>
                            <Text style={{ fontSize: 10, margin: "auto" }}>Final Total %</Text>
                        </View>
                        <View style={{ padding: 5, width: "8%" }}>
                            <Text style={{ fontSize: 10, margin: "auto" }}>Class Obtained</Text>
                        </View>
                    </View>
                    {data.length &&
                        data.map((item, index) => (
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    borderBottom: "1px solid black",
                                }}
                                key={index}
                            >
                                <View style={{ alignItems:"center",justifyContent:"center", borderRight: "1px solid black", width: "1.95%" }}>
                                    <Text style={{ fontSize: 9, margin: "auto" }}>{index + 1}</Text>
                                </View>
                                <View style={{ alignItems:"center",justifyContent:"center", borderRight: "1px solid black", width: "5.85%" }}>
                                    <Text style={{ fontSize: 9, marginVertical: "auto" }}>{item.Student_Code}</Text>
                                </View>
                                <View style={{ padding:5, borderRight: "1px solid black", width: "11.7%" }}>
                                    <Text style={{ fontSize: 10, marginVertical: "auto", textAlign: "left" }}>
                                        {item.Student_Name}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        borderRight: "1px solid black",
                                        width: "19.5%",
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
                                        <View
                                            key={index}
                                            style={{
                                                ...(index !== 10 ? { borderRight: "1px solid black" } : {}),
                                                width: 32,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: 1,
                                                minHeight: 13,
                                                height: "100%",
                                            }}
                                        >
                                            <Text style={{ fontSize: 9, textAlign: "right" }}>
                                                {item[`Test${index}_Given`] || ""}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={{ alignItems:"center",justifyContent:"center", borderRight: "1px solid black", width: "2.45%" }}>
                                    <Text style={{ fontSize: 9, textAlign:"center" }}>{item.Test_Percent}</Text>
                                </View>
                                <View
                                    style={{
                                        borderRight: "1px solid black",
                                        width: "19.5%",
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
                                        <View
                                            key={index}
                                            style={{
                                                ...(index !== 10 ? { borderRight: "1px solid black" } : {}),
                                                width: 30,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                minHeight: 13,
                                                height: "100%",
                                            }}
                                        >
                                            <Text style={{ fontSize: 9, textAlign: "right" }}>
                                                {item[`Ass${index}_Given`] || ""}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={{ alignItems:"center",justifyContent:"center", borderRight: "1px solid black", width: "2.45%" }}>
                                    <Text style={{ fontSize: 9,textAlign:'center' }}>{item.Ass_Percent}</Text>
                                </View>
                                <View
                                    style={{
                                        borderRight: "1px solid black",
                                        width: "6.85%",
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    {Array.from({ length: 3 }, (_, index) => index + 1).map((index) => (
                                        <View
                                            key={index}
                                            style={{
                                                ...(index !== 3 ? { borderRight: "1px solid black" } : {}),
                                                // flexGrow: 1,
                                                width: 30,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: 1,
                                                minHeight: 13,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9, textAlign: "right" }}>
                                                {item[`Final${index}_Given`] || ""}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={{alignItems:"center",justifyContent:"center", borderRight: "1px solid black", width: "2.42%" }}>
                                    <Text style={{ fontSize: 9,textAlign:"center" }}>{item.Final_Percent}</Text>
                                </View>
                                <View
                                    style={{
                                        
                                        borderRight: "1px solid black",
                                        width: "3.1%",
                                        alignItems:"center",justifyContent:"center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}>{item.Discipline}</Text>
                                </View>
                                <View
                                    style={{
                                        
                                        borderRight: "1px solid black",
                                        width: "3.75%",alignItems:"center",justifyContent:"center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9 }}>{item.Full_Attend}</Text>
                                </View>
                                <View
                                    style={{
                                        alignItems:"center",justifyContent:"center",
                                        borderRight: "1px solid black",
                                        width: "3.3%",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}>0</Text>
                                </View>
                                <View
                                    style={{
                                        alignItems:"center",justifyContent:"center",
                                        borderRight: "1px solid black",
                                        width: "3.3%",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}>{item.Absents}</Text>
                                </View>
                                <View
                                    style={{
                                        alignItems:"center",justifyContent:"center",
                                        borderRight: "1px solid black",
                                        width: "3.32%",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}>{item.Full_Attendance}</Text>
                                </View>
                                <View
                                    style={{
                                        alignItems:"center",justifyContent:"center",
                                        borderRight: "1px solid black",
                                        width: "3.92%",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}>
                                        {item.Final_Result_Percent}
                                    </Text>
                                </View>
                                <View style={{ width: "7.8%" }}>
                                    <Text style={{ fontSize: 9, margin: "auto" }}>
                                        {item.Grade ? item.Grade : "NO CERTIFICATE"}
                                    </Text>
                                </View>
                            </View>
                        ))}

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 5,
                            paddingVertical: 3,
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 10 }}>PASSING CRITERIA</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 10 }}>90.00% To 100.00% - A+</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 10 }}>80.00% To 89.99% - A</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 10 }}>70.00% To 79.99% - B+</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 10 }}>60.00% To 69.99% - B</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 10 }}>50.00% To 59.99% - C</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 10 }}>0.00% To 49.99% - NO CERTIFICATE</Text>
                        </View>
                    </View>
                </View>
                {/*  
                <View style={styles.table}>
                   
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: "5%" }]}>
                            <Text style={styles.tableCell}>Sr. No.</Text>
                        </View>
                        <View style={[styles.tableCol, { width: "5%" }]}>
                            <Text style={styles.tableCell}>Student ID</Text>
                        </View>
                        <View style={[styles.tableCol, { width: "10%" }]}>
                            <Text style={styles.tableCell}>Name</Text>
                        </View>

      
                        <View style={[styles.tableCol, { width: "25%" }]}>
                            <Text style={styles.sectionTitle}>Unit Test Marks</Text>
                            <View style={styles.innerTable}>
                                <View style={styles.innerTableRow}>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                       
                        <View style={[styles.tableCol, { width: "2%" }]}>
                            <Text
                                style={[
                                    styles.sectionTitle,
                                    { borderBottom: "0", position: "relative", top: 10, transform: "rotate(90deg)" },
                                ]}
                            >
                                Average
                            </Text>
                        </View>

                  
                        <View style={[styles.tableCol, { width: "25%" }]}>
                            <Text style={styles.sectionTitle}>Assignment Marks</Text>
                            <View style={styles.innerTable}>
                                <View style={styles.innerTableRow}>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                  
                        <View style={[styles.tableCol, { width: "2%" }]}>
                            <Text
                                style={[
                                    styles.sectionTitle,
                                    { borderBottom: "0", position: "relative", top: 10, transform: "rotate(90deg)" },
                                ]}
                            >
                                Average
                            </Text>
                        </View>

                      
                        <View style={[styles.tableCol, { width: "10%" }]}>
                            <Text style={styles.sectionTitle}>Final Exam</Text>
                            <View style={styles.innerTable}>
                                <View style={styles.innerTableRow}>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.tableCol, { width: "5%" }]}>
                            <Text
                                style={[
                                    styles.tableCellr,
                                    { transform: "rotate(270deg)", position: "relative", top: "50%" },
                                ]}
                            >
                                Discipline
                            </Text>
                        </View>
                        <View style={[styles.tableCol, { width: "5%" }]}>
                            <Text style={styles.tableCellr}>Attendance</Text>
                        </View>
                        <View style={[styles.tableCol, { width: "5%" }]}>
                            <Text style={styles.tableCellr}>Absent (%)</Text>
                        </View>
                        <View style={[styles.tableCol, { width: "5%" }]}>
                            <Text style={styles.tableCellr}>Absent days</Text>
                        </View>
                        <View style={[styles.tableCol, { width: "5%" }]}>
                            <Text style={styles.tableCellr}>FullAttendanc</Text>
                        </View>
                        <View style={[styles.tableCol, { width: "5%" }]}>
                            <Text style={styles.tableCellr}>Final Total %</Text>
                        </View>
                        <View style={[styles.tableCol, { width: "5%" }]}>
                            <Text style={styles.tableCellr}>Class Obtained</Text>
                        </View>
                    </View>

                 
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol1, { width: "5%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>
                        <View style={[styles.tableCol1, { width: "5%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>
                        <View style={[styles.tableCol1, { width: "10%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>

                        <View style={[styles.tableCol1, { width: "25%" }]}>
                            <Text style={styles.sectionTitle}>Marks Obtained</Text>
                            <View style={styles.innerTable}>
                                <View style={styles.innerTableRow}>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    
                        <View style={[styles.tableCol1, { width: "2%" }]}>
                            <Text style={styles.innerTable}></Text>
                        </View>

                        
                        <View style={[styles.tableCol1, { width: "25%" }]}>
                            <Text style={styles.sectionTitle}>Marks Obtained</Text>
                            <View style={styles.innerTable}>
                                <View style={styles.innerTableRow}>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.tableCol1, { width: "2%" }]}>
                            <Text style={styles.innerTable}></Text>
                        </View>

                        <View style={[styles.tableCol1, { width: "10%" }]}>
                            <Text style={styles.sectionTitle}>Marks Obtained</Text>
                            <View style={styles.innerTable}>
                                <View style={styles.innerTableRow}>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCellBlank}>1</Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCellBlank}>2</Text>
                                    </View>
                                    <View style={styles.innerTableCol}>
                                        <Text style={styles.tableCellBlank}>3</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.tableCol1, { width: "5%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>
                        <View style={[styles.tableCol1, { width: "5%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>
                        <View style={[styles.tableCol1, { width: "5%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>
                        <View style={[styles.tableCol1, { width: "5%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>
                        <View style={[styles.tableCol1, { width: "5%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>
                        <View style={[styles.tableCol1, { width: "5%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>
                        <View style={[styles.tableCol1, { width: "5%" }]}>
                            <Text style={styles.tableCellBlank}></Text>
                        </View>
                    </View>

                    {data.map((item, index) => {
                        return (
                            <View style={styles.tableRow}>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={styles.tableCell}>{index + 1}</Text>
                                </View>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={styles.tableCell}>{item.Student_Code}</Text>
                                </View>
                                <View style={[styles.tableCol, { width: "10%" }]}>
                                    <Text style={styles.tableCell}>{item.Student_Name}</Text>
                                </View>

                                <View style={[styles.tableCol, { width: "25%" }]}>
                                    <View style={styles.innerTable}>
                                        <View style={styles.innerTableRow}>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass1_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass2_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass3_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass4_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass5_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass6_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass7_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass8_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass9_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Ass10_Given}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.tableCol, { width: "2%" }]}>
                                    <Text
                                        style={[
                                            styles.sectionTitle,
                                            {
                                                borderBottom: "0",
                                                position: "relative",
                                                top: 10,
                                                transform: "rotate(90deg)",
                                            },
                                        ]}
                                    >
                                        {item.Ass_Percent}%
                                    </Text>
                                </View>

                                <View style={[styles.tableCol, { width: "25%" }]}>
                                    <View style={styles.innerTable}>
                                        <View style={styles.innerTableRow}>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test1_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test2_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test3_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test4_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test5_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test6_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test7_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test8_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test9_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Test10_Given}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.tableCol, { width: "2%" }]}>
                                    <Text
                                        style={[
                                            styles.sectionTitle,
                                            {
                                                borderBottom: "0",
                                                position: "relative",
                                                top: 10,
                                                transform: "rotate(90deg)",
                                            },
                                        ]}
                                    >
                                        {item.Test_Percent}%
                                    </Text>
                                </View>

                                <View style={[styles.tableCol, { width: "10%" }]}>
                                    <View style={styles.innerTable}>
                                        <View style={styles.innerTableRow}>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Final1_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Final2_Given}</Text>
                                            </View>
                                            <View style={styles.innerTableCol}>
                                                <Text style={styles.tableCell}>{item.Final3_Given}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={styles.tableCellr}>{item.Discipline}</Text>
                                </View>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={styles.tableCellr}>{item.Full_Attend}</Text>
                                </View>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={styles.tableCellr}>{item.Absents}</Text>
                                </View>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={styles.tableCellr}>{item.Absents}</Text>
                                </View>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={styles.tableCellr}>{item.Full_Attendance}</Text>
                                </View>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={styles.tableCellr}>{item.Final_Result_Percent}</Text>
                                </View>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={styles.tableCellr}>{`A+`}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View style={styles.footer}>
                    <Text>
                        PASSING CRITERIA: 90.00% To 100.00% - A+, 80.00% To 89.99% - A, 70.00% To 79.99% - B+, ...
                    </Text>
                </View>
                */}
            </Page>
        </Document>
    );
};

export default TestDocument;
