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

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        height: 100,
        width: 180,
    },
    headerRight: {
        textAlign: 'center',

        flex: "13"
    },
    header2: {
        textAlign: 'right',

        flex: "13"
    },
    Course: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    tableCol: {
        textAlign: 'center',

        flex: "13"
       
       
    },
    tableCol1: {
        
        textAlign: 'right',
        flex: '13 '
    },
    tableCol2: {
        display:'flex',
        flexDirection: 'row',
        textAlign: 'right',
        flex: '13 '
    },

});

const Receipt = ({ data }) => {




    return (
        <Document>


            return (
            <Page size="A4" style={styles.page}>
                <View>
                <View style={styles.header2}>
                            <Text style={{ fontSize: 10, marginTop: 25, fontWeight: '800', color: "#000", textDecorationLine: 'underline'}}>Student Copy</Text>
                        </View>
                    <View style={styles.header}>
                        <Image style={{ width: '150px',marginTop:25,marginLeft:15 }} src={sitlogo}></Image>
                    </View>
                    <View style={styles.header}>
                        <View style={styles.headerRight}>
                            <Text style={{ fontSize: '10px', marginTop: 5, fontWeight: '800', color: "#000"}}>PAYMENT RECEIPT</Text>
                        </View>
                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "40px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>Suvidya Institute of Technology Private Limited</Text>

                        </View>

                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "50px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol]}>
                            <Text style={{ fontSize: '10px',  marginLeft: 5, color: '#000' }}>Regd. Office : 18/140 Anand Nagar, Nehru Road, Vakola, Santacruz (E), </Text>
                            <Text style={{ fontSize: '10px',  marginLeft: 5, color: '#000' }}>Mumbai – 400 055. Mob:, 9324670725 </Text>

                        </View>

                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "50px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol1]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>Date:     01st Apr-2025 </Text>
                           

                        </View>

                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "50px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}> Received with thank from Prajakta Prashant Tambole ………………………………………………… </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>the sum of rupees Five Thousand Eight Hundred Ninety Nine Only…………………………………… </Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>Course fees for Engineering Design & Drafting Fees by Cash …………………………………………
                            </Text>

                        </View>

                    </View>

                    <View style={styles.Course}>
                        <div style={{ height: "20px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol2]}>
                        <Text style={{ fontSize: '10px', marginTop: 5, marginRight: 50, color: '#000',width:'70%' }}></Text>
                        <Text style={{ fontSize: '10px', marginTop: 5, marginRight: 25, color: '#000',border:'1px solid black',padding:'2px' }}>Rs. 5,899.00</Text>
                           

                        </View>

                    </View>
                    <View style={styles.Course}>
                        <div style={{ height: "50px", margin: "0 0 0 0" }}>

                        </div>
                        <View style={[styles.tableCol]}>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>------------------------------------------------------------------------------------------------------------------------------------------------------------------</Text>
                            <Text style={{ fontSize: '10px', marginTop: 5, marginLeft: 5, color: '#000' }}>This is a computer-generated receipt signature is not required.  </Text>

                        </View>

                    </View>
                    <View style={styles.Course}>
                        
                        <View style={[styles.tableCol]}>
                           

                        </View>

                    </View>
                    
                   









                </View>



            </Page>
            )




        </Document>
    )

};



export default Receipt
