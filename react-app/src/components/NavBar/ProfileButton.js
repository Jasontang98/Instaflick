import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      {/* <button onClick={openMenu}> */}
      <img
        onClick={openMenu}
        src={sessionUser.prof_pic_url}
        alt="fas fa-user-circle"
        className="fas fa-user-circle"
        id="prof-pic-button"
      />
      {/* </button> */}
      {showMenu && (
        // <div className="navBar">
        <ul id="profile-dropdown">
          <ul>{user.username}</ul>
          <ul>{user.email}</ul>
          <div>
            <NavLink to={`/users/${sessionUser.id}`}>
              <button type="button">Profile</button>
            </NavLink>
          </div>
          <button onClick={logout}>Log Out</button>
        </ul>
        // </div>
      )}
    </>
  );
}

export default ProfileButton;
