import sharp from "sharp";

const resize = async ({
  width,
  height,
  image,
}: {
  width?: number;
  height?: number;
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
}) => {
  return await sharp(image).rotate().resize(width, height).toBuffer();
};

const convertToWebp = async (
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
    | Float64Array,
  options?: sharp.WebpOptions
) => {
  return await sharp(image).webp(options).toBuffer();
};

const convertToJpeg = async (
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
    | Float64Array,
  options?: sharp.JpegOptions
) => {
  return await sharp(image).jpeg(options).toBuffer();
};

const convertToPng = async (
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
    | Float64Array,
  options?: sharp.PngOptions
) => {
  return await sharp(image).png(options).toBuffer();
};

const convertToGif = async (
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
    | Float64Array,
  options?: sharp.GifOptions
) => {
  return await sharp(image).gif(options).toBuffer();
};

const convertImage = {
  webp: convertToWebp,
  jpeg: convertToJpeg,
  jpg: convertToJpeg,
  png: convertToPng,
  gif: convertToGif,
};

const generateImage = async (image: Buffer | string) => {
  return await sharp(image).toFile("image.png");
};

export { resize, convertImage };
