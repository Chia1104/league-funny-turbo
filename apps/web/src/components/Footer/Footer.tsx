import type { FC } from "react";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex py-8 border-t justify-center items-center w-bg-secondary dark:border dark:border-gray-700 mt-20">
      <p>©{year}, 遊戲大亂鬥</p>
    </footer>
  );
};

export default Footer;
