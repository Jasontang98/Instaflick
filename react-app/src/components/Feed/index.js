import { getAllImages } from "../../../../react-app/src/store/images.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
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

  if (!sessionUser) return <Redirect to="/signup" />;

  return (
    <div className="tester">
      <div className="images-background-image">
        <div className="all-images-container">
          {images.map((image) => (
            <div className="image-container" key={image.id}>
              <NavLink exact to={`/images/${image.id}`}>
                <ul>
                  {users.map((user) => {
                    return (
                      <>
                        <div
                          className="prof-pic-contain"
                          key={user.prof_pic_url}
                        >
                          {user?.username === image?.username ? (
                            <>
                              {console.log(image, "IMage")}
                              <img
                                src={user?.prof_pic_url}
                                alt="prof_pic_url"
                                id="prof_pics"
                              />
                              <div />
                              <strong>{image.username}</strong>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </>
                    );
                  })}
                </ul>
                <img
                  alt="uploaded"
                  className="image-frame"
                  src={image.image_url}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Images;
