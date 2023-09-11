import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import About from "./Components/Pages/About";
import Doctor from "./Components/Pages/Doctor";
import Intro from "./Components/Pages/Intro";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Result from "./Components/Pages/Result";
import Doctors from "./Components/Pages/Doctors";
import Diseases from "./Components/Pages/Diseases";
import Disease from "./Components/Pages/Disease";
import SearchSymptom from "./Components/Pages/SearchSymptom";
import PrivateRouteLayout from "./Components/PrivateRoute";
import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/";
export const API_URL = "http://127.0.0.1:8000/api/";

export default function App() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("access_token") !== '' ? true : false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`${API_URL}user/get-user/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchUserData();
    }, []);

    const checkLoginStatus = () => {
        if (localStorage.getItem('access_token')) {
            return (
                <div className="header">
                    <div>
                        <h2 style={{'width': '400px', 'textAlign': 'end'}}>{ userData.first_name } { userData.last_name }</h2>
                    </div>
                    <div>
                        <button className="logout-btn" onClick={handleOnClickLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    }

    const handleOnClickLogout = () => {
        localStorage.setItem('access_token', '');
        setLoggedIn(false);
        navigate('/');
    }

    return (
        <>
            { checkLoginStatus() }
            <AuthProvider>
                    <Routes>
                        <Route index element={<Intro />} />
                        <Route path="login" element={<Login />} />
                        <Route path="about" element={<About />} />
                        <Route path="register" element={<Register />} />
                        <Route
                            path="/home"
                            element={
                                <PrivateRouteLayout>
                                    <Home user={userData}/>
                                </PrivateRouteLayout>
                            }
                        />
                        <Route
                            path="/diagnose"
                            element={
                                <PrivateRouteLayout>
                                    <SearchSymptom />
                                </PrivateRouteLayout>
                            }
                        />
                        <Route
                            path="/doctor/:id"
                            element={
                                <PrivateRouteLayout>
                                    <Doctor user={userData}/>
                                </PrivateRouteLayout>
                            }
                        />
                        <Route
                            path="/result/:id"
                            element={
                                <PrivateRouteLayout>
                                    <Result user={userData}/>
                                </PrivateRouteLayout>
                            }
                        />
                        <Route
                            path="/doctors"
                            element={
                                <PrivateRouteLayout>
                                    <Doctors user={userData}/>
                                </PrivateRouteLayout>
                            }
                        />
                        <Route
                            path="/diseases"
                            element={
                                <PrivateRouteLayout>
                                    <Diseases />
                                </PrivateRouteLayout>
                            }
                        />
                        <Route
                            path="/disease/:id"
                            element={
                                <PrivateRouteLayout>
                                    <Disease />
                                </PrivateRouteLayout>
                            }
                        />
                    </Routes>
            </AuthProvider>
        </>
    );
}
