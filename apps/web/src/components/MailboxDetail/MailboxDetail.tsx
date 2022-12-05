import { type FC } from "react";
import cx from "classnames";
import Link from "next/link";

interface Props {
  mid: string;
  user: string;
  detail: string;
  isNew: boolean;
  time: string;
}

const MailBoxDetail: FC<Props> = (props) => {
  const { mid, user, detail, isNew, time } = props;
  return (
    <Link href={`/mailbox/detail/${mid}`}>
      <div className="border-b w-full">
        <div
          className={cx(
            "p-3 flex flex-col items-start md:flex-row md:items-center justify-between cursor-pointer relative hover:bg-gray-100",
            isNew === false && "bg-gray-100"
          )}>
          <div className="mb-3 text-left md:w-48 md:mb-0">
            <span
              className={cx(
                "text-sm text-gray-400 mr-2 font-semibold",
                isNew === false && "font-normal"
              )}>
              寄件人：
            </span>
            <span
              className={cx(
                "text-secondary font-semibold",
                isNew === false && "font-normal"
              )}>
              {user}
            </span>
          </div>
          <div className="w-full flex-1 flex items-center overflow-hidden md:w-24">
            <span
              className={cx(
                "inline-block text-xs text-white font-medium bg-red-500 mr-3 px-1 py-0.5",
                isNew === false && "hidden"
              )}>
              NEW
            </span>
            <div
              className={cx(
                "overflow-hidden text-ellipsis pr-5 font-semibold",
                isNew === false && "font-normal"
              )}>
              {detail}
            </div>
          </div>
          <span
            className={cx(
              "w-full text-sm font-semibold text-right absolute pr-5 md:w-32 md:relative flex-1",
              isNew === false && "font-normal"
            )}>
            {time}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MailBoxDetail;
