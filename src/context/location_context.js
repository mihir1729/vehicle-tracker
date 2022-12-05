import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue, once } from "firebase/database";

const LocationContext = React.createContext();

export const LocationProvider = ({ children }) => {
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
	const vehicleLocationRef = ref(database, `91-SK 01 D 4016/location`);
	onValue(vehicleLocationRef, (snapshot) => {
		console.log(snapshot.exists());
	});

	return (
		<LocationContext.Provider value={{}}>{children}</LocationContext.Provider>
	);
};

export const useLocationContext = () => {
	return useContext(LocationContext);
};
