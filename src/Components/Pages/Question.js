import { useNavigate, useParams } from "react-router-dom";
import { mockQuestions } from "../../mockData";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";

export default function Question() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState("");

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`${API_URL}questions/${id}/`);
                setQuestion(response.data.text);
            } catch (error) {
                console.error("Error fetching symptoms: " + error);
            }
        };
        fetchQuestion();
    }, []);

    const handleOnClickYes = () => {
        if (id == mockQuestions.length - 1) navigate("/result/");
        else navigate(`/question/${Number(id) + 1}`);
    };

    const handleOnClickNo = () => {
        if (id == mockQuestions.length - 1) navigate("/result/");
        else navigate(`/question/${Number(id) + 1}`);
    };

    const handleOnClickDontKnow = () => {
        if (id == mockQuestions.length - 1) navigate("/result/");
        else navigate(`/question/${Number(id) + 1}`);
    };

    return (
        <div className="question-container">
            <div className="question-title">
                <p>{question}</p>
            </div>
            <div className="question-answer-btns-container">
                <button
                    className="question-answer-yes-btn"
                    onClick={handleOnClickYes}
                >
                    Yes
                </button>
                <button
                    className="question-answer-no-btn"
                    onClick={handleOnClickNo}
                >
                    No
                </button>
                <button
                    className="question-answer-dontknow-btn"
                    onClick={handleOnClickDontKnow}
                >
                    Don't know
                </button>
            </div>
            {/* <div>
                <button onClick={navigate(-1)}>Previous</button>
                <button>Next</button>
            </div> */}
        </div>
    );
}
