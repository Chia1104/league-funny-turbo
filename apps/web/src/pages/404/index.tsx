import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <div className="w-main w-full">
      <div className="absolute top-[65px] w-full flex flex-col items-center bg-gray-600 dark:bg-black">
        <p className="mt-20 mb-6 text-white font-semibold text-2xl md:text-4xl">
          404
        </p>
        <button className="my-8 px-12 py-2 text-lg btn-styleB border-0 dark:border dark:hover:bg-black rounded-lg transition-all ease-in-out w-border-primary">
          返回首頁
        </button>
      </div>
    </div>
  );
};

export default NotFound;
