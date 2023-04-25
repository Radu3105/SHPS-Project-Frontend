import { mockDoctors } from "../mockData"; 
import { Link } from "react-router-dom";

export default function DoctorList(props) {

    return (
        <>
            {   
                mockDoctors.filter((doctor) => doctor.specialization === props.specialization)
                .map((doctor) => (
                    <div className="doctor-list">
                        <div className="doctor-list-specialization">
                            <h1 style={{'textAlign': 'center'}}>{doctor.specialization.toUpperCase()}</h1>
                        </div>
                        <Link to={`/doctor/${doctor.id}`}> 
                            <div className="doctor-list-option">
                                <div className="doctor-list-option-name">
                                    <h1>Dr. {doctor.firstName} {doctor.lastName}</h1>
                                </div>
                                <div className="doctor-list-option-location">
                                    <h3>{doctor.location}</h3>
                                </div>
                                {/* <button>Contact</button> */}
                            </div>
                        </Link>
                    </div>
                ))
            }
        </>
    );
}