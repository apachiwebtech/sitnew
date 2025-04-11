import React from 'react'
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";


const StudentReports = (props) => {
  return (
    <Document>
                <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                    <View style={{flexDirection:"row", width:"100%", height: "15px"}}>
                    <View style={{flexDirection:"row", width:"50%", height: "30px"}}>
                        <Text style={{fontSize: 10,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}>Suvidya Institute of Technology</Text>
                        </View>
                        <View style={{flexDirection:"row", width:"20%", height: "30px"}}>
                        <Text style={{fontSize: 10,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}>From :  </Text>
                        <Text style={{fontSize: 10,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> 17 Mar 2025 </Text>
                        </View>
                        <View style={{flexDirection:"row", width:"20%", height: "30px", left: "30px"}}>
                        <Text style={{fontSize: 10,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}>To : </Text>
                        <Text style={{fontSize: 10,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> 19 Jul 2025 </Text>
                        </View>
                    </View>

                    <View style={{flexDirection:"row", width:"100%", height: "25px", border: "1px solid black", justifyContent: "center", alignItems:"center", bottom: "2px"}}>
                    <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> STUDENT PUNCHING ID NUMBER </Text>
                    </View>
                    <View style={{flexDirection:"row", width:"100%", height: "25px", border: "1px solid black", justifyContent: "center", alignItems:"center", bottom:"2px"}}>
                    <View style={{flexDirection:"row", width:"50%", height: "25px",  justifyContent: "start", alignItems:"center", left: "10px"}}>
                    <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> Training Programme : </Text>
                        {/* changing value */}
                        <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> Piping Engineering </Text>
                    </View>
                    <View style={{flexDirection:"row", width:"50%", height: "25px",  justifyContent: "center", alignItems:"center"}}>
                    <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> Batch No.: </Text>
                        {/* changing value */}
                        <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> 01160 </Text>
                    </View>
                    </View>
                    <View style={{flexDirection:"row", width:"100%", height: "25px", justifyContent:"space-between"}}>
                    <View style={{flexDirection:"row", width:"49%", height: "25px", border: "1px solid black", justifyContent: "center", alignItems:"center"}}>
                    <View style={{flexDirection:"row", width:"25%", height: "25px", borderRight: "1px solid black", justifyContent: "center", alignItems:"center"}}>
                    <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> ID No. </Text>
                        </View>
                        <View style={{flexDirection:"row", width:"75%", height: "25px",  justifyContent: "center", alignItems:"center"}}>
                        <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> Student Name </Text>
                        </View>
                        </View>
                        <View style={{flexDirection:"row", width:"49%", height: "25px", border: "1px solid black", justifyContent: "center", alignItems:"center"}}>
                        <View style={{flexDirection:"row", width:"25%", height: "25px", borderRight: "1px solid black", justifyContent: "center", alignItems:"center"}}>
                        <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> ID No. </Text>
                        </View>
                        <View style={{flexDirection:"row", width:"75%", height: "25px",  justifyContent: "center", alignItems:"center"}}>
                        <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> Student Name </Text>
                        </View>
                    </View>
                    </View>
                    <View style={{flexDirection:"row", width:"100%", height: "auto",  justifyContent:"space-between",top:"1px"}}>
                        {/*  */}
                        
                    <View style={{flexDirection:"row", width:"49%", height: "700px",border: "1px solid black"}}>
                    <View style={{flexDirection:"row", width:"25%", height: "20px", borderRight: "1px solid black",borderBottom: "1px solid black", justifyContent: "center", alignItems:"center"}}>
                    <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> 172295 </Text>
                        </View>
                        <View style={{flexDirection:"row", width:"75%", height: "20px", borderBottom: "1px solid black",justifyContent: "center", alignItems:"center"}}>
                        <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> Siddhesh Chetan Vagal</Text>
                        </View>
                        </View>
                        {/*  */}
                        <View style={{flexDirection:"row", width:"49%", height: "700px", border: "1px solid black"}}>
                        <View style={{flexDirection:"row", width:"25%", height: "20px",borderRight: "1px solid black",borderBottom: "1px solid black", justifyContent: "center", alignItems:"center"}}>
                        <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> 172295 </Text>
                        </View>
                        <View style={{flexDirection:"row", width:"75%", height: "20px", borderBottom: "1px solid black", justifyContent: "center", alignItems:"center"}}>
                        <Text style={{fontSize: 9,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}> Siddhesh Chetan Vagal </Text>
                        </View>
                    </View>
                    </View>
                    
                </Page>
            </Document>
  )
}

export default StudentReports
