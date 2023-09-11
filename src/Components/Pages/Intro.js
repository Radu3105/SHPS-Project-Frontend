import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Intro() {

    return (
        <div className="intro-container">
            <h1 className="app-title">
                Intelligent Health <br></br> Prediction System
            </h1>
            <p className="app-made-by">Made by Gîrlea Radu Cristian</p>
            <Link to="/register">
                <button className="register-btn">Register</button>
            </Link>
            <Link to="/login">
                <button className="login-btn">Log In</button>
            </Link>
        </div>
    );
}