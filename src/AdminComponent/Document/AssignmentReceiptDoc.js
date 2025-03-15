import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

const AssignmentReceiptDoc = (props) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={{ padding: 30, fontSize: 10 }}>
                 <View 
                                 style={ {
                                                        flexDirection: 'column',
                                                        justifyContent: "space-between",
                                                                alignItems: "center",
                                                                
                                                    }}>
                                   
                                                   <Image 
                                                                   src ={'\public\sitLogo.jpg'}
                                                                   style= {{width: "60px"}}
                                                                   ></Image>
                                </View>

                                <View style={{
                                    flexDirection: "column",
                                    border: "2px solid black",
                                    width: "100%",
                                    flexDirection: "column",

                                }}>
                                     <View style={{
                                    flexDirection: "column",
                                    
                                    width: "100%",
                                    height: "22px",
                                    justifyContent: "center",
                                    alignItems: "center"
                                    
                                }}><Text >ASSIGNMENT RECEIPT RECORD </Text></View>
                                 <View style={{
                                    flexDirection: "column",
                                    width: "100%",
                                    height: "22px",
                                    borderTop: "2px solid black",
                                    alignItems: "center",
                                    flexDirection:"row",
                                    
                                }}>
                                    <Text style={{fontSize: 9,marginLeft: "20px"}}>Training Programme -</Text>
                                    <Text style={{fontSize: 9, marginLeft: "20px"}}>Piping Design & Drafting</Text>
                                    <Text style={{fontSize: 9, marginLeft: "350px"}}>Batch -  </Text>
                                    <Text style={{fontSize: 9, marginLeft: "10px"}}>12029</Text>
                                </View>
                               
                                </View>

                                <View style={{
                                    width: "100%",
                                    height: "5px",
                                    borderBottom : "1px solid black",

                                }}></View>

                                 <View style={{
                                    marginTop: "2px",
                                    // width: "100%",
                                    // height: "5px",
                                    borderTop: "2px solid black",
                                    borderBottom: "2px solid black",
                                    borderLeft: "2px solid black",
                                    flexDirection: "column",
                                    height: "75%",
                                }}>
                                <View style={{
                                    flexDirection: "row",
                                    // width: "100%",
                                    height: "20%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "2px solid black",
                                }}>
                                <View style={{
                                    width: "12%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>Assignment</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>Submission Date</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>Student \ Subject</Text>
                                </View>
                                
                                </View>

                                <View style={{
                                    width: "9.77%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>02,16</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>01-Oct-2017</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>45 degree an </Text>
                                </View>
                                
                                </View>
                                {/*  */}
                                <View style={{
                                    width: "9.77%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>08,12;11 </Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>26-Nov-2017</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>(Pipe thick c  </Text>
                                </View>
                                
                                </View>
                                {/*  */}
                                <View style={{
                                    width: "9.77%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>1;3A;5A;7A</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>24-Sep-2017</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>(1-Drawing-2 </Text>
                                </View>
                                
                                </View>
                                {/*  */}
                                <View style={{
                                    width: "9.77%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>1A;8A</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>22-Oct-2017</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>Assig. based </Text>
                                </View>
                                
                                </View>
                                {/*  */}
                                <View style={{
                                    width: "9.77%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>2A,6A,9A</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>19-Nov-2017</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>Assig. based </Text>
                                </View>
                                
                                </View>
                                {/*  */}
                                <View style={{
                                    width: "9.77%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>3;13;15;(20-26</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>08-Oct-2017</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>Isometric; (A </Text>
                                </View>
                                
                                </View>
                                {/*  */}
                                <View style={{
                                    width: "9.77%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>4;2-MTO</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>15-Oct-2017</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>(Iso & Ortho- </Text>
                                </View>
                                
                                </View>
                                {/*  */}
                                <View style={{
                                    width: "9.77%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>5;14,24 </Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}> 05-Nov-2017 </Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>Assig.5-Iso. </Text>
                                </View>
                                
                                </View>
                                {/*  */}
                                <View style={{
                                    width: "9.77%",
                                    height: "100%",
                                    borderRight: "2px solid black",
                                    flexDirection: "column",

                                }}>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>9;10;4A</Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>10-Dec-2017
                                </Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    // borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 9
                                }}>Specification </Text>
                                </View>
                                
                                </View>
                                {/*  */}
                                
                                
                                </View>
                                <View style={{
                                    width:"100%",
                                    flexDirection: "row",
                                    height: "100%",
                                    

                                }}>
                                <View style={{ 
                                    width:"12%",
                                    height: "5.5%",
                                    
                                    // borderLeft: "2px solid black",
                                    borderBottom: "1px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>
                                <View style={{ 
                                    width:"9.77%",
                                    height: "5.5%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "1px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>
                                <View style={{ 
                                    width:"9.77%",
                                    height: "5.5%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "1px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>
                                <View style={{ 
                                    width:"9.77%",
                                    height: "5.5%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "1px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>
                                <View style={{ 
                                    width:"9.77%",
                                    height: "5.5%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "1px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>
                                <View style={{ 
                                    width:"9.77%",
                                    height: "5.5%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "1px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>
                                <View style={{ 
                                    width:"9.77%",
                                    height: "5.5%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "1px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>
                                <View style={{ 
                                    width:"9.77%",
                                    height: "5.5%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "1px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>
                                <View style={{ 
                                    width:"9.77%",
                                    height: "5.5%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "1px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>
                                <View style={{ 
                                    width:"9.77%",
                                    height: "5.5%",
                                    borderLeft: "2px solid black",
                                    borderBottom: "1px solid black",
                                    borderRight: "2px solid black"
                                }}>
                                    <Text style={{ fontSize: 9}}></Text>
                                </View>


                                </View>
                                </View>
                                
                                                                {/* end part */}
                                <View style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    marginTop: "1%",
                                    justifyContent: "space-between"
                                    
                                }}>
                                    <Text style={{fontSize: 9,}}>F/009/00 </Text>
                                    <Text style={{fontSize: 9,}}>Page 1 of 2</Text>
                                </View>

            </Page>
        </Document>
    );
};

export default AssignmentReceiptDoc;
