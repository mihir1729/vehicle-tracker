import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTruckFast,
	faToggleOn,
	faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { useLocationContext } from "../context/location_context";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue, once } from "firebase/database";

const Vehicle = ({ number, type, make, model, id, status, odometer }) => {
	const [timestamp, setTimestamp] = useState();

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

		const timestampRef = ref(database, `${id}-${number}/timestamp`);
		onValue(timestampRef, (snapshot) => {
			setTimestamp(snapshot.val());
			console.log(snapshot.val());
		});
	}, []);

	return (
		<Wrapper>
			<div className='vehicle'>
				<h2 className='vehicle__number'>{number}</h2>
				<div className='vehicle__detail'>
					<h3 className='vehicle__detail-type'>
						<span>Type:</span> {type || "Truck"}
					</h3>
					<h3 className='vehicle__detail-make'>
						<span>Make:</span> {make || "M&M"}
					</h3>
					<h3 className='vehicle__detail-model'>
						<span>Model:</span> {model || "LCV"}
					</h3>
					<h3 className='vehicle__detail-id'>
						<span>Unique Id:</span> {id || 100}
					</h3>
					<h3 className='vehicle__detail-status'>
						<span>Status:</span> {status || "Offline"}
					</h3>
					<h3 className='vehicle__detail-odometer'>
						<span>Odometer:</span> {odometer || 50}
					</h3>
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

const Wrapper = styled.div`
	.vehicle {
		height: 23vw;
		width: 26vw;
		background: #181818;
		margin: 2rem;
		color: #efefef;
		border-radius: 0.25rem;

		span {
			font-weight: 400;
			font-family: "M PLUS 1", sans-serif;
			letter-spacing: 0.1rem;
			font-size: 0.55rem;
			color: #f9f9f9;
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
			}
		}

		&__icon {
			margin-top: 0.3rem;
			font-size: 8rem;
		}

		&__timestamp {
			margin-top: 0.4rem;
			font-size: 0.8rem;
			font-family: "Montserrat Alternates", sans-serif;
		}
	}
`;

export default Vehicle;
