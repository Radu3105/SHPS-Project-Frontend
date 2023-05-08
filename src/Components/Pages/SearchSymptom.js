import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../App";

export default function SearchSymptom() {
    const navigate = useNavigate();

    const [targetSymptom, setTargetSymptom] = useState("");
    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const mostPopular = symptoms.slice(0, 5);

    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const response = await axios.get(`${API_URL}symptoms/`);
                setSymptoms(response.data);
            } catch (error) {
                console.error("Error fetching symptoms: " + error);
            }
        };
        fetchSymptoms();
    }, []);

    const sendSelectedSymptoms = async () => {
        try {
            const response = await axios.post(
                `${API_URL}diseases-by-symptoms/`,
                {
                    symptoms: selectedSymptoms,
                }
            );
            console.log("Response from the server:");
            console.log(response.data);
        } catch (error) {
            console.error("Error sending symptoms: " + error);
        }
    };

    const handleOnContinueClick = () => {
        // navigate("/question/0");
        // console.log(selectedSymptoms);
        sendSelectedSymptoms();
    };

    const handleOnSymptomClick = (symptom) => {
        if (selectedSymptoms.some((s) => s.id === symptom.id)) {
            setTargetSymptom("");
            alert("Symptom already selected!");
            return;
        }
        setSelectedSymptoms([...selectedSymptoms, symptom]);
        setTargetSymptom("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Symptom submitted");
    };

    return (
        <div className="search-symptom-container">
            <h1 class="search-symptom-title">
                Let's start off by telling us <br></br>what you feel
            </h1>
            <form className="search-symptom-form" onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <input
                            required
                            autoComplete="off"
                            id="targetSymptom"
                            type="input"
                            value={targetSymptom}
                            placeholder="Type in a symptom"
                            className="search-symptom-input"
                            onChange={(event) =>
                                setTargetSymptom(
                                    event.target.value.toLowerCase()
                                )
                            }
                        />
                        <div className="search-symptom-dropdown">
                            {symptoms !== null
                                ? symptoms
                                      .filter((el) => {
                                          if (targetSymptom === "") return;
                                          return el.name
                                              .toLowerCase()
                                              .includes(targetSymptom);
                                      })
                                      .map((targetSymptom) => (
                                          <div
                                              className="searched-symptom-option"
                                              onClick={() =>
                                                  handleOnSymptomClick(
                                                      targetSymptom
                                                  )
                                              }
                                          >
                                              <p style={{ margin: "0" }}>
                                                  {targetSymptom.name}
                                              </p>
                                          </div>
                                      ))
                                      .slice(0, 5)
                                : null}
                        </div>
                    </div>
                </div>
            </form>
            <div>
                <div>
                    {selectedSymptoms.length > 0 && (
                        <>
                            <h2 className="symptoms-most-searched">
                                Selected symptoms:
                            </h2>
                            <div className="selected-symptoms-container">
                                {selectedSymptoms.map((ss) => (
                                    <p key={ss.id} className="selected-symptom">
                                        {ss.name}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <h2 className="symptoms-most-searched">
                    Most searched symptoms:
                </h2>
                {mostPopular.map((s) => (
                    <div
                        className="symptom"
                        onClick={() => handleOnSymptomClick(s)}
                    >
                        <p>{s.name}</p>
                    </div>
                ))}
            </div>
            <div>
                <button
                    className="continue-btn"
                    onClick={handleOnContinueClick}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
