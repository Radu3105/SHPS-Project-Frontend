import React, { useState, useEffect } from "react";
import { API_URL } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}user/login/`,
                formData
            );
            // console.log(response.data);
            localStorage.setItem("access_token", response.data.access_token);
            console.log("HITS");
            navigate("/home");
        } catch (error) {
            alert("Login failed! Please check your credentials.");
        }
    };

    return (
        <div className="login-container" style={{'marginTop' : '400px'}}>
            <h1 style={{ textAlign: "center", fontSize: "40px" }}>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <h2>Email</h2>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <h2>Password</h2>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <p 
                    style={{'marginTop' : '30px'}}
                    onClick={() => navigate('/register')}
                >
                    Don't have an account yet?
                </p>
                <button style={{ marginTop: "20px" }} type="submit" className="login-btn-2">
                    Login
                </button>
            </form>
        </div>
    );
}
