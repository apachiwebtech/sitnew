import React from 'react'
import { Document, Page, Text, View, Image ,
  Font
 } from "@react-pdf/renderer";
import sitlogo from '../../assets/images/sitlogo.png'

const Sitpayment = ({data,receipt_no, Cheque_number, Cheque_branch, notes}) => {


  console.log(data)
  console.log(Cheque_branch)
  console.log(Cheque_number)
  console.log(notes)

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
  return (
    <Document>
                <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                <View 
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
>
  <Image 
    source={sitlogo} // Correct way to include local images
    style={{ width: "25%"}} // Add height for better image rendering
  />
  
  <View style={{ flex: 1, alignItems: 'center' ,flexDirection: 'row', justifyContent: "space-between", width: "100%",
    // backgroundColor:"red" 
    }}>
    <Text 
      style={{
        fontSize: 10,
        left:"95px",
        top:"40px",
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: 600,
        textDecorationLine: 'underline', // Underline added here
      }}
    >
      PAYMENT RECEIPT
    </Text>

    <Text 
      style={{
        fontSize: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        right:"30px"
      }}
    >
      Student Copy
    </Text>
  </View>
</View>


                   <View style={{
                    width: "55%",
                    height:"80px",
                    
                    alignSelf:"center",
                    flexDirection:"column",
                    gap:'2px'
                    
                   }}>
                    <Text style={{
                      fontSize: 12,
                      textAlign: 'center',
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      top:'20px'
                      
                      
                    }}>Suvidya Institute of Technology Private Limited</Text>
                    <Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      top:'20px'
                      
                      
                    }}>Regd. Office : 18/140 Anand Nagar, Nehru Road, Vakola, Santacruz (E),</Text>
                    <Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      top:'20px'
                      
                      
                    }}>Mumbai – 400 055. Tel.: 022 26682290, 9821569885</Text>
                   </View>
<View style={{gap:"5px"}}>
                   <View style={{
                     width: "100%",
                     height: 20,
                    //  backgroundColor:'orange',
                     alignItems: "center",
                     flexDirection:"row",
                     justifyContent:"space-around"
                     
                   }}>
                    <View style={{
                      width:"50%",
                      alignItems:"flex-start",
                      flexDirection:'row',
                      gap:'15px'
                    }}>
                    <Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      left:'3px'                     
                      
                    }}>Receipt No.:</Text>
                    <Text style={{
                      fontSize: 9,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      left:'6px'    
                      
                    }}>{receipt_no}</Text>
                    </View>
                    <View style={{
                      width:"39%",
                      // backgroundColor:"red",
                      // alignItems:"flex-start",
                      flexDirection:'row',
                      justifyContent:'flex-end',
                      gap:'15px'
                    }}>
                    <Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                                     
                      
                    }}>Date :</Text>
                    
                    
                    <Text style={{
                      fontSize: 9,
                      textAlign: 'center',
                      fontWeight: 'bold',
                                          
                      
                    }}>{data.Date_Added ?formatdate(data.Date_Added) : ""}</Text>
                    
                   </View>
                   <View style={{
                      width:"11%",
                      // alignItems:"flex-start",
                      flexDirection:'row',
                      justifyContent:'flex-end'
                    }}></View>
                   </View>

                   <View style={{
                     width: "100%",
                     height: 20,
                    //  backgroundColor:'orange',
                     alignItems: "center",
                     flexDirection:"row",
                     justifyContent:"space-around"
                     
                   }}>
                    <View style={{
                      width: "16%",
                      flexDirection: "row",
                      alignItems:"center",
                      justifyContent:"center"
                      
                    }}><Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                                           
                      
                    }}>Received with thanks from</Text></View>
                    <View style={{
                      width: "70%",
                      flexDirection: "row",
                      textAlign:"left",
                      borderBottom: "1px dotted black"
                      
                    }}><Text style={{
                      fontSize: 9,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      left:"30px"
                                           
                      
                    }}>{data.Student_Name}</Text></View>
                    
                    <View style={{
                      width: "14%",
                      flexDirection: "row",
                      textAlign:"left",
                      
                      
                    }}></View>
                    
                                        
                   </View>
                   
                   <View style={{
                     width: "100%",
                     height: 20,
                    //  backgroundColor:'orange',
                     alignItems: "center",
                     flexDirection:"row",
                     justifyContent:"space-around"
                     
                   }}>
                    <View style={{
                      width: "11%",
                      flexDirection: "row",
                      alignItems:"center",
                      justifyContent:"center"
                      
                    }}><Text style={{
                      fontSize: 7,
                      left:"1px",
                      fontWeight: 'bold',
                                           
                      
                    }}>the sum of rupees</Text></View>
                    <View style={{
                      width: "70%",
                      flexDirection: "row",
                      textAlign:"left",
                      borderBottom: "1px dotted black"
                      
                    }}><Text style={{
                      fontSize: 9,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      left:"30px"
                                           
                      
                    }}>{data.Amt_Word}</Text></View>
                    <View style={{
                      width: "21%",
                      flexDirection: "row",
                      textAlign:"left",
                      
                      
                    }}><Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                                           
                      
                    }}>as</Text></View>
                    
                                        
                   </View>

                   <View style={{
                     width: "100%",
                     height: 20,
                    //  backgroundColor:'orange',
                     alignItems: "center",
                     flexDirection:"row",
                     justifyContent:"space-around"
                     
                   }}>
                    <View style={{
                      width: "9%",
                      flexDirection: "row",
                      alignItems:"center",
                      justifyContent:"center"
                      
                    }}><Text style={{
                      fontSize: 7,
                      left:"0px",
                      fontWeight: 'bold',
                                           
                      
                    }}>Course fees for</Text></View>
                    <View style={{
                      width: "36%",
                      flexDirection: "row",
                      textAlign:"left",
                      borderBottom: "1px dotted black"
                      
                    }}><Text style={{
                      fontSize: 9,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      left:"20px"
                                           
                      
                    }}>{data.Course_Name}</Text></View>
                    <View style={{
                      width: "1%",
                      flexDirection: "row",
                      textAlign:"left",
                                           
                      
                    }}><Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                                           
                      
                    }}>by</Text></View>
                    <View style={{
                      width: "13.5%",
                      flexDirection: "row",
                      textAlign:"left",
                      borderBottom: "1px dotted black",
                                           
                      
                    }}><Text style={{
                      fontSize: 9,
                      
                      fontWeight: 'bold',
                                           
                      
                    }}>{data.Payment_Type}</Text></View>
                    <View style={{
                      width: "2%",
                      flexDirection: "row",
                      textAlign:"left",
                                           
                      
                    }}><Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                                           
                      
                    }}>No.</Text></View>
                    <View style={{
                      width: "13.5%",
                      flexDirection: "row",
                      textAlign:"left",
                      borderBottom: "1px dotted black",
                                           
                      
                    }}><Text style={{
                      fontSize: 9,
                      textAlign: 'center',
                      fontWeight: 'bold',
                                           
                      
                    }}>{Cheque_number}</Text></View>
                    <View style={{
                      width: "17.5%",
                      flexDirection: "row",
                      textAlign:"left",
                      // borderBottom: "1px dotted black",
                                           
                      
                    }}></View>
                    
                                        
                   </View>
                   <View style={{
                     width: "100%",
                     height: 20,
                    //  backgroundColor:'orange',
                     alignItems: "center",
                     flexDirection:"row",
                     justifyContent:"space-around"
                     
                   }}>
                    <View style={{
                      width: "3%",
                      flexDirection: "row",
                      alignItems:"center",
                      justifyContent:"center"
                      
                    }}><Text style={{
                      fontSize: 7,
                      left:"0px",
                      fontWeight: 'bold',
                                           
                      
                    }}>Dated</Text></View>
                    <View style={{
                      width: "15%",
                      flexDirection: "row",
                      textAlign:"left",
                      borderBottom: "1px dotted black"
                      
                    }}><Text style={{
                      fontSize: 9,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      left:"20px"
                                           
                      
                    }}>{data.Date_Added ?formatdate(data.Date_Added) : ""}</Text></View>
                    <View style={{
                      width: "6%",
                      flexDirection: "row",
                      textAlign:"left",
                                           
                      
                    }}><Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                                           
                      
                    }}> drawn on</Text></View>
                    <View style={{
                      width: "48.5%",
                      flexDirection: "row",
                      textAlign:"left",
                      borderBottom: "1px dotted black",
                                           
                      
                    }}><Text style={{
                      fontSize: 9,
                      
                      fontWeight: 'bold',
                                           
                      
                    }}></Text></View>
                    
                    <View style={{
                      width: "17%",
                      flexDirection: "row",
                      textAlign:"left",
                      // borderBottom: "1px dotted black",
                                           
                      
                    }}></View>
                    
                                        
                   </View>
                   <View style={{
                     width: "100%",
                     
                    //  backgroundColor:'orange',
                     alignItems: "center",
                     flexDirection:"row",
                     justifyContent:"space-around"
                     
                   }}>
                   <View style={{
                     width: "70%",
                     height: 20,
                    //  backgroundColor:'orange',
                     alignItems: "center",
                     flexDirection:"row",
                     justifyContent:"space-around"
                     
                   }}>
                    <View style={{
                      width: "5%",
                      flexDirection: "row",
                      alignItems:"center",
                      justifyContent:"center"
                      
                    }}><Text style={{
                      fontSize: 7,
                      left:"0px",
                      fontWeight: 'bold',
                                           
                      
                    }}>Note :</Text></View>
                    <View style={{
                      width: "54%",
                      flexDirection: "row",
                      textAlign:"left",
                      borderBottom: "1px dotted black"
                      
                    }}><Text style={{
                      fontSize: 9,
                      
                      fontWeight: 'bold',
                      left:"20px"
                                           
                      
                    }}>{notes}</Text></View>
                    <View style={{
                      width: "5%",
                      flexDirection: "row",
                      textAlign:"left",
                                           
                      
                    }}><Text style={{
                      fontSize: 7,
                      textAlign: 'center',
                      fontWeight: 'bold',
                                           
                      
                    }}> Branch</Text></View>
                    <View style={{
                      width: "20%",
                      flexDirection: "row",
                      textAlign:"left",
                      borderBottom: "1px dotted black",
                                           
                      
                    }}><Text style={{
                      fontSize: 9,
                      fontWeight: 'bold',
                      textTransform: "capitalize"
                                           
                      
                    }}>{Cheque_branch}</Text></View>
                    
                    <View style={{
                      width: "5%",
                      flexDirection: "row",
                      textAlign:"left",
                                           
                      
                    }}></View>
                                       
                                        
                   </View>
                   <View style={{
                    width: "22%",
                    height:"25px",
                    border:"2px solid black",
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center",
                    textAlign:"left",
                   }}>
                    <Text style={{
                      fontSize: 10,
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      textAlign:"left",
                                           
                      
                    }}>RS. </Text>
                    <Text style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                                           
                      
                    }}>{data.Amount} </Text>

                   </View>
                   <View style={{
                    width: "8%",
                    height:"30px",
                    // border:"2px solid black"
                   }}></View>
                   </View>
                   </View>

                   <View style={{
                    width: "100%",
                    flexDirection: "column",
                    
                   }}>
                    <Text style={{
                      fontSize: 9,
                      fontWeight: 'bold',
                      textAlign:"left",
                    }}>Notes:</Text>
                     <Text style={{
                      fontSize: 7,
                      fontWeight: 'bold',
                      textAlign:"left",
                    }}>•     Payment by cheque shall be subject to realization of cheque.
</Text>
                     <Text style={{
                      fontSize: 7,
                      fontWeight: 'bold',
                      textAlign:"left",
                    }}>•     In case cheque bounces, receipt will be automatically cancelled</Text>
                     <Text style={{
                      fontSize: 7,
                      fontWeight: 'bold',
                      textAlign:"left",
                    }}>•     Payment strictly not refundable or transferable
</Text>
                   </View>

                   <View style={{top:"10px",width:"100%", justifyContent:'center', alignItems:'center',
                    
                   }}>
                   <Text style={{
                      fontSize: 9,
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      
                    }}>This is computer generated reciept signature does not required.
                    </Text>

                   </View>
                   <View style={{top:"20px",width:"100%", justifyContent:'center', alignItems:'center', borderBottom:"2px dashed black"}}>

                   </View>
                    
                </Page>
            </Document>
  )
}

export default Sitpayment
