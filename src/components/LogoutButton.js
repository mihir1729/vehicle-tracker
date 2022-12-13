import React from "react";
import styled from "styled-components";
import { useLoginContext } from "../context/login_context";
import { Link } from "react-router-dom";

const LogoutButton = () => {
	const { logout } = useLoginContext();

	return (
		<Wrapper>
			<Link to={`/`}>
				<button onClick={() => logout()} className='.btn'>
					Log Out
				</button>
			</Link>
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
