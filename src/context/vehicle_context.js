import React, { useContext, useEffect } from "react";
import axios from "axios";

const VehicleContext = React.createContext();

const rootUrl = "https://staging-api.tracknerd.io/v1/";

export const VehicleProvider = ({ children }) => {
	const fetchVehicle = async (url) => {
		try {
			// const login = await axios.post(`${url}auth/login`, {
			// 	username: process.env.REACT_APP_USERNAME,
			// 	password: process.env.REACT_APP_PASSWORD,
			// });
			// console.log(login.data);
			// const vehicles = await axios.get(`${url}vehicle-groups/vehicles`, {
			// 	headers: { Authorization: `Bearer ${login.data.token}` },
			// });
			// console.log(vehicles.data);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		fetchVehicle(rootUrl);
	}, []);

	return (
		<VehicleContext.Provider value={{}}>{children}</VehicleContext.Provider>
	);
};

export const useVehicleContext = () => {
	return useContext(VehicleContext);
};
