import React from "react";
import styled from "styled-components";
import Vehicle from "./Vehicle";
import { useVehicleContext } from "../context/vehicle_context";

const AllVehicles = () => {
	const { vehicleList } = useVehicleContext();

	return (
		<>
			{vehicleList.map((item, index) => {
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
		</>
	);
};

const Wrapper = styled.div``;

export default AllVehicles;
