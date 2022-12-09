import { convertImage, resize as resizeFN } from "@/server/image/repositories";
import sharp from "sharp";

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
  convert?: boolean;
  quality?: number;
}

const resizeImage = async (options: ResizeOptions): Promise<string> => {
  const {
    image,
    width,
    height,
    format = "webp",
    resize,
    convert,
    quality = 80,
  } = options;
  const buffer =
    typeof image === "string" ? Buffer.from(image, "base64") : image;
  if (resize) {
    const resizedImage = await resizeFN({
      width,
      height,
      image: buffer,
    });
    if (convert) {
      const convertedImage = await convertImage[format](resizedImage, {
        quality,
      });
      return Buffer.from(convertedImage).toString("base64");
    }
    return Buffer.from(resizedImage).toString("base64");
  }
  if (convert) {
    const convertedImage = await convertImage[format](buffer, {
      quality,
    });
    return Buffer.from(convertedImage).toString("base64");
  }
  return Buffer.from(buffer).toString("base64");
};

const getMetadata = async (
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
    | Float64Array
): Promise<sharp.Metadata> => {
  const buffer =
    typeof image === "string" ? Buffer.from(image, "base64") : image;
  return await sharp(buffer).metadata();
};

export type { ResizeOptions };
export { resizeImage, getMetadata };
