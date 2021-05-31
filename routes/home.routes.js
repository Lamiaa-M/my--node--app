const app= require('express').Router()
const postModel=require('../models/post.model')
const userModel = require('../models/user.model')

let userID ;
let url ;
let date=[];

  app.get('/home/:id',async(req,res)=> {
    if(req.session.isLoggedIn == true){

        userID=req.params.id
        url=req.url
       const posts = await postModel.find({}).populate("userID")
      // const postName = await userModel.find(posts.userID)
        for(var i =0 ; i< posts.length ; i++)
      {
       const updatedAt =new Date(posts[i].updatedAt).toDateString();
         date.push(updatedAt);

      }
     
        res.render('home.ejs',{posts, name: req.session.username ,userID ,url , date })
    }
    else{

        res.redirect('/')
    }
   
   });
   
   app.post('/handelPost',async(req,res) =>{
    if(req.session.isLoggedIn == true){
    //console.log(req.body);
    const {title, post}= req.body
    await postModel.insertMany({title, post,userID : req.session.userID })

    res.redirect('/home/'+userID)
    }
else {
    res.redirect('/')
    }
  
});




module.exports = app
