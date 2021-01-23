const mongoose =require('mongoose')


const postSchema=mongoose.Schema({
    title:String,
    post: String,
    userID: { type: mongoose.Schema.Types.ObjectId ,ref: "user"  }


},{
    timestamps: true
})
module.exports = mongoose.model('post',postSchema)
