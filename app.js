require('dotenv').config();

const express           = require('express');
const logger            = require('morgan');
const path              = require('path');
const methodOverride    = require('method-override');
const session           = require('express-session');
const bodyParser        = require('body-parser');
const app               = express();
const userRoute         = require('./routes/user');
const homeRoute         = require('./routes/home');
const partiesRoute      = require('./routes/parties');
const port              = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

// Adding session as a middleware
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'sooopersekret',
  cookie: {maxAge: 6000000}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/parties', partiesRoute);

app.listen(port, () => {
  console.log('Server is listening on port ', port);
})
