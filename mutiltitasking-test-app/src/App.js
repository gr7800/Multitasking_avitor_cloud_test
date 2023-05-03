import './App.css';
import MainRoutes from './AllRoutes/MainRoutes';
import Navbar from './Components/Navbar.jsx/Navbar';

function App() {
 
  return (
    <div className="App" style={{ "backgroundColor": "white" }}>
     <Navbar/>
     <MainRoutes/>
    </div>
  );
}

export default App;
