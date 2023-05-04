import {useState} from 'react';
import DatePicker from './DatePicker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerImage from "./BannerImage";


const VehicleModel=(props) =>{
	const [isShownFour, setIsShownFour] = useState(false);
	const [selectModel,setSelectModel]=useState("");

	//when model will select,then only booking with dates component will shown otherwise not 
	const handleClickFour = () => {
		if(!selectModel){
			toast.error("Please select model of vehicle!");
		}else{
			setIsShownFour(true);
		}
	};

	//when u r trying to go back,erase all set value 
	//,Without erase when trying to click on save button it will render next componnent to overcome that
  	const backFromModel=()=>{
    	props.setIsShownThree(false);
    	props.setSelectType("");
   }

  
  	function handleModelEvent(e) {
    	setSelectModel(e.target.value);
  	}
  

  	return (
    	<div className='container'>
        	{!isShownFour &&( <>
          	<div className='row'>
      			<div className='col-12 col-sm-12 col-lg-5 col-md-5 mt-5'>
        				<div className="box" style={{height:490}}>
                  	<h3>Select Model of Vehicle ?</h3><br />
                       {props.models.map((model)=>{
                          	return (
                            	<div className="individual-radio">
                              
                              	<input type="radio"
													name="model"
                                  		id={model}
                                  		value={model}
                                  		onChange={handleModelEvent}
											/>   &nbsp;&nbsp;&nbsp;
                              <label for={model} > {model}</label><br /><br />
                            	</div>
                          		);
                        	})}  <br />       
                     
									<div className="row">
										<div className="col-6 col-sm-6 col-md-6 col-lg-6 pt-2">
											<button  className="btn btn-md btn-info text-center back-button-sm" 
														onClick={() => backFromModel()}> Back</button>
										</div>
										<div className="col-6 col-sm-6 col-md-6 col-lg-6 pt-2">
											<button className="btn btn-md btn-info text-center next-button-sm" 
														onClick={() => handleClickFour()}>Next</button>
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
              
		{isShownFour && (
        <DatePicker fname={props.fname} 
				lname={props.lname}
				selectWheel={props.selectWheel}  
				selectType={props.selectType}
				selectModel={selectModel}
				setIsShownOne={props.setIsShownOne}
				setIsShownFour={setIsShownFour}
				setFname={props.setFname}
				setLname={props.setLname}
				setSelectWheel={props.setSelectWheel}
				setSelectType={props.setSelectType}
				setSelectModel={setSelectModel}/>
      )}
   </div >
  )
}
export default VehicleModel;