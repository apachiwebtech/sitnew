import { Padding } from '@mui/icons-material'
import React from 'react'
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

const ID_CardDoc = () => {
  return (
    <Document>
        <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
       

                                        <View style={{
                                            flexDirection: "column",
                                            width: "100%",
                                            height: "90%",

                                        }}>
                                            <View style={{
                                                flexDirection: "row",
                                                width: "100%",
                                                height: "23%",
                                                gap: "3px"
                                            }}>
                                             {/* left card */}
                                             <View style= {{
                                                    width: "50%",
                                                    height: "100%",
                                                    border: "1px solid black",
                                                 }}></View>



                                            {/* card right */}
                                                <View style={{
                                                    flexDirection:"column",
                                                    width: "50%",
                                                    height: "100%",
                                                    border: "1px solid black",
                                                }}>
                                                    <View style= {{
                                                        flexDirection: "row",
                                                        width: "100%",
                                                        height:"80%",
                                                        // border: "1px solid black",
                                                    }}><View style={{ 
                                                        flexDirection: "column",
                                                        height: "100%",
                                                        width:"30%",
                                                        // backgroundColor: "red",
                                                    }}>
                                                    <View 
                                         style={ {
                                                                flexDirection: 'column',
                                                                justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                        width: "100%",
                                                                        height: "40%",
                                                                        borderBottom: "1px solid black"
                                                                        
                                                            }}>
                                           
                                                           <Image 
                                                                           src ={'\public\sitLogo.jpg'}
                                                                        //    style= {{width: "60px"}}
                                                                           ></Image>
                                        </View>
                                        <View 
                                         style={ {
                                                                flexDirection: 'column',
                                                                justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                        width: "100%",
                                                                        height: "60%",
                                                                        
                                                            }}>
                                           
                                                           <Image 
                                                                           src ={'\public\sitLogo.jpg'}
                                                                        //    style= {{width: "60px"}}
                                                                           ></Image>
                                        </View>

                                                    </View>
                                                    <View style={{
                                                        flexDirection: "column",
                                                        width: "70%",
                                                        height: "100%",
                                                        // backgroundColor:"green",
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 8,
                                                            padding: "5px", 
                                                            paddingRight: "40px"
                                                        }}> SUVIDYA INSTITUTE OF TECHNOLOGY
18/140, Anand Nagar, Nehru Road, Vakola,
Santacruz (E) , Mumbai - 400 055,
Phone : (022) 26682290, 09821569885 </Text>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            width: "100%",
                                                            gap: "5px",
                                                            paddingTop:"5px",
                                                            paddingLeft: "5px",
                                                            paddingRight: "5px",
                                                                                                                }}>
                                                            <View style={{
                                                                // width: "20%",
                                                                
                                                                // backgroundColor:"blue",
                                                            }}>
                                                                <Text style={{fontSize: 9}}>Name</Text>
                                                            </View>
                                                            <View style={{
                                                                width: "85%",
                                                                backgroundColor:"white",
                                                                borderBottom: "1px solid black"
                                                            }}>
                                                                <Text style={{fontSize: 9, marginLeft: "5px"}}>Tonlagha Godspower Roland</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            width: "100%",
                                                            gap: "5px",
                                                            paddingTop:"5px",
                                                            paddingLeft: "5px",
                                                            paddingRight: "5px",
                                                        }}>
                                                            <View style={{
                                                                // width: "32%",
                                                                
                                                                // backgroundColor:"blue",
                                                            }}>
                                                                <Text style={{fontSize: 9}}>Course</Text>
                                                            </View>
                                                            <View style={{
                                                                width: "85%",
                                                                backgroundColor:"white",
                                                                borderBottom: "1px solid black"
                                                            }}>
                                                                <Text style={{fontSize: 9, marginLeft: "5px"}}>Pipeline Engineering</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            width: "100%",
                                                            gap: "5px",
                                                            paddingTop:"5px",
                                                            paddingLeft: "5px",
                                                            paddingRight: "5px",
                                                        }}>
                                                            <View style={{
                                                                // width: "36%",
                                                                
                                                                // backgroundColor:"blue",
                                                            }}>
                                                                <Text style={{fontSize: 9}}>Batch No.</Text>
                                                            </View>
                                                            <View style={{
                                                                width: "85%",
                                                                backgroundColor:"white",
                                                                borderBottom: "1px solid black"
                                                            }}>
                                                                <Text style={{fontSize: 9, marginLeft: "5px"}}>17001</Text>
                                                            </View>
                                                        </View>
                                                       
                                                        <View style={{
                                                            flexDirection: "row",
                                                            width: "100%",
                                                            gap: "5px",
                                                            paddingTop:"5px",
                                                            paddingLeft: "5px",
                                                            paddingRight: "5px",
                                                        }}>
                                                            <View style={{
                                                                // width: "37%",
                                                                
                                                                // backgroundColor:"blue",
                                                            }}>
                                                                <Text style={{fontSize: 9}}>Contact No</Text>
                                                            </View>
                                                            <View style={{
                                                                width: "70%",
                                                                // backgroundColor:"white",
                                                                borderBottom: "1px solid black"
                                                            }}>
                                                                <Text style={{fontSize: 9, }}>8879489405,08054024252</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            width: "100%",
                                                            gap: "5px",
                                                            paddingTop:"5px",
                                                            paddingLeft: "5px",
                                                            paddingRight: "5px",
                                                        }}>
                                                            <View style={{
                                                                // width: "36%",
                                                                
                                                                // backgroundColor:"blue",
                                                            }}>
                                                                <Text style={{fontSize: 9}}>Valid Upto</Text>
                                                            </View>
                                                            <View style={{
                                                                width: "80%",
                                                                backgroundColor:"white",
                                                                borderBottom: "1px solid black",
                                                                marginRight: "3px"
                                                            }}>
                                                                <Text style={{fontSize: 9}}>15-Mar-2012</Text>
                                                            </View>
                                                        </View>
                                                    </View></View>
                                                    <View style={{
                                                        width: "100%",
                                                        height: "20%",
                                                        justifyContent:"center",
                                                        
                                                    }}>
                                                        <Text style={{fontSize: 8, textAlign: "center",
                                                        paddingTop:"15px"}}>E-mail : enquiry@suvidya.ac.in Website : www.suvidya.ac.in</Text>
                                                    </View>
                                                </View>
                                               
                                            </View>
                                        </View>

                                        
        </Page>
    </Document>
  )
}

export default ID_CardDoc
