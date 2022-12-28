import type { NextApiRequest, NextApiResponse } from "next";
import {
  getMetadata,
  resizeImage,
  ResizeOptions,
} from "@/server/image/services";
import { putObject } from "@/server/s3/services";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { MAX_FILE_SIZE } from "@wanin/shared/utils";
import { getToken } from "@/server/auth/services";
import { type IApiResponse } from "@/utils/fetcher.util";
import { ApiResponseStatus } from "@wanin/shared/types";
import { errorConfig } from "@/shared/config/network.config";

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
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
          format = "webp",
          resize,
          fileName,
          convert = "true",
          bucketFolder = "imgur",
          quality,
          fileNamePrefix = "",
          useUUID = "true",
          maxWidth,
          ignoreGif = "false",
        } = req.query;
        await runMiddleware(
          req,
          res,
          multer({
            limits: { fileSize: MAX_FILE_SIZE },
            storage: multer.memoryStorage(),
          }).single("file")
        );
        const file = req.file;
        if (!file.mimetype.match(/jpg|jpeg|png|gif|webp/)) {
          return res.status(400).json({
            statusCode: 400,
            status: ApiResponseStatus.ERROR,
            message: "Invalid file type",
          });
        }
        const _fileName = file.originalname.split(".")[0];
        const ext = file.mimetype.split("/")[1];
        const buffer = file.buffer;
        const metadata = await getMetadata(buffer);
        let resizeWidth = width ? parseInt(width as string) : undefined;
        if (maxWidth && (metadata?.width ?? 0) > parseInt(maxWidth as string)) {
          resizeWidth = parseInt(maxWidth as string);
        } else if (
          maxWidth &&
          (metadata?.width ?? 0) < parseInt(maxWidth as string)
        ) {
          resizeWidth = metadata?.width;
        }
        let _resize = resize === "true";
        if (ignoreGif === "true" && ext === "gif") {
          _resize = false;
        }
        let _convert = convert === "true";
        if (ignoreGif === "true" && ext === "gif") {
          _convert = false;
        }
        const resizedImage = await resizeImage({
          resize: _resize,
          convert: _convert,
          quality: quality ? parseInt(quality as string) : undefined,
          width: resizeWidth,
          height: height ? parseInt(height as string) : undefined,
          format: format as ResizeOptions["format"],
          image: buffer,
        });
        const s3Buffer = Buffer.from(resizedImage, "base64");
        const originalImage = Buffer.from(buffer, "base64");
        const _uuid = uuid();
        const key = `${bucketFolder}/${
          useUUID === "true" ? _uuid : ""
        }${fileNamePrefix}${fileName || _fileName}.${
          convert === "true" ? format : ext
        }`;
        const originalKey = `${bucketFolder}/${useUUID === "true" && _uuid}_o${
          fileName || _fileName
        }.${ext}`;
        const s3 = await putObject({
          Key: key,
          Body: s3Buffer,
          ContentType: `image/${format as ResizeOptions["format"]}`,
        });
        const originalS3 = await putObject({
          Key: originalKey,
          Body: originalImage,
          ContentType: `image/${ext}`,
        });
        if (s3.$metadata.httpStatusCode !== 200) {
          return res.status(s3.$metadata.httpStatusCode || 403).json({
            statusCode: s3.$metadata.httpStatusCode || 403,
            status: ApiResponseStatus.ERROR,
            message: "Error uploading image",
          });
        }
        if (originalS3.$metadata.httpStatusCode !== 200) {
          return res.status(originalS3.$metadata.httpStatusCode || 403).json({
            statusCode: originalS3.$metadata.httpStatusCode || 403,
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
