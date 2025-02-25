import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const StudentLabelDoc = (props) => {
    return (
        <Document>
            <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                <View>
                    <Text>Student Label Document</Text>
                </View>
            </Page>
        </Document>
    );
};

export default StudentLabelDoc;
