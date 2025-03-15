import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Sample Data
const students = [
    { name: "Balkrishna Ujawane Atul", address: "Same, -", res: "25451555", mob: "9821705379" },
    { name: "John Doe", address: "123 Street", res: "12345678", mob: "9876543210" },
    { name: "Jane Doe", address: "456 Avenue", res: "87654321", mob: "9012345678" },
    { name: "Balkrishna Ujawane Atul", address: "Same, -", res: "25451555", mob: "9821705379" },
    { name: "John Doe", address: "123 Street", res: "12345678", mob: "9876543210" },
    { name: "Jane Doe", address: "456 Avenue", res: "87654321", mob: "9012345678" },
    { name: "Balkrishna Ujawane Atul", address: "Same, -", res: "25451555", mob: "9821705379" },
    { name: "John Doe", address: "123 Street", res: "12345678", mob: "9876543210" },
    { name: "Jane Doe", address: "456 Avenue", res: "87654321", mob: "9012345678" },

    { name: "Balkrishna Ujawane Atul", address: "Same, -", res: "25451555", mob: "9821705379" },
    { name: "John Doe", address: "123 Street", res: "12345678", mob: "9876543210" },
    { name: "Jane Doe", address: "456 Avenue", res: "87654321", mob: "9012345678" },
    { name: "Balkrishna Ujawane Atul", address: "Same, -", res: "25451555", mob: "9821705379" },
    { name: "John Doe", address: "123 Street", res: "12345678", mob: "9876543210" },
    { name: "Jane Doe", address: "456 Avenue", res: "87654321", mob: "9012345678" },
    { name: "Balkrishna Ujawane Atul", address: "Same, -", res: "25451555", mob: "9821705379" },
    { name: "John Doe", address: "123 Street", res: "12345678", mob: "9876543210" },
    { name: "Jane Doe", address: "456 Avenue", res: "87654321", mob: "9012345678" },
    { name: "Balkrishna Ujawane Atul", address: "Same, -", res: "25451555", mob: "9821705379" },
    { name: "John Doe", address: "123 Street", res: "12345678", mob: "9876543210" },
    { name: "Jane Doe", address: "456 Avenue", res: "87654321", mob: "9012345678" },
    // Add more students as needed...
];

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    labelContainer: {
        border: "1px solid black",
        width: "24%",
        height: "20%",
        marginRight: 5,
        padding: 5,
    },
    textRow: {
        flexDirection: "row",
        gap: 7,
        paddingBottom: 5,
    },
    text: {
        fontSize: 9,
    },
});

const StudentLabelDoc = () => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                {students.map((student, index) => (
                    <View key={index} style={styles.labelContainer}>
                        <View style={{height: "50%"}}>
                            <View style={styles.textRow}>
                                <Text style={styles.text}>Name {"\u00A0\u00A0\u00A0\u00A0"}:</Text>
                                <Text style={styles.text}>{student.name}</Text>
                            </View>
                            <View style={styles.textRow}>
                                <Text style={styles.text}>Address :</Text>
                                <Text style={styles.text}>{student.address}</Text>
                            </View>
                        </View>
                        <View style={{ height: "50%",justifyContent: "flex-end" }}>
                            <View style={styles.textRow}>
                                <Text style={styles.text}>Res{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}:</Text>
                                <Text style={styles.text}>{student.res}</Text>
                            </View>
                            <View style={styles.textRow}>
                                <Text style={styles.text}>Mob{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}:</Text>
                                <Text style={styles.text}>{student.mob}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default StudentLabelDoc;
