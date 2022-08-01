import { getAllImages } from "../../../../react-app/src/store/images.js";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { addALike, deleteALike } from "../../store/image-likes";
import "./feed.css";

const Images = () => {
  const dispatch = useDispatch();
  const imagesObject = useSelector((state) => state.images);
  const images = Object.values(imagesObject);

  const sessionUser = useSelector((state) => state.session.user);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <div className="wholepage">
      <div className="column-container">
        {images.map((image) => (
          <div className="card-container" key={image.id}>
            <div className="image-container">
              {users.map((user) => {
                return (
                  <>
                    {user?.id === image?.user_id ? (
                      <>
                        <div className="feed-prof-pic-container" key={user.id}>
                          <div className="user-prof-pic-container">
                            <NavLink exact to={`/users/${image.user_id}`}>
                              <img
                                src={user?.prof_pic_url}
                                alt="prof_pic_url"
                                id="prof_pics"
                              />
                            </NavLink>
                          </div>
                          <div className="feed-username-top">
                            <NavLink
                              className="userName"
                              exact
                              to={`/users/${image.user_id}`}
                            >
                              <p>{user.username}</p>
                            </NavLink>
                          </div>
                        </div>
                        <NavLink to={`/images/${image.id}`}>
                          <img
                            alt="uploaded"
                            className="image-frame"
                            src={image.image_url}
                            id="feed_img"
                          />
                        </NavLink>
                        <div className="feed-likes-container">
                          {image.likes.filter((like) => {
                            return sessionUser.id === like.user_id;
                          }).length === 0 ? (
                            <img
                              className="like-button"
                              src="https://i.imgur.com/JEkOshg.png"
                              onClick={() =>
                                dispatch(addALike(image, sessionUser.id))
                              }
                              type="submit"
                              alt="like-button"
                            ></img>
                          ) : (
                            <img
                              className="like-button"
                              src="https://i.imgur.com/XXQN4Dk.png"
                              onClick={() =>
                                dispatch(deleteALike(image, sessionUser.id))
                              }
                              type="submit"
                              alt="dislike-button"
                            ></img>
                          )}
                        </div>
                        <div className="feed-likes-number">
                          {image.likes.length === 1
                            ? `${image.likes.length} like`
                            : `${image.likes.length} likes`}
                        </div>
                        <div className="feed-bottom-username">
                          <NavLink
                            className="userName"
                            exact
                            to={`/users/${image.user_id}`}
                          >
                            <p>{user.username}</p>
                          </NavLink>
                          <div className="feed-image-description">
                            <p className="image-description">{image.description}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
