import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

const TimeSheetDoc = (props) => {
    return (
        <Document>
            <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
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
                {/* part 1 */}
                <View style={{
                    width: "100%",
                    height: "18px",
                    backgroundColor: "yellow",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid black",
                }}>
                    <Text style={{fontSize: 8,
                    textAlign: "center",
                    fontWeight: "bold",
                    }}>TIME SHEET</Text>
                </View>

                {/* part 2 */}

                <View style={{
                    top: "0.5%",
                    width: "100%",
                    height: "85%",
                    // border: "2px solid black",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        width: "48.5%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        border: "2px solid black",
                    }}>
                        {/* part 2.1 */}
                        <View style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "yellow",
                            borderBottom: "1px solid black"
                        }}> 
                            <View style= {{
                                width: "80%",
                                height: "3%",
                                paddingTop: "1%"
                            }}><Text style={{fontSize: 9,
                            textAlign: "center"}}>Training Programme :</Text></View>
                            <View style= {{
                                width: "20%",
                                height: "3%",
                                paddingTop: "1%"
                            }}><Text style={{fontSize: 9}}>Batch No.</Text></View>
                        </View>
                        <View style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            height: "3%",
                            // backgroundColor: "yellow",
                            borderBottom: "1px solid black"
                        }}>
                            <View style= {{
                                width: "75%",
                                paddingBottom: "1%",
                                paddingTop: "1%",
                                borderRight: "1px solid black"
                            }}><Text style={{fontSize: 9,
                            textAlign: "center"}}>Training in Process Plant System Management</Text></View>
                            <View style= {{
                                width: "25%",
                                height: "10%",
                                paddingBottom: "1%",
                                paddingTop: "1%",
                                
                            }}><Text style={{fontSize: 9, textAlign: "center"}}>32002</Text></View>
                        </View>
                        <View style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", borderBottom: "1px solid black",backgroundColor:"yellow"}}>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "10%",
                                display:"flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: "2px"
                                // height: "10%"
                            }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px"}}>Sr </Text>
                                <Text style={{fontSize: 9, textAlign: "center", paddingBottom: "2px"}}>No</Text>
                            </View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "40%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}>Name</Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}>In</Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",

                            }}><Text style={{fontSize: 9, textAlign: "center"}}>Assign </Text></View>
                            <View style={{
                                // borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center",
                            }}><Text style={{fontSize: 9, textAlign: "center"}}>Sign</Text></View>
                            
                        </View>
                        {/* part 3 */}

                        <View style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", borderBottom: "1px solid black"}}>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "10%",
                                display:"flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                // height: "10%"
                            }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px",
                            paddingTop: "1px"}}>1 </Text>
                                
                            </View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "40%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}>Ahasun Ali</Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",

                            }}><Text style={{fontSize: 9, textAlign: "center"}}> </Text></View>
                            <View style={{
                                // borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center",
                            }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                            
                        </View>
                        <View style={{width: "100%", flexGrow: 1, display: "flex", flexDirection: "row", borderBottom: "1px solid black"}}>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "10%",
                                display:"flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                // height: "10%"
                            }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px",
                            paddingTop: "1px"}}></Text>
                                
                            </View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "40%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",

                            }}><Text style={{fontSize: 9, textAlign: "center"}}> </Text></View>
                            <View style={{
                                // borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center",
                            }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                            
                        </View>
                    </View>
                    <View style={{
                        width: "48.5%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        border: "2px solid black",
                    }}>
                    <View style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "yellow",
                            borderBottom: "1px solid black"
                        }}> 
                            <View style= {{
                                width: "50%",
                                // height: "3%",
                                paddingTop: "1%",
                                borderRight: "1px solid black"
                            }}><Text style={{fontSize: 9,
                            textAlign: "center"}}>Date </Text></View>
                            <View style= {{
                                width: "50%",
                                height: "3%",
                                paddingTop: "1%",
                                display:"flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}><Text style={{fontSize: 9}}>Time</Text></View>
                        </View>
                        <View style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            height: "3%",
                            // backgroundColor: "yellow",
                            borderBottom: "1px solid black"
                        }}>
                            <View style= {{
                                width: "50%",
                                paddingBottom: "1%",
                                paddingTop: "1%",
                                borderRight: "1px solid black"
                            }}><Text style={{fontSize: 9,
                            textAlign: "center"}}></Text></View>
                            <View style= {{
                                width: "50%",
                                height: "10%",
                                paddingBottom: "1%",
                                paddingTop: "1%",
                                
                            }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                        </View>
                        <View style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", borderBottom: "1px solid black",backgroundColor:"yellow"}}>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "10%",
                                display:"flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: "2px"
                                // height: "10%"
                            }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px"}}>Sr </Text>
                                <Text style={{fontSize: 9, textAlign: "center", paddingBottom: "2px"}}>No</Text>
                            </View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "40%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}>Name</Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}>In</Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",

                            }}><Text style={{fontSize: 9, textAlign: "center"}}>Assign </Text></View>
                            <View style={{
                                // borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center",
                            }}><Text style={{fontSize: 9, textAlign: "center"}}>Sign</Text></View>
                            
                        </View>
                        
                        
                        
                        <View style={{width: "100%", flexGrow: 1, display: "flex", flexDirection: "row", borderBottom: "1px solid black"}}>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "10%",
                                display:"flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                // height: "10%"
                            }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px",
                            paddingTop: "1px"}}></Text>
                                
                            </View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "40%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",

                            }}><Text style={{fontSize: 9, textAlign: "center"}}> </Text></View>
                            <View style={{
                                // borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center",
                            }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                            
                        </View>
                    </View>
                </View>

                {/* end part */}
                <View style={{
                    marginTop: "1%",
                    display: "flex", flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "2%",
                    paddingRight: "2%",
                width: "100%",
                }}>
                    <View style={{display: "flex", justifyContent: "start",}}>
                        <Text style={{ fontSize: 8}}>F/005/00</Text>
                    </View>
                    <View style={{display: "flex", justifyContent: "start",}}>
                        <Text style={{ fontSize: 8}}>1</Text>
                    </View>
                </View>


            </Page>
        </Document>
    );
};

export default TimeSheetDoc;
