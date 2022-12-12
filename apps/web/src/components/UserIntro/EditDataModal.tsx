import { type FC } from "react";
import { Divider } from "@geist-ui/core";
import { Modal, Input } from "@wanin/ui";

interface Props {
  isOpen: boolean;
  activityModal: () => void;
}

const EditDataModal: FC<Props> = ({ isOpen, activityModal }) => {
  return (
    <Modal isOpen={isOpen} activityModal={activityModal}>
      <div className="w-[34rem] w-bg-primary flex flex-col items-center mb-28 px-10 pt-5 pb-4 rounded-lg shadow-2xl">
        <p className="text-2xl font-semibold mb-5">編輯個人資料</p>
        <ul>
          <li className="flex items-center my-3">
            <span className="w-44 pr-6">暱稱*</span>
            <Input placeholder="必填" className="w-full p-2" />
          </li>
          <li className="flex items-center my-3">
            <span className="w-44 pr-6">認證信箱</span>
            <div className="flex w-full">
              <Input
                placeholder="欲參加站內活動者，需認證"
                className="w-full p-2"
              />
              <button className="w-36 ml-2 btn-styleA justify-center text-sm border rounded">
                寄送驗證信
              </button>
            </div>
          </li>
          <li className="flex items-center my-3">
            <span className="w-44 pr-6">姓名</span>
            <div className="flex w-full">
              <Input placeholder="選填" className="w-full p-2" />
              <Input placeholder="選填" className="w-full p-2" />
            </div>
          </li>
          <Divider />
          <li className="flex items-center mt-6 mb-3">
            <span className="w-44 pr-6">facebook</span>
            <Input placeholder="選填" className="w-full p-2" />
          </li>
          <li className="flex items-center my-3">
            <span className="w-44 pr-6">個人網站</span>
            <Input placeholder="選填" className="w-full p-2" />
          </li>
          <li className="flex items-center my-3">
            <span className="w-44 pr-6">巴哈小屋</span>
            <Input placeholder="選填" className="w-full p-2" />
          </li>
          <li className="flex items-center my-3">
            <span className="w-44 pr-6">Twitch</span>
            <Input placeholder="選填" className="w-full p-2" />
          </li>
        </ul>
        <div className="w-full flex items-center mt-5">
          <button
            className="btn-styleA flex-1 justify-center border rounded px-4 py-2 mr-2"
            onClick={activityModal}>
            取消
          </button>
          <button
            className="btn-styleA flex-1 justify-center border rounded px-4 py-2"
            onClick={activityModal}>
            送出
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditDataModal;
