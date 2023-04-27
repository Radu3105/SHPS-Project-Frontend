import { useParams } from "react-router-dom";
import { mockDoctors } from "../../mockData";

export default function Doctor() {

    const { id } = useParams();

    return (
        <div className="doctor-details-container">
            {
                mockDoctors.filter((doctor) => doctor.id == id)
                .map((doctor) => (
                    <>
                        <h1>Dr. {doctor.firstName} {doctor.lastName}</h1>
                        <h2>id: {doctor.id}</h2>
                        <p1>Phone: {doctor.phone}</p1>
                        <p1>Email: {doctor.email}</p1>
                        <p1>Location: {doctor.location}</p1>
                    </>
                ))
            }
        </div>
    );
}