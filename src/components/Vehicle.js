import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTruckFast,
	faToggleOn,
	faToggleOff,
	faLocationDot,
	faArrowLeft,
	faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { useLocationContext } from "../context/location_context";
import { ref, onValue } from "firebase/database";
import MiniMap from "./MiniMap";
import { useLoadScript } from "@react-google-maps/api";
import { Link } from "react-router-dom";

const Vehicle = ({
	registrationNumber,
	type,
	make,
	model,
	id,
	status,
	odometerReading,
}) => {
	const { firebaseSetup } = useLocationContext();
	const [timestamp, setTimestamp] = useState("...Loading");
	const [showMap, setShowMap] = useState(false);
	const [coordinates, setCoordinates] = useState();
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
	const details = [
		{ type, default: "Truck" },
		{ make, default: "M&M" },
		{ model, default: "LCV" },
		{ unique_Id: id, default: 100 },
		{ status, default: "offline" },
		{ odometer: odometerReading, default: 50 },
	];

	useEffect(() => {
		const database = firebaseSetup();
		const timestampRef = ref(database, `${id}-${registrationNumber}/timestamp`);
		const unsubscribe = onValue(timestampRef, (snapshot) => {
			setTimestamp(snapshot.val());
			console.log(snapshot.val(), registrationNumber);
		});

		return unsubscribe;
	}, [id]);

	useEffect(() => {
		setTimestamp("...Loading");
	}, [id]);

	useEffect(() => {
		setCoordinates();
		const database = firebaseSetup();
		const timestampRef = ref(database, `${id}-${registrationNumber}/location`);
		const unsubscribe = onValue(timestampRef, (snapshot) => {
			if (snapshot.val()) {
				setCoordinates([snapshot.val().latitude, snapshot.val().longitude]);
				console.log([snapshot.val().latitude, snapshot.val().longitude]);
			}
		});

		return unsubscribe;
	}, [id]);

	if (showMap && (!isLoaded || !coordinates)) {
		return (
			<>
				<div className='loading'>Loading...</div>
			</>
		);
	}

	if (showMap && isLoaded && coordinates) {
		return (
			<MapWrapper>
				<div className='vehicle'>
					<div className='header'>
						<h2 className='vehicle__number'>{registrationNumber}</h2>
						<FontAwesomeIcon
							icon={faLocationDot}
							className={
								coordinates
									? "vehicle__icon-pin green"
									: "vehicle__icon-pin red"
							}
							onClick={() => {
								if (coordinates) {
									setShowMap(!showMap);
								}
							}}
						/>
					</div>
					<MiniMap coordinates={coordinates} />
					<div className='navigation'>
						<button onClick={() => setShowMap(!showMap)}>
							<FontAwesomeIcon icon={faArrowLeft} />
						</button>
						{timestamp && (
							<div className='vehicle__timestamp'>
								<FontAwesomeIcon icon={faToggleOn} /> {timestamp}
							</div>
						)}
						{!timestamp && (
							<div className='vehicle__timestamp'>
								<FontAwesomeIcon icon={faToggleOff} /> No Timestamp
							</div>
						)}
						<Link to={`/map/${id}-${registrationNumber}`} target='_blank'>
							<button>
								<FontAwesomeIcon icon={faExpand} />
							</button>
						</Link>
					</div>
				</div>
			</MapWrapper>
		);
	}

	return (
		<Wrapper>
			<div className='vehicle'>
				<div className='header'>
					<h2 className='vehicle__number'>{registrationNumber}</h2>
					<FontAwesomeIcon
						icon={faLocationDot}
						className={
							coordinates ? "vehicle__icon-pin green" : "vehicle__icon-pin red"
						}
						onClick={() => {
							if (coordinates) {
								setShowMap(!showMap);
							}
						}}
					/>
				</div>
				<div className='vehicle__detail'>
					{details.map((detail, index) => {
						const key = Object.keys(detail)[0];
						const value = detail[key];
						return (
							<h3 key={index} className={`vehicle__detail-${key}`}>
								<span>{key}:</span> {value || detail["default"]}
							</h3>
						);
					})}
				</div>
				<div className='vehicle__icon'>
					<FontAwesomeIcon icon={faTruckFast} />
				</div>
				{timestamp && (
					<div className='vehicle__timestamp'>
						<FontAwesomeIcon icon={faToggleOn} /> {timestamp}
					</div>
				)}
				{!timestamp && (
					<div className='vehicle__timestamp'>
						<FontAwesomeIcon icon={faToggleOff} /> No Timestamp
					</div>
				)}
			</div>
		</Wrapper>
	);
};

const MapWrapper = styled.div`
	.vehicle {
		height: 23vw;
		width: 26vw;
		background: #181818;
		margin: 2rem;
		color: #efefef;
		border-radius: 0.25rem;
		text-align: center;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 3vw;
			margin-bottom: 0.5rem;
		}

		&__icon-pin {
			font-size: 1.2rem;
			padding-top: 0.7rem;
			padding-right: 1rem;
			cursor: pointer;
		}

		.green {
			color: #99d566;
		}

		.red {
			color: #a63747;
		}

		&__number {
			font-size: 1.2rem;
			font-family: "Heebo", sans-serif;
			letter-spacing: 0.15rem;
			text-align: start;
			padding: 1rem 0 0 1.2rem;
		}

		.navigation {
			display: flex;
			justify-content: space-between;
			align-items: center;
			button {
				font-size: 1rem;
				margin: 0 1.3rem;
				margin-top: 1rem;
				color: #969696;
				background: black;
				border-radius: 0.5rem;
				border-color: transparent;
				box-shadow: 0 0 0.4rem #b9b9b9;
				cursor: pointer;
			}
		}

		&__timestamp {
			display: inline-block;
			/* margin: 0.4rem; */
			margin-top: 1rem;
			font-size: 0.8rem;
			font-family: "Montserrat Alternates", sans-serif;
			box-shadow: 0 0rem 0.2rem #b9b9b9;
			letter-spacing: 0.1rem;
			padding: 0.2rem;
			width: max-content;
		}
	}
`;

const Wrapper = styled.div`
	.vehicle {
		height: 23vw;
		width: 26vw;
		background: #181818;
		margin: 2rem;
		color: #efefef;
		border-radius: 0.25rem;
		text-align: center;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 3vw;
			margin-bottom: 0.5rem;
		}

		&__icon-pin {
			font-size: 1.2rem;
			padding-top: 0.7rem;
			padding-right: 1rem;
			cursor: pointer;
		}

		.green {
			color: #99d566;
		}

		.red {
			color: #a63747;
		}

		span {
			font-weight: 400;
			font-family: "M PLUS 1", sans-serif;
			letter-spacing: 0.1rem;
			font-size: 0.55rem;
			color: #f9f9f9;
			text-transform: capitalize;
		}

		&__number {
			font-size: 1.2rem;
			font-family: "Heebo", sans-serif;
			letter-spacing: 0.15rem;
			text-align: start;
			padding: 1rem 0 0 1.2rem;
		}

		&__detail {
			border: 0.1rem solid #4a4a4a;
			margin: 0 1.2rem 0 1.2rem;
			padding: 0.1rem;
			height: 5vw;
			border-radius: 0.25rem;
			font-size: 0.6rem;
			letter-spacing: 0.05rem;
			font-family: "Varela Round", sans-serif;

			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;

			* {
				width: 33%;
				text-align: center;
			}
		}

		&__icon {
			margin-top: 0.3rem;
			font-size: 8rem;
			text-align: center;
		}

		&__timestamp {
			display: inline-block;
			margin: 0.4rem;
			font-size: 0.8rem;
			font-family: "Montserrat Alternates", sans-serif;
			box-shadow: 0 0rem 0.2rem #b9b9b9;
			letter-spacing: 0.1rem;
			padding: 0.2rem;
			width: max-content;
		}
	}
`;

export default Vehicle;
