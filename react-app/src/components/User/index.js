import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllImages } from "../../../../react-app/src/store/images.js";
import "./User.css";
import EditUser from "../EditUser";

function User() {
  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  const { userId } = useParams();

  const imagesObject = useSelector((state) => state.images);
  const account = useSelector((state) => state.session.user);

  const images = Object.values(imagesObject);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

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
        <strong>{user.username}</strong>
        {account.id === parseInt(userId) ? (
          <div>
            <EditUser />
          </div>
        ) : (
          <></>
        )}
      </ul>
      <ul>
        <strong>Email</strong> {user.email}
      </ul>
      {images.map((image) => (
        <div className="image-container" key={image.id}>
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
