import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUserValid, setIsUserValid] = useState("");

    const validateUser = async () => {
        try {
            const response = await axios.post(`${API_URL}login/`, {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            window.location.href = "/"; // redirect to home on successful login
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateUser();
    };

    return (
        <form className="register-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    required
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    required
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <Link to="/">
                    <button type="button">Cancel</button>
                </Link>
                <Link to="/register">
                    <button type="button">I do not have an account yet</button>
                </Link>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}
