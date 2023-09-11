import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../../App";
import RedirectButton from "../RedirectButton";

export default function Diseases() {
    const navigate = useNavigate();
    const [diseases, setDiseases] = useState();

    useEffect(() => {
        fetchDiseases();
    }, []);

    const fetchDiseases = async () => {
        try {
            const response = await axios.get(`${API_URL}diseases/`);
            setDiseases(response.data);
        } catch (error) {
            console.error("Error fetching diseases!\n" + error);
        }
    };

    const handleOnClick = (diseaseId) => {
        navigate(`/disease/${diseaseId}`);
    };

    return (
        <div className="diseases-container">
            <RedirectButton
                name="Back to Home"
                redirectTo={"/home"}
                className="btn-back-to-home"
            />
            <div>
                <h1 style={{ textAlign: "center" }}>List of Diseases</h1>
            </div>
            <div>
                {diseases &&
                    diseases.map((disease) => (
                        <div
                            key={disease.id}
                            className="disease-list-row"
                            onClick={() => handleOnClick(disease.id)}
                        >
                            <p>{disease.id}. {disease.name}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
