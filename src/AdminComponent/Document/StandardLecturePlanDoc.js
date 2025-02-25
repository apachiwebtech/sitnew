import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

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
