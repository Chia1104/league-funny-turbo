import { type FC } from "react";
import Image from "next/image";

interface Props {
  userImgPath: string;
  userName: string;
  userID: string;
  detail: string;
}

const MailReceive: FC<Props> = (props) => {
  const { userImgPath, userName, userID, detail } = props;
  return (
    <div>
      <div className="p-3 flex items-center justify-between bg-gray-100">
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-2 font-semibold">Re：</span>
          <div className="flex items-center">
            <Image
              className="rounded-full bg-white object-cover"
              alt={`${userID}/${userImgPath}`}
              src={userImgPath}
              width={30}
              height={30}
            />
            <span className="text-secondary font-semibold ml-2">
              {`${userName} (ID:${userID})`}
            </span>
          </div>
        </div>
        <span className="text-sm font-semibold">{"12月02日 10:52"}</span>
      </div>
      <div className="bg-white py-5 px-2">
        <p>{detail}</p>
      </div>
    </div>
  );
};

export default MailReceive;
