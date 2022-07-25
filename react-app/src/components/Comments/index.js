import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Comments from "./Comments";

function CommentsModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>View All Comments</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Comments setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CommentsModal;
