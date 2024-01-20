const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let tasks = require('./routes/tasks');
let users = require('./routes/users');

// DATABASE
mongoose
.connect(process.env.MONGODB_ATLAS_URL)
.then(()=>{
    console.log("Mongodb Connected Successfully");
})
.catch((err)=>{
    console.log("Problem in connecting", err.message, err);
})
// ====================


// STARTING THE SERVER
const app = express();
const port = process.env.PORT || 3000;
app.set('port',port);
const server = http.createServer(app);
// ====================


// APPLYING MIDDLEWARE
app.use("/images", express.static(path.join('images')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
})
// ====================

// 
app.use('/api/tasks/', tasks);
app.use('/api/users/', users);

// ====================




// SERVER LOOKING FOR ERRORS
server.on('error',(error)=>{
    console.log("Error in server!!", error.message, error)
    
})
// SERVER LISTENING
server.on('listening',()=>{
    console.log(`The server is listening at port ${port}...`)
});
server.listen(port);
// ====================



