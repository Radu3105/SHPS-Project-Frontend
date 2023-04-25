import { Link } from "react-router-dom"; 

export default function Home() {
    return (
        <div className="home-container">
            <h1 className="app-title">Smart Health <br></br> Prediction System</h1>
            <Link to="/register">
                <button className="register-btn">Register</button>
            </Link>
            <Link to="/login">
                <button className="login-btn">Log In</button>
            </Link>
            <div>
                <Link to="/searchSymptom">
                    <button className="login-btn">Search Symptom</button>
                </Link>
            </div>
        </div>
    );
}