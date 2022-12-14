import { useS3ImageUpload } from "@/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { Loading, useToasts } from "@geist-ui/core";
import { resizeConfig } from "@/shared/config/image.config";

interface UploadCoverRef {
  fileUrl: string | null;
}

interface UploadCoverProps {
  initialUrl?: string;
}

const UploadCover = forwardRef<UploadCoverRef, UploadCoverProps>(
  (props, ref) => {
    const { initialUrl } = props;
    const { setToast } = useToasts();
    const {
      FileInput,
      fileUrl,
      isS3UploadComplete,
      isSuccess: isUploadSuccess,
      isUploading,
    } = useS3ImageUpload({
      fileNamePrefix: "_n",
      resize: {
        width: resizeConfig["f_cover"]["width"],
        height: resizeConfig["f_cover"]["height"],
      },
      format: resizeConfig["f_cover"]["format"],
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
    });

    useImperativeHandle(ref, () => ({
      fileUrl: isS3UploadComplete ? fileUrl : initialUrl ?? null,
    }));

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
          {!isS3UploadComplete && initialUrl && (
            <img src={initialUrl} alt="preview" className="object-contain" />
          )}
          <div className="w-full h-full flex flex-col justify-center items-center">
            {!isUploadSuccess && !isUploading && !initialUrl && (
              <p>圖片上傳 (1200 * 630)</p>
            )}
            {isUploading && <Loading type="success" />}
          </div>
          <FileInput className="opacity-0 h-full w-full absolute top-0 left-0 hover:cursor-pointer" />
        </div>
      </div>
    );
  }
);

UploadCover.displayName = "UploadCover";
export type { UploadCoverRef };
export default UploadCover;
