import { type FC } from "react";
import { ButtonGroup, Button, Select } from "@geist-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import EditDataModal from "./EditDataModal";
import SendPrivateMsgModal from "./SendPrivateMsgModal";

interface Props {
  querykey: string;
}

const UserIntro: FC<Props> = (props) => {
  const { querykey } = props;
  const router = useRouter();

  const onSelectChange = (e: string | string[]) => {
    router.push(e as string);
  };

  return (
    <div className="user-intro">
      <div className="user-bg">
        <div className="btn-changeBG">
          <button className="btn-styleA hover:btn-styleA-hover">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="text-sm ml-2">更換背景</span>
          </button>
        </div>
        <div className="user-data">
          <div className="relative">
            <Image
              className="data-img"
              alt="about/img1"
              src="/about/about_img1.png"
              width={100}
              height={100}
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
          <p className="text-xs text-gray-300 mt-3 txt-shadow">總貼文數</p>
          <p className="text-4xl text-white txt-shadow">0</p>
        </div>
        <div className="btn-group">
          <div className="group">
            <div className="sm-group">
              <Select
                placeholder="個人主堡首頁"
                defaultValue={`/user/${querykey}/`}
                onChange={onSelectChange}>
                <Select.Option value={`/user/${querykey}/`}>
                  個人主堡首頁
                </Select.Option>
                <Select.Option value={`/user/${querykey}/posts`}>
                  發表文章
                </Select.Option>
                <Select.Option value={`/user/${querykey}/ups`}>
                  按過的↑
                </Select.Option>
                <Select.Option value={`/user/${querykey}/downs`}>
                  按過的↓
                </Select.Option>
                <Select.Option value={`/user/${querykey}/comments`}>
                  留言
                </Select.Option>
                <Select.Option value={`/user/${querykey}/collects`}>
                  收藏
                </Select.Option>
              </Select>
            </div>
            <ButtonGroup className="group-btns">
              <Button
                className="btn-hover btn-left"
                onClick={() => router.push(`/user/${querykey}/`)}>
                個人主堡首頁
              </Button>
              <Button
                className="btn-hover"
                onClick={() => router.push(`/user/${querykey}/posts`)}>
                發表文章
              </Button>
              <Button
                className="btn-hover"
                onClick={() => router.push(`/user/${querykey}/ups`)}>
                按過的↑
              </Button>
              <Button
                className="btn-hover"
                onClick={() => router.push(`/user/${querykey}/downs`)}>
                按過的↓
              </Button>
              <Button
                className="btn-hover"
                onClick={() => router.push(`/user/${querykey}/comments`)}>
                留言
              </Button>
              <Button
                className="btn-hover btn-right"
                onClick={() => router.push(`/user/${querykey}/collects`)}>
                收藏
              </Button>
            </ButtonGroup>
            <EditDataModal />
            {/* <SendPrivateMsgModal /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIntro;
