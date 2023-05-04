const mongoose=require('mongoose');

const vehicleDetailSchema=new mongoose.Schema({
    wheels:{
      type:"Number"
    },

    types:[
        {
          type: Object 
        }
    ]
   

},{
  timestamps:true
});

const VehicleDetail=mongoose.model('Vehicle_Detail',vehicleDetailSchema);
module.exports=VehicleDetail;


