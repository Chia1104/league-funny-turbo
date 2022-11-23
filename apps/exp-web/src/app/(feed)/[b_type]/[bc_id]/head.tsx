import { Head } from "@/components/server";
import { fetchFeedDetail } from "@/helpers/api/server-only";

const FeedDetailHead = async ({ params }: { params: { bc_id: string } }) => {
  const { data, status } = await fetchFeedDetail(params.bc_id);
  const keywords = data?.f_tags_info
    ? data?.f_tags_info.map((tag) => tag.p_name)
    : [];
  return (
    <Head
      title={data?.f_desc}
      imageUrl={data?.f_cover}
      keywords={keywords}
      author={data?.f_author_name}
    />
  );
};

export default FeedDetailHead;
