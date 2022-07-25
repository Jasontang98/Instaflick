import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditUser from "./EditUser";

function EditUserModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUser setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditUserModal;
