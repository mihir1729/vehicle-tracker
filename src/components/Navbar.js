import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useLocationContext } from "../context/location_context";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
	let location = useLocation();
	return (
		<Wrapper>
			<div className='navbar'>
				<h1 className='navbar__heading'>TrackNerd</h1>
				<Link to='/' className='link'>
					<div
						className={
							"navbar__page " + (location.pathname === "/" ? "active" : "")
						}
						onClick={() => setShowMap(false)}
					>
						<FontAwesomeIcon icon={faTable} />
						<h3 className='navbar__page-name'>Fleet</h3>
					</div>
				</Link>
				<Link to='/map' className='link'>
					<div
						className={
							"navbar__page " + (location.pathname === "/map" ? "active" : "")
						}
						onClick={() => setShowMap(true)}
					>
						<FontAwesomeIcon icon={faMapLocationDot} />
						<h3 className='navbar__page-name'>Map</h3>
					</div>
				</Link>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.navbar {
		width: 21vw;
		min-height: 100vh;
		background: #181818;
		position: fixed;

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
			margin-top: 1rem;
			padding: 1rem 0 1rem 3rem;
			cursor: pointer;

			&-name {
				margin-left: 1rem;
				font-family: "Jost", sans-serif;
				letter-spacing: 0.25rem;
			}
		}
		.active {
			background: black;
		}

		.link {
			text-decoration: none;
		}
	}
`;

export default Navbar;
