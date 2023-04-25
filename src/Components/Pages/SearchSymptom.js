import { useState } from "react";
import { mockSymptoms, mockQuestions } from "../../mockData";
import { Link, useNavigate } from "react-router-dom";

export default function SearchSymptom() {
    const navigate = useNavigate();

    const [symptom, setSymptom] = useState("");

    const handleOnClick = () => {
        navigate("/question/0");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Symptom submitted");
    };

    return (
        <div className="search-symptom-container">
            <form className="search-symptom-form" onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h1 class="search-symptom-title">Search symptoms</h1>
                    <div style={{ position: "relative" }}>
                        <input
                            required
                            id="symptom"
                            type="input"
                            value={symptom}
                            onChange={(event) =>
                                setSymptom(event.target.value.toLowerCase())
                            }
                            className="search-symptom-input"
                        />
                        <div
                            className="search-symptom-dropdown"
                            onClick={handleOnClick}
                        >
                            {mockSymptoms
                                .filter((el) => {
                                    if (symptom === "") return;
                                    return el.toLowerCase().includes(symptom);
                                })
                                .map((symptom) => (
                                    <div className="searched-symptom-option">
                                        <p style={{ margin: "0" }}>{symptom}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
