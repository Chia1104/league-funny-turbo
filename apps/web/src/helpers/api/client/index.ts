import type {
  Pagenate,
  PostCategory,
  Feed,
  Tag,
  NewPostDTO,
} from "@wanin/shared/types";
import { setSearchParams } from "@wanin/shared/utils";
import { getBaseUrl } from "@/utils/get-base-url";
import { ApiResponse } from "@wanin/shared/types";
import { ResizeOptions } from "@/server/image/services";

const fetchSidebar = async (): Promise<PostCategory[]> => {
  const res = await fetch(`${getBaseUrl()}/api/main-bord`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return await res.json();
};

const fetchMoreFeedList = async ({
  page = 1,
  searchParams,
}: {
  page?: number;
  searchParams?: Record<string, string>;
}) => {
  const res = await fetch(
    `${getBaseUrl()}/api/feed?${setSearchParams({
      searchParams: { page: page.toString(), ...searchParams },
    })}`
  );
  const data = (await res.json()) as Pagenate<Feed[]>;
  const { data: feedList } = data;
  return feedList;
};

const fetchCommentList = async ({
  fid,
  page,
}: {
  fid: number;
  page?: number;
}) => {
  const res = await fetch(
    `${getBaseUrl()}/api/comment?${setSearchParams({
      searchParams: {
        fid: fid.toString(),
        page: page?.toString() || "1",
      },
    })}`
  );
  const data = (await res.json()) as Pagenate<Comment[]>;
  const { data: commentList } = data;
  return commentList;
};

const fetchBoardCategory = async (
  b_id: number
): Promise<{ bc_id: number; bc_name: string }[]> => {
  const res = await fetch(`${getBaseUrl()}/api/main-bord/${b_id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return await res.json();
};

const fetchTagList = async (searchTag: string): Promise<Tag[]> => {
  const res = await fetch(
    `${getBaseUrl()}/api/tag?${setSearchParams({
      searchParams: {
        q: searchTag,
      },
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return await res.json();
};

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
}: ResizeOptions & {
  useNativeFile?: boolean;
  file?: File;
  fileName?: string;
  image?: string;
  bucketFolder?: string;
}): Promise<ApiResponse<{ resizedImage?: string; imageUrl?: string }>> => {
  if (useNativeFile) {
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    const base64 = await new Promise<string>((resolve) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });
    const res = await fetch(`${getBaseUrl()}/api/services/s3/upload`, {
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
        fileName:
          fileName || file?.name?.substr(0, file?.name.lastIndexOf(".")) || "",
      }),
    });
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
    }),
  });
  return {
    status: res.status,
    data: await res.json(),
  };
};

const addNewFeed = async (
  newPost: Partial<NewPostDTO>
): Promise<
  ApiResponse<
    {
      fid: number;
      gameType: string;
    } & { message: string }
  >
> => {
  const res = await fetch(`${getBaseUrl()}/api/feed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newPost),
  });
  const data = await res.json();
  return {
    status: res.status,
    data: data.data,
  };
};

export {
  fetchSidebar,
  fetchMoreFeedList,
  fetchCommentList,
  fetchBoardCategory,
  fetchTagList,
  uploadImageToS3,
  addNewFeed,
};
