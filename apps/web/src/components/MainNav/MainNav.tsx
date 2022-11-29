import { type FC, useState } from "react";
import { Avatar, Image } from "@/components";
import { BillIcon, MissionIcon, AchievementIcon, EnvelopIcon } from "@wanin/ui";
import { Size } from "@wanin/types";
import { Tooltip, Popover } from "@geist-ui/core";
import data from "@/shared/data/bill.json";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import LoginModel from "@/components/MainNav/LoginModel";
import { useDarkMode } from "@/hooks";
import { useRouter } from "next/router";

const MainNav: FC = () => {
  const { data: session } = useSession();
  const { toggle } = useDarkMode();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      <Popover.Item>
        <button onClick={() => router.push("/new-post")}>New Post</button>
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
            <Link href="/l" className="ml-3">
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
            <li>
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
            <li>
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
            <li>
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
          </ul>
          <div className="mr-5">
            {session ? (
              <Popover
                enterDelay={0}
                leaveDelay={0}
                content={userInfo}
                placement="bottom"
                portalClassName="min-w-[230px]">
                <Avatar
                  username={session?.user?.name ?? ""}
                  ratio={30}
                  url={session?.user?.image ?? ""}
                />
              </Popover>
            ) : (
              <button
                className="hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg min-w-[50px] transition-all ease-in-out w-border-primary"
                onClick={() => setIsOpen(true)}>
                登入
              </button>
            )}
          </div>
        </div>
      </nav>
      <LoginModel isOpen={isOpen} activityModal={() => setIsOpen(!isOpen)} />
    </>
  );
};

export default MainNav;
