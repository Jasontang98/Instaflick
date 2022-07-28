import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChangePicture from "./ChangePicture";
// imposrt edit user css
import "./change-picture.css"

function ChangePictureModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='change-profile-button' onClick={() => setShowModal(true)}>Change profile photo</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChangePicture setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ChangePictureModal;
