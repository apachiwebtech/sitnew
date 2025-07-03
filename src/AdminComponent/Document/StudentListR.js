import React from 'react';
import { Document, Page, Text, View, Font } from '@react-pdf/renderer';

// Font registration
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
   { key: 'srNo', width: '8%', label: 'Sr.No.' },
  { key: 'code', width: '17%', label: 'Code' },
  { key: 'name', width: '26%', label: 'Name' },
  { key: 'qualification', width: '19%', label: 'Qualification' },
  { key: 'grade', width: '18%', label: 'Grade' },
  { key: 'sign', width: '12%', label: 'Sign' },
];

// Sample student data
const students = [
  { code: 'STU101', name: 'John Doe', qualification: 'B.Tech', grade: 'A+', sign: '✔' },
  { code: 'STU102', name: 'Jane Smith', qualification: 'M.Tech', grade: 'A', sign: '' },
  { code: 'STU103', name: 'Robert Roe', qualification: 'Diploma', grade: 'B+', sign: '✔' },
];

// Row component (header or student row)
const TableRow = ({ isHeader = false, rowData = {}, index = 0 }) => (
  <View
    style={{
      width: '100%',
      height: isHeader ? '2%' : '3%',
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
          padding: '0px 10px',
          // 🧠 This removes left border for the first column (Sr. No.)
          borderLeft: colIndex === 0 ? 'none' : '1px solid black',
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins',
            fontWeight: isHeader ? 600 : 400,
            fontSize: 9,
          }}
        >
         {isHeader
  ? col.label
  : col.key === 'srNo'
  ? index + 1
  : rowData[col.key]}
        </Text>
      </View>
    ))}
  </View>
);


// Main PDF component
const StudentListR = () => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
        <View style={{ width: '100%', height: '100%' }}>
          {/* Header Info */}
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
          <TableRow isHeader />

          {/* Table Rows */}
          {students.map((student, index) => (
            <TableRow key={index} rowData={student} index={index} />
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default StudentListR;
