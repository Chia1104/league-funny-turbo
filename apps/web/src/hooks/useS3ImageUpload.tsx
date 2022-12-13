import {
  type ChangeEvent,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type RefObject,
  type CanvasHTMLAttributes,
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
    imgRef?: RefObject<HTMLImageElement>;
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
  CanvasPreview: ForwardRefExoticComponent<
    PropsWithoutRef<
      DetailedHTMLProps<
        CanvasHTMLAttributes<HTMLCanvasElement>,
        HTMLCanvasElement
      >
    > &
      RefAttributes<HTMLCanvasElement>
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

  const FileInput = forwardRef<
    HTMLInputElement,
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  >((props, ref) => {
    const { onChange, ...rest } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

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
      const result = await resizeImageMutation.mutateAsync({
        file,
      });
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

  const CanvasPreview = forwardRef<
    HTMLCanvasElement,
    DetailedHTMLProps<
      CanvasHTMLAttributes<HTMLCanvasElement>,
      HTMLCanvasElement
    >
  >((props, ref) => {
    const { ...rest } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement);

    const handleCanvasResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = resize?.imgRef?.current;
      if (!img) return;
      ctx.drawImage(
        img,
        0,
        0,
        resize?.width ?? img.width,
        resize?.height ?? img.height
      );
      setImgHeight(img.height);
      setImgWidth(img.width);
    };

    useEffect(() => {
      if (!resize?.imgRef?.current) return;
      if (resize?.runtimes !== "canvas") return;
      handleCanvasResize();
    }, []);

    const handleCanvasUpload = async () => {
      setIsUploading(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const result = await resizeImageMutation.mutateAsync({
        image: canvas.toDataURL(),
      });
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

    return resize?.runtimes === "canvas" ? (
      <canvas
        {...rest}
        ref={canvasRef}
        width={resize?.width ?? imgWidth}
        height={resize?.height ?? imgHeight}
      />
    ) : null;
  });

  CanvasPreview.displayName = "CanvasPreview";

  return {
    FileInput,
    CanvasPreview,
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
