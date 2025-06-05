import React from 'react'
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";


const StudentListR = () => {
  return (
    <Document>
        <Page size="A4"  style={{ padding: 30, fontSize: 10 }}>
            <View style={{
                width: "100%",
                height: "100%",
                // border:"1px solid black"

            }}>
                <View style={{
                    width:"100%",
                    height:"4%",
                    border:"1px solid black",
                    flexDirection:"row",
                }}>
                    <View 
                    style={{
                        width:"3%",
                        height:"100%",
                        borderBottom:"1px solid black",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                    }}></View>
                    <View 
                    style={{
                        width:"3%",
                        height:"100%",
                        borderBottom:"1px solid black",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                    }}></View>
                    <View 
                    style={{
                        width:"3%",
                        height:"100%",
                        borderBottom:"1px solid black",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                    }}></View>
                    <View 
                    style={{
                        width:"3%",
                        height:"100%",
                        borderBottom:"1px solid black",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                    }}></View>
                    <View 
                    style={{
                        width:"3%",
                        height:"100%",
                        borderBottom:"1px solid black",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                    }}></View>
                    <View 
                    style={{
                        width:"3%",
                        height:"100%",
                        borderBottom:"1px solid black",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                    }}></View>

                    
                </View>
            </View>
        </Page>
    </Document>
  )
}

export default StudentListR