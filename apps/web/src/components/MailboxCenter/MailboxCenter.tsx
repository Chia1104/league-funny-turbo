import { type FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cx from "classnames";

const MailBoxCenter: FC = () => {
  const router = useRouter();
  return (
    <div className="w-block p-2 bg-gray-400 h-2/4 md:mr-5">
      <div className="flex items-center m-3">
        <div className="w-8 h-8 mr-2 flex items-center justify-center rounded-full border-2 border-white bg-white object-cover">
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
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <span className="text-white text-xl font-semibold">訊息中心</span>
      </div>
      <div className="flex justify-between md:flex-col">
        <Link
          scroll
          href={"/mailbox"}
          className={cx(
            "w-60 flex items-center justify-between rounded bg-white hover:bg-gray-100 cursor-pointer my-1 px-3 py-2 md:w-full",
            (router.pathname === "/mailbox" ||
              router.pathname.includes("detail")) &&
              "text-white bg-secondary mr-5 hover:bg-secondary"
          )}>
          收件匣(0)
        </Link>
        <Link
          scroll
          href={"/mailbox/from"}
          className={cx(
            "w-60 flex items-center justify-between rounded bg-white hover:bg-gray-100 cursor-pointer my-1 px-3 py-2 md:w-full",
            router.pathname === "/mailbox/from" &&
              "text-white bg-secondary mr-5 hover:bg-secondary"
          )}>
          寄件備份
        </Link>
      </div>
      {/* <div className="w-full flex items-center justify-between bg-white mr-5 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
              <p>收件匣(0)</p>
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
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </div>
            <div className="w-full flex items-center justify-between bg-white mr-5 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
              <p>寄件備份</p>
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
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </div>
            <div className="w-full flex items-center justify-between bg-white mr-5 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
              <p>任務信箱</p>
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
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </div> */}
    </div>
  );
};

export default MailBoxCenter;
