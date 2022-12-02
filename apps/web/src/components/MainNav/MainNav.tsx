import { type FC, useState } from "react";
import { Avatar, Image, PostbordList, IsLogin } from "@/components";
import {
  BillIcon,
  MissionIcon,
  AchievementIcon,
  EnvelopIcon,
  HamburgerIcon,
} from "@wanin/icons";
import { Size } from "@wanin/shared/types";
import { Tooltip, Popover, Drawer } from "@geist-ui/core";
import data from "@/shared/data/bill.json";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import LoginModel from "@/components/MainNav/LoginModel";
import { useDarkMode } from "@/hooks";
import cx from "classnames";

const MainNav: FC = () => {
  const { data: session } = useSession();
  const { toggle } = useDarkMode();
  const [isLoginModelOpen, setIsLoginModelOpen] = useState<boolean>(false);
  const [isMiniMenuOpen, setIsMiniMenuOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const content = () => (
    <>
      <Popover.Item title>
        <span>通知</span>
      </Popover.Item>
      {data.map((item) => (
        <Popover.Item key={item.id}>
          <Link href="#">
            <span className="flex gap-2">{item.content}</span>
          </Link>
        </Popover.Item>
      ))}
    </>
  );

  const userInfo = () => (
    <>
      <Popover.Item title>
        <span>{session?.user?.name ?? "您尚未登入"}</span>
      </Popover.Item>
      <Popover.Item>
        <button onClick={toggle}>Toggle Theme</button>
      </Popover.Item>
      {data.map((item) => (
        <Popover.Item key={item.id}>
          <Link href="#">
            <span className="flex gap-2">{item.content}</span>
          </Link>
        </Popover.Item>
      ))}
      <Popover.Item>
        <button onClick={() => signOut()}>登出</button>
      </Popover.Item>
    </>
  );

  return (
    <>
      <nav className="w-bg-secondary w-screen flex h-[65px] items-center top-0 fixed justify-center z-50 shadow-lg shadow-gray-200 dark:shadow-none dark:border-b dark:border-gray-700">
        <div className="flex container w-[100%]">
          <div className="flex items-center w-[30%] justify-start">
            <Link href="/b" className="ml-3">
              <Image
                className="hidden md:block"
                src="/logo-2.png"
                alt="logo"
                width={125}
                height={39}
                loading="lazy"
              />
              <Image
                className="block md:hidden"
                src="/logo-1.png"
                alt="logo-1"
                width={45}
                height={45}
                loading="lazy"
              />
            </Link>
          </div>
          <ul className="flex items-center w-[70%] justify-end mr-3 gap-3">
            <li>
              <button
                className="hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg transition-all ease-in-out w-border-primary xl:hidden"
                onClick={() => setIsMiniMenuOpen(!isMiniMenuOpen)}>
                <HamburgerIcon size={Size.Base} />
              </button>
            </li>
            <IsLogin
              fallBack={
                <button
                  className="hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg min-w-[50px] transition-all ease-in-out w-border-primary"
                  onClick={() => setIsLoginModelOpen(true)}>
                  登入
                </button>
              }>
              <li className="hidden sm:block">
                <Popover
                  enterDelay={0}
                  leaveDelay={0}
                  content={content}
                  placement="bottom"
                  portalClassName="min-w-[230px]">
                  <BillIcon
                    size={Size.Large}
                    className="hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg transition-all ease-in-out"
                  />
                </Popover>
              </li>
              <li className="hidden sm:block">
                <Tooltip
                  text="任務"
                  placement="bottom"
                  enterDelay={0}
                  leaveDelay={0}>
                  <MissionIcon
                    size={Size.Large}
                    className="hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg transition-all ease-in-out"
                  />
                </Tooltip>
              </li>
              <li className="hidden sm:block">
                <Tooltip
                  text="成就"
                  placement="bottom"
                  enterDelay={0}
                  leaveDelay={0}>
                  <AchievementIcon
                    size={Size.Large}
                    className="hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg transition-all ease-in-out"
                  />
                </Tooltip>
              </li>
              <li className="hidden sm:block">
                <Tooltip
                  text="信件"
                  placement="bottom"
                  enterDelay={0}
                  leaveDelay={0}>
                  <EnvelopIcon
                    size={Size.Large}
                    className="hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg transition-all ease-in-out"
                  />
                </Tooltip>
              </li>
              <li className="hidden sm:block">
                <Popover
                  enterDelay={0}
                  leaveDelay={0}
                  content={userInfo}
                  placement="bottomEnd"
                  portalClassName="min-w-[230px]">
                  <Avatar
                    username={session?.user?.name ?? ""}
                    ratio={30}
                    url={session?.user?.image ?? ""}
                  />
                </Popover>
              </li>
              <li className="sm:hidden">
                <Avatar
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  username={session?.user?.name ?? ""}
                  ratio={30}
                  url={session?.user?.image ?? ""}
                />
              </li>
              <Drawer
                visible={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                placement="bottom">
                <Drawer.Title>{session?.user?.name ?? ""}</Drawer.Title>
                <Drawer.Content>
                  <button onClick={toggle}>Toggle Theme</button>
                </Drawer.Content>
                <Drawer.Content>
                  <p className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg gap-3">
                    <BillIcon size={Size.Base} />
                    通知
                  </p>
                </Drawer.Content>
                <Drawer.Content>
                  <p className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg gap-3">
                    <MissionIcon size={Size.Base} />
                    任務
                  </p>
                </Drawer.Content>
                <Drawer.Content>
                  <p className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg gap-3">
                    <AchievementIcon size={Size.Base} />
                    成就
                  </p>
                </Drawer.Content>
                <Drawer.Content>
                  <p className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg gap-3">
                    <EnvelopIcon size={Size.Base} />
                    信件
                  </p>
                </Drawer.Content>
              </Drawer>
            </IsLogin>
          </ul>
        </div>
      </nav>
      <PostbordList
        onClick={() => setIsMiniMenuOpen(false)}
        className={cx(
          "pt-[65px] max-h-[700px] fixed top-0 w-full z-30 xl:hidden",
          isMiniMenuOpen ? "block" : "hidden"
        )}
      />
      <LoginModel
        isOpen={isLoginModelOpen}
        activityModal={() => setIsLoginModelOpen(!isLoginModelOpen)}
      />
    </>
  );
};

export default MainNav;
