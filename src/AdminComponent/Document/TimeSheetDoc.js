import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const TimeSheetDoc = (props) => {
    return (
        <Document>
            <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                <View>
                    <Text>Time Sheet Document</Text>
                </View>
            </Page>
        </Document>
    );
};

export default TimeSheetDoc;
