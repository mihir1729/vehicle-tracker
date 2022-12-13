import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

const MiniMap = ({ coordinates }) => {
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
};

const Wrapper = styled.div`
	.map-container {
		margin-top: 1rem;
		width: 25vw;
		height: 35vh;
		border-radius: 0.5rem;
	}
`;

export default MiniMap;
