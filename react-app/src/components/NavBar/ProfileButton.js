import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import UploadImageModal from "../UploadImage/";

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
    <nav className="nav-bar-main">
      <div className="nav-bar-child1"></div>
      <div className="nav-bar-child2">
        <div className="nav-bar-child-main-container">
          <div className="nav-bar-child-main-container-divider">
            <div className="nav-bar-logo-section">
              <div className="nav-bar-logo-section-child">
                <div className="nav-bar-logo-section-child-2">
                  <img
                    className="instaflick-logo-navbar"
                    src="https://i.imgur.com/WZMyYs8.png"
                    alt="instaflick-logo"
                  />
                </div>
              </div>
            </div>
            <div className="navbar-right-side-container">
              <div className="navbar-right-side-container-components">
                <div>
                  <div className="feed-button-container">
                    <NavLink
                      id="feed-button"
                      to="/feed"
                      exact={true}
                      className="fa-solid fa-house"
                    />
                  </div>
                </div>
                <div>
                  <div className="feed-button-container">
                    <UploadImageModal />
                  </div>
                </div>
                <div className="feed-button-container">
                  <img
                    onClick={openMenu}
                    src={sessionUser.prof_pic_url}
                    alt="fas fa-user-circle"
                    className="fas fa-user-circle"
                    id="prof-pic-button"
                  />
                </div>
                <div className="drop-down-container">
                  <div className="drop-down-container-child">
                    {showMenu && (
                      <ul id="profile-dropdown">
                        <div>
                          <NavLink to={`/users/${sessionUser.id}`}>
                            <button type="button">Profile</button>
                          </NavLink>
                        </div>
                        <button onClick={logout}>Log Out</button>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ProfileButton;
