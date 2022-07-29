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
      return;
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
    <div>
      <div>
        <div>
          <h1 className="upload-image-h1">Upload Image</h1>
          <form className="upload-form" onSubmit={handleSubmit}>
            <ul>
              {validationErrors.map((error, idx) => (
                <li className="errors-signup" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
            <div onClick={handleClick}>Upload Photo </div>
            <input
              ref={hiddenRef}
              hidden
              type="file"
              name="profile picture"
              onChange={handleChange}
              accept=".jpg, .jpeg, .png"
            />
            <button className="submit-upload" type="submit">
              Submit
            </button>
            <button type="button" onClick={cancelButton}>
              Cancel
            </button>
            <textarea
              className="upload-text-area"
              rows="7"
              placeholder="Description (OPTIONAL)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
