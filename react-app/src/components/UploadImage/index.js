import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UploadImage from "./UploadImage";

function UploadImageModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img
        src="https://static.thenounproject.com/png/809337-200.png"
        onClick={() => setShowModal(true)}
        alt="fa-light fa-plus"
      ></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadImage setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UploadImageModal;
