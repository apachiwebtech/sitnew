import React from "react";
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import sitlogo from '../../assets/images/sitlogo.png'
const TimeSheetDoc = ({timedata}) => {
    console.log(timedata)
    const data = timedata

    const pdfheaddetail = data[0]

    Font.register({
            family: 'Poppins',
            fonts: [
                {
                    src: '/fonts/Poppins-Regular.ttf',
                    fontWeight: 'normal',
                },
                {
                    src: '/fonts/Poppins-SemiBold.ttf',
                    fontWeight: 600,
                },
                {
                    src: '/fonts/Poppins-Bold.ttf',
                    fontWeight: 'bold',
                },
            ],
        });
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
                                                   style= {{width: "90px"}}
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
                    fontFamily: 'Poppins',
                                                fontWeight: 600,
                    }}>TIME SHEET</Text>
                </View>

                {/* part 2 */}

                <View style={{
                    top: "0.5%",
                    width: "100%",
                    // height: "85%",
                    // border: "2px solid black",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <View style={{
    width: "48.5%",
    display: "flex",
    flexDirection: "column",
    borderLeft: "2px solid black",
    borderRight: "2px solid black",
}}>
    {/* Title Row */}
    <View style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "yellow",
        borderBottom: "1px solid black",
        borderTop: "2px solid black",
    }}>
        <View style={{
            width: "80%",
            height: 17,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{ fontSize: 9, textAlign: "center",fontFamily: 'Poppins',
                                                fontWeight: 600, }}>Training Programme :</Text>
        </View>
        <View style={{
            width: "20%",
            height: 17,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{ fontSize: 9,fontFamily: 'Poppins',
                                                fontWeight: 600, }}>Batch No.</Text>
        </View>
    </View>

    {/* Programme Name Row */}
    <View style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        height: 17,
        borderBottom: "1px solid black"
    }}>
        <View style={{
            width: "75%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid black"
        }}>
            <Text style={{ fontSize: 9, textAlign: "center" }}>{pdfheaddetail.Course_Name}</Text>
        </View>
        <View style={{
            width: "25%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{ fontSize: 9, textAlign: "center" }}>{pdfheaddetail.Batch_code}</Text>
        </View>
    </View>

    {/* Header Row */}
    <View style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", borderBottom: "1px solid black",backgroundColor:"yellow"}}>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "10%",
                                display:"flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: "2px"
                                // height: "10%"
                            }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px",fontFamily: 'Poppins',
                                fontWeight: 600,}}>Sr </Text>
                                <Text style={{fontSize: 9, textAlign: "center", paddingBottom: "2px",fontFamily: 'Poppins',
                                                fontWeight: 600,}}>No</Text>
                            </View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "40%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center",fontFamily: 'Poppins',
                                fontWeight: 600,}}>Name</Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center",fontFamily: 'Poppins',
                                fontWeight: 600,}}>In</Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",

                            }}><Text style={{fontSize: 9, textAlign: "center",fontFamily: 'Poppins',
                                fontWeight: 600,}}>Assign </Text></View>
                            <View style={{
                                // borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center",
                            }}><Text style={{fontSize: 9, textAlign: "center",fontFamily: 'Poppins',
                                fontWeight: 600,}}>Sign</Text></View>
                            
                        </View>
</View>

                    
                    <View style={{
                        width: "48.5%",
                        // height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRight: "2px solid black",
                        borderLeft: "2px solid black",
                        
                    }}>
                    <View style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "yellow",
                            borderBottom: "1px solid black",
                            borderTop: "2px solid black"
                        }}> 
                            <View style= {{
                                width: "50%",
                                // height: "3%",
                                paddingTop: "1%",
                                borderRight: "1px solid black"
                            }}><Text style={{fontSize: 9,
                            textAlign: "center",fontFamily: 'Poppins',
                            fontWeight: 600,}}>Date </Text></View>
                            <View style= {{
                                width: "50%",
                                height: "3%",
                                paddingTop: "1%",
                                display:"flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}><Text style={{fontSize: 9,fontFamily: 'Poppins',
                                fontWeight: 600,}}>Time</Text></View>
                        </View>
                        <View style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            // height: "3%",
                            // backgroundColor: "yellow",
                            borderBottom: "1px solid black"
                        }}>
                            <View style= {{
                                width: "50%",
                                height:"100%",
                                
                                paddingBottom: "5%",
                                paddingTop: "2%",
                                borderRight: "1px solid black"
                            }}><Text style={{fontSize: 9,
                            textAlign: "center"}}></Text></View>
                            <View style= {{
                                width: "50%",
                                height: "100%",
                                paddingBottom: "1%",
                                paddingTop: "2%",
                                
                                
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
                            }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px",fontFamily: 'Poppins',
                                fontWeight: 600,}}>Sr </Text>
                                <Text style={{fontSize: 9, textAlign: "center", paddingBottom: "2px",fontFamily: 'Poppins',
                                                fontWeight: 600,}}>No</Text>
                            </View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "40%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center",fontFamily: 'Poppins',
                                fontWeight: 600,}}>Name</Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center"
                            }}><Text style={{fontSize: 9, textAlign: "center",fontFamily: 'Poppins',
                                fontWeight: 600,}}>In</Text></View>
                            <View style={{
                                borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",

                            }}><Text style={{fontSize: 9, textAlign: "center",fontFamily: 'Poppins',
                                fontWeight: 600,}}>Assign </Text></View>
                            <View style={{
                                // borderRight: "1px solid black",
                                width: "16.6%",
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center",
                            }}><Text style={{fontSize: 9, textAlign: "center",fontFamily: 'Poppins',
                                fontWeight: 600,}}>Sign</Text></View>
                            
                        </View>
                    </View>
                    
                </View>
                
                {/* data entry */}
                <View style={{ display: "flex", flexDirection: "column", }}>
    {(() => {
        const half = Math.ceil(data.length / 2);
        const leftCol = data.slice(0, half);
        const rightCol = data.slice(half);

        const maxRows = Math.max(leftCol.length, rightCol.length);

        return Array.from({ length: maxRows }).map((_, index) => (
            <View
                key={index}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    
                }}
            >
                {/* Left column */}
                {leftCol[index] ? (
                    <View
                        style={{
                            width: "48.5%",
                            borderBottom: "2px solid black",
                            borderLeft: "2px solid black",
                            borderRight: "2px solid black",
                        }}
                    >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <View
                                    style={{
                                        width: "10%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRight: "1px solid black",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center", padding: "6px 6px" }}>
                                        {index + 1}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        borderRight: "1px solid black",
                                        width: "40%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}> {leftCol[index].Student_Name} </Text>
                                </View>

                                <View
                                    style={{
                                        borderRight: "1px solid black",
                                        width: "16.6%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}></Text>
                                </View>

                                <View
                                    style={{
                                        borderRight: "1px solid black",
                                        width: "16.6%",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}></Text>
                                </View>

                                <View
                                    style={{
                                        width: "16.6%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={{ width: "48.5%" }} />
                )}

                {/* Right column */}
                {rightCol[index] ? (
                    <View
                        style={{
                            width: "48.5%",
                            borderBottom: "2px solid black",
                            borderLeft: "2px solid black",
                            borderRight: "2px solid black",
                        }}
                    >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <View
                                    style={{
                                        width: "10%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRight: "1px solid black",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center", padding: "6px 6px" }}>
                                        {half + index}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        borderRight: "1px solid black",
                                        width: "40%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}> {rightCol[index].Student_Name} </Text>
                                </View>

                                <View
                                    style={{
                                        borderRight: "1px solid black",
                                        width: "16.6%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}></Text>
                                </View>

                                <View
                                    style={{
                                        borderRight: "1px solid black",
                                        width: "16.6%",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}></Text>
                                </View>

                                <View
                                    style={{
                                        width: "16.6%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: 9, textAlign: "center" }}></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={{ width: "48.5%" }} />
                )}
            </View>
        ));
    })()}
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




// <View style={{
//                     // top: "0.5%",
//                     width: "100%",
//                     height: "77%",
//                     // border: "2px solid black",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between"
//                 }}>
//                     {data.reduce((rows,item, index) => {
//                             if (index % 2 === 0) {
//                                 rows.push(data.slice(index, index + 2)); // Group data into pairs
//                             }
//                             return rows;
//                         }, [])
//                         .map((row, rowIndex) => (
                     
//                     <View key={rowIndex}
//                      style={{
//                         width: "48.5%",
//                         height: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                         borderLeft: "2px solid black",
//                         borderRight: "2px solid black",
//                         borderBottom: "2px solid black",
//                     }}>
                        
//                         {row.map((item, itemIndex) => (
//                         <View key={itemIndex}
//                         style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", borderBottom: "1px solid black"}}>
                            
//                             <View style={{
//                                 borderRight: "1px solid black",
//                                 width: "10%",
//                                 display:"flex",
//                                 flexDirection: "column",
//                                 justifyContent: "center",
//                                 // height: "10%"
//                             }}><Text style={{fontSize: 9, textAlign: "center", paddingTop: "2px",
//                             paddingTop: "1px"}}> </Text>
                                
//                             </View>
//                             <View style={{
//                                 borderRight: "1px solid black",
//                                 width: "40%",
//                                 display: "flex",
//                                 justifyContent:"center",
//                                 alignItems: "center"
//                             }}><Text style={{fontSize: 9, textAlign: "center"}}>{item.Student_Name}</Text></View>
//                             <View style={{
//                                 borderRight: "1px solid black",
//                                 width: "16.6%",
//                                 display: "flex",
//                                 justifyContent:"center",
//                                 alignItems: "center"
//                             }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
//                             <View style={{
//                                 borderRight: "1px solid black",
//                                 width: "16.6%",
//                                 display: "flex",
//                                 justifyContent:"center",

//                             }}><Text style={{fontSize: 9, textAlign: "center"}}> </Text></View>
//                             <View style={{
//                                 // borderRight: "1px solid black",
//                                 width: "16.6%",
//                                 display: "flex",
//                                 justifyContent:"center",
//                                 alignItems: "center",
//                             }}><Text style={{fontSize: 9, textAlign: "center"}}></Text></View>
                            
//                         </View>
                        
                        
                        
//                    ))}
//                     </View>
                    
//                 ))}
//                 </View>