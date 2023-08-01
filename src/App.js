import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Components/Pages/About";
import Doctor from "./Components/Pages/Doctor";
import Intro from "./Components/Pages/Intro";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Result from "./Components/Pages/Result";
import Doctors from "./Components/Pages/Doctors";
import Diseases from "./Components/Pages/Diseases";
import SearchSymptom from "./Components/Pages/SearchSymptom";

export const BASE_URL = "http://127.0.0.1:8000/";
export const API_URL = "http://127.0.0.1:8000/api/";

export default function App() {
    const [user, setUser] = useState({});
    const [authenticationToken, setAutheticationToken] = useState(localStorage.getItem('token'));

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="about" element={<About />} />
                <Route path="diagnose" element={<SearchSymptom />} />
                <Route path="doctor/:id" element={<Doctor />} />
                <Route path="result/:id" element={<Result />} />
                <Route path="doctors/" element={<Doctors />} />
                <Route path="diseases/" element={<Diseases />} />
            </Routes>
        </BrowserRouter>
    );
}
