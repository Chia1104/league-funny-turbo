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
      <div className="border-t w-full">
        <div
          className={cx(
            "p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100",
            isNew === false && "bg-gray-100"
          )}>
          <div className="mr-28">
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
          <span
            className={cx(
              "inline-block text-xs text-white font-medium bg-red-500 mr-3 px-1 py-0.5",
              isNew === false && "hidden"
            )}>
            NEW
          </span>
          <div className="flex-1 overflow-hidden">
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
              "text-sm font-semibold",
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
