const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

// configure environment
dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 5050

// log requests
app.use(morgan('tiny'));

// mongodb Connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/', require('.server/routers/router'))

app.listen(PORT, ()=> {console.log('server in running on port: ', {PORT})});