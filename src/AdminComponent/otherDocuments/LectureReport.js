import React from 'react';
import { Document, Page, Text, View } from "@react-pdf/renderer";

const LectureReport = () => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
        {/* Main Container */}
        <View style={{ flexDirection: "row", width: "100%", height: "auto" }}>
          
          {/* Red Left Border */}
          <View style={{ width: "2%", backgroundColor: "red", minHeight: 20 }}></View>

          {/* Main Content */}
          <View style={{ width: "98%", borderWidth: 2, borderColor: "black" }}>
            
            {/* Header Section */}
            <View style={{ flexDirection: "row", borderBottomWidth: 2, borderColor: "black" }}>
              
              {/* Training Programme */}
              <View style={{ width: "65%", flexDirection: "row",  padding: 4 }}>
                <Text>Training Programme: </Text>
                <Text style={{ fontWeight: "bold" }}>Pipeline Engineering</Text>
              </View>

              {/* Batch */}
              <View style={{ width: "35%", flexDirection: "row", padding: 4 }}>
                <Text>Batch: </Text>
                <Text style={{ fontWeight: "bold" }}>17001</Text>
              </View>
            </View>

            {/* Table Header */}
            <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "black" }}>

              {[
                { width: "8%", label: "Take Id" },
                { width: "23%", label: "Lecture Name" },
                { width: "11%", label: "Take Date" },
                { width: "8%", label: "Batch" },
                { width: "18%", label: "Topic" },
                { width: "15%", label: "Faculty" },
                { width: "9%", label: "Start Time" },
                { width: "9%", label: "End Time" }
              ].map((col, index) => (
                <View key={index} style={{
                  width: col.width,
                  justifyContent: 'center',
                  alignItems: "center",
                  borderRightWidth: index !== 7 ? 2 : 0, // Last column shouldn't have a right border
                  borderColor: "black",
                  padding: 4
                }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 8 }}>{col.label}</Text>
                </View>
              ))}

            </View>

          </View>
        </View>
        {/* fatch data from api */}
        <View style={{
          width: "100%",
          minHeight: "2.5%",
          maxHeight: "93%",
          flexDirection: "column",
          
        }}>
          <View style={{width: "100%",
          minHeight:"2.5%",
          flexDirection: "row",

          }}>
          <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "black" }}>

{[
  {width: "2.3%" , label: "1"},
  { width: "8%", label: "9547" },
  { width: "23%", label: "Function & Types Of Pipline Syste" },
  { width: "11%", label: "01-Feb-2012" },
  { width: "8%", label: "17001" },
  { width: "18%", label: "Function & Types Of Pipline Systems For Liquid Gas & Multiphare Fluids" },
  { width: "15%", label: "Rudresh B.Hanchina" },
  { width: "9%", label: "6:30:00 PM" },
  { width: "9%", label: "6:30:00 PM" }
].map((col, index) => (
  <View key={index} style={{
    width: col.width,
    justifyContent: 'center',
    alignItems: "center",
    borderRightWidth: index !== 9 ? 2 : 0, // Last column shouldn't have a right border
    borderColor: "black",
    padding: 4
  }}>
    <Text style={{ fontWeight: 'bold', fontSize: 8 }}>{col.label}</Text>
  </View>
))}

</View>
            
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default LectureReport;
