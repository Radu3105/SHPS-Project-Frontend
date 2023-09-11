import React, { useMemo, useState } from "react";
import { API_URL } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Register() {
    let navigate = useNavigate();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAHR7021jgKf8m35rks90jrNZoJ0gLCS8s",
    });

    const center = useMemo(
        // Location for Craiova
        () => ({ lat: 44.314785537268605, lng: 23.80363457060685 }),
        []
    );

    const [marker, setMarker] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("Male");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== repeatPassword) {
                alert("Passwords do not match!");
                return;
            }
            if (marker === null) {
                alert("Please pick your location on the map!");
                return;
            }
            // console.log(dateOfBirth);
            const response = await axios.post(`${API_URL}user/register/`, {
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                gender: gender,
                weight: weight,
                height: height,
                phone_number: phoneNumber,
                email: email,
                password: password,
                geolocation: `${marker.lat} ${marker.lng}`,
            });

            if (response.data && response.status === 201) {
                navigate("/login");
                // console.log(response.data);
            } else {
                alert("Registration was not successful.");
            }
        } catch (error) {
            alert("Problem with registration!" + error);
        }
    };

    const handleMapClick = (event) => {
        setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
    };

    return (
        <div className="register-container">
            <div>
                <form onSubmit={handleSubmit} className="register-form">
                    <h2>First Name</h2>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        required
                    />
                    <h2>Last Name</h2>
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        required
                    />
                    <h2>Date of Birth</h2>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                    <h2>Gender</h2>
                    <select
                        name="gender"
                        value={gender}
                        onChange={(e) => {
                        setGender(e.target.value);
                        }}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <h2>Weight (in kg)</h2>
                    <input
                        type="number"
                        name="weight"
                        value={weight}
                        min={0}
                        max={300}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Weight"
                        required
                    />
                    <h2>Height (in cm)</h2>
                    <input
                        type="number"
                        name="height"
                        value={height}
                        min={0}
                        max={300}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Height"
                        required
                    />
                    <h2>Phone Number</h2>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        required
                    />
                    <h2>Email</h2>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <h2>Password</h2>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <h2>Repeat Password</h2>
                    <input
                        type="password"
                        name="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        placeholder="Repeat Password"
                        required
                    />
                    <p
                        onClick={() => navigate('/login')}
                    >
                        Already have an account?
                    </p>
                    <button type="submit" className="login-btn-2">Register</button>
                </form>
            </div>
            <div>
                <h1 style={{ textAlign: "center" }}>Select your location</h1>
                {isLoaded && (
                    <GoogleMap
                        mapContainerClassName="map"
                        zoom={14}
                        center={center}
                        onClick={handleMapClick}
                    >
                        {marker && (
                            <Marker
                                position={{ lat: marker.lat, lng: marker.lng }}
                            />
                        )}
                    </GoogleMap>
                )}
                <p style={{ textAlign: "center" }}>
                    Left-Click on the map to place a marker at your location
                </p>
            </div>
        </div>
    );
}
