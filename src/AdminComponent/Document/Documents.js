
import React from 'react';
import { Document, Page, Text, View, Font, Image } from '@react-pdf/renderer';

Font.register({
  family: 'Poppins',
  fonts: [
    { src: '/fonts/Poppins-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Poppins-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/Poppins-Bold.ttf', fontWeight: 'bold' },
  ],
});

// Table column configuration (Sr.No added to left side)
const tableColumns = [
  { key: 'name', width: '25%', label: 'Name' },
  { key: 'admissionForm', width: '12%', label: 'Admission Form' },
  { key: 'contractReview', width: '12%', label: 'Contract Review' },
  { key: 'photo', width: '10%', label: 'Photo' },
  { key: 'certificate', width: '12%', label: 'Certificate' },
  { key: 'marksheet', width: '10%', label: 'Marksheet' },
  { key: 'idProof', width: '10%', label: 'ID Proof' },
  { key: 'addressProof', width: '10%', label: 'Address Proof' },
];


// Sample student data
const students = [
  {
    name: 'John Doe',
    admissionForm: '✔',
    contractReview: '✔',
    photo: '✔',
    certificate: '',
    marksheet: '✔',
    idProof: '✔',
    addressProof: '',
  },
  {
    name: 'Jane Smith',
    admissionForm: '✔',
    contractReview: '',
    photo: '✔',
    certificate: '✔',
    marksheet: '',
    idProof: '✔',
    addressProof: '✔',
  },
];


// Row component (header or student row)
const TableRow = ({ isHeader = false, rowData = {}, index = 0 }) => (
  <View
    style={{
      width: '100%',
      height: isHeader ? '5%' : '3%',
      border: '1px solid black',
      borderTop: isHeader ? undefined : 'none',
      flexDirection: 'row',
    }}
  >
    {tableColumns.map((col, colIndex) => (
      <View
        key={col.key}
        style={{
          width: col.width,
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 2px',
          // 🧠 This removes left border for the first column (Sr. No.)
          borderLeft: colIndex === 0 ? 'none' : '1px solid black',
        }}
      >
        <Text
  style={{
    fontFamily: 'Poppins',
    fontWeight: isHeader ? 600 : 400,
    fontSize: 9,
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
  }}
>
  {isHeader ? col.label : rowData[col.key]}
</Text>

      </View>
    ))}
  </View>
);


const Documents = () => {
  return (
   <Document>
         <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
            <View style={{ width: '100%', height: '100%' }}>
                <Image src="/path/to/sit-logo.png" 
               style={{ width: 50, height: 50, marginRight: 10 }}>

                </Image>
             {/* Header Info */}
             <View style={{
               width: "100%",
               height: "3%",
               border: "1px solid black",
               justifyContent:"center",
               alignItems:"center",
               borderBottom: "none",
               flexDirection: "row"
             }}>
                <Text style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 9 }}>
                   Check List For Document Submission
                </Text>              
             </View>
   
             <View style={{
               width: "100%",
               height: "3%",
               border: "1px solid black",
               borderBottom: "none",
               flexDirection: "row"
             }}>
               <View style={{
                 width: "50%",
                 height: "100%",
                 flexDirection: "row",
                 alignItems: "center",
                 padding: "0px 10px"
               }}>
                 <Text style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 9 }}>
                   Training Programme:
                 </Text>
                 <Text style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 9, marginLeft: 4 }}>
                   Piping Engineering
                 </Text>
               </View>
               <View style={{
                 width: "50%",
                 height: "100%",
                 flexDirection: "row",
                 alignItems: "center",
                 justifyContent: "center",
                 padding: "0px 10px"
               }}>
                 <Text style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 9 }}>
                   Batch:
                 </Text>
                 <Text style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 9, marginLeft: 4 }}>
                   19-2-2000
                 </Text>
               </View>
             </View>
   
     {/* Table Header */}
          <TableRow isHeader/>

          {/* Table Rows */}
          {students.map((student, index) => (
            <TableRow key={index} rowData={student} index={index} />
          ))}
            
           </View>
         </Page>
       </Document>
  )
}

export default Documents;