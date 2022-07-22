import { getAllImages } from "../../../../react-app/src/store/images/index.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./feed.css";

const Images = () => {
  const dispatch = useDispatch();
  const imagesObject = useSelector((state) => state.images);
  const images = Object.values(imagesObject);
  const sessionUser = useSelector((state) => state.session.user);

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
