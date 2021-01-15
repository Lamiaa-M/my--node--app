const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');


var store = new MongoDBStore({
    uri: 'mongodb+srv://lamiaa:lamiaa@cluster0.0sc51.mongodb.net/App',
    collection: 'mySessions'
  });
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store
  
}))
app.use(flash());
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'puplic')))
app.use(express.urlencoded({extended: false }))

app.use(require('./routes/index.routes'))
app.use(require('./routes/account_setting.routes'))
app.use(require('./routes/home.routes'))
app.use(require('./routes/profile.routes'))
app.use(require('./routes/registration.routes'))


mongoose.connect('mongodb+srv://lamiaa:lamiaa@cluster0.0sc51.mongodb.net/App', { useNewUrlParser: true, useUnifiedTopology: true })




app.listen(process.env.PORT ||port, () => {
    console.log(`Example app listening on port port!`)
});