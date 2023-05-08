import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../App";

export default function Register(props) {
    const [role, setRole] = useState(""); // either patient or doctor
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

    const [passwordMatch, setPasswordMatch] = useState("");

    const registerUser = async (
        role,
        firstName,
        lastName,
        email,
        password,
        // dateOfBirth,
        gender
        // weight = undefined,
        // height = undefined
    ) => {
        try {
            const response = await axios.post(`${API_URL}register/`, {
                // role,
                first_name: firstName,
                last_name: lastName,
                // age: Number(dateOfBirth),
                gender: gender,
                email: email,
                password: password,
                // weight,
                // height,
            });
            // localStorage.setItem("token", response.data.token);
            // window.location.href = "/"; // redirect to home on successful registration
        } catch (error) {
            console.error("Errrrror" + error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMatch(false);
            return;
        }
        registerUser(
            // role,
            firstName,
            lastName,
            // Number(dateOfBirth),
            gender,
            email,
            password
            // weight,
            // height
        );
        setPasswordMatch(true);
        console.log(typeof firstName);
        console.log(typeof lastName);
        console.log(typeof dateOfBirth);
        console.log(typeof gender);
        console.log(typeof email);
        console.log(typeof password);
        alert("Successfully created account!");
    };

    return (
        <form className="register-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="role">
                    Role<span style={{ color: "red" }}>*</span>
                </label>
                <select
                    required
                    id="role"
                    name="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                >
                    {/* <option disabled > -- select an option -- </option> */}
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                </select>
            </div>
            <div>
                <label htmlFor="firstName">
                    First Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                    required
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">
                    Last Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                    required
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="gender">
                    Gender<span style={{ color: "red" }}>*</span>
                </label>
                <select
                    required
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div>
                <label htmlFor="dateOfBirth">
                    Date of birth<span style={{ color: "red" }}>*</span>
                </label>
                <input
                    required
                    type="text"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(event) => setDateOfBirth(event.target.value)}
                />
            </div>
            {/* Render weight and height input fields only if the user is a patient. */}
            {role === "patient" && (
                <>
                    <div>
                        <label htmlFor="weight">
                            Weight (kg)<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            required
                            id="weight"
                            type="text"
                            value={weight}
                            onChange={(event) => setWeight(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="height">
                            Height (cm)<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            required
                            id="height"
                            type="text"
                            value={height}
                            onChange={(event) => setHeight(event.target.value)}
                        />
                    </div>
                </>
            )}
            <div>
                <label htmlFor="email">
                    Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                    required
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">
                    Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                    required
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">
                    Repeat Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                    required
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
            </div>
            {passwordMatch === false && (
                <div>
                    <p style={{ color: "red", fontSize: "25px" }}>
                        Passwords do not match !
                    </p>
                </div>
            )}
            <div>
                <Link to="/">
                    <button type="button">Cancel</button>
                </Link>
                <Link to="/login">
                    <button type="button">I already have an account</button>
                </Link>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}
