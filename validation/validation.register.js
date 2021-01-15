const { check } = require('express-validator');

module.exports= [check('first_name').matches(/[A-Z][a-z]*/),
check('last_name').matches(/[A-Z][a-z]*/),
check('usrename').matches(/[A-Z][a-z]*/),
check('email').isEmail(),
check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
]