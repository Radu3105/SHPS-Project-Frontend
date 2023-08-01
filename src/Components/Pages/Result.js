import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../App";
import axios from "axios";

export default function Result() {
    const { id } = useParams();
    const [disease, setDisease] = useState({});
    const [doctors, setDoctors] = useState([]);
    const [specialization, setSpecialization] = useState("");

    useEffect(() => {
        getDiseaseById();
    }, []);

    const getDiseaseById = async () => {
        try {
            const response = await axios.get(`${API_URL}diseases/${id}`);
            console.log(response.data.symptoms);
            setDisease(response.data);
            setSpecialization(response.data.doctor_specialization.name)
            getDoctors(response.data.doctor_specialization.name);
        } catch (error) {
            console.error("Can't find disease: " + error);
        }
    };

    const getDoctors = async (specialization_name) => {
        try {
            const response = await axios.get(
                `${API_URL}doctors/${specialization_name}`
            );
            setDoctors(response.data);
        } catch (error) {
            console.error("Can't find any doctors for the disease!");
        }
    };

    return (
        <div className="result-container">
            <div className="result-header-container">
                <div className="result-header-group-pacient-info">
                    <p style={{ margin: 0 }}>Pacient Name: x</p>
                    <p style={{ margin: 0 }}>
                        Pacient Date of Birth: x (x years old)
                    </p>
                    <p style={{ margin: 0 }}>Pacient Gender: x</p>
                    <p style={{ margin: 0 }}>Pacient Weight: x kg</p>
                    <p style={{ margin: 0 }}>Pacient Height: x cm</p>
                </div>
                <div className="result-header-group-date">
                    <p style={{ margin: 0 }}>Date of report: {new Date().toUTCString().slice(5, 16)}</p>
                </div>
            </div>
            <div>
                <h1 className="result-title">Health Prognosis</h1>
            </div>
            <div className="prognosis">
                <p
                    style={{
                        fontSize: "25px",
                    }}
                >
                    Based on the selected symptoms, you may suffer from:{" "}
                    <i style={{ fontSize: "30px", color: "red" }}>
                        {disease.name}
                    </i>
                </p>
            </div>
            <h1 className="disease-subheader">Description</h1>
            <div style={{ fontSize: 20 }}>
                <p>{disease.description}</p>
            </div>
            <h1 className="disease-subheader">Symptoms</h1>
            <div style={{ fontSize: 20 }}>
                <ul>
                    {disease.symptoms &&
                        disease.symptoms.map((symptom) => (
                            <li>{symptom.name}</li>
                        ))}
                </ul>
            </div>
            <h1 className="disease-subheader">Prognosis</h1>
            <div style={{ fontSize: 20 }}>
                <p>{disease.prognosis_details}</p>
            </div>
            <h1 className="disease-subheader">Treatement</h1>
            <div style={{ fontSize: 20 }}>
                <p>{disease.treatement}</p>
            </div>
            <h1 className="disease-subheader">Additional resources</h1>
            <div style={{ fontSize: 20 }}>
                <p>{disease.additional_resources}</p>
            </div>
            <div className="doctor-list">
                <h1
                    className="disease-subheader"
                    style={{ marginBottom: "50px" }}
                >
                    Recommended specialists in your area ({doctors.length} results found)
                </h1>
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="recommended-doctors">
                        <div style={{ width: "100%" }}>
                            <Link to={`/doctor/${doctor.id}`}>
                                <p style={{ margin: 0, height: "100px" }}>
                                    Dr. {doctor.first_name} {doctor.last_name} ({specialization})
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button>Back to Diagnose</button>
                <button>Continue to Home</button>
            </div>
        </div>
    );
}
