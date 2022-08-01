import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditComment from "./EditComment";

function EditCommentModal({ editedComment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-comment-button" onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment
            setShowModal={setShowModal}
            editedComment={editedComment}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
