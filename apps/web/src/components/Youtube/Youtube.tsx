import { type FC } from "react";

interface Props {
  objectID?: string;
  ytSrc?: string;
  ytTitle: string;
}

const Youtube: FC<Props> = (props) => {
  const { objectID, ytSrc, ytTitle } = props;
  if (!ytSrc && !objectID) {
    throw new Error("Youtube component must have either ytSrc or objectID");
  }

  if (ytSrc && objectID) {
    throw new Error(
      "Youtube component must have either ytSrc or objectID, not both"
    );
  }
  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[430px] max-w-[750px] border-0 rounded-lg shadow-lg overflow-hidden mx-auto my-10">
      <iframe
        className="w-full h-full"
        src={objectID ? `https://www.youtube.com/embed/${objectID}` : ytSrc}
        title={ytTitle}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Youtube;
