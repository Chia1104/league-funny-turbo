import { type FC } from "react";
import { LeagueFunny } from "@/shared/meta";

interface Props {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string[];
  type?: "website" | "article" | "book" | "profile";
  imageUrl?: string;
  author?: string;
}

const Head: FC<Props> = (props) => {
  const {
    title,
    description,
    canonicalUrl,
    keywords,
    type = "website",
    imageUrl,
    author,
  } = props;

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="robots" content="index,follow" />
      <title>{title || LeagueFunny.title}</title>
      <meta
        property="og:title"
        content={title || LeagueFunny.title}
        key="title"
      />
      <meta name="robots" content="index,follow" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta
        name="description"
        content={description || LeagueFunny.description}
      />
      <meta
        property="og:description"
        content={description || LeagueFunny.description}
        key="description"
      />
      <meta
        name="keywords"
        content={keywords?.join(", ") || LeagueFunny.keyword}
      />
      <meta name="author" content={author || LeagueFunny.chineseName} />
      <meta property="og:type" content={type} key="type" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#2B2E4A" />
      <meta property="og:image" content={imageUrl || ""} key="image" />
    </>
  );
};

export default Head;
