
import LandingPage from './vendordashboard/pages/LandingPage';
import './app.css'
import { Routes,Route } from 'react-router-dom';
import Notfound from './vendordashboard/components/Notfound';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <LandingPage/>}/>
        <Route path='/*' element={<Notfound/>}/>
      </Routes>
     

    </div>
  );
}

export default App;
