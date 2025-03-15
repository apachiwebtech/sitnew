import React from 'react'
import { Document, Page, Text, View } from "@react-pdf/renderer";

const Acomodation = () => {
  return (
    <Document>
                <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                    <View>
                        <Text>Acomodation</Text>
                    </View>
                </Page>
            </Document>
  )
}

export default Acomodation
