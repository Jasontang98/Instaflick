import { useState } from "react";
import { useDispatch } from "react-redux";
import "./editcomment.css";

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
                <h1>Edit Comment</h1>
              </div>
              <form onSubmit={editSubmit}>
                <textarea
                  className="edit-profile-bio-text-area-2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div />
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
                <div className="error-handler-login">
                  {validationErrors.map((error, ind) => (
                    <div className="error-ptag" key={ind}>
                      {error}
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSingleComment;
