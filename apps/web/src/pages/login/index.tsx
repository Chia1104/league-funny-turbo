import { type NextPage } from "next";
import { Image } from "@/components";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginPage: NextPage = () => {
  return (
    <article>
      <div className="mt-40 min-h-screen">
        <div className="flex flex-col items-center justify-center w-4/5 md:w-2/5 mx-auto">
          <Image src="/logo-2.png" alt="logo" width={300} height={300} />
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
            <Link href={"/b/boardservice/f/226173"}>
              <span className="text-sm text-secondary">教學</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LoginPage;
