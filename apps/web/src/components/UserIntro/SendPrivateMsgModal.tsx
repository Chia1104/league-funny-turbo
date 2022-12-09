import { type FC } from "react";
import { Modal, Input } from "@wanin/ui";

interface Props {
  isOpen: boolean;
  activityModal: () => void;
}

const SendPrivateMsgModal: FC<Props> = ({ isOpen, activityModal }) => {
  return (
    <Modal isOpen={isOpen} activityModal={activityModal}>
      <div className="w-[26rem] w-bg-primary flex flex-col items-center mb-28 px-16 pt-5 pb-4 rounded-lg shadow-2xl">
        <p className="text-2xl font-semibold mb-5">TO：</p>
        <div className="mb-5">
          <Input placeholder="標題" className="w-full p-1 mb-3" />
          <textarea
            className="w-full h-full min-h-[50px] max-h-[280px] border-[#ccc] rounded-lg px-1 py-1 w-bg-primary w-border-primary focus:border-primary focus:outline-0 dark:focus:border-gray-700"
            placeholder="內文..."
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <button className="p-2 border-2 rounded bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-full mx-auto dark:text-black">
              <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
              <path
                fillRule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex">
            <button
              className="btn-styleA flex-1 border rounded px-4 py-2 mr-2"
              onClick={activityModal}>
              取消
            </button>
            <button
              className="btn-styleA flex-1 border rounded px-4 py-2"
              onClick={activityModal}>
              送出
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SendPrivateMsgModal;
