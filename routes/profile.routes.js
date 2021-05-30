const app=require('express').Router()
const postModel = require('../models/post.model')

let userID ;
let url ;
let date =[];

app.get('/profile/:id',async(req,res)=>  {
    if(req.session.isLoggedIn == true) {

        userID=req.params.id
        url=req.url

    const posts = await postModel.find({ userID :req.session.userID })
    for(var i =0 ; i<posts.length ; i++)
      {
        const updatedAt  =new Date(posts[i].updatedAt).toDateString();
        date.push(updatedAt);
 

      }
         res.render('profile.ejs',{posts, name: req.session.username , userID ,date })
    }
    else{
        res.redirect('/')
    }
});

app.get('/delete/:id',async(req,res)=>{

    await postModel.findByIdAndDelete({_id: req.params.id})

    res.redirect('/profile/'+userID)

})

app.post('/EditPost/:id',async(req,res) =>{
    if(req.session.isLoggedIn == true){
    const {title, post}= req.body
    await postModel.findByIdAndUpdate({_id: req.params.id},{title,post})
   res.redirect('/profile/'+userID)
    }
else {
    res.redirect('/')
    }
  
});

module.exports=app
