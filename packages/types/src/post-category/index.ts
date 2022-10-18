export type PostCategoryDetail = {
  b_id: number;
  b_type: string;
  b_zh_name: string;
};

export type PostCategory = {
  group_id: string;
  group_name: string;
  contents: PostCategoryDetail[];
};
