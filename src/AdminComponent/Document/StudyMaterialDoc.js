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
    footer: {
        position: "absolute",
        bottom: 10, // Adjust the spacing as needed
        left: "30px",
        right: 0,
        textAlign: "left",
        fontSize: 8,
        color: "black",
        fontWeight: "800",
    },
});

const StudyMaterialDoc = (props) => {
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
                    <Text>STUDY MATERIAL ISSUE RECORD</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <View>
                            <Text>Training Programme :</Text>
                        </View>
                        <View>
                            <Text>Electrical System Design</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            maxWidth: "200px",
                            width: "100%",

                            gap: 20,
                        }}
                    >
                        <View>
                            <Text>Batch Code :</Text>
                        </View>
                        <View>
                            <Text>9065</Text>
                        </View>
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
                        }}
                    >
                        <View
                            style={[
                                styles.cel,
                                {
                                    width: "3%",
                                },
                            ]}
                        >
                            <Text style={{}}>Sr. No.</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    width: "27%",
                                },
                            ]}
                        >
                            <Text style={{}}>Name</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    width: "10%",
                                },
                            ]}
                        >
                            <Text style={{ textAlign: "center" }}>Date of {"\n"}Admission</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    width: "10%",
                                },
                            ]}
                        >
                            <Text style={{ textAlign: "center" }}>Fees{"\n"}Completed</Text>
                        </View>
                        <View
                            style={{
                                // borderRight: "1px solid black",

                                width: "50%",
                                flexDirection: "column",
                            }}
                        >
                            <View
                                style={{
                                    borderBottom: "1px solid black",
                                    paddingVertical: 3,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{}}>Study Material</Text>
                            </View>
                            <View style={{ borderBottom: "1px solid black", display: "flex", flexDirection: "row" }}>
                                {Array.from({ length: 5 }, (_, index) => index + 1).map((index) => (
                                    <View
                                        key={index}
                                        style={{
                                            ...(index !== 5 ? { borderRight: "1px solid black" } : {}),
                                            width: 78,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: 1,
                                            minHeight: 16,
                                        }}
                                    >
                                        <Text style={{}}></Text>
                                    </View>
                                ))}
                            </View>
                            <View
                                style={{
                                    borderBottom: "1px solid black",
                                    paddingVertical: 3,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{}}>Date of Issue</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                {Array.from({ length: 5 }, (_, index) => index + 1).map((index) => (
                                    <View
                                        key={index}
                                        style={{
                                            ...(index !== 5 ? { borderRight: "1px solid black" } : {}),
                                            width: 78,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 1,
                                            minHeight: 16,
                                        }}
                                    >
                                        <Text style={{}}></Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            borderBottom: "1px solid black",
                        }}
                    >
                        <View
                            style={[
                                styles.cel,
                                {
                                    width: "3%",
                                },
                            ]}
                        >
                            <Text style={{}}>1</Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                padding: 5,
                                width: "27%",
                            }}
                        >
                            <Text style={{}}>Aditya Jagdish Borade</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    width: "10%",
                                },
                            ]}
                        >
                            <Text style={{ textAlign: "center" }}>24-Dec-24</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    width: "10%",
                                },
                            ]}
                        >
                            <Text style={{}}>Yes</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", width: "50%" }}>
                            {Array.from({ length: 5 }, (_, index) => index + 1).map((index) => (
                                <View
                                    key={index}
                                    style={{
                                        ...(index !== 5 ? { borderRight: "1px solid black" } : {}),
                                        width: 78,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 1,
                                        minHeight: 16,
                                    }}
                                >
                                    <Text style={{}}></Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.footer} fixed>
                    <Text>F/TD/04/00</Text>
                </View>
            </Page>
        </Document>
    );
};

export default StudyMaterialDoc;
