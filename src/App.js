import { Route,Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import DatePicker from './components/DatePicker';
import Wheels from './components/Wheels';
import UserName from './components/UserName';
import VehicleModel from './components/VehicleModel';
import VehicleType from './components/VehicleType';

function App() {
  return (
    <div className="App">
        <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
        />
            {/* <Navbar /> */}
            <Routes>
                <Route exact path="/" element={<UserName />}></Route>
                <Route path="/wheels" element={<Wheels />}></Route>
                <Route path="/types" element={<VehicleType />}></Route>
                <Route path="/models" element={<VehicleModel />}></Route>
                <Route path="/datepickers" element={<DatePicker />}></Route>
                
            </Routes>
      </div>
  );
}

export default App;
