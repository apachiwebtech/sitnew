import React from 'react';
import { Document, Page, Text, View, Font, Image } from '@react-pdf/renderer';
import sitlogo from '../../assets/images/sitlogo.png'

Font.register({
  family: 'Poppins',
  fonts: [
    { src: '/fonts/Poppins-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Poppins-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/Poppins-Bold.ttf', fontWeight: 'bold' },
  ],
});
const PlacedStudents = () => {
  return (
    <Document>
          <Page size="A4" style={{ padding: 30, fontSize: 10 }}>

            <View style={{
                width: "100%",
                height:"5%",
                // border:"1px solid black"
            }}>
                <Image src={sitlogo} style={{width:"12%", height:"100%"}}></Image>
            </View>
             <View style={{
                width: "100%",
                height:"3%",
                // border:"1px solid black",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <Text style={{fontFamily: 'Poppins', fontWeight: 600, fontSize: 10 }}>
                    STUDENT PLACEMENT REPORT FROM : 11-Jan-2024 - 19-Jun-2025
                </Text>
            </View>

            <View style={{
                width: "100%",
                height:"4%",
                border:"1px solid black",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"row"
            }}>
                <View style={{width:"17%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                
                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        Student Name
                    </Text>
                </View>
                <View style={{width:"17%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        Discipline
                    </Text>
                </View>
                <View style={{width:"10%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        Batch
                    </Text>
                </View>
                <View style={{width:"26%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        Company Name
                    </Text>
                </View>
                <View style={{width:"14%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        Date
                    </Text>
                </View>
                <View style={{width:"16%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        Remark
                    </Text>
                </View>

            </View>

            <View style={{
                width: "100%",
                height:"88%",
                border:"1px solid black",
                borderTop:"none",
                flexDirection:"column"
            }}>
            <View style={{
                width: "100%",
                height:"8%",
                // border:"1px solid black",
                borderTop:"none",
                flexDirection:"row"
            }}>
                <View style={{
                width: "100%",
                height:"100%",
                // border:"1px solid black",
                borderBottom: "1px solid black",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"row"
            }}>
                <View style={{width:"17%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                
                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        {/* Student Name */}
                    </Text>
                </View>
                <View style={{width:"17%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        {/* Discipline */}
                    </Text>
                </View>
                <View style={{width:"10%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        {/* Batch */}
                    </Text>
                </View>
                <View style={{width:"26%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        {/* Company Name */}
                    </Text>
                </View>
                <View style={{width:"14%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        {/* Date */}
                    </Text>
                </View>
                <View style={{width:"16%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        {/* Remark */}
                    </Text>
                </View>

            </View>
            
            
            </View>
            


{/* to show lines */}
            <View style={{
                width: "100%",
                minHeight:"0%",
                height:"100%",
                // border:"1px solid black",
                borderTop:"none",
                flexDirection:"row"
            }}>
                <View style={{width:"17%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                
                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        
                    </Text>
                </View>
                <View style={{width:"17%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        
                    </Text>
                </View>
                <View style={{width:"10%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        
                    </Text>
                </View>
                <View style={{width:"26%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        
                    </Text>
                </View>
                <View style={{width:"14%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        
                    </Text>
                </View>
                <View style={{width:"16%",height:"100%",
                justifyContent:"center",
                alignItems:"center",
                borderLeft:"1px solid black"

                }}>
                    <Text style={{
                      fontFamily: 'Poppins', fontWeight: 600, fontSize: 8   
                    }}>
                        
                    </Text>
                </View>

            </View>


            </View>


            </Page>
            </Document>
  )
}

export default PlacedStudents