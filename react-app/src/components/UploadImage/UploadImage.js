import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadImage } from "../../store/images";
import "./upload.css";

const UploadImage = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const hiddenRef = useRef();

  const user = useSelector((state) => state.session.user);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) history.push("/login");
    const errors = [];

    if (description.length > 500) errors.push("Description is too long");

    if (errors.length) {
      setValidationErrors(errors);
      return errors;
    }

    const data = {
      description,
      file,
      userId: user?.id,
      username: user?.username,
    };

    dispatch(uploadImage(data));
    history.push("/feed");
    setShowModal(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    hiddenRef.current.click();
  };

  const handleChange = async (e) => {
    const uploadFile = e.target.files[0];
    setFile(uploadFile);
  };

  const cancelButton = async (e) => {
    setShowModal(false);
  };

  return (
    <div className="edit-profile-main-container">
      <div className="edit-profile-main-container-child">
        <div className="upload-photo-modal-container">
          <div className="upload-photo-modal-container-child">
            <div className="upload-photo-modal-divider">
              <div className="upload-text-container">
                <h3 className="upload-text-h3" tabIndex="-1">
                  Upload Image
                </h3>
              </div>

              <div className="upload-bottom-part-container">
                <form onSubmit={handleSubmit} className="upload-button-1">
                  <div
                    tabIndex="0"
                    className="upload-photo-button2"
                    onClick={handleClick}
                  >
                    Upload Photo
                  </div>
                  <div className="upload-photo-button-3">
                    <input
                      ref={hiddenRef}
                      hidden
                      type="file"
                      name="profile picture"
                      onChange={handleChange}
                      accept=".jpg, .jpeg, .png"
                    />
                    <strong>{file?.name}</strong>
                    <div />
                    <button
                      className="submit-upload-modal-button"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>{" "}
                  <div className="error-handler-upload">
                    {validationErrors.map((error, ind) => (
                      <div className="error-ptag-upload" key={ind}>
                        {error}
                      </div>
                    ))}
                  </div>
                </form>
                <div>
                  <textarea
                    className="edit-profile-bio-text-area-2"
                    rows="7"
                    placeholder="Description (OPTIONAL)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
