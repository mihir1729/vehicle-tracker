import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<Wrapper>
			<button
				onClick={() => logout({ returnTo: window.location.origin })}
				className='.btn'
			>
				Log Out
			</button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	button {
		font-size: 1.1rem;
		color: #969696;
		background: black;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		margin-left: 5.5rem;
		border-color: transparent;
		transform: translateY(50vh);
		box-shadow: 0 0 0.4rem #b9b9b9;
		cursor: pointer;
	}
`;

export default LogoutButton;
