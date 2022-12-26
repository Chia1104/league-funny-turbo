import { useToken } from "@/hooks";
import { IApiResponse, fetcher } from "@/utils/fetcher.util";
import { getBaseUrl } from "@/utils/get-base-url";

const UploadHeadShot = async (image_url): Promise<IApiResponse> => {
  return await fetcher({
    path: "http://localhost:8000/api/upload-head-shot",
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
};

export { UploadHeadShot };
