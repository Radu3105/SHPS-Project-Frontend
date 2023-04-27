import { mockPredictions } from "../mockData";

export default function PredictionList() {

    return (
        <div className="prediction-list">
            {
                mockPredictions.map((prediction) => (
                    <div className="prediction">
                        <h2>{prediction.disease.name}</h2>
                        <h3>Type: {prediction.disease.type}</h3>
                        <p>Accuracy: {prediction.accuracy * 100}%</p>
                    </div>
                ))
            }
        </div>
    );
}