import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import BatchEdit from "./BatchEdit";
import InnerHeader from "./InnerHeader";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SiteVise = () => {

  const [open, setOpen] = React.useState(false);
  const { batchid } = useParams();
  const [uid, setUid] = useState([])
  const [data, setData] = useState([])
  const [info, setInfo] = useState([]);
  

  async function getUnitTest() {

    const data ={
      batch_id : batchid
    }

    axios.post(`${BASE_URL}/batch_site_vise`,data)

      .then((res) => {

        if(res.data[0]){
          
          setInfo(res.data[0])
        }
      })

  }

  useEffect(() => {
    getUnitTest();
  }, [batchid]);

  const [value, setValue] = useState({
    company: "" || info.company,
    contact_person: "" || info.contact_person,
    designation: "" || info.designation,
    phone: "" || info.phone,
    visit_date: "" || info.visit_date,
    address: "" || info.address,

    subject: "" || uid.subject,
    exam_date: "" || uid.exam_date,
    max_mark: "" || uid.max_marks,
    duration: "" || uid.duration,

  })

  async function getexam() {
    const data = {
      batch_id: batchid
    }
    axios.post(`${BASE_URL}/batch_exam_data`, data)
      .then((res) => {
     
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getexam()

    setValue({
      company: info.company,
      contact_person: info.contact_person,
      designation: info.designation,
      phone: info.phone,
      visit_date: info.visit_date,
      address: info.address,


      subject: uid.subject,
      exam_date: uid.exam_date,
      max_mark: uid.max_marks,
      duration: uid.duration,

    })
  }, [uid,info])

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }





  const getupdatedata = (id) => {

    setOpen(true)

    const data = {
      u_id: id,
      uidname: "id",
      tablename: "awt_batch_exam"
    }
    axios.post(`${BASE_URL}/new_update_data`, data)
      .then((res) => {
        setUid(res.data[0])


      })
      .catch((err) => {
        console.log(err)
      })
  }


  const handleDelete = (id) => {
    const data = {
      cat_id: id,
      tablename: "awt_batch_exam",

    }

    axios.post(`${BASE_URL}/delete_data`, data)
      .then((res) => {
        getUnitTest()
      })
      .catch((err) => {
        console.log(err)
      })

 
  }








  const handleVisitSubmit = (e) => {
    e.preventDefault()

    const data = {
      company: value.company,
      contact_person: value.contact_person,
      designation: value.designation,
      phone: value.phone,
      visit_date: value.visit_date,
      address: value.address,
      batchid: batchid,
      uid:info.id
    }



    axios.post(`${BASE_URL}/add_vist_data`, data)
      .then((res) => {
    alert("Data Added successfully")
        setOpen(false)

      })

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      subject: value.subject,
      exam_date: value.exam_date,
      max_mark: value.max_mark,
      duration: value.duration,
      batchid: batchid,
      uid:uid.id
    }

    axios.post(`${BASE_URL}/add_exam_data`, data)
      .then((res) => {
        getexam()
        alert("Data Added successfully")
        setOpen(false)

      })

  }




  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      <div className="main-pannel">
        <div className="content-wrapper ">
          <BatchEdit batchid={batchid} />
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card_body">
                  <h4 className="card-title pl-3 pt-3" >Site Visit Details</h4>
                  <form onSubmit={handleVisitSubmit} className="p-3 ">
                    <div className="row justify-content-center" >
                      <div className="p-3" style={{ width: "100%" }}>
                        <div className="row">
                          <div className="col-lg-12 row ">
                            <div className="form-group col-lg-3 ">
                              <label for="exampleInputUsername1">Company :</label>
                              <input type="text" class="form-control" id="exampleInputUsername1" value={value.company} placeholder="Company" name="company" onChange={handleChange} />
                            </div>
                            <div className="form-group col-lg-3 ">
                              <label for="exampleInputUsername1">Contact Person :	</label>
                              <input type="text" class="form-control" id="exampleInputUsername1" value={value.contact_person} placeholder="Contact Person" name="contact_person" onChange={handleChange} />
                            </div>
                            <div className="form-group col-lg-3 ">
                              <label for="exampleInputUsername1">Designation :</label>
                              <input type="text" class="form-control" id="exampleInputUsername1" value={value.designation} placeholder="Designation" name="designation" onChange={handleChange} />
                            </div>
                            <div className="form-group col-lg-3 ">
                              <label for="exampleInputUsername1">Phone :</label>
                              <input type="number" class="form-control" id="exampleInputUsername1" value={value.phone} placeholder="Phone" name="phone" onChange={handleChange} />
                            </div>
                          </div>
                          <div className="col-lg-12 row ">
                            <div className="form-group col-lg-3 ">
                              <label for="exampleInputUsername1">Visit Date :</label>
                              <input type="date" class="form-control" id="exampleInputUsername1" value={value.visit_date} placeholder="0" name="visit_date" onChange={handleChange} />
                            </div>
                            <div className="form-group col-lg-6 ">
                              <label for="exampleInputUsername1">Address :</label>
                              <textarea class="form-control form-control-lg" id="exampleTextarea1" placeholder="Address" value={value.address} name='address' onChange={handleChange} rows={`3`} ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row p-2 gap-2">
                      <button className='mr-2 btn btn-primary'>Save</button>
                      {/* <button className='col-2'>close</button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card">
                <div className="card_body">
                  <h4 className="card-title pl-3 pt-3" >Final Exam Details</h4>
                  <form onSubmit={handleSubmit} className="p-3 ">
                    <div className="row" >
                      <div className="row p-3" style={{ width: "100%" }}>
                        <div className="col-lg-12">
                          <b className="d-flex justify-content-between"><p className="w-25 text-center ">Subject</p><p className="w-25 text-center ">Exam Date</p><p className="w-25 text-center ">Max Marks</p><p className="w-25 text-center ">Duration</p><p className="w-25 text-center ">Action</p></b>
                          {data.map((item) => {
                            return (
                              <b className="d-flex justify-content-between"><p className="w-25 text-center ">{item.subject}</p><p className="w-25 text-center ">{item.exam_date}</p><p className="w-25 text-center ">{item.max_marks}</p><p className="w-25 text-center ">{item.duration}</p><p className="w-25 text-center "><span style={{ cursor: "pointer" }} onClick={() => getupdatedata(item.id)} >Edit</span> / <span style={{ cursor: "pointer" }} onClick={() => handleDelete(item.id)} >Delete</span></p></b>
                            )
                          })}
                        </div>
                        <div className="row col-lg-10 " >
                          <div className="col-lg-12 row ">
                            <div className="form-group col-lg-3 ">
                              <label for="exampleInputUsername1">Subject</label>
                              <input type="text" class="form-control" id="exampleInputUsername1" value={value.subject} placeholder="Subject" name="subject" onChange={handleChange} />
                            </div>
                            <div className="form-group col-lg-3 ">
                              <label for="exampleInputUsername1">Exam Date	</label>
                              <input type="date" class="form-control" id="exampleInputUsername1" value={value.exam_date} placeholder="Exam Date" name="exam_date" onChange={handleChange} />
                            </div>
                            <div className="form-group col-lg-3 ">
                              <label for="exampleInputUsername1">Max Marks</label>
                              <input type="number" class="form-control" id="exampleInputUsername1" value={value.max_mark} placeholder="Max Marks" name="max_mark" onChange={handleChange} />
                            </div>
                            <div className="form-group col-lg-3 ">
                              <label for="exampleInputUsername1">Duration</label>
                              <input type="text" class="form-control" id="exampleInputUsername1" value={value.duration} placeholder="Duration" name="duration" onChange={handleChange} />
                            </div>
                          </div>
                        </div>



                    <div className="row align-items-center justify-content-center col-lg-2  p-2 gap-2">
                      <button className='mr-2 btn btn-primary'>Save</button>
                      {/* <button className='col-2'>close</button> */}
                    </div> </div>  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteVise;
