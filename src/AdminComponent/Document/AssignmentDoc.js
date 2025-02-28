import React from 'react'
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";


const AssignmentDoc = (props) => {
  return (
    <Document>
                <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                    <View>
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
                    </View>
                    <View style={{
                                        width: "100%",
                                        height: "18px",
                                        // backgroundColor: "yellow",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "3px solid black",
                                    }}>
                                        <Text style={{fontSize: 8,
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        }}>ASSIGNMENT RECORD</Text>
                                    </View>
                    
                                    {/* part 2 */}
                    
                                    <View style={{
                                        // top: "0.5%",
                                        width: "100%",
                                        height: "85%",
                                        // border: "2px solid black",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}>
                                        <View style={{
                                            width: "50%",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            borderBottom: "3px solid black",
                                            borderRight: "2px solid black",
                                            borderLeft: "3px solid black",

                                     }}>
                                            {/* part 2.1 */}
                                            <View style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                // backgroundColor: "yellow",
                                                borderBottom: "3px solid black"
                                            }}> 
                                                <View style= {{
                                                    width: "45%",
                                                    height: "3%",
                                                    paddingTop: "1%"
                                                }}><Text style={{fontSize: 9,
                                                textAlign: "center"}}>Training Programme :</Text></View>
                                                <View style= {{
                                                    width: "55%",
                                                    height: "3%",
                                                    paddingTop: "1%"
                                                }}><Text style={{fontSize: 9}}>Piping Engineering</Text></View>
                                            </View>
                                            <View style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                height: "5%",
                                                // backgroundColor: "yellow",
                                                borderBottom: "2px solid black"
                                            }}>
                                                <View style= {{
                                                    width: "35%",
                                                    paddingBottom: "2%",
                                                    paddingTop: "5%",
                                                    borderRight: "2px solid black"
                                                }}><Text style={{fontSize: 9,
                                                textAlign: "center"}}>Assignment No</Text></View>
                                                <View style= {{
                                                    width: "65%",
                                                    height: "10%",
                                                    paddingBottom: "2%",
                                                    paddingTop: "5%",
                                                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Subject</Text></View>
                                            </View>
                                            <View style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                height: "3%",
                                                // backgroundColor: "yellow",
                                                borderBottom: "2px solid black"
                                            }}>
                                                <View style= {{
                                                    width: "35%",
                                                    // paddingBottom: "2%",
                                                    paddingTop: "2%",
                                                    borderRight: "2px solid black"
                                                }}><Text style={{fontSize: 9,
                                                textAlign: "center"}}>A1</Text></View>
                                                <View style= {{
                                                    width: "65%",
                                                    height: "3%",
                                                    paddingBottom: "2%",
                                                    paddingTop: "2%",
                                                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Assignment 1
                                                </Text></View>
                                            </View>
                                            <View style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", borderBottom: "2px solid black"}}>
                                                <View style={{
                                                    borderRight: "2px solid black",
                                                    width: "8%",
                                                    display:"flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    gap: "2px"
                                                    // height: "10%"
                                                }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px"}}>Sr </Text>
                                                    <Text style={{fontSize: 9, textAlign: "center", paddingBottom: "2px"}}>No</Text>
                                                </View>
                                                <View style={{
                                                    borderRight: "2px solid black",
                                                    width: "40%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Name</Text></View>
                                                <View style={{
                                                    borderRight: "2px solid black",
                                                    width: "18%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Sub.Date</Text></View>
                                                <View style={{
                                                    borderRight: "2px solid black",
                                                    width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Marks </Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                   width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                    borderRight: "2px solid black",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>SubSign</Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                    width: "10.26%",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>RecdSign</Text></View>
                                                
                                                
                                            </View>
                                            {/* part 3 */}
                    
                                            <View style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", borderBottom: "1px solid black"}}>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "8%",
                                                    display:"flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    paddingTop: "3px",
                                                    paddingBottom: "3px",
                                                    // height: "10%"
                                                }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px"}}>1 </Text>
                                                    
                                                </View>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "40%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Akshay Narayan Gadadare</Text></View>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "18%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>30-Nov-24</Text></View>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>13 </Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                   width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                    borderRight: "1px solid black",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                    width: "10.26%",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                                                
                                                
                                            </View>
                                            <View style={{width: "100%", flexGrow: 1, display: "flex", flexDirection: "row", borderBottom: "1px solid black"}}>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "8%",
                                                    display:"flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    // height: "10%"
                                                }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px"}}> </Text>
                                                    
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
                                                    width: "18%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}> </Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                   width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                    borderRight: "1px solid black",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                    width: "10.26%",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                                                
                                                
                                            </View>
                                        </View>
                                        <View style={{
                                            width: "50%",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            borderBottom: "3px solid black",
                                            borderRight: "3px solid black",
                                            
                                        }}>
                                         <View style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                // backgroundColor: "yellow",
                                                borderBottom: "3px solid black"
                                            }}> 
                                                <View style= {{
                                                    width: "45%",
                                                    height: "3%",
                                                    paddingTop: "1%"
                                                }}><Text style={{fontSize: 9,
                                                textAlign: "center"}}>Batch No :-</Text></View>
                                                <View style= {{
                                                    width: "55%",
                                                    height: "3%",
                                                    paddingTop: "1%"
                                                }}><Text style={{fontSize: 9}}>01159</Text></View>
                                            </View>
                                            <View style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                height: "5%",
                                                // backgroundColor: "yellow",
                                                borderBottom: "2px solid black"
                                            }}>
                                                <View style= {{
                                                    width: "66%",
                                                    paddingBottom: "2%",
                                                    paddingTop: "5%",
                                                    borderRight: "2px solid black"
                                                }}><Text style={{fontSize: 9,
                                                textAlign: "center"}}>Date</Text></View>
                                                <View style= {{
                                                    width: "34%",
                                                    height: "10%",
                                                    paddingBottom: "2%",
                                                    paddingTop: "5%",
                                                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Total Marks </Text></View>
                                            </View>
                                            <View style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                height: "3%",
                                                // backgroundColor: "yellow",
                                                borderBottom: "2px solid black"
                                            }}>
                                                <View style= {{
                                                    width: "66%",
                                                    // paddingBottom: "2%",
                                                    paddingTop: "2%",
                                                    borderRight: "2px solid black"
                                                }}><Text style={{fontSize: 9,
                                                textAlign: "center"}}>30-Nov-24</Text></View>
                                                <View style= {{
                                                    width: "34%",
                                                    height: "3%",
                                                    paddingBottom: "2%",
                                                    paddingTop: "2%",
                                                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>25</Text></View>
                                            </View>
                                            {/*  */}
                                            <View style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", borderBottom: "2px solid black"}}>
                                                <View style={{
                                                    borderRight: "2px solid black",
                                                    width: "8%",
                                                    display:"flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    
                                                    gap: "2px"
                                                    // height: "10%"
                                                }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px"}}>Sr </Text>
                                                    <Text style={{fontSize: 9, textAlign: "center", paddingBottom: "2px"}}>No</Text>
                                                </View>
                                                <View style={{
                                                    borderRight: "2px solid black",
                                                    width: "40%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Name</Text></View>
                                                <View style={{
                                                    borderRight: "2px solid black",
                                                    width: "18%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Sub.Date</Text></View>
                                                <View style={{
                                                    borderRight: "2px solid black",
                                                    width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Marks </Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                   width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                    borderRight: "2px solid black",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>SubSign</Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                    width: "10.26%",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>RecdSign</Text></View>
                                                
                                                
                                            </View>
                                            {/* part 3 */}
                    
                                            <View style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", borderBottom: "1px solid black"}}>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "8%",
                                                    display:"flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    // height: "10%"
                                                }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px"}}>1 </Text>
                                                    
                                                </View>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "40%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>Akshay Narayan Gadadare</Text></View>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "18%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>30-Nov-24</Text></View>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}>13 </Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                   width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                    borderRight: "1px solid black",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                    width: "10.26%",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                                                
                                                
                                            </View>
                                            <View style={{width: "100%", flexGrow: 1, display: "flex", flexDirection: "row", borderBottom: "1px solid black"}}>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "8%",
                                                    display:"flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    // height: "10%"
                                                }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px"}}> </Text>
                                                    
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
                                                    width: "18%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center"
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                                                <View style={{
                                                    borderRight: "1px solid black",
                                                    width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                    
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}> </Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                   width: "10.26%",
                                                    display: "flex",
                                                    justifyContent:"center",
                                                    alignItems: "center",
                                                    borderRight: "1px solid black",
                                                }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                                                <View style={{
                                                    // borderRight: "1px solid black",
                                                    width: "10.26%",
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
  )
}

export default AssignmentDoc
