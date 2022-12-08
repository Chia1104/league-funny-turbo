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

interface UseS3ImageUploadOptions {
  // Will be deprecated soon
  endpoint?: string;
  onS3UploadComplete?: () => void;
  onS3UploadError?: () => void;
  errorMessage?: string;
  resize?: {
    width?: number;
    height?: number;
    // Client canvas resize is not supported yet
    runtimes?: "canvas" | "nodejs";
  };
  format?: "webp" | "jpeg" | "jpg" | "png" | "gif";
  fileName?: string;
  bucketFolder?: string;
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
    endpoint = "/api/s3/services/native-file-upload",
    errorMessage = "Something went wrong",
    onS3UploadComplete,
    onS3UploadError,
    resize,
    format = "webp",
    fileName = "",
    bucketFolder,
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
      mutationFn: async ({
        image,
        file,
        useNativeFile = true,
      }: {
        image?: string;
        file?: File;
        useNativeFile?: boolean;
      }) => {
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
        onS3UploadError && onS3UploadError();
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
      onS3UploadError && onS3UploadError();
      setIsUploading(false);
      return;
    };
    return (
      <input {...rest} ref={inputRef} type="file" onChange={handleChange} />
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
