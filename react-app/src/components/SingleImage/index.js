import { getSingleImage, deleteSingleImage } from "../../store/images";
import { getCommentsByImage, cleanComments } from "../../store/comments";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect, NavLink } from "react-router-dom";
import "./SingleImage.css";
import EditImageModal from "../EditImage/";
import Comments from "../Comments/Comments";

const SingleImage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const oneImage = useSelector((state) => state.images[id]);
  const sessionUser = useSelector((state) => state.session.user);

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSingleImage(id))
      .then(async () => await dispatch(getCommentsByImage(id)))
      .then(() => setLoaded(true));

    return () => {
      dispatch(cleanComments());
    };
  }, [id, dispatch]);

  const ImageDeleter = async (e) => {
    await dispatch(deleteSingleImage(id));
    history.push("/feed");
  };

  if (!oneImage) return null;

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    isLoaded && (
      <div className="single-image-arranger">
        <div className="main-container-single-image">
          <div className="main-container-single-image-child">
            <div className="main-container-final">
              <div className="single-image-left-side-container">
                <img
                  alt="uploadedImage"
                  className="single-image-image2"
                  src={oneImage.image_url}
                  title={oneImage.title}
                />
              </div>
              <div className="single-image-right-side-container">
                <div className="right-side-profpic-container">
                  <div className="username-container">
                    <div className="username-container-child">
                      <div className="username-container-grandchild">
                        <NavLink
                          className="username-navlink-singleimage"
                          exact
                          to={`/users/${oneImage.user_id}`}
                        >
                          <p className="username-single-image">
                            {oneImage?.username}
                          </p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="name-above-description">

                  <NavLink
                    className="username-navlink-singleimage"
                    exact
                    to={`/users/${oneImage.user_id}`}
                  >
                    <p className="username-single-image">{oneImage?.username}</p>
                  </NavLink>
                </div>
                <div className="single-image-description">
                  <p className="description">{oneImage.description}</p>
                </div>
                <div className="edit-delete-button">
                  {oneImage?.user_id === sessionUser?.id ? (
                    <>
                      <div className="single-edit-button">
                        <EditImageModal />
                      </div>
                      <div className="single-delete-button">
                        <button

                          id="delete-button"
                          onClick={ImageDeleter}
                        >
                          Delete Post
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <Comments />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SingleImage;
