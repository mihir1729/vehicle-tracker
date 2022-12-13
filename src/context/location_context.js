import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const LocationContext = React.createContext();

export const LocationProvider = ({ children }) => {
	const [trackingId, setTrackingId] = useState();
	const trackingIdInputRef = useRef();

	const folderStructure = async () => {
		const response = await axios(
			"https://tracknerd-staging-default-rtdb.firebaseio.com/.json"
		);
		const data = response.data;
		console.log(data);
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

				if (i === len - 1 && !trackingId) {
					setTrackingId("849-WB 69 8181");
				}
			}
		}
	};

	useEffect(() => {
		folderStructure();
		// eslint-disable-next-line
	}, []);

	const firebaseSetup = () => {
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

		return database;
	};

	const trackNewVehicle = () => {
		setTrackingId(trackingIdInputRef.current.value);
	};

	const trackKeyDown = (e) => {
		if (e.keyCode === 13) {
			trackNewVehicle();
		}
	};

	return (
		<LocationContext.Provider
			value={{
				trackingId,
				setTrackingId,
				firebaseSetup,
				trackingIdInputRef,
				trackNewVehicle,
				trackKeyDown,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
};

export const useLocationContext = () => {
	return useContext(LocationContext);
};
