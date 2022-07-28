import React, { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllImages } from "../../../../react-app/src/store/images.js";
import "./User.css";
import { getSingleUser } from "../../store/user.js";
// import { deleteSingleUser } from "../../store/session.js";
// import EditUser from "../EditUser";

function User() {
  const dispatch = useDispatch();
  const history = useHistory();
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

  return (
    <>
      <img src={user.prof_pic_url} alt="profile pic" />
      <p>{user.description}</p>
      <ul>
        <strong>User Id</strong> {userId}
      </ul>
      <ul>
        <strong>{user?.username}</strong>
        {account.id === parseInt(userId) ? (
          <div>
            <NavLink to="/accounts/edit">Edit profile</NavLink>
          </div>
        ) : (
          <></>
        )}
      </ul>
      <ul>
        <strong>Email</strong> {user?.email}
      </ul>
      {images.map((image) => (
        <div key={image.id}>
          <NavLink exact to={`/images/${image.id}`}>
            {" "}
            {parseInt(userId) === image.user_id ? (
              <img
                alt="uploaded"
                className="image-frame"
                src={image.image_url}
              />
            ) : (
              <></>
            )}
          </NavLink>
        </div>
      ))}{" "}
    </>
  );
}
export default User;
