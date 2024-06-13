import React from 'react';
import PropTypes from 'prop-types';

function SignupOkModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <p>회원 가입이 완료되었습니다.</p>
        <button className="modal-close-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

SignupOkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignupOkModal;
