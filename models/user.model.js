const mongoose =require('mongoose')


const userSchema=mongoose.Schema({
    first_name: String,
    last_name: String,
    usrename: String,
    email: String,
    password: String


},{
    timestamps: true
})

module.exports = mongoose.model('user',userSchema)
