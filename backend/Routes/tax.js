const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/pages', (req,res) =>{

    const sql = "select * from awt_banner"

    db.query(sql ,  (err,data) =>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})




module.exports = router