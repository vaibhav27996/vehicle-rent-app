import { Link, useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';
import DatePickers from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DatePicker=(props) =>{
    const [startDate,setStartDate]=useState("");
    const [endDate,setEndDate]=useState("");
    const navigate = useNavigate();

    const backFromBooking=()=>{
      props.setIsShownFour(false);
      props.setSelectModel("");
      
    }

    //Saving all the data which is coming from starting page in database
    const handleInputForSave=async (e)=>{
      e.preventDefault();

         if(!startDate && !endDate){
            toast.error("Please select start and end date!");
         }else{
            let result = await fetch('http://localhost:8000/create', {
               method: "post",
               body: JSON.stringify({ 
                  first_name:props.fname,
                  last_name:props.lname,
                  no_of_wheels:props.selectWheel,
                  type:props.selectType,
                  model:props.selectModel ,
                  start_date:startDate,
                  end_date:endDate
              }),
               headers: {
                'Content-Type': 'application/json'
               }
            });

            //after saving to database erase all the value when u are trying to add new user from home page
            props.setIsShownOne(false);
            props.setFname("");
            props.setLname("");
            props.setSelectWheel("");
            props.setSelectType("");
            props.setSelectModel("");
            setStartDate("");
            setEndDate("");
            toast.success("Vehicle booking successfully");
         }
      }
      
  

      return (
         <div className='container'>
            <div className='row'>
               <div className='col-12 col-sm-12 col-lg-5 col-md-5 mt-5'>
                  <div className="box" style={{height:490}}>
                     <h3>Select start and end date for book vehicle for rent?</h3>
                     <div className="row mt-2">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                           <label>First Name : {props.fname}</label> 
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                           <label>Last Name : {props.lname}</label> 
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                           <label>No of Wheels : {props.selectWheel}</label> 
                        </div>
                     </div>


                     <div className="row">    
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                           <label>Vehicle Type : {props.selectType}</label> 
                        </div>
                     </div>

                     <div className="row">    
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                           <label>Vehicle Model : {props.selectModel}</label> 
                        </div>
                     </div><hr className="text-light" />

                     <div className="row">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                           <label for="s_date">Start Date</label> <br/>
                           <input type="date" 
                              name="start_date" 
                              className="form-control" 
                              id="s_date" 
                              onChange={(e)=>{setStartDate(e.target.value)}} />
                        </div>

                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 ">
                           <label for="e_date">End Date</label> <br/>
                           <input type="date" 
                              name="end_date" 
                              className="form-control" id="e_date" 
                              onChange={(e)=>{setEndDate(e.target.value)}} />
                        </div>
                     </div> <br />    

                     <div className="row">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 pt-2">
                           <button  className="btn btn-md btn-info text-center back-button-sm"
                                 onClick={() => backFromBooking()}> Back</button>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 pt-2">
                           <button className="btn btn-md btn-info text-center next-button-sm" 
                                 onClick={handleInputForSave}>Save</button> 
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-md-7 col-lg-7">
                  <img src="https://cdn.dribbble.com/users/2942570/screenshots/7472419/media/989f77debea4fae60e30bc8cc47eb374.png?compress=1&resize=400x300&vertical=top" 
                          className="hideForMobile" />
               </div>
            </div> 
         </div >
      )
}
export default DatePicker;