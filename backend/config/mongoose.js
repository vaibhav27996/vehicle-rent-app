const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/db_vehicle_rent');


const db=mongoose.connection;

db.on('error',(err)=>{console.log("Error in connnecting db",err)});

db.once('open',(err)=>{
    console.log("Connected to db");
});

module.exports=db;