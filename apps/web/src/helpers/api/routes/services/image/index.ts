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
  bucketFolder = "imgur",
  quality,
  fileNamePrefix,
  useUUID = true,
  maxWidth,
  ignoreGif,
}: ResizeOptions & {
  useNativeFile?: boolean;
  file?: File;
  fileName?: string;
  image?: string;
  bucketFolder?: string;
  fileNamePrefix?: string;
  useUUID?: boolean;
  maxWidth?: number;
  ignoreGif?: boolean;
}): Promise<IApiResponse<{ resizedImage?: string; imageUrl?: string }>> => {
  const uploadNativePath = {
    imgur: "/api/services/s3/native-file-upload",
    timeline_cover: "/api/services/s3/timeline-cover",
  };
  const uploadPath = {
    imgur: "/api/services/s3/upload",
  };
  if (useNativeFile) {
    const data = new FormData();
    data.append("file", file!);
    return await fetcher<{ resizedImage?: string; imageUrl?: string }>({
      endpoint: getBaseUrl(),
      // @ts-ignore
      path: uploadNativePath[bucketFolder],
      params: {
        fileName,
        bucketFolder,
        width: width?.toString() || "",
        height: height?.toString() || "",
        resize: resize?.toString() || "",
        format,
        convert: convert?.toString() || "",
        quality: quality?.toString() || "",
        fileNamePrefix,
        useUUID: useUUID ? "true" : "false",
        maxWidth: maxWidth?.toString() || "",
        ignoreGif: ignoreGif ? "true" : undefined,
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
    // @ts-ignore
    path: uploadPath[bucketFolder],
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
        useUUID,
      }),
    },
  });
};

export { uploadImageToS3 };
