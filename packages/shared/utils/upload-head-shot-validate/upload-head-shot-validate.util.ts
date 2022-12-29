import { z } from "zod";
import { MESSAGE, MAX_FILE_SIZE } from "../s3-upload-validate";

const ACCEPTED_HEADSHOT_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const HeadShotSchema = z.object({
  image: z
    .any()
    .refine((image) => image, MESSAGE.INVALID_FILE_TYPE)
    .refine((image) => image?.size <= MAX_FILE_SIZE, MESSAGE.INVALID_FILE_SIZE)
    .refine(
      (image) => ACCEPTED_HEADSHOT_TYPES.includes(image?.type),
      MESSAGE.INVALID_FILE_TYPE
    ),
});

const validateHeadShot = (image: File) => {
  return HeadShotSchema.safeParse({ image: image });
};

export { validateHeadShot, ACCEPTED_HEADSHOT_TYPES };
