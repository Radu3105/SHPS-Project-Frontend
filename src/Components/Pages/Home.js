import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <h1
                style={{
                    // marginLeft: '10%',
                    textAlign: "center",
                    marginTop: "6%",
                    color: "white",
                    fontSize: "60px",
                    letterSpacing: "1px",
                }}
            >
                Select an option
            </h1>
            <div className="home-container">
                <Link to={`/diagnose/`}>
                    <div className="home-diagnose-option-card">
                        <h1
                            style={{
                                width: "100%",
                                lineHeight: "75px",
                                textAlign: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            Diagnose
                        </h1>
                    </div>
                </Link>
                <Link to={`/doctors/`}>
                    <div className="home-doctors-option-card">
                        <h1
                            style={{
                                width: "100%",
                                lineHeight: "75px",
                                textAlign: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            Doctors
                        </h1>
                    </div>
                </Link>
                <Link to={`/diseases/`}>
                    <div className="home-disease-option-card">
                        <h1
                            style={{
                                width: "100%",
                                lineHeight: "75px",
                                textAlign: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            Diseases
                        </h1>
                    </div>
                </Link>
            </div>
        </>
    );
}
