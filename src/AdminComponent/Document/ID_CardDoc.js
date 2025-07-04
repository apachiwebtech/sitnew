import { Padding } from '@mui/icons-material'
import React from 'react'
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import sitlogo from '../../assets/images/sitlogo.png'
import { IMG_URL } from '../BaseUrl';
import { formatDate } from '../../Utils/dateFormat';

const ID_CardDoc = ({ student }) => {

    console.log(student)
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
                    flexDirection: "column",
                    width: "100%",
                    // height: "90%",

                }}>

                    {student.map((item, index) => {

                        const imageUrl = `${IMG_URL}/student_document/${item.Student_Id}/${item.upload_image}`;
                        console.log('Image URL:', imageUrl); // Logs each image URL

                        const validImage = (filename) => {
                            return /\.(jpg|jpeg|png|gif)$/i.test(filename);
                        };


                        return (


                            <View style={{
                                flexDirection: "row",
                                width: "100%",
                                height: "160px",
                                gap: "3px",
                                marginTop: "10px"

                            }} key={index}>
                                <View break={index === 4} wrap={false}>

                                </View>
                                {/* left card */}

                                <View style={{
                                    width: "50%",
                                    height: "160px",
                                    border: "1px solid black",
                                    display: "flex",
                                    justifyContent: 'center',
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        width: "80%",
                                        height: "auto",
                                        fontSize: "20",
                                        fontFamily: 'Poppins',
                                        fontWeight: 600,
                                        textAlign: "center",
                                        whiteSpace: 'nowrap',
                                    }} wrap={false}>{item.Student_Name}</Text>
                                </View>



                                {/* card right */}
                                <View style={{
                                    flexDirection: "column",
                                    width: "50%",
                                    height: "100%",
                                    border: "1px solid black",
                                }}>
                                    <View style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        height: "80%",
                                        // border: "1px solid black",
                                    }}><View style={{
                                        flexDirection: "column",
                                        height: "100%",
                                        width: "30%",
                                        // backgroundColor: "red",
                                    }}>

                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    height: "40%",
                                                    borderBottom: "1px solid black"

                                                }}>

                                                <Image
                                                    source={sitlogo} // Correct way to include local images
                                                    style={{ width: "100%", marginTop: "5px" }} // Add height for better image rendering
                                                />
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    height: "60%",

                                                }}>

                                                {validImage(item.upload_image) ? (
                                                    <Image
                                                        src={`${IMG_URL}/student_document/${item.Student_Id}/${item.upload_image}`}
                                                        style={{ width: '70px' }}
                                                    />
                                                ) : (
                                                    <Text>Invalid Image</Text>
                                                )}

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
                                                paddingLeft: "5px",
                                                paddingRight: "20px",
                                                fontFamily: 'Poppins',
                                                fontWeight: 600,

                                            }}>SUVIDYA INSTITUTE OF TECHNOLOGY </Text>
                                            <Text style={{
                                                fontSize: 7,
                                                padding: "5px",
                                                paddingLeft: "5px",
                                                paddingRight: "20px",
                                                fontFamily: 'Poppins',
                                                fontWeight: 600,

                                            }}>SUVIDYA INSTITUTE OF TECHNOLOGY{"\n"}
                                                18/140, Anand Nagar, Nehru Road, Vakola,
                                                Santacruz (E) , Mumbai - 400 055.{"\n"}
                                                Phone : (022) 26682290, 09821569885 </Text>
                                            <View style={{
                                                flexDirection: "row",
                                                width: "100%",
                                                gap: "5px",
                                                paddingTop: "5px",
                                                paddingLeft: "5px",
                                                paddingRight: "5px",
                                                marginTop: "2px"
                                            }}>
                                                <View style={{
                                                }}>
                                                    <Text style={{
                                                        fontSize: 7, fontFamily: 'Poppins',
                                                        fontWeight: 600,
                                                    }}>Name</Text>
                                                </View>
                                                <View style={{
                                                    width: "85%",
                                                    backgroundColor: "white",
                                                    borderBottom: "1px solid black"
                                                }}>
                                                    <Text style={{ fontSize: 8, marginLeft: "5px" }}>
                                                        {item.Student_Name}
                                                    </Text>
                                                </View>


                                            </View>
                                            <View style={{
                                                flexDirection: "row",
                                                width: "100%",
                                                gap: "5px",
                                                paddingTop: "5px",
                                                paddingLeft: "5px",
                                                paddingRight: "5px",
                                            }}>
                                                <View style={{

                                                }}>
                                                    <Text style={{
                                                        fontSize: 7, fontFamily: 'Poppins',
                                                        fontWeight: 600,
                                                    }}>Course</Text>
                                                </View>
                                                <View style={{
                                                    width: "85%",
                                                    backgroundColor: "white",
                                                    borderBottom: "1px solid black"
                                                }}>
                                                    <Text style={{ fontSize: 8, marginLeft: "5px" }}>
                                                        {item.Course_Name}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                flexDirection: "row",
                                                width: "100%",
                                                gap: "5px",
                                                paddingTop: "5px",
                                                paddingLeft: "5px",
                                                paddingRight: "5px",
                                            }}>
                                                <View style={{
                                                    // width: "36%",

                                                    // backgroundColor:"blue",
                                                }}>
                                                    <Text style={{
                                                        fontSize: 7, fontFamily: 'Poppins',
                                                        fontWeight: 600,
                                                    }}>Batch No.</Text>
                                                </View>
                                                <View style={{
                                                    width: "85%",
                                                    backgroundColor: "white",
                                                    borderBottom: "1px solid black"
                                                }}>
                                                    <Text style={{ fontSize: 8, marginLeft: "5px" }}>
                                                        {item.Batch_code}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={{
                                                flexDirection: "row",
                                                width: "100%",
                                                gap: "5px",
                                                paddingTop: "5px",
                                                paddingLeft: "5px",
                                                paddingRight: "5px",
                                            }}>
                                                <View style={{
                                                    // width: "37%",

                                                    // backgroundColor:"blue",
                                                }}>
                                                    <Text style={{
                                                        fontSize: 7, fontFamily: 'Poppins',
                                                        fontWeight: 600,
                                                    }}>Contact No</Text>
                                                </View>
                                                <View style={{
                                                    width: "70%",
                                                    // backgroundColor:"white",
                                                    borderBottom: "1px solid black"
                                                }}>
                                                    <Text style={{ fontSize: 8, }}>
                                                        {item.Present_Mobile}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                flexDirection: "row",
                                                width: "100%",
                                                gap: "5px",
                                                paddingTop: "5px",
                                                paddingLeft: "5px",
                                                paddingRight: "5px",
                                            }}>
                                                <View style={{
                                                    // width: "36%",

                                                    // backgroundColor:"blue",
                                                }}>
                                                    <Text style={{
                                                        fontSize: 7, fontFamily: 'Poppins',
                                                        fontWeight: 600,
                                                    }}>Valid Upto</Text>
                                                </View>
                                                <View style={{
                                                    width: "80%",
                                                    backgroundColor: "white",
                                                    borderBottom: "1px solid black",
                                                    marginRight: "3px"
                                                }}>
                                                    <Text style={{ fontSize: 8 }}>{item.Valid_Date ? formatDate(item.Valid_Date) : ''}</Text>
                                                </View>
                                            </View>
                                        </View></View>
                                    <View style={{
                                        width: "100%",
                                        height: "20%",
                                        justifyContent: "center",

                                    }}>
                                        <Text style={{
                                            fontSize: 8, textAlign: "center",
                                            paddingTop: "15px"
                                        }}>E-mail : enquiry@suvidya.ac.in Website : www.suvidya.ac.in</Text>
                                    </View>
                                </View>

                            </View>
                        )

                    })}


                </View>


            </Page>
        </Document>
    )
}

export default ID_CardDoc
