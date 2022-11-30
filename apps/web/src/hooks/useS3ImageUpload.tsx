import {
  CompleteMultipartUploadCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
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
import { validateImage } from "@wanin/utils";

interface UseS3ImageUploadOptions {
  endpoint: string;
  onS3UploadComplete?: () => void;
  onS3UploadError?: () => void;
}

interface UseS3ImageUploadResult {
  FileInput: ForwardRefExoticComponent<
    PropsWithoutRef<
      DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    > &
      RefAttributes<HTMLInputElement>
  >;
  file: File | null;
  fileUrl: string | null;
  isUploading: boolean;
  isS3UploadComplete: boolean;
  s3UploadError: string | null;
  isFileValid: boolean;
}

const useS3ImageUpload = (
  options: UseS3ImageUploadOptions
): UseS3ImageUploadResult => {
  const { endpoint, onS3UploadComplete, onS3UploadError } = options;
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isS3UploadComplete, setIsS3UploadComplete] = useState(false);
  const [s3UploadError, setS3UploadError] = useState<string | null>(null);
  const [isFileValid, setIsFileValid] = useState(false);
  const FileInput = forwardRef<
    HTMLInputElement,
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  >((props, ref) => {
    const { onChange, ...rest } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      // @ts-ignore
      const file = e.target.files[0];
      if (!file) return;
      const validation = validateImage(file);
      if (!validation.success) {
        setS3UploadError(validation.error.errors[0].message);
        setIsFileValid(false);
        onS3UploadError && onS3UploadError();
        return;
      }
      onS3UploadComplete && onS3UploadComplete();
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
  };
};

export default useS3ImageUpload;
export type { UseS3ImageUploadOptions, UseS3ImageUploadResult };
