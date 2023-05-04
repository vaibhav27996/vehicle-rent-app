import { useState,useEffect } from "react";
import VehicleModel from './VehicleModel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerImage from "./BannerImage";

const VehicleType=(props) =>{
	const [showType,setShowType]=useState([]);
	const [isShownThree, setIsShownThree] = useState(false);
	const [selectType, setSelectType] = useState("");
	const [models, setModels] = useState("");

	//Fetching the model opton as per select type, which will show in model component
	function handleTypeEvent(e) {
		setSelectType(e.target.value);
    
		const getModelArray = async () => {
			const data = await fetch(
            "http://localhost:8000/type?type=" + e.target.value + "&wheel="+props.selectWheel
			);

			const getModels = await data.json();
			setModels(getModels);
      };

      getModelArray();
	}


	//when type will select,then only mddel component will shown otherwise not 
	const handleClickThree = () => {
      if(!selectType){
        	toast.error("Please select type of vehicle!");
      }else{
        	setIsShownThree(true);
      }
   };

	//when u r trying to go back,erase all set value 
	//,Without erase when trying to click on save button it will render next componnent to overcome that
	const backFromType=()=>{
      props.setIsShownTwo(false);
      props.setSelectWheel("");
	}
  
	useEffect(() => {
      props.types.map((obj)=>{
        setShowType(Object.keys(obj));
      })
      
	},[]);
 
 

  	return (
    	<div className='container'>
       	{!isShownThree && (<>
        		<div className='row'>
      			<div className='col-12 col-sm-12 col-lg-5 col-md-5 mt-5'>
        				<div className="box" style={{height:490}}>
                     <h3>Select Type of Vehicle ?</h3><br />

							{showType.map((type)=>{
                      	return (
										<div className="individual-radio">
										
										<input 
												type="radio"
												name="type"
												id={type}
												value={type}
												onChange={handleTypeEvent}
											/>  &nbsp;&nbsp;&nbsp;
										<label for={type}>{type}</label>
										</div>
                      		);
                    	})}   <br />     
              
							<div className="row">
								<div className="col-6 col-sm-6 col-md-6 col-lg-6 pt-2">
									<button  className="btn btn-md btn-info text-center back-button-sm" 
												onClick={() => backFromType()}> Back</button>
								</div>
								<div className="col-6 col-sm-6 col-md-6 col-lg-6 pt-2">
									<button  className="btn btn-md btn-info text-center next-button-sm" 
												onClick={() => handleClickThree()}> Next</button>
								</div>
							</div>
              		</div>
          		</div>

					<div className="col-md-7 col-lg-7">
							<BannerImage />
					</div>
          	</div>  
			</> )
      }

			{isShownThree && (
			<VehicleModel fname={props.fname} 
					lname={props.lname}
					selectWheel={props.selectWheel}  
					selectType={selectType}
					models={models}
					setIsShownOne={props.setIsShownOne}
					setIsShownThree={setIsShownThree}
					setFname={props.setFname}
					setLname={props.setLname}
					setSelectWheel={props.setSelectWheel}
					setSelectType={setSelectType}  />
			)}
		</div >
  	)
}
export default VehicleType;