import type { NextApiResponse } from "next";
import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(
  req: NextRequest,
  res: NextApiResponse<ImageResponse>
) {
  switch (req.method) {
    case "GET":
      try {
        const { searchParams } = new URL(req.url);

        const hasTitle = searchParams.has("title");
        const title = hasTitle
          ? searchParams.get("title")?.slice(0, 100)
          : "My default title";

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
                }}></div>
              <div
                style={{
                  fontSize: 60,
                  fontStyle: "normal",
                  letterSpacing: "-0.025em",
                  color: "white",
                  marginTop: 30,
                  padding: "0 120px",
                  lineHeight: 1.4,
                  whiteSpace: "pre-wrap",
                }}>
                {title}
              </div>
            </div>
          ),
          {
            width: 1200,
            height: 630,
          }
        );
      } catch (e: any) {
        return res.status(400).json({ message: "Bad request" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
