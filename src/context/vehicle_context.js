import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { liveVehicles, mockData } from "../utils/mockData";

const VehicleContext = React.createContext();

const rootUrl = "https://staging-api.tracknerd.io/v1/";

export const VehicleProvider = ({ children }) => {
	const [vehicleList, setVehicleList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [text, setText] = useState("");

	useEffect(() => {
		setVehicleList([...liveVehicles, ...mockData]);
	}, []);

	useEffect(() => {
		setFilteredList([...vehicleList]);
	}, [vehicleList]);

	// const fetchVehicle = async (url) => {
	// 	try {
	// 		const login = await axios.post(`${url}auth/login`, {
	// 			username: process.env.REACT_APP_USERNAME,
	// 			password: process.env.REACT_APP_PASSWORD,
	// 		});
	// 		console.log(login.data);
	// 		const vehicles = await axios.get(`${url}vehicle-groups/vehicles`, {
	// 			headers: { Authorization: `Bearer ${login.data.token}` },
	// 		});
	// 		console.log(vehicles.data.data);

	// 		const dataset = vehicles.data.data;

	// 		if (dataset) {
	// 			for (let i = 0; i < dataset.length; i++) {
	// 				if (i === 0) {
	// 					setVehicleList([...dataset[i].vehicles]);
	// 				} else {
	// 					setVehicleList((prevState) => {
	// 						return [...prevState, ...dataset[i].vehicles];
	// 					});
	// 				}
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.log(error.response);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchVehicle(rootUrl);
	// }, []);

	useEffect(() => {
		let tempList = [...vehicleList];

		if (text) {
			tempList = tempList.filter((vehicle) => {
				return vehicle.registrationNumber.toLowerCase().includes(text);
			});
			setFilteredList([...tempList]);
		} else {
			setFilteredList([...vehicleList]);
		}
	}, [text]);

	return (
		<VehicleContext.Provider
			value={{ vehicleList, text, setText, filteredList }}
		>
			{children}
		</VehicleContext.Provider>
	);
};

export const useVehicleContext = () => {
	return useContext(VehicleContext);
};
