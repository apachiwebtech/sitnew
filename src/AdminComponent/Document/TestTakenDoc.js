import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const TestTakenDoc = (props) => {
    return (
        <Document>
            <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                <View>
                    <Text>Test Taken Document</Text>
                </View>
            </Page>
        </Document>
    );
};

export default TestTakenDoc;
