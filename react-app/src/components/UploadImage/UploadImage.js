import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadImage } from "../../store/images";
// import './upload.css';

const UploadImage = ({ setShowModal }) => {
  const dispatch = useDispatch();

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
    };

    dispatch(uploadImage(data));
    history.push("/feed");
      setShowModal(false);
    // console.log(setShowModal, "Set Show Modal +++++++");
  };

  const handleChange = async (e) => {
    const uploadFile = e.target.files[0];
    setFile(uploadFile);
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
            <input
              className="upload-input"
              type="file"
              name="image"
              onChange={handleChange}
              accept=".jpg, .jpeg, .png, .gif, .jfif"
            />
            <textarea
              className="upload-text-area"
              rows="7"
              placeholder="Description (OPTIONAL)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="submit-upload" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
