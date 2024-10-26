// DocumentComponent.jsx
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';
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

const MyDocument5 = ({ data }) => {


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ border: "2px solid black" }}>


                    <View style={styles.header}>
                        <View style={styles.headerRight}>
                            <Text style={{ fontSize: '16px', marginTop: 5, fontWeight: '800', color: "#000" }}>PERFORMANCE REPORT</Text>
                        </View>
                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "20px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000' }}>Name :</Text>
                        </View>
                        <View style={[styles.tableCol1, { width: '50%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>ID No : </Text>

                        </View>

                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "30px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000' }}>Training Programme</Text>
                        </View>
                        <View style={[styles.tableCol1, { width: '25%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>Batch No : </Text>

                        </View>
                        <View style={[styles.tableCol1, { width: '25%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>Date : </Text>

                        </View>

                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "10px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '40%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 18, marginLeft: 5, color: '#000' }}>Passing Criteria :</Text>

                        </View>
                        <View style={[styles.tableCol1, { width: '50%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'10px' }}>Distinction</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'10px' }}>First class</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black' ,paddingLeft:'10px'}}>Second class</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'10px' }}>No certificate</Text>
                        </View>
                        <View style={[styles.tableCol1, { width: '50%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black' ,paddingLeft:'10px'}}>75.00% and above</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'10px' }}>60.00% to 74.99% </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'10px' }}>50.00% to 59.99%</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000' ,paddingLeft:'10px'}}>49.99 and below </Text>
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
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Total No. of Absent Days</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Attendance (%)</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Additional Percentage given</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>for full Attendance.</Text>
                        </View>
                        <View style={[styles.tableCol1, { width: '50%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>4</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>4</Text>
                            <Text style={{ fontSize: '10px', marginTop: 16, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}></Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}>100.00</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>30</Text>
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
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>No of Assignments/</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Assignments Submitted</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Marks obtained in Assignments
                            </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Marks obtained in Assignments
                            </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Weightage    %</Text>
                        </View>



                        <View style={[styles.tableCol1, { width: '50%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}> 0</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}> 0</Text>

                            <Text style={{ fontSize: '10px', paddingTop: 4.5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}>25</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}>/ </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>0.00</Text>
                        </View>




                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "50px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '5%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>03 </Text>

                        </View>
                        <View style={[styles.tableCol, { width: '20%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>Unit Tests</Text>

                        </View>
                        <View style={[styles.tableCol1, { width: '30%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Total Unit Test/s</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Attended Unit Test/s</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>Marks obtained in Unit Test/s
                            </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black' ,paddingLeft:'5px'}}>Marks obtained in Unit Test/s
                            </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Weightage 1   %</Text>
                        </View>



                        <View style={[styles.tableCol1, { width: '50%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}> 0</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}> 0</Text>

                            <Text style={{ fontSize: '10px', paddingTop: 4.5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}> </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}>0          /0 </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>0.00</Text>
                        </View>




                    </View>

                    <View style={styles.Course}>
                        <div style={{ height: "30px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '5%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>04 </Text>

                        </View>
                        <View style={[styles.tableCol, { width: '20%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>Final Examination</Text>

                        </View>
                        <View style={[styles.tableCol1, { width: '30%' }]}>

                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black' ,paddingLeft:'5px'}}>Marks obtained </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Weightage -5   %</Text>
                        </View>



                        <View style={[styles.tableCol1, { width: '50%' }]}>
                            <Text style={{ fontSize: '10px', paddingTop: 4.5, color: '#000', borderBottom: '1px solid black' }}> </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>0.00</Text>
                        </View>




                    </View>

                    <View style={styles.Course}>
                        <div style={{ height: "30px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '5%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>05 </Text>

                        </View>
                        <View style={[styles.tableCol, { width: '20%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>Discipline</Text>

                        </View>
                        <View style={[styles.tableCol1, { width: '30%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Weightage -2   %</Text>
                        </View>



                        <View style={[styles.tableCol1, { width: '50%' }]}>

                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',marginLeft:20 }}>0</Text>
                        </View>




                    </View>

                    <View style={styles.Course}>
                        <div style={{ height: "30px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '5%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>06 </Text>

                        </View>
                        <View style={[styles.tableCol, { width: '20%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 20, marginLeft: 5, color: '#000' }}>Final Result</Text>

                        </View>
                        <View style={[styles.tableCol1, { width: '30%' }]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'5px' }}>A + B + C + D + E</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'5px' }}>Grade</Text>
                        </View>



                        <View style={[styles.tableCol1, { width: '50%' }]}>

                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000', borderBottom: '1px solid black',paddingLeft:'20px' }}>0.00</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, color: '#000',paddingLeft:'20px' }}>No Certificate</Text>
                        </View>




                    </View>
                </View>

                <View style={styles.Course}>
                        <div style={{ height: "25px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '33%',borderLeft:'1px solid black',borderTop:'1px solid black',marginTop:'5px'  }]}>
                            <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}>   </Text>

                        </View>
                        <View style={[styles.tableCol, { width: '33%',borderTop:'1px solid black',marginTop:'5px' }]}>
                            <Text style={{ fontSize: '10px', marginLeft: 5, color: '#000' }}>   </Text>

                        </View>
                        <View style={[styles.tableCol1, { width: '33%' ,borderTop:'1px solid black',marginTop:'5px'}]}>
                            <Text style={{ fontSize: '10px', color: '#000', }}>   </Text>

                        </View>

                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "20px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '33%',borderLeft:'1px solid black' }]}>
                            <Text style={{ fontSize: '10px', marginLeft: 50, color: '#000' }}>Aniket Parab</Text>
              

                        </View>
                        <View style={[styles.tableCol, { width: '33%' }]}>
                            <Text style={{ fontSize: '10px', marginLeft: 50, color: '#000' }}>Prasanna Ramdas Paga</Text>
                         

                        </View>
                        <View style={[styles.tableCol1, { width: '33%' }]}>
                            <Text style={{ fontSize: '10px', marginLeft: 50, color: '#000' }}>Varsha Mestry</Text>
                

                        </View>

                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "20px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol, { width: '33%',borderLeft:'1px solid black' }]}>
                            
                            <Text style={{ fontSize: '10px', marginLeft: 50, color: '#000' }}>Prepared By</Text>

                        </View>
                        <View style={[styles.tableCol, { width: '33%' }]}>
                     
                            <Text style={{ fontSize: '10px', marginLeft: 50, color: '#000' }}>Checked By</Text>

                        </View>
                        <View style={[styles.tableCol1, { width: '33%' }]}>
         
                            <Text style={{ fontSize: '10px', marginLeft: 50, color: '#000' }}>Approved By</Text>

                        </View>

                    </View>
            </Page>



        </Document>
    )

};



export default MyDocument5
