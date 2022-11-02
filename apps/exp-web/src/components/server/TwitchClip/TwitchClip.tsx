import { type FC } from "react";
import { HOST } from "@/shared/constants";

interface Props {
  objectId: string;
}

const TwitchClip: FC<Props> = (props) => {
  const { objectId } = props;
  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[430px] max-w-[750px] border-0 rounded-lg shadow-lg overflow-hidden mx-auto my-10">
      <iframe
        className="w-full h-full"
        src={`https://clips.twitch.tv/embed?clip=${objectId}&parent=${HOST}`}
        title="Twitch Clip"
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default TwitchClip;
