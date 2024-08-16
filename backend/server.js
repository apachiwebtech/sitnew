const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const path = require('path');
const multer = require('multer');
var session = require('express-session')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Use CORS middleware before defining routes
app.use(
  cors({
    origin: '*',
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = 'satyam';

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60

  }
}))


const storage = multer.diskStorage({
  destination: '../public_html/uploads/', //
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage2 = multer.diskStorage({
  destination: '../public_html/uploads/banner', //
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const storage3 = multer.diskStorage({
  destination: '../public_html/uploads/gallery', //
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const storage4 = multer.diskStorage({
  destination: '../public_html/uploads/brand', //
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage5 = multer.diskStorage({
  destination: '../public_html/uploads/sizechart', //
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage6 = multer.diskStorage({
  destination: '../public_html/uploads/category', //
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const storage7 = multer.diskStorage({
  destination: '../public_html/uploads/group', //
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage8 = multer.diskStorage({
  destination: '../public_html/uploads/productimg', //
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });
const upload3 = multer({ storage: storage3 });
const upload4 = multer({ storage: storage4 });
const upload5 = multer({ storage: storage5 });
const upload6 = multer({ storage: storage6 });
const upload7 = multer({ storage: storage7 });
const upload8 = multer({ storage: storage8 });




// Create a connection pool with the required details
// const con = mysql.createPool({
//   host: 'localhost',   // Replace with your host name
//   user: 'zhnvcvmy_sit',        // Replace with your database username
//   password: 'ePO}os92-f&7', // Replace with your database password
//   database: 'zhnvcvmy_sit'  // Replace with your database name
// });

const con = mysql.createPool({
  host: 'localhost',   // Replace with your host name
  user: 'root',        // Replace with your database username
  password: '', // Replace with your database password
  database: 'sit'  // Replace with your database name
});

con.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database');
    // connection.release(); // Release the connection back to the pool
  }
});

app.get('/nodeapp/node', (req, res) => {
  const sql = "SELECT * FROM `awt_annual`"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
});



app.listen('8081', () => {
  console.log("listening");
});


app.post('/nodeapp/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;

  const sql = "select * from awt_adminuser where email = ? and password = ? and role = ? and deleted = 0";

  con.query(sql, [email, password, role], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.length > 0) {
        const id = data[0].id;
        // req.session.id = id;
          const token = jwt.sign({ id: id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ data, id: id , token : token});
      }

    }
  });
});

app.get('/nodeapp/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'This is a protected route', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});


// app.get('/nodeapp/checkauth', (req, res) => {
//   if (req.session.id) {
//     return res.json({ valid: true, sessionid: req.session.id })
//   } else {
//     return res.json({ valid: false })
//   };
// });

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

app.post('/nodeapp/new_update_data', (req, res) => {

  let u_id = req.body.u_id;
  let tablename = req.body.tablename;
  let uidname = req.body.uidname;


  const sql = `select * from ${tablename} where ${uidname} = ?`

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
app.post('/nodeapp/get_new_data', (req, res) => {

  let tablename = req.body.tablename;
  let columnname = req.body.columnname;

  const sql = `select ${columnname} from ${tablename} where isDelete = 0 `

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
app.post('/nodeapp/new_delete_data', (req, res) => {

  let delete_id = req.body.delete_id;
  let tablename = req.body.tablename;
  let column_name = req.body.column_name

  const sql = `update ${tablename} set IsDelete = 1 where ${column_name} = ?`

  con.query(sql, [delete_id], (err, data) => {
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
  let { course, course_code, eligibility, introduction, keypoint, objective, studyprep, uid } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "insert into Course_Mst(`Course_Name`,`Course_Code`,`Eligibility`,`Introduction`,`Course_Description`,`Objective`,`Basic_Subject`) values(?,?,?,?,?,?,?)"

    param = [course, course_code, eligibility, introduction, keypoint, objective, studyprep]
  }

  else {
    sql = "update `Course_Mst` set `Course_Name` =? , `Course_Code` =? , `Eligibility` =? , `Introduction` =? , `Course_Description` =? , `Objective` =? , `Basic_Subject` =?  where `Course_Id` =?"

    param = [course, course_code, eligibility, introduction, keypoint, objective, studyprep, uid]

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
    sql = "insert into MST_BatchCategory(`BatchCategory`,`Batch_Type`,`Prefix`,`Description`) values(?,?,?,?)"

    param = [batch, batchtype, prefix, description]

  } else {
    sql = "update `MST_BatchCategory` set `BatchCategory` = ? , `Batch_Type` = ? , `Prefix` = ? , `Description` = ? where id =?"

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

  let { college_name, university, contact_person, designation, address, city, pin, state, phone, country, email, mobile, website, purpose, remark, studentname, mobile1, course, email1, batch, status, date, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_college(`college_name`, `university`, `contact_person`, `designation`, `address`, `city`, `pin`, `state`, `phone`, `country`, `email`, `mobile`, `website`, `purpose`, `remark`, `studentname`, `mobile1`, `course`, `email1`, `batch`, `status`, `date`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

    param = [college_name, university, contact_person, designation, address, city, pin, state, phone, country, email, mobile, website, purpose, remark, studentname, mobile1, course, email1, batch, status, date]

  } else {
    sql = "update `awt_college` set `college_name` =? , `university` =? , `contact_person` =? , `designation` =? , `address` =? , `city` =? , `pin` =? , `state` =? , `phone` =? , `country` =? , `email` =? , `mobile` =? , `website` =? , `purpose` =? , `remark` =? , `studentname` =? , `mobile1` =? , `course` =? , `email1` =? , `batch` =? , `status` =? , `date` =?  where id =?"

    param = [college_name, university, contact_person, designation, address, city, pin, state, phone, country, email, mobile, website, purpose, remark, studentname, mobile1, course, email1, batch, status, date, uid]

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

  let { selectcourse, batchcategory, description, trainingdate, actualdate, timings, basicinr, servicetaxI, coursename, batchcode, planned, admissiondate, duration, coordinator, taxrate, totalinr, servicetax, publish, uid } = req.body

  let sql
  let param;


  if (uid == undefined) {


    const checkcourse = "select * from Batch_Mst where Course_Id = ?"

    con.query(checkcourse, [selectcourse], (err, data) => {
      if (err) {
        return res.json(err)
      } else {


        const count = data.length

        const code = selectcourse + '0' + count

        sql = "insert into Batch_Mst(`Course_Id`,`Category`,`Course_description`,`EDate`,`ActualDate`,`Timings`,`INR_Basic`,`INR_ServiceTax`,`CourseName`,`Batch_code`,`SDate`,`Admission_Date`,`Duration`,`Training_Coordinator`,`TaxRate`,`INR_Total`,`Dollar_ServiceTax`,`Corporate`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

        param = [selectcourse, batchcategory, description, trainingdate, actualdate, timings, basicinr, servicetaxI, coursename, code, planned, admissiondate, duration, coordinator, taxrate, totalinr, servicetax, publish]

        con.query(sql, param, (err, data) => {
          if (err) {
            return res.json(err)
          }
          else {
            return res.json(data)
          }
        })


      }
    })







  } else {


    sql = "update `Batch_Mst` set `Course_Id` = ? , `Category` =? , `Course_description` = ? ,`EDate` =? ,`ActualDate` =? ,`Timings` =? ,`INR_Basic` = ? ,`INR_ServiceTax` =? ,`CourseName` =?  ,`SDate` =? ,`Admission_Date` =? ,`Duration` =?,`Training_Coordinator` = ? ,`TaxRate` =? ,`INR_Total` =? ,`Dollar_ServiceTax` = ? , `Corporate` = ?   where `Batch_Id` = ?"

    param = [selectcourse, batchcategory, description, trainingdate, actualdate, timings, basicinr, servicetaxI, coursename, planned, admissiondate, duration, coordinator, taxrate, totalinr, servicetax, publish, uid]

    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      }
      else {
        return res.json(data)
      }

    })


  }

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
  const sql = 'SELECT i.Inquiry_Id as id,i.Student_Id,i.FName, i.LName, i.MName,i.Student_Name,i.Course_Id,i.Qualification, i.Discussion, i.present_mobile, i.Email, i.Discipline, i.Inquiry_type, i.isActive, i.inquiry_DT, c.Course_Name, i.Percentage , sm.Status , md.Deciplin , i.IsUnread FROM Student_Inquiry AS i LEFT JOIN Course_Mst AS c ON i.Course_id = c.Course_Id LEFT JOIN Status_Master as sm on sm.Id = i.OnlineState left JOIN MST_Deciplin as md on md.Id = i.Discipline WHERE i.isDelete = 0 order by i.Inquiry_Id desc';
    // const sql = 'select sm.*, cm.Course_Name from Student_Master as sm left join Course_Mst as cm on cm.Course_Id = sm.Course_Id where sm.IsDelete = 0 order by sm.Student_Id desc'
  con.query(sql, (error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json(data);
    }
  })
})
app.post('/nodeapp/getBtachwiseamount', (req, res, next) => {

    const Batch_Code = req.body.Batch_Code;

  const sql = 'SELECT bm.Batch_Id,bm.Batch_code,fs.total_inr FROM `Batch_Mst` as bm LEFT JOIN Fees_Structure as fs  on bm.Batch_Id = fs.batch_id WHERE bm.Batch_code =  ? and isDelete = 0 '

  con.query(sql,[Batch_Code],(error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json(data);
    }
  })
})

app.get('/nodeapp/getadmissiondata', (req, res, next) => {
//   const sql = 'SELECT i.Inquiry_Id as id,i.Student_Id,i.FName, i.LName, i.MName,i.Student_Name,i.Course_Id,i.Qualification, i.Discussion, i.present_mobile, i.Email, i.Discipline, i.Inquiry_type, i.isActive, i.inquiry_DT, c.Course_Name, i.Percentage , sm.Status , md.Deciplin , i.IsUnread FROM Student_Inquiry AS i LEFT JOIN Course_Mst AS c ON i.Course_id = c.Course_Id LEFT JOIN Status_Master as sm on sm.Id = i.OnlineState left JOIN MST_Deciplin as md on md.Id = i.Discipline WHERE i.isDelete = 0 order by i.Inquiry_Id desc';
    const sql = 'select sm.*, cm.Course_Name from Student_Master as sm left join Course_Mst as cm on cm.Course_Id = sm.Course_Id where sm.IsDelete = 0 order by sm.Student_Id desc'
  con.query(sql, (error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json(data);
    }
  })
})

app.get('/nodeapp/admissiondata', (req, res, next) => {

const sql = 'select am.Admission_Id,am.Admission_Date,am.Amount ,am.Payment_Type, sm.Student_Name ,cm.Course_Name,bm.Batch_code from Admission_master as am left join Student_Master as sm on sm.Student_Id = am.Student_Id left JOIN Course_Mst as cm on cm.Course_Id = am.Course_Id LEFT JOIN Batch_Mst as bm on bm.Batch_code = am.Batch_Id where am.isDelete = 0'
  con.query(sql, (error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json(data);
    }
  })
})

app.post('/nodeapp/process_admission', (req, res, next) => {

   let {Student_Id,Course_Id,Batch_Id,Amount,Admission_Dt} = req.body

   const sql = 'insert into Admission_master(`Student_Id`,`Course_Id`,`Batch_Id`,`Amount`,`Admission_Date`) values(?,?,?,?,?)'

  con.query(sql,[Student_Id,Course_Id,Batch_Id,Amount,Admission_Dt],(error, data) => {

    if (error) {
      return res.json(error);
    } else {
        const updatestudent = 'update Student_Master set Admission = 1 where Student_Id = ?'

        con.query(updatestudent , [Student_Id], (err,data) =>{
            if(err){
                return res.json(err)
            }else{
                return res.json(data)
            }
        })
    }
  })

})






app.post('/nodeapp/studentDetail', (req, res, next) => {

  const { id } = req.body;



  const sql = 'SELECT i.Inquiry_Id as id,i.Student_Id ,i.Sex,i.DOB,i.Student_Name,i.Course_Id,i.Qualification, i.Discussion, i.Present_Mobile, i.Nationality, i.Email, i.Discipline, i.Inquiry_type, i.isActive, i.inquiry_DT,i.Percentage, c.course , i.Present_Country , i.StateChangeDt ,i.OnlineState ,i.Inquiry ,i.Batch_Category_id ,i.Refered_By ,Batch_Code FROM Student_Inquiry AS i LEFT JOIN awt_course AS c ON i.Course_id = c.id  WHERE i.Inquiry_Id = ?';

  con.query(sql, [id], (error, data) => {
    if (error) {
      res.status(500).json(error);
      return
    }

    return res.json(data);
  })
})

app.post('/nodeapp/AdmitDetail', (req, res, next) => {

  const { id } = req.body;

  const sql = 'select am.Admission_Id,am.Student_Code,am.Course_Id, am.Batch_Id,am.Admission_Date ,am.Payment_Type,am.Amount, sm.Student_Name ,sm.Student_Id from Admission_master as am left join Student_Master as sm on sm.Student_Id = am.Student_Id left JOIN Course_Mst as cm on cm.Course_Id = am.Course_Id LEFT JOIN Batch_Mst as bm on bm.Batch_Id = am.Batch_Id where am.Admission_Id = ?'

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
  const sql = 'SELECT Course_Id, Course_Name FROM Course_Mst ';

  con.query(sql, (error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json(data);
    }
  })
})
app.get('/nodeapp/getCollege', (req, res, next) => {
  const sql = 'SELECT * FROM awt_college where deleted = 0';

  con.query(sql, (error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json(data);
    }
  })
})


// app.post('/nodeapp/postInquiry', (req, res, next) => {

//   const { firstname, email, gender, dob, mobile, InquiryDate, modeEnquiry, advert, programmeEnquired, selectedProgramme, category, batch, qualification, descipline, percentage } = req.body;




//   const check = 'SELECT * FROM Student_Master WHERE Email = ?';

//   const insertIntoInquiry = 'INSERT INTO Student_Inquiry (Student_Id, Email,FName, Student_Name, Sex, DOB, Father_mobile,Inquiry_DT, Inquiry_type, Qualification, Discipline, Percentage, Course_Id ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'

//   // const insertIntoStudent = 'INSERT INTO Student_Master (Email, FName, Student_Name, Sex, DOB, Present_Mobile,Inquiry_DT, Inquiry_type, Qualification, Discipline, Percentage,Course_Id ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'

//   con.query(check, [email], (error, data) => {
//     if (error) {
//       res.status(500).json({ error: 'Check Error' });
//       return;
//     }

//     if (data.length > 0) {
//       const studentID = data[0].Student_Id;
//       con.query(insertIntoInquiry, [studentID, email, firstname, firstname, gender, dob, mobile, InquiryDate, modeEnquiry, qualification, descipline, percentage, selectedProgramme], (error, data) => {
//         if (error) {
//           res.status(500).json({ error: 'Internal Server Error' });
//           return;
//         }
//         res.status(200).json({ message: 'Data added to inquiry table.' });
//       })
//     } else {
//       con.query(insertIntoStudent, [email, firstname, firstname, gender, dob, mobile, InquiryDate, modeEnquiry, qualification, descipline, percentage, selectedProgramme], (error, data) => {
//         if (error) {
//           res.status(500).json({ error: 'Internal Server Error' });
//           return;
//         }
//         const student_Id = data.insertId
//         insertInquiry(student_Id)

//       })
//     }
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

  const { firstname, email, gender, dob, mobile, InquiryDate, modeEnquiry, advert, programmeEnquired, selectedProgramme, category, batch, qualification, descipline, percentage, nationality, statusdate, status, country, discussion } = req.body;



  const insertIntoInquiry = 'INSERT INTO Student_Inquiry ( Email, Student_Name, Sex, DOB, Present_Mobile,Inquiry_Dt, Inquiry_type, Qualification, Discipline, Percentage, Course_Id ,Nationality,Present_Country,Discussion,StateChangeDt,OnlineState ,Inquiry,Batch_Category_id ,Batch_Code ,Refered_By ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'


  con.query(insertIntoInquiry, [email, firstname, gender, dob, mobile, InquiryDate, modeEnquiry, qualification, descipline, percentage, selectedProgramme, nationality, country, discussion, statusdate, status, programmeEnquired, batch, category, advert], (error, data) => {
    if (error) {
      res.json(error);
      return;
    }
    res.status(200).json({ message: 'Data added to inquiry table.' });
  })




})


app.post('/nodeapp/updateInquiry', (req, res, next) => {

  const { Enquiry_Id, firstname, email, gender, dob, mobile, InquiryDate, modeEnquiry, advert, programmeEnquired, selectedProgramme, category, batch, qualification, descipline, percentage, nationality, statusdate, status, country, discussion } = req.body;


  const sql = 'UPDATE Student_Inquiry SET  Student_Name = ?, Email = ?, Sex = ?, DOB = ?, Present_Mobile = ?, Inquiry_Dt = ?, Inquiry_type =?, Course_Id = ?, Qualification = ?, Discipline = ?, Percentage = ? , Discussion = ? ,StateChangeDt = ? ,OnlineState = ?, Inquiry = ?,Batch_Category_id = ? ,Batch_Code =? , Refered_By = ? ,Nationality = ?, Present_Country = ? ,IsUnread = 1 WHERE Inquiry_Id = ? ';

  con.query(sql, [firstname, email, gender, dob, mobile, InquiryDate, modeEnquiry, selectedProgramme, qualification, descipline, percentage, discussion, statusdate, status, programmeEnquired, category, batch, advert, nationality, country, Enquiry_Id], (error, data) => {
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
  const sql = 'SELECT sm.Student_Id,sm.Batch_Code,sm.Student_Name,sm.Present_Address,sm.Email, sm.Present_Mobile, sm.Qualification, sm.IsActive ,stm.Status ,sm.Admission_Dt FROM Student_Master as sm left join Status_Master as stm on stm.Id = sm.OnlineState WHERE sm.IsDelete = 0 order by sm.Student_Id desc';

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
app.get('/nodeapp/getFinalStudents', (req, res, next) => {
  const sql = 'SELECT sm.Student_Id,sm.Batch_Code,sm.Student_Name,sm.Present_Address,sm.Email, sm.Present_Mobile, sm.Qualification, sm.IsActive ,stm.Status FROM Student_Master as sm left join Status_Master as stm on stm.Id = sm.OnlineState WHERE sm.IsDelete = 0 and Admission = 1  order by sm.Student_Id desc';

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

  const { Student_Id, studentName, Batch_Code, gender, nationality, dob, password, reference, presentaddress, presentPincode, presentCity, state, presentCountry, mobile, whatsapp, course, category, Referby, admission_dt, prestatus, changestatus, date, permanentAdress, permanentPincode, permanentCity, permanentState, permanentCountry, permanentmobile, perWatsapp, prestatusdate ,permanentemail } = req.body;

  const sql = 'UPDATE Student_Master SET  Student_Name = ?, Sex = ?, DOB = ?, Present_Mobile = ?, Course_Id = ?,Batch_Code = ?,Nationality =?, Refered_By = ?,Present_Address =? ,Present_Pin = ?,Present_City = ?,Present_State= ? ,Present_Country = ? ,Batch_Category_id = ? ,Admission_Dt = ? ,Status_id = ?,Status_date = ? , OnlineState = ? ,StateChangeDt = ? ,Permanent_Address = ?,Permanent_Pin = ?,Permanent_City = ?,Permanent_State =? ,Permanent_Country = ?,Permanent_Tel = ? ,Email = ?  WHERE Student_Id = ?';

  con.query(sql, [studentName, gender, dob, mobile, course, Batch_Code, nationality, Referby, presentaddress, presentPincode, presentCity, state, presentCountry, category, admission_dt, prestatus, date, changestatus, prestatusdate, permanentAdress, permanentPincode, permanentCity, permanentState, permanentCountry, permanentmobile,permanentemail, Student_Id], (error, data) => {
    if (error) {
      res.json(error);
      return;
    }

    return res.status(200).json(data);
  })

})

app.post('/nodeapp/getPersonal', (req, res, next) => {
  const { admissionid } = req.body;

  const sql = 'SELECT sm.*,bm.SDate , bm.EDate ,fs.total_inr FROM Student_Master as sm  left join Batch_Mst as bm on bm.Batch_code = sm.Batch_Code left join Fees_Structure as fs on bm.Batch_Id = fs.batch_id  WHERE sm.Student_Id = ?';

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
    u_id
  } = req.body

  let sql
  let param

  if (u_id == undefined) {
    sql = 'INSERT INTO awt_academicqualification (Student_id ,Qualification,Discipline, College , University ,PassingYear,Percentage,Status,KT,remark) VALUES(?,?,?,?,?,?,?,?,?,?)'

    param= [studentId, qualification, descipline, college, uni, passYear, grade, status, kt, remark]

  } else {
    sql = 'update awt_academicqualification set Qualification = ?, Discipline = ?,College = ?,University = ?,PassingYear = ?,Percentage = ? ,Status = ?, KT = ? , remark = ?  where id = ?'
    param= [ qualification, descipline, college, uni, passYear, grade, status, kt, remark, u_id]
  }



  con.query(sql, param, (error, data) => {
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

app.post('/nodeapp/acqualification_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_academicqualification where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

// ==============================Lecture takene

app.post('/nodeapp/add_lecturetaken', (req, res) => {

  let { course, batch, lecture, classroom, lecturedate,lecturefrom,lectureto,faculty,facultytime,timeto, assignmentadate, enddate, materialissued, material, assignmentgive, assignment, testgiven, test, topicdescuss, nextplanning, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into lecture_taken_master (`Course_Id`,`Batch_Id`,`Lecture_Id`,`ClassRoom`,`Take_Dt`,`Lecture_Start`,`Lecture_End`,`Faculty_Id`,`Faculty_Start`,`Faculty_End`,`Assign_Start`,`Assign_End`,`Assignment_Id`,`Material`,`Assign_Given`,`Test_Given`,`Test_Id`,`Topic`,`Next_Planning`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

    param = [course, batch, lecture, classroom, lecturedate,lecturefrom,lectureto,faculty,facultytime,timeto, assignmentadate, enddate,assignment, materialissued, assignmentgive , testgiven, test, topicdescuss, nextplanning]

  } else {
    sql = "update `lecture_taken_master` set Course_Id =? ,Batch_Id = ? ,Lecture_Id = ?,ClassRoom = ? ,Take_Dt = ? ,Lecture_Start = ?,Lecture_End = ?,Faculty_Id = ? ,Faculty_Start = ? ,Faculty_End = ? ,Assign_Start =?,Assign_End = ? ,Assignment_Id = ?, Material =?,Assign_Given = ? ,Test_Given = ?,Test_Id = ? ,Topic = ? ,Next_Planning = ?   where Take_Id =?"

    param = [course, batch, lecture, classroom, lecturedate,lecturefrom,lectureto,faculty,facultytime,timeto, assignmentadate, enddate,assignment, materialissued, assignmentgive , testgiven, test, topicdescuss, nextplanning ,uid]

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

  const sql = "select Take_Id,Lecture_Name,Take_Dt,Batch_Id,Topic,Faculty_Id from lecture_taken_master where IsDelete = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get(`/nodeapp/assignment_taken`, (req, res) => {

  const sql = "select * from assignmentstaken where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.get(`/nodeapp/getbatchmoc`, (req, res) => {

  const sql = "select * from Batch_Moc_Master where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.get(`/nodeapp/getbatchfeedback`, (req, res) => {

  const sql = "select * from Batch_Feedback_Master where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get(`/nodeapp/batch_standardlecture`, (req, res) => {

  const sql = "select * from Batch_SLecture_Master where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.get(`/nodeapp/batch_lecturetaken`, (req, res) => {

  const sql = "select * from Batch_Lecture_Master where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.get(`/nodeapp/batch_convocation`, (req, res) => {

  const sql = "select * from Batch_Convocation where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/nodeapp/add_assignmentdetails', (req, res) => {

  let { assingmentname, subject, marks, date, uid ,batch_id } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "insert into assignmentstaken( `batch_id`,`assignmentname`,`subjects`,`marks`,`assignmentdate`) values(?,?,?,?,?)"

    param = [batch_id,assingmentname, subject, marks, date]

  } else {
    sql = "update `assignmentstaken` set `batch_id`, `assignmentname` =? , `subjects` =? , `marks` =? , `assignmentdate` =? where id =?"

    param = [batch_id,assingmentname, subject, marks, date, uid]

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

app.post('/nodeapp/add_Unittest', (req, res) => {

  let { subject, testdate, duration, marks, uid, batch_id } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "insert into awt_unittesttaken(`batch_id`,`subject`, `utdate`,`duration`,`marks`) values(?,?,?,?,?)"

    param = [batch_id,subject, testdate,duration, marks]

  } else {
    sql = "update `awt_unittesttaken` set `batch_id` = ? , `subject` =? , `utdate` =? , `duration` =? ,marks =?  where id =?"

    param = [batch_id, subject, testdate, duration, marks, uid]

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

app.post('/nodeapp/add_finalexam', (req, res) => {

  let { subject, examdate, duration, maxmarks, uid, batch_id } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "insert into Batch_final_exam(`batch_id`,`subject`, `date`,`duration`,`maxmarks`) values(?,?,?,?,?)"

    param = [batch_id,subject, examdate,duration, maxmarks]

  } else {
    sql = "update `Batch_final_exam` set `batch_id` = ? , `subject` =? , `date` =? , `duration` =? ,maxmarks =?  where id =?"

    param = [batch_id, subject, examdate, duration, maxmarks, uid]

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

app.post('/nodeapp/add_assignmentstaken', (req, res) => {

  let { coursename,batchcode,assignmentname,assignmentdate,returndate,uid } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "insert into Assignment_taken(`Course_Id`,`Batch_Id`, `Assignment_Id`,`Assign_Dt`,`Return_Dt`) values(?,?,?,?,?)"

    param = [coursename,batchcode, assignmentname,assignmentdate, returndate]

  } else {
    sql = "update `Assignment_taken` set `Course_Id` = ? , `Batch_Id` =? , `Assignment_Id` =? , `Assign_Dt` =? ,Return_Dt =?  where Given_Id =?"

    param = [coursename,batchcode, assignmentname,assignmentdate, returndate, uid]

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

app.post('/nodeapp/add_assignmentstaken', (req, res) => {

  let { coursename,batchcode,assignmentname,assignmentdate,returndate,uid } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "insert into Assignment_taken(`Course_Id`,`Batch_Id`, `Assignment_Id`,`Assign_Dt`,`Return_Dt`) values(?,?,?,?,?)"

    param = [coursename,batchcode, assignmentname,assignmentdate, returndate]

  } else {
    sql = "update `Assignment_taken` set `Course_Id` = ? , `Batch_Id` =? , `Assignment_Id` =? , `Assign_Dt` =? ,Return_Dt =?  where Given_Id =?"

    param = [coursename,batchcode, assignmentname,assignmentdate, returndate, uid]

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


app.post('/nodeapp/add_Moc', (req, res) => {

  let { subject, date, marks, uid, batch_id } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "insert into Batch_Moc_Master(`batch_id`,`subject`, `date`,`marks`) values(?,?,?,?)"

    param = [batch_id,subject, date, marks]

  } else {
    sql = "update `Batch_Moc_Master` set `batch_id` = ? ,`subject` =? , `date` =? ,`marks` =?  where id =?"

    param = [batch_id, subject, date, marks, uid]

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

app.post('/nodeapp/add_batchstandardlecture', (req, res) => {

  let { lecture_no,subject_topic,starttime,endtime,assignment,assignment_date,faculty_name,class_room,documents,unit_test,subject,date,marks, uid, batch_id,duration,publish } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "INSERT INTO Batch_SLecture_Master(`batch_id`,`lecture_no`, `subject_topic`,`starttime`,`endtime`,`assignment`,`assignment_date`,`faculty_name`,`duration`,`class_room`,`documents`,`unit_test`,`publish`,`subject`,`date`,`marks`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

    param = [batch_id,lecture_no,subject_topic,starttime,endtime,assignment,assignment_date,faculty_name,duration,class_room,documents,unit_test,publish,subject,date,marks]

  } else {
    sql = "update `Batch_SLecture_Master` set batch_id = ? ,lecture_no =? , subject_topic =? ,starttime =? ,endtime =? ,assignment = ?,assignment_date =? ,faculty_name = ? ,duration = ?,class_room = ? , documents =? ,unit_test = ?,publish = ? ,subject = ?,date =?,marks =?  where id =?"

    param = [batch_id,lecture_no,subject_topic,starttime,endtime,assignment,assignment_date,faculty_name,duration,class_room,documents,unit_test,publish,subject,date,marks,uid]

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

app.post('/nodeapp/add_batchlecturetaken', (req, res) => {

  let { lecture_no,subject_topic,starttime,endtime,assignment,assignment_date,faculty_name,class_room,documents,unit_test,subject,date,marks, uid, batch_id,duration,publish } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "INSERT INTO Batch_Lecture_Master(`batch_id`,`lecture_no`, `subject_topic`,`starttime`,`endtime`,`assignment`,`assignment_date`,`faculty_name`,`duration`,`class_room`,`documents`,`unit_test`,`publish`,`subject`,`date`,`marks`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

    param = [batch_id,lecture_no,subject_topic,starttime,endtime,assignment,assignment_date,faculty_name,duration,class_room,documents,unit_test,publish,subject,date,marks]

  } else {
    sql = "update `Batch_Lecture_Master` set batch_id = ? ,lecture_no =? , subject_topic =? ,starttime =? ,endtime =? ,assignment = ?,assignment_date =? ,faculty_name = ? ,duration = ?,class_room = ? , documents =? ,unit_test = ?,publish = ? ,subject = ?,date =?,marks =?  where id =?"

    param = [batch_id,lecture_no,subject_topic,starttime,endtime,assignment,assignment_date,faculty_name,duration,class_room,documents,unit_test,publish,subject,date,marks,uid]

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

app.post('/nodeapp/add_batchconvocation', (req, res) => {

  let {uid, batch_id ,faculty_name,guest_name,guest_mobile,email,guest_designation } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "INSERT INTO Batch_Convocation(`batch_id`,`faculty_name`,`guest_name`,`guest_mobile`,`email`,`guest_designation`) VALUES(?,?,?,?,?,?)"

    param = [batch_id,faculty_name,guest_name,guest_mobile,email,guest_designation]

  } else {
    sql = "update `Batch_Convocation` set batch_id = ? ,faculty_name =? , guest_name =? ,guest_mobile = ? ,email = ? ,guest_designation = ? where id =?"

    param = [batch_id,faculty_name,guest_name,guest_mobile,email,guest_designation,uid]

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
app.post('/nodeapp/add_BatchFeedback', (req, res) => {

  let { subject, date,  uid, batch_id } = req.body

  let sql
  let param;


  if (uid == undefined) {
    sql = "insert into Batch_Feedback_Master(`batch_id`,`subject`, `date`) values(?,?,?)"

    param = [batch_id,subject, date]

  } else {
    sql = "update `Batch_Feedback_Master` set `batch_id` = ? ,`subject` =? , `date` =?  where id =?"

    param = [batch_id, subject, date,  uid]

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

app.get(`/nodeapp/Unit_test`, (req, res) => {

  const sql = "select * from awt_unittesttaken where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
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
    sql = "insert into Test_taken_master(`Course_Id`,`Batch_Id`,`Test_Id`,`Test_Dt`) values(?,?,?,?)"

    param = [coursename, batchcode, utname, utdate]

  } else {
    sql = "update `Test_taken_master` set `Course_Id` =? , `Batch_Id` =? , `Test_Id` =? , `Test_Dt` =? where Take_Id = ?"

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



  if (uid == undefined) {
    sql = "insert into viva_taken(`Course_Id`,`Batch_Id`,`Viva_Id`,`Take_Dt`) values(?,?,?,?)"

    param = [coursename, batchcode, vivamocname, date]

  } else {
    sql = "update `viva_taken` set `Course_Id` =? , `Batch_Id` =? , `Viva_Id` =? , `Take_Dt` =? where Take_Id = ?"

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

// app.post('/nodeapp/add_vivamoctaken', (req, res) => {


//   let { coursename, batchcode, vivamocname, date, uid } = req.body

//   let sql
//   let param;

//   console.log(uid)

//   if (uid == undefined) {
//     sql = "insert into awt_vivamoctaken(`coursename`,`batchcode`,`vivamocname`,`date`) values(?,?,?,?)"

//     param = [coursename, batchcode, vivamocname, date]

//   } else {
//     sql = "update `awt_vivamoctaken` set `coursename` =? , `batchcode` =? , `vivamocname` =? , `date` =? where id = ?"

//     param = [coursename, batchcode, vivamocname, date, uid]

//   }


//   con.query(sql, param, (err, data) => {
//     if (err) {
//       return res.json(err)
//     }
//     else {
//       return res.json(data)
//     }
//   })
// })

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

app.post('/nodeapp/get_vistsite', (req, res) => {

  const sql = 'select * from Site_visit_master where isDelete = 0;'

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })

})

app.get('/nodeapp/get_workingtime', (req, res) => {

  const sql = 'SELECT fw.id , bm.Batch_code ,fw.batch, cm.Course_Name , fw.course ,date , fw.faculty ,fw.facultytime,fw.to,fw.work FROM awt_facultyworking as fw left join Batch_Mst as bm on fw.batch = bm.Batch_Id left join Course_Mst as cm on fw.course = cm.Course_Id where fw.deleted = 0;'

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
   }
})

})

app.get('/nodeapp/getfinalexam', (req, res) => {

  const sql = 'select fe.date ,fe.coursename , fe.batchcode , bm.Batch_code , cm.Course_Name , fe.id from awt_finalexamtaken as fe left join Batch_Mst as bm on fe.batchcode = bm.Batch_Id left join Course_Mst as cm on fe.coursename = cm.Course_Name where fe.deleted=0;'

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })

})

app.get('/nodeapp/site_vise' , (req,res) =>{

    const sql = "select * from Batch_final_exam where deleted = 0"

    con.query(sql , (err,data) =>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})

app.post('/nodeapp/add_visitsite', (req, res) => {

// add regin input changes the db ~ bhavesh

  let { course, batch, location, student, date, time,region, confirmdate, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into Site_visit_master(`Course_Name`,`Batch_Code`,`Location`,`Total_Student`,`Visit_Date`,`Visit_Time`,`Region`,`ConfirmDAte`) values(?,?,?,?,?,?,?,?)"

    param = [course, batch, location, student, date, time,region, confirmdate]

  } else {
    sql = "update `Site_visit_master` set `Course_Name` =? , `Batch_Code` =? , `Location` =? , `Total_Student` =? , `Visit_Date` =? , `Visit_Time` =? , `ConfirmDAte` =? `Region`=? where Visit_Id = ?"

    param = [course, batch, location, student, date, time, confirmdate, region,uid]

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



  let { course, batch, student, date, feedback, srno, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into feedback1(`course`,`batch`,`student`,`date`,`feedback`,`srno`) values(?,?,?,?,?,?)"

    param = [course, batch, student, date, feedback, srno,]

  } else {
    sql = "update `feedback1` set `course` =? , `batch` =? , `student` =? , `date` =? , `feedback` =? , `srno` =? where id = ?"

    param = [course, batch, student, date, feedback, srno, uid]

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



  let { course, admission, fromdate, todate, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_onlinestudent(`course`,`admission`,`fromdate`,`todate`) values(?,?,?,?)"

    param = [course, admission, fromdate, todate,]

  } else {
    sql = "update `awt_onlinestudent` set `course` =? , `admission` =? , `fromdate` =? , `todate` =? where id = ?"

    param = [course, admission, fromdate, todate, uid]

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



  let { course, batch, site, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_sitevisit(`course`,`batch`,`site`) values(?,?,?)"

    param = [course, batch, site,]

  } else {
    sql = "update `awt_sitevisit` set `course` =? , `batch` =? , `site` =? where id = ?"

    param = [course, batch, site, uid]

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



  let { training, attendee, instructor, description, feedback, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_employerecord(`training`,`attendee`,`instructopr`,`description`,`feedback`) values(?,?,?,?,?)"

    param = [training, attendee, instructor, description, feedback,]

  } else {
    sql = "update `awt_employerecord` set `training` =? , `attendee` =? , `instructor` =? , `description` =? , `feedback` =? where id = ?"

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


app.post('/nodeapp/add_studentbatch', (req, res) => {



  let { course, batch, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_studentbatch(`course`,`batch`) values(?,?)"

    param = [course, batch,]

  } else {
    sql = "update `awt_studentbatch` set `training` =? , `course` =? , `batch` =? where id = ?"

    param = [course, batch, uid]

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


app.post('/nodeapp/add_festival_photo', upload8.single('image'), (req, res) => {

  let image = req.file.filename

  let { startdate, enddate, description, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_festival_photo(`startdate`,`enddate`,`file`,`description`) values(?,?,?,?)"

    param = [startdate, enddate, image, description,]

  } else {
    sql = "update `awt_festival_photo` set `startdate` =? , `enddate` =? , `file` =? , `description` =? where id = ?"

    param = [startdate, enddate, image, description, uid]

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



  let { startdate, enddate, specification, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_noticeboard(`startdate`,`enddate`,`specification`) values(?,?,?)"

    param = [startdate, enddate, specification,]

  } else {
    sql = "update `awt_noticeboard` set `startdate` =? , `enddate` =? , `specification` =? where id = ?"

    param = [startdate, enddate, specification, uid]

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



  let { event, eventheader, specification, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_uploadeventphoto(`event`,`eventheader`,`specification`) values(?,?,?)"

    param = [event, eventheader, specification,]

  } else {
    sql = "update `awt_uploadeventphoto` set `event` =? , `eventheader` =? , `specification` =? where id = ?"

    param = [event, eventheader, specification, uid]

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



  let { course, batch, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_uploadtestimonial(`course`,`batch`) values(?,?)"

    param = [course, batch,]

  } else {
    sql = "update `awt_uploadtestimonial` set `course` =? , `batch` =? where id = ?"

    param = [course, batch, uid]

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


app.post('/nodeapp/add_uploadbanner', upload8.single('image'), (req, res) => {

  let image = req.file.filename

  let { titlename, file, seqno, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_uploadbanner(`titlename`,`file`,`seqno`) values(?,?,?)"

    param = [titlename, image, seqno,]

  } else {
    sql = "update `awt_uploadbanner` set `titlename` =? , `file` =? , `seqno` =? where id = ?"

    param = [titlename, file, seqno, uid]

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


app.post('/nodeapp/add_qmsdoes', upload8.single('image'), (req, res) => {

  let image = req.file.filename

  let { qmsname, department, file, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_qmsdoes(`qmsname`,`department`,`file`) values(?,?,?)"

    param = [qmsname, department, image]

  } else {
    sql = "update `awt_qmsdoes` set `qmsname` =? , `department` =? , `file` =? where id = ?"

    param = [qmsname, department, image, uid]

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



  let { emailpurpose, department, emailsubject, cc, bcc, specification, uid } = req.body

  let sql
  let param;

  console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_emailmaster(`emailpurpose`,`department`,`emailsubject`,`cc`,`bcc`,`specification`) values(?,?,?,?,?,?)"

    param = [emailpurpose, department, emailsubject, cc, bcc, specification,]

  } else {
    sql = "update `awt_emailmaster` set `emailpurpose` =? , `department` =? , `emailsubject` =? , `cc` =? , `bcc` =? , `specification` =? where id = ?"

    param = [emailpurpose, department, emailsubject, cc, bcc, specification, uid]

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



  let { startdate, vindername, assets, quantity, price, location, uid } = req.body

  let sql
  let param;

  // console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_assets(`startdate`,`vindername`,`assets`,`quantity`,`price`,`location`) values(?,?,?,?,?,?)"

    param = [startdate, vindername, assets, quantity, price, location,]

  } else {
    sql = "update `awt_assets` set `startdate` =? , `vindername` =? , `assets` =? , `quantity` =? , `price` =? , `location` =? where id = ?"

    param = [startdate, vindername, assets, quantity, price, location, uid]

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



  let { coursename, oldbatchno, student, newbatch, transferammount, paymenttype, uid } = req.body

  let sql
  let param;

  // console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_batchtransfer(`coursename`,`oldbatchno`,`student`,`newbatch`,`transferammount`,`paymenttype`) values(?,?,?,?,?,?)"

    param = [coursename, oldbatchno, student, newbatch, transferammount, paymenttype]

  } else {
    sql = "update `awt_batchtransfer` set `coursename` =? , `oldbatchno` =? , `student` =? , `newbatch` =? , `transferammount` =? , `paymenttype` =? where id = ?"

    param = [coursename, oldbatchno, student, newbatch, transferammount, paymenttype, uid]

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



  let { course, batchno, student, cancellationammount, date, uid } = req.body

  let sql
  let param;

  // console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_batchcancellation(`course`,`batchno`,`student`,`cancellationammount`,`date`) values(?,?,?,?,?)"

    param = [course, batchno, student, cancellationammount, date,]

  } else {
    sql = "update `awt_batchcancellation` set `course` =? , `batchno` =? , `student` =? , `cancellationammount` =? , `date` =? where id = ?"

    param = [course, batchno, student, cancellationammount, date, uid]

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



  let { isussed, startdate, course, qtyinstock, batchno, student, selectitem, qtyissue, price, ammounts, purpose, uid } = req.body

  let sql
  let param;

  // console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_materialconsumption(`isussed`,`startdate`,`course`,`qtyinstock`,`batchno`,`student`,`selectitem`,`qtyissue`,`price`,`ammounts`,`purpose`) values(?,?,?,?,?,?,?,?,?,?,?)"

    param = [isussed, startdate, course, qtyinstock, batchno, student, selectitem, qtyissue, price, ammounts, purpose,]

  } else {
    sql = "update `awt_materialconsumption` set `isussed` =? , `startdate` =? , `course` =? , `qtyinstock` =? , `batchno` =? , `student` =? , `selectitem` =? , `qtyissue` =? , `price` =? , `ammounts` =? , `purpose` =? where id = ?"

    param = [isussed, startdate, course, qtyinstock, batchno, student, selectitem, qtyissue, price, ammounts, purpose, uid]

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



  let { formdate, todate, service, empcontri, da, minbasic, uid } = req.body

  let sql
  let param;

  // console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_salarymaster(`formdate`,`todate`,`service`,`empcontri`,`da`,`minbasic`) values(?,?,?,?,?,?)"

    param = [formdate, todate, service, empcontri, da, minbasic,]

  } else {
    sql = "update `awt_salarymaster` set `formdate` =? , `todate` =? , `service` =? , `empcontri` =? , `da` =? , `minbasic` =? where id = ?"

    param = [formdate, todate, service, empcontri, da, minbasic, uid]

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



  let { course, batchno, student, date, reason, uid } = req.body

  let sql
  let param;

  // console.log(uid)

  if (uid == undefined) {
    sql = "insert into awt_batchleft(`course`,`batchno`,`student`,`date`,`reason`) values(?,?,?,?,?)"

    param = [course, batchno, student, date, reason,]

  } else {
    sql = "update `awt_batchleft` set `course` =? , `batchno` =? , `student` =? , `date` =? , `reason` =? where id = ?"

    param = [course, batchno, student, date, reason, uid]

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

app.get('/nodeapp/getstatus', (req, res) => {

  const sql = "select * from Status_Master where IsDelete = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get('/nodeapp/getcategory', (req, res) => {

  const sql = "select * from awt_material_cat where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get('/nodeapp/getbatch', (req, res) => {

  const sql = "select * from Batch_Mst where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.get('/nodeapp/getqualification', (req, res) => {

  const sql = "select * from sit_qualification where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/nodeapp/getACQualification', (req, res) => {

  let Student_id = req.body.Student_id;

  const sql = "select acd.* , aq.title as Qualification_title , sd.title as Descipline_title ,ac.college_name as College_title from awt_academicqualification as acd left join sit_qualification as aq on acd.Qualification = aq.id left join sit_descipline as sd on acd.Discipline = sd.id left join awt_college as ac on acd.Discipline = ac.id where acd.Student_id = ? and acd.deleted = 0"

  con.query(sql, [Student_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/nodeapp/addorderid', (req, res) => {

  let user_id = req.body.user_id;
  let orderid = req.body.orderid;


  const updateuserid = "update `order` set userid = ? where id = ?"

  con.query(updateuserid, [user_id, orderid], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      if (data) {
        const sql = "select id from `order` where `userid` = ? and `ostatus` = 'incart' order by `id` desc limit 1"

        con.query(sql, [user_id], (err, data) => {
          if (err) {
            return res.json(err)
          } else {
            return res.json(data)
          }
        })
      }



    }
  })

})




app.get('/nodeapp/role_data', (req, res) => {

  const sql = 'select * from role where role.delete = 0 '

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/nodeapp/role_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from role where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/role_delete', (req, res) => {

  let role_id = req.body.role_id;

  const sql = "update role set role.delete = 1 where id = ?"

  con.query(sql, [role_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/add_role', (req, res) => {
  let user_id = req.body.user_id
  let title = req.body.title;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;



  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into role(`title`,`description`,`created_by`,`created_date`) values(?,?,?,?)"
    param = [title, description, user_id, created_date]

  } else {
    sql = "update role set title = ? , description = ? , updated_by = ? ,updated_date = ? where id = ? "
    param = [title, description, user_id, created_date, u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})

app.post('/nodeapp/role_pages', (req, res) => {
  let role_id = req.body.role_id;

  const sqlSelect = "SELECT * FROM `pagerole` AS pg LEFT JOIN `page_master` AS pm ON pg.pageid = pm.id  WHERE pg.roleid = ? ORDER BY pg.id ASC";

  con.query(sqlSelect, [role_id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.length == 0) {

        const selectquery = "select COUNT(*) as count from `page_master` where deleted = 0"


        con.query(selectquery, (err, data) => {
          if (err) {
            return res.json(err)
          } else {
            const count = data[0].count

            // Insert 35 rows if data length is less than 0
            const insertRows = "INSERT INTO `pagerole` (`roleid`, `pageid`,`accessid`) VALUES ?";

            let values = [];
            for (let i = 1; i < count; i++) {
              // Assuming `roleid` and `pageid` are the columns in `pagerole` table
              values.push([role_id, i, 1]);
            }
            con.query(insertRows, [values], (insertErr, insertResult) => {
              if (insertErr) {
                return res.json(insertErr);
              } else {
                const getdata = "SELECT * FROM `pagerole` AS pg LEFT JOIN `page_master` AS pm ON pg.pageid = pm.id  WHERE pg.roleid = ? ORDER BY pg.id ASC";


                con.query(getdata, [role_id], (err, data) => {
                  if (err) {
                    return res.json(err)
                  } else {
                    return res.json(data)
                  }
                })
              }

            });

          }
        })




      }
      else {
        return res.json(data)
      }
    }
  });
});


app.post('/nodeapp/assign_role', (req, res) => {

  let rolePages = req.body


  const role_id = rolePages[0].roleid


  const sql = "delete from `pagerole` where roleid = ?"


  con.query(sql, [role_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {

      const sql = "insert into pagerole(`roleid`,`pageid`,`accessid`) VALUES ?"
      const values = rolePages.map(rolePage => [rolePage.roleid, rolePage.pageid, rolePage.accessid]);

      con.query(sql, [values], (err, data) => {
        if (err) {
          return res.json(err)
        }
        else {
          return res.json(data)
        }
      })

    }
  })






})

app.post('/nodeapp/getRoleData', (req, res) => {
  let role = req.body.role;
  let pageid = req.body.pageid;


  const sql = 'select * from `pagerole` where pageid = ? and roleid = ?'

  con.query(sql, [pageid, role], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.post('/nodeapp/delete_corporate_data', (req, res) => {

  let cat_id = req.body.cat_id;
  let tablename = req.body.tablename;

  const sql = `update ${tablename} set IsDelete = 1 where Id = ?`

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/delete_inquiry_data', (req, res) => {

  let cat_id = req.body.cat_id;
  let tablename = req.body.tablename;

  const sql = `update ${tablename} set IsDelete = 1 where Inquiry_Id = ?`

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/add_adminuser', (req, res) => {

  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let mobile = req.body.mobile;
  let email = req.body.email;
  let password = req.body.password;
  let created_date = new Date()
  let u_id = req.body.u_id;
  let user_id = req.body.user_id;
  let role = req.body.role;
  let address = req.body.address;
  let city = req.body.city;
  let state = req.body.state;
  let pincode = req.body.pincode;

  let sql;
  let param;

  if (u_id == undefined) {


    sql = "insert into awt_adminuser(`firstname`,`lastname`,`mobile`,`email`,`password`,`role`,`created_date`,`created_by`,`address`,`city`,`state`,`pincode`) values(?,?,?,?,?,?,?,?,?,?,?,?)"
    param = [firstname, lastname, mobile, email, password, role, created_date, user_id, address, city, state, pincode]

  } else {
    sql = "update awt_adminuser set firstname = ?, lastname = ?,mobile = ?, email = ?, password = ?, role = ?,updated_date = ?, updated_by = ? , address = ? , city = ? , state = ? ,pincode = ?  where id = ?"
    param = [firstname, lastname, mobile, email, password, role, created_date, user_id, address, city, state, pincode, u_id]
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

app.post('/nodeapp/adminuser_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_adminuser where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/nodeapp/adminuser_data', (req, res) => {

  const sql = "select * from awt_adminuser where deleted = 0 order by id desc"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/adminuser_delete', (req, res) => {

  let adminuser_id = req.body.adminuser_id;
  let date = new Date()

  const sql = "update awt_adminuser set deleted = 1 , deleted_date = ? where id = ?"

  con.query(sql, [date, adminuser_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

// ******************Inquiry discussion

app.post('/nodeapp/inquirydiscuss_data', (req, res) => {

  let inquiry_id = req.body.inquiry_id;

  const sql = 'select * from awt_inquirydiscussion where inquiry_id = ? and deleted = 0 '

  con.query(sql, [inquiry_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/nodeapp/inquirydiscuss_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_inquirydiscussion where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/inquirydiscuss_delete', (req, res) => {

  let role_id = req.body.role_id;

  const sql = "update awt_inquirydiscussion set deleted = 1 where id = ?"

  con.query(sql, [role_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/add_inquirydiscuss', (req, res) => {
  let user_id = req.body.user_id
  let nextdate = req.body.nextdate;
  let date = req.body.date;
  let discussion = req.body.discussion;
  let created_date = new Date()
  let u_id = req.body.u_id;
  let inquiry_id = req.body.inquiry_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into awt_inquirydiscussion(`inquiry_id`,`date`,`nextdate`,`discussion`,`created_by`,`created_date`) values(?,?,?,?,?,?)"
    param = [inquiry_id, date, nextdate, discussion, user_id, created_date]

  } else {
    sql = "update awt_inquirydiscussion set date = ? , nextdate = ? , discussion = ?, updated_by = ? ,updated_date = ? where id = ? "
    param = [date, nextdate, discussion, user_id, created_date, u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})

// ******************oadmisiion discussion

app.post('/nodeapp/getadmissiondiscussion', (req, res) => {

  let admissionid = req.body.admissionid;

  const sql = 'select * from awt_oadmissiondiscussion where admissionid = ? and deleted = 0 '

  con.query(sql, [admissionid], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/nodeapp/oadmissiondiscussion_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_oadmissiondiscussion where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.post('/nodeapp/oadmissiondiscuss_delete', (req, res) => {

  let discuss_id = req.body.discuss_id;

  const sql = "update awt_oadmissiondiscussion set deleted = 1 where id = ?"

  con.query(sql, [discuss_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/add_oadmissiondiscussion', (req, res) => {
  let user_id = req.body.user_id
  let department = req.body.department;
  let date = req.body.date;
  let discussion = req.body.discussion;
  let created_date = new Date()
  let u_id = req.body.u_id;
  let admissionid = req.body.admissionid;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into awt_oadmissiondiscussion(`admissionid`,`date`,`department`,`discussion`,`created_by`,`created_date`) values(?,?,?,?,?,?)"
    param = [admissionid, date, department, discussion, user_id, created_date]

  } else {
    sql = "update awt_oadmissiondiscussion set date = ? , department = ? , discussion = ?, updated_by = ? ,updated_date = ? where id = ? "
    param = [date, department, discussion, user_id, created_date, u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})



app.post('/nodeapp/updateAdmission', (req, res) => {

  let date = req.body.date;
  let roll = req.body.roll;
  let course = req.body.course;
  let batch = req.body.batch;
  let studentid = req.body.studentid;
  let ptype = req.body.ptype;
  let Amount = req.body.Amount;
  let Admitid = req.body.Admitid;

  const sql = "update Admission_master set Batch_Id = ? ,Admission_Date = ? , Course_Id = ? ,Student_Id = ? ,Payment_Type = ? ,Amount = ?,Student_Code = ?  where Admission_Id = ? "

  con.query(sql, [batch,date,course,studentid,ptype,Amount,roll,Admitid], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.get('/nodeapp/getannualbatch' , (req,res)=>{


    const sql = 'select bm.Batch_Id,bm.Course_Id,bm.Batch_code,bm.Category,bm.Timings,bm.SDate,bm.EDate,bm.Duration,bm.Training_Coordinator,cm.Course_Name from `Batch_Mst` as bm left join Course_Mst as cm on cm.Course_Id = bm.Course_Id where bm.IsDelete = 0 order by bm.Batch_Id desc'

    con.query(sql, (err,data) =>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})

app.get('/nodeapp/getCourse' , (req,res)=>{


    const sql = 'select Course_Id,Course_Name,Introduction,Course_Code from `Course_Mst` where IsDelete = 0 order by Course_Id desc'

    con.query(sql, (err,data) =>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})
app.get('/nodeapp/get_batchcategory' , (req,res)=>{


    const sql = 'select id,BatchCategory from `MST_BatchCategory` where IsDelete = 0'

    con.query(sql, (err,data) =>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})

app.post('/nodeapp/add_status', (req, res) => {
  let statusname = req.body.statusname;
  let description = req.body.description;
  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into Status_Master(`Status`,`Description`) values(?,?)"
    param = [statusname,description]

  } else {
    sql = "update Status_Master set Status = ? , Description = ?  where Id = ? "
    param = [statusname,description,u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})

app.get('/nodeapp/get_status' , (req,res)=>{


  const sql = 'select id,Status,Description from `Status_Master` where IsDelete = 0'

  con.query(sql, (err,data) =>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })

})

app.post('/nodeapp/Update_fees_structure' , (req,res)=>{

    let {basicinr,sevicetaxinr,totalinr,basicdoller,sevicetaxdoller,totaldoller,actualfees,fullfees,installment,duedate,pmode,beforedate,afterdate,uid} = req.body;

     const check = 'select * from Fees_Structure where batch_id = ?'

     con.query(check ,[uid],(err,data) =>{
         if(err){
             return res.json(err)
         }else{
             if(data.length == 0){

              const sql ='insert into Fees_Structure(`batch_id`,`basic_inr`,`servicetax_inr`,`total_inr`,`basic_doller`,`servicetax_doller`,`total_doller`,`actualfees`,`fullfees`,`installment`,`duedate`,`paymode`,`bdateamt`,`adateamt`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

              con.query(sql , [uid,basicinr,sevicetaxinr,totalinr,basicdoller,sevicetaxdoller,totaldoller,actualfees,fullfees,installment,duedate,pmode,beforedate,afterdate] , (err,data) =>{
                  if(err){
                      return res.json(err)
                  }else{
                      return res.json(1)
                  }
              })
             } else{

              const sql ='update Fees_Structure set basic_inr =? ,servicetax_inr =? ,total_inr = ?,basic_doller =?,servicetax_doller =?, total_doller =? ,actualfees =?,fullfees=?,installment=?,duedate=?,paymode =?,bdateamt =?,adateamt=? where batch_id = ?'

              con.query(sql , [basicinr,sevicetaxinr,totalinr,basicdoller,sevicetaxdoller,totaldoller,actualfees,fullfees,installment,duedate,pmode,beforedate,afterdate,uid] , (err,data) =>{
                  if(err){
                      return res.json(err)
                  }else{
                      return res.json(0)
                  }
              })
             }
         }
     })


})


app.post('/nodeapp/add_dicipline', (req, res) => {
  let Discipline = req.body.Discipline;

  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into MST_Deciplin(`Deciplin`) values(?)"
    param = [Discipline]

  } else {
    sql = "update MST_Deciplin set Deciplin = ?  where Id = ? "
    param = [Discipline,u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})

app.get('/nodeapp/get_dicipline' , (req,res)=>{


  const sql = 'select Id,Deciplin from `MST_Deciplin` where IsDelete = 0 '

  con.query(sql, (err,data) =>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })

})

app.get('/nodeapp/get_qualification' , (req,res)=>{


  const sql = 'select Id,Education from `MST_Education` where IsDelete = 0 '

  con.query(sql, (err,data) =>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })

})

app.post('/nodeapp/add_qualification', (req, res) => {
  let Qualification = req.body.Qualification;

  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into MST_Education(`Education`) values(?)"
    param = [Qualification]

  } else {
    sql = "update MST_Education set Education = ?  where Id = ? "
    param = [Qualification,u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})

app.get('/nodeapp/get_bank' , (req,res)=>{


  const sql = 'select Id,Bank_Name from `bank` where IsDelete = 0 '

  con.query(sql, (err,data) =>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })

})

app.post('/nodeapp/add_bank', (req, res) => {
  let Bank = req.body.Bank;

  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into bank(`Bank_Name`) values(?)"
    param = [Bank]

  } else {
    sql = "update bank set Bank_Name = ?  where Id = ? "
    param = [Bank,u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})

app.get('/nodeapp/get_feesnotes' , (req,res)=>{


  const sql = 'select Id,Perticular from `Fees_notes` where IsDelete = 0 '

  con.query(sql, (err,data) =>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })

})

app.post('/nodeapp/add_feesnotes', (req, res) => {
  let FeesNote = req.body.FeesNote;

  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into Fees_notes(`Perticular`) values(?)"
    param = [FeesNote]

  } else {
    sql = "update Fees_notes set Perticular = ?  where Id = ? "
    param = [FeesNote,u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})

app.get('/nodeapp/get_hoilday' , (req,res)=>{
  const sql = 'select Id,Holiday,Date_of_Holiday from `Holiday_master` where IsDelete = 0 '

  con.query(sql, (err,data) =>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })

})

app.post('/nodeapp/add_hoilday', (req, res) => {
  let Hoilday = req.body.Hoilday;
  let date = req.body.date;

  let u_id = req.body.u_id;
  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into Holiday_master(`Holiday`,`Date_of_Holiday`) values(?,?)"
    param = [Hoilday,date]

  } else {
    sql = "update Holiday_master set Holiday = ? , Date_of_Holiday = ? where Id = ? "
    param = [Hoilday,date,u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})

app.get('/nodeapp/get_location' , (req,res)=>{
  const sql = 'select id,LocationMaster from `Location_master` where IsDelete = 0 '

  con.query(sql, (err,data) =>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })

})

app.post('/nodeapp/add_location', (req, res) => {
  let Location = req.body.Location;


  let u_id = req.body.u_id;
  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into Location_master(`LocationMaster`) values(?)"
    param = [Location]

  } else {
    sql = "update Location_master set LocationMaster = ? where Id = ? "
    param = [Location,u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})


app.post('/nodeapp/get_Faculty', (req, res) => {

  let tablename = req.body.tablename;

  const sql = `select * from ${tablename} where IsDelete = 0 `

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/nodeapp/delete_Faculty', (req, res) => {

  let cat_id = req.body.cat_id;
  let tablename = req.body.tablename;

  const sql = `update ${tablename} set IsDelete = 1 where Faculty_Id = ?`

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/update_faculty', (req, res) => {

  let u_id = req.body.u_id;
  let tablename = req.body.tablename;


  const sql = `select * from ${tablename} where Faculty_Id  = ?`

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/nodeapp/add_faculty', (req, res) => {
  let { Faculty_Name, Faculty_Code, DOB, Nationality, IsActive, InvoiceName, Married, Joining_Date, Faculty_Type, KnowSw, TrainingCategory, Present_Address, Present_City, Present_Pin, Present_State, Present_Country, Mobile, EMail, Permanent_Address, Permanent_City, Permanent_Pin, Permanent_State, Permanent_Country, uid } = req.body;

  let sql;
  let param;

  console.log(uid);

  if (uid === undefined) {
    sql = `INSERT INTO faculty_master (Faculty_Name, Faculty_Code, DOB, Nationality, IsActive, InvoiceName, Married,Joining_Date, Faculty_Type, KnowSw, TrainingCategory, Present_Address,Present_City, Present_Pin, Present_State, Present_Country, Mobile, EMail,Permanent_Address, Permanent_City, Permanent_Pin, Permanent_State,Permanent_Country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    param = [Faculty_Name, Faculty_Code, DOB, Nationality, IsActive, InvoiceName, Married, Joining_Date, Faculty_Type, KnowSw, TrainingCategory, Present_Address, Present_City, Present_Pin, Present_State, Present_Country, Mobile, EMail, Permanent_Address, Permanent_City, Permanent_Pin, Permanent_State, Permanent_Country];

  } else {
    sql = `UPDATE faculty_master SET Faculty_Name = ?, Faculty_Code = ?, DOB = ?, Nationality = ?, IsActive = ?, InvoiceName = ?, Married = ?, Joining_Date = ?, Faculty_Type = ?, KnowSw = ?, TrainingCategory = ?, Present_Address = ?, Present_City = ?, Present_Pin = ?, Present_State = ?, Present_Country = ?, Mobile = ?, EMail = ?, Permanent_Address = ?, Permanent_City = ?, Permanent_Pin = ?, Permanent_State = ?, Permanent_Country = ? WHERE Faculty_Id = ?`;

    param = [ Faculty_Name, Faculty_Code, DOB, Nationality, IsActive, InvoiceName, Married, Joining_Date, Faculty_Type, KnowSw, TrainingCategory, Present_Address, Present_City, Present_Pin, Present_State, Present_Country, Mobile, EMail, Permanent_Address, Permanent_City, Permanent_Pin, Permanent_State, Permanent_Country, uid];
  }

  con.query(sql, param, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post('/nodeapp/getcoursewisebatch' , (req,res) =>{
    const {courseid} = req.body

    const sql = "select Batch_Id,Batch_code from Batch_Mst where Course_Id = ?"

    con.query(sql, [courseid] , (err,data)=>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})
app.post('/nodeapp/getbatchwisestudent' , (req,res) =>{
    const {batch_code} = req.body

    const sql = "SELECT sm.Student_Id,sm.Student_Name , am.Admission_Date,am.Student_Code , am.Phase FROM `Student_Master` as sm left JOIN Admission_master as am on am.Student_Id = sm.Student_Id where sm.IsDelete = 0 AND am.IsDelete = 0  AND Batch_Code =  ? "

    con.query(sql, [batch_code] , (err,data)=>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})
app.post('/nodeapp/getbatchwiselecture' , (req,res) =>{

    const {batch_id} = req.body;

    const sql = "select id, batch_id ,subject_topic from Batch_Lecture_Master where batch_id = ?"

    con.query(sql, [batch_id] , (err,data)=>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})
app.post('/nodeapp/getbatchwisemoc' , (req,res) =>{

    const {batch_id} = req.body;

    const sql = "select id, batch_id ,subject from Batch_Moc_Master where batch_id = ?"

    con.query(sql, [batch_id] , (err,data)=>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})

app.get('/nodeapp/getfaculty' , (req,res)=>{

  const sql = 'select Faculty_Id, Faculty_Name from `faculty_master` where IsDelete = 0 '

  con.query(sql, (err,data) =>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })

})

app.post('/nodeapp/getbatchwiseassignment' , (req,res) =>{

    const {batch_id} = req.body;

    const sql = "select id, batch_id ,assignmentname , marks ,assignmentdate from assignmentstaken where batch_id = ?"

    con.query(sql, [batch_id] , (err,data)=>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})

app.post('/nodeapp/getbatchwiseunittest', (req, res) => {

  const { AnnulBatch } = req.body

  const sql = "select id,utname from awt_unittesttaken where batch_id = ? and deleted = 0"

  con.query(sql, [AnnulBatch], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get('/nodeapp/getassignmentstakendata' , (req,res)=>{

  const sql = 'SELECT ast.Given_Id ,ast.Assign_Dt,ast.Return_Dt, cm.Course_Name , bm.Batch_code FROM `Assignment_taken` as ast LEFT JOIN Course_Mst as cm on ast.Course_Id = cm.Course_Id LEFT JOIN Batch_Mst as bm on  ast.Batch_Id = bm.Batch_Id LEFT JOIN faculty_master as fm on ast.Faculty_Id = fm.Faculty_Id WHERE ast.IsDelete = 0 order by ast.Given_Id asc';

  con.query(sql, (err,data)=>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })
})



app.get('/nodeapp/getunittesttakendata' , (req,res)=>{

  const sql = 'SELECT ast.Take_Id ,ast.Test_Dt , cm.Course_Name , bm.Batch_code FROM `Test_taken_master` as ast LEFT JOIN Course_Mst as cm on ast.Course_Id = cm.Course_Id LEFT JOIN Batch_Mst as bm on  ast.Batch_Id = bm.Batch_Id  WHERE ast.IsDelete = 0 order by ast.Take_Id asc';

  con.query(sql, (err,data)=>{
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })
})
app.post('/nodeapp/process_admission', (req, res, next) => {

  let {Student_Id,Course_Id,Batch_Id,Amount,Admission_Dt} = req.body

  const sql = 'insert into Admission_master(`Student_Id`,`Course_Id`,`Batch_Id`,`Amount`,`Admission_Date`) values(?,?,?,?,?)'

 con.query(sql,[Student_Id,Course_Id,Batch_Id,Amount,Admission_Dt],(error, data) => {

   if (error) {
     return res.json(error);
   } else {
       const updatestudent = 'update Student_Master set Admission = 1 where Student_Id = ?'

       con.query(updatestudent , [Student_Id], (err,data) =>{
           if(err){
               return res.json(err)
           }else{

               const sql = "update Student_Inquiry set Admission = 1 where Student_Id = ?"
               con.query(sql , [Student_Id] , (err,data) =>{
                   if(err){
                       return res.json(err)
                   }else{
                       return res.json()
                   }
               })
           }
       })
   }
 })

})


app.get('/nodeapp/getvivamoctakendata' , (req,res)=>{

  const sql = 'SELECT ast.Take_Id ,ast.Take_Dt , cm.Course_Name , bm.Batch_code FROM `viva_taken` as ast LEFT JOIN Course_Mst as cm on ast.Course_Id = cm.Course_Id LEFT JOIN Batch_Mst as bm on  ast.Batch_Id = bm.Batch_Id  WHERE ast.IsDelete = 0 order by ast.Take_Id asc';

  con.query(sql, (err,data)=>{
      if(err){
          return res.json(err)
      }else{
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


app.get('/nodeapp/getcoursecode' , (req,res)=>{

  const sql = 'select * from Course_Mst ';

  con.query(sql, (err,data)=>{
      if(err){
          return res.json(err)
      }else{

          const getlength = data.length + 1
          return res.json({code : getlength})
      }
  })
})




app.post('/nodeapp/update_batch', (req, res) => {
  let { selectcourse, batchcategory, timings, coursename, planned, admissiondate, duration, coordinator, eligibility, targetstudent, passingcriteria, comments, briefdescription, attachment, documentrequire, todate, uid } = req.body
  let sql
  let param;
  sql = "update `Batch_Mst` set Course_Id = ? , Category =? , Timings = ? , CourseName = ? ,SDate = ? ,Admission_Date = ?,Duration = ? ,Training_Coordinator = ? ,Min_Qualifiaction = ? ,Max_Students = ? , Passing_Criteria = ? , Comments = ? ,Course_description = ? ,Attachment = ? ,Documents_Required = ? ,EDate = ?  where `Batch_Id` = ?"
  param = [selectcourse, batchcategory, timings, coursename, planned, admissiondate, duration, coordinator, eligibility, targetstudent, passingcriteria, comments, briefdescription, attachment, documentrequire, todate, uid]
  con.query(sql, param, (err, data) => {
    if (err) {
      return res.json(err)
    }else{
      sql = "update `Course_Mst` set Course_Name = ? where Course_Id = ?"
      param = [coursename, selectcourse]
      con.query(sql, param, (err, data) => {
        if (err) {
          return res.json(err)
        } else {
          return res.json(data)
        }
      })
    }
  })
})


app.post('/nodeapp/getprintinfo' , (req,res) =>{

  let {id} = req.body;

  const sql = "SELECT * FROM `Admission_master` as a left join `Student_Master`as o on a.Student_Id = o.Student_Id WHERE Admission_Id = ? "

  con.query(sql , [id],(err,data) => {
      if(err){
          return res.json(err)
      }else{
          return res.json(data)
      }
  })

})
