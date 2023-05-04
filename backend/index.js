// For backend and express
const express = require('express');
const app = express();
const port=8000;
const cors = require("cors");
const db=require('./config/mongoose');
const VehicleDetail=require('./models/vehicle_detail');
const UserRentVehicle=require('./models/user_rent_vehcile');


app.use(express.json());
app.use(cors());

app.get('/',async(req,res)=>{
  try {
    
    //sending the wheels option to wheel page with the help of state props
    let projectList=await VehicleDetail.find({});
    res.send(projectList);

  } catch (e) {
      res.send("Something Went Wrong");
  }

});


app.get('/wheel',async(req,res)=>{
  try {
    //sending vehicle types option to types page 
    let wheelsDetail=await VehicleDetail.find({wheels:req.query.wheel});
    
    res.send(wheelsDetail);

  } catch (e) {
    res.send("Something Went Wrong");
  }

});

app.get('/type',async(req,res)=>{
  try {
    
    //sending model option to model page
    let typesDetails=await VehicleDetail.find({wheels:req.query.wheel},{types:1,_id:0});
    
    for(let value of typesDetails){
       
      for(let type of value.types){
        if(type.hasOwnProperty(req.query.type)) {
            res.send(type[req.query.type]);
          }
       }

    }
    

  } catch (e) {
      res.send("Something Went Wrong");
  }

});

app.post('/create',async(req,res)=>{
  try {
   
    const userRent = new UserRentVehicle(req.body);
    let result = await userRent.save();
   
    if (result) {
      res.send("Vehicle Rented successfully ");
    } 

  } catch (e) {
      res.send("Something Went Wrong");
  }

});

app.listen(port,(err)=>{
    if(err){
      console.log("error",err);
    }
  
    console.log("Server is running on port",port);
  })