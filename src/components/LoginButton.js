import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Wrapper>
			<div className='login'>
				<h1>Vehicle Tracking Dashboard</h1>
				<button onClick={() => loginWithRedirect()}>Log In</button>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.login {
		height: 80vh;
		width: 80vw;
		h1 {
			color: white;
			font-family: "Jost", sans-serif;
			letter-spacing: 0.2rem;
			max-width: max-content;
			transform: translate(28vw, 25vh);
			font-size: 3rem;
		}
		button {
			font-size: 2rem;
			color: #b9b9b9;
			background: black;
			padding: 0.5rem 1rem;
			transform: translate(42vw, 30vh);
			border-radius: 0.5rem;
			border-color: transparent;
			box-shadow: 0 0 0.8rem #b9b9b9;
			cursor: pointer;
		}
	}
`;

export default LoginButton;
