import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue, once } from "firebase/database";

const LocationContext = React.createContext();

export const LocationProvider = ({ children }) => {
	const [trackingId, setTrackingId] = useState("849-WB 69 8181");

	const folderStructure = async () => {
		const response = await axios(
			"https://tracknerd-staging-default-rtdb.firebaseio.com/.json"
		);
		const data = response.data;

		if (data) {
			const len = Object.keys(data).length;

			for (let i = 0; i < len; i++) {
				const vehicle = data[Object.keys(data)[i]];
				if (
					vehicle &&
					vehicle.ignition &&
					vehicle.movement &&
					vehicle.location
				) {
					const ignition = vehicle.ignition.status;
					const movement = vehicle.movement.status;
					const speed = vehicle.location.speed;
					if (ignition && movement && speed > 10) {
						setTrackingId(Object.keys(data)[i]);
						break;
					}
				}
			}
		}
	};

	useEffect(() => {
		folderStructure();
	}, []);

	return (
		<LocationContext.Provider value={{ showMap, setShowMap, trackingId }}>
			{children}
		</LocationContext.Provider>
	);
};

export const useLocationContext = () => {
	return useContext(LocationContext);
};
