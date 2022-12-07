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
    ctx.drawImage(image, 0, 0, 110, 110);
    // @ts-ignore
    setImage(canvas.toDataURL(image.type));
  }, []);
  useEffect(() => {
    console.log(resizeImageMutation.data);
  });
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
        // resize: true,
        image,
        width: 50,
        height: 50,
      });
    },
  });
  return (
    <Page className="w-main w-full flex flex-col">
      <h1>Test Page</h1>
      <p>Test page content</p>
      <img src="/logo-1.png" alt="logo" ref={imageRef} />
      <canvas ref={canvasRef} width={110} height={110} className="hidden" />
      <Button
        text={"Resize"}
        onClick={() => resizeImageMutation.mutate({ image: image as string })}
      />
      {resizeImageMutation.data &&
        resizeImageMutation.isSuccess &&
        resizeImageMutation.data?.status === 200 && (
          <img src={resizeImageMutation.data.data.resizedImage} alt="resizes" />
        )}
    </Page>
  );
};

export default TestPage;
