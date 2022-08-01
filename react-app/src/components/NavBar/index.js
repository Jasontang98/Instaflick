import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </>
    );
  }
  return (
    <nav>
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </div>
      <div />
      {/* <div>
        <NavLink to="/users" exact={true} activeClassName="active">
          Users
        </NavLink>
      </div> */}
      {loaded && sessionLinks}
    </nav>
  );
};

export default NavBar;
