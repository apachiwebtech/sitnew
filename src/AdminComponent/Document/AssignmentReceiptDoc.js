import React from "react";
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import sitlogo from '../../assets/images/sitlogo.png'

function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

const AssignmentReceiptDoc = ({assignment}) => {

    console.log(assignment)
    const data = assignment
    const headerdata = data[0]


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

    // console.log(headerdata.Course_Name)

    function formatdate(newdate) {
        if (!newdate) return ''; // Handle null or undefined values gracefully
    
        const date = new Date(newdate);
        if (isNaN(date.getTime())) return ''; // Handle invalid dates
    
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
    
        // Function to get ordinal suffix
        function getOrdinalSuffix(n) {
            if (n > 3 && n < 21) return 'th'; // Covers 11th to 13th
            switch (n % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        }
    
        const dayWithSuffix = String(day).padStart(2, '0') + getOrdinalSuffix(day);
    
        return `${dayWithSuffix} ${month}-${year}`;
    }
      

    return (
        <Document>
            {chunkArray(data, 20).map((chunk, pageIndex) => (
            <Page size="A4" key={pageIndex} orientation="landscape" style={{ padding: 30, fontSize: 10 }}>
                 <View 
                                 style={ {
                                                        flexDirection: 'column',
                                                        justifyContent: "space-between",
                                                                alignItems: "center",
                                                                
                                                    }}>
                                   
                                                   <Image 
                                                                   src ={sitlogo}
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
                                    
                                    
                                }}><Text style={{fontFamily: 'Poppins',
                                    fontWeight: 600,}}>ASSIGNMENT RECEIPT RECORD </Text></View>
                                

                                 
                                 <View style={{
                                    flexDirection: "column",
                                    width: "100%",
                                    height: "22px",
                                    borderTop: "2px solid black",
                                    alignItems: "center",
                                    flexDirection:"row",
                                    
                                }}>
                                    <Text style={{fontSize: 9,marginLeft: "20px",fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Training Programme -</Text>
                                    <Text style={{fontSize: 9, marginLeft: "20px"}}>{headerdata.Course_Name}</Text>
                                    <Text style={{fontSize: 9, marginLeft: "350px",fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Batch -  </Text>
                                    <Text style={{fontSize: 9, marginLeft: "10px"}}>{headerdata.Batch_code}</Text>
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
                                    fontSize: 8,
                                    fontFamily: 'Poppins',
                                        fontWeight: 600,
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
                                    fontSize: 8,
                                    fontFamily: 'Poppins',
                                        fontWeight: 600,
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
                                    fontSize: 8,
                                    fontFamily: 'Poppins',
                                        fontWeight: 600,
                                }}>Student \ Subject</Text>
                                </View>
                                
                                </View>
                                {chunk.map((item) => (
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
                                    fontSize: 8
                                }}>
                                    {item.Assign_No}
                                    </Text>
                                </View>
                                <View style={{
                                    width: "100%",
                                    height: "33.33%",
                                    borderBottom: "2px solid black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // borderRight: "2px solid black",
                                }}><Text style={{
                                    fontSize: 8
                                }}>
                                    {item.Actual_Dt? formatdate(item.Actual_Dt) : ""}
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
                                    fontSize: 8
                                }}>
                                    {item.Assign_No} 
                                </Text>
                                </View>
                                
                                </View>
                                 ))} 
                                
                                
                                </View>
                                <View style={{ flexDirection: "column", width: "100%" }}>
  {chunk.map((item) => (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: "5.33%" // or a fixed value
      }}
    >
      <View
        style={{
          width: "12%",
          height: "100%",
          flexDirection: "column",
          borderBottom: "1px solid black",
        }}
      >
        <Text style={{ fontSize: 8 }}>{item.Student_Name}</Text>
      </View>
    </View>
  ))}
</View>
<View style={{ flexDirection: "row", width: "100%" }}>
  {chunk.map((item) => (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
        height: "5.33%" // or a fixed value
      }}
    >
      <View
        style={{
          width: "12%",
          height: "100%",
          flexDirection: "column",
          borderBottom: "1px solid black",
        }}
      >
        <Text style={{ fontSize: 8 }}>{item.Student_Name}</Text>
      </View>
    </View>
  ))}
</View>

                                </View>
                                
                                                                {/* end part */}
                                <View style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    marginTop: "1%",
                                    justifyContent: "space-between"
                                    
                                }}>
                                    <Text style={{fontSize: 8,}}>F/009/00 </Text>
                                    <Text style={{fontSize: 8,}}>Page 1 of 2</Text>
                                </View>

            </Page>
            ))}
        </Document>
    );
};

export default AssignmentReceiptDoc;
