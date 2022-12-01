import { type FC } from "react";
import { Divider } from "@geist-ui/core";
import Links from "./Links";

const UserAbout: FC = () => {
  return (
    <div className="user-about">
      <div className="hidden md:block p-5 ml-5 w-full w-bg-secondary rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-start">
            <h3 className="mr-3">關於Vivian</h3>
            <div className="border rounded border-green-500 px-1">
              <p className="online text-sm text-green-500">上線中</p>
            </div>
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
        </div>
        <Divider />
        <div>
          <p className="text-sm text-gray-400 leading-7">今日人氣：1</p>
          <p className="text-sm text-gray-400 leading-7">累積人氣：58</p>
          <p className="text-sm text-gray-400 leading-7">進站次數：24</p>
          <p className="text-sm text-gray-400 leading-7">
            註冊日期：2015-11-03
          </p>
          <p className="text-sm text-gray-400 leading-7">
            上站日期：2022-11-23
          </p>
        </div>
        <div>
          <Divider />
          <Links
            linkFb={""}
            linkPersonal={""}
            linkBahamut={""}
            linkTwitch={""}
          />
        </div>
      </div>
      <div className="block p-5 mt-2 mb-5 w-full w-bg-secondary rounded-lg shadow-lg md:hidden">
        <div className="flex justify-between mb-4">
          <div className="flex flex-col items-start">
            <h3 className="text-xl mb-2.5">關於Vivian</h3>
            <div className="border rounded border-green-500 px-1">
              <p className="online text-sm text-green-500">上線中</p>
            </div>
          </div>
          <div className="w-2/4 grid grid-cols-3 divide-x text-center">
            <div className="flex flex-col">
              <p className="text-sm text-gray-400 leading-7">等級</p>
              <p className="text-base text-gray-400 leading-7">Lv.1</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-400 leading-7">經驗值</p>
              <p className="text-base text-gray-400 leading-7">0</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-400 leading-7">鬥幣</p>
              <p className="text-base text-gray-400 leading-7">1</p>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="grid grid-cols-2">
            <div className="text-left">
              <p className="text-sm text-gray-400 leading-7">今日人氣：1</p>
              <p className="text-sm text-gray-400 leading-7">累積人氣：58</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 leading-7">
                註冊日期：2015-11-03
              </p>
              <p className="text-sm text-gray-400 leading-7">
                上站日期：2022-11-23
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAbout;
