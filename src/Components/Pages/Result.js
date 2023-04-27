import { mockPredictions } from "../../mockData";
import DoctorList from "../DoctorList";
import PredictionList from "../PredictionList";

export default function Result(props) {

    const specializations = [... new Set(mockPredictions)];

    return (
        <div className="result-container">
            <div>
                <h1 className="result-title">Result</h1>
            </div>
            <div>
                <h1 className="problems-prediction">Health problems prediction:</h1>
                <PredictionList />
            </div>
            <div>
                <h1 className="recommended-doctors">Recommended doctors:</h1>
                { 
                    specializations.map((spec) => <DoctorList specialization={spec} />)
                }
            </div>
        </div>
    );
}