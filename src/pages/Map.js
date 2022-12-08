import React from "react";
import styled from "styled-components";
import { Home } from "../components";

const Map = () => {
	return (
		<Wrapper>
			<div className='map'>
				<Home />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.map {
		display: flex;
		min-width: 60vw;
		flex-wrap: wrap;
		margin-left: 28vw;
	}
`;

export default Map;
