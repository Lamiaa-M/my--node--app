const app = require('express').Router()
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const validation = require('../validation/validation.register')

app.get('/registration', (req, res) => {
   let oldInputs = req.flash('oldInputs')[0]
  if (oldInputs == undefined) {
    oldInputs = {first_name: '',last_name: '',usrename: '',email: '',password: ''}
  }
  res.render('registration.ejs', { error: req.flash('error'),oldInputs})

});

app.post('/handelRegistar', validation,
  async (req, res) => {
    const error = validationResult(req)
    console.log(error.array());
    console.log(error.isEmpty());
    const { first_name, last_name, usrename, email, password } = req.body
    if (error.isEmpty() == true) {
      bcrypt.hash(password, 8, async function (err, hash) {
        await userModel.insertMany({ first_name, last_name, usrename, email, password: hash })
        res.redirect('/')
      });
    }
    else {
      req.flash('error', error.array())
      req.flash('oldInputs', req.body)

      res.redirect('/registration')
    }

  });
module.exports = app
