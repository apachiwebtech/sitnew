import React from "react";
import { Document, Page, Text, View, Image} from "@react-pdf/renderer";
import { ViewWeek } from "@mui/icons-material";

const SessionPlanDoc = (props) => {
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
                                                <View style={{
                                                    width : "100%",
                                                    height: "3%",
                                                    border: "2px solid black",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <Text style={{fontSize: 9}}>
                                                        SESSION PLAN - Pipeline Engineering
                                                    </Text>
                                                </View>

                                                <View style={{
                                                    marginTop: "5px",
                                                    width : "100%",
                                                    height: "85%",
                                                    border: "2px solid black",
                                                    gap: "3px"
                                                }}>

                                                 {/* part1 */}
                                                 <View style={{
                                                    width: "100%",
                                                    height: "8%",
                                                    flexDirection: "row",                                                
                                                    }}>
                                                {/* 1 */}
                                                    <View style={{
                                                        width: "15%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: "1px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}><Text>Lecture{"\n"}Details</Text></View>
                                                    {/* 2 */}
                                                     <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}><View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Lecture No</Text>
                                                     </View></View>
                                                    {/* 3 */}
                                                     <View style={{
                                                        width: "8%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Day</Text>
                                                     </View>
                                                    </View>
                                                    {/* 4 */}
                                                     <View style={{
                                                        width: "10%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Date </Text>
                                                     </View>
                                                    </View>
                                                    {/* 5 */}
                                                    <View style={{
                                                        width: "16%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                        
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",

                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Duration</Text>
                                                     </View>
                                                     <Text style={{ fontSize: 9, textAlign: "center", paddingTop: "5px"}}>6:30PM To {"\n"}9:30PM</Text>
                                                    </View>
                                                    {/* 6 */}
                                                    <View style={{
                                                        width: "11%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Faculty </Text>
                                                     </View>
                                                    </View>
                                                    {/* 7 */}
                                                    <View style={{
                                                        width: "9%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Venue</Text>
                                                     </View>
                                                    </View>
                                                    {/* 8 */}
                                                    <View style={{
                                                    
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        width: "18%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Topic</Text>
                                                     </View>
                                                     <Text style={{
                                                        fontSize: 9,
                                                    }}>Function & Types Of Pipline
                                                    Systems For Liquid Gas &
                                                    Multiphare Fluids</Text>
                                                    </View>
                                                    </View>

                                                    {/* part2 */}
                                                    <View style={{
                                                        // top: "4px",
                                                        flexDirection: "row",
                                                        width: "100%",
                                                        height: "4%",
                                                        borderBottom: "1px solid black",
                                                        borderTop: "1px solid black",
                                                        alignItems: "center"
                                                    }}>
                                                        <View style={{
                                                            width: "18%",
                                                            height: "100%",
                                                            justifyContent: "center",
                                                            alignItems:"center",
                                                            borderRight: "1px solid black",

                                                        }}><Text style={{fontSize: 9}}>
                                                            Objective of Lecture
                                                        </Text> </View>
                                                        <Text style={{fontSize: 9, textAlign: "center"}}>
                                                            {"\u00A0\u00A0\u00A0\u00A0"} 
                                                            {/* write her down text */}
                                                        </Text>
                                                    </View>

                                                    {/* part 3 */}

                                                    <View style={{
                                                        // top: "8px",
                                                    width: "100%",
                                                    height: "18%",
                                                    flexDirection: "row",
                                                    borderTop: "1px solid black",                                                
                                                    }}>
                                                {/* 1 */}
                                                    <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: "1px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}><Text>Lecture{"\n"}Details</Text></View>
                                                    {/* 2 */}
                                                     <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}><View style={{
                                                        width: "100%",
                                                        height: "17%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Duration </Text>
                                                     </View>
                                                     <Text style={{ fontSize: 9,
                                                     textAlign: "center", paddingTop: "27px"}}> 6:30PM To {"\n"}9:30PM</Text>
                                                     </View>
                                                    {/* 3 */}
                                                     <View style={{
                                                        width: "38%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "17%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Lecture Content to be Taken</Text>
                                                     </View>
                                                    </View>
                                                    {/* 4 */}
                                                     <View style={{
                                                        width: "38%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        // borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "17%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Aditional/Pending Topics If Any </Text>
                                                     </View>
                                                    </View>
                                                    
                                                    </View>

                                                    {/* part 4 */}

                                                    <View style={{
                                                        // top: "12px",
                                                    width: "100%",
                                                    height: "8%",
                                                    flexDirection: "row",
                                                    borderTop: "1px solid black",                                                
                                                    }}>
                                                {/* 1 */}
                                                    <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: "1px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}><Text>Paticipents {"\n"}Details</Text></View>
                                                    {/* 2 */}
                                                     <View style={{
                                                        width: "17%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}><View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Attendance </Text>
                                                     </View>
                                                     <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "30%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Pre.</Text>
                                                        </View>
                                                        <View style={{width: "40%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Abs.</Text>
                                                        </View>
                                                        <View style={{width: "30%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Trans.</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "30%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "40%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "30%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                    </View>
                                                     </View>
                                                    {/* 3 */}
                                                     <View style={{
                                                        width: "45%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Lecture Feedback </Text>
                                                     </View>
                                                     <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "14%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Excel.</Text>
                                                        </View>
                                                        <View style={{width: "20%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Very Good</Text>
                                                        </View>
                                                        <View style={{width: "14%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Good</Text>
                                                        </View>
                                                        <View style={{width: "27%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Satisficatory</Text>
                                                        </View>
                                                        <View style={{width: "25%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Unsatisfactory</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "14%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "20%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "14%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "27%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "25%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                    </View>
                                                    </View>
                                                    {/* 4 */}
                                                     <View style={{
                                                        width: "25%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        // borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Documents Distributed </Text>
                                                     </View>
                                                     <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "50%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Assignments.</Text>
                                                        </View>
                                                        <View style={{width: "50%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        // borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Unit Test</Text>
                                                        </View>
                                                        
                                                    </View>
                                                    <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "50%", 
                                                        height: "100%",
                                                        
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "50%", 
                                                        height: "100%",
                                                        
                                                        // borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        
                                                    </View>
                                                    </View>

                                                                                                        
                                                    
                                                    </View>

                                                    {/* part 5 */}

                                                    <View style={{
                                                        // top: "16px",
                                                        flexDirection: "row",
                                                        width: "100%",
                                                        height: "4%",
                                                        borderBottom: "1px solid black",
                                                        borderTop: "1px solid black",
                                                        alignItems: "center"
                                                    }}>
                                                        <View style={{
                                                            width: "18%",
                                                            height: "100%",
                                                            justifyContent: "center",
                                                            alignItems:"center",
                                                            borderRight: "1px solid black",

                                                        }}><Text style={{fontSize: 9}}>
                                                            Faculty Remark
                                                            and Next lec Plan
                                                        </Text> </View>
                                                        <View style={{
                                                            width: "36%",
                                                            height: "100%",
                                                            justifyContent: "center",
                                                            alignItems:"center",
                                                            borderRight: "1px solid black",

                                                        }}><Text style={{fontSize: 9}}>
                                                            
                                                        </Text> </View>
                                                        <Text style={{fontSize: 9, textAlign: "center"}}>
                                                            {"\u00A0\u00A0\u00A0\u00A0"} 
                                                            {/* write her down text */}
                                                        </Text>
                                                    </View>

                                                    {/* part 6 */}

                                                    <View style={{
                                                        // top: "20px",
                                                    width: "100%",
                                                    height: "6%",
                                                    flexDirection: "row",
                                                    borderTop: "1px solid black",                                                
                                                    }}>
                                                {/* 1 */}
                                                    <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: "1px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}><Text>Signature </Text></View>
                                                    {/* 2 */}
                                                     <View style={{
                                                        width: "28%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}><View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Faculty </Text>
                                                     </View>
                                                     <Text style={{ fontSize: 9,
                                                     textAlign: "center", }}></Text>
                                                     </View>
                                                    {/* 3 */}
                                                     <View style={{
                                                        width: "31%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Training Co-odinator</Text>
                                                     </View>
                                                    </View>
                                                    {/* 4 */}
                                                     <View style={{
                                                        width: "28%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        // borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Authorised Signatory </Text>
                                                     </View>
                                                    </View>
                                                    
                                                    </View>
                                                    {/* lunch */}
                                                    <View style={{
                                                    width : "100%",
                                                    height: "5%",
                                                    borderBottom: "1px solid black",
                                                    borderTop: "1px solid black",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    // marginTop: "24px"
                                                }}>
                                                    <Text style={{fontSize: 9}}>
                                                    LUNCH BREAK

                                                    </Text>
                                                </View>

                                                {/* part 7 */}

                                                <View style={{
                                                    width: "100%",
                                                    height: "8%",
                                                    flexDirection: "row", 
                                                                                                   
                                                    }}>
                                                {/* 1 */}
                                                    <View style={{
                                                        width: "15%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: "1px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}><Text>Lecture{"\n"}Details</Text></View>
                                                    {/* 2 */}
                                                     <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}><View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Lecture No</Text>
                                                     </View></View>
                                                    {/* 3 */}
                                                     <View style={{
                                                        width: "8%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Day</Text>
                                                     </View>
                                                    </View>
                                                    {/* 4 */}
                                                     <View style={{
                                                        width: "10%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Date </Text>
                                                     </View>
                                                    </View>
                                                    {/* 5 */}
                                                    <View style={{
                                                        width: "16%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                        
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",

                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Duration</Text>
                                                     </View>
                                                     <Text style={{ fontSize: 9, textAlign: "center", paddingTop: "5px"}}>6:30PM To {"\n"}9:30PM</Text>
                                                    </View>
                                                    {/* 6 */}
                                                    <View style={{
                                                        width: "11%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Faculty </Text>
                                                     </View>
                                                    </View>
                                                    {/* 7 */}
                                                    <View style={{
                                                        width: "9%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Venue</Text>
                                                     </View>
                                                    </View>
                                                    {/* 8 */}
                                                    <View style={{
                                                    
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        width: "18%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Topic</Text>
                                                     </View>
                                                     <Text style={{
                                                        fontSize: 9,
                                                    }}>Function & Types Of Pipline
                                                    Systems For Liquid Gas &
                                                    Multiphare Fluids</Text>
                                                    </View>
                                                    </View>

                                                    {/* part8 */}
                                                    <View style={{
                                                        // top: "4px",
                                                        flexDirection: "row",
                                                        width: "100%",
                                                        height: "4%",
                                                        borderBottom: "1px solid black",
                                                        borderTop: "1px solid black",
                                                        alignItems: "center"
                                                    }}>
                                                        <View style={{
                                                            width: "18%",
                                                            height: "100%",
                                                            justifyContent: "center",
                                                            alignItems:"center",
                                                            borderRight: "1px solid black",

                                                        }}><Text style={{fontSize: 9}}>
                                                            Objective of Lecture
                                                        </Text> </View>
                                                        <Text style={{fontSize: 9, textAlign: "center"}}>
                                                            {"\u00A0\u00A0\u00A0\u00A0"} 
                                                            {/* write her down text */}
                                                        </Text>
                                                    </View>

                                                    {/* part 9 */}

                                                    <View style={{
                                                        // top: "8px",
                                                    width: "100%",
                                                    height: "16%",
                                                    flexDirection: "row",
                                                    borderTop: "1px solid black",                                                
                                                    }}>
                                                {/* 1 */}
                                                    <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: "1px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}><Text>Lecture{"\n"}Details</Text></View>
                                                    {/* 2 */}
                                                     <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}><View style={{
                                                        width: "100%",
                                                        height: "17%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Duration </Text>
                                                     </View>
                                                     <Text style={{ fontSize: 9,
                                                     textAlign: "center", paddingTop: "27px"}}> 6:30PM To {"\n"}9:30PM</Text>
                                                     </View>
                                                    {/* 3 */}
                                                     <View style={{
                                                        width: "38%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "17%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Lecture Content to be Taken</Text>
                                                     </View>
                                                    </View>
                                                    {/* 4 */}
                                                     <View style={{
                                                        width: "38%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        // borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "17%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Aditional/Pending Topics If Any </Text>
                                                     </View>
                                                    </View>
                                                    
                                                    </View>

                                                    {/* part 10 */}

                                                    <View style={{
                                                        // top: "12px",
                                                    width: "100%",
                                                    height: "8%",
                                                    flexDirection: "row",
                                                    borderTop: "1px solid black",                                                
                                                    }}>
                                                {/* 1 */}
                                                    <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: "1px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}><Text>Paticipents {"\n"}Details</Text></View>
                                                    {/* 2 */}
                                                     <View style={{
                                                        width: "17%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}><View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Attendance </Text>
                                                     </View>
                                                     <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "30%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Pre.</Text>
                                                        </View>
                                                        <View style={{width: "40%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Abs.</Text>
                                                        </View>
                                                        <View style={{width: "30%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Trans.</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "30%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "40%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "30%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                    </View>
                                                     </View>
                                                    {/* 3 */}
                                                     <View style={{
                                                        width: "45%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Lecture Feedback </Text>
                                                     </View>
                                                     <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "14%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Excel.</Text>
                                                        </View>
                                                        <View style={{width: "20%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Very Good</Text>
                                                        </View>
                                                        <View style={{width: "14%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Good</Text>
                                                        </View>
                                                        <View style={{width: "27%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Satisficatory</Text>
                                                        </View>
                                                        <View style={{width: "25%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Unsatisfactory</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "14%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "20%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "14%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "27%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "25%", 
                                                        height: "100%",
                                                        // borderBottom: "1px solid black",
                                                        
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                    </View>
                                                    </View>
                                                    {/* 4 */}
                                                     <View style={{
                                                        width: "25%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        // borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Documents Distributed </Text>
                                                     </View>
                                                     <View style={{
                                                        width: "100%",
                                                        height: "30%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "50%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        // borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Assignments.</Text>
                                                        </View>
                                                        <View style={{width: "50%", 
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        // borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}>Unit Test</Text>
                                                        </View>
                                                        
                                                    </View>
                                                    <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        flexDirection: "row", 
                                                    }}>
                                                        <View style={{width: "50%", 
                                                        height: "100%",
                                                        
                                                        borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        <View style={{width: "50%", 
                                                        height: "100%",
                                                        
                                                        // borderRight: '1px solid black',
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        }}>
                                                            <Text style={{fontSize: 9}}></Text>
                                                        </View>
                                                        
                                                    </View>
                                                    </View>

                                                                                                        
                                                    
                                                    </View>

                                                    {/* part 11 */}

                                                    <View style={{
                                                        // top: "16px",
                                                        flexDirection: "row",
                                                        width: "100%",
                                                        height: "4%",
                                                        borderBottom: "1px solid black",
                                                        borderTop: "1px solid black",
                                                        alignItems: "center"
                                                    }}>
                                                        <View style={{
                                                            width: "18%",
                                                            height: "100%",
                                                            justifyContent: "center",
                                                            alignItems:"center",
                                                            borderRight: "1px solid black",

                                                        }}><Text style={{fontSize: 9}}>
                                                            Faculty Remark
                                                            and Next lec Plan
                                                        </Text> </View>
                                                        <View style={{
                                                            width: "36%",
                                                            height: "100%",
                                                            justifyContent: "center",
                                                            alignItems:"center",
                                                            borderRight: "1px solid black",

                                                        }}><Text style={{fontSize: 9}}>
                                                            
                                                        </Text> </View>
                                                        <Text style={{fontSize: 9, textAlign: "center"}}>
                                                            {"\u00A0\u00A0\u00A0\u00A0"} 
                                                            {/* write her down text */}
                                                        </Text>
                                                    </View>

                                                    {/* part 12 */}

                                                    <View style={{
                                                        // top: "20px",
                                                    width: "100%",
                                                    height: "6%",
                                                    flexDirection: "row",
                                                    borderTop: "1px solid black",                                                
                                                    }}>
                                                {/* 1 */}
                                                    <View style={{
                                                        width: "13%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        borderRight: "1px solid black",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}><Text>Signature </Text></View>
                                                    {/* 2 */}
                                                     <View style={{
                                                        width: "28%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}><View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Faculty </Text>
                                                     </View>
                                                     <Text style={{ fontSize: 9,
                                                     textAlign: "center", }}></Text>
                                                     </View>
                                                    {/* 3 */}
                                                     <View style={{
                                                        width: "31%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Training Co-odinator</Text>
                                                     </View>
                                                    </View>
                                                    {/* 4 */}
                                                     <View style={{
                                                        width: "28%",
                                                        height: "100%",
                                                        borderBottom: "1px solid black",
                                                        flexDirection: "column",
                                                        // borderRight: "1px solid black",
                                                    }}>
                                                        <View style={{
                                                        width: "100%",
                                                        height: "40%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid black",
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 9,
                                                    }}>Authorised Signatory </Text>
                                                     </View>
                                                    </View>
                                                    
                                                    </View>

                                                     
                                               

                                                </View>
            </Page>
        </Document>
    );
};

export default SessionPlanDoc;
