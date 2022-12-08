import { Modal } from "@wanin/ui";
import { type FC } from "react";
import { signIn } from "next-auth/react";
import { Image } from "@/components";
import Link from "next/link";
interface Props {
  isOpen: boolean;
  activityModal: () => void;
}

const LoginModel: FC<Props> = ({ isOpen, activityModal }) => {
  return (
    <Modal isOpen={isOpen} activityModal={activityModal}>
      <div className="w-[26rem] w-bg-primary flex flex-col items-center mb-28 px-16 pt-5 pb-4 rounded-lg shadow-2xl">
        <Image src="/logo-2.png" alt="logo" width={250} height={250} />
        <p className="mt-6 mb-4 text-left">
          歡迎登入來到遊戲大亂鬥，在這裏你可以閒聊玩遊戲的心情、分享你的遊戲影片、直播、圖片、創作，加入我們你輕鬆使用
          Facebook登入，快速又安全喔！
        </p>
        <div className="w-full flex flex-col items-start">
          <button
            className="w-full flex items-center justify-center mt-8 mb-3 py-1 rounded bg-[#4367af] hover:bg-[#3c5c9e] text-white font-bold"
            onClick={() => signIn("facebook")}>
            <Image
              className="mr-3"
              src="/about/about_icon_fb.svg"
              alt="fb"
              width={30}
              height={30}
            />
            用 Facebook 登入
          </button>

          <button
            className="w-full flex items-center justify-center mt-2 mb-3 py-1 rounded bg-[#9147ff] hover:bg-[#8c40fd] text-white font-bold"
            onClick={() => signIn("twitch")}>
            <Image
              className="mr-3"
              src="/about/about_icon_twitch.svg"
              alt="twitch"
              width={30}
              height={30}
            />
            用 Twitch 登入
          </button>
        </div>
        <div className="flex items-center mt-12 leading-none">
          <p className="text-sm">※臉書找不到「代碼產生器」無法登入</p>
          <Link
            href={"https://www.league-funny.com/boardservice/article-226173"}>
            <span className="text-sm text-secondary">教學</span>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModel;
