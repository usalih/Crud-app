const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const app = express();

//const connectDB = require('./server/database/connection');

const routes  = require('./server/routers/router');

// configure environment
dotenv.config({path: 'config.env'})

// log requests
app.use(morgan('tiny'));

// mongodb Connection
//connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/', routes);

//Start the server
const PORT = process.env.PORT || 5050
app.listen(PORT, ()=> {console.log('server in running on port: ', {PORT})});