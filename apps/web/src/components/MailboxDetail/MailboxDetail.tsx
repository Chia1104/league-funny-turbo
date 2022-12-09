import { type FC } from "react";
import cx from "classnames";
import Link from "next/link";
import type { Message } from "@wanin/shared/types";

interface Props {
  message: Message;
}

const MailBoxDetail: FC<Props> = (props) => {
  const { message } = props;
  return (
    <Link href={`/mailbox/detail/${message?.m_id}`}>
      <div className="border-b dark:border-b-gray-700 w-full">
        <div
          className={cx(
            "p-3 flex flex-col items-start md:flex-row md:items-center justify-between cursor-pointer relative hover:bg-gray-100 dark:hover:bg-[#00000080]",
            !message?.m_isNew && "bg-gray-100 dark:bg-[#00000080]"
          )}>
          <div className="mb-3 text-left md:w-48 md:mb-0">
            <span
              className={cx(
                "text-sm text-gray-400 mr-2 font-semibold",
                !message?.m_isNew && "font-normal"
              )}>
              {message?.m_type ?? ""}
            </span>
            <span
              className={cx(
                "text-secondary font-semibold",
                message?.m_isNew && "font-normal"
              )}>
              {message?.m_uname ?? ""}
            </span>
          </div>
          <div className="w-full flex-1 flex items-center overflow-hidden md:w-24">
            <span
              className={cx(
                "inline-block text-xs text-white font-medium bg-red-500 mr-3 px-1 py-0.5",
                !message?.m_isNew && "hidden"
              )}>
              NEW
            </span>
            <div
              className={cx(
                "overflow-hidden text-ellipsis pr-5 font-semibold",
                !message?.m_isNew && "font-normal"
              )}>
              {message?.m_title ?? ""}
            </div>
          </div>
          <span
            className={cx(
              "w-full text-sm font-semibold text-right absolute pr-5 md:w-32 md:relative flex-1",
              !message?.m_isNew && "font-normal"
            )}>
            {message?.m_time ?? ""}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MailBoxDetail;
