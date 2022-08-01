import React, { useEffect } from "react";
import { useParams, NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllImages } from "../../../../react-app/src/store/images.js";
import "./User.css";
import { getSingleUser } from "../../store/user.js";

import "./User.css";

function User() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { userId } = useParams();
  const usersObject = useSelector((state) => state.user);
  let user;
  if (usersObject) {
    user = usersObject[userId];
  }

  const imagesObject = useSelector((state) => state.images);
  const account = useSelector((state) => state.session.user);

  const images = Object.values(imagesObject);

  useEffect(() => {
    dispatch(getSingleUser(userId));
    dispatch(getAllImages());
  }, [dispatch, userId]);

  if (!user) {
    return null;
  }

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <div className="profileWholeContainer">
      <div className="info-images">
        <div className="Topprof">
          <div className="Profpiccontainer">
            <img
              className="profPic"
              src={user.prof_pic_url}
              alt="profile pic"
            />
          </div>
          <div className="allinfo">
            <div className="userandedit">
              <p className="profUsername">{user?.username}</p>
              {account.id === parseInt(userId) ? (
                <div className="edit-prof-button">
                  <NavLink className="edit-prof" to="/accounts/edit">
                    Edit profile
                  </NavLink>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="prof-description-container">
              <p className="profDescription">{user.description}</p>
            </div>
          </div>
        </div>

        <div className="imgContainer">
          {images.map((image) => (
            <div key={image.id}>
              <NavLink exact to={`/images/${image.id}`}>
                {parseInt(userId) === image.user_id ? (
                  <div className="profImages">
                    <img
                      alt="uploaded"
                      className="profimage"
                      src={image.image_url}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default User;
