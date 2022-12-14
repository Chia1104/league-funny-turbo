import { useS3ImageUpload } from "@/hooks";
import { Page, Button } from "@wanin/ui";
import { getBaseUrl } from "@/utils/get-base-url";
import { useRef } from "react";
import { type GetServerSideProps, type NextPage } from "next";
import { encodeString } from "@wanin/shared/utils";
import useImage from "use-image";
import Konva from "konva";
import { Head } from "@/components";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { type KonvaImageProps } from "@/components/konva/KonvaImage";

const DynamicKonvaImage = dynamic(
  () => import("@/components/konva/KonvaImage"),
  {
    ssr: false,
  }
);
const ForwardRefKonvaImage = forwardRef<Konva.Stage, KonvaImageProps>(
  (props, ref) => {
    return <DynamicKonvaImage ref={ref} props={props} />;
  }
);
ForwardRefKonvaImage.displayName = "ForwardRefKonvaImage";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { title } = query;
  return {
    props: {
      title: title ? encodeString(title as string) : "",
    },
  };
};

interface TestPageProps {
  title: string;
}

const TestPage: NextPage<TestPageProps> = ({ title }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const konvaRef = useRef<Konva.Stage>(null);
  const htmlCanvasRef = useRef<HTMLCanvasElement>(null);
  const [image] = useImage(
    `${getBaseUrl()}/api/services/og?title=${title || "Test"}`
  );
  const { CanvasPreview } = useS3ImageUpload({
    resize: {
      width: 1200,
      height: 630,
      imgRef,
      runtimes: "canvas",
    },
  });
  const { handleCanvasUpload, isUploading, isSuccess, fileUrl } =
    useS3ImageUpload({
      fileName: "test_og_image",
    });
  return (
    <Page className="w-main gap-5 pt-20">
      <Head
        imageUrl={`${getBaseUrl({ isServer: true })}/api/services/og?title=${
          title || "Test"
        }`}
      />
      <h2>OG Image</h2>
      <img
        id="og-image"
        ref={imgRef}
        src={`${getBaseUrl({ isServer: true })}/api/services/og?title=${
          title || "Test"
        }`}
        alt="og image"
      />
      <h2>Konva Canvas</h2>
      <ForwardRefKonvaImage
        width={1200}
        height={630}
        src={image}
        ref={konvaRef}
      />
      <Button
        text={"Upload Konva Canvas"}
        onClick={() =>
          konvaRef.current ? handleCanvasUpload(konvaRef.current) : null
        }
      />
      <h2>HTML Canvas</h2>
      <CanvasPreview ref={htmlCanvasRef} id="og-spec-canvas-preview" />
      <Button
        id="og-spec-upload-button"
        text={"Upload HTML Canvas"}
        onClick={() =>
          htmlCanvasRef.current
            ? handleCanvasUpload(htmlCanvasRef.current)
            : null
        }
      />
      {isSuccess && fileUrl && !isUploading && (
        <img src={fileUrl} alt="og image preview" id="og-spec-image-preview" />
      )}
    </Page>
  );
};

export default TestPage;
