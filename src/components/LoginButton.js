import React from "react";
import { useLoginContext } from "../context/login_context";
import styled from "styled-components";

const LoginButton = () => {
	const { emailInputRef, passwordInputRef, login, login_error, enterKeyDown } =
		useLoginContext();

	return (
		<Wrapper>
			<div className='login'>
				<div className='login__container'>
					<h1>Vehicle Tracking Dashboard</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<div className='form__control'>
							<label htmlFor='email' className='form__control-input'>
								<span>email</span>
								<input
									id='email'
									type='text'
									ref={emailInputRef}
									onKeyDown={(e) => enterKeyDown(e)}
								/>
							</label>
							<label htmlFor='password' className='form__control-input'>
								<span>password</span>
								<input
									id='password'
									type='password'
									ref={passwordInputRef}
									onKeyDown={(e) => enterKeyDown(e)}
								/>
							</label>
						</div>
					</form>
					<button onClick={() => login()}>Log In</button>
					{login_error && (
						<span className='error'>Invalid Login Credentials!</span>
					)}
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.login {
		display: inline-block;
		&__container {
			transform: translate(27vw, 20vh);
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 48vw;
			height: 28vw;
			border-radius: 0.5rem;
			border-color: transparent;
		}
		h1 {
			color: white;
			font-family: "Jost", sans-serif;
			letter-spacing: 0.2rem;
			max-width: max-content;
			font-size: 3rem;
			margin-top: 2.5rem;
			margin-bottom: 4rem;
		}
		button {
			font-size: 2rem;
			color: #b9b9b9;
			background: black;
			padding: 0.5rem 1rem;

			border-radius: 0.5rem;
			border-color: transparent;
			box-shadow: 0 0 0.8rem #b9b9b9;
			cursor: pointer;
		}

		.form__control {
			display: flex;
			flex-direction: column;
			color: white;

			span {
				display: inline-block;
				width: 9vw;
				font-family: "Jost", sans-serif;
				font-size: 1.5rem;
				letter-spacing: 0.25rem;
				color: #969696;
				text-transform: capitalize;
			}

			&-input {
				margin-bottom: 1.5rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 25vw;

				input {
					border-color: transparent;
					height: 1.3vw;
					width: 15vw;
					border-radius: 1rem;
					outline: 0.1rem solid #525252;
					font-family: "Montserrat Alternates", sans-serif;
					font-size: 1.1vw;

					&:last-of-type {
						font: large Verdana, sans-serif;
						letter-spacing: 1px;
						font-size: 1vw;
					}

					&:focus {
						outline: 0.3rem solid #525252;
					}
				}

				&:last-of-type {
					margin-bottom: 3rem;
				}
			}
		}
		.error {
			display: inline-block;
			font-size: 0.8rem;
			width: max-content;
			margin-top: 1.2rem;
			font-family: "Jost", sans-serif;
			letter-spacing: 0.25rem;
			color: #cc7f7f;
		}
	}
`;

export default LoginButton;
