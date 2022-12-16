import { fetcher, type IApiResponse } from "@/utils/fetcher.util";
import { getBaseUrl } from "@/utils/get-base-url";
import { ResizeOptions } from "@/server/image/services";

const uploadImageToS3 = async ({
  width,
  height,
  resize,
  image: base64,
  format,
  useNativeFile,
  file,
  fileName,
  convert,
  bucketFolder,
  quality,
  fileNamePrefix,
}: ResizeOptions & {
  useNativeFile?: boolean;
  file?: File;
  fileName?: string;
  image?: string;
  bucketFolder?: string;
  fileNamePrefix?: string;
}): Promise<IApiResponse<{ resizedImage?: string; imageUrl?: string }>> => {
  if (useNativeFile) {
    const data = new FormData();
    data.append("file", file!);
    return await fetcher<{ resizedImage?: string; imageUrl?: string }>({
      endpoint: getBaseUrl(),
      path: "/api/services/s3/native-file-upload",
      params: {
        fileName: fileName || "",
        bucketFolder: bucketFolder || "",
        width: width?.toString() || "",
        height: height?.toString() || "",
        resize: resize?.toString() || "",
        format: format || "",
        convert: convert?.toString() || "",
        quality: quality?.toString() || "",
        fileNamePrefix: fileNamePrefix || "",
      },
      requestInit: {
        method: "POST",
        headers: {
          "Content-Length": file?.size.toString() || "0",
        },
        body: data,
      },
    });
  }
  return await fetcher<{ resizedImage?: string; imageUrl?: string }>({
    endpoint: getBaseUrl(),
    path: "/api/services/s3/upload",
    requestInit: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        width,
        height,
        image: base64,
        format,
        resize,
        convert,
        bucketFolder,
        quality,
        fileName,
        fileNamePrefix,
      }),
    },
  });
};

export { uploadImageToS3 };
