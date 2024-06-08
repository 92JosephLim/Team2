import React, { useRef } from "react";
import PropTypes from "prop-types";

const FriendDelete = ({ isOpen, onClose }) => {
  const modalBackground = useRef();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          onClose();
        }
      }}
    >
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="mb-4">이 친구를 목록에서 삭제하시겠습니까?</p>
        <button
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          닫기
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

FriendDelete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FriendDelete;
