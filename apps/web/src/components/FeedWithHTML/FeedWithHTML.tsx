import type { FC } from "react";
import Script from "next/script";

interface Props {
  htmlSource: string;
}

const FeedWithHTML: FC<Props> = (props) => {
  const { htmlSource } = props;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: htmlSource,
        }}
      />
      <Script async src="//cdn.embedly.com/widgets/platform.js" />
    </>
  );
};

export default FeedWithHTML;
