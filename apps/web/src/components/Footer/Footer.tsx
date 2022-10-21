import type { FC } from "react";
import { Image, Link } from "@/components";
import { LeagueFunny } from "@/shared/meta";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full h-[255px] border-t justify-center w-bg-secondary dark:border-t dark:border-gray-700 mt-20">
      <div className="w-container flex flex-col py-8 px-5 items-center ">
        <div className="w-full flex">
          <div className="flex flex-col w-[33%] mb-10">
            <Image
              className="mb-3"
              src="/logo-2.png"
              alt="logo"
              width={187.5}
              height={58.5}
              loading="lazy"
            />
            <p className="text-sm">{LeagueFunny.excerpt}</p>
          </div>
          <div className="flex w-[67%] gap-3 justify-end items-center">
            <Link href="/about">
              <a className="text-sm">關於我們</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm">聯絡我們</a>
            </Link>
            <Link href="/privacy">
              <a className="text-sm">隱私政策</a>
            </Link>
          </div>
        </div>
        <p>
          ©{year}, {LeagueFunny.chineseName}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
