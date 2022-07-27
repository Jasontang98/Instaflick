import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './login-form.css';

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const demo = async (e) => {
		e.preventDefault();
		const demoCredential = 'demo@aa.io';
		const demoPassword = 'password';
		const data = await dispatch(login(demoCredential, demoPassword));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div id="react-root">
			<section className="login-sections">
				<main className="login-main-section">
					<article className="login-main-actual">
						<div className="login-left-container">
							<div className="login-images">
								{/* <img classNAme='login-image-one' src='https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png'/>
                <img className='login-image-two' src='https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png'/> */}
							</div>
						</div>
						<div className="login-right-container">
							<div className="login-right-container-child">
								<div className="instaflick-container">
									<div className="instaflick-logo-container">
										<img
											className="instaflick-logo"
											src="https://i.imgur.com/WZMyYs8.png"
										/>
									</div>
								</div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
								<div className="login-card">
									<form onSubmit={onLogin} className="login-form-form">
										<div className="login-container">
											<div className="login-email-input-container">
												<div className="login-email-input-container-child">
													<label className="login-email-label">
														{/* <span className='login-email-span'>Email</span> */}
														<input
															className="login-email-input"
															required
															// aria-label="Email"
															name="username"
															type="text"
															placeholder="Email"
															value={email}
															onChange={updateEmail}
														/>
													</label>
												</div>
											</div>
											<div className="login-email-input-container">
												<div className="login-email-input-container-child">
													<label className="login-email-label">
														<input
															className="login-email-input"
															name="password"
															type="password"
															placeholder="Password"
															value={password}
															onChange={updatePassword}
														/>
													</label>
												</div>
											</div>
											<div className="login-button-container">
												<button
													className="login-button"
													type="submit"
												>
													<div className="login-button-text">
														Log In
													</div>
												</button>
											</div>
											<div className="login-or-container">
												<div className="or-grey-bar"></div>
												<div className="or-text">or</div>
												<div className="or-grey-bar"></div>
											</div>
											<div className="demo-user-login-container">
												<button
													onClick={demo}
													className="demo-login-button"
													type="submit"
												>
													<div className="demo-login-button-text">
														Log in with Demo User
													</div>
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div className="login-right-container-bottom-part">
								<div className="login-right-container-bottom-part-child">
									<p className="no-account-text">
										Don't have an account?
										<NavLink
											exact
											to="/signup"
											className="signup-button"
										>
											<span className="signup-text">Sign Up </span>
										</NavLink>
									</p>
								</div>
							</div>
						</div>
					</article>
				</main>
			</section>
		</div>
	);
};

export default LoginForm;
