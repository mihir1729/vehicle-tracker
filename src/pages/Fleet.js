import React from "react";
import styled from "styled-components";
import { AllVehicles, Navbar, LoginButton } from "../components";
import { useLoginContext } from "../context/login_context";

const Fleet = () => {
	const { login_success, login_error } = useLoginContext();

	if (!login_success) {
		return <LoginButton />;
	}

	if (login_error) {
		return <LoginButton />;
	}

	if (login_success) {
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
