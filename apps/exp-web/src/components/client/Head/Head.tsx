"use client";

import { type FC } from "react";
import { LeagueFunny } from "@/shared/meta";
import NextHead from "next/head";

interface Props {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string[];
  type?: "website" | "article" | "book" | "profile";
  imageUrl?: string;
}

const Head: FC<Props> = (props) => {
  const {
    title,
    description,
    canonicalUrl,
    keywords,
    type = "website",
    imageUrl,
  } = props;
  const name = LeagueFunny.name;
  const l_title = LeagueFunny.title;
  const excerpt = LeagueFunny.excerpt;
  return (
    <NextHead>
      <title>{title || `${l_title}`}</title>
      <meta property="og:title" content={title || `${l_title}`} key="title" />
      <meta name="robots" content="index,follow" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="description" content={description || excerpt} />
      <meta
        property="og:description"
        content={description || excerpt}
        key="description"
      />
      <meta
        name="keywords"
        content={
          keywords?.join(", ") ||
          "Typescript, FullStack, NextJS, React, NestJS, Chia1104"
        }
      />
      <meta name="author" content={`${name}`} />
      <meta property="og:type" content={type} key="type" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#2B2E4A" />
      <meta property="og:image" content={imageUrl || ""} key="image" />
    </NextHead>
  );
};

export default Head;
