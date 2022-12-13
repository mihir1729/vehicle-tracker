import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../actions";

const login_reducer = (state, action) => {
	if (action.type === LOGIN_START) {
		return {
			...state,
			login_start: true,
			login_error: false,
			email: action.payload.email,
			password: action.payload.password,
		};
	}

	if (action.type === LOGIN_SUCCESS) {
		return {
			...state,
			token: action.payload,
			login_start: false,
			login_success: true,
		};
	}

	if (action.type === LOGIN_ERROR) {
		return {
			...state,
			email: "",
			password: "",
			login_start: false,
			login_error: true,
		};
	}

	if (action.type === LOGOUT) {
		return {
			...state,
			email: "",
			password: "",
			login_start: false,
			login_success: false,
			login_error: false,
			token: "",
		};
	}

	return state;
};

export default login_reducer;
