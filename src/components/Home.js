import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue, once } from "firebase/database";
import { useLocationContext } from "../context/location_context";

export default function Home() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
	const { trackingId } = useLocationContext();

	const [coordinates, setCoordinates] = useState();

	useEffect(() => {
		const firebaseConfig = {
			apiKey: process.env.REACT_APP_FIREBASE_KEY,
			authDomain: process.env.REACT_APP_AUTH_DOMAIN,
			databaseUrl: process.env.REACT_APP_DATABASE_URL,
			storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
			appId: process.env.REACT_APP_APP_ID,
			projectId: process.env.REACT_APP_PROJECT_ID,
		};

		const app = initializeApp(firebaseConfig);

		const database = getDatabase(app);

		const timestampRef = ref(database, `${trackingId}/location`);
		onValue(timestampRef, (snapshot) => {
			console.log(
				snapshot.val().latitude,
				snapshot.val().longitude,
				trackingId
			);
			setCoordinates([snapshot.val().latitude, snapshot.val().longitude]);
		});
	}, []);

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
