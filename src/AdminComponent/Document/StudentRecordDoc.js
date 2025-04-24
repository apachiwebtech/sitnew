import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 10 },
    cel: {
        borderRight: "1px solid black",
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
});
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

function formatdate(newdate) {
    if (!newdate) return ''; // Handle null or undefined values gracefully

    const date = new Date(newdate);
    if (isNaN(date.getTime())) return ''; // Handle invalid dates

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    // Function to get ordinal suffix
    function getOrdinalSuffix(n) {
        if (n > 3 && n < 21) return 'th'; // Covers 11th to 13th
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const dayWithSuffix = String(day).padStart(2, '0') + getOrdinalSuffix(day);

    return `${dayWithSuffix} ${month}-${year}`;
}

Font.register({
        family: 'Poppins',
        fonts: [
            {
                src: '/fonts/Poppins-Regular.ttf',
                fontWeight: 'normal',
            },
            {
                src: '/fonts/Poppins-SemiBold.ttf',
                fontWeight: 600,
            },
            {
                src: '/fonts/Poppins-Bold.ttf',
                fontWeight: 'bold',
            },
        ],
    });

const StudentRecordDoc = ({studentAllInfo}) => {
    console.log(studentAllInfo)
    const data = studentAllInfo
    const headerdata = data[0]
    return (
        <Document>
            {chunkArray(data, 5).map((chunk, pageIndex) => (
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
                <View style={{ textAlign: "center", padding: "5px", border: "1.5px solid black", marginBottom: "3px" }}>
                    <Text style={{fontFamily: 'Poppins',
                                        fontWeight: 600,}}>STUDENT RECORD</Text>
                </View>
                <View
                    style={{
                        padding: "5px",
                        border: "1.5px solid black",
                        flexDirection: "row",
                        gap: 70,
                        marginBottom: "6px",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            gap: "5px",
                        }}
                    >
                        <Text style={{fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Training Programme:</Text>
                        <Text>{headerdata.Course_Name}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: "5px",
                        }}
                    >
                        <Text style={{fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Batch No.:</Text>
                        <Text>{headerdata.Batch_code}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: "5px",
                        }}
                    >
                        <Text style={{fontFamily: 'Poppins',
                                        fontWeight: 600,}}>From:</Text>
                        <Text>{headerdata.SDate? formatdate(headerdata.SDate) : ""}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: "5px",
                        }}
                    >
                        <Text style={{fontFamily: 'Poppins',
                                        fontWeight: 600,}}>To:</Text>
                        <Text>{headerdata.EDate? formatdate(headerdata.EDate) : ""}</Text>
                    </View>
                </View>
                <View
                    style={{
                        width:"100%",
                        height:"80%",
                        display: "flex",
                        flexDirection: "column",
                        border: "2px solid black",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            borderBottom: "2px solid black",
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
                            <Text style={{fontSize: 8,fontFamily: 'Poppins',
                                        fontWeight: 600,}}>ID No.</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 6,
                                },
                            ]}
                        >
                            <Text style={{fontSize: 8,fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Name and Address</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 2,
                                },
                            ]}
                        >
                            <Text style={{fontSize: 8,fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Qualification</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 3,
                                },
                            ]}
                        >
                            <Text style={{fontSize: 8,fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Contact Detail</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 2.5,
                                },
                            ]}
                        >
                            <Text style={{fontSize: 8,fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Company</Text>
                        </View>
                        <View
                            style={[
                                styles.cel,
                                {
                                    flexGrow: 1,
                                },
                            ]}
                        >
                            <Text style={{fontSize: 8,fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Exp.</Text>
                        </View>
                        <View style={{ padding: 5, flexGrow: 3, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{fontSize: 8,fontFamily: 'Poppins',
                                        fontWeight: 600,}}>Other Details</Text>
                        </View>
                    </View>
                    {chunk.map((item, idx) => (
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
                                width: "5.25%",
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
                                {item.Student_Code}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "27.86%",
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
                                <Text style={{}}>{item.Student_Name}</Text>
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
                                    {item.Present_Address}
                                </Text>
                            </View>
                            <View style={{ flexGrow: 1, justifyContent: "center", padding: 2 }}>
                                <Text style={{}}>{item.Email}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "13.94%",
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
                                <Text style={{}}>{item.Qualification}</Text>
                            </View>
                            <View
                                style={{
                                    padding: 2,
                                    textAlign: "center",
                                }}
                            >
                                <Text style={{}}>{item.Discipline}</Text>
                            </View>
                            <View
                                style={{
                                    padding: 2,
                                    textAlign: "center",
                                }}
                            >
                                <Text style={{}}>{item.PassingYear}</Text>
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
                                <Text style={{}}>{"(M)  "}{item.Present_Mobile}</Text>
                            </View>
                            <View
                                style={{
                                    flexGrow: 1,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{}}>{"(DOB) "}{item.DOB}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "13.35%",
                            }}
                        >
                            <Text style={{textAlign:"center"}}>{item.Company}</Text>
                        </View>
                        <View
                            style={{
                                borderRight: "1px solid black",
                                width: "6.30%",
                            }}
                        >
                            <Text style={{textAlign:"center"}}>{item.Duration}</Text>
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
                    ))}
                </View>
            </Page>
            ))}
        </Document>
    );
};

export default StudentRecordDoc;
