"use client";

import { type FC, useState } from "react";
import {
  ButtonGroup,
  Button,
  Modal,
  Input,
  Textarea,
  Divider,
} from "@geist-ui/core";
import Image from "next/image";
import "./userIntro.scss";

const UserIntro: FC = () => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const MsgModal = () => (
    <>
      <Modal visible={modal} onClose={closeHandler}>
        <Modal.Title>TO：</Modal.Title>
        <Modal.Content>
          <Input className="w-full" placeholder="標題" />
          <Textarea placeholder="內文..." />
        </Modal.Content>
        <Modal.Action passive onClick={() => setModal(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={() => setModal(false)}>送出</Modal.Action>
      </Modal>
    </>
  );

  const handleMsg = () => {
    setModal(true);
  };
  const closeHandler = () => {
    setModal(false);
    console.log("closed");
  };

  const EditModal = () => (
    <>
      <Modal width="45rem" visible={editModal} onClose={closeEdit}>
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
            <li className="flex items-center mt-3 mb-6">
              <span className="w-44 pr-7">變更封面背景</span>
              <div className="flex w-full">
                <Input width="100%" placeholder="請上傳圖片" disabled />
                <div className="ml-4">
                  <Button ghost auto scale={0.7}>
                    圖片上傳
                  </Button>
                </div>
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
        <Modal.Action passive onClick={() => setEditModal(false)}>
          取消
        </Modal.Action>
        <Modal.Action onClick={() => setEditModal(false)}>儲存</Modal.Action>
      </Modal>
    </>
  );

  const editData = () => {
    setEditModal(true);
  };
  const closeEdit = () => {
    setEditModal(false);
    console.log("closed");
  };

  return (
    <div className="banner">
      <div className="user-bg">
        <div className="user-data">
          <div className="relative">
            <Image
              className="data-img"
              alt="about/img1"
              src="/about/about_img1.png"
              width={100}
              height={100}
              objectFit="cover"
            />
            <div className="edit-img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 edit-svg">
                <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                <path
                  fillRule="evenodd"
                  d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-start mt-3">
            <h5 className="text-3xl font-medium text-white txt-shadow">
              {"Vivian"}
            </h5>
            <span className="level txt-shadow">Lv.1</span>
          </div>
          <p className="text-xs  text-gray-300 mt-3 txt-shadow">總貼文數</p>
          <p className="text-4xl text-white txt-shadow">0</p>
        </div>
        <div className="btn-group">
          <div className="group">
            <ButtonGroup className="group-btns">
              <Button className="btn-hover btn-left">個人主堡首頁</Button>
              <Button className="btn-hover">發表文章</Button>
              <Button className="btn-hover">按過的↑</Button>
              <Button className="btn-hover">按過的↓</Button>
              <Button className="btn-hover">留言</Button>
              <Button className="btn-hover btn-right">收藏</Button>
            </ButtonGroup>
            <Button auto type="success" className="msg" onClick={editData}>
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
              <span className="ml-2">編輯個人檔案</span>
            </Button>
            <EditModal />
            {/* <Button auto type="success" className="msg" onClick={handleMsg}>
              <svg
                className="text-white"
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
            <MsgModal /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIntro;
