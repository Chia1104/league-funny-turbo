import { FroalaEditor, Head } from "@/components";
import { Select } from "@geist-ui/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PostCategory } from "@wanin/types";
import { fetchSidebar, fetchBoardCategory } from "@/helpers/api/client";
import { useMemo, useState } from "react";
import { Page } from "@wanin/ui";
import TagItem from "@/components/Tag/TagItem";
import SearchTag from "@/components/Tag/SearchTag";

const NewPostPage = () => {
  const {
    data: bord,
    isSuccess,
    isLoading,
  } = useQuery<PostCategory[]>(["sidebar"], fetchSidebar);
  const [selecteBord, setSelecteBord] = useState<string>("");
  const [selecteCategory, setSelecteCategory] = useState<string>("");
  const catalogue = useMemo(() => {
    if (isSuccess) {
      return bord
        .map((group) =>
          group.contents.map((content) => {
            return {
              label: content.b_zh_name,
              value: content.b_id,
            };
          })
        )
        .flat();
    }
  }, [isSuccess, bord]);

  const fetchBordCategory = useMutation({
    mutationFn: async (b_id: number) => {
      return await fetchBoardCategory(b_id);
    },
  });

  const handleSelectBord = (value: string) => {
    setSelecteBord(value);
    fetchBordCategory.mutate(Number(value));
  };

  const handleSelectCategory = (value: string) => {
    setSelecteCategory(value);
  };

  return (
    <Page className="w-main w-full">
      <Head />
      <article className="w-full flex flex-col items-center">
        <div className="max-w-[1000px] w-full">
          <div className="flex flex-col sm:flex-row gap-5 mb-5">
            <Select
              placeholder="選擇版面"
              type="default"
              // @ts-ignore
              onChange={handleSelectBord}>
              {isSuccess &&
                (catalogue as { label: string; value: number }[]).map(
                  (item) => (
                    <Select.Option
                      value={item.value.toString()}
                      key={item.value}>
                      {item.label}
                    </Select.Option>
                  )
                )}
              {isLoading && <Select.Option>loading</Select.Option>}
            </Select>
            <Select
              placeholder="選擇分類"
              type="default"
              // @ts-ignore
              onChange={handleSelectCategory}>
              {fetchBordCategory.isSuccess &&
                fetchBordCategory.data.map((item) => (
                  <Select.Option value={item.bc_id.toString()} key={item.bc_id}>
                    {item.bc_name}
                  </Select.Option>
                ))}
              {fetchBordCategory.isLoading && (
                <Select.Option>loading</Select.Option>
              )}
              {!fetchBordCategory.data && !fetchBordCategory.isLoading && (
                <Select.Option>請先選擇版面</Select.Option>
              )}
            </Select>
          </div>
          <div className="w-full w-bg-secondary flex flex-wrap items-center p-2 rounded-lg border my-5 gap-3">
            <TagItem
              label="tag-1sdddddddddddddddddddddddddddddddddddddddddddddd"
              onDeleted={() => null}
            />
            <TagItem label="tag-1" onDeleted={() => null} />
            <TagItem label="tag-1" onDeleted={() => null} />
            <TagItem label="tag-1" />
            <TagItem label="tag-1" />
            <TagItem label="tag-1" />
            <TagItem label="tag-1" />
            <TagItem label="tag-1" />
            <TagItem label="tag-1" />
            <TagItem label="tag-1" />
            <TagItem label="tag-1" />
            <TagItem label="tag-1" />
            <SearchTag />
          </div>
          <FroalaEditor />
        </div>
      </article>
    </Page>
  );
};

export default NewPostPage;
