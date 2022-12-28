import { ImageSchema } from "../s3-upload-validate";

const ACCEPTED_HEADSHOT_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const validateHeadShot = (image: File) => {
  return ImageSchema.safeParse({ image: image });
};

export { validateHeadShot, ACCEPTED_HEADSHOT_TYPES };
