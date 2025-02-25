import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const StudyMaterialDoc = (props) => {
    return (
        <Document>
            <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                <View>
                    <Text>Study Material Document</Text>
                </View>
            </Page>
        </Document>
    );
};

export default StudyMaterialDoc;
