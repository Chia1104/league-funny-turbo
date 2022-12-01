import { FroalaEditor, Head, Tag } from "@/components";
import { Select } from "@geist-ui/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PostCategory } from "@wanin/shared/types";
import { fetchSidebar, fetchBoardCategory } from "@/helpers/api/client";
import { useMemo, useState } from "react";
import { Page } from "@wanin/ui";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "@/utils/get-server-auth-session";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/b",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

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
      <article className="w-full flex flex-col items-center mt-28 px-5">
        <div className="max-w-[1000px] w-full mb-24">
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
          <FroalaEditor />
          <Tag />
        </div>
      </article>
    </Page>
  );
};

export default NewPostPage;
