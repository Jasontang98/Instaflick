import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSingleUser } from "../../store/user";
import { editSessionUser } from "../../store/session";
import "./change-picture.css";

const ChangePicture = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const hiddenRef = useRef();

  const user = useSelector((state) => state.session.user);

  const [username] = useState(user?.username);
  const [description] = useState(user?.description);
  const [file, setFile] = useState(user?.prof_pic_url);
  const [setValidationErrors] = useState([]);

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    hiddenRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    if (errors.length) {
      setValidationErrors(errors);
      return;
    }

    const data = {
      description,
      file,
      username,
      id: user?.id,
    };

    setShowModal(false);
    await dispatch(getSingleUser(user?.id));
    await dispatch(editSessionUser(data));
    history.push(`/accounts/edit`);
  };

  const handleChange = async (e) => {
    const uploadFile = e.target.files[0];
    await setFile(uploadFile);
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
                  Change Profile Photo
                </h3>
              </div>

              <div className="upload-bottom-part-container">
                <form onSubmit={handleSubmit} className="upload-button-1">
                  <div
                    tabIndex="0"
                    className="upload-photo-button2"
                    onClick={handleClick}
                  >
                    Upload Photo{" "}
                  </div>
                  <strong>{file?.name}</strong>
                  <div />
                  <div className="upload-photo-button-3">
                    <input
                      ref={hiddenRef}
                      hidden
                      type="file"
                      name="profile picture"
                      onChange={handleChange}
                      accept=".jpg, .jpeg, .png"
                    />
                    <button
                      className="submit-upload-modal-button"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>{" "}
                </form>

                <div className="upload-photo-button">
                  <button
                    className="edit-cancel-button"
                    type="button"
                    onClick={cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePicture;
