app.post('/nodeapp/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
  
    const sql = "select * from awt_adminuser where email = ? and password = ? and role = ? and deleted = 0"
  
    con.query(sql, [email, password, role], (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        if (data.length > 0) {
          const id = data[0].id;
          req.session.id = id
          console.log(req.session.id)
          return res.json({ data, id: req.session.id, id: id })
        }
  
  
      }
    })
  })
  
  
  app.get('/nodeapp/checkauth', (req, res) => {
    if (req.session.id) {
      return res.json({ valid: true, id: req.session.id })
    } else {
      return res.json({ valid: false })
    }
  })
  
  app.post('/nodeapp/add_data', (req, res) => {
    let title = req.body.title;
    let created_date = new Date()
    let uid = req.body.uid
    let user_id = req.body.user_id
    let tablename = req.body.tablename;
  
  
    let sql;
    let param;
    if (uid == undefined) {
      sql = `insert into ${tablename} (title,created_by,created_date) values(?,?,?)`
      param = [title, user_id, created_date]
    } else {
  
      sql = `update ${tablename} set title = ?, updated_by = ?, updated_date = ? where id =?`;
      param = [title, user_id, created_date, uid]
    }
  
    con.query(sql, param, (err, data) => {
      console.log(sql)
      if (err) {
        return res.json(err)
      }
      else {
        return res.json("Data Added Successfully!")
      }
  
  
    })
  })
  
  app.post('/nodeapp/update_data', (req, res) => {
  
    let u_id = req.body.u_id;
    let tablename = req.body.tablename;
  
  
    const sql = `select * from ${tablename} where id = ?`
  
    con.query(sql, [u_id], (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  
  })
  
  
  app.post('/nodeapp/get_data', (req, res) => {
  
    let tablename = req.body.tablename;
  
    const sql = `select * from ${tablename} where deleted = 0 `
  
    con.query(sql, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  
  })
  app.post('/nodeapp/delete_data', (req, res) => {
  
    let cat_id = req.body.cat_id;
    let tablename = req.body.tablename;
  
    const sql = `update ${tablename} set deleted = 1 where id = ?`
  
    con.query(sql, [cat_id], (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  
  })
  
  
  app.get('/nodeapp/vendor_details', (req, res) => {
  
  
  
    const sql = `select * from awt_vendor_master where deleted = 0 `
  
    con.query(sql, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  
  })
  
  
  app.post('/nodeapp/add_vendor', (req, res) => {
  
    let { vendorname, email, telephone, type, address, country, state, city, pin, contactperson, mobile, fax, comments, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_vendor_master(`vendorname`,`email`,`telephone`,`type`,`address`,`country`,`state`,`city`,`pin`,`contactperson`,`mobile`,`fax`,`comment`) values(?,?,?,?,?,?,?,?,?,?,?,?,?)"
  
      param = [vendorname, email, telephone, type, address, country, state, city, pin, contactperson, mobile, fax, comments]
  
    } else {
      sql = "update `awt_vendor_master` set `vendorname` =? , `email` =? , `telephone` =? , `type` =? , `address` =? , `country` =? , `state` =? , `city` =? , `pin` =? , `contactperson` =? , `mobile` =? , `fax` =? , `comments` =? where id =?"
  
      param = [vendorname, email, telephone, type, address, country, state, city, pin, contactperson, mobile, fax, comments, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  
  })
  
  
  app.post('/nodeapp/add_course', (req, res) => {
    let { course, course_code, eligibility, introduction, specification, specification2, specification3, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_course(`course`,`course_code`,`eligibility`,`introduction`,`key_points`,`objective`,`basic_study`) values(?,?,?,?,?,?,?)"
  
      param = [course, course_code, eligibility, introduction, specification, specification2, specification3]
    }
  
    else {
      sql = "update `awt_course` set `course` =? , `course_code` =? , `eligibility` =? , `introducation` =? , `key_points` =? , `objective` =? , `basic_study` =?  where `id` =?"
  
      param = [course, course_code, eligibility, introduction, specification, specification2, specification3, uid]
  
    }
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  
  })
  
  app.post('/nodeapp/batch_category', (req, res) => {
  
    let { batch, batchtype, prefix, description, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_batch_category(`batch`,`batchtype`,`prefix`,`description`) values(?,?,?,?)"
  
      param = [batch, batchtype, prefix, description]
  
    } else {
      sql = "update `awt_batch_category` set `batch` = ? , `batchtype` = ? , `prefix` = ? , `description` = ? where id =?"
  
      param = [batch, batchtype, prefix, description, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_college', (req, res) => {
  
    let { college_name, university, contact_person, designation, address, city, pin, country, state, telephone, mobile, email, website, remark, purpose, course, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_college(`college_name`,`university`,`contact_person`,`designation`,`address`,`city`,`pin`,`country`,`state`,`telephone`,`mobile`,`email`,`website`,`remark`,`purpose`,`course`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  
      param = [college_name, university, contact_person, designation, address, city, pin, country, state, telephone, mobile, email, website, remark, purpose, course]
  
    } else {
      sql = "update `awt_college` set `college_name` =? , `university` =? , `contact_person` =? , `designation` =? , `address` =? , `city` =? , `pin` =? , `country` =? , `state` =? , `telephone` =? , `mobile` =? , `email` =? , `website` =? , `remark` =? , `purpose` =? , `course` =?  where id =?"
  
      param = [college_name, university, contact_person, designation, address, city, pin, country, state, telephone, mobile, email, website, remark, purpose, course, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_librarybook', (req, res) => {
  
    let { bookname, booknumber, publication, page, status, comment, coursename, author, purchasedate, price, rackno, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_librarybook(`bookname`,`booknumber`,`publication`,`page`,`status`,`comment`,`coursename`,`author`,`purchasedate`,`price`,`rackno`) values(?,?,?,?,?,?,?,?,?,?,?)"
  
      param = [bookname, booknumber, publication, page, status, comment, coursename, author, purchasedate, price, rackno]
  
    } else {
      sql = "update `awt_librarybook` set `bookname` =? , `booknumber` =? , `publication` =? , `page` =? , `status` =? , `comment` =? , `coursename` =? , `author` =? , `purchasedate` =? , `price` =? , `rackno` = ? where id = ?"
  
      param = [bookname, booknumber, publication, page, status, comment, coursename, author, purchasedate, price, rackno, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  app.post('/nodeapp/add_feedback', (req, res) => {
  
    let { questionfor, category, question, selection, order, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_feedback(`questionfor`,`category`,`question`,`selection`,`order`) values(?,?,?,?,?)"
  
      param = [questionfor, category, question, selection, order]
  
    } else {
      sql = "update `awt_feedback` set `questionfor` =? , `category` =? , `question` =? , `selection` =? , `order` =? where id = ?"
  
      param = [questionfor, category, question, selection, order, uid]
  
    }
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  
  app.post('/nodeapp/add_faculty', (req, res) => {
  
  
    let { facultyname, facultycode, dob, nationality, discipline, status, invoicename, maritalstatus, joiningdate, employment, software, training, address, city, pin, state, country, mobile, email, full_address, city_name, pin_code, state_name, country_name, mobi, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_faculty(`facultyname`,`facultycode`,`dob`,`nationality`,`discipline`,`status`,`invoicename`,`maritalstatus`,`joiningdate`,`employment`,`software`,`training`,`address`,`city`,`pin`,`state`,`country`,`mobile`,`email`,`full_address`,`city_name`,`pin_code`,`state_name`,`country_name`,`mobi`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  
      param = [facultyname, facultycode, dob, nationality, discipline, status, invoicename, maritalstatus, joiningdate, employment, software, training, address, city, pin, state, country, mobile, email, full_address, city_name, pin_code, state_name, country_name, mobi]
  
    } else {
      sql = "update `awt_faculty` set `facultyname` =? , `facultycode` =? , `dob` =? , `nationality` =? , `discipline` =? , `status` =? , `invoicename` =? , `maritalstatus` =? , `joiningdate` =? , `employment` =? , `software` =? , `training` =? , `address` =? , `city` =? , `pin` =? , `state` =? , `country` =? , `mobile` =? , `email` =? , `full_address` =? , `city_name` =? , `pin_code` =? , `state_name` =? , `country_name` =? , `mobi` =? where id = ?"
  
      param = [facultyname, facultycode, dob, nationality, discipline, status, invoicename, maritalstatus, joiningdate, employment, software, training, address, city, pin, state, country, mobile, email, full_address, city_name, pin_code, state_name, country_name, mobi, uid]
  
    }
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_annual', (req, res) => {
  
    let { selectcourse, category, description, training, actualdate, timings, coursename, batchcode, planned, admission, duration, coordinator, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_annual(`selectcourse`,`category`,`description`,`training`,`actualdate`,`timings`,`coursename`,`batchcode`,`planned`,`admission`,`duration`,`coordinator`) values(?,?,?,?,?,?,?,?,?,?,?,?)"
  
      param = [selectcourse, category, description, training, actualdate, timings, coursename, batchcode, planned, admission, duration, coordinator]
  
    } else {
      sql = "update `awt_annual` set `selectcourse` =? , `category` =? , `description` =? ,`training` =? ,`actualdate` =? ,`timings` =? ,`coursename` =? ,`batchcode` =? ,`planned` =? ,`admission` =? ,`duration` =? ,`coordinator` =? where id = ?"
  
      param = [selectcourse, category, description, training, actualdate, timings, coursename, batchcode, planned, admission, duration, coordinator, uid]
  
    }
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_bookissue', (req, res) => {
  
    let { student, book, bookcode, issuedate, returndate, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_bookissue(`student`,`book`,`bookcode`,`issuedate`,`returndate`) values(?,?,?,?,?)"
  
      param = [student, book, bookcode, issuedate, returndate]
  
    } else {
      sql = "update `awt_bookissue` set `student` =? , `book` =? , `bookcode` =? ,`issuedate` =? ,`returndate` =? where id = ?"
  
      param = [student, book, bookcode, issuedate, returndate, uid]
  
    }
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  
  app.post('/nodeapp/add_employeerecord', (req, res) => {
  
  
    let { training, attendee, instructor, description, feedback, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_employeerecord(`training`,`attendee`,`instructor`,`description`,`feedback`) values(?,?,?,?,?)"
  
      param = [training, attendee, instructor, description, feedback]
  
    } else {
      sql = "update `awt_employeerecord` set `training` =? , `attendee` =? , `instructor` =? ,`description` =? , `feedback` =? where id = ?"
  
      param = [training, attendee, instructor, description, feedback, uid]
  
    }
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.get('/nodeapp/getadmissionactivity', (req, res, next) => {
    const sql = 'SELECT i.Inquiry_Id as id,i.Student_Id,i.FName, i.LName, i.MName,i.Student_Name,i.Course_Id,i.Qualification, i.discussion, i.present_mobile, i.Email, i.Discipline, i.Inquiry_type, i.isActive, i.inquiry_DT, c.course, i.Percentage FROM Student_Inquiry AS i LEFT JOIN awt_course AS c ON i.Course_id = c.id WHERE i.isDelete = 0';
    con.query(sql, (error, data) => {
      if (error) {
        return res.json(error);
      } else {
        return res.json(data);
      }
    })
  })
  app.post('/nodeapp/studentDetail', (req, res, next) => {
  
    const { id } = req.body;
  
    const sql = 'SELECT i.Inquiry_Id as id,i.Student_Id,i.FName, i.LName, i.MName,i.Sex,i.DOB,i.Student_Name,i.Course_Id,i.Qualification, i.discussion, i.present_mobile, i.Nationality, i.Email, i.Discipline, i.Inquiry_type, i.isActive, i.inquiry_DT,i.Percentage, c.course FROM Student_Inquiry AS i LEFT JOIN awt_course AS c ON i.Course_id = c.id  WHERE i.Inquiry_Id = ?';
  
    con.query(sql, [id], (error, data) => {
      if (error) {
        res.status(500).json(error);
        return
      }
  
      return res.json(data);
    })
  })
  app.get('/nodeapp/getEducation', (req, res, next) => {
    const sql = 'SELECT * FROM MST_Education';
  
    con.query(sql, (error, data) => {
      if (error) {
        return res.json(error);
      } else {
        return res.json(data);
      }
    })
  })
  app.get('/nodeapp/getDiscipline', (req, res, next) => {
    const sql = 'SELECT * FROM MST_Deciplin';
  
    con.query(sql, (error, data) => {
      if (error) {
        return res.json(error);
      } else {
        return res.json(data);
      }
    })
  })
  
  app.get('/nodeapp/getCourses', (req, res, next) => {
    const sql = 'SELECT Course_Id, Course_Name FROM Course_Mst';
  
    con.query(sql, (error, data) => {
      if (error) {
        return res.json(error);
      } else {
        return res.json(data);
      }
    })
  })
  
  // app.post('/postInquiry', (req, res, next)=>{
  //   const {firstname,email, gender, dob, mobile, InquiryDate, modeEnquiry, advert, programmeEnquired, selectedProgramme,category, batch, qualification, descipline, percentage } = req.body;
  
  //   console.log(firstname, gender, dob, mobile, InquiryDate, modeEnquiry, advert, programmeEnquired, selectedProgramme,category, batch, qualification, descipline, percentage);
  
  //   const check = 'SELECT * FROM Student_Master WHERE Email = ?';
  
  //   const insertIntoInquiry = 'INSERT INTO Student_Inquiry (Student_Id, Email,FName, Student_Name, Sex, DOB, Present_Mobile,Inquiry_DT, Inquiry_type, Qualification, Discipline, Percentage ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
  
  //   const insertIntoStudent = 'INSERT INTO Student_Master (Email, FName, Student_Name, Sex, DOB, Present_Mobile,Inquiry_DT, Inquiry_type, Qualification, Discipline, Percentage ) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  
  
  //   con.query(check, [email], (error, data)=>{
  //     if(error){
  //       res.status(500).json({ error: 'Check Error' });
  //       return;   
  //      }
  
  //      if(data.length > 0){
  //       const studentID = data[0].Student_Id;
  //       con.query(insertIntoInquiry, [studentID,email,firstname, firstname, gender, dob, mobile, InquiryDate, modeEnquiry, qualification, descipline, percentage], (error, data)=>{
  //         if(error){
  //           res.status(500).json({ error: 'Internal Server Error' });
  //           return;
  //         }
  //         res.status(200).json({ message: 'Data added to inquiry table.' });
  //       })
  //      }else{
  //       con.query(insertIntoStudent, [email, firstname, firstname, gender, dob, mobile, InquiryDate, modeEnquiry, qualification, descipline, percentage], (error, data)=>{
  //         if(error){
  //           res.status(500).json({ error: 'Internal Server Error' });
  //           return;
  //         }
  //         const student_Id = data.insertId
  //         insertInquiry(student_Id)
  
  //       })
  //      }
  //   })
  //   function insertInquiry(studentID) {
  //     con.query(insertIntoInquiry, [studentID, firstname, firstname, gender, dob, mobile, InquiryDate, modeEnquiry, qualification, descipline, percentage], (error, data) => {
  //       if (error) {
  //         res.status(500).json({ error: 'Internal Server Error' });
  //         return;
  //       }
  //       res.status(200).json({ message: 'Data added to both tables.' });
  //     });
  //   }
  
  // })
  app.post('/nodeapp/postInquiry', (req, res, next) => {
  
    const { firstname, email, gender, dob, mobile, InquiryDate, modeEnquiry, advert, programmeEnquired, selectedProgramme, category, batch, qualification, descipline, percentage } = req.body;
  
  
    console.log(firstname, gender, dob, mobile, InquiryDate, modeEnquiry, advert, programmeEnquired, selectedProgramme, category, batch, qualification, descipline, percentage);
  
    const check = 'SELECT * FROM Student_Master WHERE Email = ?';
  
    const insertIntoInquiry = 'INSERT INTO Student_Inquiry (Student_Id, Email,FName, Student_Name, Sex, DOB, Father_mobile,Inquiry_DT, Inquiry_type, Qualification, Discipline, Percentage, Course_Id ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
  
    const insertIntoStudent = 'INSERT INTO Student_Master (Email, FName, Student_Name, Sex, DOB, Present_Mobile,Inquiry_DT, Inquiry_type, Qualification, Discipline, Percentage,Course_Id ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
  
    con.query(check, [email], (error, data) => {
      if (error) {
        res.status(500).json({ error: 'Check Error' });
        return;
      }
  
      if (data.length > 0) {
        const studentID = data[0].Student_Id;
        con.query(insertIntoInquiry, [studentID, email, firstname, firstname, gender, dob, mobile, InquiryDate, modeEnquiry, qualification, descipline, percentage, selectedProgramme], (error, data) => {
          if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json({ message: 'Data added to inquiry table.' });
        })
      } else {
        con.query(insertIntoStudent, [email, firstname, firstname, gender, dob, mobile, InquiryDate, modeEnquiry, qualification, descipline, percentage, selectedProgramme], (error, data) => {
          if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          const student_Id = data.insertId
          insertInquiry(student_Id)
  
        })
      }
    })
    function insertInquiry(studentID) {
      con.query(insertIntoInquiry, [studentID, firstname, firstname, gender, dob, mobile, InquiryDate, modeEnquiry, qualification, descipline, percentage], (error, data) => {
        if (error) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.status(200).json({ message: 'Data added to both tables.' });
      });
    }
  
  })
  
  app.post('/nodeapp/updateInquiry', (req, res, next) => {
  
    const { Enquiry_Id, firstname, email, gender, dob, mobile, InquiryDate, modeEnquiry, advert, programmeEnquired, selectedProgramme, category, batch, qualification, descipline, percentage, discussion } = req.body;
  
  
    const sql = 'UPDATE Student_Inquiry SET FName = ?, Student_Name = ?, Email = ?, Sex = ?, DOB = ?, Present_Mobile = ?, Inquiry_Dt = ?, Inquiry_type =?, Course_Id = ?, Qualification = ?, Discipline = ?, Percentage = ? , Discussion = ? WHERE Inquiry_Id = ?';
  
    con.query(sql, [firstname, firstname, email, gender, dob, mobile, InquiryDate, modeEnquiry, selectedProgramme, qualification, descipline, percentage, discussion, Enquiry_Id], (error, data) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
  
      return res.status(200).json(data);
    })
  
  })
  
  app.post('/nodeapp/deleteInquiry', (req, res, next) => {
    const { Inquiry_Id } = req.body;
  
    const sql = 'UPDATE Student_Inquiry SET isDelete = 1 WHERE Inquiry_Id = ?';
  
    con.query(sql, [Inquiry_Id], (error, data) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
      return res.status(200).json({
        message: "Record Deleted.",
      })
    })
  })
  
  app.get('/nodeapp/getStudents', (req, res, next) => {
    const sql = 'SELECT Student_Id,Batch_Code, Student_Name, Present_Address, Email, Present_Mobile, Qualification, IsActive FROM Student_Master  WHERE IsDelete = 0';
  
    con.query(sql, (error, data) => {
      if (error) {
        res.status(500).json({
          message: "Cannot get Students data.",
        })
        return;
      }
  
      return res.status(200).json(data);
    })
  })
  
  app.get('/nodeapp/getCorporate', (req, res, next) => {
    const sql = 'SELECT co.Id, co.FullName,co.email,c.Course_Name FROM CorporateInquiry as co LEFT JOIN Course_Mst AS c ON co.Course_Id = c.Course_Id WHERE co.IsDelete = 0';
  
    con.query(sql, (error, data) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
  
      return res.status(200).json(data);
    })
  })
  
  app.get('/nodeapp/getBtach', (req, res, next) => {
    const sql = 'SELECT Batch_Id, Course_Id, Batch_code, Batch_Category_id  FROM Batch_Mst WHERE isDelete = 0 AND isActive = 1';
  
    con.query(sql, (error, data) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
  
      return res.status(200).json(data);
    })
  })
  app.get('/nodeapp/getBtachCategory', (req, res, next) => {
    const sql = 'SELECT BatchCategory,id  FROM MST_BatchCategory WHERE isDelete = 0 AND isActive = 1';
  
    con.query(sql, (error, data) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
  
      return res.status(200).json(data);
    })
  })
  
  app.post(`/nodeapp/data_status`, (req, res) => {
    let status = req.body.status;
    let Inquiry_Id = req.body.Inquiry_Id;
    let table_name = req.body.table_name
    const sql = `update ${table_name} set isActive = ? where Inquiry_Id = ?`
  
    con.query(sql, [status, Inquiry_Id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  
  app.post(`/nodeapp/data_Corporate_status`, (req, res) => {
    let status = req.body.status;
    let Inquiry_Id = req.body.Inquiry_Id;
    let table_name = req.body.table_name
  
    const sql = `update ${table_name} set isActive = ? where Id = ?`
  
    con.query(sql, [status, Inquiry_Id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  
  app.post(`/nodeapp/getcompanyinfo`, (req, res) => {
    let student_id = req.body.student_id;
  
    const sql = "select * from `Company_info` where Student_id = ?"
  
    con.query(sql, [student_id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  app.post(`/nodeapp/getdiscussion`, (req, res) => {
    let student_id = req.body.student_id;
  
    const sql = "select * from `Discussion` where Student_id = ?"
  
    con.query(sql, [student_id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  app.post(`/nodeapp/getdocuments`, (req, res) => {
    let student_id = req.body.student_id;
  
    const sql = "select * from `Documents` where Student_id = ?"
  
    con.query(sql, [student_id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  app.post(`/nodeapp/getcorporateinquiry`, (req, res) => {
  
  
    const sql = "select * from `CorporateInquiry` where IsDelete = 0 "
  
    con.query(sql, (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  app.post(`/nodeapp/getcorporateinquiryform`, (req, res) => {
    let id = req.body.id
  
    const sql = "select * from `CorporateInquiry` where Id = ? "
  
    con.query(sql, [id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  
  app.post(`/nodeapp/add_companyinfo`, (req, res) => {
    let Company = req.body.Company
    let BussinessNature = req.body.BussinessNature
    let Designation = req.body.Designation
    let Duration = req.body.Duration
    let student_id = req.body.student_id;
  
    const sql = "insert into Company_info(`Company`,`BussinessNature`,`Designation`,`Duration`,`student_id`) values(?,?,?,?,?)"
  
    con.query(sql, [Company, BussinessNature, Designation, Duration, student_id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  
  app.post(`/nodeapp/upload_doc`, upload.single("image"), (req, res) => {
    let imagepath = req.file.filename;
    let doc_name = req.body.doc_name;
    let student_id = req.body.student_id;
  
    const sql = "insert into Documents(`upload_image`,`doc_name` ,`Student_id`) values(?,?,?)"
  
    con.query(sql, [imagepath, doc_name, student_id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  
  app.post('/nodeapp/updateStudent', (req, res, next) => {
  
    const { Student_Id, firstname, email, gender, dob, mobile, InquiryDate, modeEnquiry, advert, programmeEnquired, selectedProgramme, category, batch, qualification, descipline, percentage, address, pincode, city, state, permanentPincode, permanentAdress, permanentCity, permanentState, permanentCountry } = req.body;
  
    const sql = 'UPDATE Student_Master SET FName = ?, Student_Name = ?, Email = ?, Sex = ?, DOB = ?, Present_Mobile = ?, Inquiry_Dt = ?, Inquiry_type =?, Course_Id = ?, Qualification = ?, Discipline = ?, Percentage = ? WHERE Inquiry_Id = ?';
  
    con.query(sql, [firstname, firstname, email, gender, dob, mobile, InquiryDate, modeEnquiry, selectedProgramme, qualification, descipline, percentage, Student_Id], (error, data) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
  
      return res.status(200).json(data);
    })
  
  })
  
  app.post('/nodeapp/getPersonal', (req, res, next) => {
    const { admissionid } = req.body;
  
    const sql = 'SELECT * FROM Student_Master WHERE Student_Id = ?';
  
    con.query(sql, [admissionid], (error, data) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
      return res.status(200).json(data);
    })
  })
  
  app.post('/nodeapp/postCorporateInquiry', (req, res, next) => {
    const { firstname, lastname, middilename, Mobile, Phone, Email, CompanyName, Designation, Country, Address, Pin, City, State, Place, id } = req.body;
  
    const sql = 'update `CorporateInquiry` set Fname = ? , Lname=? , MName = ? ,CompanyName = ? ,Address = ? ,City =? ,State =? ,Country = ?,Pin = ? ,Mobile = ?,Email = ?,Place = ? where Id = ?  ';
  
    con.query(sql, [firstname, lastname, middilename, CompanyName, Address, City, State, Country, Pin, Mobile, Email, Place, id], (error, data) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
      return res.status(200).json(data);
    })
  })
  
  app.post('/nodeapp/postqualification', (req, res, next) => {
    const {
      studentId,
      qualification,
      descipline,
      college,
      uni,
      passYear,
      grade,
      status,
      kt,
      remark,
    } = req.body
  
    const sql = 'INSERT INTO Student_Master (Qualification, Descipline, college_id) VALUES(?,?,?)'
  
    con.query(sql, [studentId, qualification, descipline, college, uni, passYear, grade, status, kt, remark,], (error, data) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
  
      return res.status(200).json({
        message: 'Qualifications Added.',
        data: data,
      });
    })
  })
  
  // ==============================Lecture takene
  
  app.post('/nodeapp/add_lecturetaken', (req, res) => {
  
    let { course, batch, lecture, classroom, lecturedate, assignmentdate, enddate, materialissued, material, assignmentgive, assignment, testgiven, test, topicdescuss, nextplanning, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_lecturetaken(`course`,`batch`,`lecture`,`classroom`,`lecturedate`,`assignmentdate`,`enddate`,`materialissued`,`material`,`assignmentgive`,`assignment`,`testgiven`,`test`,`topicdescuss`,`nextplanning`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  
      param = [course, batch, lecture, classroom, lecturedate, assignmentdate, enddate, materialissued, material, assignmentgive, assignment, testgiven, test, topicdescuss, nextplanning]
  
    } else {
      sql = "update `awt_lecturetaken` set `course` =? , `batch` =? , `lecture` =? , `classroom` =? , `lecturedate` =? , `assignmentdate` =? , `enddate` =? , `materialissued` =? , `material` =? , `assignmentgiven` =? , `assignment` =? , `testgiven` =? , `test` =? , `topicdescuss` =? , `nextplanning` =?   where id =?"
  
      param = [course, batch, lecture, classroom, lecturedate, assignmentdate, enddate, materialissued, material, assignmentgive, assignment, testgiven, test, topicdescuss, nextplanning, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.get(`/nodeapp/getlecturetakendata`, (req, res) => {
  
    const sql = "select * from awt_lecturetaken where deleted = 0"
  
    con.query(sql, (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })
  })
  
  app.post('/nodeapp/add_assignmenttaken', (req, res) => {
  
  
    let { coursename, batchcode, assignmentname, assignmentdate, returndate, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into assignmentstaken(`coursename`,`batchcode`,`assignmentname`,`assignmentdate`,`returndate`) values(?,?,?,?,?)"
  
      param = [coursename, batchcode, assignmentname, assignmentdate, returndate]
  
    } else {
      sql = "update `assignmentstaken` set `coursename` =? , `batchcode` =? , `assignmentname` =? , `assignmentdate` =? , `returndate` =? where id = ?"
  
      param = [coursename, batchcode, assignmentname, assignmentdate, returndate, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_unittesttaken', (req, res) => {
  
  
    let { coursename, batchcode, utname, utdate, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_unittesttaken(`coursename`,`batchcode`,`utname`,`utdate`) values(?,?,?,?)"
  
      param = [coursename, batchcode, utname, utdate]
  
    } else {
      sql = "update `awt_unittesttaken` set `coursename` =? , `batchcode` =? , `utname` =? , `utdate` =? where id = ?"
  
      param = [coursename, batchcode, utname, utdate, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  app.post('/nodeapp/add_vivamoctaken', (req, res) => {
  
  
    let { coursename, batchcode, vivamocname, date, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_vivamoctaken(`coursename`,`batchcode`,`vivamocname`,`date`) values(?,?,?,?)"
  
      param = [coursename, batchcode, vivamocname, date]
  
    } else {
      sql = "update `awt_vivamoctaken` set `coursename` =? , `batchcode` =? , `vivamocname` =? , `date` =? where id = ?"
  
      param = [coursename, batchcode, vivamocname, date, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  app.post('/nodeapp/add_finalexamtaken', (req, res) => {
  
  
    let { coursename, batchcode, examtestname, date, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_finalexamtaken(`coursename`,`batchcode`,`examtestname`,`date`) values(?,?,?,?)"
  
      param = [coursename, batchcode, examtestname, date]
  
    } else {
      sql = "update `awt_finalexamtaken` set `coursename` =? , `batchcode` =? , `examtestname` =? , `date` =? where id = ?"
  
      param = [coursename, batchcode, examtestname, date, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  
  app.post('/nodeapp/add_generateresult', (req, res) => {
  
  
    let { course, batch, returndate, printdate, prepared, checked, approved, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_generateresult(`course`,`batch`,`returndate`,`printdate`,`prepared`,`checked`,`approved`) values(?,?,?,?,?,?,?)"
  
      param = [course, batch, returndate, printdate, prepared, checked, approved]
  
    } else {
      sql = "update `awt_generateresult` set `course` =? , `batch` =? , `returndate` =? , `returndate` =? , `prepared` =? , `checked` =? , `approved` =? where id = ?"
  
      param = [course, batch, returndate, printdate, prepared, checked, approved, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_facultyworking', (req, res) => {
  
  
    let { date, course, batch, faculty, facultytime, to, work, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_facultyworking(`date`,`course`,`batch`,`faculty`,`facultytime`,`to`,`work`) values(?,?,?,?,?,?,?)"
  
      param = [date, course, batch, faculty, facultytime, to, work]
  
    } else {
      sql = "update `awt_facultyworking` set `date` =? , `course` =? , `batch` =? , `faculty` =? , `facultytime` =? , `to` =? , `work` =? where id = ?"
  
      param = [date, course, batch, faculty, facultytime, to, work, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_visitsite', (req, res) => {
  
  
  
    let { course, batch, location, student, date, time, confirmdate, uid } = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_visitsite(`course`,`batch`,`location`,`student`,`date`,`time`,`confirmdate`) values(?,?,?,?,?,?,?)"
      location
      param = [course, batch, location, student, date, time, confirmdate,]
  
    } else {
      sql = "update `awt_visitsite` set `course` =? , `batch` =? , `location` =? , `student` =? , `date` =? , `time` =? , `confirmdate` =? where id = ?"
  
      param = [course, batch, location, student, date, time, confirmdate, uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  app.post('/nodeapp/add_feedback1', (req, res) => {
  
  
  
    let {course,batch,student,date,feedback,srno,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into feedback1(`course`,`batch`,`student`,`date`,`feedback`,`srno`) values(?,?,?,?,?,?)"
      
      param = [course,batch,student,date,feedback,srno,]
  
    } else {
      sql = "update `feedback1` set `course` =? , `batch` =? , `student` =? , `date` =? , `feedback` =? , `srno` =? where id = ?"
  
      param = [course,batch,student,date,feedback,srno,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_onlinestudent', (req, res) => {
  
  
  
    let {course,admission,fromdate,todate,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_onlinestudent(`course`,`admission`,`fromdate`,`todate`) values(?,?,?,?)"
      
      param = [course,admission,fromdate,todate,]
  
    } else {
      sql = "update `awt_onlinestudent` set `course` =? , `admission` =? , `fromdate` =? , `todate` =? where id = ?"
  
      param = [course,admission,fromdate,todate,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  app.post('/nodeapp/add_sitevisit', (req, res) => {
  
  
  
    let {course,batch,site,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_sitevisit(`course`,`batch`,`site`) values(?,?,?)"
      
      param = [course,batch,site,]
  
    } else {
      sql = "update `awt_sitevisit` set `course` =? , `batch` =? , `site` =? where id = ?"
  
      param = [course,batch,site,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_employerecord', (req, res) => {
  
  
  
    let {training,attendee,instructor,description,feedback,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_employerecord(`training`,`attendee`,`instructopr`,`description`,`feedback`) values(?,?,?,?,?)"
      
      param = [training,attendee,instructor,description,feedback,]
  
    } else {
      sql = "update `awt_employerecord` set `training` =? , `attendee` =? , `instructor` =? , `description` =? , `feedback` =? where id = ?"
  
      param = [training,attendee,instructor,description, feedback,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_studentbatch', (req, res) => {
  
  
  
    let {course,batch,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_studentbatch(`course`,`batch`) values(?,?)"
      
      param = [course,batch,]
  
    } else {
      sql = "update `awt_studentbatch` set `training` =? , `course` =? , `batch` =? where id = ?"
  
      param = [course,batch,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_festival_photo',upload8.single('image'), (req, res) => {
  
    let image = req.file.filename
  
    let {startdate,enddate,description,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_festival_photo(`startdate`,`enddate`,`file`,`description`) values(?,?,?,?)"
      
      param = [startdate,enddate,image,description,]
  
    } else {
      sql = "update `awt_festival_photo` set `startdate` =? , `enddate` =? , `file` =? , `description` =? where id = ?"
  
      param = [startdate,enddate,image,description,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_noticeboard', (req, res) => {
  
  
  
    let {startdate,enddate,specification,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_noticeboard(`startdate`,`enddate`,`specification`) values(?,?,?)"
      
      param = [startdate,enddate,specification,]
  
    } else {
      sql = "update `awt_noticeboard` set `startdate` =? , `enddate` =? , `specification` =? where id = ?"
  
      param = [startdate,enddate,specification,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_uploadeventphoto', (req, res) => {
  
  
  
    let {event,eventheader,specification,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_uploadeventphoto(`event`,`eventheader`,`specification`) values(?,?,?)"
      
      param = [event,eventheader,specification,]
  
    } else {
      sql = "update `awt_uploadeventphoto` set `event` =? , `eventheader` =? , `specification` =? where id = ?"
  
      param = [event,eventheader,specification,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_uploadtestimonial', (req, res) => {
  
  
  
    let {course,batch,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_uploadtestimonial(`course`,`batch`) values(?,?)"
      
      param = [course,batch,]
  
    } else {
      sql = "update `awt_uploadtestimonial` set `course` =? , `batch` =? where id = ?"
  
      param = [course,batch,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_uploadbanner',upload8.single('image'), (req, res) => {
  
    let image = req.file.filename
  
    let {titlename,file,seqno,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_uploadbanner(`titlename`,`file`,`seqno`) values(?,?,?)"
      
      param = [titlename,image,seqno,]
      
    } else {
      sql = "update `awt_uploadbanner` set `titlename` =? , `file` =? , `seqno` =? where id = ?"
  
      param = [titlename,file,seqno,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_qmsdoes',upload8.single('image'), (req, res) => {
  
    let image = req.file.filename
  
    let {qmsname,department,file,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_qmsdoes(`qmsname`,`department`,`file`) values(?,?,?)"
      
      param = [qmsname,department,image]
      
    } else {
      sql = "update `awt_qmsdoes` set `qmsname` =? , `department` =? , `file` =? where id = ?"
  
      param = [qmsname,department,image,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_emailmaster', (req, res) => {
  
  
  
    let {emailpurpose,department,emailsubject,cc,bcc,specification,uid} = req.body
  
    let sql
    let param;
  
    console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_emailmaster(`emailpurpose`,`department`,`emailsubject`,`cc`,`bcc`,`specification`) values(?,?,?,?,?,?)"
      
      param = [emailpurpose,department,emailsubject,cc,bcc,specification,]
  
    } else {
      sql = "update `awt_emailmaster` set `emailpurpose` =? , `department` =? , `emailsubject` =? , `cc` =? , `bcc` =? , `specification` =? where id = ?"
  
      param = [emailpurpose,department,emailsubject,cc,bcc,specification,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  // ================================Accounts Masters
  
  app.post('/nodeapp/add_assets', (req, res) => {
  
  
  
    let {startdate,vindername,assets,quantity,price,location,uid} = req.body
  
    let sql
    let param;
  
    // console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_assets(`startdate`,`vindername`,`assets`,`quantity`,`price`,`location`) values(?,?,?,?,?,?)"
      
      param = [startdate,vindername,assets,quantity,price,location,]
  
    } else {
      sql = "update `awt_assets` set `startdate` =? , `vindername` =? , `assets` =? , `quantity` =? , `price` =? , `location` =? where id = ?"
  
      param = [startdate,vindername,assets,quantity,price,location,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  app.post('/nodeapp/add_batchtransfer', (req, res) => {
  
  
  
    let {coursename,oldbatchno,student,newbatch,transferammount,paymenttype,uid} = req.body
  
    let sql
    let param;
  
    // console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_batchtransfer(`coursename`,`oldbatchno`,`student`,`newbatch`,`transferammount`,`paymenttype`) values(?,?,?,?,?,?)"
      
      param = [coursename,oldbatchno,student,newbatch,transferammount,paymenttype]
  
    } else {
      sql = "update `awt_batchtransfer` set `coursename` =? , `oldbatchno` =? , `student` =? , `newbatch` =? , `transferammount` =? , `paymenttype` =? where id = ?"
  
      param = [coursename,oldbatchno,student,newbatch,transferammount,paymenttype,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  app.post('/nodeapp/add_batchcancellation', (req, res) => {
  
  
  
    let {course,batchno,student,cancellationammount,date,uid} = req.body
  
    let sql
    let param;
  
    // console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_batchcancellation(`course`,`batchno`,`student`,`cancellationammount`,`date`) values(?,?,?,?,?)"
      
      param = [course,batchno,student,cancellationammount,date,]
  
    } else {
      sql = "update `awt_batchcancellation` set `course` =? , `batchno` =? , `student` =? , `cancellationammount` =? , `date` =? where id = ?"
  
      param = [course,batchno,student,cancellationammount,date,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_materialconsumption', (req, res) => {
  
  
  
    let {isussed,startdate,course,qtyinstock,batchno,student,selectitem,qtyissue,price,ammounts,purpose,uid} = req.body
  
    let sql
    let param;
  
    // console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_materialconsumption(`isussed`,`startdate`,`course`,`qtyinstock`,`batchno`,`student`,`selectitem`,`qtyissue`,`price`,`ammounts`,`purpose`) values(?,?,?,?,?,?,?,?,?,?,?)"
      
      param = [isussed,startdate,course,qtyinstock,batchno,student,selectitem,qtyissue,price,ammounts,purpose,]
  
    } else {
      sql = "update `awt_materialconsumption` set `isussed` =? , `startdate` =? , `course` =? , `qtyinstock` =? , `batchno` =? , `student` =? , `selectitem` =? , `qtyissue` =? , `price` =? , `ammounts` =? , `purpose` =? where id = ?"
  
      param = [isussed,startdate,course,qtyinstock,batchno,student,selectitem,qtyissue,price,ammounts,purpose,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/nodeapp/add_salarymaster', (req, res) => {
  
  
  
    let {formdate,todate,service,empcontri,da,minbasic,uid} = req.body
  
    let sql
    let param;
  
    // console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_salarymaster(`formdate`,`todate`,`service`,`empcontri`,`da`,`minbasic`) values(?,?,?,?,?,?)"
      
      param = [formdate,todate,service,empcontri,da,minbasic,]
  
    } else {
      sql = "update `awt_salarymaster` set `formdate` =? , `todate` =? , `service` =? , `empcontri` =? , `da` =? , `minbasic` =? where id = ?"
  
      param = [formdate,todate,service,empcontri,da,minbasic,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })
  
  
  app.post('/nodeapp/add_batchleft', (req, res) => {
  
  
  
    let {course,batchno,student,date,reason,uid} = req.body
  
    let sql
    let param;
  
    // console.log(uid)
  
    if (uid == undefined) {
      sql = "insert into awt_batchleft(`course`,`batchno`,`student`,`date`,`reason`) values(?,?,?,?,?)"
      
      param = [course,batchno,student,date,reason,]
  
    } else {
      sql = "update `awt_batchleft` set `course` =? , `batchno` =? , `student` =? , `date` =? , `reason` =? where id = ?"
  
      param = [course,batchno,student,date,reason,uid]
  
    }
  
  
    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }
    })
  })