const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');
const connectDb = require('./db/connect');
require('dotenv').config();


// Middleware
app.use(express.static('./public'));
app.use(express.json());

// router
app.get('/',(req,res)=>{
    res.send("Task Manager App");
});

app.use('/api/v1/tasks',tasks);
app.use('/api/v1/tasks/:id',tasks);

const port = 3000;

const start = async ()=>{
    try{
        await connectDb(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log('Server is running on port 3000');
        })
    }catch(err){
        console.log(err);
    }
};

start();