import { z } from "zod";

const MAX_FILE_SIZE = 2000000; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MESSAGE = {
  INVALID_FILE_TYPE: "請放入有效的圖片",
  INVALID_FILE_SIZE: "圖片大小不可超過2MB",
  SUCCESS: "圖片上傳成功",
};

const ImageSchema = z.object({
  image: z
    .any()
    .refine((image) => image, MESSAGE.INVALID_FILE_TYPE)
    .refine((image) => image?.size <= MAX_FILE_SIZE, MESSAGE.INVALID_FILE_SIZE)
    .refine(
      (image) => ACCEPTED_IMAGE_TYPES.includes(image?.type),
      MESSAGE.INVALID_FILE_TYPE
    ),
});

const validateImage = (image: File) => {
  return ImageSchema.safeParse({ image: image });
};

export {
  ImageSchema,
  validateImage,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MESSAGE,
};
