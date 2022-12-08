import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { ref, onValue } from "firebase/database";
import { useLocationContext } from "../context/location_context";

export default function MapView() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
	const { trackingId, firebaseSetup } = useLocationContext();

	const [coordinates, setCoordinates] = useState();

	useEffect(() => {
		if (trackingId) {
			const database = firebaseSetup();

			const timestampRef = ref(database, `${trackingId}/location`);
			const unsubscribe = onValue(timestampRef, (snapshot) => {
				console.log(
					snapshot.val().latitude,
					snapshot.val().longitude,
					trackingId
				);
				setCoordinates([snapshot.val().latitude, snapshot.val().longitude]);
			});

			return unsubscribe;
		}
	}, [trackingId]);

	if (!isLoaded) {
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
					<h2 className='vehicle'>
						Tracking : <span> {trackingId} </span>
					</h2>
					<h2 className='coordinates'>
						Lat : <span>{coordinates[0]}</span>
						Long : <span>{coordinates[1]}</span>
					</h2>
					<Map coordinates={coordinates} />
				</MapWrapper>
			</>
		);
	}
}

function Map({ coordinates }) {
	const [lat, setLat] = useState(coordinates[0]);
	const [long, setLong] = useState(coordinates[1]);
	const [center, setCenter] = useState({ lat: lat, lng: long });

	useEffect(() => {
		setLat(coordinates[0]);
		setLong(coordinates[1]);
		setCenter({ lat: lat, lng: long });
	}, [coordinates]);

	return (
		<Wrapper>
			<GoogleMap
				zoom={10}
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
		margin-top: 2rem;
		width: 50vw;
		height: 77vh;
		border-radius: 0.5rem;
	}
`;

const MapWrapper = styled.div`
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
		font-family: "M PLUS 1", sans-serif;
		letter-spacing: 0.1rem;
		font-size: 0.8rem;
		span {
			margin-right: 3rem;
			font-size: 1.2rem;
			font-family: "Varela Round", sans-serif;
			box-shadow: 0 0rem 0.5rem #b9b9b9;
		}
	}

	.loading {
		color: white;
		font-family: "Jost", sans-serif;
		text-align: center;
		font-size: 3rem;
		letter-spacing: 0.2rem;
	}
`;
