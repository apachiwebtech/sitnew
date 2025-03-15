// import React from 'react'
// import { Document, Page, Text, View, Image} from "@react-pdf/renderer";
// const AnalysisDoc = () => {
//   return (
//    <Document>
//     <Page size="A4" style={{padding: 30, fontSize: 10}}>
       
//             <View 
//                                                      style={ {
//                                                                             flexDirection: 'column',
//                                                                             justifyContent: "space-between",
//                                                                                     alignItems: "center",
                                                                                    
//                                                                         }}>
                                                       
//                                                                        <Image 
//                                                                                        src ={'\public\sitLogo.jpg'}
//                                                                                        style= {{width: "60px"}}
//                                                                                        ></Image>
//                                                     </View>
        
//         <View style={{
//             width: "100%",
//             height: "2.5%",
//             border:"2px solid block",
//             justifyContent: "center",
//             alignItems: "center"
//         }}>
//             <Text style={{fontSize: 9}}>BATCH ANALYSIS RECORD</Text>
//         </View>
//         <View style={{
//             top: "4px",
//             width:"100%",
//             height: "85%",
//             flexDirection: "column",
//             border: "2px solid black",
            

//         }}>{/* inside main View */}
//         <View style={{
//             width: "100%",
//             height: "3%",
//             borderBottom: "1px solid black",
//             flexDirection: "row",
//         }}>
//             <View style={{
//                 width : "30%",
//                 height: "100%",
//                 borderRight: "1px solid black",
//                 justifyContent: "center",


//             }}>
//                 <Text style={{fontSize: 9, paddingLeft: "8px"}}>Training Programme</Text>
//             </View>
//             <View style={{
//                 width : "70%",
//                 height: "100%",
//                 justifyContent: "center",
//                 // borderRight: "1px solid black",
                
//             }}><Text style={{fontSize: 9, paddingLeft: "8px"}}>Piping Design & Drafting</Text></View>
//         </View>
//         <View style={{
//             width: "100%",
//             height: "3%",
//             borderBottom: "1px solid black",
//             flexDirection: "row",
//         }}>
//             <View style={{
//                 width : "30%",
//                 height: "100%",
//                 borderRight: "1px solid black",
//                 justifyContent: "center",


//             }}>
//                 <Text style={{fontSize: 9, paddingLeft: "8px"}}>Batch Code</Text>
//             </View>
//             <View style={{
//                 width : "70%",
//                 height: "100%",
//                 justifyContent: "center",
//                 // borderRight: "1px solid black",
                
//             }}><Text style={{fontSize: 9, paddingLeft: "8px"}}>12023</Text></View>
//         </View>
//         <View style={{
//             width: "100%",
//             height: "3%",
//             borderBottom: "1px solid black",
//             flexDirection: "row",
//         }}>
//             <View style={{
//                 width : "30%",
//                 height: "100%",
//                 borderRight: "1px solid black",
//                 justifyContent: "center",


//             }}>
//                 <Text style={{fontSize: 9, paddingLeft: "8px"}}>Total Student</Text>
//             </View>
//             <View style={{
//                 width : "70%",
//                 height: "100%",
//                 justifyContent: "center",
//                 // borderRight: "1px solid black",
                
//             }}><Text style={{fontSize: 9, paddingLeft: "8px"}}>24 </Text></View>
//         </View>
//         <View style={{
//             width: "100%",
//             height: "3%",
//             borderBottom: "1px solid black",
//             flexDirection: "row",
//         }}>
//             <View style={{
//                 width : "30%",
//                 height: "100%",
//                 borderRight: "1px solid black",
//                 justifyContent: "center",


//             }}>
//                 <Text style={{fontSize: 9, paddingLeft: "8px"}}>Hrs. as per lecture plan</Text>
//             </View>
//             <View style={{
//                 width : "70%",
//                 height: "100%",
//                 justifyContent: "center",
//                 // borderRight: "1px solid black",
                
//             }}><Text style={{fontSize: 9, paddingLeft: "8px"}}>160.00</Text></View>
//         </View>
//         <View style={{
//             width: "100%",
//             height: "3%",
//             borderBottom: "1px solid black",
//             flexDirection: "row",
//         }}>
//             <View style={{
//                 width : "30%",
//                 height: "100%",
//                 borderRight: "1px solid black",
//                 justifyContent: "center",


//             }}>
//                 <Text style={{fontSize: 9, paddingLeft: "8px"}}>Actual Hrs. used</Text>
//             </View>
//             <View style={{
//                 width : "70%",
//                 height: "100%",
//                 justifyContent: "center",
//                 // borderRight: "1px solid black",
                
//             }}><Text style={{fontSize: 9, paddingLeft: "8px"}}>309.98</Text></View>
//         </View>
//         <View style={{
//             width: "100%",
//             height: "3%",
//             borderBottom: "1px solid black",
//             flexDirection: "row",
//         }}>
//             <View style={{
//                 width : "30%",
//                 height: "100%",
//                 borderRight: "1px solid black",
//                 justifyContent: "center",


//             }}>
//                 <Text style={{fontSize: 9, paddingLeft: "8px"}}>Excessl Hrs. used</Text>
//             </View>
//             <View style={{
//                 width : "70%",
//                 height: "100%",
//                 justifyContent: "center",
//                 // borderRight: "1px solid black",
                
//             }}><Text style={{fontSize: 9, paddingLeft: "8px"}}>149.98</Text></View>
//         </View>
//         <View style={{
//             width: "100%",
//             height: "3%",
//             borderBottom: "1px solid black",
//             flexDirection: "row",
//         }}>
//             <View style={{
//                 width : "30%",
//                 height: "100%",
//                 borderRight: "1px solid black",
//                 justifyContent: "center",


//             }}>
//                 <Text style={{fontSize: 9, paddingLeft: "8px"}}>Fees Per Student</Text>
//             </View>
//             <View style={{
//                 width : "70%",
//                 height: "100%",
//                 justifyContent: "center",
//                 // borderRight: "1px solid black",
                
//             }}><Text style={{fontSize: 9, paddingLeft: "8px"}}>30,899.00</Text></View>
//         </View>
//         <View style={{
//             width: "100%",
//             height: "3%",
//             borderBottom: "1px solid black",
//             flexDirection: "row",
//         }}>
//             <View style={{
//                 width : "30%",
//                 height: "100%",
//                 borderRight: "1px solid black",
//                 justifyContent: "center",


//             }}>
//                 <Text style={{fontSize: 9, paddingLeft: "8px"}}>Total Fees</Text>
//             </View>
//             <View style={{
//                 width : "70%",
//                 height: "100%",
//                 justifyContent: "center",
//                 // borderRight: "1px solid black",
                
//             }}><Text style={{fontSize: 9, paddingLeft: "8px"}}>741576.00 </Text></View>
//         </View>
//         <View style={{
//             width: "100%",
//             height: "3%",
//             borderBottom: "1px solid black",
//             flexDirection: "row",
//         }}>
//             <View style={{
//                 width : "30%",
//                 height: "100%",
//                 borderRight: "1px solid black",
//                 justifyContent: "center",


//             }}>
//                 <Text style={{fontSize: 9, paddingLeft: "8px"}}>Total Fees Received</Text>
//             </View>
//             <View style={{
//                 width : "70%",
//                 height: "100%",
//                 justifyContent: "center",
//                 // borderRight: "1px solid black",
                
//             }}><Text style={{fontSize: 9, paddingLeft: "8px"}}>919,159.00</Text></View>
//         </View>
//         {/* part2 expanding View */}
//         <View style={{
//             top: "0.5%",
//             width: "95%",
//             height: "auto",
//             alignSelf : "center",
//             flexDirection: "column",
//             border:" 1.5px solid black",
//         }}>
        
            
//       {/* this part is not showing up */}
//             <View style={{
//                 width: "100%",
//                 height: "auto",
//                 flexDirection: 'row',
//                 borderBottom: "1px solid black"

//             }}>
//                  <View style={{
//                     width: "40%",
//                     // height:"3%",
//                     paddingTop: "1%",
//                     paddingBottom: "1%",
//                     justifyContent:"center",
//                     alignItems: "center",
//                     borderRight: "1px solid black",
//                 }}><Text style={{fontSize: 9}}>Faculty Payment</Text></View>
//                 <View style={{
//                     width: "17.5%",
//                     // height:"3%",
//                     paddingTop: "1%",
//                     paddingBottom: "1%",
//                     justifyContent:"center",
//                     alignItems: "center",
//                     borderRight: "1px solid black",
//                 }}><Text style={{fontSize: 9}}>Hrs </Text></View>
//                 <View style={{
//                     width: "17.5%",
//                     // height:"3%",
//                     paddingTop: "1%",
//                     paddingBottom: "1%",
//                     justifyContent:"center",
//                     alignItems: "center",
//                     borderRight: "1px solid black",
//                 }}><Text style={{fontSize: 9}}>Rate Per (Hr.) </Text></View>
//                 <View style={{
//                     width: "25%",
//                     // height:"3%",
//                     paddingTop: "1%",
//                     paddingBottom: "1%",
//                     justifyContent:"center",
//                     alignItems: "center",
//                     // borderRight: "1px solid black",
//                 }}><Text style={{fontSize: 9}}>Total Amount</Text></View> 
//             </View>
//             // fatch data

//             <View style={{
//                 width: "100%",
//                 height: "auto",
//                 flexDirection: 'row',
//                 borderBottom: "1px solid black"

//             }}>
//                  <View style={{
//                     width: "40%",
//                     // height:"3%",
//                     paddingTop: "1%",
//                     paddingBottom: "1%",
//                     justifyContent:"center",
//                     alignItems: "center",
//                     borderRight: "1px solid black",
//                 }}><Text style={{fontSize: 9}}></Text></View>
//                 <View style={{
//                     width: "17.5%",
//                     // height:"3%",
//                     paddingTop: "1%",
//                     paddingBottom: "1%",
//                     justifyContent:"center",
//                     alignItems: "center",
//                     borderRight: "1px solid black",
//                 }}><Text style={{fontSize: 9}}> </Text></View>
//                 <View style={{
//                     width: "17.5%",
//                     // height:"3%",
//                     paddingTop: "1%",
//                     paddingBottom: "1%",
//                     justifyContent:"center",
//                     alignItems: "center",
//                     borderRight: "1px solid black",
//                 }}><Text style={{fontSize: 9}}> </Text></View>
//                 <View style={{
//                     width: "25%",
//                     // height:"3%",
//                     paddingTop: "1%",
//                     paddingBottom: "1%",
//                     justifyContent:"center",
//                     alignItems: "center",
//                     // borderRight: "1px solid black",
//                 }}><Text style={{fontSize: 9}}></Text></View> 
//             </View>
            
//         </View>
//         {/* part 3 total */}

//         <View style={{
//             top: "1.5%",
//             width: "100%",
//             height: "2.5%",
//             borderBottom: "1px solid black",
//             borderTop: "1px solid black",
//             flexDirection: "row",
            
//         }}>
//             <View style={{
//                 width: "70%",
//                 height: "100%",
//                 borderRight:"1px solid black",
//                 justifyContent: 'center',
//                 alignItems: "center"

//             }}>
//                 <Text style={{fontSize: 9}}>
//                     Total
//                 </Text>
//             </View>
//             <View style={{
//                 width: "30%",
//                 height: "100%",
//                 justifyContent: 'center',
//                 alignItems: "center"
//                 // borderRight:"1px solid black",

//             }}><Text style={{fontSize: 9}}>
                    
//                 </Text></View>
//         </View>
//         <View style={{
//             top: "1.5%",
//             width: "100%",
//             height: "2.5%",
//             borderBottom: "1px solid black",
            
//             flexDirection: "row",
            
//         }}>
//             <View style={{
//                 width: "70%",
//                 height: "100%",
//                 borderRight:"1px solid black",
//                 justifyContent: 'center',
//                 alignItems: "center"

//             }}>
//                 <Text style={{fontSize: 9}}>
//                 Net Balance
//                 </Text>
//             </View>
//             <View style={{
//                 width: "30%",
//                 height: "100%",
//                 justifyContent: 'center',
//                 alignItems: "center"
//                 // borderRight:"1px solid black",

//             }}><Text style={{fontSize: 9}}>
                    
//                 </Text></View>
//         </View>

       


//             {/* inside main View */}
//         </View>
//     </Page>
//    </Document>
//   )
// }

// export default AnalysisDoc






import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

const AnalysisDoc = () => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
        {/* Logo View */}
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image src={"/public/sitLogo.jpg"} style={{ width: 60 }} />
        </View>

        {/* Title View */}
        <View
          style={{
            width: "100%",
            padding: 5,
            borderWidth: 2,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 9 }}>BATCH ANALYSIS RECORD</Text>
        </View>

        {/* Main Content View (Auto Expanding) */}
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            borderWidth: 2,
            borderColor: "black",
            marginTop: 5,
          }}
        >
          {/* Training Details */}
          {[
            { label: "Training Programme", value: "Piping Design & Drafting" },
            { label: "Batch Code", value: "12023" },
            { label: "Total Student", value: "24" },
            { label: "Hrs. as per lecture plan", value: "160.00" },
            { label: "Actual Hrs. used", value: "309.98" },
            { label: "Excess Hrs. used", value: "149.98" },
            { label: "Fees Per Student", value: "30,899.00" },
            { label: "Total Fees", value: "741,576.00" },
            { label: "Total Fees Received", value: "919,159.00" },
          ].map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: "30%",
                  padding: 5,
                  borderRightWidth: 1,
                  borderColor: "black",
                }}
              >
                <Text style={{ fontSize: 9 }}>{item.label}</Text>
              </View>
              <View style={{ width: "70%", padding: 5 }}>
                <Text style={{ fontSize: 9 }}>{item.value}</Text>
              </View>
            </View>
          ))}

          {/* Faculty Payment Table (Auto Expanding) */}
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              borderWidth: 1.5,
              borderColor: "black",
              marginTop: 5,
            }}
          >
            {/* Table Header */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              {["Faculty Payment", "Hrs", "Rate Per (Hr.)", "Total Amount"].map(
                (header, index) => (
                  <View
                    key={index}
                    style={{
                      width: index === 0 ? "40%" : "20%",
                      padding: 5,
                      borderRightWidth: index < 3 ? 1 : 0,
                      borderColor: "black",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 9 }}>{header}</Text>
                  </View>
                )
              )}
            </View>

            {/* Table Rows (Dynamic) */}
            {[{ faculty: "", hrs: "", rate: "", total: "" }].map(
              (row, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderColor: "black",
                  }}
                >
                  {[row.faculty, row.hrs, row.rate, row.total].map(
                    (text, idx) => (
                      <View
                        key={idx}
                        style={{
                          width: idx === 0 ? "40%" : "20%",
                          padding: 5,
                          borderRightWidth: idx < 3 ? 1 : 0,
                          borderColor: "black",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 9 }}>{text}</Text>
                      </View>
                    )
                  )}
                </View>
              )
            )}
          </View>

          {/* Total & Net Balance */}
          {["Total", "Net Balance"].map((label, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                borderTopWidth: index === 0 ? 1 : 0,
                borderBottomWidth: 1,
                borderColor: "black",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: "70%",
                  padding: 5,
                  borderRightWidth: 1,
                  borderColor: "black",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 9 }}>{label}</Text>
              </View>
              <View style={{ width: "30%", padding: 5, alignItems: "center" }}>
                <Text style={{ fontSize: 9 }}></Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default AnalysisDoc;
