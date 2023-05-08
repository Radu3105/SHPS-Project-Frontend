import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/Pages/About";
import Doctor from "./Components/Pages/Doctor";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Question from "./Components/Pages/Question";
import Register from "./Components/Pages/Register";
import Result from "./Components/Pages/Result";
import SearchSymptom from "./Components/Pages/SearchSymptom";

export const BASE_URL = "http://127.0.0.1:8000/";
export const API_URL = "http://127.0.0.1:8000/api/";

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
                <Route path="result" element={<Result />} />
            </Routes>
        </BrowserRouter>
    );
}
