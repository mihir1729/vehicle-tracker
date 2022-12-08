import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTruckFast,
	faToggleOn,
	faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { useLocationContext } from "../context/location_context";
import { ref, onValue } from "firebase/database";

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
	const [timestamp, setTimestamp] = useState();
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
			console.log(snapshot.val());
		});

		return unsubscribe;
	}, [id]);

	return (
		<Wrapper>
			<div className='vehicle'>
				<h2 className='vehicle__number'>{registrationNumber}</h2>
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
