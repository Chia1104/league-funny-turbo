import {
  type CanvasHTMLAttributes,
  type ChangeEvent,
  type DetailedHTMLProps,
  forwardRef,
  type ForwardRefExoticComponent,
  type InputHTMLAttributes,
  type PropsWithoutRef,
  type RefAttributes,
  type RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ACCEPTED_IMAGE_TYPES, validateImage } from "@wanin/shared/utils";
import { uploadImageToS3 } from "@/helpers/api/routes/services/image";
import { useMutation } from "@tanstack/react-query";
import { ApiResponseStatus } from "@wanin/shared/types";
import Konva from "konva";

interface UseS3ImageUploadOptions {
  onS3UploadComplete?: (imgUrl?: string) => void;
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
  handleCanvasUpload: (
    canvas: HTMLCanvasElement | Konva.Stage
  ) => Promise<void>;
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
      if (
        result.statusCode === 200 &&
        result.status === ApiResponseStatus.SUCCESS
      ) {
        setFile(result.data?.resizedImage as string);
        setFileUrl(result.data?.imageUrl as string);
        setIsS3UploadComplete(true);
        setIsSuccess(true);
        onS3UploadComplete &&
          onS3UploadComplete(result.data?.imageUrl as string);
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

  const handleCanvasUpload = async (
    canvas: HTMLCanvasElement | Konva.Stage
  ) => {
    try {
      setIsUploading(true);
      if (!canvas) return;
      const result = await resizeImageMutation.mutateAsync({
        useNativeFile: false,
        image: canvas.toDataURL(),
      });
      if (
        result.statusCode === 200 &&
        result.status === ApiResponseStatus.SUCCESS
      ) {
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
    } catch (error) {
      setS3UploadError(errorMessage);
      setIsSuccess(false);
      onS3UploadError && onS3UploadError(errorMessage);
      setIsUploading(false);
      return;
    } finally {
      setIsUploading(false);
    }
  };

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
    handleCanvasUpload,
  };
};

export default useS3ImageUpload;
export type { UseS3ImageUploadOptions, UseS3ImageUploadResult };
