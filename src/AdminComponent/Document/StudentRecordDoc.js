import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 10 },
    cel: {
        borderRight: "1px solid black",
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
});

const StudentRecordDoc = (props) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1px",
                    }}
                >
                    <Image src={`/sitLogo.jpg`} style={{ width: "70px" }}></Image>
                </View>
                <View style={{ textAlign: "center", padding: "5px", border: "1.5px solid black", marginBottom: "5px" }}>
                    <Text>STUDENT RECORD</Text>
                </View>
                <View
                    style={{
                        padding: "5px",
                        border: "1.5px solid black",
                        flexDirection: "row",
                        gap: 70,
                        marginBottom: "10px",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            gap: "5px",
                        }}
                    >
                        <Text>Training Programme:</Text>
                        <Text>Electrical System Design</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: "5px",
                        }}
                    >
                        <Text>Batch No.:</Text>
                        <Text>09065</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: "5px",
                        }}
                    >
                        <Text>From:</Text>
                        <Text>06-Jan-2025</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: "5px",
                        }}
                    >
                        <Text>To:</Text>
                        <Text>08-Feb-2025</Text>
                    </View>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid black",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            borderBottom: "1px solid black",
                            fontSize: 9,
                        }}
                    >
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 0.3,
                                },
                            ]}
                        >
                            <Text style={{}}>ID No.</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 6,
                                },
                            ]}
                        >
                            <Text style={{}}>Name and Address</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 2,
                                },
                            ]}
                        >
                            <Text style={{}}>Qualification</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 3,
                                },
                            ]}
                        >
                            <Text style={{}}>Contact Detail</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 2.5,
                                },
                            ]}
                        >
                            <Text style={{}}>Company</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 1,
                                },
                            ]}
                        >
                            <Text style={{}}>Exp.</Text>
                        </View>
                        <View style={{ padding: 5, flexGrow: 3, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{}}>Other Details</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            borderBottom: "1px solid black",
                            fontSize: 9,
                        }}
                    >
                        <View
                            style={{
                                borderRight: "1px solid black",
                                display: "flex",
                                width: "5.47%",
                                minHeight: 80,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "8px",
                                    transform: "rotate(270deg)",
                                    margin: "auto",
                                }}
                            >
                                25090650001
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "28.05%",
                                flexDirection: "column",
                            }}
                        >
                            <View
                                style={{
                                    borderBottom: "1px solid black",
                                    flexGrow: 1,
                                    padding: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>Aditya Jagdish Borade</Text>
                            </View>
                            <View
                                style={{
                                    borderBottom: "1px solid black",
                                    flexGrow: 2,
                                    padding: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>
                                    Plot no 77 buddhghosh soc b cabin road ambernath East Maharastra, Ambernath -
                                    421501, India
                                </Text>
                            </View>
                            <View style={{ flexGrow: 1, justifyContent: "center", padding: 2 }}>
                                <Text style={{}}>boradeaditya15@gmail.com</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "13.3%",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                padding: 2,
                            }}
                        >
                            <View
                                style={{
                                    padding: 2,
                                    textAlign: "center",
                                }}
                            >
                                <Text style={{}}>BE</Text>
                            </View>
                            <View
                                style={{
                                    padding: 2,
                                    textAlign: "center",
                                }}
                            >
                                <Text style={{}}>Electrical</Text>
                            </View>
                            <View
                                style={{
                                    padding: 2,
                                    textAlign: "center",
                                }}
                            >
                                <Text style={{}}>2024</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "17%",
                                flexDirection: "column",
                            }}
                        >
                            <View
                                style={{
                                    borderBottom: "1px solid black",
                                    flexGrow: 1,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>{"(R)"}</Text>
                            </View>
                            <View
                                style={{
                                    borderBottom: "1px solid black",
                                    flexGrow: 1,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>{"(O)"}</Text>
                            </View>
                            <View
                                style={{
                                    borderBottom: "1px solid black",
                                    flexGrow: 1,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>{"(M)  9028848332"}</Text>
                            </View>
                            <View
                                style={{
                                    flexGrow: 1,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>{"(DOB)  29-Sep-2000"}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "13.35%",
                            }}
                        >
                            <Text style={{}}></Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "6.45%",
                            }}
                        >
                            <Text style={{}}></Text>
                        </View>
                        <View
                            style={{
                                width: "16.4%",
                                flexDirection: "column",
                            }}
                        >
                            <View
                                style={{
                                    fontSize: 8,
                                    borderBottom: "1px solid black",
                                    flexGrow: 1,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>Grade : NO CERTIFICATE</Text>
                            </View>
                            <View
                                style={{
                                    fontSize: 7,
                                    borderBottom: "1px solid black",
                                    flexGrow: 1,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>Issue date of Cert.</Text>
                            </View>
                            <View
                                style={{
                                    fontSize: 7,
                                    borderBottom: "1px solid black",
                                    flexGrow: 1,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>Date of receipt of Cert.</Text>
                            </View>
                            <View
                                style={{
                                    fontSize: 7,
                                    flexGrow: 1,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>Sign. for Receipt of Cert.</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default StudentRecordDoc;
