import React from 'react'
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import sitlogo from '../../assets/images/sitlogo.png'
import { IMG_URL } from '../BaseUrl';
import { formatDate } from '../../Utils/dateFormat';

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
export const BatchWiseFeesDetailsNewpdf = ({batchwisefee}) => {
    console.log(batchwisefee)
  return (
     <Document>
        <Page size="A4" style={{ padding: 30, fontSize: 10 }}>

           <View style={{ textAlign: "left", marginLeft: "15px" }}>
                <Text style={{fontSize: 9, fontFamily: 'Poppins',
                fontWeight: 600,}}>Suvidya Institute Of Techonology Pvt. Ltd.</Text>
            </View>

            <View style={{
                width:"100%",
                height:"10%",
                border:"1px solid black"
            }}>
                    <View style={{
                    width:"100%",
                    height:"33.33%",
                    textAlign:"center"
                }}>
                <Text style={{fontSize: 9, 
                fontFamily: 'Poppins',
                fontWeight: 600,
                }}>
                   Batch Wise Fees Report
                      </Text>
                    </View>
                <View style={{
                width:"100%",
                height:"33.33%",
                
                flexDirection:"row"
            }}>
                <View style={{
                width:"50%",
                height:"100%",
                
            }}>
                <Text style={{fontSize: 8, 
                fontFamily: 'Poppins',
                marginLeft:"25px"
                }}>
                   Training Programme :
                      </Text>
            </View>
            <View style={{
                width:"50%",
                height:"100%",
            }}>
                <Text style={{fontSize: 8, 
                fontFamily: 'Poppins',
                marginLeft:"40%"
                }}>
                   Batch Start Date : 
                      </Text>
            </View>
            </View>
            <View style={{
                width:"100%",
                height:"33.33%",
                
                flexDirection:"row"
            }}>
                <View style={{
                width:"50%",
                height:"100%",
                
            }}>
                <Text style={{fontSize: 8, 
                fontFamily: 'Poppins',
                marginLeft:"25px"
                }}>
                   Batch Code :
                      </Text>
            </View>
            <View style={{
                width:"50%",
                height:"100%",
            }}>
                <Text style={{fontSize: 8, 
                fontFamily: 'Poppins',
                marginLeft:"40%"
                }}>
                   Batch End Date : 
                      </Text>
            </View>
            </View>
            </View>

            <View style={{
                width:"100%",
                height:"85%",
                marginTop:"5px",
                border:"1px solid black"
            }}>
                <View style={{
                    width:"100%",
                    height:"3%",
                    borderBottom:"1px solid black",
                    flexDirection:"row"
                }}>
                    <View style={{
                        width:"7%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems:"center",
                        borderRight:"1px solid black"
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}>S.No.</Text>
                    </View>
                    <View style={{
                        width:"49%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems:"center",
                        borderRight:"1px solid black"
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}>Student Name</Text>
                    </View>
                    <View style={{
                        width:"14.66%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems:"center",
                        borderRight:"1px solid black"
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}>Amount</Text>
                    </View>
                    <View style={{
                        width:"14.66%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems:"center",
                        borderRight:"1px solid black"
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}>Paid Amount</Text>
                    </View>
                    <View style={{
                        width:"14.66%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems:"center",
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}>Rem Amount</Text>
                    </View>
                </View>
                {/* output data randor */}

                <View style={{
                    width:"100%",
                    height:"3%",
                    borderBottom:"1px solid black",
                    flexDirection:"row"
                }}>
                    <View style={{
                        width:"7%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems:"center",
                        borderRight:"1px solid black"
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}></Text>
                    </View>
                    <View style={{
                        width:"49%",
                        height:"100%",
                        justifyContent: "center",
                        paddingLeft: "5px",
                        
                        borderRight:"1px solid black"
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}></Text>
                    </View>
                    <View style={{
                        width:"14.66%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems: "flex-end",
                        paddingRight:"5px",
                        borderRight:"1px solid black"
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}></Text>
                    </View>
                    <View style={{
                        width:"14.66%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems: "flex-end",
                        paddingRight:"5px",
                        borderRight:"1px solid black"
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}></Text>
                    </View>
                    <View style={{
                        width:"14.66%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems: "flex-end",
                        paddingRight:"5px",
                    }}>
                        <Text style={{
                            fontSize: 8, 
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}></Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
  )
}
