const mongoose =require('mongoose')


const userSchema=mongoose.Schema({
    first_name: String,
    last_name: String,
    usrename: String,
    email: { type :String,unique: true }
    password: String

})

module.exports = mongoose.model('user',userSchema)
