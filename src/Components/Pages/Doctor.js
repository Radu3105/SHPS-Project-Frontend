import { useParams } from "react-router-dom";
import { mockDoctors } from "../../mockData";

export default function Doctor() {

    const { id } = useParams();

    return (
        <div>
            {
                mockDoctors.filter((doctor) => doctor.id == id)
                .map((doctor) => (
                    <>
                        <h1>Dr. {doctor.firstName} {doctor.lastName}</h1>
                        <h2>id: {doctor.id}</h2>
                    </>
                ))
            }
        </div>
    );
}