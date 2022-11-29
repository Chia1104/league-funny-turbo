"use client";

import { type FC, useState } from "react";
import { Button, Modal, Input } from "@geist-ui/core";
import "./userIntro.scss";

const SendPrivateMsgModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button auto type="success" className="msg" onClick={handleModal}>
        <svg
          className="text-white w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        <span className="ml-2">私訊他</span>
      </Button>
      <Modal visible={isModalOpen} onClose={closeModal}>
        <Modal.Title>TO：</Modal.Title>
        <Modal.Content>
          <input className="msg-title" placeholder="標題" />
          <textarea className="msg-content" placeholder="內文..." />
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsModalOpen(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={() => setIsModalOpen(false)}>送出</Modal.Action>
      </Modal>
    </div>
  );
};

export default SendPrivateMsgModal;
