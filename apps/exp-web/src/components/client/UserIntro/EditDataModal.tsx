"use client";

import { type FC, useState } from "react";
import { Button, Modal, Input, Divider } from "@geist-ui/core";
import "./userIntro.scss";

const EditDataModal: FC = () => {
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
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        <span className="ml-2 edit-lg">編輯個人資料</span>
        <span className="ml-2 edit-sm">編輯</span>
      </Button>
      <Modal width="45rem" visible={isModalOpen} onClose={closeModal}>
        <Modal.Title>編輯個人資料</Modal.Title>
        <Modal.Content>
          <ul>
            <li className="flex items-center my-3">
              <span className="w-44 pr-7">暱稱*</span>
              <Input width="100%" placeholder="必填" />
            </li>
            <li className="flex items-center my-3">
              <span className="w-44 pr-7">認證信箱</span>
              <div className="flex w-full">
                <Input width="100%" placeholder="欲參加站內活動者，需認證" />
                <div className="ml-4">
                  <Button ghost auto scale={0.7}>
                    寄送驗證信
                  </Button>
                </div>
              </div>
            </li>
            <li className="flex items-center my-3">
              <span className="w-44 pr-7">姓名</span>
              <div className="flex w-full">
                <Input width="100%" placeholder="選填" />
                <Input width="100%" placeholder="選填" />
              </div>
            </li>
            <Divider />
            <li className="flex items-center mt-6 mb-3">
              <span className="w-44 pr-7">facebook</span>
              <Input width="100%" placeholder="選填" />
            </li>
            <li className="flex items-center my-3">
              <span className="w-44 pr-7">個人網站</span>
              <Input width="100%" placeholder="選填" />
            </li>
            <li className="flex items-center my-3">
              <span className="w-44 pr-7">巴哈小屋</span>
              <Input width="100%" placeholder="選填" />
            </li>
            <li className="flex items-center my-3">
              <span className="w-44 pr-7">Twitch</span>
              <Input width="100%" placeholder="選填" />
            </li>
          </ul>
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsModalOpen(false)}>
          取消
        </Modal.Action>
        <Modal.Action onClick={() => setIsModalOpen(false)}>儲存</Modal.Action>
      </Modal>
    </div>
  );
};

export default EditDataModal;
