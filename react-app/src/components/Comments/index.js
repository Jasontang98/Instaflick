import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Comments from "./Comments";
import { useSelector } from "react-redux";

function CommentsModal() {
  const [showModal, setShowModal] = useState(false);
  const comments = Object.values(useSelector((state) => state.comments));

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
      >{`View all ${comments?.length} comments`}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Comments setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CommentsModal;
