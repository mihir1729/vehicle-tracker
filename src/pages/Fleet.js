import React from "react";
import styled from "styled-components";
import { AllVehicles } from "../components";

const Fleet = () => {
	return (
		<Wrapper>
			<div className='list'>
				<AllVehicles />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.list {
		display: flex;
		min-width: 60vw;
		flex-wrap: wrap;
		margin-left: 28vw;
	}
`;

export default Fleet;
