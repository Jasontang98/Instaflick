import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditImage from "./EditImage";

function EditImageModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditImage setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditImageModal;

