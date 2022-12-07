import { type FC } from "react";
import type { Message } from "@wanin/shared/types";
import { Avatar } from "@/components";
import Link from "next/link";
interface Props {
  message: Message;
}

const MailReceive: FC<Props> = (props) => {
  const { message } = props;
  return (
    <div>
      <div className="p-3 flex items-center justify-between bg-gray-100">
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-2 font-semibold">
            {message?.m_type}
          </span>
          <div className="flex items-center">
            <Avatar
              url={`https://img.league-funny.com/user_cover/${
                message?.m_uid || ""
              }.jpg`}
              userId={message?.m_uid}
              ratio={25}
              username={message?.m_uname ?? ""}
            />
            <Link
              href={`/user/${message?.m_uid}`}
              className="ml-2 text-secondary font-semibold hover:underline">
              {`${message?.m_uname ?? ""} (ID: ${message?.m_uid})`}
            </Link>
          </div>
        </div>
        <span className="text-sm font-semibold">{message?.m_time}</span>
      </div>
      <div className="bg-white py-5 px-2">
        <p>{message?.m_content ?? ""}</p>
      </div>
    </div>
  );
};

export default MailReceive;
