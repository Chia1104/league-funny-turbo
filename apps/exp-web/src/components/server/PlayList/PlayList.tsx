import { type FC, Fragment } from "react";
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
            <Fragment key={item.object_id}>
              <Youtube objectID={item.object_id} ytTitle={item.object_id} />
            </Fragment>
          );
        } else if (item.type === "twitch_clip") {
          return (
            <Fragment key={item.object_id}>
              <TwitchClip key={item.object_id} objectId={item.object_id} />
            </Fragment>
          );
        }
      })}
    </>
  );
};

export default PlayList;
