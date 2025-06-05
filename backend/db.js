const queryPromise = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    con.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

app.post("/nodeapp/add_generateresult", async (req, res) => {
    let {
      course,
      batch,
      returndate,
      printdate,
      faculty1,
      faculty2,
      label1,
      label2,
      approved,
      startdate,
      enddate,
      uid,
    } = req.body;

    let sql;
    let param;

    if (uid == undefined) {
      sql =
        "insert into generate_final_result(`Course_Id`,`Batch_Id`,`Result_date`,`Print_date`,`Label1`,`Faculty1`,`Label2`,`Faculty2`,`Approve`,`Start_date`,`End_date`,`IsDelete`) values(?,?,?,?,?,?,?,?,?,?,?,?)";

      param = [
        course,
        batch,
        returndate,
        printdate,
        label1,
        faculty1,
        label2,
        faculty2,
        approved,
        startdate,
        enddate,
        0,
      ];
    } else {
      sql =
        "update `generate_final_result` set `Course_Id` =? , `Batch_Id` =? , `Result_date` =? , `Print_date` =? , `Label1` =? , `Faculty1` =? , `Label2` =? ,`Faculty2` = ?,`Approve` =? ,`Start_date` = ? ,`End_date` = ?  where id = ?";

      param = [
        course,
        batch,
        returndate,
        printdate,
        label1,
        faculty1,
        label2,
        faculty2,
        approved,
        startdate,
        enddate,
        uid,
      ];
    }

    try {
      const data = await new Promise((resolve, reject) => {
        con.query(sql, param, (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });

   
        const GenID = data.insertId;

        // Function to insert data into 'generate_final_child'
        const insertData = (groupedData) => {
          let insertions = Object.values(groupedData).map((student) => {
            const {
              Student_Id,
              Student_Code,
              Student_Name,
              assignmentData,
              testData,
              assignmentAverage,
              testAverage,
              FinalData,
              Final_Avg,
              Viva_Marks,
            } = student;

            const ass_avg = assignmentAverage.toFixed(2);
            const test_avg = testAverage.toFixed(2);
            const finalavg = Final_Avg.toFixed(2);

            const finalper = assignmentAverage + testAverage + Final_Avg;

            const finalpercentage = finalper.toFixed(2);

            // Build the query fields and values for both assignment and test at once
            const queryFields = `Ass1_Given, Ass1_Max, Ass1_Status, Ass2_Given, Ass2_Max, Ass2_Status,
                                                                                                                                                                 Ass3_Given, Ass3_Max, Ass3_Status, Ass4_Given, Ass4_Max, Ass4_Status,
                                                                                                                                                                 Ass5_Given, Ass5_Max, Ass5_Status, Ass6_Given, Ass6_Max, Ass6_Status,
                                                                                                                                                                 Ass7_Given, Ass7_Max, Ass7_Status, Ass8_Given, Ass8_Max, Ass8_Status,
                                                                                                                                                                 Ass9_Given, Ass9_Max, Ass9_Status, Ass10_Given, Ass10_Max, Ass10_Status,
                                                                                                                                                                 Test1_Given, Test1_Max, Test1_Status, Test2_Given, Test2_Max, Test2_Status,
                                                                                                                                                                 Test3_Given, Test3_Max, Test3_Status, Test4_Given, Test4_Max, Test4_Status,
                                    Test5_Given, Test5_Max, Test5_Status, Test6_Given, Test6_Max, Test6_Status,Test7_Given, Test7_Max, Test7_Status, Test8_Given, Test8_Max, Test8_Status,Test9_Given, Test9_Max, Test9_Status, Test10_Given, Test10_Max, Test10_Status,Ass_Percent,Test_Percent,Final1_Given,Final1_Max,           Final1_Status,Final2_Given,Final2_Max,Final2_Status,Final3_Given,Final3_Max,Final3_Status,Final_Percent,Discipline ,            Final_Result_Percent`;

            // Combine both assignment and test data into the same query values array
            const queryValues = [
              assignmentData.Ass1_Given,
              assignmentData.Ass1_Max,
              assignmentData.Ass1_Status,
              assignmentData.Ass2_Given,
              assignmentData.Ass2_Max,
              assignmentData.Ass2_Status,
              assignmentData.Ass3_Given,
              assignmentData.Ass3_Max,
              assignmentData.Ass3_Status,
              assignmentData.Ass4_Given,
              assignmentData.Ass4_Max,
              assignmentData.Ass4_Status,
              assignmentData.Ass5_Given,
              assignmentData.Ass5_Max,
              assignmentData.Ass5_Status,
              assignmentData.Ass6_Given,
              assignmentData.Ass6_Max,
              assignmentData.Ass6_Status,
              assignmentData.Ass7_Given,
              assignmentData.Ass7_Max,
              assignmentData.Ass7_Status,
              assignmentData.Ass8_Given,
              assignmentData.Ass8_Max,
              assignmentData.Ass8_Status,
              assignmentData.Ass9_Given,
              assignmentData.Ass9_Max,
              assignmentData.Ass9_Status,
              assignmentData.Ass10_Given,
              assignmentData.Ass10_Max,
              assignmentData.Ass10_Status,
              testData.Test1_Given,
              testData.Test1_Max,
              testData.Test1_Status,
              testData.Test2_Given,
              testData.Test2_Max,
              testData.Test2_Status,
              testData.Test3_Given,
              testData.Test3_Max,
              testData.Test3_Status,
              testData.Test4_Given,
              testData.Test4_Max,
              testData.Test4_Status,
              testData.Test5_Given,
              testData.Test5_Max,
              testData.Test5_Status,
              testData.Test6_Given,
              testData.Test6_Max,
              testData.Test6_Status,
              testData.Test7_Given,
              testData.Test7_Max,
              testData.Test7_Status,
              testData.Test8_Given,
              testData.Test8_Max,
              testData.Test8_Status,
              testData.Test9_Given,
              testData.Test9_Max,
              testData.Test9_Status,
              testData.Test10_Given,
              testData.Test10_Max,
              testData.Test10_Status,
              ass_avg,
              test_avg,
              FinalData.Final1_Given,
              FinalData.Final1_Max,
              FinalData.Final1_Status,
              FinalData.Final2_Given,
              FinalData.Final2_Max,
              FinalData.Final2_Status,
              FinalData.Final3_Given,
              FinalData.Final3_Max,
              FinalData.Final3_Status,
              finalavg,
              Viva_Marks,
              finalpercentage,
            ];

            // Prepare insert query
            const insertQuery = `INSERT INTO generate_final_child (Gen_id, Batch_Id, Student_Code, Student_Name, ${queryFields}) VALUES (?, ?, ?, ?, ${queryValues.map(() => "?").join(", ")})`;

            return new Promise((resolve, reject) => {
              con.query(
                insertQuery,
                [GenID, batch, Student_Code, Student_Name, ...queryValues],
                (err, childdata) => {
                  if (err) {
                    console.error("Error inserting data:", err);
                    return reject(err);
                  } else {
                    const childid = childdata.insertId;

                    const getattendetail =
                      "SELECT COUNT(*) as total_lecture, SUM(CASE WHEN ltc.Student_Atten = 'Absent' THEN 1 ELSE 0 END) AS total_absent ,SUM(CASE WHEN ltc.Student_Atten = 'Present' THEN 1 ELSE 0 END) AS total_present ,ROUND(SUM(CASE WHEN ltc.Student_Atten = 'Present' THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) as atten_per FROM`lecture_taken_master` as ltm LEFT JOIN Lecture_taken_child as ltc on ltc.Take_Id = ltm.Take_Id WHERE ltc.Student_Id = ? and ltm.Batch_Id = ? and ltm.IsDelete = 0";

                    con.query(getattendetail, [Student_Id, batch], (err, data) => {
                      if (err) {
                        return reject(err);
                      } else {

                        const Total_Lectures = data[0].total_lecture;
                        const AttenLectures = data[0].total_present;
                        const Absents = data[0].total_absent;
                        const Atten_Per = data[0].atten_per;

                        const updateattend =
                          "update `generate_final_child` set Total_Lectures = ?,Full_Attendance = ?,Full_Attend =?,Absents = ?,AttenLectures = ? where id = ?";

                        con.query(
                          updateattend,
                          [
                            Total_Lectures,
                            Atten_Per,
                            Atten_Per,
                            Absents,
                            AttenLectures,
                            childid,
                          ],
                          (err, data) => {if (err) {
                            return reject(err);
                            } else {
                              const getassigndetails =
                                "SELECT COUNT(*) as total_assignment,SUM(CASE WHEN agc.Status = 'Present' THEN 1 ELSE 0 END) AS total_given FROM Assignment_taken as atn LEFT join Assignment_given_child as agc on agc.Given_Id = atn.Given_Id WHERE  atn.Batch_Id = ? AND agc.Student_Id = ? AND atn.IsDelete = 0";

                              con.query(
                                getassigndetails,
                                [batch, Student_Id],
                                (err, assigndata) => {
                                  if (err) {
                                    return reject(err);
                                  } else {
                                    const Total_assignment =
                                      assigndata[0].total_assignment;
                                    const Total_given = assigndata[0].total_given;

                                    const updateassign =
                                      "update `generate_final_child` set Total_Assignments =? ,Given_Assignments =? where id = ?";

                                    con.query(
                                      updateassign,
                                      [Total_assignment, Total_given, childid],
                                      (err, data) => {
                                        if (err) {
                                          return reject(err);
                                        } else {
                                          const gettestdetails =
                                            "SELECT COUNT(*) as total_test,SUM(CASE WHEN ttc.Status = 'Present' THEN 1 ELSE 0 END) AS total_given FROM Test_taken_master as ttm LEFT join Test_taken_child as ttc on ttc.Take_Id = ttm.Take_Id WHERE  ttm.Batch_Id = ? AND ttc.Student_Id = ? AND ttm.IsDelete = 0";

                                          con.query(
                                            gettestdetails,
                                            [batch, Student_Id],
                                            (err, testdata) => {
                                              if (err) {
                                                return reject(err);
                                              } else {
                                                const Total_test =
                                                  testdata[0]
                                                    .total_test;
                                                const Total_given =
                                                  testdata[0]
                                                    .total_given;

                                                const updatetest =
                                                  "update `generate_final_child` set Total_Tests =? ,Given_Tests =? where id = ?";

                                                con.query(
                                                  updatetest,
                                                  [
                                                    Total_test,
                                                    Total_given,
                                                    childid,
                                                  ],
                                                  (err, data) => {
                                                    if (err) return reject(err);
                                                    resolve("Inserted Successfully");
                                                  }
                                                );
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    });
                  }
                }
              );
            });
          });

          return Promise.all(insertions);
        };

        const assignmentQuery = `
        SELECT sm.Student_Id, am.Student_Code, sm.Student_Name, atn.Assign_No, agc.Marks_Given, atn.Marks, agc.Status
        FROM Admission_master as am 
        LEFT JOIN Student_Master as sm ON sm.Student_Id = am.Student_Id
        LEFT JOIN Assignment_given_child as agc ON agc.Student_Id = sm.Student_Id AND agc.isDelete = 0
        LEFT JOIN Assignment_taken as atn ON atn.Given_Id = agc.Given_Id
        WHERE am.Batch_Id = ? AND sm.Status_Id = 8 AND sm.isDelete = 0 AND am.isDelete = 0
      `;
    
      const testQuery = `
        SELECT sm.Student_Id, ttm.Test_No, ttc.Marks_Given as Test_Marks_Given, ttm.Marks as Test_Marks, ttc.Status as Test_Status
        FROM Admission_master as am  
        LEFT JOIN Student_Master as sm ON sm.Student_Id = am.Student_Id
        LEFT JOIN Test_taken_child as ttc ON ttc.Student_Id = sm.Student_Id AND ttc.isDelete = 0
        LEFT JOIN Test_taken_master as ttm ON ttm.Take_Id = ttc.Take_Id AND ttm.isDelete = 0
        WHERE am.Batch_Id = ? AND sm.Status_Id = 8 AND sm.isDelete = 0
      `;
    
      const finalQuery = `
        SELECT sm.Student_Id, fem.Test_No as Final_test_No, etc.Marks_Given as Final_Mark_Given, fem.Marks as Final_Marks, etc.Status as Final_Status, vtc.Marks_Given as Viva_Marks
        FROM Admission_master as am
        LEFT JOIN Student_Master as sm ON sm.Student_Id = am.Student_Id
        LEFT JOIN Exam_taken_child as etc ON etc.Student_Id = sm.Student_Id AND etc.isDelete = 0
        LEFT JOIN Final_exam_master as fem ON fem.Take_Id = etc.Take_Id AND fem.isDelete = 0
        WHERE am.Batch_Id = ? AND sm.Status_Id = 8 AND sm.isDelete = 0
      `;


      const vivaquery =  `SELECT  sm.Student_Id,vtc.Marks_Given as Viva_Marks
        FROM Admission_master as am
        LEFT JOIN Student_Master as as sm ON sm.Student_Id = am.Student_Id
        LEFT JOIN viva_taken_child as vtc ON vtc.Student_Id = sm.Student_Id AND vtc.isDelete = 0
        LEFT JOIN viva_taken as vt ON vt.Take_Id = vtc.Take_Id AND vt.isDelete = 0
        WHERE am.Batch_Id = ? AND sm.Status_Id = 8 AND sm.isDelete = 0`   
    
        const [assignmentData, testData, finalData , vivadata] = await Promise.all([
          queryPromise(assignmentQuery, [batch]),
          queryPromise(testQuery, [batch]),
          queryPromise(finalQuery, [batch]),
          queryPromise(vivaquery, [batch]),
        ]);
    
      const combinedData = {};
    
      // Process assignments
      assignmentData.forEach((row) => {
        const {
          Student_Id = "",
          Student_Code = "",
          Student_Name = "",
          Assign_No = "",
          Marks_Given = 0,
          Marks = 0,
          Status = ""
        } = row;
        
        if (!combinedData[Student_Id]) {
          combinedData[Student_Id] = {
            Student_Id,
            Student_Code,
            Student_Name,
            assignmentData: {},
            testData: {},
            FinalData: {},
            Viva_Marks: 0,
          };
        }
    
        combinedData[Student_Id].assignmentData[`Ass${Assign_No}_Given`] = Marks_Given;
        combinedData[Student_Id].assignmentData[`Ass${Assign_No}_Max`] = Marks;
        combinedData[Student_Id].assignmentData[`Ass${Assign_No}_Status`] = Status;
      });
    
      // Process tests
      testData.forEach((row) => {
        const {
          Student_Id = "",
          Test_No = "",
          Test_Marks_Given = 0,
          Test_Marks = 0,
          Test_Status = ""
        } = row;
        
        if (!combinedData[Student_Id]) {
          combinedData[Student_Id] = {
            Student_Id,
            Student_Code: "",
            Student_Name: "",
            assignmentData: {},
            testData: {},
            FinalData: {},
            Viva_Marks: 0,
          };
        }
    
        combinedData[Student_Id].testData[`Test${Test_No}_Given`] = Test_Marks_Given;
        combinedData[Student_Id].testData[`Test${Test_No}_Max`] = Test_Marks;
        combinedData[Student_Id].testData[`Test${Test_No}_Status`] = Test_Status;
      });
    
      finalData.forEach((row) => {
        const {
          Student_Id = "",
          Final_test_No = "",
          Final_Mark_Given = 0,
          Final_Marks = 0,
          Final_Status = "",
        } = row;
        
        if (!combinedData[Student_Id]) {
          combinedData[Student_Id] = {
            Student_Id,
            Student_Code: "",
            Student_Name: "",
            assignmentData: {},
            testData: {},
            FinalData: {},
            Viva_Marks: 0,
          };
        }
    
        combinedData[Student_Id].FinalData[`Final${Final_test_No}_Given`] = Final_Mark_Given;
        combinedData[Student_Id].FinalData[`Final${Final_test_No}_Max`] = Final_Marks;
        combinedData[Student_Id].FinalData[`Final${Final_test_No}_Status`] = Final_Status;
      });

      vivadata.forEach((row) => {
        const {
          Student_Id = "",
          Viva_Marks = 0
        } = row;
        
        if (!combinedData[Student_Id]) {
          combinedData[Student_Id] = {
            Student_Id,
            Student_Code: "",
            Student_Name: "",
            assignmentData: {},
            testData: {},
            FinalData: {},
            Viva_Marks: 0,
          };
        }
    
        combinedData[Student_Id].Viva_Marks = Viva_Marks || 0;
      });
    
      // Calculate Averages
      Object.keys(combinedData).forEach((studentId) => {
        const student = combinedData[studentId];
    
        // Assignment Avg
        let assignGiven = 0,
          assignMax = 0;
        for (let i = 1; i <= 10; i++) {
          const g = student.assignmentData[`Ass${i}_Given`] || 0;
          const m = student.assignmentData[`Ass${i}_Max`] || 0;
          if (g > 0 && m > 0) {
            assignGiven += g;
            assignMax += m;
          }
        }
        student.assignmentAverage = assignMax > 0 ? (assignGiven / assignMax) * 15 : 0;
    
        // Test Avg
        let testGiven = 0,
          testMax = 0;
        for (let i = 1; i <= 10; i++) {
          const g = student.testData[`Test${i}_Given`] || 0;
          const m = student.testData[`Test${i}_Max`] || 0;
          if (g > 0 && m > 0) {
            testGiven += g;
            testMax += m;
          }
        }
        student.testAverage = testMax > 0 ? (testGiven / testMax) * 35 : 0;
    
        // Final Avg
        let finalGiven = 0,
          finalMax = 0;
        for (let i = 1; i <= 3; i++) {
          const g = student.FinalData[`Final${i}_Given`] || 0;
          const m = student.FinalData[`Final${i}_Max`] || 0;
          if (g > 0 && m > 0) {
            finalGiven += g;
            finalMax += m;
          }
        }
        student.Final_Avg = finalMax > 0 ? (finalGiven / finalMax) * 50 : 0;
      });
    
      // Insert all students' processed data
      await insertData(combinedData);
    
      res.json("Data Inserted Successfully");
      
      
    } catch (err) {
      console.error("Error in add_generateresult:", err);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
    

});