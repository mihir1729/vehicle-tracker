import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { liveVehicles } from "../utils/mockData";
import reducer from "../reducer/vehicle_reducer";
import {
	GET_VEHICLES_BEGIN,
	GET_VEHICLES_SUCCESS,
	GET_VEHICLES_ERROR,
	UPDATE_SEARCH,
	FILTER_VEHICLES,
} from "../actions";
import { useLoginContext } from "./login_context";

const initialState = {
	vehicleList: [],
	vehicleList_loading: false,
	vehicleList_error: false,
	filteredList: [],
	search: "",
};

const VehicleContext = React.createContext();

const rootUrl = "https://staging-api.tracknerd.io/v1/";

export const VehicleProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { token } = useLoginContext();

	const fetchVehicles = async (url) => {
		dispatch({ type: GET_VEHICLES_BEGIN });

		try {
			if (token) {
				const vehicles = await axios.get(`${url}vehicle-groups/vehicles`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const dataset = vehicles.data.data;
				let vehicleArray = [];

				if (dataset) {
					for (let i = 0; i < dataset.length; i++) {
						if (i === 0) {
							vehicleArray = [...dataset[i].vehicles];
						} else {
							vehicleArray = [...vehicleArray, ...dataset[i].vehicles];
						}

						if (i === dataset.length - 1) {
							vehicleArray = [...liveVehicles, ...vehicleArray];
							dispatch({ type: GET_VEHICLES_SUCCESS, payload: vehicleArray });
						}
					}
				}
			}
		} catch (error) {
			dispatch({ type: GET_VEHICLES_ERROR });
			console.log(error.response);
		}
	};

	const updateSearch = (e) => {
		let searchValue = e.target.value.toLowerCase();
		dispatch({ type: UPDATE_SEARCH, payload: searchValue });
	};

	useEffect(() => {
		fetchVehicles(rootUrl);
	}, [token]);

	useEffect(() => {
		dispatch({ type: FILTER_VEHICLES });
	}, [state.search]);

	return (
		<VehicleContext.Provider value={{ ...state, updateSearch }}>
			{children}
		</VehicleContext.Provider>
	);
};

export const useVehicleContext = () => {
	return useContext(VehicleContext);
};
