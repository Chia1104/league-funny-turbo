"use client";

import { type FC } from "react";
import { Image } from "@/components/client";
import { Tooltip } from "@geist-ui/core";
import Link from "next/link";

const About: FC = () => {
  return (
    <div className="flex justify-center mt-12">
      <Tooltip text="Facebook" placement="top" enterDelay={0} leaveDelay={0}>
        <Link href={"https://www.facebook.com/GameSmash/"}>
          <Image
            className="mx-3"
            src="/about/about_icon1.png"
            alt="fb"
            width={30}
            height={30}
          />
        </Link>
      </Tooltip>
      <Tooltip text="Youtube" placement="top" enterDelay={0} leaveDelay={0}>
        <Link href={"https://www.youtube.com/channel/UCd4vjuRpRn8Ibd3OcPZHsuw"}>
          <Image
            className="mx-3"
            src="/about/about_icon2.png"
            alt="yt"
            width={30}
            height={30}
          />
        </Link>
      </Tooltip>
      <Tooltip
        text="Facebook messages"
        placement="top"
        enterDelay={0}
        leaveDelay={0}>
        <Link href={"https://www.facebook.com/messages/GameSmash"}>
          <Image
            className="mx-3"
            src="/about/about_icon3.png"
            alt="email"
            width={30}
            height={30}
          />
        </Link>
      </Tooltip>
      <Tooltip text="廣告刊登" placement="top" enterDelay={0} leaveDelay={0}>
        <Link href={"https://www.league-funny.com/advertise"}>
          <Image
            className="mx-3"
            src="/about/about_icon4.png"
            alt="ad"
            width={30}
            height={30}
          />
        </Link>
      </Tooltip>
    </div>
  );
};

export default About;
