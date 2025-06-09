// DocumentComponent.jsx
import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from "@react-pdf/renderer";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: "Helvetica",
        color: "lightslategrey",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "2px solid #000",
        paddingBottom: 10,
        marginBottom: 20,
    },
    headerLeft: {
        textAlign: "left",
    },
    headerRight: {
        textAlign: "right",
    },
    billTo: {
        marginBottom: 15,
    },
    itemsTable: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCellHeader: {
        borderBottom: "1px solid #ddd",
        padding: 8,
        fontWeight: "800",
    },
    tableCell: {
        borderBottom: "1px solid #ddd",
        padding: 8,
    },
    totals: {
        marginBottom: 20,
    },
    footer: {
        position: "absolute",
        bottom: 10, // Adjust the spacing as needed
        left: "30px",
        right: 0,
        textAlign: "left",
        fontSize: 8,
        color: "black",
        fontWeight: "800",
    },
    signatory: {
        textAlign: "right",
        marginTop: 40,
    },
});

// Create Document Component
const BlankAttendance = (props) => {
    console.log(props)
    const data = props.data[0].students;
    const Course_Name = props.data[0].students[0].Course_Name;
    const batch_id = props.data[0].batchid;
    const lecture_count = props.data[0].lecture_count + 1;

    const date = new Date();

    const currentdate = date.toISOString().split("T")[0];

    const getShortText = (text, maxChars = 30) => {
        return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header section  */}

                <View fixed>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1px",
                        }}
                    >
                        <Image
                            src={`https://webapp.sitsuvidya.in/static/media/logo.66d383f907e5f7ec4411.jpg`}
                            style={{ width: "60px" }}
                        ></Image>
                        <Text style={{ fontSize: 10 }}>Total Lecture : {lecture_count}</Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: "yellow",
                            textAlign: "center",
                            padding: "5px",
                            border: "1px solid black",
                        }}
                    >
                        <Text style={{ fontSize: "8px", fontWeight: "600", color: "#000" }}>
                            ATTENDANCE & LECTURE EVALUATION SHEET
                        </Text>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", marginTop: "0px" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                border: "1px solid black",
                                flex: "5",
                            }}
                        >
                            <View style={{ flex: "7" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: "lighgrey", fontSize: "8px" }}>Training Coordinator: </Text>
                                    <Text style={{ color: "black" }}> Mr. Aniket Parab</Text>
                                </View>
                            </View>
                            <View style={{ flex: "3" }}>
                                <Text style={{ color: "black", borderLeft: "1px solid black", padding: "0px 10px" }}>
                                    Batch No.
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                border: "1px solid black",
                                flex: "5",
                            }}
                        >
                            <View style={{ flex: "7" }}>
                                <Text style={{ color: "lighgrey", fontSize: "10px", textAlign: "center" }}>
                                    Faculty
                                </Text>
                            </View>
                            <View style={{ flex: "3" }}>
                                <Text
                                    style={{
                                        color: "black",
                                        borderLeft: "1px solid black",
                                        padding: "0px 10px",
                                        fontSize: "10px",
                                    }}
                                >
                                    Date:
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                border: "1px solid black",
                                flex: "5",
                            }}
                        >
                            <View style={{ flex: "3" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: "black", fontSize: "8px" }}>Training Programme:</Text>
                                </View>
                            </View>
                            <View style={{ flex: "4" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 8, color: "black" }}>
                                        {getShortText(Course_Name, 25)}
                                    </Text>

                                </View>
                            </View>

                            <View style={{ flex: "3" }}>
                                <Text style={{ color: "black", borderLeft: "1px solid black", padding: "0px 10px" }}>
                                    {batch_id}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                border: "1px solid black",
                                flex: "5",
                            }}
                        >
                            <View style={{ flex: "7" }}>
                                <Text style={{ color: "lighgrey", fontSize: "10px", textAlign: "center" }}>
                                    
                                </Text>
                            </View>
                            <View style={{ flex: "3" }}>
                                <Text
                                    style={{
                                        color: "white",
                                        borderLeft: "1px solid black",
                                        padding: "0px 10px",
                                        fontSize: "10px",
                                    }}
                                >
                                    Date
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", marginBottom: "0px" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                border: "1px solid black",
                                flex: "5",
                                padding: "5px 0px",
                            }}
                        >
                            <View style={{ flex: "5", backgroundColor: "yellow", textAlign: "center" }}>
                                <Text style={{ color: "black", fontWeight: "600", fontSize: "8px" }}>
                                    Id.No./Name/LtM./Attn
                                </Text>
                            </View>
                            <View style={{ flex: "3", backgroundColor: "yellow", fontWeight: "600" }}>
                                <Text
                                    style={{
                                        color: "black",
                                        fontWeight: "600",
                                        borderLeft: "1px solid black",
                                        padding: "0px 5px",
                                        fontSize: "8px",
                                    }}
                                >
                                    Overall Rating
                                </Text>
                            </View>
                            <View style={{ flex: "2", backgroundColor: "yellow", fontWeight: "600" }}>
                                <Text
                                    style={{
                                        color: "black",
                                        fontWeight: "600",
                                        borderLeft: "1px solid black",
                                        padding: "0px 5px",
                                        fontSize: "8px",
                                    }}
                                >
                                    Sign
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                border: "1px solid black",
                                flex: "5",
                                padding: "5px 0px",
                            }}
                        >
                            <View
                                style={{ flex: "5", backgroundColor: "yellow", fontWeight: "600", textAlign: "center" }}
                            >
                                <Text style={{ color: "black", fontWeight: "600", fontSize: "8px" }}>
                                    Id.No./Name/LtM./Attn
                                </Text>
                            </View>
                            <View style={{ flex: "3", backgroundColor: "yellow", fontWeight: "600" }}>
                                <Text
                                    style={{
                                        color: "black",
                                        fontWeight: "600",
                                        borderLeft: "1px solid black",
                                        padding: "0px 5px",
                                        fontSize: "8px",
                                    }}
                                >
                                    Overall Rating
                                </Text>
                            </View>
                            <View style={{ flex: "2", backgroundColor: "yellow", fontWeight: "600" }}>
                                <Text
                                    style={{
                                        color: "black",
                                        fontWeight: "600",
                                        borderLeft: "1px solid black",
                                        padding: "0px 5px",
                                        fontSize: "8px",
                                    }}
                                >
                                    Sign
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Header section  */}

                {/* Box section  */}

                <View style={{ display: "flex", flexDirection: "column" }}>
                    {data
                        .reduce((rows, item, index) => {
                            if (index % 2 === 0) {
                                rows.push(data.slice(index, index + 2)); // Group data into pairs
                            }
                            return rows;
                        }, [])
                        .map((row, rowIndex) => (
                            <View
                                key={rowIndex}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                {row.map((item, itemIndex) => (
                                    <View
                                        key={itemIndex}
                                        style={{
                                            width: "49.5%",
                                            border: "1px solid black",
                                        }}
                                    >
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            {/* Left Section */}
                                            <View style={{ flex: 5 }}>
                                                <Text
                                                    style={{
                                                        color: "#000",
                                                        borderBottom: "1px solid black",
                                                        padding: "3px 2px",
                                                    }}
                                                >
                                                    {item.Student_Code} {/* Replace with the actual field */}
                                                </Text>
                                                <Text style={{ color: "red", padding: "3px 2px", fontSize: "8px" }}>
                                                    {item.Student_Name} {/* Replace with the actual field */}
                                                </Text>
                                            </View>
                                            {/* Ratings Section */}
                                            <View
                                                style={{
                                                    flex: 3,
                                                    borderRight: "1px solid black",
                                                    borderLeft: "1px solid black",
                                                }}
                                            >
                                                <View style={{ display: "flex", flexDirection: "row" }}>
                                                    <View style={{ flex: 8 }}>
                                                        {[
                                                            "EXCELLENT",
                                                            "VERY GOOD",
                                                            "GOOD",
                                                            "SATISFACTORY",
                                                            "UNSATISFACTORY",
                                                        ].map((rating, idx) => (
                                                            <Text
                                                                key={idx}
                                                                style={{
                                                                    color: "#000",
                                                                    fontSize: "6px",
                                                                    borderBottom: rating !== "UNSATISFACTORY" ? "1px solid black" : "none",
                                                                }}
                                                            >
                                                                {rating}
                                                            </Text>
                                                        ))}
                                                    </View>
                                                    <View
                                                        style={{
                                                            flex: 2,
                                                            borderLeft: "1px solid black",
                                                        }}
                                                    >
                                                        {[1, 1, 1, 1, 1].map((value, idx) => (
                                                            <Text
                                                                key={idx}
                                                                style={{
                                                                    color: "#fff",
                                                                    fontSize: "6px",
                                                                    borderBottom: idx !== 4 ? "1px solid black" : "none",
                                                                    visibility: "hidden",
                                                                }}
                                                            >
                                                                {value}
                                                            </Text>
                                                        ))}
                                                    </View>
                                                </View>
                                            </View>
                                            {/* Sign Section */}
                                            <View style={{ flex: 2 }}>
                                                {/* <Text style={{ color: "red" }}>Cancelled</Text> */}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ))}
                </View>

                <View style={styles.footer} fixed>
                    <Text>F/TD/05/01</Text>
                </View>
            </Page>
        </Document >
    );
};

export default BlankAttendance;
