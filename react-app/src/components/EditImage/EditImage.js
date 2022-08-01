import { editSingleImage } from "../../store/images";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import "./editimage.css";

const EditImage = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const image = useParams();

  const images = useSelector((state) => state.images);
  const sessionUser = useSelector((state) => state.session.user);

  const currentImage = images[image?.id];
  const [description, setDescription] = useState(currentImage.description);
  const [validationErrors, setValidationErrors] = useState([]);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionUser) history.push("/login");
    const errors = [];

    if (description.length > 500) errors.push("Content is too long");

    if (errors.length) {
      setValidationErrors(errors);
      return;
    }

    const data = {
      description,
      id: image?.id,
    };
    await dispatch(editSingleImage(data));
    history.push(`/images/${image?.id}`);
    setShowModal(false);
  };

  const cancelButton = async (e) => {
    setShowModal(false);
  };

  if (!sessionUser) return <Redirect to="/signup" />;

  return (
    <div className="edit-profile-main-container">
      <div className="edit-profile-main-container-child">
        <div className="upload-photo-modal-container">
          <div className="upload-photo-modal-container-child">
            <div className="upload-photo-modal-divider">
              <div className="upload-text-container">
                <h1 className="upload-image-h1">Edit Image Description</h1>
              </div>
              <form className="upload-form" onSubmit={handleSubmit}>
                <textarea
                  className="edit-profile-bio-text-area-2"
                  rows="7"
                  placeholder="Description (OPTIONAL)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  className="submit-upload-modal-button"
                  id="edit-comment-submit"
                  type="submit"
                >
                  Submit
                </button>
                <div className="upload-photo-button">
                  <button
                    className="edit-cancel-button"
                    type="button"
                    onClick={cancelButton}
                  >
                    Cancel
                  </button>
                  <div />
                </div>
              </form>
              <div className="error-handler-login">
                {validationErrors.map((error, idx) => (
                  <div className="errors-edit-image" key={idx}>
                    {error}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
