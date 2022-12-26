import { useS3ImageUpload } from "@/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { Loading, useToasts } from "@geist-ui/core";
import { Image } from "@/components";
import { useSession } from "next-auth/react";

interface UploadUserBGRef {
  fileUrl: string | null;
}

const UploadUserBG = forwardRef<UploadUserBGRef>((props, ref) => {
  const { data: session } = useSession();
  const { setToast } = useToasts();
  const {
    FileInput,
    fileUrl,
    isS3UploadComplete,
    isSuccess: isUploadSuccess,
    isUploading,
  } = useS3ImageUpload({
    resize: {
      width: 1900,
      height: 331,
    },
    onS3UploadError: (error) => {
      setToast({
        text: error,
        type: "warning",
      });
    },
    onS3UploadComplete: () => {
      setToast({
        text: "上傳成功",
        type: "success",
      });
    },
    errorMessage: "上傳失敗",
    convert: false,
  });

  useImperativeHandle(ref, () => ({
    fileUrl,
  }));

  return (
    <>
      {isS3UploadComplete && isUploadSuccess ? (
        <Image
          src={fileUrl as string}
          alt="banner"
          width={2000}
          height={2000}
          className="object-cover w-full h-[300px] absolute md:h-[340px] desktop:bg-contain"
        />
      ) : (
        // <div className="w-full h-[300px] absolute bg-dark md:h-[340px]"></div>
        <Image
          src={session?.user.image ?? ""}
          alt="banner"
          width={2000}
          height={2000}
          className="object-cover w-full h-[300px] absolute md:h-[340px] desktop:bg-contain"
        />
      )}
      <div className="flex flex-row-reverse relative w-full text-right pt-4 pr-8 md:pt-7 md:pr-16">
        <label className="btn-styleA cursor-pointer bg-light hover:bg-gray-100 dark:bg-dark dark:hover:bg-black">
          <FileInput className="hidden" />
          {!isUploading && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="text-sm ml-2">更換背景</span>
            </>
          )}
          {isUploading && <Loading type="success" />}
        </label>
      </div>
    </>
  );
});

UploadUserBG.displayName = "UploadUserBG";
export type { UploadUserBGRef };
export default UploadUserBG;
