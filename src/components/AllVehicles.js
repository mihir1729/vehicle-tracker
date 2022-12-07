import React from "react";
import styled from "styled-components";
import Vehicle from "./Vehicle";
import { useVehicleContext } from "../context/vehicle_context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const AllVehicles = () => {
	const { vehicleList, text, setText, filteredList } = useVehicleContext();

	return (
		<Wrapper>
			<div className='form'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className='form__control'>
						<input
							type='text'
							placeholder='enter registration number'
							value={text}
							onChange={(e) => {
								setText(e.target.value.toLowerCase());
							}}
						/>
						<div className='form__control-icon'>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</div>
					</div>
				</form>
			</div>
			<div className='display'>
				{filteredList.map((item, index) => {
					const {
						registrationNumber,
						type,
						id,
						make,
						model,
						status,
						odometerReading,
					} = item;

					return (
						<Vehicle
							key={index}
							number={registrationNumber}
							type={type}
							id={id}
							make={make}
							model={model}
							status={status}
							odometer={odometerReading}
						/>
					);
				})}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;

	.form {
		padding: 0.5rem 10rem 0.5rem 0;
		min-width: 60vw;

		&__control {
			display: flex;
			justify-content: center;
			position: relative;
			input {
				background: #fff;
				border-color: transparent;
				height: 2vw;
				width: 20vw;
				font-family: "Montserrat Alternates", sans-serif;
				font-size: 1.3vw;
				border-radius: 1rem;
				outline: 0.3rem solid #525252;
			}

			&-icon {
				position: relative;
				right: 2vw;
				top: 0.3vw;
				font-size: 1.2vw;
				color: #525252;
			}
		}
	}

	.display {
		display: flex;
		flex-wrap: wrap;
	}
`;

export default AllVehicles;
