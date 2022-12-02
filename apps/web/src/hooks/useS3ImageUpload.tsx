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
import { validateImage } from "@wanin/shared/utils";
import { uploadImage } from "@/helpers/api/client";

interface UseS3ImageUploadOptions {
  endpoint?: string;
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
  const {
    endpoint = "/api/s3/image",
    onS3UploadComplete,
    onS3UploadError,
  } = options;
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

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      setIsUploading(true);
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
      const res = await uploadImage(file, { endpoint });
      if (res.status !== 200) {
        // @ts-ignore
        setS3UploadError(res.data?.message ?? "Something went wrong");
        setIsFileValid(false);
        onS3UploadError && onS3UploadError();
        setIsUploading(false);
        return;
      }
      const client = new S3Client({
        credentials: {
          accessKeyId: res.data.token.Credentials.AccessKeyId,
          secretAccessKey: res.data.token.Credentials.SecretAccessKey,
          sessionToken: res.data.token.Credentials.SessionToken,
        },
        region: res.data.region,
      });
      const params = {
        Bucket: res.data.bucket,
        Key: res.data.key,
        Body: file,
        CacheControl: "max-age=630720000, public",
        ContentType: file.type,
      };
      try {
        const upload = new Upload({
          client,
          params,
        });
        const uploadResult =
          (await upload.done()) as CompleteMultipartUploadCommandOutput;
        setFileUrl(
          uploadResult.Bucket && uploadResult.Key
            ? `https://${uploadResult.Bucket}.s3.${res.data.region}.amazonaws.com/${uploadResult.Key}`
            : ""
        );
        setFile(file);
        setIsS3UploadComplete(true);
        onS3UploadComplete && onS3UploadComplete();
        setIsUploading(false);
      } catch (e) {
        console.error(e);
        setS3UploadError("Something went wrong");
        setIsFileValid(false);
        onS3UploadError && onS3UploadError();
        setIsUploading(false);
      }
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
