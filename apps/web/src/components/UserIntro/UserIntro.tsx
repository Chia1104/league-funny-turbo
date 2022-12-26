import { useState, type FC, useRef } from "react";
import { ButtonGroup, Button, Select } from "@geist-ui/core";
import { useRouter } from "next/router";
import EditDataModal from "./EditDataModal";
import { Avatar } from "@/components";
import SendPrivateMsgModal from "./SendPrivateMsgModal";
import UploadUserBG, { UploadUserBGRef } from "./UploadUserBG";
import UploadUserImg from "./UploadUserImg";

interface Props {
  querykey: string;
}

const UserIntro: FC<Props> = (props) => {
  const { querykey } = props;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSelf, setIsSelf] = useState<boolean>(true);
  const UploadUserBGRef = useRef<UploadUserBGRef>(null);
  const UploadUserImgRef = useRef(null);

  const onSelectChange = (e: string | string[]) => {
    router.push(e as string);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  // const handleSubmit = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <>
      <div className="user-intro">
        <div className="w-full h-[300px] bg-[url('/about/about_top.jpg')] bg-top bg-no-repeat bg-fixed bg-auto absolute top-0 left-0 mt-16 md:h-[340px] desktop:bg-contain">
          <UploadUserBG ref={UploadUserBGRef} />
          <div className="flex flex-col items-center relative">
            <div className="relative">
              <UploadUserImg ref={UploadUserImgRef} querykey={querykey} />
              {/* <div className="rounded-full bg-white border-2 border-white">
                <Avatar
                  url={`https://img.league-funny.com/user_cover/${
                    querykey || ""
                  }.jpg`}
                  userId={querykey}
                  ratio={100}
                  username={""}
                />
              </div>
              <button className="absolute right-0 bottom-1.5 w-8 h-8 rounded-full flex items-center justify-center bg-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white">
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path
                    fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button> */}
            </div>
            <div className="flex items-start mt-3">
              <h5 className="text-3xl font-medium text-white drop-shadow-[0.1rem_0.05em_0.1em_rgba(66,66,66,0.47)]">
                {"Vivian"}
              </h5>
              <span className="px-1 py-0.5 leading-[15px] text-white bg-[#a2d0ff] mt-0.5 ml-2 drop-shadow-[0.1rem_0.05em_0.1em_rgba(66,66,66,0.47)]">
                Lv.1
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-3 drop-shadow-[0.1rem_0.05em_0.1em_rgba(66,66,66,0.47)]">
              總貼文數
            </p>
            <p className="text-4xl text-white txt-shadow">0</p>
          </div>
          <div className="absolute w-full bottom-[-20px]">
            <div className="group flex justify-between items-center w-4/5 mx-auto border rounded bg-white dark:bg-dark dark:border-gray-700">
              <div className="sm-group mr-2">
                <Select
                  style={{ height: "40px", minWidth: "9rem", border: 0 }}
                  placeholder="個人主堡首頁"
                  defaultValue={`/user/${querykey}/`}
                  onChange={onSelectChange}>
                  <Select.Option
                    style={{ fontSize: "14px" }}
                    value={`/user/${querykey}/`}>
                    個人主堡首頁
                  </Select.Option>
                  <Select.Option
                    style={{ fontSize: "14px" }}
                    value={`/user/${querykey}/posts`}>
                    發表文章
                  </Select.Option>
                  <Select.Option
                    style={{ fontSize: "14px" }}
                    value={`/user/${querykey}/ups`}>
                    按過的↑
                  </Select.Option>
                  <Select.Option
                    style={{ fontSize: "14px" }}
                    value={`/user/${querykey}/downs`}>
                    按過的↓
                  </Select.Option>
                  <Select.Option
                    style={{ fontSize: "14px" }}
                    value={`/user/${querykey}/comments`}>
                    留言
                  </Select.Option>
                  <Select.Option
                    style={{ fontSize: "14px" }}
                    value={`/user/${querykey}/collects`}>
                    收藏
                  </Select.Option>
                </Select>
              </div>
              <ButtonGroup className="group-btns">
                <Button onClick={() => router.push(`/user/${querykey}/`)}>
                  個人主堡首頁
                </Button>
                <Button onClick={() => router.push(`/user/${querykey}/posts`)}>
                  發表文章
                </Button>
                <Button onClick={() => router.push(`/user/${querykey}/ups`)}>
                  按過的↑
                </Button>
                <Button onClick={() => router.push(`/user/${querykey}/downs`)}>
                  按過的↓
                </Button>
                <Button
                  onClick={() => router.push(`/user/${querykey}/comments`)}>
                  留言
                </Button>
                <Button
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                  onClick={() => router.push(`/user/${querykey}/collects`)}>
                  收藏
                </Button>
              </ButtonGroup>
              <div className="flex">
                <button className="text-sm rounded leading-8 mr-1 px-3 py-1 text-white bg-brandblue hover:bg-[#2291ff] dark:bg-black dark:text-[#888] dark:hover:text-white">
                  連結錢包
                </button>
                {isSelf ? (
                  <button
                    className="text-sm flex items-center rounded leading-8 px-3 py-1 text-white bg-brandblue hover:bg-[#2291ff] dark:bg-black dark:text-[#888] dark:hover:text-white"
                    onClick={handleModal}>
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
                    <span className="hidden ml-2 md:inline-block">
                      編輯個人資料
                    </span>
                    <span className="ml-2 md:hidden">編輯</span>
                  </button>
                ) : (
                  <button
                    className="flex items-center rounded leading-8 px-4 btn-styleB"
                    onClick={handleModal}>
                    <svg
                      className="text-white w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                    <span className="ml-2">私訊他</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0">
        <EditDataModal isOpen={isModalOpen} activityModal={handleModal} />
        {/* <SendPrivateMsgModal isOpen={isModalOpen} activityModal={handleModal} /> */}
      </div>
    </>
  );
};

export default UserIntro;
