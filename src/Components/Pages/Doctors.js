import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../App";
import axios from "axios";
import RedirectButton from "../RedirectButton";

export default function Doctors({ user }) {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [doctorGeolocations, setDoctorGeolocations] = useState(null);
    const [userGeolocation, setUserGeolocation] = useState(null); 

    useEffect(() => {
        FetchDoctors();
    }, []);

    useEffect(() => {
        const updateGeolocations = () => {
            const userGeo = getGeolocation(user);
            setUserGeolocation(userGeo);
        };
        updateGeolocations();
    }, [user]);

    const FetchDoctors = async () => {
        try {
            const response = await axios.get(`${API_URL}doctors/`);
            const doctorsData = response.data;
            const doctorGeos = {};
            doctorsData.forEach(doctor => {
                doctorGeos[doctor.id] = getGeolocation(doctor);
            });
            setDoctors(doctorsData);
            setDoctorGeolocations(doctorGeos);
        } catch (error) {
            console.error("Error fetching doctors: " + error);
        }
    };

    const getGeolocation = (entity) => {
        if (entity && entity.geolocation) {
            let geolocation = entity.geolocation.split(' ');
            return [parseFloat(geolocation[0]), parseFloat(geolocation[1])];
        }
    }

    const calculateDistance = (geolocation1, geolocation2) => {
        if (window.google.maps.geometry) {
            const point1 = new window.google.maps.LatLng(parseFloat(geolocation1[0]), parseFloat(geolocation1[1]));
            const point2 = new window.google.maps.LatLng(parseFloat(geolocation2[0]), parseFloat(geolocation2[1]));
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2); 
            return Math.round(distance / 100) / 10;
        }
    }

    const handleOnRowClick = (doctorId) => {
        navigate(`/doctor/${doctorId}`);
    };

    return (
        <div className="doctors-container">
            <RedirectButton
                name="Back to Home"
                redirectTo={"/home"}
                className="btn-back-to-home"
            />
            <h1 style={{ textAlign: "center", 'marginBottom': '50px' }}>List of Doctors</h1>
            <table className="doctors-table">
                <thead style={{ textAlign: "left", leftMargin: "50%" }} className="table-header-doctor">
                    <tr>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors &&
                        doctors.map((doctor) => (
                            <tr
                                key={doctor.id}
                                className="table-row-doctor"
                                onClick={() => handleOnRowClick(doctor.id)}
                            >
                                <td>
                                    Dr. {doctor.first_name} {doctor.last_name}
                                </td>
                                <td>{doctor.specialization_name}</td>
                                <td>{ (userGeolocation && doctorGeolocations[doctor.id]) ? `${calculateDistance(userGeolocation, doctorGeolocations[doctor.id])} km away` : 'Calculating...' }</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
