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
    marginBottom: 20,
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
    marginBottom: 10,
    marginTop: -10,


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

    padding: 8,
    fontWeight: '700',
    width: '50%',
    alignItems: 'center',
    marginLeft: '200px',
  },
  tableCell: {

    padding: 8,
    width: '20%',
  },
  totals: {
    marginBottom: 20,
  },
  footer1: {
    display: 'flex',
    marginBottom: 10,
    margintop: 10,
    flexDirection: 'row',

  },
  footer: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  footer3: {
    position:'fixed',
    bottom:0,
    display: 'flex',
    flexDirection: 'row',
  },
  footer4: {
    position:'fixed',
    top:487,
    bottom:0,
    display: 'flex',
    flexDirection: 'row',
  },
  signatory: {
    textAlign: 'right',
    marginTop: 40,
  },
});

const MyDocument1 = (props) => {
  const [order, setOrder] = useState([])
  const [cart, setCart] = useState([])

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ border: "2px solid black" }}>


          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image src={sitlogo} style={styles.image} />

            </View>
            <View style={styles.headerRight}>
              <Text style={{ fontSize: '16px', marginTop: 5, fontWeight: '800', color: "#000" }}>Suvidya Institute of Technology Pvt. Ltd.</Text>

              <Text style={{ fontSize: '13px', marginTop: 5, fontWeight: '800', color: "#000" }}>MUMBAI</Text>

              <Text style={{ fontSize: '18', marginTop: 5, fontWeight: '800', color: "#000" }}>ADMISSION FORM</Text>
            </View>
          </View>
          <View style={styles.Course}>
            <View style={styles.courseright}>
              <Text style={{ fontSize: 9, fontWeight: '300', color: "#000" }}>Course No:</Text>
            </View>
            <View style={styles.coursecenter}>
              <Text style={{ fontSize: 9, fontWeight: '300', color: "#000", marginLeft: '28px' }}>Batch  No:</Text>
            </View>
            <View style={styles.courseleft}>
              <Text style={{ fontSize: 9, fontWeight: '300', color: "#000" }}>ID No:</Text>
            </View>
          </View>


          <View style={styles.itemsTable}>
            <View style={{ backgroundColor: '#000000', color: '#fff', display: 'flex', }}>
              <Text style={styles.tableCellHeader}>PERSONAL DETAILS</Text>
            </View>



            <View style={styles.tableRow}>
              <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", padding: 3, color: "#000", marginBottom: '15px', marginTop: '15px' }}>Name of the Applicant</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, color: "#000", marginTop: '20px', marginBottom: '10px' }}>___________________________</Text>
            </View>
            <View>
              <Text style={{ borderBottom: "2px solid #000" }}></Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", padding: 3, color: "#000", marginBottom: '15px', marginTop: '15px' }}>Date of Birth</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, color: "#000", marginTop: '20px', marginBottom: '5px', flex: '9' }}>Day</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, color: "#000", marginTop: '20px', marginBottom: '5px', flex: '15' }}>Month</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, color: "#000", marginTop: '20px', marginBottom: '5px', flex: '80' }}>Year</Text>
            </View>
            <View>
              <Text style={{ borderBottom: "2px solid #000" }}></Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", padding: 3, color: "#000", marginBottom: '6px', marginTop: '6px' }}>Gender</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, marginTop: '6px', marginBottom: '5px', color: "#000" }}>Male</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, marginTop: '6px', marginBottom: '5px', color: "#000" }}>Female</Text>
            </View>
            <View>
              <Text style={{ borderBottom: "2px solid #000" }}></Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", padding: 3, color: "#000", marginBottom: '30px', marginTop: '6px' }}>Present Address:</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", marginBottom: '6px', marginTop: '20px', padding: 3, color: "#000" }}>Telephone No.</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, color: "#000", marginTop: '20px', marginBottom: '5px', flex: '15' }}>Resi :</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, color: "#000", marginTop: '20px', marginBottom: '5px', flex: '15' }}>Mobile :</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", padding: 3, color: "#000", marginBottom: '6px', marginTop: '6px' }}>Email:</Text>
            </View>

            <View>
              <Text style={{ borderBottom: "2px solid #000" }}></Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", padding: 3, color: "#000", marginBottom: '30px', marginTop: '6px' }}>Permanent Address:</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", marginBottom: '6px', marginTop: '20px', padding: 3, color: "#000" }}>Telephone No.</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, color: "#000", marginTop: '20px', marginBottom: '5px', flex: '15' }}>Resi :</Text>
              <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", padding: 3, color: "#000", marginTop: '20px', marginBottom: '5px', flex: '15' }}> Family Mobile :</Text>
            </View>

            <View>
              <Text style={{ borderBottom: "2px solid #000" }}></Text>
            </View>
          </View>


          <View style={{ backgroundColor: '#000000', color: '#fff', display: 'flex', }}>
            <Text style={styles.tableCellHeader}>FOR OFFICE USE ONLY</Text>
          </View>

          <View style={styles.footer1}>
            <Text style={{ marginLeft: '5px', marginRight: '30px', margintop: '15px', color: '#000', }} >Admission granted against advance payment of Rs agreed to pay in</Text>
            <Text style={{ Alignitems: 'right', marginLeft: '120px', margintop: '15px', color: '#000', }} >Dated</Text>
          </View>
          <View style={(styles.footer)}>

            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '30px', }}>1. Cheque No.</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '30px', }}>________________</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '30px', }}>Dated</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '30px', }}>________________</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '30px', }}>Amount : Rs.</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '30px', }}>________________</Text>

          </View>
          <View style={(styles.footer)}>

            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '10px', }}>1. Cheque No.</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>________________</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '10px', }}>Dated</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>________________</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '10px', }}>Amount : Rs.</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>________________</Text>

          </View>
          <View style={(styles.footer)}>

            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '10px', }}>1. Cheque No.</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>________________</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '10px', }}>Dated</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>________________</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '10px', }}>Amount : Rs.</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>________________</Text>

          </View>
          </View>
          <View style={(styles.footer3)}>
            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '10px',fontSize:'8px' }}> F/CB/02/00</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '40px', color: '#000', marginTop: '10px',fontSize:'6px',marginRight:'1px', }}> This document is the property of “Suvidya Institute of Technology Pvt. Ltd. “ and unauthorised disclosure to any third party or duplication is not permitted.</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '113px', color: '#000', marginTop: '10px',fontSize:'8px',marginRight:'10px' }}> Page 1 of 2</Text>
           </View>
          </Page>
         <Page size="A4" style={styles.page}>
         <View style={{ border: "2px solid black" }}>
          <View style={(styles.footer)}>
            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '10px', }}>Document Attached  : </Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>i. Qualification Certificate</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '36px', color: '#000', marginTop: '10px', }}> Yes</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '10px',borderTop:'1px',borderLeft:'1px',borderBottom:'1px',borderRight:'1px', }}>         </Text>
          </View>
          <View style={(styles.footer)}>
            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '10px', }}>                                    </Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>ii. Qualification Marksheets</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '26px', color: '#000', marginTop: '10px', }}> Yes</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '10px',borderTop:'1px',borderLeft:'1px',borderBottom:'1px',borderRight:'1px', }}>         </Text>
          </View>
          <View style={(styles.footer)}>
            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '10px', }}>                                   </Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>iii. ID Proof</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '100px', color: '#000', marginTop: '10px', }}> Yes</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '10px',borderTop:'1px',borderLeft:'1px',borderBottom:'1px',borderRight:'1px', }}>         </Text>
          </View>
          <View style={(styles.footer)}>  
            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '10px', }}>                                   </Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>iv. Resi Proof</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '90px', color: '#000', marginTop: '10px', }}> Yes</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '10px',borderTop:'1px',borderLeft:'1px',borderBottom:'1px',borderRight:'1px', }}>         </Text>
          </View>
          <View style={(styles.footer)}>
            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '10px', }}>                                   </Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '10px', }}>v. Photo</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '113px', color: '#000', marginTop: '10px', }}> Yes</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '15px', color: '#000', marginTop: '10px',borderTop:'1px',borderLeft:'1px',borderBottom:'1px',borderRight:'1px', }}>         </Text>
          </View>
          
          <View>
              <Text style={{ borderBottom: "2px solid #000" }}></Text>
           </View>

           <View style={(styles.footer)}>
            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '15px', }}>Date of Admission :</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '20px', color: '#000', marginTop: '15px',borderBottom: '1px'}}>10-Aug-24</Text>
          </View>

          
        </View>
        <View style={(styles.footer4)}>
            <Text style={{ lineHeight: "1.2", marginLeft: '5px', color: '#000', marginTop: '10px',fontSize:'8px' }}> F/CB/02/00</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '40px', color: '#000', marginTop: '10px',fontSize:'6px',marginRight:'1px', }}> This document is the property of “Suvidya Institute of Technology Pvt. Ltd. “ and unauthorised disclosure to any third party or duplication is not permitted.</Text>
            <Text style={{ lineHeight: "1.2", marginLeft: '113px', color: '#000', marginTop: '10px',fontSize:'8px',marginRight:'10px' }}> Page 2 of 2</Text>
      </View>
       
      </Page>
     
      
    </Document>
  )

};



export default MyDocument1

