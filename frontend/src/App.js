import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import RootChange from './Routes/RouteChange';
import Navbar from './Components/Navbar/Navbar'

import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <div className="App">

<Navbar/>
<RootChange/>


<ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
