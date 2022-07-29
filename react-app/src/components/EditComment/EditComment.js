import { useState } from "react";
import { useDispatch } from "react-redux";

import { editAComment } from "../../store/comments";

const EditSingleComment = ({ editedComment, setShowModal }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState(editedComment.comment);

  const [validationErrors, setValidationErrors] = useState([]);

  const editSubmit = async (e) => {
    e.preventDefault();

    setValidationErrors([]);
    const errors = [];

    if (content.length > 500) errors.push("Comment is too long");
    if (errors.length) {
      setValidationErrors(errors);
      return;
    }

    const data = {
      content,
      comments: editedComment,
    };
    await dispatch(editAComment(data));
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <div>
          <h1>Edit Comment</h1>
          <form onSubmit={editSubmit}>
            <ul>
              {validationErrors.map((error, idx) => (
                <li className="errors-signup" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
            <textarea
              className="upload-text-area"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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

export default EditSingleComment;
