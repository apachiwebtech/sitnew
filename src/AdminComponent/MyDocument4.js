// DocumentComponent.jsx
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';
import sitlogo from '../assets/images/sitlogo.png'
import { BASE_URL } from './BaseUrl';

import axios from 'axios';
// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: 'Helvetica',
        color: "lightslategrey",
        border: '1px solid black',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid round',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '2px solid #000',
        paddingBottom: 10,

        header1: {
            Alignitems: 'center',
        },
    },
    headerLeft: {
        textAlign: 'left',
        flex: "3"
    },
    image: {
        height: 80,
        width: 160,
    },
    headerRight: {
        textAlign: 'center',

        flex: "13"
    },

    billTo: {
        marginBottom: 15,
        fontSize: 12,
        fontWeight: 'bold',
    },
    Course: {
        display: 'flex',
        flexDirection: 'row',
    },
    courseleft: {
        display: 'flex',
        flexDirection: 'row',
        flexDirection: 'row',
        alignItems: 'center',
        flex: '3',
    },
    courseright: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: '7',
    },
    coursecenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: '9',
    },
    itemsTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: 20,

    },
    tableRow: {
        flexDirection: 'row',

    },
    tableCellHeader: {


        fontWeight: '700',
        width: '50%',
        alignItems: 'center',
        marginLeft: '200px',
    },
    tableCell: {
        width: '50%',
    },
    tableCol: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderCollapse: 'collapse',
    },
    tableCol1: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderCollapse: 'collapse',
    },
    tableCol10: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderCollapse: 'collapse',
        display: 'flex',
       flexDirection: 'row',
    },
    tableCol2: {
        borderStyle: 'solid',
        borderWidth: 1,
        // borderBottomWidth:0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        minHeight: 80,
    },
    totals: {
        marginBottom: 20,
    },
    footer1: {
        
        marginBottom: 10,
        margintop: 10,
   

    },
    footer: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    footer3: {
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
    },
    footer4: {
        position: 'fixed',
        top: 487,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
    },
    signatory: {
        textAlign: 'right',
        marginTop: 40,
    },
});

const MyDocument4 = ({ data }) => {


 

    return (
        <Document>

{data.map((item) =>{
        return (
            <Page size="A4" style={styles.page}>
            <View style={{ border: "2px solid black" }}>


                <View style={styles.header}>
                    <View style={styles.headerRight}>
                        <Text style={{ fontSize: '16px', marginTop: 5, fontWeight: '800', color: "#000" }}>PERFORMANCE REPORT</Text>
                    </View>
                </View>
                <View style={styles.Course}>
                    <div style={{ height: "50px", margin: "0 0 0 0" }}>

                    </div>
                    <View style={[styles.tableCol, { width: '50%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>Name : {item.Student_Name}</Text>
                        <Text style={{ fontSize: '10px', marginTop: 15, color: '#000', marginLeft: 5 }}>ID No :{item.Student_Code}</Text>
                    </View>
                    <View style={[styles.tableCol1, { width: '50%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5,marginLeft: 5, color: '#000' }}>Training Programme : </Text>
                        <Text style={{ fontSize: '10px', marginTop: 15,marginLeft: 5, color: '#000' }}>Batch No : {item.Batch_code}</Text>
                    </View>

                </View>
                <View style={styles.Course}>
                    <div style={{ height: "50px", margin: "0 0 0 0" }}>

                    </div>
                    <View style={[styles.tableCol, { width: '40%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 18, marginLeft: 5, color: '#000' }}>Passing Criteria :</Text>

                    </View>
                    <View style={[styles.tableCol1, { width: '50%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Distinction</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>First class</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Second class</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px'}}>No certificate</Text>
                    </View>
                    <View style={[styles.tableCol1, { width: '50%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>75.00% and above</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>60.00% to 74.99% </Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>50.00% to 59.99%</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>49.99 and below </Text>
                    </View>

                </View>
                <View style={styles.Course}>
                    <div style={{ height: "50px", margin: "0 0 0 0" }}>

                    </div>
                    <View style={[styles.tableCol, { width: '100%' }]}>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}>Brief Description of Course</Text>

                    </View>                    
                </View>
               
                <View style={styles.Course}>
                    <div style={{ height: "50px", margin: "0 0 0 0" }}>

                    </div>
                    <View style={[styles.tableCol, { width: '5%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>01</Text>

                    </View>
                    <View style={[styles.tableCol, { width: '20%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}> Attendance Record</Text>

                    </View>
                    <View style={[styles.tableCol1, { width: '30%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Total Lectures</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Attended Lectures</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px', borderBottom: '1px solid black' }}>Total No. of Absent Days</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px', borderBottom: '1px solid black' }}>Attendance (%)</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Additional Percentage given</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000' ,paddingLeft:'5px'}}>for full Attendance.</Text>
                    </View>
                    <View style={[styles.tableCol1, { width: '50%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>{item.Total_Lectures}</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>{item.AttenLectures}</Text>
                        <Text style={{ fontSize: '10px', marginTop: 16, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}>{item.Total_Lectures - item.AttenLectures}</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}>{item.Full_Attendance}</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>3.00</Text>
                    </View>

                </View>

                <View style={styles.Course}>
                    <div style={{ height: "50px", margin: "0 0 0 0" }}>

                    </div>
                    <View style={[styles.tableCol, { width: '5%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>02 </Text>

                    </View>
                    <View style={[styles.tableCol, { width: '20%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>Assignments</Text>

                    </View>
                    <View style={[styles.tableCol1, { width: '30%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', }}>No of Assignments/</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px'}}>Assignments Submitted</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black' ,paddingLeft:'5px'}}>Totalmarks</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Marks obtained in Assignments
                        </Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px'}}>Marks obtained in Assignments
                        </Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000' ,paddingLeft:'5px'}}>Weightage - 2   %</Text>
                    </View>
               
                  
                   
                    <View style={[styles.tableCol1, { width: '50%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000' }}> /</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000' }}></Text>
                        <Text style={{ fontSize: '10px', marginTop: 11, color: '#000', borderBottom: '1px solid black' }}></Text>
                        <View style={[styles.tableCol10, { width: '100%' }]}>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>25</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>25</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>25</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>25</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>25</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>25</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>25</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>25</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>25</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:7,paddingRight:7,paddingTop:4.5, color: '#000' }}>25</Text></View>
                        <View style={[styles.tableCol10, { width: '100%' }]}>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Ass1_Given} </Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Ass2_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Ass3_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Ass4_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Ass5_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Ass6_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Ass7_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Ass8_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Ass9_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',paddingLeft:'20px' }}> {item.Ass10_Given}</Text></View>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',borderBottom: '1px solid black',paddingLeft:'20px' }}>/ </Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>{item.Ass_Percent}</Text>
                    </View>

             
                

                </View>
                <View style={styles.Course}>
                    <div style={{ height: "50px", margin: "0 0 0 0" }}>

                    </div>
                    <View style={[styles.tableCol, { width: '5%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>03</Text>

                    </View>
                    <View style={[styles.tableCol, { width: '20%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>Unit Tests</Text>

                    </View>
                    <View style={[styles.tableCol1, { width: '30%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Total Unit Tests/Tests Attended</Text>

                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black' ,paddingLeft:'5px'}}>Totalmarks</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black' ,paddingLeft:'5px'}}>Marks obtained in Unit Test /s

                        </Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black' ,paddingLeft:'5px'}}>Marks obtained  in Unit Test/s
                        </Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000' }}>Weightage -    %</Text>
                    </View>
                    <View style={[styles.tableCol1, { width: '50%' }]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black' ,paddingLeft:'20px'}}>4</Text>
                        <View style={[styles.tableCol10, { width: '100%' }]}>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>100</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>100</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>100</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>100</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>100</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>100</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>100</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>100</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>100</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:4,paddingRight:7,paddingTop:4.5, color: '#000' }}>100</Text></View>
                        <View style={[styles.tableCol10, { width: '100%' }]}>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}>{item.Test1_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Test2_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Test3_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Test4_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Test5_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Test6_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Test7_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Test8_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',borderRight: '1px solid black' }}> {item.Test9_Given}</Text>
                        <Text style={{ fontSize: '10px', paddingLeft:15,paddingRight:7,paddingTop:4.5, color: '#000',paddingLeft:'20px' }}> {item.Test9_Given}</Text></View>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}>/</Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>{item.Test_Percent}</Text>
                    </View>

                </View>

                <View style={styles.Course}>
                    <div style={{ height: "25px", margin: "0 0 0 0" }}>

                    </div>
                    <View style={[styles.tableCol, { width: '25%' }]}>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}></Text>

                    </View>
                    <View style={[styles.tableCol, { width: '25%' }]}>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}></Text>

                    </View>
                    <View style={[styles.tableCol1, { width: '25%' }]}>
                        <Text style={{ fontSize: '10px', color: '#000', }}></Text>

                    </View>
                    <View style={[styles.tableCol1, { width: '25%' }]}>
                        <Text style={{ fontSize: '10px', color: '#000' }}></Text>

                    </View>

                </View>
                <View style={styles.Course}>
                    <div style={{ height: "25px", margin: "0 0 0 0" }}>

                    </div>
                    <View style={[styles.tableCol, { width: '25%' }]}>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' ,paddingLeft:'20px'}}>Ms Surekha Patil</Text>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000',paddingLeft:'20px' }}>Executive Training</Text>

                    </View>
                    <View style={[styles.tableCol, { width: '25%' }]}>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000',paddingLeft:'20px' }}>Ms. Shreya Phondke</Text>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000',paddingLeft:'20px' }}>Sr. Executive Training</Text>

                    </View>
                    <View style={[styles.tableCol1, { width: '25%' }]}>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' ,paddingLeft:'20px'}}>Student</Text>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000',paddingLeft:'20px' }}>Signature</Text>

                    </View>
                    <View style={[styles.tableCol1, { width: '25%' }]}>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000',paddingLeft:'20px' }}>Parents</Text>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000',paddingLeft:'20px' }}>Signature</Text>

                    </View>

                </View>







            </View>
            <View style={[styles.footer, { width: '25%' }]}>
                        <Text style={{ fontSize: '10px', marginLeft: 5,marginTop:10, color: '#000' }}>Remarks :</Text>
                        <Text style={{ fontSize: '10px', marginLeft: 25,marginTop:10, color: '#000' }}>__________________________________________________________________________________</Text>

                    </View>
                    <View style={[styles.footer1, { width: '70%' }]}>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}>This is the Performance of in Suvidya institute of Technology during his Piping Engineering.</Text>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}>(Period from 8/11/2024 to 8/3/2025). </Text>

                   
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}>Please sign (by student and Parents) and submit to training Co-Odinator.</Text>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}>Please feel free to contact for further clarification.</Text>
                        <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}>Thanking and looking forward to your cooperation.</Text>

                   
                        <Text style={{ fontSize: '10px', marginLeft: 5,marginTop:10, color: '#000' }}>Yours faithfully,</Text>
                        <Text style={{ fontSize: '10px', marginLeft: 5,marginTop:20, color: '#000' }}>For Suvidya Institute of Technology Pvt. Ltd.</Text>

                    </View>

        </Page>
        )
    })}
           
            


        </Document>
    )

};



export default MyDocument4
