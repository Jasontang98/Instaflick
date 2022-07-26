import { getSingleImage, deleteSingleImage } from "../../store/images";
import { getCommentsByImage, cleanComments } from "../../store/comments";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import "./SingleImage.css";
import EditImageModal from "../EditImage/";
import Comments from "../Comments/";

const SingleImage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const oneImage = useSelector((state) => state.images[id]);
  console.log(oneImage, 'not undefined');

  const sessionUser = useSelector((state) => state.session.user);
  const account = useSelector((state) => state.session.user);
  const [isLoaded, setLoaded] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    // if (!account) history.push('/');
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

  if (!sessionUser) return <Redirect to="/signup" />;

  return (
    isLoaded && (
      <>
        <div className="tester">
          <div className="images-background-image">
            <div className="single-image-container3">
              <p className="username">{oneImage?.user_id?.username}</p>
              <img
                alt="uploadedImage"
                className="single-image-image"
                src={oneImage.image_url}
                title={oneImage.title}
              />
              <div>
                {oneImage?.user_id === account?.id ? (
                  <>
                    <div>
                      <EditImageModal />
                    </div>
                    <button
                      className="single-image-submit-btn"
                      id="delete-button"
                      onClick={ImageDeleter}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <h3 className="description">{oneImage.description}</h3>
            </div>
            <div>
              {oneImage.likes}
            </div>
            <Comments />
          </div>
        </div>
      </>
    )
  );
};

export default SingleImage;
