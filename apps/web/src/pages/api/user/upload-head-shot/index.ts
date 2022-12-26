import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseStatus } from "@wanin/shared/types";
import { fetcher, type IApiResponse } from "@/utils/fetcher.util";
import { errorConfig } from "@/shared/config/network.config";
import { getTokenRaw } from "@/server/auth/services";
import axios from "axios";
import { API_URL } from "@/shared/constants";

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) {
  // const raw = await getTokenRaw(req);
  // if (!raw) {
  //   return res.status(401).json({
  //     statusCode: 401,
  //     status: ApiResponseStatus.ERROR,
  //     message: errorConfig[401],
  //   });
  // }

  // const result = await axios({
  //   url: "/api/upload-head-shot",
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     Accept: "multipart/form-data",
  //     Authorization: `Bearer ${raw}`,
  //   },
  //   data: req.body,
  // });

  switch (req.method) {
    case "POST":
      try {
        const image_url = req.body;

        const result = await fetcher({
          path: "/api/upload-head-shot",
          requestInit: {
            method: "POST",
            headers: {
              // "Content-Type": "multipart/form-data",
              // Accept: "multipart/form-data",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAyMDI5LCJhIjowLCJiIjowLCJuYW1lIjoicGlnOTg3NjU0MzIxNjAiLCJleHAiOjE2NzM1ODA2ODcsImVtYWlsIjoicGlnOTg3NjU0MzIxNjBAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vc3RhdGljLWNkbi5qdHZudy5uZXQvdXNlci1kZWZhdWx0LXBpY3R1cmVzLXV2L2RiZGM5MTk4LWRlZjgtMTFlOS04NjgxLTc4NGY0MzgyMmU4MC1wcm9maWxlX2ltYWdlLTE1MHgxNTAucG5nIiwic3ViIjoiNDE5NzgyNjcwIiwiaWF0IjoxNjcwOTg4Njg3fQ.polHnKuWTIfv5XSqyv5fojHPzRm-PovQ6dhwt3Mafks",
            },
            body: image_url,
          },
        });
        return res.status(result.statusCode).json({
          statusCode: result.statusCode,
          status: result.status,
          message: result?.message,
          data: result?.data,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          statusCode: 400,
          status: ApiResponseStatus.ERROR,
          message: errorConfig[400],
        });
      }
    default:
      return res.status(405).json({
        statusCode: 405,
        status: ApiResponseStatus.ERROR,
        message: errorConfig[405],
      });
  }
}
