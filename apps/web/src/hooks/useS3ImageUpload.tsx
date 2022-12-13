import {
  type ChangeEvent,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import { validateImage } from "@wanin/shared/utils";
import { uploadImageToS3 } from "@/helpers/api/client";
import { useMutation } from "@tanstack/react-query";
import { ACCEPTED_IMAGE_TYPES } from "@wanin/shared/utils";

interface UseS3ImageUploadOptions {
  onS3UploadComplete?: () => void;
  onS3UploadError?: (error?: string) => void;
  errorMessage?: string;
  resize?: {
    width?: number;
    height?: number;
    // Client canvas resize is not supported yet
    runtimes?: "canvas" | "nodejs";
    // Only supported in nodejs, default is 80
    quality?: number;
  };
  // Default is webp
  format?: "webp" | "jpeg" | "jpg" | "png" | "gif";
  // Default is true
  convert?: boolean;
  fileName?: string;
  bucketFolder?: string;
  useNativeFile?: boolean;
  fileNamePrefix?: string;
}

interface UseS3ImageUploadResult {
  FileInput: ForwardRefExoticComponent<
    PropsWithoutRef<
      DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    > &
      RefAttributes<HTMLInputElement>
  >;
  file: File | null | string;
  fileUrl: string | null;
  isUploading: boolean;
  isSuccess: boolean;
  isS3UploadComplete: boolean;
  s3UploadError: string | null;
  isFileValid: boolean;
}

const useS3ImageUpload = (
  options?: UseS3ImageUploadOptions
): UseS3ImageUploadResult => {
  options ??= {};
  const {
    errorMessage = "Something went wrong",
    onS3UploadComplete,
    onS3UploadError,
    resize,
    format = "webp",
    fileName = "",
    bucketFolder,
    convert = true,
    useNativeFile = true,
    fileNamePrefix,
  } = options;
  const [file, setFile] = useState<File | null | string>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isS3UploadComplete, setIsS3UploadComplete] = useState(false);
  const [s3UploadError, setS3UploadError] = useState<string | null>(null);
  const [isFileValid, setIsFileValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const FileInput = forwardRef<
    HTMLInputElement,
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  >((props, ref) => {
    const { onChange, ...rest } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const resizeImageMutation = useMutation({
      mutationFn: async ({ image, file }: { image?: string; file?: File }) => {
        return await uploadImageToS3({
          resize: !!resize,
          image: image as string,
          file,
          width: resize?.width,
          height: resize?.height,
          format,
          fileName,
          useNativeFile,
          bucketFolder,
          convert,
          quality: resize?.quality,
          fileNamePrefix,
        });
      },
    });

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      setIsUploading(true);
      onChange && onChange(e);
      const file = e.target?.files?.[0];
      if (!file) return;
      const validation = validateImage(file);
      if (!validation.success) {
        setS3UploadError(validation.error.errors[0].message);
        setIsFileValid(false);
        setIsSuccess(false);
        onS3UploadError && onS3UploadError(validation.error.errors[0].message);
        setIsUploading(false);
        return;
      }
      const result = await resizeImageMutation.mutateAsync({ file });
      if (result.status === 200) {
        setFile(result.data?.resizedImage as string);
        setFileUrl(result.data?.imageUrl as string);
        setIsS3UploadComplete(true);
        setIsSuccess(true);
        onS3UploadComplete && onS3UploadComplete();
        setIsUploading(false);
        return;
      }
      setS3UploadError(errorMessage);
      setIsSuccess(false);
      onS3UploadError && onS3UploadError(errorMessage);
      setIsUploading(false);
      return;
    };
    return (
      <input
        {...rest}
        ref={inputRef}
        type="file"
        onChange={handleChange}
        accept={ACCEPTED_IMAGE_TYPES.join(", ")}
      />
    );
  });

  FileInput.displayName = "FileInput";

  return {
    FileInput,
    file,
    fileUrl,
    isUploading,
    isS3UploadComplete,
    s3UploadError,
    isFileValid,
    isSuccess,
  };
};

export default useS3ImageUpload;
export type { UseS3ImageUploadOptions, UseS3ImageUploadResult };
