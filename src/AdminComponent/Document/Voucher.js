
import { Document, Page, Text, View, Image ,
  Font
 } from "@react-pdf/renderer";
import sitlogo from '../../assets/images/sitlogo.png'

import React from 'react'

export const Voucher = ({data , pdfdata}) => {

if (!pdfdata || pdfdata.length === 0) {
        return null; // nothing will be shown if pdfdata is empty or undefined
      }

// Calculate total amount once
// let totalAmount = 0;
// if (pdfdata && pdfdata.length > 0) {
//   for (let i = 0; i < pdfdata.length; i++) {
//     const amount = parseFloat(pdfdata[i].amount);
//     if (pdfdata[i].account_head && !isNaN(amount)) {
//       totalAmount += amount;
//     }
//   }
// }
function numberToWords(num) {
    if (num === 0) return "";

    const belowTwenty = [
        "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
        "Eighteen", "Nineteen"
    ];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion"];

    function helper(n) {
        if (n === 0) return "";
        else if (n < 20) return belowTwenty[n - 1] + " ";
        else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
        else if (n < 1000) return belowTwenty[Math.floor(n / 100) - 1] + " hundred " + helper(n % 100);
        else {
            for (let i = 0, unit = 1000; unit <= Math.pow(10, 12); unit *= 1000, i++) {
                if (n < unit * 1000) {
                    return helper(Math.floor(n / unit)) + thousands[i] + " " + helper(n % unit);
                }
            }
        }
    }

    return helper(num).trim();
}

const totalAmount = pdfdata
  ?.filter(item => item.account_head && item.amount)
  .reduce((sum, item) => sum + Number(item.amount), 0);


    console.log(data,pdfdata)
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
    style={{ width: "20%"}} // Add height for better image rendering
  />
  </View>
  <View style={{width:'100%', flexDirection:"column", border:"1.5px solid black", marginTop:'5px' ,justifyContent:"center", alignItems:"center"}}>
    {/* part 1 */}
    <View style={{width:'100%', flexDirection:"row", borderBottom:'1.5px solid black'}}>
    <View style={{width:'44%', flexDirection:"column",paddingTop:"5px", borderRight:"1.5px solid black"}}>
        <Text style={{textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 8,}}> SUVIDYA INSTITUTE OF TECHNOLOGY PVT. LTD.</Text>

        <Text style={{textAlign: 'center',
        fontFamily: 'Poppins',
        // fontWeight: 600,
        fontSize: 8,}}>18/140, ANAND NAGAR, NEHRU ROAD, VAKOLA,</Text>
        
        <Text style={{textAlign: 'center',
        fontFamily: 'Poppins',
        // fontWeight: 600,
        fontSize: 8,}}> SANTACRUZ(E), MUMBAI - 400 055.</Text>
        </View>

    <View style={{width:'14%', flexDirection:"column",justifyContent:"center", borderRight:"1.5px solid black"}}>
        <Text style={{textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 8,}}>CASH {"\n"}VOUCHER</Text>
    </View>
    {/* subpart of part 1-3 */}
    <View style={{width:'42%', flexDirection:"column" }}>
    <View style={{width:'100%', flexDirection:"row",borderBottom:"1.5px solid black"}}>
    <View style={{width:"50%",flexDirection:"row",height:"20px", borderRight:"1.5px solid black", justifyContent:"center",alignItems:"center", gap:'2px' }}>
    <Text style={{textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 8,}}>Sr. No. : </Text>
        
        <Text style={{textAlign: 'center',
        fontFamily: 'Poppins',
        // fontWeight: 600,
        fontSize: 8,}}>{data.voucherno}</Text>
        </View>
        
                    {(() => {
                        const firstItem = pdfdata.find(item => item.account_head != null);
                        return firstItem ? (
        <View style={{width:"50%",flexDirection:"row", height:"20px", justifyContent:"center",alignItems:"center",gap:'2px' }}>
        <Text style={{textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 8,}}>Date :</Text>
         <Text style={{textAlign: 'center',
        fontFamily: 'Poppins',
        // fontWeight: 600,
        fontSize: 8,}}>{firstItem.date}</Text>
        </View>
    ) : null;
})()}
        </View>
        <View style={{width:"100%", flexDirection:'row',textAlign:"left", alignItems:"center",
            paddingLeft:"20px"
          }}>
        <Text style={{
            top:"5px",
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 8,}}>Paid To :      </Text>
        <Text style={{
        fontFamily: 'Poppins',
        top:"5px",
        fontSize: 8,}}>{data.paidto}</Text>
        </View>
        
    </View>
    </View>

    {/* part2 table */}
    <View style={{
        border: '1.5px solid black',
        borderRadius:"10px",
        width: "98%",
        marginTop:'1%'
        
        
    }}>
        {/* Heading */}
        <View style={{flexDirection:"row", width:'100%',borderBottom:"1.5px solid black"}}>
            <View style={{width:"4%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 8,
                }}>Sr.{"\n"}No.</Text>
            </View>
            <View style={{width:"13%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 8,
                }}>Bill Date</Text>
            </View>
            <View style={{width:"13%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 8,
                }}>Bill No</Text>
            </View>
            <View style={{width:"18%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 8,
                }}>Account Head</Text>
            </View>
            <View style={{width:"13%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 8,
                }}>Amount</Text>
            </View>
            <View style={{width:"61%", 
                justifyContent:"center",
                alignItems:'center',
                
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 8,
                }}>Desrciption</Text>
            </View>
        </View>
        {/* body part */}
        {pdfdata.filter((item) => item.account_head != null).map((item, index) => {
                return (
                    <View style={{flexDirection:"row", width:'100%',height:'auto',  }}>
       
                    <View style={{width:"4%", 
                        justifyContent:"center",
                        alignItems:'center',
                        borderRight:"1.5px solid black",
                        paddingBottom:"5%",
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins',
                            // fontWeight: 800,
                            fontSize: 8,
                        }}>{index + 1}  {/* This will display the serial number */}</Text>
                    </View>
                    <View style={{width:"13%", 
                        justifyContent:"center",
                        alignItems:'center',
                        borderRight:"1.5px solid black",
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins',
                            // fontWeight: 800,
                            fontSize: 8,
                        }}>{item.date ?formatdate(item.date) : ""}</Text>
                    </View>
                    <View style={{width:"13%", 
                        justifyContent:"center",
                        alignItems:'center',
                        borderRight:"1.5px solid black",
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins',
                            // fontWeight: 800,
                            fontSize: 8,
                        }}>{item.bill_no}</Text>
                    </View>
                    <View style={{width:"18%", 
                        justifyContent:"center",
                        alignItems:'center',
                        borderRight:"1.5px solid black",
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins',
                            // fontWeight: 800,
                            fontSize: 8,
                        }}>{item.account_head}</Text>
                    </View>
                    <View style={{width:"13%", 
                        justifyContent:"center",
                        alignItems:'center',
                        borderRight:"1.5px solid black",
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins',
                            // fontWeight: 800,
                            fontSize: 8,
                        }}>{item.amount}</Text>
                    </View>
                    <View style={{width:"61%", 
                        justifyContent:"center",
                        alignItems:'center',
                        
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins',
                            // fontWeight: 800,
                            fontSize: 8,
                        }}>{item.description}</Text>
                    </View>
                </View>
                )
            })}
    
        {/* footer part */}
        <View style={{flexDirection:"row", width:'100%',height:'auto', borderTop:"1.5px solid black"}}>
            <View style={{width:"30%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
                padding:"5px",
                flexDirection:"row"
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 8,
                }}>Paid By :   </Text>
                <Text style={{
                    fontFamily: 'Poppins',
                    // fontWeight: 800,
                    fontSize: 9,
                }}> {data.paidby} </Text>
            </View>
            
            <View style={{width:"18%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 8,
                }}>Total :</Text>
                
            </View>
            {/* {pdfdata.filter((item)=> item.account_head != null ).map((item) =>{
                return ( */}
                {pdfdata.length > 0 && (
            <View style={{width:"13%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    // fontWeight: 800,
                    fontSize: 8,
                }}> {totalAmount.toFixed(2)}</Text>
            </View>
            
            
             )
            }
            
            <View style={{width:"61%", 
                justifyContent:"center",
                // alignItems:'center',
                textAlign:"left"
                
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    // fontWeight: 800,
                    fontSize: 8,
                    left:'10px'
                }}>{numberToWords(totalAmount.toFixed(2))}</Text>
            </View>
        </View>

    </View>
{/* part 3 */}
    <View style={{flexDirection:"row", width:'98%',height:'auto', border:"1.5px solid black",
        borderRadius:"10px", marginTop:'5px', marginBottom:'5px'
    }}>
            <View style={{width:"25%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
                padding:"5px",
                flexDirection:"column"
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    
                    fontSize: 7,
                }}>{data.prepaired_by}</Text>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 7,
                }}>PREPARED BY</Text>
                
            </View>
            
            <View style={{width:"25%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    
                    fontSize: 7,
                }}>{data.checked_by}</Text>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 7,
                }}>CHECKED BY</Text>
                
            </View>
            <View style={{width:"25%", 
                justifyContent:"center",
                alignItems:'center',
                borderRight:"1.5px solid black",
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    
                    fontSize: 7,
                }}>{data.approved_by}</Text>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 7,
                }}> APPROVED BY</Text>
            </View>
            <View style={{width:"25%", 
                justifyContent:"center",
                // alignItems:'center',
                textAlign:"left"
                
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    
                    fontSize: 7,
                }}></Text>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: 7,
                    left:'10px'
                }}>RECEIVERS SIGNATURE</Text>
            </View>
        </View>

  </View>
  <View style={{
    marginTop:"15px",
    borderBottom: "2px dashed black",
    width:"100%"
  }}></View>
  </Page>
  </Document>
  )
}
