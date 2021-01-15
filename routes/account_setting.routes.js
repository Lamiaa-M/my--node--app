const app = require('express').Router()

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const validation = require("../validation/validation.changePassword");
const { validationResult } = require('express-validator');
let url ;

app.get('/account_setting',(req,res)=>{

    if(req.session.isLoggedIn == true){
        url=req.url
       let passInputsError = req.flash("passInputsError");
       let passOldInputs = req.flash("passOldInputs")[0];
       if (passOldInputs == undefined){
           passOldInputs={
               oldPassword :'',
               newPassword:'',
               repeatPassword:""

           }
       }

    res.render('account_setting.ejs',{name: req.session.username , userID: req.session.userID ,url ,passOldInputs ,passInputsError })
    }
    else {
        res.redirect('/index')
    }
});

app.post('/account_setting',validation ,async(req,res)=>{ 
    const errors =validationResult(req);
    if (errors.isEmpty()){
        const user = await userModel.findOne({_id:req.session.userID})
        const {oldPassword,newPassword,repeatPassword}= req.body;
    
        const match = await bcrypt.compare( oldPassword, user.password);
    
        if(match){
            bcrypt.hash(newPassword, 8, async(err, hash) => {
                await userModel.findOneAndUpdate({ _id: req.session.userID},{password : hash})    
                console.log("Password updated") ;
                req.flash("passinputsError", errors.array());
                req.flash("passinputsError", errors.body);
                res.redirect("/account_setting");
    
    
    
            })
        } 
        else 
        {
            console.log("Password not Updated") ;
            req.flash("passinputsError", errors.array());
            req.flash("passinputsError", errors.body);
            res.redirect("/account_setting");
        }

    }
    else 
    {
        req.flash("passinputsError", errors.array());
        req.flash("passinputsError", errors.body);


        res.redirect("/account_setting");

    }

   
    });

module.exports= app