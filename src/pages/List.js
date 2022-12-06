import React from "react";
import styled from "styled-components";
import { AllVehicles } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

const List = () => {
	return (
		<Wrapper>
			<div className='navbar'>
				<h1 className='navbar__heading'>TrackNerd</h1>
				<div className='navbar__page'>
					<FontAwesomeIcon icon={faTable} />
					<h3 className='navbar__page-name'>Fleet</h3>
				</div>
				<div className='navbar__page'>
					<FontAwesomeIcon icon={faMapLocationDot} />
					<h3 className='navbar__page-name'>Map</h3>
				</div>
			</div>
			<div className='list'>
				<AllVehicles />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;

	.navbar {
		width: 60vw;
		background: #181818;

		&__heading {
			font-family: "Ubuntu", sans-serif;
			color: #efefef;
			font-size: 2rem;
			letter-spacing: 0.1rem;
			border-bottom: 0.1rem solid #525252;
			padding: 0.5rem 3.5rem 1.5rem 0;
		}

		&__page {
			display: flex;
			align-items: center;
			height: 2rem;
			color: #969696;
			font-size: 1.6rem;
			margin: 3rem 0 0 3rem;

			&-name {
				margin-left: 1rem;
				font-family: "Jost", sans-serif;
				letter-spacing: 0.25rem;
			}
		}
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		margin-left: 7vw;
	}
`;

export default List;
