import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UploadImage from "./UploadImage";

function UploadImageModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadImage setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UploadImageModal;
