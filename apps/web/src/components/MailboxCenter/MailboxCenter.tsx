import { type FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cx from "classnames";

const MailBoxCenter: FC = () => {
  const router = useRouter();
  return (
    <div className="mr-0 pt-2 px-2 h-2/4 flex flex-col bg-gray-400 border-b-8 border-secondary shadow-lg dark:bg-dark md:mr-5 md:border-0 md:rounded-lg">
      <div className="flex items-center justify-between mr-5">
        <div className="flex items-center mx-3 mt-4 mb-7 pt-7 md:pt-0">
          <div className="w-8 h-8 mr-2 flex items-center justify-center rounded-full border-2 border-white bg-white object-cover dark:bg-dark">
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
        <button
          className={cx(
            "btn-styleB dark:hover:bg-black rounded-lg transition-all ease-in-out w-border-primary md:hidden",
            router.pathname !== "/mailbox" &&
              router.pathname !== "/mailbox/from" &&
              "hidden"
          )}>
          標示全部已讀
        </button>
      </div>

      <div className="flex items-end md:flex-col">
        <Link
          scroll
          href={"/mailbox"}
          className={cx(
            "w-28 mr-2 my-0 flex items-center justify-center rounded-t-lg rounded-b-none bg-white hover:bg-gray-100 cursor-pointer px-3 py-1.5 md:w-full md:mr-0 md:mb-2 md:rounded-b-lg dark:bg-dark dark:hover:bg-black w-border-primary",
            (router.pathname === "/mailbox" ||
              router.pathname.includes("detail")) &&
              "text-white border-0 bg-secondary hover:bg-[#2291ff] md:mr-0 dark:border dark:bg-[#000]"
          )}>
          收件匣(0)
        </Link>
        <Link
          scroll
          href={"/mailbox/from"}
          className={cx(
            "w-28 mr-2 my-0 flex items-center justify-center rounded-t-lg rounded-b-none bg-white hover:bg-gray-100 cursor-pointer px-3 py-1.5 md:w-full md:mr-0 md:mb-2 md:rounded-b-lg dark:bg-dark dark:hover:bg-black w-border-primary",
            router.pathname === "/mailbox/from" &&
              "text-white border-0 bg-secondary hover:bg-[#2291ff] md:mr-0 dark:border dark:bg-[#000]"
          )}>
          寄件備份
        </Link>
        <Link
          scroll
          href={""}
          className={cx(
            "w-28 mr-2 my-0 flex items-center justify-center rounded-t-lg rounded-b-none bg-white hover:bg-gray-100 cursor-pointer px-3 py-1.5 md:w-full md:mr-0 md:mb-2 md:rounded-b-lg dark:bg-dark dark:hover:bg-black w-border-primary",
            router.pathname === "" &&
              "text-white border-0 bg-secondary hover:bg-[#2291ff] md:mr-0 dark:border dark:bg-[#000]"
          )}>
          任務信箱
        </Link>
      </div>
    </div>
  );
};

export default MailBoxCenter;
