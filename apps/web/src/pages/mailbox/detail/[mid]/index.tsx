import { type FC } from "react";
import Image from "next/image";
import { MailboxCenter, MailReceive } from "@/components";
import Link from "next/link";

const MailboxDetailPage: FC = () => {
  const user1 = {
    userImgPath: "/about/about_img1.png",
    userName: "Vivian",
    userID: "132268",
    mailTitle:
      "hihi hifffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    detail:
      "Customizing the default breakpoints for your project. Configuring custom screens You define your project’s breakpoints in the theme.screens section of your tailwind.config.js file. The keys become your responsive modifiers (like md:text-center), and the values are the min-width where that breakpoint should start. The default breakpoints are inspired by common device resolutions:",
    time: "12月02日 10:32",
  };

  return (
    <article>
      <div className="top-0 left-0 mt-16 md:mt-28">
        <div className="flex flex-col justify-center mt-0 md:flex-row">
          <MailboxCenter />
          <div className="w-block p-5 md:w-3/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 break-all">
                <p>{user1.mailTitle}</p>
              </div>
              <div className="hidden md:flex items-center ml-4">
                <button className="btn-styleB text-sm mr-2 hover:btn-styleB-hover">
                  回覆
                </button>
                <Link href={"/mailbox"}>
                  <div className="flex">
                    <button className="flex btn-styleB text-sm hover:btn-styleB-hover">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                        />
                      </svg>
                      <span>回上頁</span>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="border-t w-full">
              <div className="p-3 flex items-center justify-between bg-gray-100">
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-2 font-semibold">
                    寄件人：
                  </span>
                  <div className="flex items-center">
                    <Image
                      className="rounded-full bg-white object-cover"
                      alt="about/img1"
                      src={user1.userImgPath}
                      width={30}
                      height={30}
                    />
                    <span className="text-secondary font-semibold ml-2">
                      {`${user1.userName} (ID:${user1.userID})`}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold">{user1.time}</span>
              </div>
              <div className="bg-white py-5 px-2 break-words">
                <p>{user1.detail}</p>
              </div>
              <MailReceive
                userImgPath="/about/about_img1.png"
                userName="AAA"
                userID="123456"
                detail="哈囉～"
              />
              <MailReceive
                userImgPath="/about/about_img1.png"
                userName="AAA"
                userID="123456"
                detail="你好～"
              />
              <MailReceive
                userImgPath="/about/about_img1.png"
                userName="AAA"
                userID="123456"
                detail="OK"
              />
            </div>
            <div className="flex items-center justify-center mt-5">
              <Link href={"/mailbox"}>
                <div className="flex mr-2">
                  <button className="flex btn-styleB text-sm hover:btn-styleB-hover">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                      />
                    </svg>
                    <span>回上頁</span>
                  </button>
                </div>
              </Link>
              <button className="btn-styleB text-sm hover:btn-styleB-hover">
                回覆
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MailboxDetailPage;
