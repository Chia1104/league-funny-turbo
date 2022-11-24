"use client";

import { type FC } from "react";
import "./userAbout.scss";
import { Divider } from "@geist-ui/core";

const UserAbout: FC = () => {
  return (
    <div className="w-2/6 h-full ml-5 p-5 w-bg-secondary rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3>關於Vivian</h3>
        <div className="border rounded border-green-500 px-1">
          <p className="online text-sm text-green-500">上線中</p>
        </div>
      </div>
      <Divider />
      <div>
        <p className="text-sm leading-7">等級：Lv.1</p>
        <p className="text-sm leading-7">經驗值：0</p>
      </div>
      <Divider />
      <div>
        <p className="text-sm leading-7">鬥幣：1</p>
        <p className="text-sm leading-7">紅寶石：1</p>
      </div>
      <Divider />
      <div>
        <p className="text-sm text-gray-400 leading-7">今日人氣：1</p>
        <p className="text-sm text-gray-400 leading-7">累積人氣：58</p>
        <p className="text-sm text-gray-400 leading-7">進站次數：24</p>
        <p className="text-sm text-gray-400 leading-7">註冊日期：2015-11-03</p>
        <p className="text-sm text-gray-400 leading-7">上站日期：2022-11-23</p>
      </div>
    </div>
  );
};

export default UserAbout;
