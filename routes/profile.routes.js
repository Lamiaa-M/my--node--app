const app=require('express').Router()
const postModel = require('../models/post.model')

let userID ;
let url ;

app.get('/profile/:id',async(req,res)=>  {
    if(req.session.isLoggedIn == true) {

        userID=req.params.id
        url=req.url

    const posts = await postModel.find({ userID :req.session.userID })
    //console.log(posts)
    res.render('profile.ejs',{posts, name: req.session.username , userID })
    }
    else{
        res.redirect('/')
    }
});

app.get('/delete/:id',async(req,res)=>{

    await postModel.findByIdAndDelete({_id: req.params.id})

    res.redirect('/profile/'+userID)

})


module.exports=app
