import React from "react";
import styled from "styled-components";
import { AllVehicles, Navbar, LoginButton } from "../components";
import { useAuth0 } from "@auth0/auth0-react";

const Fleet = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const isUser = user && isAuthenticated;

	if (isLoading) {
		return (
			<Wrapper>
				<h2 className='load'>...Logging in</h2>
			</Wrapper>
		);
	}

	if (!isUser) {
		return <LoginButton />;
	}

	if (isUser) {
		return (
			<Wrapper>
				<Navbar />
				<div className='list'>
					<AllVehicles />
				</div>
			</Wrapper>
		);
	}
};

const Wrapper = styled.div`
	.list {
		display: flex;
		min-width: 60vw;
		flex-wrap: wrap;
		margin-left: 28vw;
	}

	.load {
		color: white;
		font-family: "Jost", sans-serif;
		letter-spacing: 0.2rem;
		max-width: max-content;
		transform: translate(38vw, 25vh);
		font-size: 3rem;
	}
`;

export default Fleet;
