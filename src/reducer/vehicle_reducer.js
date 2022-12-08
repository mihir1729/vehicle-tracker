import {
	GET_VEHICLES_BEGIN,
	GET_VEHICLES_SUCCESS,
	GET_VEHICLES_ERROR,
	UPDATE_SEARCH,
	FILTER_VEHICLES,
} from "../actions";

const vehicle_reducer = (state, action) => {
	if (action.type === GET_VEHICLES_BEGIN) {
		return { ...state, vehicleList_loading: true };
	}

	if (action.type === GET_VEHICLES_SUCCESS) {
		return {
			...state,
			vehicleList_loading: false,
			vehicleList: action.payload,
			filteredList: action.payload,
		};
	}

	if (action.type === GET_VEHICLES_ERROR) {
		return { ...state, vehicleList_loading: false, vehicleList_error: true };
	}

	if (action.type === UPDATE_SEARCH) {
		return { ...state, search: action.payload };
	}

	if (action.type === FILTER_VEHICLES) {
		const { search, vehicleList } = state;
		let tempList = vehicleList;
		if (search) {
			tempList = tempList.filter((vehicle) => {
				return vehicle.registrationNumber.toLowerCase().includes(search);
			});
		} else {
			tempList = [...vehicleList];
		}

		return { ...state, filteredList: tempList };
	}

	return state;
};

export default vehicle_reducer;
