"use client";

import type { FC } from "react";
import Script from "next/script";
import style from "./style.module.css";

interface Props {
  htmlSource: string;
}

const FeedWithHTML: FC<Props> = (props) => {
  const { htmlSource } = props;

  return (
    <>
      <div
        className={style.frView}
        dangerouslySetInnerHTML={{
          __html: htmlSource,
        }}
      />
      <Script async src="//cdn.embedly.com/widgets/platform.js" />
    </>
  );
};

export default FeedWithHTML;
