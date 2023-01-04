import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has("title");
    const hasImage = searchParams.has("imgSrc");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";
    const imgSrc = hasImage
      ? searchParams.get("imgSrc")
      : "https://img.league-funny.com/imgur/c56c6338-0c34-4b45-b84f-a746629427e5_nog.png";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}>
            {hasImage && (
              <img
                tw="w-full object-contain"
                alt="og"
                src="https://img.league-funny.com/imgur/c56c6338-0c34-4b45-b84f-a746629427e5_nog.png"
              />
            )}
            {!hasImage && <h1>{title}</h1>}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
