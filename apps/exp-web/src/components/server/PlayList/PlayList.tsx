import { type FC } from "react";
import { Youtube, TwitchClip } from "@/components/server";

interface Props {
  attachment: string;
}

const PlayList: FC<Props> = (props) => {
  const { attachment } = props;

  return (
    <>
      {JSON.parse(attachment).map((item: any) => {
        if (item.type === "youtube") {
          return (
            <Youtube
              key={item.object_id}
              objectID={item.object_id}
              ytTitle={item.object_id}
            />
          );
        } else if (item.type === "twitch_clip") {
          return <TwitchClip key={item.object_id} objectId={item.object_id} />;
        }
      })}
    </>
  );
};

export default PlayList;
