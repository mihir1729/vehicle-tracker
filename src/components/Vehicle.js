import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";

const Vehicle = ({ number, type, make, model, id, status, odometer }) => {
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
						<span>Model:</span> {model || "SUV"}
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
					<FontAwesomeIcon icon={faTruckFasts} />
				</div>
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
			margin-top: 1rem;
			font-size: 8rem;
		}
	}
`;

export default Vehicle;
