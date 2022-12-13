import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MapView, Navbar } from "../components";
import { useParams } from "react-router-dom";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { ref, onValue } from "firebase/database";
import { useLocationContext } from "../context/location_context";

const SingleVehicleMap = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
	const { firebaseSetup } = useLocationContext();
	const [coordinates, setCoordinates] = useState();
	const { id } = useParams();

	useEffect(() => {
		setCoordinates();
		const database = firebaseSetup();
		const timestampRef = ref(database, `${id}/location`);
		const unsubscribe = onValue(timestampRef, (snapshot) => {
			console.log(snapshot.val().latitude, snapshot.val().longitude, id);
			setCoordinates([snapshot.val().latitude, snapshot.val().longitude]);
		});

		return unsubscribe;
	}, []);

	if (!isLoaded || !coordinates) {
		return (
			<MapWrapper>
				<div className='loading'>Loading...</div>
			</MapWrapper>
		);
	}

	if (coordinates) {
		return (
			<>
				<MapWrapper>
					<div className='details'>
						<h2 className='vehicle'>
							Tracking : <span> {id} </span>
						</h2>
						<h2 className='coordinates'>
							Lat : <span>{coordinates[0]}</span>
							Long : <span>{coordinates[1]}</span>
						</h2>
					</div>
					<Map coordinates={coordinates} />
				</MapWrapper>
			</>
		);
	}
};

function Map({ coordinates }) {
	const [lat, setLat] = useState(coordinates[0]);
	const [long, setLong] = useState(coordinates[1]);
	const [center, setCenter] = useState({ lat: lat, lng: long });

	useEffect(() => {
		setLat(coordinates[0]);
		setLong(coordinates[1]);
		setCenter({ lat: coordinates[0], lng: coordinates[1] });
	}, [coordinates]);

	return (
		<Wrapper>
			<GoogleMap
				zoom={15}
				center={center}
				mapContainerClassName='map-container'
			>
				<MarkerF
					position={center}
					key={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
				/>
			</GoogleMap>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	.map-container {
		margin-top: 1rem;
		width: 50vw;
		height: 70vh;
		border-radius: 0.5rem;
	}
`;

const MapWrapper = styled.div`
	margin-left: 10vw;
	.details {
		display: flex;
		margin-top: 2rem;
	}

	h2 {
		color: white;
	}

	.vehicle {
		margin-top: 1.5rem;
		font-family: "M PLUS 1", sans-serif;
		letter-spacing: 0.1rem;
		font-size: 1.1rem;
		span {
			font-size: 1.5rem;
			font-family: "Varela Round", sans-serif;
			box-shadow: 0 0rem 0.5rem #b9b9b9;
		}
	}

	.coordinates {
		margin: 1.5rem 0;
		margin-left: 2rem;
		font-family: "M PLUS 1", sans-serif;
		letter-spacing: 0.1rem;
		font-size: 0.8rem;
		transform: translateY(0.2rem);
		span {
			margin-right: 3rem;
			font-size: 1.2rem;
			font-family: "Varela Round", sans-serif;
			box-shadow: 0 0rem 0.5rem #b9b9b9;
		}
	}

	.loading {
		margin-top: 2rem;
		color: white;
		font-family: "Jost", sans-serif;
		font-size: 3rem;
		letter-spacing: 0.2rem;
	}
`;

export default SingleVehicleMap;
