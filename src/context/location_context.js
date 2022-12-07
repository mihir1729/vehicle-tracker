import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue, once } from "firebase/database";

const LocationContext = React.createContext();

export const LocationProvider = ({ children }) => {
	const [showMap, setShowMap] = useState(false);

	const folderStructure = async () => {
		const response = await axios(
			"https://tracknerd-staging-default-rtdb.firebaseio.com/.json"
		);
		console.log(response.data);
	};

	useEffect(() => {
		folderStructure();
	}, []);

	return (
		<LocationContext.Provider value={{ showMap, setShowMap }}>
			{children}
		</LocationContext.Provider>
	);
};

export const useLocationContext = () => {
	return useContext(LocationContext);
};
