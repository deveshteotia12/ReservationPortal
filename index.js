require('dotenv').config();

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require('./Authentication/passport')
const Database=require("./database/db")();
const userModel=require("./Model/userModel")
const mongoose=require("mongoose");
const myfunc=require("./Utils/impFunc")
const MongoStore = require("connect-mongo")(session);
initializePassport(
  passport,
  myfunc.findUserByEmail,
  myfunc.findUserById
)

app.set('view engine', 'ejs')

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(
  session({
  secret: process.env.mySecret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static("public"));


//ROUTES
app.use('/',require("./routes/main"));
app.use('/reservation',require("./routes/reservation"))
app.use('/edit',require("./routes/Edit"));

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})



app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(3000,()=>{
    console.log("LISTENING")
})