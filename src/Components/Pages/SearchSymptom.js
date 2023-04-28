import { useEffect, useState } from "react";
import { mockSymptoms, mockQuestions } from "../../mockData";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../App";
import axios from 'axios';

export default function SearchSymptom() {

    const navigate = useNavigate();

    const [targetSymptom, setTargetSymptom] = useState("");
    const [symptoms, setSymptoms] = useState([]);

    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const response = await axios.get(`${API_URL}symptoms/`);
                setSymptoms(response.data);
            } catch (error) {
                console.error("Error fetching symptoms: " + error);
            }
        }
        fetchSymptoms();
    }, []);

    const handleOnClick = () => {
        navigate("/question/0");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Symptom submitted");
    };

    return (
        <div className="search-symptom-container">
            <div>
                {symptoms.map((s) => <p>{s.name}</p>)}
            </div>
            <form className="search-symptom-form" onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h1 class="search-symptom-title">Search symptoms</h1>
                    <div style={{ position: "relative" }}>
                        <input
                            required
                            id="targetSymptom"
                            type="input"
                            value={targetSymptom}
                            onChange={(event) =>
                                setTargetSymptom(event.target.value.toLowerCase())
                            }
                            className="search-symptom-input"
                        />
                        <div
                            className="search-symptom-dropdown"
                            onClick={handleOnClick}
                        >
                            { symptoms !== null ?
                                (
                                    symptoms.filter((el) => {
                                        if (targetSymptom === "") return;
                                        return el.name.toLowerCase().includes(targetSymptom);
                                    })
                                    .map((targetSymptom) => (
                                        <div className="searched-symptom-option">
                                            <p style={{ margin: "0" }}>{targetSymptom.name}</p>
                                        </div>)
                                    )
                                ) : null 
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
