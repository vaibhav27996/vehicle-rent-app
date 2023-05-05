
import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wheels from "./Wheels";
import BannerImage from './BannerImage';

const UserName=() =>{
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [isShownOne, setIsShownOne] = useState(false);
    const [wheel,setWheel]=useState([]);
   
      //when fname and lname will enter,then only wheels component will shown otherwise not 
      const handleClickOne = event => {
         if(!fname && !lname){
            toast.error("Please fill first name and last name fields!");
         }else{
            setIsShownOne(true);
         }
      };

      //Fetching wheel option to show in wheel component page
      const fetchData= async()=>{
         const data=await fetch('http://localhost:8000');

         const getDataList=await data.json();
         setWheel(getDataList);
      }
  
      useEffect(() => {
         fetchData();
      },[]);

      return (
         <div className='container'>
            {!isShownOne && <>
               <div className='row'>
                  <div className='col-12 col-sm-12 col-lg-5 col-md-5 mt-2'>
                     <div className="box">
                        <h3>First, What is your name?</h3>
                        <label  for="fname">First Name</label><br />
                        <input type="text" 
                           name="firstName" 
                           className="form-control mt-2"
                           placeholder="Enter First Name" 
                           onChange={(e)=>{setFname(e.target.value)}}
                           autoComplete="off"
                        /> <br />

                        <label for="lname">Last Name</label><br />
                        <input type="text" 
                           name="lastName" 
                           className="form-control mt-2"
                           placeholder="Enter Last Name" 
                           autoComplete="off"
                           onChange={(e)=>{setLname(e.target.value)}}
                        /> <br /><br />
                        
                        <button  className='btn btn-md btn-info text-center next-button' onClick={()=>handleClickOne(true)}>Next </button>
                     </div>
                  </div>

                  <div className="col-md-7 col-lg-7">
                     <BannerImage />
                  </div>
               </div>
               </>
            }

            {isShownOne && 
            <Wheels fname={fname} 
                     lname={lname} 
                     wheels={wheel} 
                     setIsShownOne={setIsShownOne}
                     setLname={setLname}
                     setFname={setFname}/>}
        
         </div >
      )
}
export default UserName;