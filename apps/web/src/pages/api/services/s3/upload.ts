import type { NextApiRequest, NextApiResponse } from "next";
import { resizeImage, ResizeOptions } from "@/server/image/services";
import { putObject } from "@/server/s3/services";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "@/server/auth/services";
import { ApiResponseStatus } from "@wanin/shared/types";
import { errorConfig } from "@/shared/config/network.config";
import { IApiResponse } from "@/utils/fetcher.util";

const regex = /^data:.+\/(.+);base64,(.*)$/;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<{ resizedImage: string; imageUrl: string }>>
) {
  const token = await getToken(req);
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      status: ApiResponseStatus.ERROR,
      message: errorConfig[401],
    });
  }
  const uuid = () => uuidv4();

  switch (req.method) {
    case "POST":
      try {
        const {
          width,
          height,
          image,
          format = "webp",
          resize = false,
          fileName = "",
          convert = true,
          quality,
          fileNamePrefix = "",
          useUUID = true,
        }: ResizeOptions & {
          fileName?: string;
          bucketFolder?: string;
          fileNamePrefix?: string;
          useUUID?: boolean;
        } = req.body;
        const matches = (image as string).match(regex) as RegExpMatchArray;
        const data = matches[2];
        const resizedImage = await resizeImage({
          resize,
          width,
          height,
          image: data,
          convert,
          quality,
        });
        const buffer = Buffer.from(
          resizedImage.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const key = `imgur/${
          useUUID && uuid()
        }${fileNamePrefix}${fileName}.${format}`;
        const s3 = await putObject({
          Key: key,
          Body: buffer,
          ContentType: `image/${format}`,
        });
        if (s3.$metadata.httpStatusCode !== 200) {
          return res.status(s3.$metadata.httpStatusCode || 403).json({
            statusCode: s3.$metadata.httpStatusCode || 403,
            status: ApiResponseStatus.ERROR,
            message: "Error uploading image",
          });
        }
        return res.status(200).json({
          statusCode: 200,
          status: ApiResponseStatus.SUCCESS,
          data: {
            resizedImage: `data:image/${format};base64,${resizedImage}`,
            imageUrl: `https://img.league-funny.com/${key}`,
          },
        });
      } catch (error) {
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
