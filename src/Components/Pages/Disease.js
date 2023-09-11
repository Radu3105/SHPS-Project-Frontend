import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../App";
import axios from "axios";
import RedirectButton from "../RedirectButton";

export default function Disease() {
    const { id } = useParams();
    const [disease, setDisease] = useState();

    useEffect(() => {
        fetchDisease();
    }, []);

    const fetchDisease = async () => {
        try {
            const response = await axios.get(`${API_URL}diseases/${id}`, { credentials: 'include' });
            // console.log(response.data);
            setDisease(response.data);
        } catch (error) {
            console.error(
                "Error fetching disease with id: " + id + "!\n" + error
            );
        }
    };

    return (
        <div className="diseases-container">
            <RedirectButton
                name="Back to Home"
                redirectTo={"/home"}
                className="btn-back-to-home"
            />
            {disease && (
                <>
                    <h1 style={{ textAlign: "center" }}>
                        Information about<br></br>
                        {disease.name}
                    </h1>
                    <h1 className="disease-subheader">Description</h1>
                    <div style={{ fontSize: 20 }}>
                        <p>{disease.description}</p>
                    </div>
                    <h1 className="disease-subheader">Symptoms</h1>
                    <div style={{ fontSize: 20 }}>
                        <ul>
                            {disease.symptoms &&
                                disease.symptoms.map((symptom) => (
                                    <li key={symptom.id}>{symptom.name}</li>
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
                    <h1 className="disease-subheader" style={{'marginBottom': '20px'}}>Additional resources</h1>
                    <div style={{ fontSize: 20 }}>
                        <a style={{'color': 'blue'}} href={disease.additional_resources}>
                            {disease.additional_resources}
                        </a>
                    </div>
                </>
            )}
            <RedirectButton
                name="Back to Diseases"
                redirectTo={"/diseases"}
                style={{'margin-top': '50px'}}
                className="btn-back-to-home"
            />
        </div>
    );
}
