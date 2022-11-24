import NextHead from "next/head";
import { type FC } from "react";

export interface HeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string[];
  type?: "website" | "article" | "book" | "profile";
  imageUrl?: string;
}

const Head: FC<HeadProps> = (props) => {
  const {
    title,
    description,
    canonicalUrl,
    keywords,
    type = "website",
    imageUrl,
  } = props;
  return (
    <NextHead>
      <title>{title || "League Funny"}</title>
      <meta property="og:title" content={title || "League Funny"} key="title" />
      <meta name="robots" content="index,follow" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="description" content={description || "League Funny"} />
      <meta
        property="og:description"
        content={description || "League Funny"}
        key="description"
      />
      <meta name="keywords" content={keywords?.join(", ") || "League Funny"} />
      <meta name="author" content={"League Funny"} />
      <meta property="og:type" content={type} key="type" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#2B2E4A" />
      <meta property="og:image" content={imageUrl || ""} key="image" />
    </NextHead>
  );
};

export default Head;
