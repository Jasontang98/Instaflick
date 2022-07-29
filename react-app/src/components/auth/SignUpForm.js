import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    if (username.length < 6) {
      setErrors(['Username must be at least 6 characters.'])
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else if (password.length < 6) {
      setErrors(['Password must be at least 6 characters.'])
    }else {
      setErrors(['Passwords do not match.']);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/feed" />;
  }

  return (
    <div id="react-root">
      <section className="login-sections">
        <main className="login-main-section">
          <article className="login-main-actual">
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

                <div className="login-card">
                  <form onSubmit={onSignUp} className="login-form-form">
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
                              placeholder="Username"
                              value={username}
                              onChange={updateUsername}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="login-email-input-container">
                        <div className="login-email-input-container-child">
                          <label className="login-email-label">
                            <input
                              className="login-email-input"
                              name="email"
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
                      <div className="login-email-input-container">
                        <div className="login-email-input-container-child">
                          <label className="login-email-label">
                            <input
                              className="login-email-input"
                              name="password"
                              type="password"
                              required
                              placeholder="Confirm Password"
                              value={repeatPassword}
                              onChange={updateRepeatPassword}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="login-button-container">
                        <button className="login-button" type="submit">
                          <div className="login-button-text">Sign Up</div>
                        </button>
                      </div>
                    </div>
                    <div className="error-handler-login">
                      {errors.map((error, ind) => (
                        <div className="error-ptag" key={ind}>
                          {error}
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </div>
              <div className="login-right-container-bottom-part">
                <div className="login-right-container-bottom-part-child">
                  <p className="no-account-text">
                    Have an account?
                    <NavLink exact to="/login" className="signup-button">
                      <span className="signup-text">Log in </span>
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

export default SignUpForm;
