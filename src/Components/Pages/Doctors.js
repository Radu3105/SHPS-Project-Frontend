import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../../App";
import axios from "axios";

export default function Doctors() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState();

    useEffect(() => {
        FetchDoctors();
    }, []);

    const FetchDoctors = async () => {
        try {
            const response = await axios.get(`${API_URL}doctors/`);
            console.log(response.data);
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors: " + error);
        }
    };

    const handleOnRowClick = (doctorId) => {
        navigate(`/doctor/${doctorId}`);
    }

    return (
        <div className="doctors-container">
            <h1 style={{ textAlign: "center" }}>Doctors Page</h1>
            <table className="doctors-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors &&
                        doctors.map((doctor) => (
                            <tr key={doctor.id} onClick={() => handleOnRowClick(doctor.id)}>
                                <td style={{ textAlign: "center" }}>
                                    Dr. {doctor.first_name}{" "}
                                    {doctor.last_name}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    {doctor.specialization}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    {doctor.distance_to_location} km
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
