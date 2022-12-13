import React, { useContext, useReducer, useRef } from "react";
import axios from "axios";
import reducer from "../reducer/login_reducer";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../actions";

const initialState = {
	email: "",
	password: "",
	login_start: false,
	login_success: false,
	login_error: false,
	token: "",
};

const LoginContext = React.createContext();

const rootUrl = "https://staging-api.tracknerd.io/v1/";

export const LoginProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const login = async () => {
		dispatch({
			type: LOGIN_START,
			payload: {
				email: emailInputRef.current.value,
				password: passwordInputRef.current.value,
			},
		});

		try {
			const userLogin = await axios.post(`${rootUrl}auth/login`, {
				username: emailInputRef.current.value,
				password: passwordInputRef.current.value,
			});

			const token = userLogin.data.token;

			if (token) {
				dispatch({ type: LOGIN_SUCCESS, payload: token });
			}
		} catch (error) {
			dispatch({ type: LOGIN_ERROR });
			console.log(error.response);
		}
	};

	const logout = () => {
		dispatch({ type: LOGOUT });
	};

	const enterKeyDown = (e) => {
		if (e.keyCode === 13) {
			login();
		}
	};

	return (
		<LoginContext.Provider
			value={{
				emailInputRef,
				passwordInputRef,
				login,
				logout,
				enterKeyDown,
				...state,
			}}
		>
			{children}
		</LoginContext.Provider>
	);
};

export const useLoginContext = () => {
	return useContext(LoginContext);
};
