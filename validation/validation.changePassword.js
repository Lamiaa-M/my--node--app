const { check } = require('express-validator');

module.exports= [
check('oldPassword').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
check('newPassword').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
check('repeatPassword').custom((value,{ req })=>{
    if(value !== req.body.newPassword){
        throw new Error('password dose not match');
    }
    return true;

})


]