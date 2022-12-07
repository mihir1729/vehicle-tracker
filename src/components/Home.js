import React from "react";
import styled from "styled-components";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function Home() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return <Map />;
}

function Map() {
	const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
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
		height: 100vh;
	}
`;
