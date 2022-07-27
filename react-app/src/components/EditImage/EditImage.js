import { editSingleImage } from "../../store/images";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

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

  if (!sessionUser) return <Redirect to="/signup" />;

  return (
    <div className="tester">
      <div className="upload-image-background">
        <div className="upload-image">
          <h1 className="upload-image-h1">Edit Image Description</h1>
          <form className="upload-form" onSubmit={handleSubmit}>
            <ul>
              {validationErrors.map((error, idx) => (
                <li className="errors-signup" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
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

export default EditImage;
