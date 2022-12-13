import React from "react";
import styled from "styled-components";
import { MapView, Navbar } from "../components";
import { useLocationContext } from "../context/location_context";
import { useLoginContext } from "../context/login_context";

const Map = () => {
	const { trackingIdInputRef, trackNewVehicle, trackKeyDown } =
		useLocationContext();
	const { login_success } = useLoginContext();

	if (login_success) {
		return (
			<Wrapper>
				<Navbar />
				<div className='map'>
					<div className='form-control'>
						<input
							id='trackingId'
							type='text'
							placeholder='enter registration number'
							ref={trackingIdInputRef}
							onKeyDown={(e) => {
								trackKeyDown(e);
							}}
						/>
						<button onClick={() => trackNewVehicle()}>Track</button>
					</div>
					<MapView />
				</div>
			</Wrapper>
		);
	}
};

const Wrapper = styled.div`
	.map {
		min-width: 60vw;
		margin-left: 28vw;

		.form-control {
			input {
				background: #fff;
				border-color: transparent;
				margin-top: 2rem;
				height: 2vw;
				width: 15vw;
				font-family: "Montserrat Alternates", sans-serif;
				font-size: 1.1vw;
				border-radius: 1rem;
				outline: 0.3rem solid #525252;
			}

			button {
				font-size: 1.2rem;
				color: #b9b9b9;
				background: black;
				padding: 0.5rem 1rem;
				margin-left: 1.5rem;
				letter-spacing: 0.05rem;

				border-radius: 0.5rem;
				border-color: transparent;
				box-shadow: 0 0 0.8rem #b9b9b9;
				cursor: pointer;
			}
		}
	}
`;

export default Map;
