import { type FC } from "react";
import { Modal } from "@wanin/ui";
import type { Feed } from "@wanin/shared/types";
import FeedDetailLoader from "@/components/FeedDetail/FeedDetailLoader";
import { FeedDetail } from "@/components";

interface Props {
  isOpen: boolean;
  handleModal: () => void;
  feed: Feed;
  isLoading: boolean;
  isError?: boolean;
  isSuccess: boolean;
  error?: string;
}

const FeedModal: FC<Props> = (props) => {
  const { isOpen, handleModal, feed, isLoading, isError, isSuccess, error } =
    props;

  return (
    <Modal
      isOpen={isOpen}
      activityModal={handleModal}
      className="w-[350px] md:w-[650px] lg:w-[850px] h-screen">
      <div className="w-full h-screen w-bg-secondary rounded-lg flex flex-col">
        {isLoading && <FeedDetailLoader />}
        {isSuccess && <FeedDetail data={feed} useWindowScroll={false} />}
        {isError && <p>{error}</p>}
      </div>
    </Modal>
  );
};

export default FeedModal;
