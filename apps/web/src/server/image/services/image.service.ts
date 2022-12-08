import { convertImage, resize as resizeFN } from "@/server/image/repositories";

interface ResizeOptions {
  image:
    | string
    | Buffer
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    | Uint16Array
    | Int16Array
    | Uint32Array
    | Int32Array
    | Float32Array
    | Float64Array;
  width?: number;
  height?: number;
  format?: "webp" | "jpeg" | "jpg" | "png" | "gif";
  resize?: boolean;
}

const resizeImage = async (options: ResizeOptions): Promise<string> => {
  const { image, width, height, format = "webp", resize } = options;
  const buffer =
    typeof image === "string" ? Buffer.from(image, "base64") : image;
  if (resize) {
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
