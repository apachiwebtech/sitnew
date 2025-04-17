import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";




const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    labelContainer: {
        border: "1px solid black",
        width: "24%",
        height: "20%",
        marginRight: 5,
        padding: 5,
    },
    textRow: {
        flexDirection: "row",
        gap: 1,
        // paddingBottom: 5,
    },
    text: {
        fontSize: 9,
    },
});


const StudentLabelDoc = ({studentLabel}) => {
    console.log(studentLabel)
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
            <Page size="A4" orientation="landscape" style={styles.page}>
            {studentLabel.map((item,index) => {
                return (
                    
                            
                    <View  style={styles.labelContainer}>
                    
                        <View style={{height: "70%", gap:"1px"}}>
                            <View style={{flexDirection:"row",width:"100%"}}>
                                <Text style={{width:"30%",  fontFamily: 'Poppins',fontSize: 9,
        fontWeight: 600,}}>Name {"\u00A0\u00A0\u00A0\u00A0"}:</Text>
                                <Text style={{width:"70%", fontSize: 9}}>{item.Student_Name}</Text>
                            </View>
                            <View style={{flexDirection:"row", width:"100%",top:"1px"}}>
                                <Text style={{width:"30%", fontFamily: 'Poppins',fontSize: 9,
        fontWeight: 600,}} >Address :</Text>
                                <Text style={{width:"70%", fontSize: 9,top:"1px"}}>{item.Present_Address}</Text>
                            </View>
                        </View>
                        <View style={{ height: "30%",  }}>
                            <View  style={{flexDirection:"row"}}>
                                <Text style={{ width:"30%", fontFamily: 'Poppins',fontSize: 9,
        fontWeight: 600,}}>Res{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}:</Text>
                                <Text style={{width:"70%", fontSize: 9,top:"1px"}}>{item.Present_Tel}</Text>
                            </View>
                            <View  style={{width:"100%",  fontFamily: 'Poppins',flexDirection:"row"}}>
                                <Text style={{ width:"30%", fontFamily: 'Poppins',fontSize: 9,
        fontWeight: 600,}}>Mob{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}:</Text>
                                <Text style={{width:"70%", fontSize: 9,top:"1px"}}>{item.Present_Mobile}</Text>
                            </View>
                        </View>
                        
                    </View>
                    
                )

                })}

            </Page>
        </Document>
    );
};

export default StudentLabelDoc;
