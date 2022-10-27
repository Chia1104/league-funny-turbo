import { type FC, useState } from "react";
import NextImage from "next/future/image";
import type { ImageProps as NextImageProps } from "next/future/image";
import cx from "classnames";

const Image: FC<NextImageProps> = (props) => {
  const { alt, className, ...rest } = props;
  const [isLoading, setLoading] = useState<boolean>(true);
  return (
    <NextImage
      alt={alt}
      aria-label={alt}
      className={cx(
        className,
        "duration-700 ease-in-out",
        isLoading
          ? "grayscale blur-lg scale-105"
          : "grayscale-0 blur-0 scale-100"
      )}
      onLoadingComplete={() => setLoading(false)}
      {...rest}
    />
  );
};

export default Image;
