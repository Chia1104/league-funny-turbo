import { type FC } from "react";
import { Image } from "@/components";
import { Tooltip } from "@geist-ui/core";
import Link from "next/link";

const About: FC = () => {
  return (
    <div className="flex justify-center mt-12">
      <Tooltip text="Facebook" placement="top" enterDelay={0} leaveDelay={0}>
        <Link href={"https://www.facebook.com/GameSmash/"}>
          <Image
            className="icon"
            src="/about/about_icon1.svg"
            alt="fb"
            width={40}
            height={40}
          />
        </Link>
      </Tooltip>
      <Tooltip text="Youtube" placement="top" enterDelay={0} leaveDelay={0}>
        <Link href={"https://www.youtube.com/channel/UCd4vjuRpRn8Ibd3OcPZHsuw"}>
          <Image
            className="icon"
            src="/about/about_icon2.svg"
            alt="yt"
            width={40}
            height={40}
          />
        </Link>
      </Tooltip>
      <Tooltip text="Messenger" placement="top" enterDelay={0} leaveDelay={0}>
        <Link href={"https://www.facebook.com/messages/t/GameSmash"}>
          <Image
            className="icon"
            src="/about/about_icon3.svg"
            alt="email"
            width={40}
            height={40}
          />
        </Link>
      </Tooltip>
      <Tooltip text="廣告刊登" placement="top" enterDelay={0} leaveDelay={0}>
        <Link href={"https://www.league-funny.com/advertise"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-9 h-9 icon">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </Link>
      </Tooltip>
    </div>
  );
};

export default About;
