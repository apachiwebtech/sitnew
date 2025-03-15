import React from 'react'
import { Document, Page, Text, View, } from "@react-pdf/renderer";

const VivaMOCDoc = () => {
  return (
     <Document>
                <Page size="A4" style={{ padding: 30, paddingLeft: 50 ,fontSize: 10 }}>
                    <View>
                        <Text>Suvidya Institute of Technology Pvt. Ltd</Text>
                    </View>
                    <View style={{
                        width: "100%",
                        height:"95%",
                        border: "2px solid black",
                    }}>
                        {/* header */}
                        <View style={{
                            width: "100%",
                            height: "2.5%",
                            borderBottom: "1px solid black",
                            flexDirection: "row"
                        }}>
                            <View style={{
                                width: "60%",
                                height: "100%",
                                // borderRight: "1px solid black",
                                gap: "15px",
                                flexDirection: "row",
                                paddingLeft: '3px',
                                alignItems: "center"
                            }}>
                                <Text style={{ fontSize: 9}}>Training Programme :</Text>
                                <Text style={{ fontSize: 9}}>Piping Engineering</Text>
                            </View>
                            <View style={{
                                width: "30%",
                                height: "100%",
                                flexDirection : 'row',
                                alignItems: "center",                           
                                 }}>
                                    <Text style={{ fontSize: 9}}>Batch :  </Text>
                                    <Text style={{ fontSize: 9}}>01159</Text>
                                 </View>
                        </View>
                        <View style={{
                            width: "100%",
                            height: "2.5%",
                            borderBottom: "1px solid black",
                            flexDirection : 'row',
                        }}>
                             <View style={{
                                width: "30%",
                                height: "100%",
                                flexDirection : 'row',
                                justifyContent: 'center',
                                alignItems: "center",
                                gap: "3px"                           
                                 }}>
                                    <Text style={{ fontSize: 9}}>Viva : </Text>
                                    
                                 </View>
                                 <Text style={{fontSize: 9}}></Text>
                        </View>
                        <View style={{
                            width: "100%",
                            height: "2.5%",
                            borderBottom: "1px solid black",
                            flexDirection : 'row',
                        }}>
                             <View style={{
                                width: "20%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                borderRight: "1px solid black",
                             }}>
                                <Text style={{fontSize: 9}}>Roll No</Text>
                             </View>
                             <View style={{
                                width: "40%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                borderRight: "1px solid black",
                             }}>
                                <Text style={{fontSize: 9}}>Student Name</Text>
                             </View>
                             <View style={{
                                width: "12%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                borderRight: "1px solid black",
                             }}>
                                <Text style={{fontSize: 9}}>Viva Date </Text>
                             </View>
                             vendormaster<View style={{
                                width: "12%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                borderRight: "1px solid black",
                             }}>
                                <Text style={{fontSize: 9}}>Total Marks</Text>
                             </View>
                             <View style={{
                                width: "16%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                // borderRight: "1px solid black",
                             }}>
                                <Text style={{fontSize: 9}}>Marks Obtained</Text>
                             </View>
                        </View>
                        {/* stored data show */}
                        <View style={{
                            width: "100%",
                            height: "100%",
                            flexDirection: "column"
                        }}>
                        <View style={{
                            width: "100%",
                            height: "2.5%",
                            
                            flexDirection : 'row',
                        }}>
                             <View style={{
                                width: "20%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                borderRight: "1px solid black",
                                borderBottom: "1px dotted black",
                             }}>
                                <Text style={{fontSize: 9}}>22020670007</Text>
                             </View>
                             <View style={{
                                width: "40%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                borderRight: "1px solid black",
                                borderBottom: "1px dotted black",
                             }}>
                                <Text style={{fontSize: 9}}>Yash Pratap Khot</Text>
                             </View>
                             <View style={{
                                width: "12%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                borderRight: "1px solid black",
                                borderBottom: "1px dotted black",
                             }}>
                                <Text style={{fontSize: 9}}></Text>
                             </View>
                             vendormaster<View style={{
                                width: "12%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                borderRight: "1px solid black",
                                borderBottom: "1px dotted black",
                             }}>
                                <Text style={{fontSize: 9}}>2</Text>
                             </View>
                             <View style={{
                                width: "16%",
                                height: "100%",
                                justifyContent:'center',
                                alignItems:"center",
                                // borderRight: "1px solid black",
                                borderBottom: "1px dotted black",
                             }}>
                                <Text style={{fontSize: 9}}>0</Text>
                             </View>
                        </View>

                        </View>
                    </View>
                   
                    <View style={{width: "100%",
                    height:"3%",
                    // border:"1px solid black",
                    justifyContent: "flex-end",
                    alignItems: "flex-end"}}>

                    <Text style={{fontSize: 9}}>1</Text>
                    </View>
                    
                </Page>
            </Document>
  )
}

export default VivaMOCDoc
