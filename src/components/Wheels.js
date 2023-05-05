import { useState} from "react";
import VehicleType from "./VehicleType";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerImage from './BannerImage';

const Wheels = (props) => {
   const [isShownTwo, setIsShownTwo] = useState(false);
   const [selectWheel, setSelectWheel] = useState("");
   const [types, setTypes] = useState([]);

   //when wheel will select,then only types component will shown otherwise not 
   const handleClickTwo = (event) => {
      if(!selectWheel){
         toast.error("Please select no of wheels!");
      }else{
         setIsShownTwo(true);
      }
   };

   //when u r trying to go back,erase all set value 
   //,Without erase when trying to click on save button it will render next componnent to overcomethat
   const backFromWheel=()=>{
      props.setIsShownOne(false);
      props.setFname("");
      props.setLname("");
   }

  
   //Fetching the types options as per select wheel which will show in types component
   function handleWheelsEvent(e) {
      setSelectWheel(e.target.value);

      const getWheelDetails = async () => {
         const data = await fetch("http://localhost:8000/wheel?wheel=" + e.target.value);

         const getWheelsDetails = await data.json();

         setTypes(getWheelsDetails[0].types);
      };

      getWheelDetails();
   }

   return (
      <div className="container">
         {!isShownTwo && (<>
            <div className='row'>
               <div className='col-12 col-sm-12 col-lg-5 col-md-5 mt-2'>
                  <div className="box">
                     <h3>How many no of wheels vehicle you have to select ?</h3>
                     {props.wheels.map((item, idx) => {

                        return ( 
                           <>&nbsp;&nbsp;&nbsp;&nbsp;
                              <input type="radio"
                                 name="wheels"
                                 className="pl-3"
                                 id={item.wheels}
                                 value={item.wheels}
                                 onChange={handleWheelsEvent}
                              />&nbsp;&nbsp;&nbsp;
                              <label for={item.wheels}>{item.wheels}</label><br /><br />
                     
                           </>
                        );
                     })}

                     <div className="row">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 pt-2">
                           <button  className="btn btn-md btn-info text-center back-button-sm" 
                                    onClick={() => backFromWheel()}> Back</button>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 pt-2">
                           <button  className='btn btn-md btn-info text-center next-button-sm' 
                                    onClick={()=>handleClickTwo(true)}>Next </button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-md-7 col-lg-7">
                  <BannerImage />
               </div>
            </div>
         </>
      )}

      {isShownTwo && (
        <VehicleType fname={props.fname} 
               selectWheel={selectWheel} 
               lname={props.lname} 
               types={types}
               setIsShownOne={props.setIsShownOne}
               setIsShownTwo={setIsShownTwo}
               setFname={props.setFname}
               setLname={props.setLname}
               setSelectWheel={setSelectWheel} /> )}
    </div>
  );
};
export default Wheels;
