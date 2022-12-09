import { useS3ImageUpload } from "@/hooks";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { useToasts } from "@geist-ui/core";
import { useIsMounted } from "usehooks-ts";

interface UploadCoverRef {
  fileUrl: string | null;
}

const UploadCover = forwardRef<UploadCoverRef>((props, ref) => {
  const { setToast } = useToasts();
  const isMounted = useIsMounted();
  const {
    FileInput,
    fileUrl,
    isS3UploadComplete,
    isSuccess: isUploadSuccess,
    s3UploadError,
  } = useS3ImageUpload({
    resize: {
      quality: 100,
    },
  });

  useImperativeHandle(ref, () => ({
    fileUrl,
  }));

  useMemo(() => {
    if (!isUploadSuccess && isMounted()) {
      setToast({
        text: s3UploadError,
        type: "warning",
      });
    }
  }, [isUploadSuccess, s3UploadError]);

  return (
    <div className="w-full max-w-[640px]">
      <div
        className="w-full aspect-w-16 aspect-h-9 rounded-lg w-bg-secondary relative hover:opacity-70 transition-all duration-300"
        style={{
          border: "1px dashed rgba(69, 90, 100, 0.4)",
        }}>
        {isS3UploadComplete && isUploadSuccess && (
          <img
            src={fileUrl as string}
            alt="preview"
            className="object-contain"
          />
        )}
        <div className="w-full h-full flex justify-center items-center">
          {!isUploadSuccess && <p>圖片上傳</p>}
        </div>
        <FileInput className="opacity-0 h-full w-full absolute top-0 left-0" />
      </div>
    </div>
  );
});

UploadCover.displayName = "UploadCover";
export type { UploadCoverRef };
export default UploadCover;
