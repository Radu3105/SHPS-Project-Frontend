import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from './Components/Pages/Home';
import Register from './Components/Pages/Register';
import Login from "./Components/Pages/Login";
import About from './Components/Pages/About';
import SearchSymptom from './Components/Pages/SearchSymptom';
import Question from './Components/Pages/Question';
import Doctor from './Components/Pages/Doctor';
import Result from './Components/Pages/Result';

export const BASE_URL = 'http://127.0.0.1:8000/';
export const API_URL = 'http://127.0.0.1:8000/api/';

export default function App() {
  
  // const [authenticationToken, setAutheticationToken] = useState(localStorage.getItem('token'));
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="searchSymptom" element={<SearchSymptom />} />
        <Route path="question/:id" element={<Question />} />
        <Route path="doctor/:id" element={<Doctor />} />
        <Route path="result" element={<Result /> }/>
      </Routes>
    </BrowserRouter>
  );
}