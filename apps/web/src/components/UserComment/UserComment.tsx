import { type FC, useState } from "react";
import { Avatar } from "@/components";
import cx from "classnames";

interface Props {
  querykey: string;
}

const UserComment: FC<Props> = (props) => {
  const { querykey } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="user-comment w-full w-bg-secondary rounded-lg shadow-lg mb-4 w-border-primary">
      <div className="w-full bg-blue-500 rounded-t px-4 py-2 rounded-t-lg dark:bg-dark">
        <span className="text-2xl text-white">Vivian的留言板</span>
        <span>(目前有0則留言)</span>
      </div>
      <div className="p-2 w-bg-primary rounded-b-lg">
        <div className="bg-gray-200 p-2 dark:bg-dark">
          <div className="flex items-center">
            <Avatar
              url={`https://img.league-funny.com/user_cover/${
                querykey || ""
              }.jpg`}
              userId={querykey}
              ratio={60}
              username={""}
            />
            <textarea className="w-full min-h-[50px] max-h-[280px] w-border-primary outline-0 rounded-lg ml-4 px-2 py-2" />
          </div>
          <div className="flex justify-between item-center mt-3">
            <label className="private-btn hover:bg-gray-100 dark:bg-dark dark:hover:bg-black">
              <input
                type="checkbox"
                onChange={() => {
                  setIsOpen(!isOpen);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={cx("checkbox", isOpen && "checkbox--active")}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  stroke={isOpen ? "#fff" : "none"}
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              設為私密
            </label>
            <div className="flex item-center">
              <button className="px-3 bg-light btn-styleA hover:bg-gray-100 dark:bg-dark dark:hover:bg-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-full mx-auto">
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path
                    fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="px-7 ml-2 btn-styleA bg-light hover:bg-gray-100 dark:bg-dark dark:hover:bg-black">
                留言
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
