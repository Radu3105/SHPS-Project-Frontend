import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../App";
import axios from "axios";
import RedirectButton from "../RedirectButton";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    DirectionsRenderer,
} from "@react-google-maps/api";

export default function Doctor({ user }) {
    const { id } = useParams();
    const [doctor, setDoctor] = useState({});
    const [doctorGeolocation, setDoctorGeolocation] = useState(null);
    const [userGeolocation, setUserGeolocation] = useState(null);
    const [directions, setDirections] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        getDoctorById();
    }, []);

    useEffect(() => {
        const updateGeolocations = () => {
            const doctorGeo = getGeolocation(doctor);
            const userGeo = getGeolocation(user);
            setDoctorGeolocation(doctorGeo);
            setUserGeolocation(userGeo);
        };
        updateGeolocations();
    }, [doctor, user]);

    useEffect(() => {
        if (selectedDoctor) {
            const DirectionsService =
                new window.google.maps.DirectionsService();

            DirectionsService.route(
                {
                    origin: {
                        lat: userGeolocation[0],
                        lng: userGeolocation[1],
                    },
                    destination: {
                        lat: selectedDoctor.lat,
                        lng: selectedDoctor.lng,
                    },
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    }
                }
            );
        }
    }, [selectedDoctor]);

    const getDoctorById = async () => {
        try {
            const response = await axios.get(`${API_URL}doctors/${id}`);
            setDoctor(response.data);
        } catch (error) {
            console.error("Error getting doctor by id! " + error);
        }
    };

    const getAge = (date_of_birth) => {
        let dobYear = parseInt(date_of_birth.slice(0, 4));
        let nowYear = parseInt(new Date().getFullYear());
        return (nowYear - dobYear).toString();
    };

    const getGender = (gender) => {
        return gender == "M" ? "Male" : "Female";
    };

    const getGeolocation = (entity) => {
        if (entity && entity.geolocation) {
            let geolocation = entity.geolocation.split(" ");
            return [parseFloat(geolocation[0]), parseFloat(geolocation[1])];
        }
    };

    const calculateDistance = (geolocation1, geolocation2) => {
        if (window.google.maps.geometry) {
            const point1 = new window.google.maps.LatLng(
                parseFloat(geolocation1[0]),
                parseFloat(geolocation1[1])
            );
            const point2 = new window.google.maps.LatLng(
                parseFloat(geolocation2[0]),
                parseFloat(geolocation2[1])
            );
            const distance =
                window.google.maps.geometry.spherical.computeDistanceBetween(
                    point1,
                    point2
                );
            return Math.round(distance / 100) / 10;
        }
    };

    return (
        <div className="doctor-details-container">
            <RedirectButton
                name="Back to Home"
                redirectTo={"/home"}
                className="btn-back-to-home"
            />
            <h1 style={{ textAlign: "center" }}>Doctor Details</h1>
            {doctor && user ? (
                <>
                    <div className="doctor-details-header">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                            }}
                        >
                            <img
                                src={doctor.profile_picture}
                                style={{
                                    width: 120,
                                    height: 150,
                                    borderRadius: 10,
                                    backgroundColor: 'transparent',
                                    'opacity': 1,
                                }}
                            ></img>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0",
                                    justifyContent: "center",
                                    gap: 10,
                                }}
                            >
                                <p style={{ margin: 0 }}>
                                    Dr. {doctor.first_name} {doctor.last_name}
                                </p>
                                <p style={{ margin: 0, fontSize: 25 }}>
                                    Specialization: {doctor.specialization_name}
                                </p>
                            </div>
                        </div>
                        <p>
                            {userGeolocation && doctorGeolocation
                                ? `${calculateDistance(
                                        userGeolocation,
                                        doctorGeolocation
                                    )} km away`
                                : "Calculating..."}
                        </p>
                    </div>
                    <div className="doctor-details-info">
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <h2>Information</h2>
                            <p>
                                Age:{" "}
                                {doctor.date_of_birth &&
                                    getAge(doctor.date_of_birth)}
                            </p>
                            <p>
                                Gender:{" "}
                                {doctor.gender && getGender(doctor.gender)}
                            </p>
                            <p>
                                Location: {doctor.city}, {doctor.country}
                            </p>
                        </div>
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <h2>Contact</h2>
                            <p>Phone number: {doctor.phone_number}</p>
                            <p>E-mail: {doctor.email_address}</p>
                            <p>Location address: {doctor.location_address}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2
                                style={{
                                    marginTop: "40px",
                                    marginBottom: "30px",
                                }}
                            >
                                Location on Map
                            </h2>
                            <GoogleMap
                                mapContainerClassName="map"
                                zoom={ 15 }
                                center={
                                    doctorGeolocation
                                        ? {
                                            lat: doctorGeolocation[0],
                                            lng: doctorGeolocation[1],
                                        }
                                        : { lat: 0, lng: 0 }
                                }
                            >
                                {doctorGeolocation && userGeolocation && (
                                    <>
                                        { console.log(doctorGeolocation) }
                                        <Marker
                                            position={{
                                                lat: doctorGeolocation[0],
                                                lng: doctorGeolocation[1],
                                            }}
                                            icon={{
                                                url: "https://cdn1.iconfinder.com/data/icons/medicine-pt-7/100/051_-_hospital_map_marker_pin_doctor-512.png",
                                                scaledSize:
                                                    new window.google.maps.Size(
                                                        75,
                                                        75
                                                    ),
                                            }}
                                        />
                                        <InfoWindow
                                            position={{
                                                lat: doctorGeolocation[0],
                                                lng: doctorGeolocation[1],
                                            }}
                                            options={{
                                                pixelOffset:
                                                    new window.google.maps.Size(
                                                        0,
                                                        -75
                                                    ),
                                            }}
                                        >
                                            <div className="info-window-container">
                                                <div style={{ height: "20px" }}>
                                                    <h3
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Dr. {doctor.first_name}{" "}
                                                        {doctor.last_name}
                                                    </h3>
                                                </div>
                                                <div>
                                                    <button
                                                        className="generate-route-btn"
                                                        onClick={() => {
                                                            setSelectedDoctor({
                                                                lat: doctorGeolocation[0],
                                                                lng: doctorGeolocation[1],
                                                            });
                                                        }}
                                                    >
                                                        Generate Route
                                                    </button>
                                                </div>
                                            </div>
                                        </InfoWindow>
                                        <Marker
                                            position={{
                                                lat: userGeolocation[0],
                                                lng: userGeolocation[1],
                                            }}
                                        />
                                        <InfoWindow
                                            position={{
                                                lat: userGeolocation[0],
                                                lng: userGeolocation[1],
                                            }}
                                            options={{
                                                pixelOffset:
                                                    new window.google.maps.Size(
                                                        0,
                                                        -40
                                                    ),
                                            }}
                                        >
                                            <div style={{ height: "20px" }}>
                                                <h3
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    You
                                                </h3>
                                            </div>
                                        </InfoWindow>
                                    </>
                                )}
                                {directions && (
                                    <DirectionsRenderer
                                        directions={directions}
                                        options={{ suppressMarkers: true }}
                                    />
                                )}
                            </GoogleMap>
                        </div>
                    </div>
                </>
            ) : null}
            <RedirectButton
                name="Back to Doctors"
                redirectTo={"/doctors"}
                style={{ "margin-top": "50px" }}
                className="btn-back-to-home"
            />
        </div>
    );
}
