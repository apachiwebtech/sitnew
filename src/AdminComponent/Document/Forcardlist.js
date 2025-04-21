import React from 'react'
import { Document, Page, Text, View , Font } from "@react-pdf/renderer";

const Forcardlist = ({cardlist}) => {
    console.log(cardlist)
    const data = cardlist

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
            <View style={{
                width: "100%",
                height:"2%",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }}>
                
                
                 <View style={{
                width: "55%",
                
                // backgroundColor:"red"
            }}>
               <Text style={{ width:"80%",
                    height:"auto",
                    fontSize: 8.5,
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    textAlign:"center",
                    whiteSpace: 'nowrap' ,}}>Suvidya Institute of Technology </Text> 
                </View> 
                
                <View style={{
                width: "20%",
                
                // backgroundColor:"blue"
                }}>
                <Text style={{ width:"80%",
                    height:"auto",
                    fontSize: 8.5,
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    textAlign:"center",
                    whiteSpace: 'nowrap' ,}}>From : date</Text> </View>
               
            
                <View style={{
                    width: "25%",
                    
                    // backgroundColor:"red"
                }}><Text style={{ width:"80%",
                    height:"auto",
                    fontSize: 8.5,
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    textAlign:"center",
                    whiteSpace: 'nowrap' ,}}>To : date</Text> 
                
            </View>
            
                 
            </View>
            
            {/* main div */}
           

           
            <View style={{width:"100%", height:"750px"}}>
            
                <View style={{width:"100%", height:"3.5%", border:"1px solid black", justifyContent:'center',alignItems:"center"}}>
                    <Text style={{fontSize: 9.5,
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    textAlign:"center",}}>
                    STUDENT PUNCHING ID NUMBER
                    </Text>
                </View>
                
                <View style={{width:"100%", height:"3.5%", border:"1px solid black",flexDirection:"row", justifyContent:'center',alignItems:"center",marginTop:"2px"}}>
                    
                    <View style={{width:"60%", height:"100%",justifyContent:"center", alignItems:"flex-start"}}>
                        <Text style={{
                            fontSize: 8.5,
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            textAlign:"center",
                            marginLeft:"5px"
                        }}>Training Programme :{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}{pdfheaddetail.Course_Name}</Text>
                    </View>
                    <View style={{width:"40%", height:"100%", justifyContent:"center", alignItems:"center"}}>
                    <Text style={{
                            fontSize: 8.5,
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            textAlign:"center",
                            marginLeft:"5px"
                        }}>Batch No.:{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}{pdfheaddetail.Batch_code}</Text>
                    </View>
                    
                </View>
            
                {/* table part */}
                <View style={{width:"100%", height:"3.5%",flexDirection:"row",marginTop:"2px"}}>
                    <View style={{width:"49%", height:"100%",flexDirection:"row",justifyContent:"center", border:"1px solid black", alignItems:"flex-start"}}>
                    <View style={{width:"25%", height:"100%",justifyContent:"center",  alignItems:"flex-start"}}>
                    <Text style={{
                            fontSize: 8.5,
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            textAlign:"center",
                            marginLeft:"15px"
                        }}>ID No.</Text>
                       </View>
                    <View style={{width:"75%", height:"100%",justifyContent:"center", borderLeft:"1px solid black", alignItems:"center"}}>
                    <Text style={{
                            fontSize: 8.5,
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            textAlign:"center",
                            marginLeft:"5px"
                        }}>Student Name </Text>
                       </View>
                    </View>
                    <View style={{width:"49%", height:"100%",flexDirection:"row", justifyContent:"center", border:"1px solid black",alignItems:"center",marginLeft:"2%"}}>
                    <View style={{width:"25%", height:"100%",justifyContent:"center",  alignItems:"flex-start"}}>
                       <Text style={{
                            fontSize: 8.5,
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            textAlign:"center",
                            marginLeft:"15px"
                        }}>ID No.</Text>
                    </View>
                    <View style={{width:"75%", height:"100%",justifyContent:"center", borderLeft:"1px solid black", alignItems:"center"}}>
                    <Text style={{
                            fontSize: 8.5,
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            textAlign:"center",
                            marginLeft:"5px"
                        }}>Student Name </Text>
                    </View>
                    </View>
                </View>
{/* data entry */}
       <View style={{ display: "flex", flexDirection: "column" }}>
                    {data
                        .reduce((rows, item, index) => {
                            if (index % 2 === 0) {
                                rows.push(data.slice(index, index + 2)); // Group data into pairs
                            }
                            return rows;
                        }, [])
                        .map((row, rowIndex) => (
                            <View
                                key={rowIndex}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                {row.map((item, itemIndex) => (
                                    <View
                                        key={itemIndex}
                                        style={{
                                            width: "49%",
                                            borderBottom: "1px solid black",
                                            borderLeft: "1px solid black",
                                            borderRight: "1px solid black",
                                            
                                        }}
                                    >
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            {/* Left Section */}
                                            <View style={{display : 'flex', flexDirection:"row",}}>
                                            <View style={{width:"25.5%", height:"100%",justifyContent:"center",  alignItems:"center",borderRight:"1px solid black"}}>
                                            
                                                <Text
                                                    style={{
                                                        padding: "5px 5px",                                                 
                                                    }}
                                                >
                                                    {item.Student_Id} {/* Replace with the actual field */}
                                                </Text>
                                                </View>
                                                <View style={{width:"74.5%", height:"100%",justifyContent:"center",  alignItems:"flex-start"}}>
                                                <Text style={{  
                                                    padding: "5px 5px",
                                                     fontSize: "8px" }}>
                                                    {item.Student_Name} {/* Replace with the actual field */}
                                                </Text>
                                                </View>
                                            </View>
                                            {/* Ratings Section */}
                                       
                                            {/* Sign Section */}
                                            <View style={{ flex: 2 }}>
                                                {/* <Text style={{ color: "red" }}>Cancelled</Text> */}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ))}
                </View>
            </View>
        </Page>
    </Document>
  )
}

export default Forcardlist

{/* 2 */}
                {/* <View style={{
                    width:"50%",
                    height:"100%",
                    border: "1px solid black",
                    flexDirection:"column",
                    

                    
                    
                }}> */}
                    {/* main part of data entry */}
                    {/* <View style={{width:"100%", height:"3.5%", 
                        borderBottom:"1px solid black",
                        flexDirection:"row"}}>

                           <View style={{width:"25%", height:"100%",justifyContent:"center",  alignItems:"flex-start"}}>
                          <Text style={{
                            fontSize: 8.5,
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            textAlign:"center",
                            marginLeft:"15px"
                        }}></Text>
                           </View>  
                          <View style={{width:"75%", height:"100%",justifyContent:"center", borderLeft:"1px solid black", alignItems:"center"}}>
                         <Text style={{
                            fontSize: 8.5,
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            textAlign:"center",
                            marginLeft:"5px"
                        }}></Text>
                       </View>
                        </View>
                        
                </View> */}
