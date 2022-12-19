import { Select } from "@geist-ui/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PostCategory } from "@wanin/shared/types";
import { fetchSidebar, fetchBoardCategory } from "@/helpers/api/routes/others";
import { useMemo, useState, forwardRef, useImperativeHandle } from "react";

interface SelectBordRef {
  getSelectedBord: () => string;
  getSelectedCategory: () => number;
}

interface SelectBordProps {
  onBordChange?: (bord: string) => void;
  onCategoryChange?: (category: number) => void;
}

const fetcher = async (): Promise<PostCategory[]> => {
  const { data, status, statusCode } = await fetchSidebar();
  if (statusCode !== 200 || status !== "success" || !data)
    throw new Error("error");
  return data;
};

const SelectBord = forwardRef<SelectBordRef, SelectBordProps>((props, ref) => {
  const { onBordChange, onCategoryChange } = props;
  const {
    data: bord,
    isSuccess,
    isLoading,
  } = useQuery<PostCategory[]>(["sidebar"], fetcher, {
    staleTime: 500000, // 5 minutes
  });
  const [selectedBord, setSelectedBord] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  useImperativeHandle(ref, () => ({
    getSelectedBord: () => selectedBord,
    getSelectedCategory: () => selectedCategory,
  }));
  const catalogue = useMemo(() => {
    if (isSuccess) {
      return bord
        .map((group) =>
          group.contents.map((content) => {
            return {
              slug: content.b_type,
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

  const handleSelectBord = (value: string | string[]) => {
    setSelectedCategory(0);
    setSelectedBord(
      ((catalogue as { label: string; value: number; slug: string }[])?.find(
        (item) => {
          return item.value === Number(value);
        }
      )?.slug as string) || ""
    );
    onBordChange?.(
      ((
        catalogue as {
          label: string;
          value: number;
          slug: string;
        }[]
      )?.find((item) => {
        return item.value === Number(value);
      })?.slug as string) || ""
    );
    fetchBordCategory.mutate(Number(value));
  };

  const handleSelectCategory = (value: string | string[]) => {
    setSelectedCategory(parseInt(value as string));
    onCategoryChange?.(parseInt(value as string));
  };
  return (
    <div className="flex flex-col sm:flex-row gap-5 mb-5 w-full items-center justify-center">
      <Select
        placeholder="選擇版面"
        type="default"
        onChange={handleSelectBord}
        width="100%">
        {isSuccess &&
          (catalogue as { label: string; value: number; slug: string }[]).map(
            (item) => (
              <Select.Option value={item.value.toString()} key={item.value}>
                {item.label}
              </Select.Option>
            )
          )}
        {isLoading && <Select.Option>loading</Select.Option>}
      </Select>
      <Select
        width="100%"
        placeholder="選擇分類"
        type="default"
        onChange={handleSelectCategory}>
        {fetchBordCategory.isSuccess &&
          fetchBordCategory?.data?.data?.map((item) => (
            <Select.Option value={item.bc_id.toString()} key={item.bc_id}>
              {item.bc_name}
            </Select.Option>
          ))}
        {fetchBordCategory.isLoading && <Select.Option>loading</Select.Option>}
        {!fetchBordCategory.data && !fetchBordCategory.isLoading && (
          <Select.Option>請先選擇版面</Select.Option>
        )}
      </Select>
    </div>
  );
});

SelectBord.displayName = "SelectBord";

export type { SelectBordRef };
export default SelectBord;
