import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { ref, onValue } from "firebase/database";
import { useLocationContext } from "../context/location_context";

export default function Home() {
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
		return <div>Loading...</div>;
	}

	if (coordinates) {
		return (
			<>
				<MapWrapper>
					<h2>Tracking : {trackingId}</h2>
					<h2>Lat & Long</h2>
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
		width: 50vw;
		height: 80vh;
	}
`;

const MapWrapper = styled.div`
	h2 {
		color: white;
	}
`;
