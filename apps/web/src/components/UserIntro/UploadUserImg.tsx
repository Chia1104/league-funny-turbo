import { useS3ImageUpload } from "@/hooks";
import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";
import { Loading, useToasts } from "@geist-ui/core";
import { Avatar } from "@/components";
import { useSession } from "next-auth/react";
import { UploadHeadShot } from "@/helpers/api/routes/user";
import axios from "axios";

interface UploadUserImg {
  fileUrl: string | null;
}
interface Props {
  querykey: string;
}

const UploadUserImg = forwardRef<UploadUserImg, Props>((props, ref) => {
  const { querykey } = props;
  const [userImage, setUserImage] = useState("");
  const { setToast } = useToasts();
  // const { data: session } = useSession();

  async function onImageChange(e) {
    // e.preventDefault();
    const userImage = e.target.files[0];
    // if (!userImage) return;

    const formData = new FormData();
    formData.append("image", userImage);

    const res = await UploadHeadShot(formData);
    console.log(res);

    // const result = await axios({
    //   url: "http://localhost:8000/api/upload-head-shot",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Accept: "multipart/form-data",
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAyMDI5LCJhIjowLCJiIjowLCJuYW1lIjoicGlnOTg3NjU0MzIxNjAiLCJleHAiOjE2NzM1ODA2ODcsImVtYWlsIjoicGlnOTg3NjU0MzIxNjBAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vc3RhdGljLWNkbi5qdHZudy5uZXQvdXNlci1kZWZhdWx0LXBpY3R1cmVzLXV2L2RiZGM5MTk4LWRlZjgtMTFlOS04NjgxLTc4NGY0MzgyMmU4MC1wcm9maWxlX2ltYWdlLTE1MHgxNTAucG5nIiwic3ViIjoiNDE5NzgyNjcwIiwiaWF0IjoxNjcwOTg4Njg3fQ.polHnKuWTIfv5XSqyv5fojHPzRm-PovQ6dhwt3Mafks",
    //   },
    //   data: formData,
    // });
    // setUserImage(result.data);

    // if (result.status !== 200) {
    //   setToast({
    //     text: result.statusText || "新增圖片失敗",
    //     type: "warning",
    //   });
    //   return;
    // }
  }

  // const {
  //   FileInput,
  //   fileUrl,
  //   isS3UploadComplete,
  //   isSuccess: isUploadSuccess,
  //   isUploading,
  // } = useS3ImageUpload({
  //   resize: {
  //     width: 100,
  //     height: 100,
  //     quality: 100,
  //   },
  //   onS3UploadError: (error) => {
  //     setToast({
  //       text: error,
  //       type: "warning",
  //     });
  //   },
  //   onS3UploadComplete: () => {
  //     setToast({
  //       text: "上傳成功",
  //       type: "success",
  //     });
  //   },
  //   errorMessage: "上傳失敗",
  //   convert: false,
  // });

  // useImperativeHandle(ref, () => ({
  //   fileUrl,
  // }));

  return (
    <>
      <div className="rounded-full bg-white border-2 border-white">
        <Avatar
          url={userImage as string}
          userId={querykey}
          ratio={100}
          username={""}
        />
        {/* {isS3UploadComplete && isUploadSuccess ? (
          <Avatar
            url={fileUrl as string}
            userId={querykey}
            ratio={100}
            username={""}
          />
        ) : (
          <Avatar
            url={session?.user?.image ?? ""}
            ratio={100}
            username={session?.user?.name ?? ""}
          />
        )} */}
      </div>
      <label className="absolute right-0 bottom-1.5 w-8 h-8 rounded-full flex items-center justify-center bg-gray-500 cursor-pointer">
        <input
          type="file"
          onChange={onImageChange}
          style={{ display: "none" }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white">
          <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
          <path
            fillRule="evenodd"
            d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
        {/* <FileInput className="hidden" />
        {!isUploading && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white">
              <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
              <path
                fillRule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
        {isUploading && <Loading type="success" />} */}
      </label>
    </>
  );
});

UploadUserImg.displayName = "UploadUserImg";
export type { UploadUserImg };
export default UploadUserImg;
