import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 10 },
    cel: {
        borderRight: "1px solid black",
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
});
const StandardLecturePlanDoc = (props) => {
    return (
        <Document>
            <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                <View>
                    <Text>Standard Lecture Plan Document</Text>
                </View>
            </Page>
        </Document>
    );
};

export default StandardLecturePlanDoc;
