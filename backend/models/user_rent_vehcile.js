const mongoose=require('mongoose');

const userRentVehicleSchema=new mongoose.Schema({

  first_name:{
    type:String,require:true
  },
  last_name:{
    type:String,require:true
  },
  no_of_wheels:{
    type:Number,require:true
  },
  type:{
    type:String,require:true
  },
  model:{
    type:String,require:true
  },
  start_date:{
    type:Date,require:true
  },
  end_date:{
    type:Date,require:true
  },
   

},{
  timestamps:true
});

const VehicleRentDetail=mongoose.model('user_rent_vehicle_detail',userRentVehicleSchema);
module.exports=VehicleRentDetail;


