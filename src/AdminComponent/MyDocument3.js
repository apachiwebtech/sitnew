import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    minHeight: 40,
  },
  tableCol1: {
    borderStyle: 'solid',
    borderWidth: 1,
    // borderBottomWidth:0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    minHeight: 40,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
  tableCellr: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    // transform: 'rotate(-20deg)',
  },
  tableCellBlank: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    color: '#CCCCCC',
  },
  innerTable: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  innerTableRow: {
    flexDirection: 'row',
  },
  innerTableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    minHeight: 20,
  },
  footer: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 4,
    marginTop: 4,
    fontWeight: 'bold',
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A1" orientation='landscape' style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text>Suvidya Institute of Technology Pvt. Ltd.</Text>
        <Text>REPORT OF FINAL EXAMINATION</Text>
      </View>

      {/* Main Table */}
      <View style={styles.table}>
        {/* Table Header Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: '5%' }]}>
            <Text style={styles.tableCell}>Sr. No.</Text>
          </View>
          <View style={[styles.tableCol, { width: '5%' }]}>
            <Text style={styles.tableCell}>Student ID</Text>
          </View>
          <View style={[styles.tableCol, { width: '10%' }]}>
            <Text style={styles.tableCell}>Name</Text>
          </View>

          {/* Unit Test Marks Header */}
          <View style={[styles.tableCol, { width: '25%' }]}>
            <Text style={styles.sectionTitle}>Unit Test Marks</Text>
            <View style={styles.innerTable}>
              <View style={styles.innerTableRow}>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
            </View>
          </View>
          {/* Average */}
          <View style={[styles.tableCol, { width: '2%' }]}>
            <Text style={[styles.sectionTitle, {borderBottom : '0'  , position:'relative', top : 10 ,transform: 'rotate(90deg)' }]}>Average</Text>
          </View>

          {/* Assignment Marks Header */}
          <View style={[styles.tableCol, { width: '25%' }]}>
            <Text style={styles.sectionTitle}>Assignment Marks</Text>
            <View style={styles.innerTable}>
              <View style={styles.innerTableRow}>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
            </View>
          </View>

          {/* Average */}
          <View style={[styles.tableCol, { width: '2%' }]}>
            <Text style={[styles.sectionTitle, {borderBottom : '0'  , position:'relative', top : 10 ,transform: 'rotate(90deg)' }]}>Average</Text>
          </View>

          {/* Final Exam Marks Header */}
          <View style={[styles.tableCol, { width: '10%' }]}>
            <Text style={styles.sectionTitle}>Final Exam</Text>
            <View style={styles.innerTable}>
              <View style={styles.innerTableRow}>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>

              </View>
            </View>
          </View>

          <View style={[styles.tableCol, { width: '5%' }]}>
            <Text style={styles.tableCellr}>Discipline</Text>
          </View>
          <View style={[styles.tableCol, { width: '5%' }]}>
            <Text style={styles.tableCellr}>Attendance</Text>
          </View>
          <View style={[styles.tableCol, { width: '5%' }]}>
            <Text style={styles.tableCellr}>Absent (%)</Text>
          </View>
          <View style={[styles.tableCol, { width: '5%' }]}>
            <Text style={styles.tableCellr}>Absent days</Text>
          </View>
          <View style={[styles.tableCol, { width: '5%' }]}>
            <Text style={styles.tableCellr}>FullAttendanc</Text>
          </View>
          <View style={[styles.tableCol, { width: '5%' }]}>
            <Text style={styles.tableCellr}>Final Total %</Text>
          </View>
          <View style={[styles.tableCol, { width: '5%' }]}>
            <Text style={styles.tableCellr}>Class Obtained</Text>
          </View>
        </View>

        {/* Empty Data Row for Filling */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol1, { width: '5%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>
          <View style={[styles.tableCol1, { width: '5%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>
          <View style={[styles.tableCol1, { width: '10%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>

          {/* Empty Data for Unit Test Marks */}
          <View style={[styles.tableCol1, { width: '25%' }]}>
            <Text style={styles.sectionTitle}>Marks Obtained</Text>
            <View style={styles.innerTable}>
              <View style={styles.innerTableRow}>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
            </View>
          </View>
          {/* Average */}
          <View style={[styles.tableCol1, { width: '2%' }]}>
            <Text style={styles.innerTable}></Text>
          </View>

          {/* Empty Data for Assignment Marks */}
          <View style={[styles.tableCol1, { width: '25%' }]}>
            <Text style={styles.sectionTitle}>Marks Obtained</Text>
            <View style={styles.innerTable}>
              <View style={styles.innerTableRow}>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
            </View>
          </View>

          {/* Average */}
          <View style={[styles.tableCol1, { width: '2%' }]}>
            <Text style={styles.innerTable}></Text>
          </View>
          {/* Empty Data for Final Exam Marks */}
          <View style={[styles.tableCol1, { width: '10%' }]}>
            <Text style={styles.sectionTitle}>Marks Obtained</Text>
            <View style={styles.innerTable}>
              <View style={styles.innerTableRow}>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCellBlank}>1</Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCellBlank}>2</Text>
                </View>
                <View style={styles.innerTableCol}>
                  <Text style={styles.tableCellBlank}>3</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.tableCol1, { width: '5%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>
          <View style={[styles.tableCol1, { width: '5%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>
          <View style={[styles.tableCol1, { width: '5%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>
          <View style={[styles.tableCol1, { width: '5%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>
          <View style={[styles.tableCol1, { width: '5%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>
          <View style={[styles.tableCol1, { width: '5%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>
          <View style={[styles.tableCol1, { width: '5%' }]}>
            <Text style={styles.tableCellBlank}></Text>
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text>PASSING CRITERIA: 90.00% To 100.00% - A+, 80.00% To 89.99% - A, 70.00% To 79.99% - B+, ...</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
