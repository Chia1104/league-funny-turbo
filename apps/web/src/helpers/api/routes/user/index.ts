import { IApiResponse, fetcher } from "@/utils/fetcher.util";

const UploadHeadShot = async (
  image_url: FormData,
  token: string
): Promise<IApiResponse> => {
  return await fetcher({
    path: "/api/upload-head-shot",
    requestInit: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: image_url,
    },
  });
};

export { UploadHeadShot };
