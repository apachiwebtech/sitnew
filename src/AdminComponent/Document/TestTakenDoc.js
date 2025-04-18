import React from "react";
import { Document, Page, Text, View, Image  } from "@react-pdf/renderer";
import sitlogo from '../../assets/images/sitlogo.png'





const TestTakenDoc = (student_marks) => {

console.log (student_marks)







    return (
        <Document>
            <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
            

            <View 
                                         style={ {
                                                                flexDirection: 'column',
                                                                justifyContent: "space-between",
                                                                        alignItems: "flex-start",
                                                                        
                                                            }}>
                                           
                                                           <Image 
                                                                           src ={sitlogo}
                                                                           style= {{width: "60px"}}
                                                                           ></Image>
                                        </View>
                                        <View style={{ flexDirection: "column",
                                        border: "2px solid black",
                                        // marginBottom: "5px",
                                        height: "6%",
                                        justifyContent: "center", alignItems: "center",
                                        width: "100%"}}>
                                            <View style={{ alignItems: "center", justifyContent: "center",width: "100%",
                                            height: "50%"}}>
                                                <Text style={{ fontSize: 9}}>UNIT TEST REPORT</Text>
                                            </View>
                                            <View style={{ borderTop: "2px",alignItems: "center", justifyContent: "space-between",width: "100%",
                                            height: "50%", flexDirection: "row"}}>
                                                <Text style={{ fontSize: 9, left: "20px"}}>Training Programme :      </Text>
                                                <Text style={{ fontSize: 9, right: "70px"}}>Pipeline Engineering </Text>
                                                <Text style={{ fontSize: 9}}>Batch No :-    </Text>
                                                <Text style={{ fontSize: 9, right: "70px"}}>17001</Text>
                                            </View>
                                            
                                        </View>
                                        {student_marks.map((item)=>{
                                        return (
                                        <View style={{
                                            marginTop: "-0.3px",
                                                width: "100%",
                                                height: "80%",
                                                borderRight: "2px solid black",
                                                borderLeft: "2px solid black",
                                                borderBottom: "2px solid black",
                                                flexDirection: "column"

                                            }}>
                                                <View style={{
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    borderBottom: "1px solid black",
                                                    height : "10%",
                                                    justifyContent: "space-between"
                                                }}>
                                                    <View style={{
                                                        width: "48%",
                                                        borderRight: "2px solid black",
                                                        
                                                    }}>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        borderBottom: "2px solid black",
                                                        height: "32%",
                                                    }}>
                                                    <View style={{
                                                        borderRight: "2px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "70%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >UnitTest No</Text>
                                                    </View>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "30%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >Subject</Text>
                                                    </View>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        borderBottom: "2px solid black",
                                                        height: "32%",
                                                    }}>
                                                    <View style={{
                                                        borderRight: "2px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "70%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >01</Text>
                                                    </View>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "30%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} ></Text>
                                                    </View>
                                                    </View>

                                                    <View style={{
                                                        flexDirection: "row",
                                                        // borderBottom: "2px solid black",
                                                        height: "36%",
                                                    }}>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "10%",
                                                        
                                                        borderRight: "2px solid black",
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >S.NO.</Text>
                                                    </View>
                                                    <View style={{
                                                        borderRight: "2px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "60%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >Student</Text>
                                                    </View>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "30%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >MARKS OBTN.</Text>
                                                    </View>
                                                    </View>
                                                    
                                                    </View>
                                                    {/* half */}
                                                    <View style={{
                                                        width: "48%",
                                                        borderLeft: "2px solid black",
                                                        
                                                    }}>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        borderBottom: "2px solid black",
                                                        height: "32%",
                                                    }}>
                                                    <View style={{
                                                        borderRight: "2px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "70%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >Date</Text>
                                                    </View>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "30%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >Total Marks</Text>
                                                    </View>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        borderBottom: "2px solid black",
                                                        height: "32%",
                                                    }}>
                                                    <View style={{
                                                        borderRight: "2px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "70%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >25-Feb-2012</Text>
                                                    </View>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "30%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >50</Text>
                                                    </View>
                                                    </View>

                                                    <View style={{
                                                        flexDirection: "row",
                                                        // borderBottom: "2px solid black",
                                                        height: "36%",
                                                    }}>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "10%",
                                                        
                                                        borderRight: "2px solid black",
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >S.NO.</Text>
                                                    </View>
                                                    <View style={{
                                                        borderRight: "2px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "60%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >Student</Text>
                                                    </View>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "30%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >MARKS OBTN.</Text>
                                                    </View>
                                                    </View>
                                                    
                                                    </View>
                                                </View>
                                                {/* part2 */}
                                                <View style={{ 
                                                    width: "100%",
                                                }}>
                                                    
                                                    <View style={{
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    borderBottom: "1px solid black",
                                                    
                                                    justifyContent: "space-between"
                                                }}>
                                                    <View style={{
                                                        width: "48%",
                                                        borderRight: "2px solid black",
                                                        
                                                    }}>
                                                    
                                                    

                                                    <View style={{
                                                        flexDirection: "row",
                                                        // borderBottom: "2px solid black",
                                                        height: "25px",
                                                    }}>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "10%",
                                                        
                                                        borderRight: "2px solid black",
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >1</Text>
                                                    </View>
                                                    <View style={{
                                                        borderRight: "2px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "60%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >{item.Student_Name}</Text>
                                                    </View>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "30%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >34 </Text>
                                                    </View>
                                                    </View>
                                                    
                                                    </View>
                                                    {/* half */}
                                                    <View style={{
                                                        width: "48%",
                                                        borderLeft: "2px solid black",
                                                        
                                                    }}>
                                                     <View style={{
                                                        width: "100%",
                                                        flexDirection: "row",
                                                        // borderBottom: "2px solid black",
                                                        height: "25px",
                                                    }}>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "10%",
                                                        
                                                        borderRight: "2px solid black",
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} >1</Text>
                                                    </View>
                                                    <View style={{
                                                        borderRight: "2px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "60%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} ></Text>
                                                    </View>
                                                    <View style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "30%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 9
                                                        }} ></Text>
                                                    </View>
                                                    </View>
                                                    
                                                    </View>
                                                </View>
                                                </View>
                                            </View>
 )})} 

                                            <View style={{
                                                width: "100%",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                top: "10px"
                                            }}>
                                                 <Text style={{
                                                            fontSize: 9, 
                                                        }} >F/009/01 </Text>
                                                         <Text style={{
                                                            fontSize: 9, 
                                                        }} >1</Text>
                                            </View>
                                          
            </Page>
        </Document>
    );
};

export default TestTakenDoc;
