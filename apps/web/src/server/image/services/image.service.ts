import { convertImage, resize as resizeFN } from "@/server/image/repositories";

interface ResizeOptions {
  image: string;
  width?: number;
  height?: number;
  format?: "webp" | "jpeg" | "jpg" | "png" | "gif";
  resize?: boolean;
}

const resizeImage = async (options: ResizeOptions): Promise<string> => {
  const { image, width, height, format = "webp", resize } = options;
  const buffer = Buffer.from(image, "base64");
  if (resize) {
    if (!width || !height) {
      throw new Error("Missing width or height");
    }
    const resizedImage = await resizeFN({
      width,
      height,
      image: buffer,
    });
    const convertedImage = await convertImage[format](resizedImage);
    return Buffer.from(convertedImage).toString("base64");
  }
  const convertedImage = await convertImage[format](buffer);
  return Buffer.from(convertedImage).toString("base64");
};

export type { ResizeOptions };
export { resizeImage };
