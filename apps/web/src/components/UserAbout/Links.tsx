import { type FC } from "react";
import Link from "next/link";
import { Image } from "@/components";
import cx from "classnames";

interface Props {
  linkFb: string;
  linkPersonal: string;
  linkBahamut: string;
  linkTwitch: string;
}

const Links: FC<Props> = (props) => {
  const { linkFb, linkPersonal, linkBahamut, linkTwitch } = props;
  return (
    <div>
      <Link
        className={cx("flex items-center", linkFb === "" && "hidden")}
        href={linkFb}>
        <Image
          className="gray-icon"
          src="/about/about_icon_fb.svg"
          alt="fb"
          width={30}
          height={30}
        />
        <span className="text-sm text-gray-400 leading-7 ml-2">Facebook</span>
      </Link>
      <Link
        className={cx("flex items-center", linkPersonal === "" && "hidden")}
        href={linkPersonal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="gray-icon">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span className="text-sm text-gray-400 leading-7 ml-2">個人網站</span>
      </Link>
      <Link
        className={cx("flex items-center", linkBahamut === "" && "hidden")}
        href={linkBahamut}>
        <div className="icon-bahamut"></div>
        <span className="text-sm text-gray-400 leading-7 ml-2">巴哈姆特</span>
      </Link>
      <Link
        className={cx("flex items-center", linkTwitch === "" && "hidden")}
        href={linkTwitch}>
        <Image
          className="gray-icon-twitch"
          src="/about/about_icon_twitch.svg"
          alt="twitch"
          width={30}
          height={30}
        />
        <span className="text-sm text-gray-400 leading-7 ml-2">Twitch</span>
      </Link>
    </div>
  );
};

export default Links;
