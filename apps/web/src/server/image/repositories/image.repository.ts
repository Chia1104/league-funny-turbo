import sharp from "sharp";

const resize = async ({
  width,
  height,
  image,
}: {
  width: number;
  height: number;
  image: Buffer | string;
}) => {
  return await sharp(image).rotate().resize(width, height).toBuffer();
};

const convertToWebp = async (
  image: Buffer | string,
  options?: sharp.WebpOptions
) => {
  return await sharp(image).webp(options).toBuffer();
};

const convertToJpeg = async (
  image: Buffer | string,
  options?: sharp.JpegOptions
) => {
  return await sharp(image).jpeg(options).toBuffer();
};

const convertToPng = async (
  image: Buffer | string,
  options?: sharp.PngOptions
) => {
  return await sharp(image).png(options).toBuffer();
};

const convertToGif = async (
  image: Buffer | string,
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
