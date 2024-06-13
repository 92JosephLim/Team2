import React from 'react';
import PropTypes from 'prop-types';

function CorrectionComplete({ modalOpen, setModalOpen }) {
  if (!modalOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <p>수정이 완료되었습니다.</p>
        <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
          닫기
        </button>
      </div>
    </div>
  );
}

CorrectionComplete.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default CorrectionComplete;
