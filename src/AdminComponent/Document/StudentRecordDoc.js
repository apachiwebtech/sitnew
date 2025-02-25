import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const StudentRecordDoc = (props) => {
    return (
        <Document>
            <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                <View>
                    <Text>Student Record Document</Text>
                </View>
            </Page>
        </Document>
    );
};

export default StudentRecordDoc;
