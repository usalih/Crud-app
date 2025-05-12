require('dotenv').config();
const mongoose = require('mongoose');
// const express = require('express');
const express = require('express');
const PORT = process.env.PORT || 5050;
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const app = express();

const connectDB = require('./server/database/connection');

const route  = require('./server/routers/router');

// configure environment
dotenv.config({path: 'config.env'})

// log requests
app.use(morgan('tiny'));

// mongodb Connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/', route);

//Start the server
app.listen(PORT, ()=> {console.log('server in running on port: ', {PORT})});