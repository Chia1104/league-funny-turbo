import { Page, Button } from "@wanin/ui";
import { useRef, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resizeImage, uploadImageToS3 } from "@/helpers/api/client";

const TestPage = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const prevImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;
    // @ts-ignore
    ctx.drawImage(image, 0, 0, 500, 500);
    // @ts-ignore
    setImage(canvas.toDataURL(image.type));
  }, []);
  const resizeImageMutation = useMutation({
    mutationFn: async ({
      width,
      height,
      image,
    }: {
      width?: number;
      height?: number;
      image: string;
    }) => {
      return await uploadImageToS3({
        image,
      });
    },
  });
  return (
    <Page className="w-main w-full flex flex-col">
      <h1>Test Page</h1>
      <p>Test page content</p>
      <img src="/logo-1.png" alt="logo" ref={imageRef} />
      <canvas ref={canvasRef} width={500} height={500} className="hidden" />
      <Button
        text={"Resize"}
        onClick={() => resizeImageMutation.mutate({ image: image as string })}
      />
      {resizeImageMutation.data && (
        <img
          src={`data:image/webp;base64,${resizeImageMutation.data.data.resizedImage}`}
          alt="resizes"
        />
      )}
    </Page>
  );
};

export default TestPage;
