// DocumentComponent.jsx
import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from "@react-pdf/renderer";
import sitlogo from "../assets/images/sitlogo.png";
import { BASE_URL } from "./BaseUrl";

import axios from "axios";
// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: "Helvetica",
        color: "lightslategrey",
        border: "1px solid black",
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid round",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "2px solid #000",
        paddingBottom: 10,

        header1: {
            Alignitems: "center",
        },
    },
    headerLeft: {
        textAlign: "left",
        flex: "3",
    },
    image: {
        height: 80,
        width: 160,
    },
    headerRight: {
        textAlign: "center",

        flex: "13",
    },

    billTo: {
        marginBottom: 15,
        fontSize: 12,
        fontWeight: "bold",
    },
    Course: {
        display: "flex",
        flexDirection: "row",
    },
    courseleft: {
        display: "flex",
        flexDirection: "row",
        flexDirection: "row",
        alignItems: "center",
        flex: "3",
    },
    courseright: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: "7",
    },
    coursecenter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: "9",
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
        fontWeight: "700",
        width: "50%",
        alignItems: "center",
        marginLeft: "200px",
    },
    tableCell: {
        width: "50%",
    },
    tableCol: {
        borderStyle: "solid",
        borderWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderCollapse: "collapse",
    },
    tableCol1: {
        borderStyle: "solid",
        borderWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderCollapse: "collapse",
    },
    tableCol10: {
        borderStyle: "solid",
        borderWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderCollapse: "collapse",
        display: "flex",
        flexDirection: "row",
    },
    tableCol2: {
        borderStyle: "solid",
        borderWidth: 1,
        // borderBottomWidth:0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        minHeight: 80,
    },
    totals: {
        marginBottom: 20,
    },
    footer1: {
        marginBottom: 10,
        margintop: 10,
    },
    footer: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
    },
    footer3: {
        position: "fixed",
        bottom: 0,
        display: "flex",
        flexDirection: "row",
    },
    footer4: {
        position: "fixed",
        top: 487,
        bottom: 0,
        display: "flex",
        flexDirection: "row",
    },
    signatory: {
        textAlign: "right",
        marginTop: 40,
    },
});

const MyDocument7 = ({ data }) => {
    return (
        <Document>
            {data.map((item) => {
                const parseHTML = (html) => {
                    // This function can be expanded for more advanced parsing.
                    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes HTML tags for simple use cases
                };

                return (
                    <Page size="A4" style={styles.page}>
                        <View style={{ border: "2px solid black" }}>
                            <View style={styles.header}>
                                <View style={styles.headerRight}>
                                    <Text style={{ fontSize: "16px", marginTop: 5, fontWeight: "800", color: "#000" }}>
                                        PERFORMANCE REPORT
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.Course}>
                                <div style={{ height: "20px", margin: "0 0 0 0" }}></div>
                                <View style={[styles.tableCol, { width: "50%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 5, color: "#000" }}>
                                        Name :{item.Student_Name}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "50%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 5, marginLeft: 5, color: "#000" }}>
                                        ID No : {item.Student_Code}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.Course}>
                                <div style={{ height: "30px", margin: "0 0 0 0" }}></div>
                                <View style={[styles.tableCol, { width: "50%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 5, color: "#000" }}>
                                        Training Programme
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "25%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 5, marginLeft: 5, color: "#000" }}>
                                        Batch No : {item.Batch_code}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "25%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 5, marginLeft: 5, color: "#000" }}>
                                        Date : {item.Result_date}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.Course}>
                                <div style={{ height: "50px", margin: "0 0 0 0" }}></div>
                                <View style={[styles.tableCol, { width: "40%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 18, marginLeft: 5, color: "#000" }}>
                                        Passing Criteria :
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "50%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        A+
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        A
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        B+
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        B
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        C
                                    </Text>
                                    <Text style={{ fontSize: "10px", marginTop: 5, color: "#000", paddingLeft: "5px" }}>
                                        No certificate
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "50%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        90.00% to 100%
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        80.00% to 89.99%{" "}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        70.00% to 79.99%
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        60.00% to 69.99%
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        50.00% to 59.99%
                                    </Text>
                                    <Text style={{ fontSize: "10px", marginTop: 5, color: "#000", paddingLeft: "5px" }}>
                                        49.99 and below{" "}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.Course}>
                                <div style={{ height: "50px", margin: "0 0 0 0" }}></div>
                                <View style={[styles.tableCol, { width: "100%" }]}>
                                    <Text style={{ fontSize: "10px", marginLeft: 5, color: "#000" }}>
                                        Brief Description of Course
                                    </Text>
                                    <Text style={{ padding: "5px 10px", fontSize: "7px", color: "#000" }}>
                                        {item.Course_Description}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.Course}>
                                <div style={{ height: "50px", margin: "0 0 0 0" }}></div>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 20, marginLeft: 5, color: "#000" }}>
                                        01{" "}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, { width: "20%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 20, marginLeft: 5, color: "#000" }}>
                                        Assignments
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "30%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingLeft: "5px",
                                            borderBottom: "1px solid black",
                                        }}
                                    >
                                        {" "}
                                        Total No of Assignments/
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        Assignments Submitted
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        Marks obtained in Assignments
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        Total Marks obtained in Assignments
                                    </Text>
                                    <Text style={{ fontSize: "10px", marginTop: 5, color: "#000", paddingLeft: "5px" }}>
                                        Weightage - %
                                    </Text>
                                </View>

                                <View style={[styles.tableCol1, { width: "50%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {item.Total_Assignments}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {item.Given_Assignments}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingHorizontal: "10px",
                                            // textAlign: "center",
                                        }}
                                    >
                                        {/* prettier-ignore */}
                                        {item.Ass1_Given || ""}
                                        {"  "}
                                        {item.Ass2_Given || ""}
                                        {"  "}
                                        {item.Ass3_Given || ""}
                                        {"  "}
                                        {item.Ass4_Given || ""}
                                        {"  "}
                                        {item.Ass5_Given || ""}
                                        {"  "}
                                        {item.Ass6_Given || ""}
                                        {"  "}
                                        {item.Ass7_Given || ""}
                                        {"  "}
                                        {item.Ass8_Given || ""}
                                        {"  "}
                                        {item.Ass9_Given || ""}
                                        {"  "}
                                        {item.Ass10_Given || ""}{" "}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 16,
                                            color: "#000",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                            borderBottom: "1px solid black",
                                        }}
                                    >
                                        {item.Ass1_Given +
                                            item.Ass2_Given +
                                            item.Ass3_Given +
                                            item.Ass4_Given +
                                            item.Ass5_Given +
                                            item.Ass6_Given +
                                            item.Ass7_Given +
                                            item.Ass8_Given +
                                            item.Ass9_Given +
                                            item.Ass10_Given}{" "}
                                        /
                                        {item.Ass1_Max +
                                            item.Ass2_Max +
                                            item.Ass3_Max +
                                            item.Ass4_Max +
                                            item.Ass5_Max +
                                            item.Ass6_Max +
                                            item.Ass7_Max +
                                            item.Ass8_Max +
                                            item.Ass9_Max +
                                            item.Ass10_Max}
                                    </Text>

                                    <View
                                        style={{
                                            width: "100%",
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingHorizontal: "10px",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text>{item.Ass_Percent}</Text>
                                        <Text style={{ marginRight: "20px" }}>{"(A)"}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.Course}>
                                <div style={{ height: "50px", margin: "0 0 0 0" }}></div>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 20, marginLeft: 5, color: "#000" }}>
                                        02{" "}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, { width: "20%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 20, marginLeft: 5, color: "#000" }}>
                                        Unit Tests
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "30%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingLeft: "5px",
                                            borderBottom: "1px solid black",
                                        }}
                                    >
                                        Total Unit Test/s
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        Attended Unit Test/s
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        Marks obtained in Unit Test/s
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        Total Marks obtained in Unit Test/s
                                    </Text>
                                    <Text style={{ fontSize: "10px", marginTop: 5, color: "#000", paddingLeft: "5px" }}>
                                        Weightage 35 %
                                    </Text>
                                </View>

                                <View style={[styles.tableCol1, { width: "50%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {item.Total_Tests}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "10px",
                                            borderBottom: "1px solid black",
                                            textAlign: "left",
                                        }}
                                    >
                                        {item.Given_Tests}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            paddingTop: 4.5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {" "}
                                        {item.Test1_Given || ""} {item.Test2_Given || ""} {item.Test3_Given || ""}{" "}
                                        {item.Test4_Given || ""} {item.Test5_Given || ""} {item.Test6_Given || ""}{" "}
                                        {item.Test7_Given || ""} {item.Test8_Given || ""} {item.Test9_Given || ""}{" "}
                                        {item.Test10_Given || ""}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 16,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {item.Test1_Given +
                                            item.Test2_Given +
                                            item.Test3_Given +
                                            item.Test4_Given +
                                            item.Test5_Given +
                                            item.Test6_Given +
                                            item.Test7_Given +
                                            item.Test8_Given +
                                            item.Test9_Given +
                                            item.Test10_Given}{" "}
                                        /{" "}
                                        {item.Test1_Max +
                                            item.Test2_Max +
                                            item.Test3_Max +
                                            item.Test4_Max +
                                            item.Test5_Max +
                                            item.Test6_Max +
                                            item.Test7_Max +
                                            item.Test9_Max +
                                            item.Test10_Max}{" "}
                                    </Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingHorizontal: "10px",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text>{item.Test_Percent}</Text>
                                        <Text style={{ marginRight: "20px" }}>{"(B)"}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.Course}>
                                <div style={{ height: "30px", margin: "0 0 0 0" }}></div>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 10, marginLeft: 5, color: "#000" }}>
                                        03{" "}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, { width: "20%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 5, marginLeft: 5, color: "#000" }}>
                                        Final Examination
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "30%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        Marks obtained{" "}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        Weightage -50 %
                                    </Text>
                                </View>

                                <View style={[styles.tableCol1, { width: "50%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            paddingTop: 4.5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            textAlign: "left",
                                            paddingLeft: "10px",
                                        }}
                                    >
                                        {item.Final1_Given}/{item.Final1_Max} {``} {item.Final2_Given} /
                                        {item.Final2_Max} {``} {item.Final3_Given} / {item.Final2_Max}{" "}
                                    </Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingHorizontal: "10px",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text>{item.Final_Percent}</Text>
                                        <Text style={{ marginRight: "20px" }}>{"(C)"}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.Course}>
                                <div style={{ height: "30px", margin: "0 0 0 0" }}></div>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 20, marginLeft: 5, color: "#000" }}>
                                        04{" "}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, { width: "20%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 5, marginLeft: 5, color: "#000" }}>
                                        Attendance Record
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "30%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        Attended Lectures/Total Lectures{" "}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingLeft: "5px",
                                            borderBottom: "1px solid black",
                                        }}
                                    >
                                        Total No of Absent Days
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingLeft: "5px",
                                            borderBottom: "1px solid black",
                                        }}
                                    >
                                        Attendance %
                                    </Text>
                                    <Text style={{ fontSize: "10px", marginTop: 5, color: "#000", paddingLeft: "5px" }}>
                                        Full Attendance - 0 %
                                    </Text>
                                </View>

                                <View style={[styles.tableCol1, { width: "50%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 16,
                                            color: "#000",
                                            textAlign: "left",
                                            paddingLeft: "10px",
                                            borderBottom: "1px solid black",
                                        }}
                                    >
                                        {item.AttenLectures}/{item.Total_Lectures}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                            borderBottom: "1px solid black",
                                        }}
                                    >
                                        {item.Total_Lectures - item.AttenLectures}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                            borderBottom: "1px solid black",
                                        }}
                                    >
                                        {item.Full_Attendance}
                                    </Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingHorizontal: "10px",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text>0.00</Text>
                                        <Text style={{ marginRight: "20px" }}>{"(D)"}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.Course}>
                                <div style={{ height: "30px", margin: "0 0 0 0" }}></div>
                                <View style={[styles.tableCol, { width: "5%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 5, marginLeft: 5, color: "#000" }}>
                                        05{" "}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, { width: "20%" }]}>
                                    <Text style={{ fontSize: "10px", marginTop: 5, marginLeft: 5, color: "#000" }}>
                                        Final Result
                                    </Text>
                                </View>
                                <View style={[styles.tableCol1, { width: "30%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        A + B + C + D
                                    </Text>
                                    <Text style={{ fontSize: "10px", marginTop: 5, color: "#000", paddingLeft: "5px" }}>
                                        Grade
                                    </Text>
                                </View>

                                <View style={[styles.tableCol1, { width: "50%" }]}>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            borderBottom: "1px solid black",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {" "}
                                        {item.Final_Result_Percent}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                            marginTop: 5,
                                            color: "#000",
                                            paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {item.Grade}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.Course,
                                {
                                    marginTop: "10px",
                                },
                            ]}
                        >
                            <div style={{ height: "25px", margin: "0 0 0 0" }}></div>
                            <View
                                style={[
                                    styles.tableCol,
                                    {
                                        width: "33%",
                                        borderLeft: "1px solid black",
                                        borderTop: "1px solid black",
                                        marginTop: "3px",
                                    },
                                ]}
                            >
                                <Text style={{ fontSize: "10px", marginLeft: 5, color: "#000" }}> </Text>
                            </View>
                            <View
                                style={[
                                    styles.tableCol,
                                    { width: "33%", borderTop: "1px solid black", marginTop: "3px" },
                                ]}
                            >
                                <Text style={{ fontSize: "10px", marginLeft: 5, color: "#000" }}> </Text>
                            </View>
                            <View
                                style={[
                                    styles.tableCol1,
                                    { width: "33%", borderTop: "1px solid black", marginTop: "3px" },
                                ]}
                            >
                                <Text style={{ fontSize: "10px", color: "#000" }}> </Text>
                            </View>
                        </View>
                        <View style={styles.Course}>
                            {/* <div style={{ height: "20px", margin: "0 0 0 0" }}>

                            </div> */}
                            <View
                                style={[
                                    styles.tableCol,
                                    { width: "33%", borderLeft: "1px solid black", padding: "3px" },
                                ]}
                            >
                                <Text style={{ fontSize: "10px", color: "#000", textAlign: "center" }}>
                                    {item.faculty1.toUpperCase()}
                                </Text>
                            </View>
                            <View style={[styles.tableCol, { width: "33%", padding: "3px" }]}>
                                <Text style={{ fontSize: "10px", color: "#000", textAlign: "center" }}>
                                    {item.faculty2.toUpperCase()}
                                </Text>
                            </View>
                            <View style={[styles.tableCol1, { width: "33%", padding: "3px" }]}>
                                <Text style={{ fontSize: "10px", color: "#000", textAlign: "center" }}>
                                    {item.approve_by.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.Course}>
                            {/* <div style={{ height: "20px", margin: "0 0 0 0" }}>

                            </div> */}
                            <View
                                style={[
                                    styles.tableCol,
                                    { width: "33%", borderLeft: "1px solid black", padding: "3px" },
                                ]}
                            >
                                <Text style={{ fontSize: "10px", color: "#000", textAlign: "center" }}>
                                    {/* {item.Label1}
                                    {``} By */}
                                    Training Coordinator
                                </Text>
                            </View>
                            <View style={[styles.tableCol, { width: "33%", padding: "3px" }]}>
                                <Text style={{ fontSize: "10px", color: "#000", textAlign: "center" }}>
                                    {/* {item.Label2}
                                    {``} By */}
                                    Faculty
                                </Text>
                            </View>
                            <View style={[styles.tableCol1, { width: "33%", padding: "3px" }]}>
                                <Text style={{ fontSize: "10px", color: "#000", textAlign: "center" }}>
                                    Managing Director
                                </Text>
                            </View>
                        </View>
                    </Page>
                );
            })}
        </Document>
    );
};

export default MyDocument7;
