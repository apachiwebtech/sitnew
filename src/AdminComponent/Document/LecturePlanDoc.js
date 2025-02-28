import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";


const LecturePlanDoc = (props) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={{ padding: 30, fontSize: 10 }}>
                <View
                style={ {
                    flexDirection: 'column',
                    justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1px",
                }}>
                <Image 
                src ={'\public\sitLogo.jpg'}
                style= {{width: "60px"}}
                ></Image>
                    
                </View>
                <View style={{
                    border: "3px solid black",
                    textAlign: "center",
                    padding: "5px",
                    fontWeight: "bold",
                    width: "100%"
                }}>
                <Text style={{fontSize: 10}}> LECTURE PLAN & DETAILS</Text>
                </View>

                <View style={{
                    marginTop: "5px",
                    border: "3px solid black",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "75%",
                }}>
                <View style={{
                    width: "100%",
                    borderBottom: "2px solid black",
                    paddingTop : "10px",
                    paddingBottom : "5px",
                    textAlign: "center",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent : "flex-start",
                    gap: "100px"
                }}>
                <Text style={{fontSize: 10}}> Training programme :    Pipeline Engineeering </Text>
                <Text style={{fontSize: 10}}> Batch No :    17001 </Text>
                <Text style={{fontSize: 10}}> Category :    Part Time</Text>
                </View>

                {/* part2 */}
                <View style={{
                    width:"100%",
                    
                    borderBottom: "2px solid black",
                    display: "flex",
                    flexDirection: "row",                    
                    
                }}>
                <View style={{
                    // flex: 1,
                    borderRight: "2px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "5px",
                    paddingBottom: "2px",
                   
                }}>
                <Text style={{fontSize: 10,
                }}> Lecture </Text>
                <Text style={{fontSize: 10,
                }}> No. </Text>
                </View>
                <View style={{
                    flex: 1,
                    borderRight: "2px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                    
                }}>
                <Text style={{fontSize: 10}}>Planned</Text>
                <Text style={{fontSize: 10}}>Date</Text>
                </View>
                <View style={{
                   flex: 1,
                    borderRight: "2px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "5px",
                    paddingBottom: "2px",
                }}>
                <Text style={{fontSize: 10}}>Planned</Text>
                <Text style={{fontSize: 10}}>Time</Text>
                </View>
                {/* 3 in 1 */}
                <View style={{
                    flex: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "2px solid black",
                    paddingTop: "2px",
                    // paddingBottom: "2.5px",

                    
                    
                }}>
                <Text style={{fontSize: 10,
                paddingBottom:"1px",
                }}> Lecture Content in Detail </Text>
                <View style={{
                    width:"100%",
                    height:"auto",
                    borderTop: "2px solid black",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                   
                }}>
                <View style={{
                    borderRight: "2px solid block",
                    width: "50%",
                    height:"auto",
                    
                }} >
                <Text style={{fontSize: "10px"}}> Topic </Text>
                </View>
                <View style={{
                    // flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                }}>
                <Text style={{fontSize: "10px"}}> Sub Topic</Text>
                </View>
                </View>
                
                </View>

                {/* 2 in 1 */}
                <View style={{
                    flex: 2,
                    borderRight: "2px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "2.1px",
                    paddingBottom: "2px",
                }}> 
                <View style={{
                    width:"100%",
                    borderBottom: "2px solid black",
                    paddingBottom: "1px"
                }}>
                <Text style={{fontSize: 10}}> Assignment</Text>
                </View>
                <View >
                <Text style={{fontSize: 10,
                paddingTop: "3px",}}> Test</Text>
                </View>
                </View>

                {/* 1 */}
                <View style={{
                    flex: 1.3,
                    borderRight: "2px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "5px",
                    paddingBottom: "3px",
                }}>
                <Text style={{fontSize: 10}}> Documents / Photocopy / LCD Required </Text>
                </View>
                <View style={{
                    flex: 2,
                    borderRight: "2px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "5px",
                    paddingBottom: "2px",
                }}>
                <Text style={{fontSize: 10}}> Faculty</Text>
                </View>
                <View style={{
                    flex: 1,
                    borderRight: "2px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "5px",
                    paddingBottom: "2px",
                }}>
                <Text style={{fontSize: 10}}> Actual </Text>
                <Text style={{fontSize: 10}}>  Date</Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "5px",
                    paddingBottom: "2px",
                }}>
                <Text style={{fontSize: 10}}> Actual </Text>
                <Text style={{fontSize: 10}}> Time</Text>
                </View>


                </View>
                {/* part3 */}

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: "auto",
                    borderBottom: "2px solid black",
                   
                }}>
                    <View style={{
                        // flex:0.452,
                        width: "5.3%",
                        borderRight: "2px solid black",
                        justifyContent: "center",
                    alignItems: "center",
                     paddingTop:"6px",
                    paddingBottom: "3px"

                    }}>
                        <Text style={{fontSize: 10}}>1axcwwdwdwdwdddwdwd</Text>
                    </View>
                    <View style={{
                        // flex: 0.670,
                        width: "7.8%",
                        borderRight: "2px solid black",
                        justifyContent: "center",
                    alignItems: "center",
                    }}>
                    <Text style={{fontSize: 10}}> Wednesday </Text>
                    <Text style={{fontSize: 10}}> 01 Feb 12 </Text>
                    </View>
                    <View style={{
                        // flex: 0.695,
                       width: "7.8%",
                        borderRight: "2px solid black",
                        justifyContent: "center",
                    alignItems: "center",
                    }}>
                    <Text style={{fontSize: 10}}>  6:30PM</Text>
                    <Text style={{fontSize: 10}}> to </Text>
                    <Text style= {{fontsize: 10}}>9:30PM</Text>
                    </View>
                    <View style={{
                        // flex: 2,
                        width: "23%",
                        borderRight: "2px solid black",
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <View style={{
                        width: "50%",
                        borderRight: "2px solid black",
                        display: "flex",
                        justifyContent: "center",
                    alignItems: "center",
                    }}>
                    <Text style={{fontSize: 10}}>  Function & Types Of
                    Pipline Systems For
                    Liquid Gas &
                    Multiphare Fluids</Text>
                    
                    </View>
                    <View style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                    alignItems: "center",
                    }}>
                    <Text style={{fontSize: 10}}>  </Text>
                    </View>
                    </View>
                    <View style={{
                        // flex: 1.35,
                        width: "15.3%",
                        borderRight: "2px solid black",
                        display: "flex",
                        flexDirection: "column",
                    }}><View style={{
                        width: "100%",
                        // height: "20%",
                        paddingTop: "7px",
                        paddingBottom: "7px",
                        borderBottom:  "2px solid black",
                        justifyContent: "center",
                    alignItems: "center",
                    }}>
                    <Text style={{fontSize: 10}}>1  </Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                        // height: "20%",
                        paddingTop: "7px",
                        paddingBottom: "7px",
                    }}>
                    <Text style={{fontSize: 10}}>2  </Text>
                    </View></View>
                   
                    <View style={{
                        // flex: 1,
                        width: "10.1%",
                        borderRight: "2px solid black",
                        justifyContent: "center",
                    alignItems: "center",
                    }}>
                    <Text style={{fontSize: 10}}>Course Material  </Text>
                    </View>
                    <View style={{
                        // flex:1,
                        width: "15.4%",
                        borderRight: "2px solid black",
                        justifyContent: "center",
                    alignItems: "center",
                    }}>
                    <Text style={{fontSize: 9}}>Rudresh B.Hanchinamani  </Text>
                    </View>
                    <View style={{
                        // flex:1,
                        width: "7.7%",
                        borderRight: "2px solid black",
                        justifyContent: "center",
                    alignItems: "center",
                    }}>
                    <Text style={{fontSize: 10}}>Wednesday  </Text>
                    <Text style={{fontSize: 10}}> 01 Feb 12 </Text>
                    </View>
                    <View style={{
                        // flex: 1,
                        width: "7.6%",
                    justifyContent: "center",
                    alignItems: "center",
                    }}>
                    <Text style={{fontSize: 10}}>  6:30PM</Text>
                    <Text style={{fontSize: 10}}> to </Text>
                    <Text style= {{fontsize: 10}}>9:30PM</Text>
                    </View>

                    
                </View>


                </View>
                {/* part  4 */}

                <View style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingLeft: "30px",
                    paddingRight: "30px"
                }}>
                    <View >
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "extrabold",
                        }}>F/006B/04 </Text>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                    }} >
                    <View >
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "extrabold",
                        }}>Prepared by :  </Text>
                    </View>
                    <View >
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "extrabold",
                        }}>___________________ </Text>
                    </View>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                    }} >
                    <View >
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "extrabold",
                        }}>Checked by :</Text>
                    </View>
                    <View >
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "extrabold",
                        }}> ___________________</Text>
                    </View>
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                    }} >
                    <View >
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "extrabold",
                        }}>Approved by : </Text>
                    </View><View >
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "extrabold",
                        }}> ___________________</Text>
                    </View>
                    </View>

                    <View >
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "extrabold",
                        }}>1 </Text>
                    </View>
                    

                </View>
            </Page>
        </Document>
    );
};

export default LecturePlanDoc;
