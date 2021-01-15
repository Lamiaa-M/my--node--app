const app= require('express').Router()
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');


app.get('/',(req,res)=> {
 res.render('index.ejs')

});

app.post('/handelLogin',async(req,res) =>{

    console.log(req.body);

    const {email,password} = req.body
    const user=await userModel.findOne({email})
    console.log(user);
    if (user ==null){
        res.redirect('/')
    }
    else{
        const match = await bcrypt.compare(password, user.password);
 
        if(match) {
            req.session.userID = user._id;
            req.session.username = user.usrename;
            req.session.isLoggedIn = true;


            res.redirect('/home/'+ {userID :req.session.userID })
        }
    
       else {
        res.redirect('/')
    }
}
   
});

module.exports=app
