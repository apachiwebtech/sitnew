import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

const AnalysisDoc = () => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
        {/* Logo View */}
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image src={"/public/sitLogo.jpg"} style={{ width: 60 }} />
        </View>

        {/* Title View */}
        <View
          style={{
            width: "100%",
            padding: 5,
            borderWidth: 2,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 9 }}>BATCH ANALYSIS RECORD</Text>
        </View>

        {/* Main Content View (Auto Expanding) */}
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            borderWidth: 2,
            borderColor: "black",
            marginTop: 5,
          }}
        >
          {/* Training Details */}
          {[
            { label: "Training Programme", value: "Piping Design & Drafting" },
            { label: "Batch Code", value: "12023" },
            { label: "Total Student", value: "24" },
            { label: "Hrs. as per lecture plan", value: "160.00" },
            { label: "Actual Hrs. used", value: "309.98" },
            { label: "Excess Hrs. used", value: "149.98" },
            { label: "Fees Per Student", value: "30,899.00" },
            { label: "Total Fees", value: "741,576.00" },
            { label: "Total Fees Received", value: "919,159.00" },
          ].map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: "30%",
                  padding: 5,
                  borderRightWidth: 1,
                  borderColor: "black",
                }}
              >
                <Text style={{ fontSize: 9 }}>{item.label}</Text>
              </View>
              <View style={{ width: "70%", padding: 5 }}>
                <Text style={{ fontSize: 9 }}>{item.value}</Text>
              </View>
            </View>
          ))}

          {/* Faculty Payment Table (Auto Expanding) */}
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              borderWidth: 1.5,
              borderColor: "black",
              marginTop: 5,
            }}
          >
            {/* Table Header */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              {["Faculty Payment", "Hrs", "Rate Per (Hr.)", "Total Amount"].map(
                (header, index) => (
                  <View
                    key={index}
                    style={{
                      width: index === 0 ? "40%" : "20%",
                      padding: 5,
                      borderRightWidth: index < 3 ? 1 : 0,
                      borderColor: "black",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 9 }}>{header}</Text>
                  </View>
                )
              )}
            </View>

            {/* Table Rows (Dynamic) */}
            {[{ faculty: "", hrs: "", rate: "", total: "" }].map(
              (row, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderColor: "black",
                  }}
                >
                  {[row.faculty, row.hrs, row.rate, row.total].map(
                    (text, idx) => (
                      <View
                        key={idx}
                        style={{
                          width: idx === 0 ? "40%" : "20%",
                          padding: 5,
                          borderRightWidth: idx < 3 ? 1 : 0,
                          borderColor: "black",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 9 }}>{text}</Text>
                      </View>
                    )
                  )}
                </View>
              )
            )}
          </View>

          {/* Total & Net Balance */}
          {["Total", "Net Balance"].map((label, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                borderTopWidth: index === 0 ? 1 : 0,
                borderBottomWidth: 1,
                borderColor: "black",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: "70%",
                  padding: 5,
                  borderRightWidth: 1,
                  borderColor: "black",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 9 }}>{label}</Text>
              </View>
              <View style={{ width: "30%", padding: 5, alignItems: "center" }}>
                <Text style={{ fontSize: 9 }}></Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default AnalysisDoc;
