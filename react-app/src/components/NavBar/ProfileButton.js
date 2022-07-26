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
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="navBar">
          <ul className="profile-dropdown">
            <ul>{user.username}</ul>
            <ul>{user.email}</ul>
            <ul>
              <NavLink to={`/users/${sessionUser.id}`}>
                <button type="button">
                  Profile
                </button>
              </NavLink>
            </ul>
            <ul>
              <button onClick={logout}>Log Out</button>
            </ul>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
