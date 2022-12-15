import { setSearchParams } from "@wanin/shared/utils";
import { getBaseUrl } from "@/utils/get-base-url";
import { ApiResponse } from "@wanin/shared/types";
import { ResizeOptions } from "@/server/image/services";

const uploadImageToS3 = async ({
  width,
  height,
  resize,
  image,
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
}): Promise<ApiResponse<{ resizedImage?: string; imageUrl?: string }>> => {
  if (useNativeFile) {
    // const reader = new FileReader();
    // reader.readAsDataURL(file!);
    // const base64 = await new Promise<string>((resolve) => {
    //   reader.onload = () => {
    //     resolve(reader.result as string);
    //   };
    // });
    const data = new FormData();
    data.append("file", file!);
    const res = await fetch(
      `${getBaseUrl()}/api/services/s3/native-file-upload?${setSearchParams({
        searchParams: {
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
      })}`,
      {
        method: "POST",
        headers: {
          "Content-Length": file?.size.toString() || "0",
        },
        body: data,
      }
    );
    return {
      status: res.status,
      data: await res.json(),
    };
  }

  const res = await fetch(`${getBaseUrl()}/api/services/s3/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      width,
      height,
      image,
      format,
      resize,
      convert,
      bucketFolder,
      quality,
      fileName,
      fileNamePrefix,
    }),
  });
  return {
    status: res.status,
    data: await res.json(),
  };
};

export { uploadImageToS3 };
