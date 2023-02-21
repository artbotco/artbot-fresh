import React, { useState } from 'react';
import './Modal.scss';

function Modal(props: any) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
