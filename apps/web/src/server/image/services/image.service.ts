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

const convertToWebp = async (image: Buffer | string) => {
  return await sharp(image).webp().toBuffer();
};

const generateImage = async (image: Buffer | string) => {
  return await sharp(image).toFile("image.png");
};

export { resize, convertToWebp };
