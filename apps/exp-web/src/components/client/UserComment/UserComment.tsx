"use client";

import { type FC, useState } from "react";
import { Textarea, Checkbox, Button } from "@geist-ui/core";
import Image from "next/image";
import cx from "classnames";
import "./UserComment.scss";

const UserComment: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="user-comment w-full w-bg-secondary rounded-lg shadow-lg mb-4">
      <div className="w-full bg-blue-500 rounded-t px-4 py-2">
        <span className="text-2xl text-white">Vivian的留言板</span>
        <span>(目前有0則留言)</span>
      </div>
      <div className="p-3">
        <div className="bg-gray-200 p-3">
          <div className="flex items-center">
            <Image
              className="data-img"
              alt="about/img1"
              src="/about/about_img1.png"
              width={100}
              height={100}
            />
            <textarea className="txt-area" />
          </div>
          <div className="flex justify-between item-center mt-3">
            <label className="private-btn">
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
              <div className="btn-picture">
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
              </div>
              <div className="btn-comment">
                <p>留言</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
