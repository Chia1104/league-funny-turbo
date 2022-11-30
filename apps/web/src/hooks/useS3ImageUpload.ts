import {
  CompleteMultipartUploadCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import {
  type ChangeEvent,
  type ReactElement,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

interface UseS3ImageUploadOptions {
  endpoint: string;
  onS3UploadComplete?: (data: CompleteMultipartUploadCommandOutput) => void;
  onS3UploadError?: (error: Error) => void;
}

interface UseS3ImageUploadResult {
  FileInput: ReactElement<HTMLInputElement>;
  file: File | null;
  fileUrl: string | null;
  isUploading: boolean;
  isS3UploadComplete: boolean;
  s3UploadError: Error | null;
}

export type { UseS3ImageUploadOptions, UseS3ImageUploadResult };
