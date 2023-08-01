import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../App";
import axios from "axios";

export default function Doctor() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState({});

    useEffect(() => {
        GetDoctorById();
    }, []);

    const GetDoctorById = async () => {
        try {
            const response = await axios.get(`${API_URL}doctors/${id}`);
            console.log(response);
            setDoctor(response.data);
        } catch (error) {
            console.error("Error getting doctor by id! " + error);
        }
    };

    return (
        <div className="doctor-details-container">
            <div className="doctor-details-header">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <img
                        src="semnatura.png"
                        style={{ width: 150, height: 150, borderRadius: 10 }}
                    ></img>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0",
                            justifyContent: "center",
                            gap: 10,
                        }}
                    >
                        <p style={{ margin: 0 }}>
                            Dr. {doctor.first_name} {doctor.last_name}
                        </p>
                        <p style={{ margin: 0, fontSize: 25 }}>
                            Specialization: {doctor.specialization}
                        </p>
                    </div>
                </div>
                <p>{doctor.distance_to_location} km away</p>
            </div>
            <div className="doctor-details-info">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h2>Information</h2>
                    <p>Age: {doctor.date_of_birth}</p>
                    <p>Gender: {doctor.gender}</p>
                    <p>
                        Location: {doctor.city}, {doctor.country}
                    </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h2>Contact</h2>
                    <p>Phone number: {doctor.phone_number}</p>
                    <p>E-mail: {doctor.email_address}</p>
                    <p>Location address: {doctor.location_address}</p>
                </div>
            </div>
        </div>
    );
}
